import { State } from './state.js';

export function renderGame(main, state, topic, item){
  const type = item.game?.type;
  if(type === 'binary-search') return renderBinarySearchGame(main, state, topic, item);
  if(type === 'bfs-maze') return renderBFSMazeGame(main, state, topic, item);
  if(type === 'heap-sandbox') return renderHeapSandboxGame(main, state, topic, item);
  if(type === 'sorting-race') return renderSortingRaceGame(main, state, topic, item);
  if(type === 'uf-playground') return renderUFGame(main, state, topic, item);
  if(type === 'dp-grid') return renderDPGridGame(main, state, topic, item);
  if(type === 'kmp-explorer') return renderKMPExplorer(main, state, topic, item);
  if(type === 'aho-explorer') return renderAhoExplorer(main, state, topic, item);
  if(type === 'dinic-flow') return renderDinicGame(main, state, topic, item);
  if(type === 'hld-play') return renderHLDGame(main, state, topic, item);
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title}</h2><div class="muted">Game type not implemented.</div>`;
  main.appendChild(box);
}

function renderBinarySearchGame(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Play</h2>
    <div class="muted">Guess the hidden number using as few guesses as possible. Try to match ⌈log2 N⌉ steps.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <label>Size N</label>
      <input id="nInput" type="range" min="7" max="63" value="31" />
      <span id="nLabel" class="pill">N=31</span>
      <button id="startBtn" class="btn">Start</button>
      <span class="spacer"></span>
      <span id="optimalLabel" class="pill">Optimal steps: 5</span>
    </div>
    <div class="row" style="gap:8px;margin-top:8px">
      <input id="guessInput" type="number" placeholder="Your guess" style="max-width:140px" />
      <button id="guessBtn" class="btn">Guess</button>
      <span id="feedback" class="pill">—</span>
    </div>
    <div id="viz" class="bs-board"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const nInput = ui.querySelector('#nInput');
  const nLabel = ui.querySelector('#nLabel');
  const startBtn = ui.querySelector('#startBtn');
  const guessInput = ui.querySelector('#guessInput');
  const guessBtn = ui.querySelector('#guessBtn');
  const feedback = ui.querySelector('#feedback');
  const optimalLabel = ui.querySelector('#optimalLabel');
  const viz = ui.querySelector('#viz');

  let N = Number(nInput.value);
  let target = null;
  let lo = 1, hi = N;
  let steps = 0;

  const updateN = ()=>{
    N = Number(nInput.value);
    nLabel.textContent = `N=${N}`;
    const opt = Math.ceil(Math.log2(N));
    optimalLabel.textContent = `Optimal steps: ${opt}`;
  };
  nInput.oninput = updateN; updateN();

  function draw(){
    viz.innerHTML = '';
    for(let i=1;i<=N;i++){
      const d = document.createElement('div');
      d.className = 'bs-cell';
      if(i<lo || i>hi) d.classList.add('faded');
      if(i===target) d.classList.add('target');
      d.textContent = i;
      viz.appendChild(d);
    }
  }

  function start(){
    target = Math.floor(Math.random()*N)+1;
    lo = 1; hi = N; steps = 0; feedback.textContent = '—';
    draw();
  }
  startBtn.onclick = start;
  start();

  guessBtn.onclick = () => {
    const g = Number(guessInput.value);
    if(!g || g<lo || g>hi){ feedback.textContent='Pick within current range'; return; }
    steps++;
    if(g === target){
      feedback.textContent = `Found in ${steps} steps!`;
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true; // award learn credit
      State.save(state);
      // reveal target briefly
      draw();
      return;
    }
    if(g < target){ feedback.textContent = 'Too low → go right'; lo = g+1; }
    else { feedback.textContent = 'Too high → go left'; hi = g-1; }
    // animate shrink by redrawing
    draw();
  };
}

function renderBFSMazeGame(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Play</h2>
    <div class="muted">Place walls, set start/end, then run BFS to watch the wave expansion and shortest path discovery.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:8px;flex-wrap:wrap">
      <button id="setStart" class="ghost">Set Start</button>
      <button id="setEnd" class="ghost">Set End</button>
      <button id="toggleWalls" class="ghost">Toggle Walls</button>
      <button id="clearBtn" class="ghost">Clear</button>
      <button id="runBtn" class="btn">Run BFS</button>
      <span class="spacer"></span>
      <span id="status" class="pill">Click to edit</span>
    </div>
    <div id="maze" class="grid-board"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const rows = 15, cols = 25;
  const maze = ui.querySelector('#maze');
  const status = ui.querySelector('#status');
  const setStartBtn = ui.querySelector('#setStart');
  const setEndBtn = ui.querySelector('#setEnd');
  const toggleWallsBtn = ui.querySelector('#toggleWalls');
  const clearBtn = ui.querySelector('#clearBtn');
  const runBtn = ui.querySelector('#runBtn');

  maze.style.setProperty('--rows', rows);
  maze.style.setProperty('--cols', cols);

  let mode = 'wall';
  let grid = Array.from({length:rows}, ()=> Array(cols).fill(0)); // 0 empty, 1 wall
  let start = [0,0], end=[rows-1, cols-1];

  function cellAt(r,c){ return maze.querySelector(`[data-r='${r}'][data-c='${c}']`); }

  function draw(){
    maze.innerHTML = '';
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const d = document.createElement('div');
        d.className = 'cell';
        d.dataset.r = String(r); d.dataset.c = String(c);
        if(grid[r][c]===1) d.classList.add('wall');
        if(r===start[0] && c===start[1]) d.classList.add('start');
        if(r===end[0] && c===end[1]) d.classList.add('end');
        d.onclick = () => {
          if(mode==='start'){ start=[r,c]; status.textContent='Set start'; draw(); }
          else if(mode==='end'){ end=[r,c]; status.textContent='Set end'; draw(); }
          else { grid[r][c] = grid[r][c]?0:1; d.classList.toggle('wall'); }
        };
        maze.appendChild(d);
      }
    }
  }
  draw();

  setStartBtn.onclick = ()=> { mode='start'; status.textContent='Click a cell to set start'; };
  setEndBtn.onclick = ()=> { mode='end'; status.textContent='Click a cell to set end'; };
  toggleWallsBtn.onclick = ()=> { mode='wall'; status.textContent='Click to toggle walls'; };
  clearBtn.onclick = ()=> { grid = grid.map(row=>row.map(()=>0)); draw(); };

  runBtn.onclick = async () => {
    mode='wall'; status.textContent='Running BFS…';
    // BFS animation
    const q = [];
    const dist = Array.from({length:rows}, ()=> Array(cols).fill(-1));
    const prev = Array.from({length:rows}, ()=> Array(cols).fill(null));
    const inb = (r,c)=> r>=0 && r<rows && c>=0 && c<cols;
    q.push(start); dist[start[0]][start[1]]=0;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while(q.length){
      const [r,c] = q.shift();
      const d = dist[r][c];
      const node = cellAt(r,c);
      if(node && !(r===start[0]&&c===start[1]) && !(r===end[0]&&c===end[1])) node.classList.add('visited');
      if(r===end[0] && c===end[1]) break;
      for(const [dr,dc] of dirs){
        const nr=r+dr, nc=c+dc;
        if(inb(nr,nc) && grid[nr][nc]===0 && dist[nr][nc]===-1){
          dist[nr][nc]=d+1; prev[nr][nc]=[r,c]; q.push([nr,nc]);
        }
      }
      // small delay for animation
      // eslint-disable-next-line no-await-in-loop
      await new Promise(res=>setTimeout(res, 10));
    }
    // reconstruct path
    if(dist[end[0]][end[1]]!==-1){
      let cur = end;
      const path=[];
      while(cur){ path.push(cur); const p=prev[cur[0]][cur[1]]; cur=p; }
      path.reverse();
      for(const [r,c] of path){
        const node = cellAt(r,c);
        if(node && !(r===start[0]&&c===start[1]) && !(r===end[0]&&c===end[1])) node.classList.add('path');
        await new Promise(res=>setTimeout(res, 20));
      }
      status.textContent = `Shortest path length: ${dist[end[0]][end[1]]}`;
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true; State.save(state);
    } else {
      status.textContent = 'No path (blocked).';
    }
  };
}

function renderHeapSandboxGame(main, state, topic){
  const box = document.createElement('div'); box.className='section';
  box.innerHTML = `<h2>Heap Sandbox — Play</h2>
    <div class="row" style="gap:8px">
      <input id="val" type="number" placeholder="Value" style="max-width:120px"/>
      <button id="push" class="btn">Push</button>
      <button id="pop" class="btn secondary">Pop Min</button>
      <span class="spacer"></span>
      <span id="info" class="pill">Size: 0</span>
    </div>
    <div id="heapArray" class="bs-board" style="margin-top:8px"></div>`;
  main.appendChild(box);
  const arr=[]; const heapDiv=box.querySelector('#heapArray'); const info=box.querySelector('#info');
  const up=i=>{ while(i>0){ const p=(i-1)>>1; if(arr[p]<=arr[i]) break; [arr[p],arr[i]]=[arr[i],arr[p]]; i=p; }};
  const dn=i=>{ for(;;){ let l=i*2+1,r=l+1,s=i; if(l<arr.length&&arr[l]<arr[s]) s=l; if(r<arr.length&&arr[r]<arr[s]) s=r; if(s===i) break; [arr[s],arr[i]]=[arr[i],arr[s]]; i=s; }};
  function draw(){ heapDiv.innerHTML=''; arr.forEach((v,i)=>{ const d=document.createElement('div'); d.className='bs-cell'; d.textContent = String(v); heapDiv.appendChild(d); }); info.textContent = `Size: ${arr.length}`; }
  box.querySelector('#push').onclick = ()=>{ const v=Number(box.querySelector('#val').value); if(Number.isFinite(v)){ arr.push(v); up(arr.length-1); draw(); } };
  box.querySelector('#pop').onclick = ()=>{ if(!arr.length) return; arr[0]=arr.pop(); if(arr.length) dn(0); draw(); const it=State.ensureItem(state, topic.id, 'heap-sandbox'); it.learnDone=true; State.save(state); };
  draw();
}

function renderSortingRaceGame(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML = `<h2>Sorting Race — Play</h2>
    <div class="row" style="gap:8px;flex-wrap:wrap">
      <label>N</label><input id="n" type="range" min="10" max="80" value="30"/>
      <span id="nlab" class="pill">30</span>
      <label>Algo</label><select id="algo"><option value="insertion">Insertion</option><option value="merge">Merge</option></select>
      <label>Speed</label><input id="spd" type="range" min="1" max="50" value="20"/>
      <button id="gen" class="ghost">Shuffle</button>
      <button id="run" class="btn">Run</button>
    </div>
    <div id="bars" style="display:flex;align-items:flex-end;gap:2px;height:200px;margin-top:10px"></div>`;
  main.appendChild(box);
  const nEl=box.querySelector('#n'), nlab=box.querySelector('#nlab'), algo=box.querySelector('#algo'), spd=box.querySelector('#spd'), bars=box.querySelector('#bars');
  let arr=[]; function draw(){ bars.innerHTML=''; const max=Math.max(...arr,1); arr.forEach((v,i)=>{ const d=document.createElement('div'); d.style.width='10px'; d.style.height=(v/max*100+5)+'%'; d.style.background='linear-gradient(180deg,var(--accent),var(--accent-2))'; d.title=String(v); d.dataset.i=String(i); bars.appendChild(d); }); }
  function gen(){ const N=Number(nEl.value); nlab.textContent=String(N); arr=Array.from({length:N},(_,i)=>i+1); for(let i=N-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } draw(); }
  nEl.oninput = gen; gen();
  box.querySelector('#gen').onclick = gen;
  box.querySelector('#run').onclick = async ()=>{
    const delay = 400/Number(spd.value);
    const sleep = ms=>new Promise(r=>setTimeout(r,ms));
    function redraw(){ bars.innerHTML=''; draw(); }
    function swap(i,j){ [arr[i],arr[j]]=[arr[j],arr[i]]; redraw(); }
    if(algo.value==='insertion'){
      for(let i=1;i<arr.length;i++){
        let j=i; while(j>0 && arr[j]<arr[j-1]){ swap(j,j-1); j--; await sleep(delay); }
      }
    } else if(algo.value==='merge'){
      // merge sort visual: copy approach but mark merges as redraw
      async function mergeSort(l,r){ if(l>=r) return; const m=(l+r)>>1; await mergeSort(l,m); await mergeSort(m+1,r); const tmp=[]; let i=l,j=m+1; while(i<=m&&j<=r){ tmp.push(arr[i]<=arr[j]?arr[i++]:arr[j++]); }
        while(i<=m) tmp.push(arr[i++]); while(j<=r) tmp.push(arr[j++]); for(let k=0;k<tmp.length;k++){ arr[l+k]=tmp[k]; await sleep(delay); redraw(); }
      }
      await mergeSort(0,arr.length-1);
    } else if(algo.value==='quick'){
      async function partition(l,r){ const pivot=arr[r]; let i=l; for(let j=l;j<r;j++){ if(arr[j]<pivot){ swap(i,j); await sleep(delay); i++; } } swap(i,r); await sleep(delay); return i; }
      async function qsort(l,r){ if(l>=r) return; const p=await partition(l,r); await qsort(l,p-1); await qsort(p+1,r); }
      await qsort(0,arr.length-1);
    } else if(algo.value==='heap'){
      function down(i,n){ for(;;){ let l=i*2+1,r=l+1,s=i; if(l<n&&arr[l]>arr[s]) s=l; if(r<n&&arr[r]>arr[s]) s=r; if(s===i) break; swap(s,i); i=s; }
      }
      // build max-heap
      for(let i=Math.floor(arr.length/2)-1;i>=0;i--){ down(i,arr.length); await sleep(delay); redraw(); }
      for(let end=arr.length-1; end>0; end--){ swap(0,end); await sleep(delay); down(0,end); await sleep(delay); redraw(); }
    }
    const it=State.ensureItem(state, topic.id, 'sorting-race'); it.learnDone=true; State.save(state);
  };
}

function renderUFGame(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML=`<h2>Union-Find Playground — Play</h2>
    <div class='row' style='gap:8px;flex-wrap:wrap'>
      <label>Nodes</label><input id='nodes' type='number' value='10' style='max-width:80px'/>
      <button id='init' class='ghost'>Init</button>
      <input id='a' type='number' placeholder='a' style='max-width:70px'/>
      <input id='b' type='number' placeholder='b' style='max-width:70px'/>
      <button id='union' class='btn'>Union(a,b)</button>
      <span class='spacer'></span><span id='cnt' class='pill'>—</span>
    </div>
    <div id='nodesView' style='display:flex;flex-wrap:wrap;gap:6px;margin-top:10px'></div>`;
  main.appendChild(box);
  let n=10,p=[],r=[],count=10; const view=box.querySelector('#nodesView');
  function f(x){ return p[x]===x?x:(p[x]=f(p[x])); }
  function u(x,y){ x=f(x); y=f(y); if(x===y) return false; if(r[x]<r[y]) [x,y]=[y,x]; p[y]=x; if(r[x]===r[y]) r[x]++; count--; return true; }
  function draw(){ view.innerHTML=''; for(let i=0;i<n;i++){ const d=document.createElement('div'); d.className='pill'; const root=f(i); d.textContent = `#${i} → ${root}`; view.appendChild(d);} box.querySelector('#cnt').textContent=`Components: ${count}`; }
  function init(){ n=Number(box.querySelector('#nodes').value)||10; p=Array(n).fill(0).map((_,i)=>i); r=Array(n).fill(0); count=n; draw(); }
  box.querySelector('#init').onclick=init; init();
  box.querySelector('#union').onclick=()=>{ const a=Number(box.querySelector('#a').value), b=Number(box.querySelector('#b').value); if(a>=0&&a<n&&b>=0&&b<n){ if(u(a,b)) draw(); const it=State.ensureItem(state, topic.id, 'uf-playground'); it.learnDone=true; State.save(state);} };
}

function renderDPGridGame(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML=`<h2>DP Grid — Unique Paths</h2>
    <div class='row' style='gap:8px'><button id='clear' class='ghost'>Clear Obstacles</button><button id='step' class='btn'>Step Fill</button><button id='auto' class='btn secondary'>Auto Fill</button><span class='spacer'></span><span id='ans' class='pill'>—</span></div>
    <div id='dpgrid' class='grid-board'></div>`;
  main.appendChild(box);
  const rows=10, cols=15, grid=Array.from({length:rows},()=>Array(cols).fill(0)), dp=Array.from({length:rows},()=>Array(cols).fill(0));
  const board=box.querySelector('#dpgrid'); board.style.setProperty('--rows', rows); board.style.setProperty('--cols', cols);
  function cell(r,c){ return board.querySelector(`[data-r='${r}'][data-c='${c}']`);}  
  function draw(){ board.innerHTML=''; for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){ const d=document.createElement('div'); d.className='cell'; d.dataset.r=String(r); d.dataset.c=String(c); if(grid[r][c]) d.classList.add('wall'); d.onclick=()=>{ grid[r][c]=grid[r][c]?0:1; d.classList.toggle('wall');}; if(dp[r][c]){ d.textContent=String(dp[r][c]); d.style.fontSize='10px'; } board.appendChild(d);} }
  draw();
  function recompute(step=false){ for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) dp[r][c]=0; if(grid[0][0]===0) dp[0][0]=1; for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ if(grid[r][c]) continue; if(r===0&&c===0) continue; const up=r>0?dp[r-1][c]:0, left=c>0?dp[r][c-1]:0; dp[r][c]=up+left; if(step){ const d=cell(r,c); if(d){ d.textContent=String(dp[r][c]); d.style.fontSize='10px'; } return; } } } const d=cell(rows-1,cols-1); if(d){ d.classList.add('path'); } box.querySelector('#ans').textContent = `Paths: ${dp[rows-1][cols-1]}`; const it=State.ensureItem(state, topic.id, 'dp-grid'); it.learnDone=true; State.save(state); }
  box.querySelector('#clear').onclick=()=>{ for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) grid[r][c]=0; draw(); };
  box.querySelector('#step').onclick=()=>{ recompute(true); };
  box.querySelector('#auto').onclick=()=>{ recompute(false); draw(); };
}

function renderKMPExplorer(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML=`<h2>KMP Explorer — LPS & Matching</h2>
    <div class='row' style='gap:8px;flex-wrap:wrap'>
      <input id='text' type='text' placeholder='text' value='ababcabcabababd' style='min-width:220px'/>
      <input id='pat' type='text' placeholder='pattern' value='ababd' style='min-width:160px'/>
      <button id='build' class='ghost'>Build LPS</button>
      <button id='step' class='btn'>Step Match</button>
      <span class='spacer'></span><span id='out' class='pill'>—</span>
    </div>
    <div id='lps' class='section muted'>LPS: []</div>`;
  main.appendChild(box);
  const out=box.querySelector('#out'); const lpsDiv=box.querySelector('#lps');
  let sText=box.querySelector('#text').value, pat=box.querySelector('#pat').value;
  let lps=[]; let i=0, j=0; let built=false; let matches=[];
  function build(){ pat=box.querySelector('#pat').value; lps=Array(pat.length).fill(0); for(let ii=1;ii<pat.length;ii++){ let jj=lps[ii-1]; while(jj>0 && pat[ii]!==pat[jj]) jj=lps[jj-1]; if(pat[ii]===pat[jj]) jj++; lps[ii]=jj; } lpsDiv.textContent='LPS: ['+lps.join(', ')+']'; built=true; i=0; j=0; matches=[]; out.textContent='Built LPS'; }
  box.querySelector('#build').onclick=build; build();
  box.querySelector('#step').onclick=()=>{ if(!built) build(); sText=box.querySelector('#text').value; if(i>=sText.length){ out.textContent='Done: ['+matches.join(', ')+']'; const it=State.ensureItem(state, topic.id, 'kmp-explorer'); it.learnDone=true; State.save(state); return; } if(sText[i]===pat[j]){ i++; j++; if(j===pat.length){ matches.push(i-j); j=lps[j-1]; } } else { if(j>0) j=lps[j-1]; else i++; } out.textContent=`i=${i}, j=${j}`; };
}

function renderAhoExplorer(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML=`<h2>Aho–Corasick Explorer</h2>
    <div class='row' style='gap:8px;flex-wrap:wrap'>
      <input id='pats' type='text' placeholder='patterns (comma separated)' value='he, she, his, hers' style='min-width:260px'/>
      <input id='text' type='text' placeholder='text' value='ushers' style='min-width:200px'/>
      <button id='build' class='ghost'>Build</button>
      <button id='step' class='btn'>Step</button>
      <span class='spacer'></span><span id='out' class='pill'>—</span>
    </div>
    <div id='dump' class='section muted'>Automaton: —</div>`;
  main.appendChild(box);
  const out=box.querySelector('#out'), dump=box.querySelector('#dump');
  let trie=[], fail=[], outList=[], stateId=0, text='', i=0, built=false, matches=[];
  function build(){ const pats=(box.querySelector('#pats').value||'').split(',').map(s=>s.trim()).filter(Boolean); text=box.querySelector('#text').value||''; trie=[Object.create(null)]; outList=[[]]; fail=[0]; function add(p,idx){ let v=0; for(const ch of p){ if(trie[v][ch]==null){ trie[v][ch]=trie.length; trie.push(Object.create(null)); outList.push([]); } v=trie[v][ch]; } outList[v].push(idx); }
    pats.forEach((p,idx)=>add(p,idx));
    const q=[]; for(const ch in trie[0]){ const v=trie[0][ch]; q.push(v); fail[v]=0; }
    while(q.length){ const v=q.shift(); for(const ch in trie[v]){ const u=trie[v][ch]; q.push(u); let f=fail[v]; while(f && trie[f][ch]==null) f=fail[f]; fail[u]= trie[f][ch]!=null? trie[f][ch]:0; outList[u]=outList[u].concat(outList[fail[u]]); }
    }
    stateId=0; i=0; matches=[]; built=true; out.textContent='Built'; dump.textContent = 'States: '+trie.length+' | Fail of each: ['+fail.join(', ')+']'; }
  box.querySelector('#build').onclick=build; build();
  box.querySelector('#step').onclick=()=>{ if(!built) build(); if(i>=text.length){ out.textContent='Done matches at indexes: ['+matches.join(', ')+']'; const it=State.ensureItem(state, topic.id, 'aho-explorer'); it.learnDone=true; State.save(state); return; } const ch=text[i]; while(stateId && trie[stateId][ch]==null) stateId=fail[stateId]; if(trie[stateId][ch]!=null) stateId=trie[stateId][ch]; else stateId=0; if(outList[stateId].length){ matches.push(i); } i++; out.textContent=`i=${i}, state=${stateId}`; };
}

function renderDinicGame(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML=`<h2>Dinic Flow — Levels & Augment</h2>
    <div class='row' style='gap:8px;flex-wrap:wrap'>
      <button id='level' class='ghost'>Build Levels</button>
      <button id='augment' class='btn'>Augment Once</button>
      <span class='spacer'></span><span id='flow' class='pill'>Flow: 0</span>
    </div>
    <div id='levels' class='section muted'>Levels: —</div>`;
  main.appendChild(box);
  const levels=box.querySelector('#levels'), flow=box.querySelector('#flow');
  const n=6, s=0, t=5; const g=Array.from({length:n},()=>[]);
  function add(u,v,c){ const a={v,cap:c,rev:0}, b={v:u,cap:0,rev:0}; a.rev=g[v].length; b.rev=g[u].length; g[u].push(a); g[v].push(b); }
  // sample graph
  [[0,1,3],[0,2,2],[1,2,1],[1,3,3],[2,4,2],[3,5,2],[4,5,3]].forEach(e=>add(...e));
  let total=0, level=[];
  function bfs(){ level=Array(n).fill(-1); const q=[s]; level[s]=0; for(let h=0; h<q.length; h++){ const u=q[h]; for(const e of g[u]) if(e.cap>0 && level[e.v]===-1){ level[e.v]=level[u]+1; q.push(e.v); } } levels.textContent='Levels: ['+level.join(', ')+']'; }
  function send(u,f){ if(u===t) return f; for(const e of g[u]) if(e.cap>0 && level[e.v]===level[u]+1){ const ret=send(e.v, Math.min(f,e.cap)); if(ret>0){ e.cap-=ret; g[e.v][e.rev].cap+=ret; return ret; } } return 0; }
  box.querySelector('#level').onclick=()=>bfs();
  box.querySelector('#augment').onclick=()=>{ if(level.length===0||level[s]!==0) bfs(); let pushed=0, addf; do { addf=send(s,1e9); pushed+=addf; } while(addf>0); total+=pushed; flow.textContent='Flow: '+total; if(pushed===0){ const it=State.ensureItem(state, topic.id, 'dinic-flow'); it.learnDone=true; State.save(state);} };
}

function renderHLDGame(main, state, topic){
  const box=document.createElement('div'); box.className='section';
  box.innerHTML=`<h2>HLD — Path Query Decomposition</h2>
    <div class='row' style='gap:8px;flex-wrap:wrap'>
      <button id='build' class='ghost'>Build Decomposition</button>
      <input id='u' type='number' value='2' style='max-width:70px'/>
      <input id='v' type='number' value='5' style='max-width:70px'/>
      <button id='query' class='btn'>Decompose Path(u,v)</button>
    </div>
    <div id='out' class='section muted'>—</div>`;
  main.appendChild(box);
  // sample tree
  const n=8; const edges=[[0,1],[1,2],[1,3],[3,4],[3,5],[0,6],[6,7]]; const g=Array.from({length:n},()=>[]);
  edges.forEach(([a,b])=>{ g[a].push(b); g[b].push(a); }); const parent=Array(n).fill(-1), depth=Array(n).fill(0), heavy=Array(n).fill(-1), size=Array(n).fill(0);
  const head=Array(n).fill(0), pos=Array(n).fill(0); let cur=0; const val=Array(n).fill(1); // node values 1 for demo
  function dfs(u,p){ parent[u]=p; size[u]=1; let maxsz=0; for(const v of g[u]) if(v!==p){ depth[v]=depth[u]+1; dfs(v,u); size[u]+=size[v]; if(size[v]>maxsz){ maxsz=size[v]; heavy[u]=v; } } }
  function decompose(u,h){ head[u]=h; pos[u]=cur++; if(heavy[u]!==-1) decompose(heavy[u],h); for(const v of g[u]) if(v!==parent[u] && v!==heavy[u]) decompose(v,v); }
  function build(){ dfs(0,-1); decompose(0,0); box.querySelector('#out').textContent='Built. head='+head.join(', ')+' pos='+pos.join(', '); }
  function pathDecompose(a,b){ const segs=[]; while(head[a]!==head[b]){ if(depth[head[a]]<depth[head[b]]) [a,b]=[b,a]; segs.push([pos[head[a]], pos[a]]); a=parent[head[a]]; } if(depth[a]>depth[b]) [a,b]=[b,a]; segs.push([pos[a], pos[b]]); return segs; }
  function query(){ const u=Number(box.querySelector('#u').value), v=Number(box.querySelector('#v').value); const segs=pathDecompose(u,v); const detail='Segments: '+segs.map(([l,r])=>`[${l},${r}]`).join(' + '); const sum=segs.reduce((acc,[l,r])=>acc + (r-l+1),0); box.querySelector('#out').textContent=detail+` | Sum (unit values): ${sum}`; const it=State.ensureItem(state, topic.id, 'hld-play'); it.learnDone=true; State.save(state); }
  box.querySelector('#build').onclick=build; box.querySelector('#query').onclick=query; build();
}
