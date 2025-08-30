#!/usr/bin/env bash
set -euo pipefail

# This script prepares an offline C++ toolchain directory under vendor/cpp-wasm/
# by copying or downloading prebuilt assets and generating a worker from a template.
#
# Usage options:
#   1) Local copy: place your toolchain at a path and run:
#        TOOLSRC=/path/to/cpp-wasm bash tools/fetch_cpp_offline.sh
#      Expected files inside $TOOLSRC: worker.js (or clang.js/wasm with your own worker)
#      The script will copy into vendor/cpp-wasm/.
#
#   2) Custom URL base (advanced):
#        URL_BASE=https://example.com/cpp-wasm bash tools/fetch_cpp_offline.sh
#      Must host worker.js and any dependent assets at that base; the script will mirror worker.js only.
#
#   3) Manual: see README – implement /vendor/cpp-wasm/worker.js yourself using tools/cpp-wasm/worker.template.js.

DEST="vendor/cpp-wasm"
mkdir -p "$DEST"

if [[ -n "${TOOLSRC:-}" ]]; then
  echo "Copying offline toolchain from $TOOLSRC -> $DEST"
  rsync -a "$TOOLSRC/" "$DEST/"
  echo "Done."
  exit 0
fi

if [[ -n "${URL_BASE:-}" ]]; then
  echo "Fetching worker.js from $URL_BASE"
  curl -fsSL "$URL_BASE/worker.js" -o "$DEST/worker.js"
  echo "Note: make sure all dependent assets are also available under $DEST (clang.js, .wasm, etc)."
  exit 0
fi

echo "No TOOLSRC or URL_BASE provided."
echo "Create your own offline toolchain by copying tools/cpp-wasm/worker.template.js to vendor/cpp-wasm/worker.js and integrating clang.js + a WASI runner."
echo "See README for the expected window.__cppCompileAndRun API."

