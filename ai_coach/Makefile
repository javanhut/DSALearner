# -----------------------------
# DSA Tutor (Podman Compose)
# -----------------------------
# Common targets:
#   make up          -> install/check podman, build & start stack, pull model, seed notes
#   make down        -> stop & remove containers (keeps volumes)
#   make restart     -> restart stack
#   make logs        -> tail logs for all services
#   make seed        -> re-ingest ./data/*.md into Chroma
#   make test        -> sample tutor request
#   make status      -> service health + ps
#   make ip          -> show container IPs
#   make rebuild     -> rebuild tutor-api image
#   make clean       -> down + remove named volumes (ollama, chroma)
#   make reset       -> clean + fresh up
#   make pull-model  -> pull gpt-oss:20b inside Ollama container
#   make shell S=svc  -> shell into a service container (S=ollama|chroma|tutor-api)

SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help

# ------------ Config ------------
###############################################################################
# Compose provider detection
# Prefer: podman-compose (python) > podman compose (plugin) > docker compose
###############################################################################

# shell-detected compose command
COMPOSE_AUTO := $(shell \
  if command -v podman-compose >/dev/null 2>&1; then \
    echo podman-compose; \
  elif command -v podman >/dev/null 2>&1 && podman help 2>/dev/null | grep -q "compose"; then \
    echo "podman compose"; \
  elif command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then \
    echo "docker compose"; \
  else \
    echo ""; \
  fi)

ifeq ($(COMPOSE_AUTO),)
$(warning No compose provider found. Install one of: podman-compose, podman compose plugin, or docker compose.)
COMPOSE := podman compose
else
COMPOSE := $(COMPOSE_AUTO)
endif
COMPOSE_FILE ?= podman-compose.yml

PROJECT ?= dsa
OLLAMA_CTN ?= dsa_ollama
CHROMA_CTN ?= dsa_chroma
API_CTN    ?= dsa_tutor_api

MODEL ?= gpt-oss:20b
API_URL ?= http://localhost:8000
DATA_DIR ?= ./data

# Named volumes (see podman-compose.yml)
V_OLLAMA ?= ollama
V_CHROMA ?= chroma

# Pretty printing
Y  := \033[1;33m
G  := \033[1;32m
C  := \033[1;36m
R  := \033[1;31m
NC := \033[0m

# ------------ Helpers ------------
.PHONY: help
help:
	@echo -e "$(C)DSA Tutor Make targets$(NC)"
	@awk 'BEGIN{FS="^## "}/^[-A-Za-z0-9_]+:/{t=$$0;getline;if($$0 ~ /^## /){gsub(/:.*/, "", t); printf("  $(G)%-12s$(NC) %s\n", t, substr($$0,4))}}' $(MAKEFILE_LIST)

# Ensure scripts are executable
.PHONY: chmod
chmod:
	@chmod +x up.sh down.sh seed.sh test.sh check_podman.sh 2>/dev/null || true

# ------------ Lifecycle ------------
## Start stack (install Podman if needed, build, pull model, seed)
.PHONY: up
up: chmod
	@./check_podman.sh
	@echo -e "$(C)[up] Building & starting containers…$(NC)"
	@$(COMPOSE) -f $(COMPOSE_FILE) up -d --build
	@$(MAKE) pull-model --no-print-directory
	@$(MAKE) seed --no-print-directory
	@echo -e "$(G)✔ Up!$(NC) API: $(API_URL)  |  Health: $(API_URL)/health"

## Stop & remove containers (keeps volumes)
.PHONY: down
down: chmod
	@echo -e "$(C)[down] Stopping containers…$(NC)"
	@$(COMPOSE) -f $(COMPOSE_FILE) down

## Restart stack (no rebuild)
.PHONY: restart
restart:
	@$(MAKE) down --no-print-directory
	@$(MAKE) up   --no-print-directory

## Rebuild tutor-api image and restart
.PHONY: rebuild
rebuild:
	@echo -e "$(C)[rebuild] Rebuilding tutor-api image…$(NC)"
	@$(COMPOSE) -f $(COMPOSE_FILE) build tutor-api
	@$(COMPOSE) -f $(COMPOSE_FILE) up -d tutor-api
	@echo -e "$(G)✔ Rebuilt tutor-api$(NC)"

# ------------ Operations ------------
## Pull the 20B model inside the Ollama container
.PHONY: pull-model
pull-model:
	@echo -e "$(C)[model] Pulling $(MODEL)…$(NC)"
	@podman exec $(OLLAMA_CTN) bash -lc "ollama pull $(MODEL)" || (echo -e "$(R)✖ Failed to pull model. Is Ollama up?$(NC)"; exit 1)

## (Re)ingest ./data/*.md into Chroma
.PHONY: seed
seed:
	@if [ ! -d "$(DATA_DIR)" ]; then echo -e "$(Y)[seed] No $(DATA_DIR) dir; creating.$(NC)"; mkdir -p $(DATA_DIR); fi
	@echo -e "$(C)[seed] Ingesting markdown notes into Chroma…$(NC)"
	@./seed.sh

## Quick request to the tutor API
.PHONY: test
test:
	@echo -e "$(C)[test] Posting sample question…$(NC)"
	@./test.sh

## Tail logs for all services
.PHONY: logs
logs:
	@$(COMPOSE) -f $(COMPOSE_FILE) logs -f

## Show health & running containers
.PHONY: status
status:
	@echo -e "$(C)[status] Health endpoint:$(NC)"; \
	  curl -s $(API_URL)/health || true; echo; echo
	@echo -e "$(C)[status] ps:$(NC)"
	@$(COMPOSE) -f $(COMPOSE_FILE) ps

## Show container IPs (on the user network)
.PHONY: ip
ip:
	@echo -e "$(C)[ip] Container addresses$(NC)"
	@for c in $(OLLAMA_CTN) $(CHROMA_CTN) $(API_CTN); do \
	  printf "%-16s -> " $$c; \
	  podman inspect $$c -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 2>/dev/null || echo "n/a"; \
	done

## Shell into a service container: make shell S=tutor-api
.PHONY: shell
shell:
	@if [ -z "$(S)" ]; then echo -e "$(Y)Usage: make shell S=ollama|chroma|tutor-api|cpp-runner$(NC)"; exit 1; fi
	@case "$(S)" in \
	  ollama)     podman exec -it $(OLLAMA_CTN) bash ;; \
	  chroma)     podman exec -it $(CHROMA_CTN) sh   ;; \
	  tutor-api)  podman exec -it $(API_CTN)  bash  ;; \
	  cpp-runner) podman exec -it dsa_cpp_runner bash ;; \
	  *) echo -e "$(R)Unknown service $(S)$(NC)"; exit 1 ;; \
	esac

# ------------ Cleanup ------------
## Down + remove named volumes (ollama & chroma)  ⚠ destroys model cache & embeddings
.PHONY: clean
clean: down
	@echo -e "$(Y)[clean] Removing named volumes $(V_OLLAMA) $(V_CHROMA)…$(NC)"
	-@podman volume rm $(V_OLLAMA) 2>/dev/null || true
	-@podman volume rm $(V_CHROMA) 2>/dev/null || true
	@echo -e "$(G)✔ Volumes removed$(NC)"

## Full reset: purge volumes then fresh up
.PHONY: reset
reset:
	@$(MAKE) clean --no-print-directory
	@$(MAKE) up    --no-print-directory
