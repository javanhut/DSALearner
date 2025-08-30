FROM python:3.11-slim

# System deps for pytorch/sentence-transformers runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py /app/app.py
COPY ingest.py /app/ingest.py

# Data (mounted from host via compose)
RUN mkdir -p /app/data

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host","0.0.0.0","--port","8000"]

