// Offline C++ toolchain wrapper
// This file is a thin adapter that delegates to a web worker at
//   /vendor/cpp-wasm/worker.js
// which is expected to host a browser C++ toolchain (e.g., clang.js + wasi runtime)
// and implement a simple protocol: send {code} and receive {stdout, stderr}.

(function(){
  async function compileAndRun(code){
    if(typeof Worker === 'undefined') throw new Error('Web Workers not supported');
    const workerUrl = '/vendor/cpp-wasm/worker.js';
    const w = new Worker(workerUrl);
    const res = await new Promise((resolve, reject)=>{
      const timer = setTimeout(()=>{ try{ w.terminate(); }catch(_){} reject(new Error('C++ worker timeout')); }, 60000);
      w.onmessage = (e)=>{ clearTimeout(timer); resolve(e.data); };
      w.onerror = (e)=>{ clearTimeout(timer); reject(new Error('C++ worker error: '+(e.message||e))); };
      w.postMessage({ code });
    });
    if(res && res.stderr){ throw new Error(String(res.stderr).slice(0,400)); }
    return String(res && res.stdout || '');
  }
  window.__cppCompileAndRun = compileAndRun;
})();

