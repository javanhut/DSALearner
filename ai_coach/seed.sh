#!/usr/bin/env bash
set -euo pipefail
# Re-run ingestion after adding/modifying notes in ./data
podman exec dsa_tutor_api python /app/ingest.py
echo "✅ Reseeded."

