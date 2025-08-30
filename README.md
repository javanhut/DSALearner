DSA Learner — Mastery Trainer

Overview
- A local, self‑contained learning app for Data Structures & Algorithms with neuroscience‑backed techniques: retrieval practice, spaced repetition, interleaving, deliberate drills, and explanation prompts.
- Ships with an optional local “AI Coach” (gpt‑oss via Ollama) and a local C++ compile‑and‑run service. One command starts everything.

Quick Start (all‑in‑one)
- `make start`
  - Starts the AI Coach stack (Ollama gpt‑oss + Chroma + Tutor API) and an offline C++ runner, then serves the frontend at `http://localhost:8080/`.
- Open `http://localhost:8080/` in your browser.
- `make stop` stops both the frontend and AI stack.
- `make logs-all` tails AI stack logs, `make status-all` shows status.

Frontend only (optional)
- `make run` — serve the SPA at `http://localhost:8000/` (no AI Coach / C++ service).
- `make run-dev` — same, with no‑cache headers (avoid stale JS while developing).

Services & ports
- Frontend (this repo): `http://localhost:8080/` (when using `make start`) or `:8000` with `make run`.
- AI Coach Tutor API: `http://localhost:8000` (inside `ai_coach` stack)
- Offline C++ runner: `http://localhost:5055` (inside `ai_coach` stack)

Core Features
- Mastery gating: Learn (intuition + pattern) → Quiz (>=80%) → Practice (code passes tests) → Justify (>=60 chars). Only then reveal optimal solution.
- Hints & coaching: Tiered hints, Socratic prompts, quick tips, and a Coach panel.
- Code runner: In-browser JS function harness with hidden-like test cases and rough runtime growth estimate to nudge toward optimal complexity.
- Progress & reviews: LocalStorage progress, lightweight SM-2 scheduler for spaced repetition, interleaving modes.
- Guided path: Start Path button picks the next unmastered item from easiest to hardest.
- Complexity primer: A foundations topic covering Big‑O, loop patterns, and binary search with quizzes and simple drills.
- Games & animations: Interactive Play mode (Binary Search, BFS Maze, Heap Sandbox, Sorting Race, Union-Find Playground, DP Grid, KMP Explorer). Completing a session marks progress for that item.
  - Advanced: Aho–Corasick Explorer, Dinic Flow (levels/augment), HLD path decomposition.

Content
- Starts with a Complexity Primer (Big‑O basics, nested loops vs log, binary search) then progresses into Two Pointers, Sliding Window, Binary Search, Intervals, Heaps, DP, Greedy, Graphs, Union‑Find, Binary Search on Answer, Bits, Trees, and more. Extend via src/modules/content.js (see examples, keep schema).

Design Principles
- Retrieval before exposure: The UI defaults to attempt-first; hints unlock progressively.
- Explanation prompts: Justification field encourages loop invariants and correctness arguments.
- Adaptive review: Scheduler prioritizes unmastered and due items; confidence rating updates spacing.

Extending Content
- Content lives in `src/modules/content.js`. Add a topic to `content.topics` with items.
- Each item includes: `id`, `title`, `brief`, `hints[]`, `learn{ intuition, visual, pattern, template }`, `quiz[]`, `practice{ funcName, starter, tests[], constraints, optimal, expectedComplexity }`.
- Keep tests small and fast; include varying `n` for runtime estimation.

Language runners
- JavaScript: runs fully in the browser (no server).
- Python: runs in the browser via Pyodide (CDN by default, can be vendored for offline use).
- C++: runs offline by default via the local `cpp-runner` container; falls back to an online compiler if unavailable.

AI Coach (gpt‑oss)
- With `make start`, the Coach panel can call your local Tutor API (gpt‑oss model via Ollama) for hints → solution outlines → complexity.
- The default Coach endpoint is `http://localhost:8000/tutor/ask` and can be changed in the UI.

Notes
- Python offline (Pyodide):
  - `make pyodide-fetch` — download Pyodide assets into `vendor/pyodide/`.
  - Reload; the app prefers the local copy. Remove with `make pyodide-clean`.
- C++ offline (container):
  - `make start` runs a local g++ compile‑and‑run service used by Practice; no external calls required.
- Optional C++ in‑browser (WASM):
  - If you prefer pure in‑browser C++ without the container, drop a `vendor/cpp-wasm/worker.js` that exposes `window.__cppCompileAndRun(code)` (see `tools/cpp-wasm/worker.template.js`).
  - Helper: `make cpp-wasm-fetch` prints guidance and expected file layout.
- Security: Code you type is executed locally (JS/Python in browser, C++ in local container). Don’t paste untrusted code.
- Build: The app is a static SPA. Use a simple static server if your browser blocks modules over `file://`.
