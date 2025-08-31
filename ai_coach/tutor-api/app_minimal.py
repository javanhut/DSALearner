from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI(title="DSA Tutor API - Minimal", version="1.0.0")

# CORS middleware for browser access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskBody(BaseModel):
    question: str = Field(..., description="The DSA question to ask")

@app.get("/")
def root():
    return {"message": "DSA Tutor API (Minimal) - Running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running (minimal mode)"}

@app.post("/tutor/ask")
def ask_tutor(body: AskBody):
    """Mock endpoint for tutor questions - returns a placeholder response"""
    return {
        "answer": f"This is a placeholder response for: {body.question}\n\nThe full AI tutor is currently being configured. Please check back later.",
        "status": "minimal_mode"
    }