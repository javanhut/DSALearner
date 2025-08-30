import glob
import os
import uuid

import chromadb
from sentence_transformers import SentenceTransformer

CHROMA_HOST = os.getenv("CHROMA_HOST", "chroma")
CHROMA_PORT = int(os.getenv("CHROMA_PORT", "8000"))
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "dsa_notes")
EMBED_MODEL_NAME = os.getenv(
    "EMBED_MODEL_NAME", "sentence-transformers/all-MiniLM-L6-v2"
)

DATA_DIR = "/app/data"


def chunk_text(txt, max_chars=1800):
    chunks = []
    cur = []
    cur_len = 0
    for line in txt.splitlines():
        if cur_len + len(line) + 1 > max_chars:
            chunks.append("\n".join(cur))
            cur, cur_len = [], 0
        cur.append(line)
        cur_len += len(line) + 1
    if cur:
        chunks.append("\n".join(cur))
    return chunks


def main():
    chroma = chromadb.HttpClient(host=CHROMA_HOST, port=CHROMA_PORT)
    collection = chroma.get_or_create_collection(COLLECTION_NAME)
    embedder = SentenceTransformer(EMBED_MODEL_NAME)

    files = sorted(glob.glob(os.path.join(DATA_DIR, "*.md")))
    if not files:
        print("No *.md files found in /app/data. Skipping.")
        return

    for path in files:
        topic = os.path.basename(path).replace(".md", "")
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
        for i, chunk in enumerate(chunk_text(text)):
            doc_id = f"{topic}-{uuid.uuid4().hex[:8]}-{i}"
            emb = embedder.encode([chunk])[0].tolist()
            collection.add(
                ids=[doc_id],
                documents=[chunk],
                metadatas=[{"topic": topic}],
                embeddings=[emb],
            )
            print(f"Indexed: {path} chunk {i+1}")


if __name__ == "__main__":
    main()
