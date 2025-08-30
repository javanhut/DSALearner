import { State } from './state.js';

export function renderLearn(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `
    <h2>${item.title} — Learn</h2>
    <div class="muted">Goal: build intuition and mental model before testing.</div>
    <div class="row" style="margin:6px 0 10px 0">
      <span class="pill">Difficulty: ${item.difficulty||'—'}</span>
      ${item.practice?.expectedComplexity ? `<span class="pill">Time: ${item.practice.expectedComplexity}</span>`:''}
      <span class="spacer"></span>
      <label for="tpl-lang">Template</label>
      <select id="tpl-lang"><option value="python">Python</option><option value="cpp">C++</option><option value="javascript">JavaScript</option></select>
    </div>
    <div class="grid">
      <div>${item.learn.intuition}</div>
      <div id="tplBox" class="code"></div>
      <div class="hint"><b>Visualization:</b> ${item.learn.visual}</div>
      <div class="hint"><b>Pattern:</b> ${item.learn.pattern}</div>
    </div>
  `;

  const fn = document.createElement('div');
  fn.className = 'section';
  fn.innerHTML = `
    <h3>Explain It Back</h3>
    <div class="muted">In 3-5 sentences, justify correctness (loop invariant / structure) and time-space tradeoffs.</div>
    <label for="just">Your justification</label>
    <textarea id="just" rows="6" placeholder="State the invariant or key argument, then show how it holds...">${(State.ensureItem(state, topic.id, item.id).justification)||''}</textarea>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="saveJust">Save</button>
      <span class="muted">Minimum 60 chars to count for mastery.</span>
    </div>
  `;
  box.appendChild(fn);

  main.appendChild(box);

  const tplBox = box.querySelector('#tplBox');
  const sel = box.querySelector('#tpl-lang');
  const pref = localStorage.getItem('dsa-lang') || 'python';
  sel.value = pref;
  const spec = item.practice || null;
  function setTpl(){
    const lang = sel.value;
    localStorage.setItem('dsa-lang', lang);
    if(lang==='javascript'){
      tplBox.innerHTML = `<small class="muted">Template (JS)</small>\n\n${escapeHtml(item.learn.template)}`;
    }else if(lang==='python'){
      tplBox.innerHTML = `<small class="muted">Template (Python)</small>\n\n${escapeHtml(genPythonTemplate(spec, item))}`;
    }else{
      tplBox.innerHTML = `<small class="muted">Template (C++)</small>\n\n${escapeHtml(genCppTemplate(spec, item))}`;
    }
  }
  sel.onchange = setTpl;
  setTpl();

  document.getElementById('saveJust').onclick = ()=>{
    const it = State.ensureItem(state, topic.id, item.id);
    const val = document.getElementById('just').value.trim();
    it.justification = val;
    it.learnDone = true;
    State.setMastery(state, topic.id, item.id);
    State.save(state);
    alert('Saved.');
  };
}

function escapeHtml(s){
  return s.replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
}

function genPythonTemplate(spec, item){
  const fname = spec?.funcName || guessFunctionName(item?.learn?.template) || 'solve';
  const argn = (spec?.tests?.[0]?.input||[]).length;
  const params = genParamNames(argn).join(', ');
  return `def ${fname}(${params}):\n    """${(item?.brief||'').replace(/\n/g,' ')}"""\n    # TODO: implement\n    pass`;
}

function genCppTemplate(spec, item){
  const fname = spec?.funcName || guessFunctionName(item?.learn?.template) || 'solve';
  const argn = (spec?.tests?.[0]?.input||[]).length;
  const params = genParamNames(argn).map(n=>`/*auto*/ ${n}`).join(', ');
  return `#include <bits/stdc++.h>\nusing namespace std;\n\n// ${(item?.brief||'').replace(/\n/g,' ')}\nauto ${fname}(${params}){\n    // TODO\n    return 0;\n}`;
}

function genParamNames(n){
  const names = [];
  const letters = ['a','b','c','d','e','f','g','h','i'];
  for(let i=0;i<n;i++) names.push(letters[i]||('arg'+i));
  return names;
}

function guessFunctionName(jsTemplate){
  try{
    const m = (jsTemplate||'').match(/function\s+([a-zA-Z0-9_]+)/);
    return m? m[1]: null;
  }catch{ return null; }
}
