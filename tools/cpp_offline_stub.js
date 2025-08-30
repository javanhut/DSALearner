// Tries to detect a vendored offline C++ toolchain under /vendor/cpp-wasm/
// If present, it should expose a global compile/run API. This stub only sets a flag.
(function(){
  // We expect a vendor script to expose window.__cppCompileAndRun(sourceCode) -> Promise<string>
  // Put your toolchain entry at /vendor/cpp-wasm/toolchain.js or override window.__cppCompileAndRun yourself.
  function tryLoad(src){
    return new Promise((resolve)=>{ const s=document.createElement('script'); s.src=src; s.onload=()=>resolve(true); s.onerror=()=>resolve(false); document.head.appendChild(s); });
  }
  (async ()=>{
    const ok = await tryLoad('/vendor/cpp-wasm/toolchain.js');
    if(ok && typeof window.__cppCompileAndRun === 'function'){
      window.__cppOfflineAvailable = true;
    } else {
      window.__cppOfflineAvailable = false;
    }
  })();
})();
