export function renderLab(main){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `
    <h2>DSA Lab</h2>
    <div class="muted">Practice patterns by writing code and running custom inputs. Pick a language, paste or write a function, and supply JSON args to run.</div>
    <div class="row" style="gap:8px;margin:8px 0">
      <label>Language</label>
      <select id="labLang"><option value="python">Python</option><option value="cpp">C++</option><option value="javascript">JavaScript</option></select>
      <span class="spacer"></span>
      <button id="labRun" class="btn">Run</button>
    </div>
    <div class="grid cols-2">
      <div>
        <div class="muted">Function name</div>
        <input id="labName" type="text" value="solve" />
        <div class="muted" style="margin-top:6px">Code</div>
        <textarea id="labEditor" class="code editor" rows="14"></textarea>
      </div>
      <div>
        <div class="muted">Args (JSON array)</div>
        <textarea id="labArgs" class="code editor" rows="6">[]</textarea>
        <div id="labOut" class="section" style="margin-top:8px"><div class="muted">Output will appear here.</div></div>
      </div>
    </div>`;
  main.appendChild(box);

  const langSel = box.querySelector('#labLang');
  const nameEl = box.querySelector('#labName');
  const editor = box.querySelector('#labEditor');
  const argsEl = box.querySelector('#labArgs');
  const out = box.querySelector('#labOut');
  langSel.value = localStorage.getItem('dsa-lang') || 'python';
  setStarter();
  langSel.onchange = ()=>{ localStorage.setItem('dsa-lang', langSel.value); setStarter(); };
  function setStarter(){
    const n = nameEl.value || 'solve';
    if(langSel.value==='python') editor.value = `def ${n}(*args):\n    # TODO: implement\n    return None\n`;
    else if(langSel.value==='cpp') editor.value = `#include <bits/stdc++.h>\nusing namespace std;\n\nauto ${n}(){\n    // TODO\n    return 0;\n}\n`;
    else editor.value = `function ${n}(){\n  // TODO\n}\n`;
  }
  box.querySelector('#labRun').onclick = async () => {
    const lang = langSel.value;
    const fname = nameEl.value.trim()||'solve';
    const code = editor.value;
    let args;
    try{ args = JSON.parse(argsEl.value); if(!Array.isArray(args)) throw new Error('Args must be an array'); }
    catch(e){ out.innerHTML = `<div class="danger-text">Invalid JSON: ${e}</div>`; return; }
    try{
      let result;
      if(lang==='javascript'){
        const fn = new Function(`return (function(){${code}; return typeof ${fname}==='function'? ${fname}: null;})()` )();
        if(!fn) throw new Error('Function not found');
        result = fn.apply(null, args);
      } else if(lang==='python'){
        const py = await ensurePyodideLab();
        await py.runPythonAsync(code);
        const pyFn = py.globals.get(fname);
        if(!pyFn) throw new Error('Function not found');
        const ret = pyFn(...args.map(v=>py.toPy(v)));
        result = ret && typeof ret.toJs==='function'? ret.toJs(): ret;
      } else if(lang==='cpp'){
        const res = await runCppSingleOnlineLab(code, fname, args);
        result = res;
      }
      out.innerHTML = `<div class="code">${escapeHtml(JSON.stringify(result))}</div>`;
    }catch(e){ out.innerHTML = `<div class="danger-text">${e}</div>`; }
  };
}

function escapeHtml(s){
  return String(s).replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
}

async function ensurePyodideLab(){
  if(!window.loadPyodide){ throw new Error('Pyodide not loaded (enable network or vendor locally).'); }
  if(!window.__pyodideLab){ window.__pyodideLab = window.loadPyodide({ indexURL: '/vendor/pyodide/full/' }).catch(()=> window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })); }
  return window.__pyodideLab;
}

async function runCppSingleOnlineLab(userCode, funcName, args){
  const argDecls = args.map((v,i)=>`auto __a${i} = ${jsToCppLiteral(v)};`).join('\n');
  const callArgs = args.map((_,i)=>`__a${i}`).join(', ');
  const code = `#include <bits/stdc++.h>\nusing namespace std;\n${userCode}\nstatic inline string to_json(const string& s){ string o; o.reserve(s.size()+2); o.push_back('"'); for(char c: s){ if(c=='\\\\'||c=='"'){ o.push_back('\\\\'); o.push_back(c);} else if(c=='\n'){ o+="\\n";} else o.push_back(c);} o.push_back('"'); return o;} template<class T, class=enable_if_t<is_arithmetic_v<T>>> string to_json(T x){ return to_string(x);} template<class T> string to_json(const vector<T>& v){ string s="["; for(size_t i=0;i<v.size();++i){ s+=to_json(v[i]); if(i+1<v.size()) s+=",";} s+="]"; return s;} int main(){ ${argDecls} auto r=${funcName}(${callArgs}); cout<<to_json(r)<<"\n"; }`;
  const payload = { cmd: "g++ -std=c++17 -O2 -pipe -static -s -o a.out main.cpp && ./a.out", src: code };
  const res = await fetch('https://coliru.stacked-crooked.com/compile', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  const text = await res.text();
  return text.trim();
}

function jsToCppLiteral(v){
  if(Array.isArray(v)){
    const t = Array.isArray(v[0])? 'vector<'+jsToCppLiteral(v[0]).match(/^std::vector<([^>]+)/)?RegExp.$1:'int'+'>':'int';
    const elems = v.map(jsToCppLiteral).join(', ');
    return `std::vector<${cppTypeOf(v)}>{ ${elems} }`;
  }
  switch(typeof v){
    case 'number': return Number.isInteger(v)? String(v): String(v);
    case 'string': return `std::string(${JSON.stringify(v)})`;
    case 'boolean': return v? 'true':'false';
    default: return '0';
  }
}

function cppTypeOf(v){
  if(Array.isArray(v)){
    if(v.length===0) return 'int';
    return `std::vector<${cppTypeOf(v[0])}>`;
  }
  switch(typeof v){ case 'number': return Number.isInteger(v)?'long long':'double'; case 'string': return 'std::string'; case 'boolean': return 'bool'; default: return 'int'; }
}

