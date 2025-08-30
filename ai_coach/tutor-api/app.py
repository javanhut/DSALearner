import os
from typing import Optional

import chromadb
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
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
    question: str
    code: Optional[str] = None
    language: Optional[str] = "python"
    k: int = 5


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


app = FastAPI(title="DSA Tutor (gpt-oss:20b)")

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


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/tutor/ask")
def ask(body: AskBody):
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
    return {"answer": resp.choices[0].message.content}
