FROM python:3.11-slim

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
       g++ make ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY app.py /app/app.py

RUN pip install --no-cache-dir fastapi uvicorn[standard]

EXPOSE 5055
CMD ["uvicorn","app:app","--host","0.0.0.0","--port","5055"]

