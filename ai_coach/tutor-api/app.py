import os
from typing import Optional, List, Dict, Any
from datetime import datetime

import chromadb
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import OpenAI
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer

# ---- Config ----
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434/v1")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-oss:20b")
EMBED_MODEL_NAME = os.getenv(
    "EMBED_MODEL_NAME", "sentence-transformers/all-MiniLM-L6-v2"
)
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "dsa_notes")
CHROMA_HOST = os.getenv("CHROMA_HOST", "chroma")
CHROMA_PORT = int(os.getenv("CHROMA_PORT", "8000"))

# ---- Clients ----
client = OpenAI(base_url=OLLAMA_URL, api_key="ollama")
embedder = SentenceTransformer(EMBED_MODEL_NAME)
chroma = chromadb.HttpClient(host=CHROMA_HOST, port=CHROMA_PORT)
collection = chroma.get_or_create_collection(COLLECTION_NAME)


class AskBody(BaseModel):
    """Request body for asking the AI tutor a question"""
    question: str = Field(..., description="The DSA question or concept to explain")
    code: Optional[str] = Field(None, description="Optional code snippet for context or debugging")
    language: Optional[str] = Field("python", description="Programming language (python, javascript, cpp)")
    k: int = Field(5, description="Number of relevant knowledge base documents to retrieve", ge=1, le=20)

class TestConnectionBody(BaseModel):
    """Request body for testing GPT-OSS connection"""
    test_prompt: str = Field("Hello, are you working?", description="Test prompt to send to GPT-OSS")
    temperature: float = Field(0.1, description="Temperature for response generation", ge=0, le=1)

class SystemStatusResponse(BaseModel):
    """Response model for system status"""
    status: str
    services: Dict[str, Any]
    timestamp: str
    model_info: Dict[str, str]

class SearchKnowledgeBody(BaseModel):
    """Request body for searching the knowledge base"""
    query: str = Field(..., description="Search query")
    limit: int = Field(10, description="Maximum number of results", ge=1, le=50)


SYSTEM_TUTOR = """You are a rigorous but friendly DSA tutor.
- Teach step-by-step. Prefer hints first, then solution, then complexity.
- Show dry runs with small inputs.
- Prefer Python unless user specifies otherwise.
- If unclear, briefly state assumptions and proceed.
"""


def retrieve(query: str, k: int):
    vec = embedder.encode([query])[0].tolist()
    res = collection.query(query_embeddings=[vec], n_results=k)
    docs = res.get("documents", [[]])[0]
    metas = res.get("metadatas", [[]])[0]
    return "\n\n".join(
        f"[{i+1}] {m.get('topic','note')}:\n{d}"
        for i, (d, m) in enumerate(zip(docs, metas))
    )


app = FastAPI(
    title="DSA Tutor API - Local GPT-OSS",
    description="""
    ## 🤖 DSA Learning Assistant API
    
    This API provides access to a local GPT-OSS model fine-tuned for Data Structures & Algorithms tutoring.
    
    ### Features:
    - 💬 **Ask Questions**: Get explanations for DSA concepts
    - 🐛 **Debug Code**: Submit code for analysis and debugging help
    - 🔍 **Search Knowledge**: Query the embedded DSA knowledge base
    - 🧪 **Test Connection**: Verify GPT-OSS is responding correctly
    - 📊 **System Status**: Check all services are running
    
    ### Model Information:
    - **Model**: GPT-OSS 20B (running via Ollama)
    - **Embeddings**: sentence-transformers/all-MiniLM-L6-v2
    - **Vector DB**: ChromaDB with DSA-specific knowledge
    
    ### Usage:
    1. Use `/test-gpt` to verify the model is working
    2. Use `/tutor/ask` for DSA questions and code help
    3. Use `/status` to check system health
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS for local frontend (DSALearner) on common dev ports
ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://0.0.0.0:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
def root():
    """Root endpoint - redirects to API documentation"""
    return {
        "message": "Welcome to DSA Tutor API",
        "docs": "/docs",
        "redoc": "/redoc",
        "health": "/health"
    }

@app.get("/health", tags=["General"])
def health():
    """Simple health check endpoint"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.post("/tutor/ask", tags=["Tutor"], summary="Ask a DSA question")
def ask(body: AskBody):
    """
    Ask the AI tutor a question about Data Structures & Algorithms.
    
    The tutor will:
    - Search the knowledge base for relevant context
    - Provide step-by-step explanations
    - Give hints before full solutions
    - Include code examples when helpful
    """
    try:
        context = retrieve(body.question + (" " + body.code if body.code else ""), k=body.k)
        content = (
            f"Question: {body.question}\n"
            f"Language: {body.language}\n"
            "Code (optional):\n"
            f"{body.code or '(none)'}\n\n"
            "Relevant notes:\n"
            f"{context}"
        )
        resp = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_TUTOR},
                {"role": "user", "content": content},
            ],
            temperature=0.2,
        )
        return {
            "answer": resp.choices[0].message.content,
            "model_used": MODEL_NAME,
            "context_docs_used": body.k
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")


@app.post("/test-gpt", tags=["Testing"], summary="Test GPT-OSS connection")
def test_gpt_connection(body: TestConnectionBody):
    """
    Test direct connection to GPT-OSS model.
    
    This endpoint bypasses the knowledge base and sends a direct prompt to test:
    - Model availability
    - Response generation
    - Connection latency
    """
    try:
        start_time = datetime.now()
        
        resp = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": body.test_prompt},
            ],
            temperature=body.temperature,
            max_tokens=150
        )
        
        end_time = datetime.now()
        response_time = (end_time - start_time).total_seconds()
        
        return {
            "status": "success",
            "model": MODEL_NAME,
            "prompt": body.test_prompt,
            "response": resp.choices[0].message.content,
            "response_time_seconds": response_time,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "model": MODEL_NAME,
            "timestamp": datetime.now().isoformat()
        }


@app.get("/status", tags=["System"], response_model=SystemStatusResponse, summary="Get system status")
def get_system_status():
    """
    Check the status of all services (Ollama, Chroma, embeddings).
    
    Returns detailed information about:
    - Service connectivity
    - Model availability
    - Knowledge base status
    """
    status_info = {
        "ollama": {"connected": False, "error": None},
        "chroma": {"connected": False, "collections": 0, "error": None},
        "embeddings": {"loaded": False, "model": EMBED_MODEL_NAME}
    }
    
    # Test Ollama
    try:
        # Try to list models
        test_resp = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": "test"}],
            max_tokens=1
        )
        status_info["ollama"]["connected"] = True
        status_info["ollama"]["model"] = MODEL_NAME
    except Exception as e:
        status_info["ollama"]["error"] = str(e)
    
    # Test Chroma
    try:
        collections = chroma.list_collections()
        status_info["chroma"]["connected"] = True
        status_info["chroma"]["collections"] = len(collections)
        status_info["chroma"]["collection_names"] = [c.name for c in collections]
    except Exception as e:
        status_info["chroma"]["error"] = str(e)
    
    # Test embeddings
    try:
        test_embed = embedder.encode(["test"])
        status_info["embeddings"]["loaded"] = True
        status_info["embeddings"]["dimension"] = len(test_embed[0])
    except Exception as e:
        status_info["embeddings"]["error"] = str(e)
    
    all_connected = (
        status_info["ollama"]["connected"] and 
        status_info["chroma"]["connected"] and 
        status_info["embeddings"]["loaded"]
    )
    
    return SystemStatusResponse(
        status="healthy" if all_connected else "degraded",
        services=status_info,
        timestamp=datetime.now().isoformat(),
        model_info={
            "name": MODEL_NAME,
            "base_url": OLLAMA_URL,
            "embedding_model": EMBED_MODEL_NAME
        }
    )


@app.post("/search-knowledge", tags=["Knowledge Base"], summary="Search knowledge base")
def search_knowledge_base(body: SearchKnowledgeBody):
    """
    Search the DSA knowledge base directly.
    
    Returns relevant documents without generating an AI response.
    Useful for:
    - Browsing available knowledge
    - Understanding what context the AI uses
    - Debugging knowledge retrieval
    """
    try:
        vec = embedder.encode([body.query])[0].tolist()
        res = collection.query(
            query_embeddings=[vec], 
            n_results=body.limit,
            include=["documents", "metadatas", "distances"]
        )
        
        documents = res.get("documents", [[]])[0]
        metadatas = res.get("metadatas", [[]])[0]
        distances = res.get("distances", [[]])[0]
        
        results = []
        for i, (doc, meta, dist) in enumerate(zip(documents, metadatas, distances)):
            results.append({
                "rank": i + 1,
                "content": doc,
                "metadata": meta,
                "similarity_score": 1 - dist  # Convert distance to similarity
            })
        
        return {
            "query": body.query,
            "results_count": len(results),
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")


@app.get("/models", tags=["System"], summary="List available models")
def list_models():
    """List all models available in Ollama"""
    try:
        # Note: This is a simplified version - Ollama's actual API might differ
        return {
            "current_model": MODEL_NAME,
            "base_url": OLLAMA_URL,
            "available_models": [MODEL_NAME]  # In production, query Ollama's API
        }
    except Exception as e:
        return {"error": str(e)}


# Add a simple chat endpoint for testing conversations
# Temporarily disabled due to FastAPI parameter issue
# class ChatBody(BaseModel):
#     message: str = Field(..., description="Your message")
#     system_prompt: Optional[str] = Field(None, description="Optional system prompt")

# @app.post("/chat", tags=["Testing"], summary="Simple chat without knowledge base")
# def simple_chat(body: ChatBody):
#     """
#     Simple chat endpoint for testing raw GPT-OSS responses.
#     
#     No knowledge base retrieval - just direct model interaction.
#     """
#     try:
#         messages = []
#         if body.system_prompt:
#             messages.append({"role": "system", "content": body.system_prompt})
#         messages.append({"role": "user", "content": body.message})
#         
#         resp = client.chat.completions.create(
#             model=MODEL_NAME,
#             messages=messages,
#             temperature=0.7
#         )
#         
#         return {
#             "message": body.message,
#             "response": resp.choices[0].message.content,
#             "model": MODEL_NAME
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")
