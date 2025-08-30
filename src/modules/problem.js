import { State } from './state.js';

export function renderProblem(main, state, topic, item){
  const spec = item.practice;
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `
    <h2>${item.title} — Practice (Coding)</h2>
    <div class="muted">Write your solution in Python or C++ (or JavaScript if you prefer). Function name: <code>${spec.funcName}</code>.</div>
    <div class="hint"><b>Constraints:</b> ${spec.constraints}</div>
  `;

  const split = document.createElement('div');
  split.className = 'grid cols-2';

  const editor = document.createElement('textarea');
  editor.className = 'code editor';
  split.appendChild(editor);

  const right = document.createElement('div');
  right.className = 'list';
  const testsBox = document.createElement('div');
  testsBox.className = 'section';
  testsBox.innerHTML = `<h3>Tests</h3><div class="muted">Hidden tests reflect edge cases used in interviews.</div>`;
  right.appendChild(testsBox);

  const runRow = document.createElement('div');
  runRow.className = 'row';
  const langSel = document.createElement('select');
  langSel.innerHTML = '<option value="python">Python</option><option value="cpp">C++</option><option value="javascript">JavaScript</option>';
  const runBtn = document.createElement('button'); runBtn.className='btn'; runBtn.textContent='Run Tests';
  const revealBtn = document.createElement('button'); revealBtn.className='btn secondary'; revealBtn.textContent='Reveal Optimal (after mastery)';
  runRow.appendChild(langSel); runRow.appendChild(runBtn); runRow.appendChild(revealBtn);
  right.appendChild(runRow);

  const out = document.createElement('div');
  out.className = 'section';
  out.innerHTML = '<div class="muted">Output will appear here.</div>';
  right.appendChild(out);

  // Custom run box to experiment with your own inputs
  const custom = document.createElement('div');
  custom.className = 'section';
  custom.innerHTML = `
    <h3>Custom Run</h3>
    <div class="muted">Enter JSON array of arguments for <code>${spec.funcName}</code>, then run.</div>
    <textarea id="customArgs" class="code editor" rows="4">${escapeHtml(JSON.stringify(spec.tests?.[0]?.input || [], null, 2))}</textarea>
    <div class="row" style="margin-top:8px"><button id="customRun" class="ghost">Run Custom</button></div>`;
  right.appendChild(custom);

  split.appendChild(right);
  box.appendChild(split);
  main.appendChild(box);

  // Preferred language
  const pref = localStorage.getItem('dsa-lang') || 'python';
  langSel.value = pref;
  setEditorForLang(pref);
  revealBtn.style.display = langSel.value === 'javascript' ? '' : 'none';

  langSel.onchange = () => {
    localStorage.setItem('dsa-lang', langSel.value);
    setEditorForLang(langSel.value, true);
    // Hide optimal if not JS (until specific optimal snippets exist)
    revealBtn.style.display = langSel.value === 'javascript' ? '' : 'none';
  };

  runBtn.onclick = async () => {
    const code = editor.value;
    const lang = langSel.value;
    try{
      let res;
      if(lang === 'javascript'){
        const fn = buildFunction(code, spec.funcName);
        res = runTests(fn, spec.tests);
      } else if(lang === 'python'){
        res = await runTestsPython(code, spec.funcName, spec.tests);
      } else if(lang === 'cpp'){
        res = await runTestsCpp(code, spec.funcName, spec.tests);
      } else {
        out.innerHTML = `<div class="danger-text">Unknown language selection.</div>`; return;
      }
      const it = State.ensureItem(state, topic.id, item.id);
      it.codeAttempts += 1;
      it.codePassed = res.passed;
      State.setMastery(state, topic.id, item.id);
      State.save(state);
      out.innerHTML = renderResults(res, spec.expectedComplexity);
    }catch(e){
      out.innerHTML = `<div class="danger-text">${e}</div>`;
    }
  };

  // Custom run handler
  custom.querySelector('#customRun').onclick = async () => {
    const code = editor.value;
    const lang = langSel.value;
    let args;
    try{ args = JSON.parse(custom.querySelector('#customArgs').value); if(!Array.isArray(args)) throw new Error('Provide a JSON array'); }
    catch(e){ out.innerHTML = `<div class="danger-text">Invalid JSON: ${e}</div>`; return; }
    try{
      let result;
      if(lang==='javascript'){
        const fn = buildFunction(code, spec.funcName);
        result = fn.apply(null, args);
      } else if(lang==='python'){
        const py = await ensurePyodide();
        await py.runPythonAsync(code);
        const pyFn = py.globals.get(spec.funcName);
        if(!pyFn) throw new Error('Function '+spec.funcName+' not found');
        const ret = pyFn(...args.map(v=>py.toPy(v)));
        result = ret && typeof ret.toJs==='function' ? ret.toJs() : ret;
      } else if(lang==='cpp'){
        const single = await runTestsCppOnline(code, spec.funcName, [{input:args, expected:null}]);
        result = single.results[0]?.got;
      }
      out.innerHTML = `<div class="section"><div><b>Custom Output:</b></div><div class="code">${escapeHtml(JSON.stringify(result))}</div></div>`;
    }catch(e){ out.innerHTML = `<div class="danger-text">${e}</div>`; }
  };

  revealBtn.onclick = () => {
    const it = State.ensureItem(state, topic.id, item.id);
    if(!it.mastered){
      alert('Show optimal only after mastery: pass tests, quiz >=80%, and justification (>=60 chars).');
      return;
    }
    const sol = document.createElement('div');
    sol.innerHTML = `<div class="code">${escapeHtml(spec.optimal.trim())}</div>`;
    out.innerHTML = '';
    out.appendChild(sol);
  };
  function setEditorForLang(lang, switched=false){
    if(lang === 'javascript'){
      editor.value = spec.starter.trim();
    } else if(lang === 'python'){
      editor.value = genPythonStarter(spec).trim();
    } else if(lang === 'cpp'){
      editor.value = genCppStarter(spec).trim();
    }
  }
}

function buildFunction(userCode, funcName){
  const wrapped = `return (function(){\n${userCode}\n; if (typeof ${funcName} !== 'function') throw new Error('Function ${funcName} not found'); return ${funcName}; })()`;
  // eslint-disable-next-line no-new-func
  try{
    return new Function(wrapped)();
  }catch(e){
    throw new Error('Build failed: ' + e.message);
  }
}

function runTests(fn, tests){
  const results = [];
  let passed = true;
  const times = [];
  for(const t of tests){
    const start = performance.now();
    let out;
    let ok = false;
    let err = null;
    try{
      out = fn.apply(null, t.input);
      ok = compare(out, t.expected);
    }catch(e){ err = e.message; ok = false; }
    const time = performance.now()-start;
    times.push({n:t.n||0, time});
    if(!ok) passed = false;
    results.push({input:t.input, got:out, expected:t.expected, ok, err, time});
  }
  const runtime = estimateComplexity(times);
  return { passed, results, runtime };
}

function compare(a,b){
  return JSON.stringify(a) === JSON.stringify(b);
}

function estimateComplexity(times){
  // crude: check growth of time vs n (if provided)
  const pts = times.filter(t=>t.n && t.time >= 0).sort((a,b)=>a.n-b.n);
  if(pts.length < 2) return {guess:'unknown', detail:'Insufficient data'};
  let ratios = [];
  for(let i=1;i<pts.length;i++){
    const dn = pts[i].n / pts[i-1].n;
    const dt = (pts[i].time+1) / (pts[i-1].time+1);
    ratios.push({dn, dt});
  }
  const avg = ratios.reduce((a,r)=>a + r.dt/r.dn,0)/ratios.length;
  let guess = 'O(n)';
  if(avg < 0.7) guess = 'O(log n)';
  else if(avg < 1.5) guess = 'O(n)';
  else if(avg < 3) guess = 'O(n log n)';
  else guess = 'O(n^2) or worse';
  return {guess, detail:`avg growth factor ≈ ${avg.toFixed(2)}`};
}

function renderResults(res, expected){
  const div = document.createElement('div');
  const badge = res.passed ? '<span class="pill ok">All tests passed</span>' : '<span class="pill danger-text">Some tests failed</span>';
  div.innerHTML = `<div class="row">${badge}<span class="spacer"></span><span class="pill">Runtime: ${res.runtime.guess} (expected: ${expected})</span></div>`;
  res.results.forEach((r, i) => {
    const row = document.createElement('div');
    row.className = 'hint';
    const head = `#${i+1} n=${r.input?.[0]?.length||r.input?.length||''} — ${r.ok? 'OK':'Fail'}`;
    row.innerHTML = `<div><b>${head}</b> <small class="muted">${r.time.toFixed(2)}ms</small></div>
      <div><small class="muted">input:</small> <code>${escapeHtml(JSON.stringify(r.input))}</code></div>
      ${r.err? `<div class="danger-text">${r.err}</div>` : `<div><small class="muted">expected:</small> <code>${escapeHtml(JSON.stringify(r.expected))}</code> | <small class="muted">got:</small> <code>${escapeHtml(JSON.stringify(r.got))}</code></div>`}`;
    div.appendChild(row);
  });
  return div.outerHTML;
}

function escapeHtml(s){
  return String(s).replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
}

// ---- Python support via Pyodide ----
let __pyodidePromise = null;
async function ensurePyodide(){
  if(!window.loadPyodide){
    await loadPyodideScript();
    if(!window.loadPyodide){
      throw new Error('Pyodide failed to load. If offline, run `make pyodide-fetch` and reload.');
    }
  }
  if(!__pyodidePromise){
    const isLocal = Array.from(document.scripts||[]).some(s=>/vendor\/pyodide\/pyodide\.js/.test(s.src||''));
    const indexURL = isLocal ? '/vendor/pyodide/full/' : 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/';
    __pyodidePromise = window.loadPyodide({ indexURL });
  }
  return __pyodidePromise;
}

function loadPyodideScript(){
  return new Promise((resolve)=>{
    // Try local vendor copy first
    const localSrc = '/vendor/pyodide/pyodide.js';
    const cdnSrc = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    const add = (src)=>{ const s=document.createElement('script'); s.src=src; s.async=true; s.onload=()=>resolve(); s.onerror=()=>resolve(); document.head.appendChild(s); };
    add(localSrc);
    // Also schedule CDN fallback if local doesn’t define loadPyodide in time
    setTimeout(()=>{ if(!window.loadPyodide) add(cdnSrc); }, 1200);
    // Safety timeout to resolve anyway
    setTimeout(()=>resolve(), 4000);
  });
}

async function runTestsPython(code, funcName, tests){
  const py = await ensurePyodide();
  try{
    await py.runPythonAsync(code);
  }catch(e){ throw new Error('Build failed: ' + (e.message||e)); }
  const pyFn = py.globals.get(funcName);
  if(!pyFn) throw new Error('Function '+funcName+' not found in Python code');
  const results=[]; let passed=true; const times=[];
  for(const t of tests){
    const start = performance.now();
    let out, ok=false, err=null;
    try{
      const args = (t.input||[]).map(v => py.toPy(v));
      const ret = pyFn(...args);
      // Convert Python result to JS
      if(ret && typeof ret.toJs === 'function') out = ret.toJs();
      else if(py.ffi && typeof py.ffi.toJs === 'function') out = py.ffi.toJs(ret);
      else out = ret;
      if(ret && typeof ret.destroy === 'function') ret.destroy();
      ok = compare(out, t.expected);
    }catch(e){ err = e.message||String(e); ok=false; }
    const time = performance.now()-start;
    times.push({n:t.n||0, time});
    if(!ok) passed=false;
    results.push({input:t.input, got:out, expected:t.expected, ok, err, time});
  }
  try{ if(pyFn && typeof pyFn.destroy==='function') pyFn.destroy(); }catch(_){}
  const runtime = estimateComplexity(times);
  return { passed, results, runtime };
}

function genPythonStarter(spec){
  const curated = curatedPython(spec.funcName);
  if(curated) return curated;
  const sig = parseJsSignature(spec.starter, spec.funcName);
  const params = sig.params.length? sig.params.join(', ') : genParamNames((spec.tests?.[0]?.input||[]).length).join(', ');
  return `# Implement ${spec.funcName} in Python\n`+
         `def ${spec.funcName}(${params}):\n`+
         `    # TODO: write your solution\n`+
         `    pass\n`;
}

function genCppStarter(spec){
  const curated = curatedCpp(spec.funcName, (spec.tests?.[0]?.input||[]).length);
  if(curated) return curated;
  const argn = (spec.tests?.[0]?.input||[]).length;
  const params = genParamNames(argn).map(n=>`/*auto*/ ${n}`).join(', ');
  return `// Implement ${spec.funcName} in C++\n`+
`#include <\bits\stdc++.h>\nusing namespace std;\n\n`.replace('\\\\','\\')+
`// Adjust return/param types as needed for the problem\n`+
`auto ${spec.funcName}(${params}){\n`+
`    // TODO\n`+
`    return 0;\n`+
`}\n`;
}

function parseJsSignature(starter, fallbackName){
  try{
    const m = starter.match(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/);
    if(!m) return { name:fallbackName, params:[] };
    const name = m[1];
    const params = m[2].split(',').map(s=>s.trim()).filter(Boolean);
    return { name, params };
  }catch{ return { name:fallbackName, params:[] }; }
}

function genParamNames(n){
  const names = [];
  const letters = ['a','b','c','d','e','f','g','h','i'];
  for(let i=0;i<n;i++) names.push(letters[i]||('arg'+i));
  return names;
}
function curatedPython(name){
  if(name==='twoSumSorted'){
    return `def twoSumSorted(nums, target):\n    i, j = 0, len(nums)-1\n    while i < j:\n        s = nums[i] + nums[j]\n        if s == target:\n            return [i, j]\n        if s < target:\n            i += 1\n        else:\n            j -= 1\n    return [-1, -1]\n`;
  }
  if(name==='lengthOfLongestSubstring'){
    return `def lengthOfLongestSubstring(s):\n    last = {}\n    best = 0\n    left = 0\n    for r, ch in enumerate(s):\n        if ch in last:\n            left = max(left, last[ch] + 1)\n        last[ch] = r\n        best = max(best, r - left + 1)\n    return best\n`;
  }
  if(name==='lowerBound'){
    return `def lowerBound(a, x):\n    lo, hi = 0, len(a)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if a[mid] >= x:\n            hi = mid\n        else:\n            lo = mid + 1\n    return lo\n`;
  }
  if(name==='kthLargest'){
    return `import heapq\n\n\n\ndef kthLargest(nums, k):\n    h = []\n    for x in nums:\n        if len(h) < k:\n            heapq.heappush(h, x)\n        else:\n            if x > h[0]:\n                heapq.heapreplace(h, x)\n    return h[0] if h else None\n`;
  }
  if(name==='coinChange'){
    return `def coinChange(coins, amount):\n    INF = 10**9\n    dp = [INF]*(amount+1)\n    dp[0] = 0\n    for c in coins:\n        for a in range(c, amount+1):\n            if dp[a-c] + 1 < dp[a]:\n                dp[a] = dp[a-c] + 1\n    return -1 if dp[amount] >= 10**9 else dp[amount]\n`;
  }
  if(name==='threeSum'){
    return `def threeSum(nums):\n    nums.sort()\n    res = []\n    n = len(nums)\n    for i in range(n):\n        if i and nums[i]==nums[i-1]:\n            continue\n        j, k = i+1, n-1\n        while j<k:\n            s = nums[i] + nums[j] + nums[k]\n            if s==0:\n                res.append([nums[i], nums[j], nums[k]])\n                j += 1; k -= 1\n                while j<k and nums[j]==nums[j-1]: j+=1\n                while j<k and nums[k]==nums[k+1]: k-=1\n            elif s<0:\n                j += 1\n            else:\n                k -= 1\n    return res\n`;
  }
  if(name==='minWindow'){
    return `def minWindow(s, t):\n    from collections import Counter\n    need = Counter(t)\n    missing = len(t)\n    best = (10**9, 0, 0)\n    l = 0\n    for r,ch in enumerate(s):\n        if need[ch] > 0:\n            missing -= 1\n        need[ch] -= 1\n        while missing == 0:\n            if r-l+1 < best[0]: best = (r-l+1,l,r+1)\n            cl = s[l]\n            need[cl] += 1\n            if need[cl] > 0: missing += 1\n            l += 1\n    return '' if best[0] == 10**9 else s[best[1]:best[2]]\n`;
  }
  if(name==='groupAnagrams'){
    return `def groupAnagrams(strs):\n    from collections import defaultdict\n    m = defaultdict(list)\n    for s in strs:\n        key = ''.join(sorted(s))\n        m[key].append(s)\n    return [sorted(v) for v in sorted(m.values(), key=lambda g: g[0])]\n`;
  }
  if(name==='dailyTemperatures'){
    return `def dailyTemperatures(T):\n    n=len(T); ans=[0]*n; st=[]\n    for i,x in enumerate(T):\n        while st and x>T[st[-1]]:\n            j=st.pop(); ans[j]=i-j\n        st.append(i)\n    return ans\n`;
  }
  if(name==='shortestPath'){
    return `def shortestPath(start, target, adj):\n    from collections import deque\n    q=deque([(start,0)])\n    vis={start}\n    while q:\n        u,d=q.popleft()\n        if u==target: return d\n        for v in adj.get(u,[]):\n            if v not in vis:\n                vis.add(v); q.append((v,d+1))\n    return -1\n`;
  }
  if(name==='dijkstra'){
    return `def dijkstra(n, edges, src):\n    adj=[[] for _ in range(n)]\n    for u,v,w in edges:\n        adj[u].append((v,w)); adj[v].append((u,w))\n    import heapq\n    INF=10**18; dist=[INF]*n; dist[src]=0\n    pq=[(0,src)]\n    while pq:\n        d,u=heapq.heappop(pq)\n        if d!=dist[u]: continue\n        for v,w in adj[u]:\n            nd=d+w\n            if nd<dist[v]: dist[v]=nd; heapq.heappush(pq,(nd,v))\n    return dist\n`;
  }
  if(name==='countComponents'){
    return `def countComponents(n, edges):\n    p=list(range(n)); r=[0]*n\n    def f(a):\n        while a!=p[a]: p[a]=p[p[a]]; a=p[a]\n        return a\n    def u(a,b):\n        a=f(a); b=f(b)\n        if a==b: return False\n        if r[a]<r[b]: a,b=b,a\n        p[b]=a\n        if r[a]==r[b]: r[a]+=1\n        return True\n    c=n\n    for a,b in edges:\n        if u(a,b): c-=1\n    return c\n`;
  }
  if(name==='numIslands'){
    return `def numIslands(g):\n    if not g: return 0\n    m=len(g); n=len(g[0])\n    def dfs(i,j):\n      if i<0 or j<0 or i>=m or j>=n or g[i][j] != '1': return\n      g[i][j]='0'\n      dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)\n    c=0\n    for i in range(m):\n      for j in range(n):\n        if g[i][j]=='1': c+=1; dfs(i,j)\n    return c\n`;
  }
  if(name==='lengthOfLIS'){
    return `def lengthOfLIS(a):\n    import bisect\n    tails=[]\n    for x in a:\n        i=bisect.bisect_left(tails, x)\n        if i==len(tails): tails.append(x)\n        else: tails[i]=x\n    return len(tails)\n`;
  }
  if(name==='jump'){
    return `def jump(nums):\n    jumps=0; end=0; far=0\n    for i in range(len(nums)-1):\n        far=max(far, i+nums[i])\n        if i==end:\n            jumps += 1; end = far\n    return jumps\n`;
  }
  return '';
}
function curatedCpp(name){
  if(name==='twoSumSorted'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSumSorted(const vector<int>& nums, int target){\n    int i=0, j=(int)nums.size()-1;\n    while(i<j){\n        long long s = (long long)nums[i] + nums[j];\n        if(s==target) return {i,j};\n        if(s<target) i++; else j--;\n    }\n    return {-1,-1};\n}\n`;
  }
  if(name==='lengthOfLongestSubstring'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLongestSubstring(const string& s){\n    vector<int> last(256, -1);\n    int best=0, left=0;\n    for(int r=0;r<(int)s.size();++r){\n        unsigned char ch = s[r];\n        if(last[ch] != -1) left = max(left, last[ch]+1);\n        last[ch] = r;\n        best = max(best, r-left+1);\n    }\n    return best;\n}\n`;
  }
  if(name==='lowerBound'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint lowerBound(const vector<int>& a, int x){\n    int lo=0, hi=(int)a.size();\n    while(lo<hi){\n        int mid=(lo+hi)/2;\n        if(a[mid]>=x) hi=mid; else lo=mid+1;\n    }\n    return lo;\n}\n`;
  }
  if(name==='kthLargest'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint kthLargest(const vector<int>& nums, int k){\n    priority_queue<int, vector<int>, greater<int>> pq;\n    for(int x: nums){\n        if((int)pq.size()<k) pq.push(x);\n        else if(x>pq.top()){ pq.pop(); pq.push(x);}\n    }\n    return pq.top();\n}\n`;
  }
  if(name==='coinChange'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint coinChange(vector<int> coins, int amount){\n    const int INF = 1e9;\n    vector<int> dp(amount+1, INF); dp[0]=0;\n    for(int c: coins){\n        for(int a=c;a<=amount;++a){\n            dp[a] = min(dp[a], dp[a-c]+1);\n        }\n    }\n    return dp[amount]>=INF?-1:dp[amount];\n}\n`;
  }
  if(name==='threeSum'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int> nums){\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> res; int n=nums.size();\n    for(int i=0;i<n;i++){ if(i&&nums[i]==nums[i-1]) continue; int j=i+1,k=n-1; while(j<k){ long long s=(long long)nums[i]+nums[j]+nums[k]; if(s==0){ res.push_back({nums[i],nums[j],nums[k]}); j++; k--; while(j<k&&nums[j]==nums[j-1]) j++; while(j<k&&nums[k]==nums[k+1]) k--; } else if(s<0) j++; else k--; } }\n    return res;\n}\n`;
  }
  if(name==='minWindow'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nstring minWindow(const string& s, const string& t){\n    vector<int> need(256,0); for(char c: t) need[(unsigned char)c]++; int missing=t.size();\n    int bestL=0,bestR=0,bestLen=INT_MAX; int l=0;\n    for(int r=0;r<(int)s.size();++r){ unsigned char ch=s[r]; if(need[ch]>0) missing--; need[ch]--; while(missing==0){ if(r-l+1<bestLen){ bestLen=r-l+1; bestL=l; bestR=r+1; } unsigned char cl=s[l]; need[cl]++; if(need[cl]>0) missing++; l++; } }\n    return bestLen==INT_MAX? string(): s.substr(bestL,bestLen);\n}\n`;
  }
  if(name==='groupAnagrams'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<vector<string>> groupAnagrams(vector<string> strs){\n    unordered_map<string, vector<string>> m;\n    for(auto &s: strs){ string key=s; sort(key.begin(), key.end()); m[key].push_back(s);}\n    vector<vector<string>> res; res.reserve(m.size());\n    for(auto &kv: m){ auto v=kv.second; sort(v.begin(), v.end()); res.push_back(move(v)); }\n    sort(res.begin(), res.end(), [](auto &a, auto &b){ return a[0]<b[0];}); return res;\n}\n`;
  }
  if(name==='dailyTemperatures'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> dailyTemperatures(vector<int> T){\n    int n=T.size(); vector<int> ans(n,0), st; st.reserve(n);\n    for(int i=0;i<n;i++){ while(!st.empty() && T[i]>T[st.back()]){ int j=st.back(); st.pop_back(); ans[j]=i-j; } st.push_back(i);} return ans;\n}\n`;
  }
  if(name==='shortestPath'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint shortestPath(string start, string target, unordered_map<string, vector<string>> adj){\n    queue<pair<string,int>> q; unordered_set<string> vis; q.push({start,0}); vis.insert(start);\n    while(!q.empty()){ auto [u,d]=q.front(); q.pop(); if(u==target) return d; for(auto &v: adj[u]) if(!vis.count(v)){ vis.insert(v); q.push({v,d+1}); } } return -1;\n}\n`;
  }
  if(name==='dijkstra'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<long long> dijkstra(int n, vector<array<int,3>> edges, int src){\n    vector<vector<pair<int,int>>> adj(n); for(auto &e: edges){ int u=e[0],v=e[1],w=e[2]; adj[u].push_back({v,w}); adj[v].push_back({u,w}); }\n    const long long INF=9e18; vector<long long> dist(n,INF); dist[src]=0; using P=pair<long long,int>; priority_queue<P,vector<P>,greater<P>> pq; pq.push({0,src});\n    while(!pq.empty()){ auto [d,u]=pq.top(); pq.pop(); if(d!=dist[u]) continue; for(auto [v,w]: adj[u]){ long long nd=d+w; if(nd<dist[v]){ dist[v]=nd; pq.push({nd,v}); } } } return dist;\n}\n`;
  }
  if(name==='countComponents'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint countComponents(int n, vector<array<int,2>> edges){\n    vector<int> p(n), r(n); iota(p.begin(), p.end(), 0); function<int(int)> f=[&](int a){ return p[a]==a? a: p[a]=f(p[a]); }; auto u=[&](int a,int b){ a=f(a); b=f(b); if(a==b) return false; if(r[a]<r[b]) swap(a,b); p[b]=a; if(r[a]==r[b]) r[a]++; return true; }; int c=n; for(auto &e: edges) if(u(e[0],e[1])) c--; return c;\n}\n`;
  }
  if(name==='numIslands'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint numIslands(vector<vector<char>> g){ if(g.empty()) return 0; int m=g.size(), n=g[0].size(), c=0; function<void(int,int)> dfs=[&](int i,int j){ if(i<0||j<0||i>=m||j>=n||g[i][j]!='1') return; g[i][j]='0'; dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1); }; for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]=='1'){ c++; dfs(i,j);} return c; }\n`;
  }
  if(name==='lengthOfLIS'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLIS(vector<int> a){ vector<int> t; for(int x: a){ auto it=lower_bound(t.begin(), t.end(), x); if(it==t.end()) t.push_back(x); else *it=x; } return (int)t.size(); }\n`;
  }
  if(name==='jump'){
    return `#include <bits/stdc++.h>\nusing namespace std;\n\nint jump(vector<int> nums){ int jumps=0,end=0,far=0; for(int i=0;i<(int)nums.size()-1;i++){ far=max(far, i+nums[i]); if(i==end){ jumps++; end=far; } } return jumps; }\n`;
  }
  return '';
}

// ---- C++ runner: prefer offline, fallback to online ----
async function runTestsCpp(userCode, funcName, tests){
  if(typeof window !== 'undefined' && typeof window.__cppCompileAndRun === 'function'){
    try{ return await runTestsCppOffline(userCode, funcName, tests); }catch(_){ /* fallback below */ }
  }
  try{ return await runTestsCppHttp(userCode, funcName, tests); }catch(_){ /* fallback to online */ }
  return runTestsCppOnline(userCode, funcName, tests);
}

async function runTestsCppOffline(userCode, funcName, tests){
  const harness = buildCppHarness(userCode, funcName, tests);
  let text;
  try{
    text = await window.__cppCompileAndRun(harness);
  }catch(e){ throw new Error('Offline C++ toolchain error: ' + (e.message||e)); }
  const lines = String(text||'').split(/\n/);
  const results=[]; let passed=true; let idx=0;
  for(const t of tests){
    const marker = `__TEST_${idx}__`;
    const line = lines.find(l=>l.startsWith(marker));
    let got=null, err=null;
    if(line){
      const json = line.slice(marker.length).trim();
      try{ got = JSON.parse(json); }catch{ got = json; }
    } else { err = 'no output'; }
    const ok = compare(got, t.expected);
    if(!ok) passed=false;
    results.push({input:t.input, got, expected:t.expected, ok, err, time:0});
    idx++;
  }
  return { passed, results, runtime:{guess:'unknown', detail:'offline wasm toolchain'} };
}

async function runTestsCppHttp(userCode, funcName, tests){
  const code = buildCppHarness(userCode, funcName, tests);
  const endpoint = (localStorage.getItem('cppRunnerUrl') || 'http://localhost:5055/run').trim();
  let text;
  try{
    const resp = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ code }) });
    const json = await resp.json();
    if(json.error) throw new Error(json.error);
    text = json.stdout || '';
  }catch(e){ throw new Error('Local C++ runner unavailable: ' + (e.message||e)); }
  const lines = text.split(/\n/);
  const results=[]; let passed=true; let idx=0;
  for(const t of tests){
    const marker = `__TEST_${idx}__`;
    const line = lines.find(l=>l.startsWith(marker));
    let got=null, err=null;
    if(line){ const json = line.slice(marker.length).trim(); try{ got = JSON.parse(json); }catch{ got = json; } }
    else { err = 'no output'; }
    const ok = compare(got, t.expected); if(!ok) passed=false;
    results.push({input:t.input, got, expected:t.expected, ok, err, time:0}); idx++;
  }
  return { passed, results, runtime:{guess:'unknown', detail:'local http'} };
}

// ---- C++ (online) using Coliru compile service ----
async function runTestsCppOnline(userCode, funcName, tests){
  const code = buildCppHarness(userCode, funcName, tests);
  const payload = {
    cmd: "g++ -std=c++17 -O2 -pipe -static -s -o a.out main.cpp && ./a.out",
    src: code
  };
  let text;
  try{
    const res = await fetch('https://coliru.stacked-crooked.com/compile', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    text = await res.text();
  }catch(e){
    throw new Error('C++ online runner unavailable (network/CORS). You can either vendor a local toolchain or run locally.');
  }
  const lines = text.split(/\n/);
  const results=[]; let passed=true; let idx=0;
  for(const t of tests){
    const marker = `__TEST_${idx}__`;
    const line = lines.find(l=>l.startsWith(marker));
    let got=null, err=null;
    if(line){
      const json = line.slice(marker.length).trim();
      try{ got = JSON.parse(json); }catch{ got = json; }
    } else {
      err = (text||'').slice(0,400);
    }
    const ok = compare(got, t.expected);
    if(!ok) passed=false;
    results.push({input:t.input, got, expected:t.expected, ok, err, time:0});
    idx++;
  }
  return { passed, results, runtime:{guess:'unknown', detail:'external compile'} };
}

function buildCppHarness(userCode, funcName, tests){
  const makeLit = (v)=>jsToCppLiteral(v);
  let testBlock = '';
  tests.forEach((t, i) => {
    const args = (t.input||[]).map((v,idx)=>`auto __a${idx} = ${makeLit(v)};`).join('\n      ');
    const argNames = (t.input||[]).map((_,idx)=>`__a${idx}`).join(', ');
    testBlock += `// Test ${i}\n      ${args}\n      auto __res${i} = ${funcName}(${argNames});\n      std::cout << "__TEST_${i}__ " << to_json(__res${i}) << "\n";\n\n      `;
  });
  return `#include <bits/stdc++.h>\nusing namespace std;\n\n${userCode}\n\n// JSON printers\nstatic inline string to_json(const string& s){ string o; o.reserve(s.size()+2); o.push_back('"'); for(char c: s){ if(c=='\\\\'||c=='"') { o.push_back('\\\\'); o.push_back(c);} else if(c=='\n'){ o+="\\n"; } else o.push_back(c);} o.push_back('"'); return o; }\nstatic inline string to_json(const char* s){ return to_json(string(s)); }\nstatic inline string to_json(bool b){ return b?"true":"false"; }\ntemplate<class T, class = enable_if_t<is_arithmetic_v<T>>> string to_json(T x){ return to_string(x); }\ntemplate<class T> string to_json(const vector<T>& v){ string s="["; for(size_t i=0;i<v.size();++i){ s+=to_json(v[i]); if(i+1<v.size()) s+=","; } s+="]"; return s; }\n\nint main(){ ios::sync_with_stdio(false); cin.tie(nullptr);\n  ${testBlock}
  return 0; }\n`;
}

function jsToCppLiteral(v){
  if(Array.isArray(v)){
    const type = cppTypeOf(v);
    const elems = v.map(jsToCppLiteral).join(', ');
    return `std::vector<${type}>{ ${elems} }`;
  }
  switch(typeof v){
    case 'number':{
      if(Number.isInteger(v)) return String(v);
      return String(v);
    }
    case 'string': return `std::string(${JSON.stringify(v)})`;
    case 'boolean': return v? 'true':'false';
    default: return '/*unsupported*/0';
  }
}

function cppTypeOf(v){
  if(Array.isArray(v)){
    if(v.length===0) return 'int';
    return `std::vector<${cppTypeOf(v[0])}>`;
  }
  switch(typeof v){
    case 'number': return Number.isInteger(v)? 'long long':'double';
    case 'string': return 'std::string';
    case 'boolean': return 'bool';
    default: return 'int';
  }
}
