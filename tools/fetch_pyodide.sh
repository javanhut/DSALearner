#!/usr/bin/env bash
set -euo pipefail

# Fetch a local copy of Pyodide "full" distribution for offline Python execution
# Requires: wget (recommended) or curl

VER="0.24.1"
BASE="https://cdn.jsdelivr.net/pyodide/v${VER}/full"
DEST="vendor/pyodide"

mkdir -p "$DEST"

if command -v wget >/dev/null 2>&1; then
  echo "Mirroring Pyodide ${VER} full/ into ${DEST}..."
  wget -r -np -nH --cut-dirs=3 -R "index.html*" -P "$DEST" "${BASE}/"
elif command -v curl >/dev/null 2>&1; then
  echo "curl found, fetching required core files..."
  (cd "$DEST" && mkdir -p full && cd full && \
    curl -LO "${BASE}/pyodide.js" && \
    curl -LO "${BASE}/pyodide.asm.wasm" && \
    curl -LO "${BASE}/pyodide-lock.json" && \
    curl -LO "${BASE}/packages.json" && \
    echo "Note: for full offline functionality, additional .data/.wasm packages may be needed.")
else
  echo "Neither wget nor curl found. Please install one and retry." >&2
  exit 1
fi

echo "Done. Local pyodide.js at ${DEST}/full/pyodide.js"

