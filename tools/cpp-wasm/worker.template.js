// Template worker for an offline C++ toolchain.
// Replace this file with a real worker that wires up your clang.js and WASI runtime.
// Expected messaging contract:
//  - onmessage: receives { code } (string containing main.cpp)
//  - responds: { stdout, stderr }

self.onmessage = async (e) => {
  const code = e.data && e.data.code || '';
  try{
    // TODO: integrate your compiler here (clang.js / wasi runner)
    // Example (pseudocode):
    // const exe = await clangCompile(code); // returns wasm module or binary
    // const { stdout, stderr } = await wasiRun(exe);
    // self.postMessage({ stdout, stderr }); return;
    throw new Error('worker.template.js: no offline toolchain installed.');
  }catch(err){
    self.postMessage({ stdout: '', stderr: String(err && err.message || err) });
  }
};

