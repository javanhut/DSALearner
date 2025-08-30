#!/usr/bin/env bash
set -euo pipefail
curl -s -X POST http://localhost:8000/tutor/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"Explain the two-pointer approach for sorted squares and give O(n) Python code."}' | jq -r '.answer'

