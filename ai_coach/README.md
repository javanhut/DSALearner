# 🧑‍🏫 DSA Tutor (gpt-oss:20b + Podman Compose)

This project runs a **local DSA tutoring assistant** powered by [OpenAI's gpt-oss-20b model](https://ollama.com/library/gpt-oss) with a simple REST API and a knowledge base of your own DSA notes.  
Everything runs **fully locally** using [Podman](https://podman.io/) and [Podman Compose](https://docs.podman.io/en/latest/markdown/podman-compose.1.html).

---

## ✨ Features

- **Ollama** serving `gpt-oss:20b` with an OpenAI-compatible API (`/v1/chat/completions`)
- **ChromaDB** vector store for your DSA notes (`*.md` in `./data`)
- **FastAPI Tutor API** (`/tutor/ask`) for hint → solution → complexity guidance
- **Makefile & scripts** to automate setup, ingestion, testing, and teardown
- Runs **rootless** by default

---

## 📦 Requirements

- Linux with sudo access
- Podman ≥ 4.x (script installs if missing)
- ~16 GB RAM & VRAM recommended for `gpt-oss:20b`

---

## 🚀 Quick Start

Clone this repo and run:

```bash
# Make scripts executable
chmod +x check_podman.sh up.sh down.sh seed.sh test.sh

# Start everything
make up
````

This will:

1. Check/install Podman + rootless prerequisites (`check_podman.sh`)
2. Build and start containers (`ollama`, `chroma`, `tutor-api`, `cpp-runner`)
3. Pull the **gpt-oss:20b** model inside Ollama
4. Seed your `./data/*.md` notes into Chroma

---

## 📚 Adding Notes

1. Drop markdown files into `./data/` (example: `binary_search.md`)
2. Re-ingest with:

```bash
make seed
```

Each note is chunked and embedded into Chroma for retrieval-augmented tutoring.

---

## 🔌 Tutor API

* **Base URL:** `http://localhost:8000`
* **Health check:** `GET /health`
* **Ask a question:** `POST /tutor/ask`

Example:

```bash
curl -X POST http://localhost:8000/tutor/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"Explain two pointer for sorted squares in O(n)"}'
```

Response:

```json
{
  "answer": "Hint: Squaring breaks sorted order near negatives..."
}
```

---

## 🛠️ Makefile Commands

| Command            | Description                                                       |        |              |
| ------------------ | ----------------------------------------------------------------- | ------ | ------------ |
| `make up`          | Start stack (installs Podman if needed, pulls model, seeds notes) |        |              |
| `make down`        | Stop & remove containers (keep volumes)                           |        |              |
| `make restart`     | Restart containers                                                |        |              |
| `make rebuild`     | Rebuild tutor-api image                                           |        |              |
| `make logs`        | Tail logs for all services                                        |        |              |
| `make seed`        | Re-ingest notes from `./data`                                     |        |              |
| `make test`        | Run a sample tutor request                                        |        |              |
| `make status`      | Show health + running containers                                  |        |              |
| `make ip`          | Print container IPs                                               |        |              |
| `make shell S=svc` | Open shell inside a service (\`S=ollama | chroma | tutor-api | cpp-runner\`) |
| `make clean`       | Down + remove volumes (⚠ deletes model + embeddings)              |        |              |
| `make reset`       | Clean + fresh up                                                  |        |              |

---

## 🖥️ Container Layout

* **ollama** → Runs `gpt-oss:20b` model, exposed at `http://localhost:11434`
* **chroma** → Vector store, exposed at `http://localhost:8001`
* **tutor-api** → FastAPI service, exposed at `http://localhost:8000`
* **cpp-runner** → g++ compile-and-run API at `http://localhost:5055` (POST `/run` with `{ "code": "..." }`)

---

## 🧪 Testing

```bash
make test
```

Sample response should return a worked-out explanation of a DSA problem.

---

## 🧹 Teardown

```bash
make down   # stop containers
make clean  # also remove volumes (model + embeddings)
```

---

## ⚡ GPU Support

If you have an NVIDIA GPU:

* Install [NVIDIA Container Toolkit for Podman](https://github.com/NVIDIA/nvidia-container-toolkit).
* Ensure `nvidia-container-runtime` hooks are configured.
* Ollama will detect the GPU automatically if hooks are set.

---

## 📂 Project Structure

```
.
├── podman-compose.yml     # Service definitions
├── Makefile               # Easy commands
├── check_podman.sh        # Ensures Podman + rootless setup
├── up.sh / down.sh        # Scripts for bringing stack up/down
├── seed.sh / test.sh      # Ingestion + test scripts
├── tutor-api/             # FastAPI service
│   ├── app.py
│   ├── ingest.py
│   ├── Dockerfile
│   └── requirements.txt
└── data/                  # Your DSA markdown notes
```

---

## 🙋 FAQ

**Q: Can I use Docker instead of Podman?**
A: Yes—`podman-compose.yml` is Docker Compose v3 syntax. Swap `podman compose` for `docker compose`.

**Q: Where is the model stored?**
A: Inside the named `ollama` Podman volume (`~/.local/share/containers/storage/volumes/ollama`).

**Q: How do I add new datasets?**
A: Drop `*.md` files into `./data/`, then `make seed`.

---

## 🔒 License

This repo glues together open-source components:

* [`gpt-oss`](https://ollama.com/library/gpt-oss) (Apache-2.0)
* [Chroma](https://github.com/chroma-core/chroma) (Apache-2.0)
* [Sentence-Transformers](https://www.sbert.net/) (Apache-2.0)
* [FastAPI](https://fastapi.tiangolo.com/) (MIT)

Your notes (`./data`) remain your own content.
