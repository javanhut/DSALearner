import { LabExecutor } from './lab-wasm.js';

export function renderLab(main){
  const executor = new LabExecutor();
  
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `
    <h2>DSA Lab</h2>
    <div class="muted">Practice patterns by writing code and running custom inputs. All languages run locally in your browser using WebAssembly.</div>
    <div class="row" style="gap:8px;margin:8px 0">
      <label>Language</label>
      <select id="labLang">
        <option value="cpp">C++ (WASM)</option>
        <option value="python">Python (WASM)</option>
        <option value="javascript">JavaScript</option>
      </select>
      <span class="spacer"></span>
      <button id="labRun" class="btn">Run</button>
      <button id="labClear" class="ghost">Clear Output</button>
    </div>
    <div id="langStatus" style="margin: 10px 0; padding: 10px; background: var(--bg); border-radius: 4px; display: none;">
      <div id="langStatusText"></div>
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
        <textarea id="labArgs" class="code editor" rows="6">[[2, 7, 11, 15], 9]</textarea>
        <div id="labOut" class="section" style="margin-top:8px"><div class="muted">Output will appear here.</div></div>
      </div>
    </div>`;
  main.appendChild(box);

  const langSel = box.querySelector('#labLang');
  const nameEl = box.querySelector('#labName');
  const editor = box.querySelector('#labEditor');
  const argsEl = box.querySelector('#labArgs');
  const out = box.querySelector('#labOut');
  const runBtn = box.querySelector('#labRun');
  const clearBtn = box.querySelector('#labClear');
  const statusDiv = box.querySelector('#langStatus');
  const statusText = box.querySelector('#langStatusText');
  
  langSel.value = localStorage.getItem('dsa-lang') || 'cpp';
  setStarter();
  
  langSel.onchange = ()=>{ 
    localStorage.setItem('dsa-lang', langSel.value); 
    setStarter(); 
  };
  
  clearBtn.onclick = () => {
    out.innerHTML = '<div class="muted">Output will appear here.</div>';
    statusDiv.style.display = 'none';
  };
  
  function setStarter(){
    const n = nameEl.value || 'solve';
    if(langSel.value === 'python') {
      editor.value = `def ${n}(arr, target):
    """
    Example: Two Sum problem
    Find indices of two numbers that add up to target
    """
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Example: ${n}([2,7,11,15], 9) returns [0,1]`;
    }
    else if(langSel.value === 'cpp') {
      editor.value = `#include <bits/stdc++.h>
using namespace std;

vector<int> ${n}(vector<int> nums, int target) {
    // Example: Two Sum problem
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                result.push_back(i);
                result.push_back(j);
                return result;
            }
        }
    }
    return result;
}`;
    }
    else {
      editor.value = `function ${n}(arr, target) {
  // Example: Two Sum problem
  const seen = new Map();
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(arr[i], i);
  }
  
  return [];
}`;
    }
  }
  
  runBtn.onclick = async () => {
    const lang = langSel.value;
    const fname = nameEl.value.trim() || 'solve';
    const code = editor.value;
    let args;
    
    // Validate JSON args
    try { 
      args = JSON.parse(argsEl.value); 
      if(!Array.isArray(args)) throw new Error('Args must be an array'); 
    }
    catch(e) { 
      out.innerHTML = `<div class="danger-text">Invalid JSON: ${e.message}</div>`; 
      return; 
    }
    
    // Show loading state
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
    out.innerHTML = `<div class="muted">Executing ${lang} code...</div>`;
    
    // Show language-specific status
    statusDiv.style.display = 'block';
    if (lang === 'python') {
      statusText.innerHTML = '<span style="color: var(--info);">⏳ Loading Python interpreter (first run may take 10-30 seconds)...</span>';
    } else if (lang === 'cpp') {
      statusText.innerHTML = '<span style="color: var(--info);">⚙️ Compiling and executing C++ code...</span>';
    } else {
      statusDiv.style.display = 'none';
    }
    
    try {
      const startTime = Date.now();
      const result = await executor.execute(lang, code, fname, args);
      const execTime = Date.now() - startTime;
      
      // Hide status on success
      statusDiv.style.display = 'none';
      
      // Display result
      out.innerHTML = `
        <div style="margin-bottom: 10px;">
          <span style="color: var(--ok);">✓ Execution successful</span>
          <span style="color: var(--muted); margin-left: 10px;">(${execTime}ms)</span>
        </div>
        ${result.output ? `
          <div style="margin-bottom: 10px;">
            <strong>Output:</strong>
            <pre style="background: var(--bg); padding: 8px; border-radius: 4px; margin-top: 5px;">${escapeHtml(result.output)}</pre>
          </div>
        ` : ''}
        <div>
          <strong>Return Value:</strong>
          <pre style="background: var(--bg); padding: 8px; border-radius: 4px; margin-top: 5px;">${escapeHtml(JSON.stringify(result.result, null, 2))}</pre>
        </div>`;
        
    } catch(e) { 
      // Show error status
      statusDiv.style.display = 'block';
      statusText.innerHTML = `<span style="color: var(--error);">❌ Execution failed</span>`;
      
      out.innerHTML = `<div class="danger-text">
        <strong>Error:</strong><br>
        ${escapeHtml(e.message)}
        ${e.stack ? `<br><br><details><summary>Stack Trace</summary><pre>${escapeHtml(e.stack)}</pre></details>` : ''}
      </div>`; 
    } finally {
      // Restore button state
      runBtn.disabled = false;
      runBtn.textContent = 'Run';
    }
  };
}

function escapeHtml(s){
  return String(s).replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
}