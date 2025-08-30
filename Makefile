.PHONY: help run serve serve-node open reset check up down status start stop restart status-all logs-all

PORT ?= 8000
URL := http://localhost:$(PORT)/

help:
	@echo "DSA Learner — Make targets"
	@echo "  make run         # Serve via Python http.server on port $(PORT)"
	@echo "  make run-dev     # Serve with no-cache headers (avoids stale JS)"
	@echo "  make start       # Start ALL: ai_coach stack + local C++ runner + frontend (PORT=8080)"
	@echo "  make stop        # Stop ALL: frontend + ai_coach stack"
	@echo "  make logs-all    # Tail logs for the ai_coach stack"
	@echo "  make status-all  # Show ai_coach status"
	@echo "  make pyodide-fetch # Download Pyodide assets to vendor/ for offline Python"
	@echo "  make pyodide-clean # Remove vendored Pyodide assets"
	@echo "  make cpp-wasm-fetch # Instructions to add an offline C++ WebAssembly toolchain"
	@echo "  make serve       # Alias for run"
	@echo "  make serve-node  # Serve via npx serve (if installed)"
	@echo "  make open        # Open $(URL) in your default browser"
	@echo "  make reset       # Open reset page to clear local progress"
	@echo "  make check       # Basic sanity: list entry points"
	@echo "  make up          # Start server in background (records PID)"
	@echo "  make down        # Stop background server (by PID or port)"
	@echo "  make status      # Show server PID/port status"

serve: run

run:
	@echo "Serving at $(URL) (Ctrl+C to stop)"
	@python3 -m http.server $(PORT)

run-dev:
	@PORT=$(PORT) python3 tools/serve_nocache.py

# ---------- All-in-one orchestration ----------
# Starts the ai_coach stack (Ollama + Chroma + Tutor API + C++ runner) and the
# DSALearner frontend on PORT=8080 to avoid clashing with the Tutor API.

.PHONY: start
start:
	@echo "Starting ai_coach stack (ollama, chroma, tutor-api, cpp-runner)…"
	@$(MAKE) -C ai_coach up --no-print-directory
	@echo "Starting frontend on http://localhost:8080/ (Ctrl+C to stop foreground run or use make stop)…"
	@PORT=8080 $(MAKE) up --no-print-directory
	@echo "All up. Open http://localhost:8080/"

.PHONY: stop
stop:
	@echo "Stopping frontend…"; \
	$(MAKE) down --no-print-directory; \
	echo "Stopping ai_coach stack…"; \
	$(MAKE) -C ai_coach down --no-print-directory

.PHONY: restart
restart:
	@$(MAKE) stop --no-print-directory
	@$(MAKE) start --no-print-directory

.PHONY: logs-all
logs-all:
	@$(MAKE) -C ai_coach logs --no-print-directory

.PHONY: status-all
status-all:
	@$(MAKE) -C ai_coach status --no-print-directory

pyodide-fetch:
	@bash tools/fetch_pyodide.sh

pyodide-clean:
	@rm -rf vendor/pyodide

cpp-wasm-fetch:
	@echo "Offline C++ toolchain (browser) requires a prebuilt clang.js + wasm." && \
	echo "Options:" && \
	echo "  1) Use an existing clang.js/clang.wasm build and place them under vendor/cpp-wasm/" && \
	echo "     expected: vendor/cpp-wasm/clang.js and vendor/cpp-wasm/clang.wasm" && \
	echo "  2) Or use Emscripten to build a browser clang (advanced)." && \
	echo "After placing files, reload and the app will prefer offline C++ where possible."

serve-node:
	@npx --yes serve -l $(PORT)

open:
	@echo "Opening $(URL)"
	@(
		command -v xdg-open >/dev/null 2>&1 && xdg-open "$(URL)" || \
		command -v open >/dev/null 2>&1 && open "$(URL)" || \
		command -v start >/dev/null 2>&1 && start "$(URL)" || \
		echo "Please open $(URL) manually."
	)

reset:
	@echo "Opening reset page to clear local progress…"
	@(
		command -v xdg-open >/dev/null 2>&1 && xdg-open "$(URL)tools/reset.html" || \
		command -v open >/dev/null 2>&1 && open "$(URL)tools/reset.html" || \
		command -v start >/dev/null 2&& start "$(URL)tools/reset.html" || \
		echo "Open $(URL)tools/reset.html after starting the server."
	)

check:
	@printf "Entrypoint: "; test -f index.html && echo OK || echo MISSING
	@printf "Scripts:    "; test -f src/main.js && echo OK || echo MISSING
	@printf "Styles:     "; test -f styles.css && echo OK || echo MISSING

# Background server management
PIDFILE := .server.pid

up:
	@echo "Starting server at $(URL) in background…"
	@nohup python3 -m http.server $(PORT) >/dev/null 2>&1 & echo $$! > $(PIDFILE)
	@sleep 0.3
	@echo "PID: $$(cat $(PIDFILE))"

down:
	@if [ -f $(PIDFILE) ]; then \
		PID=$$(cat $(PIDFILE)); \
		echo "Stopping PID $$PID"; \
		kill $$PID || true; \
		rm -f $(PIDFILE); \
	else \
		echo "No PID file. Trying to stop process on port $(PORT)…"; \
		if command -v lsof >/dev/null 2>&1; then \
			PIDS=$$(lsof -ti tcp:$(PORT)); \
			if [ -n "$$PIDS" ]; then kill $$PIDS || true; else echo "No process found on port $(PORT)."; fi; \
		elif command -v fuser >/dev/null 2>&1; then \
			fuser -k $(PORT)/tcp || true; \
		else \
			echo "Could not auto-stop. Use Ctrl+C or your task manager."; \
		fi; \
	fi

status:
	@echo "PID file: " && (test -f $(PIDFILE) && cat $(PIDFILE) || echo "(none)")
	@if command -v lsof >/dev/null 2>&1; then \
		echo "Listening on $(PORT):"; lsof -i tcp:$(PORT) || true; \
	else \
		echo "lsof not available to check port."; \
	fi
