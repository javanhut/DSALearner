#!/usr/bin/env bash
set -euo pipefail

./check_podman.sh

echo "[1/4] Building and starting containers…"
podman compose up -d --build

echo "[2/4] Pulling model inside Ollama container…"
# Pull gpt-oss:20b once; cached in the mounted volume
podman exec dsa_ollama bash -lc "ollama pull gpt-oss:20b"

echo "[3/4] Waiting for services (Ollama + Chroma)…"
# Basic waits; tweak if your machine is slower
sleep 5

echo "[4/4] Seeding DSA notes into Chroma…"
podman exec dsa_tutor_api python /app/ingest.py

echo "✅ All set!
- Tutor API:      http://localhost:8000 (POST /tutor/ask)
- Health check:   http://localhost:8000/health
- Ollama API:     http://localhost:11434
- Chroma (HTTP):  http://localhost:8001
"

