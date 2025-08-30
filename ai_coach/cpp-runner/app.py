import os
import subprocess
import tempfile
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="DSA C++ Runner (g++)")


class RunBody(BaseModel):
    code: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/run")
def run(body: RunBody):
    # Compile and run in a temp dir; limit time and memory roughly
    with tempfile.TemporaryDirectory() as tmp:
        src = os.path.join(tmp, "main.cpp")
        exe = os.path.join(tmp, "a.out")
        with open(src, "w", encoding="utf-8") as f:
            f.write(body.code)

        try:
            compile_proc = subprocess.run(
                ["g++", "-std=c++17", "-O2", "-pipe", "-static", "-s", src, "-o", exe],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=20,
                check=False,
            )
            if compile_proc.returncode != 0:
                return {"stdout": compile_proc.stdout.decode("utf-8", "ignore"),
                        "stderr": compile_proc.stderr.decode("utf-8", "ignore"),
                        "error": "compile failed"}
        except subprocess.TimeoutExpired:
            return {"stdout": "", "stderr": "compile timeout", "error": "compile timeout"}

        try:
            run_proc = subprocess.run(
                [exe],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=10,
                check=False,
            )
            return {"stdout": run_proc.stdout.decode("utf-8", "ignore"),
                    "stderr": run_proc.stderr.decode("utf-8", "ignore")}
        except subprocess.TimeoutExpired:
            return {"stdout": "", "stderr": "run timeout", "error": "run timeout"}

