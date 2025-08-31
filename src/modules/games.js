import { State } from './state.js';

export function renderGame(main, state, topic, item){
  const type = item.game?.type;
  if(type === 'binary-search') return renderBinarySearchGame(main, state, topic, item);
  if(type === 'bfs-maze') return renderBFSMazeGame(main, state, topic, item);
  if(type === 'dfs-maze') return renderDFSMazeGame(main, state, topic, item);
  if(type === 'dijkstra-graph') return renderDijkstraGame(main, state, topic, item);
  if(type === 'prims-mst') return renderPrimsGame(main, state, topic, item);
  if(type === 'kruskals-mst') return renderKruskalsGame(main, state, topic, item);
  if(type === 'topsort-dag') return renderTopSortGame(main, state, topic, item);
  if(type === 'bellman-ford') return renderBellmanFordGame(main, state, topic, item);
  if(type === 'floyd-warshall') return renderFloydWarshallGame(main, state, topic, item);
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

function renderDFSMazeGame(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Play</h2>
    <div class="muted">Place walls, set start/end, then run DFS to watch the depth-first exploration and path discovery. Watch how DFS explores as deep as possible before backtracking!</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:8px;flex-wrap:wrap">
      <button id="setStart" class="ghost">Set Start</button>
      <button id="setEnd" class="ghost">Set End</button>
      <button id="toggleWalls" class="ghost">Toggle Walls</button>
      <button id="clearBtn" class="ghost">Clear</button>
      <button id="genMaze" class="ghost">Generate Maze</button>
      <button id="runBtn" class="btn">Run DFS</button>
      <button id="stepBtn" class="btn secondary">Step DFS</button>
      <span class="spacer"></span>
      <span id="status" class="pill">Click to edit</span>
    </div>
    <div class="row" style="gap:12px;margin-top:8px">
      <label style="font-size:12px">Speed</label>
      <input id="speedSlider" type="range" min="1" max="100" value="50" style="width:100px"/>
      <span id="speedLabel" class="pill" style="font-size:12px">50ms</span>
      <span class="pill" style="font-size:12px">Stack: <span id="stackSize">0</span></span>
      <span class="pill" style="font-size:12px">Visited: <span id="visitedCount">0</span></span>
    </div>
    <div id="maze" class="grid-board"></div>
    <div class="row" style="gap:8px;margin-top:8px">
      <div class="pill" style="background:var(--ok)">Start</div>
      <div class="pill" style="background:var(--accent)">End</div>
      <div class="pill" style="background:var(--info);opacity:0.6">Visited</div>
      <div class="pill" style="background:var(--warning)">Path</div>
      <div class="pill" style="background:var(--error)">Current</div>
      <div class="pill" style="background:#9c27b0">Backtracking</div>
    </div>
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
  const genMazeBtn = ui.querySelector('#genMaze');
  const runBtn = ui.querySelector('#runBtn');
  const stepBtn = ui.querySelector('#stepBtn');
  const speedSlider = ui.querySelector('#speedSlider');
  const speedLabel = ui.querySelector('#speedLabel');
  const stackSizeEl = ui.querySelector('#stackSize');
  const visitedCountEl = ui.querySelector('#visitedCount');

  maze.style.setProperty('--rows', rows);
  maze.style.setProperty('--cols', cols);

  let mode = 'wall';
  let grid = Array.from({length:rows}, ()=> Array(cols).fill(0)); // 0 empty, 1 wall
  let start = [0,0], end=[rows-1, cols-1];
  let isRunning = false;
  let isPaused = false;
  let animationSpeed = 50;

  speedSlider.oninput = () => {
    animationSpeed = 101 - Number(speedSlider.value);
    speedLabel.textContent = animationSpeed + 'ms';
  };

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
          if(isRunning) return;
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
  clearBtn.onclick = ()=> { 
    if(isRunning) return;
    grid = grid.map(row=>row.map(()=>0)); 
    draw(); 
  };

  // Generate a random maze using recursive backtracking
  genMazeBtn.onclick = () => {
    if(isRunning) return;
    // Fill with walls
    grid = Array.from({length:rows}, ()=> Array(cols).fill(1));
    
    // Recursive backtracking maze generation
    const stack = [];
    const visited = Array.from({length:rows}, ()=> Array(cols).fill(false));
    
    // Start from top-left
    let current = [0, 0];
    grid[0][0] = 0;
    visited[0][0] = true;
    stack.push(current);
    
    while(stack.length > 0) {
      const [r, c] = current;
      const neighbors = [];
      
      // Check all 4 directions (2 cells away for walls)
      const dirs = [[0, 2], [2, 0], [0, -2], [-2, 0]];
      for(const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if(nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
          neighbors.push([nr, nc, r + dr/2, c + dc/2]); // Include wall position
        }
      }
      
      if(neighbors.length > 0) {
        // Choose random neighbor
        const [nr, nc, wr, wc] = neighbors[Math.floor(Math.random() * neighbors.length)];
        grid[nr][nc] = 0; // Clear destination
        grid[wr][wc] = 0; // Clear wall between
        visited[nr][nc] = true;
        stack.push([nr, nc]);
        current = [nr, nc];
      } else {
        // Backtrack
        current = stack.pop();
      }
    }
    
    // Ensure start and end are clear
    grid[start[0]][start[1]] = 0;
    grid[end[0]][end[1]] = 0;
    
    draw();
    status.textContent = 'Maze generated!';
  };

  // Step-by-step DFS
  let dfsState = null;
  
  stepBtn.onclick = () => {
    if(isRunning && !isPaused) return;
    
    if(!dfsState) {
      // Initialize DFS state
      dfsState = {
        stack: [start],
        visited: new Set([`${start[0]},${start[1]}`]),
        parent: new Map(),
        found: false,
        path: []
      };
      dfsState.parent.set(`${start[0]},${start[1]}`, null);
    }
    
    if(dfsState.stack.length === 0 || dfsState.found) {
      status.textContent = dfsState.found ? 'Path found!' : 'No path exists';
      return;
    }
    
    // One step of DFS
    const [r, c] = dfsState.stack.pop();
    const node = cellAt(r, c);
    
    // Update visualization
    stackSizeEl.textContent = dfsState.stack.length;
    visitedCountEl.textContent = dfsState.visited.size;
    
    // Clear previous current markers
    maze.querySelectorAll('.current, .backtrack').forEach(cell => {
      cell.classList.remove('current', 'backtrack');
    });
    
    // Mark current node
    if(node && !(r===start[0]&&c===start[1]) && !(r===end[0]&&c===end[1])) {
      node.classList.add('current');
      node.classList.add('visited');
    }
    
    // Check if we found the end
    if(r === end[0] && c === end[1]) {
      dfsState.found = true;
      // Reconstruct path
      let cur = `${end[0]},${end[1]}`;
      const path = [];
      while(cur) {
        const [pr, pc] = cur.split(',').map(Number);
        path.push([pr, pc]);
        cur = dfsState.parent.get(cur);
      }
      path.reverse();
      
      // Highlight path
      for(const [pr, pc] of path) {
        const pnode = cellAt(pr, pc);
        if(pnode && !(pr===start[0]&&pc===start[1]) && !(pr===end[0]&&pc===end[1])) {
          pnode.classList.add('path');
        }
      }
      status.textContent = `Path found! Length: ${path.length - 1}`;
      return;
    }
    
    // Explore neighbors in DFS order (reverse to match typical DFS)
    const dirs = [[1,0], [0,1], [-1,0], [0,-1]]; // down, right, up, left
    let hasUnvisited = false;
    
    for(let i = dirs.length - 1; i >= 0; i--) {
      const [dr, dc] = dirs[i];
      const nr = r + dr, nc = c + dc;
      const key = `${nr},${nc}`;
      
      if(nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
         grid[nr][nc] === 0 && !dfsState.visited.has(key)) {
        dfsState.stack.push([nr, nc]);
        dfsState.visited.add(key);
        dfsState.parent.set(key, `${r},${c}`);
        hasUnvisited = true;
        
        // Mark as frontier
        const nextNode = cellAt(nr, nc);
        if(nextNode) {
          nextNode.style.border = '2px solid var(--error)';
        }
      }
    }
    
    // If no unvisited neighbors, we're backtracking
    if(!hasUnvisited && node) {
      node.classList.add('backtrack');
    }
    
    status.textContent = `Exploring... Stack size: ${dfsState.stack.length}`;
  };

  runBtn.onclick = async () => {
    if(isRunning) {
      isPaused = !isPaused;
      runBtn.textContent = isPaused ? 'Resume DFS' : 'Pause DFS';
      return;
    }
    
    isRunning = true;
    isPaused = false;
    runBtn.textContent = 'Pause DFS';
    stepBtn.disabled = true;
    mode='wall'; 
    status.textContent='Running DFS…';
    
    // Clear previous visualization
    maze.querySelectorAll('.visited, .path, .current, .backtrack').forEach(cell => {
      cell.classList.remove('visited', 'path', 'current', 'backtrack');
      cell.style.border = '';
    });
    
    // DFS with animation
    const stack = [[...start, [start]]]; // [row, col, path]
    const visited = new Set([`${start[0]},${start[1]}`]);
    const parent = new Map();
    parent.set(`${start[0]},${start[1]}`, null);
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let found = false;
    let visitedCount = 0;
    
    while(stack.length > 0 && !found) {
      if(isPaused) {
        await new Promise(res => setTimeout(res, 100));
        continue;
      }
      
      const [r, c, currentPath] = stack.pop();
      visitedCount++;
      
      // Update stats
      stackSizeEl.textContent = stack.length;
      visitedCountEl.textContent = visitedCount;
      
      // Clear previous current/backtrack markers
      maze.querySelectorAll('.current, .backtrack').forEach(cell => {
        cell.classList.remove('current', 'backtrack');
      });
      
      const node = cellAt(r,c);
      if(node && !(r===start[0]&&c===start[1]) && !(r===end[0]&&c===end[1])) {
        node.classList.add('visited');
        node.classList.add('current');
      }
      
      if(r===end[0] && c===end[1]) {
        found = true;
        break;
      }
      
      // Check all neighbors
      let hasUnvisited = false;
      for(let i = dirs.length - 1; i >= 0; i--) { // Reverse order for consistent DFS
        const [dr,dc] = dirs[i];
        const nr=r+dr, nc=c+dc;
        const key = `${nr},${nc}`;
        
        if(nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]===0 && !visited.has(key)){
          visited.add(key);
          parent.set(key, `${r},${c}`);
          stack.push([nr, nc, [...currentPath, [nr, nc]]]);
          hasUnvisited = true;
          
          // Show frontier
          const nextNode = cellAt(nr, nc);
          if(nextNode && !(nr===end[0]&&nc===end[1])) {
            nextNode.style.border = '2px solid var(--error)';
          }
        }
      }
      
      // If no unvisited neighbors, mark as backtracking
      if(!hasUnvisited && node) {
        node.classList.remove('current');
        node.classList.add('backtrack');
      }
      
      // Animation delay
      await new Promise(res=>setTimeout(res, animationSpeed));
    }
    
    // Clear all current/backtrack markers
    maze.querySelectorAll('.current, .backtrack').forEach(cell => {
      cell.classList.remove('current', 'backtrack');
    });
    
    // Clear borders
    maze.querySelectorAll('.cell').forEach(cell => {
      cell.style.border = '';
    });
    
    // Reconstruct and highlight path
    if(found){
      let cur = `${end[0]},${end[1]}`;
      const path=[];
      while(cur){
        const [r, c] = cur.split(',').map(Number);
        path.push([r, c]);
        cur = parent.get(cur);
      }
      path.reverse();
      
      // Animate path highlighting
      for(const [r,c] of path){
        const node = cellAt(r,c);
        if(node && !(r===start[0]&&c===start[1]) && !(r===end[0]&&c===end[1])) {
          node.classList.add('path');
          await new Promise(res=>setTimeout(res, 20));
        }
      }
      status.textContent = `Path found! Length: ${path.length - 1}, Cells explored: ${visitedCount}`;
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true; 
      State.save(state);
    } else {
      status.textContent = `No path exists. Cells explored: ${visitedCount}`;
    }
    
    isRunning = false;
    isPaused = false;
    runBtn.textContent = 'Run DFS';
    stepBtn.disabled = false;
    dfsState = null;
  };
}

function renderHeapSandboxGame(main, state, topic, item){
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
  box.querySelector('#pop').onclick = ()=>{ if(!arr.length) return; arr[0]=arr.pop(); if(arr.length) dn(0); draw(); const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state); };
  draw();
}

function renderSortingRaceGame(main, state, topic, item){
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
    const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state);
  };
}

function renderUFGame(main, state, topic, item){
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
  box.querySelector('#union').onclick=()=>{ const a=Number(box.querySelector('#a').value), b=Number(box.querySelector('#b').value); if(a>=0&&a<n&&b>=0&&b<n){ if(u(a,b)) draw(); const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state);} };
}

function renderDPGridGame(main, state, topic, item){
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
  function recompute(step=false){ for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) dp[r][c]=0; if(grid[0][0]===0) dp[0][0]=1; for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ if(grid[r][c]) continue; if(r===0&&c===0) continue; const up=r>0?dp[r-1][c]:0, left=c>0?dp[r][c-1]:0; dp[r][c]=up+left; if(step){ const d=cell(r,c); if(d){ d.textContent=String(dp[r][c]); d.style.fontSize='10px'; } return; } } } const d=cell(rows-1,cols-1); if(d){ d.classList.add('path'); } box.querySelector('#ans').textContent = `Paths: ${dp[rows-1][cols-1]}`; const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state); }
  box.querySelector('#clear').onclick=()=>{ for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) grid[r][c]=0; draw(); };
  box.querySelector('#step').onclick=()=>{ recompute(true); };
  box.querySelector('#auto').onclick=()=>{ recompute(false); draw(); };
}

function renderKMPExplorer(main, state, topic, item){
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
  box.querySelector('#step').onclick=()=>{ if(!built) build(); sText=box.querySelector('#text').value; if(i>=sText.length){ out.textContent='Done: ['+matches.join(', ')+']'; const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state); return; } if(sText[i]===pat[j]){ i++; j++; if(j===pat.length){ matches.push(i-j); j=lps[j-1]; } } else { if(j>0) j=lps[j-1]; else i++; } out.textContent=`i=${i}, j=${j}`; };
}

function renderAhoExplorer(main, state, topic, item){
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
  box.querySelector('#step').onclick=()=>{ if(!built) build(); if(i>=text.length){ out.textContent='Done matches at indexes: ['+matches.join(', ')+']'; const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state); return; } const ch=text[i]; while(stateId && trie[stateId][ch]==null) stateId=fail[stateId]; if(trie[stateId][ch]!=null) stateId=trie[stateId][ch]; else stateId=0; if(outList[stateId].length){ matches.push(i); } i++; out.textContent=`i=${i}, state=${stateId}`; };
}

function renderDinicGame(main, state, topic, item){
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
  box.querySelector('#augment').onclick=()=>{ if(level.length===0||level[s]!==0) bfs(); let pushed=0, addf; do { addf=send(s,1e9); pushed+=addf; } while(addf>0); total+=pushed; flow.textContent='Flow: '+total; if(pushed===0){ const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state);} };
}

function renderHLDGame(main, state, topic, item){
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
  function query(){ const u=Number(box.querySelector('#u').value), v=Number(box.querySelector('#v').value); const segs=pathDecompose(u,v); const detail='Segments: '+segs.map(([l,r])=>`[${l},${r}]`).join(' + '); const sum=segs.reduce((acc,[l,r])=>acc + (r-l+1),0); box.querySelector('#out').textContent=detail+` | Sum (unit values): ${sum}`; const it=State.ensureItem(state, topic.id, item.id); it.learnDone=true; State.save(state); }
  box.querySelector('#build').onclick=build; box.querySelector('#query').onclick=query; build();
}

// Graph Utility Classes
class GraphVisualizer {
  constructor(container, width = 800, height = 500) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.nodes = new Map(); // id -> {x, y, label, data}
    this.edges = new Map(); // id -> {from, to, weight, directed}
    this.svg = null;
    this.init();
  }
  
  init() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('class', 'graph-svg');
    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.container.appendChild(this.svg);
    
    // Add defs for arrow markers
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', 'var(--border)');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    this.svg.appendChild(defs);
  }
  
  addNode(id, x, y, label, data = {}) {
    this.nodes.set(id, { x, y, label, data, element: null });
    this.renderNode(id);
  }
  
  addEdge(id, from, to, weight = 1, directed = false) {
    this.edges.set(id, { from, to, weight, directed, element: null });
    this.renderEdge(id);
  }
  
  renderNode(id) {
    const node = this.nodes.get(id);
    if (!node) return;
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', '20');
    circle.setAttribute('class', 'graph-node unvisited');
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.y);
    text.setAttribute('class', 'graph-node-label');
    text.textContent = node.label;
    
    g.appendChild(circle);
    g.appendChild(text);
    this.svg.appendChild(g);
    
    node.element = { group: g, circle, text };
  }
  
  renderEdge(id) {
    const edge = this.edges.get(id);
    if (!edge) return;
    
    const fromNode = this.nodes.get(edge.from);
    const toNode = this.nodes.get(edge.to);
    if (!fromNode || !toNode) return;
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', fromNode.x);
    line.setAttribute('y1', fromNode.y);
    line.setAttribute('x2', toNode.x);
    line.setAttribute('y2', toNode.y);
    line.setAttribute('class', 'graph-edge unprocessed');
    if (edge.directed) {
      line.setAttribute('marker-end', 'url(#arrowhead)');
    }
    
    // Edge weight label
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', midX);
    text.setAttribute('y', midY - 5);
    text.setAttribute('class', 'graph-edge-label');
    text.textContent = edge.weight;
    
    g.appendChild(line);
    g.appendChild(text);
    this.svg.insertBefore(g, this.svg.firstChild); // Edges behind nodes
    
    edge.element = { group: g, line, text };
  }
  
  setNodeClass(id, className) {
    const node = this.nodes.get(id);
    if (node && node.element) {
      node.element.circle.setAttribute('class', `graph-node ${className}`);
    }
  }
  
  setEdgeClass(id, className) {
    const edge = this.edges.get(id);
    if (edge && edge.element) {
      edge.element.line.setAttribute('class', `graph-edge ${className}`);
    }
  }
  
  clear() {
    this.svg.innerHTML = '';
    this.nodes.clear();
    this.edges.clear();
    this.init();
  }
  
  createSampleGraph() {
    // Create a sample weighted graph for demonstrations
    this.addNode('A', 150, 100, 'A');
    this.addNode('B', 300, 80, 'B');
    this.addNode('C', 450, 100, 'C');
    this.addNode('D', 200, 200, 'D');
    this.addNode('E', 350, 200, 'E');
    this.addNode('F', 500, 180, 'F');
    
    this.addEdge('AB', 'A', 'B', 4);
    this.addEdge('AC', 'A', 'C', 8);
    this.addEdge('BD', 'B', 'D', 3);
    this.addEdge('BE', 'B', 'E', 2);
    this.addEdge('CE', 'C', 'E', 6);
    this.addEdge('CF', 'C', 'F', 1);
    this.addEdge('DE', 'D', 'E', 4);
    this.addEdge('EF', 'E', 'F', 5);
  }
}

class MinHeap {
  constructor(compareFunc = (a, b) => a[0] - b[0]) {
    this.heap = [];
    this.compare = compareFunc;
  }
  
  push(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }
  
  pop() {
    if (this.heap.length === 0) return null;
    const item = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown(0);
    }
    return item;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
  
  heapifyUp(n) {
    const item = this.heap[n];
    while (n > 0) {
      const parentN = Math.floor((n - 1) / 2);
      const parent = this.heap[parentN];
      if (this.compare(item, parent) >= 0) break;
      this.heap[n] = parent;
      n = parentN;
    }
    this.heap[n] = item;
  }
  
  heapifyDown(n) {
    const length = this.heap.length;
    const item = this.heap[n];
    
    while (true) {
      let leftChild = 2 * n + 1;
      let rightChild = 2 * n + 2;
      let smallest = n;
      
      if (leftChild < length && this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
        smallest = leftChild;
      }
      
      if (rightChild < length && this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
        smallest = rightChild;
      }
      
      if (smallest === n) break;
      
      this.heap[n] = this.heap[smallest];
      n = smallest;
    }
    this.heap[n] = item;
  }
}

// Dijkstra's Algorithm Visualization
function renderDijkstraGame(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Interactive Visualization</h2>
    <div class="muted">Click nodes to set source/destination, then watch Dijkstra find shortest paths using a priority queue.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="graph-controls">
      <button id="resetBtn" class="ghost">Reset Graph</button>
      <button id="setSourceBtn" class="ghost">Set Source</button>
      <button id="setDestBtn" class="ghost">Set Destination</button>
      <button id="runBtn" class="btn">Run Dijkstra</button>
      <button id="stepBtn" class="btn secondary">Step</button>
      <span class="spacer"></span>
      <label>Speed:</label>
      <input id="speedSlider" type="range" min="1" max="10" value="5" style="width:100px"/>
      <span id="status" class="pill">Click 'Set Source' to begin</span>
    </div>
    <div class="graph-container" id="graphContainer"></div>
    <div class="distance-table" id="distanceTable"></div>
    <div class="priority-queue" id="priorityQueue" style="display: none;">
      <div class="queue-title">Priority Queue (min-heap)</div>
      <div class="queue-items" id="queueItems"></div>
    </div>
  `;
  
  box.appendChild(ui);
  main.appendChild(box);
  
  const graphContainer = ui.querySelector('#graphContainer');
  const distanceTable = ui.querySelector('#distanceTable');
  const priorityQueue = ui.querySelector('#priorityQueue');
  const queueItems = ui.querySelector('#queueItems');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  
  let graph = new GraphVisualizer(graphContainer);
  let mode = 'none';
  let sourceNode = null;
  let destNode = null;
  let isRunning = false;
  let distances = new Map();
  let previous = new Map();
  
  // Initialize sample graph
  graph.createSampleGraph();
  
  function updateDistanceTable() {
    distanceTable.innerHTML = '';
    for (const [nodeId] of graph.nodes) {
      const entry = document.createElement('div');
      entry.className = 'distance-entry';
      entry.id = `dist-${nodeId}`;
      
      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'distance-node';
      nodeDiv.textContent = nodeId;
      
      const distDiv = document.createElement('div');
      distDiv.className = 'distance-value';
      const dist = distances.get(nodeId);
      distDiv.textContent = dist === Infinity ? '∞' : dist;
      
      entry.appendChild(nodeDiv);
      entry.appendChild(distDiv);
      distanceTable.appendChild(entry);
    }
  }
  
  function updateQueue(queue) {
    queueItems.innerHTML = '';
    queue.forEach((item, index) => {
      const queueItem = document.createElement('div');
      queueItem.className = 'queue-item';
      if (index === 0) queueItem.classList.add('processing');
      queueItem.textContent = `(${item[1]}, ${item[0]})`;
      queueItems.appendChild(queueItem);
    });
  }
  
  async function runDijkstra() {
    if (!sourceNode) {
      status.textContent = 'Please set a source node first';
      return;
    }
    
    isRunning = true;
    status.textContent = 'Running Dijkstra\'s algorithm...';
    priorityQueue.style.display = 'block';
    
    // Initialize distances
    distances.clear();
    previous.clear();
    for (const [nodeId] of graph.nodes) {
      distances.set(nodeId, Infinity);
      previous.set(nodeId, null);
      graph.setNodeClass(nodeId, 'unvisited');
    }
    
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    distances.set(sourceNode, 0);
    const pq = new MinHeap();
    pq.push([0, sourceNode]);
    
    const visited = new Set();
    const speed = 1100 - Number(speedSlider.value) * 100;
    
    updateDistanceTable();
    
    while (!pq.isEmpty() && isRunning) {
      const [currentDist, currentNode] = pq.pop();
      
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);
      
      // Highlight current node
      graph.setNodeClass(currentNode, 'current');
      status.textContent = `Processing node ${currentNode} with distance ${currentDist}`;
      
      updateQueue(pq.heap);
      
      await new Promise(resolve => setTimeout(resolve, speed));
      
      // Mark as visited
      if (currentNode !== sourceNode && currentNode !== destNode) {
        graph.setNodeClass(currentNode, 'visited');
      }
      
      // Check all neighbors
      for (const [edgeId, edge] of graph.edges) {
        let neighbor = null;
        let edgeWeight = edge.weight;
        
        if (edge.from === currentNode) {
          neighbor = edge.to;
        } else if (edge.to === currentNode && !edge.directed) {
          neighbor = edge.from;
        }
        
        if (neighbor && !visited.has(neighbor)) {
          const newDist = currentDist + edgeWeight;
          
          // Highlight edge being considered
          graph.setEdgeClass(edgeId, 'processing');
          await new Promise(resolve => setTimeout(resolve, speed / 2));
          
          if (newDist < distances.get(neighbor)) {
            distances.set(neighbor, newDist);
            previous.set(neighbor, currentNode);
            pq.push([newDist, neighbor]);
            
            // Flash updated distance
            const distEntry = document.getElementById(`dist-${neighbor}`);
            if (distEntry) {
              distEntry.classList.add('updated');
              setTimeout(() => distEntry.classList.remove('updated'), 500);
            }
            
            graph.setEdgeClass(edgeId, 'selected');
            status.textContent = `Updated distance to ${neighbor}: ${newDist}`;
            
            updateDistanceTable();
            updateQueue(pq.heap);
            
            await new Promise(resolve => setTimeout(resolve, speed));
          } else {
            graph.setEdgeClass(edgeId, 'rejected');
          }
          
          await new Promise(resolve => setTimeout(resolve, speed / 4));
          
          if (graph.edges.get(edgeId) && !graph.edges.get(edgeId).element.line.classList.contains('selected')) {
            graph.setEdgeClass(edgeId, 'unprocessed');
          }
        }
      }
    }
    
    // Highlight shortest path if destination is set
    if (destNode && distances.get(destNode) !== Infinity) {
      const path = [];
      let current = destNode;
      while (current !== null) {
        path.unshift(current);
        current = previous.get(current);
      }
      
      status.textContent = `Shortest path found! Distance: ${distances.get(destNode)}`;
      
      // Highlight path edges
      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        
        for (const [edgeId, edge] of graph.edges) {
          if ((edge.from === from && edge.to === to) || 
              (!edge.directed && edge.from === to && edge.to === from)) {
            graph.setEdgeClass(edgeId, 'shortest-path');
            break;
          }
        }
      }
      
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    } else if (destNode) {
      status.textContent = `No path to ${destNode} exists`;
    } else {
      status.textContent = 'Algorithm completed - shortest paths from source computed';
    }
    
    isRunning = false;
    priorityQueue.style.display = 'none';
  }
  
  // Event listeners
  ui.querySelector('#resetBtn').onclick = () => {
    graph.clear();
    graph.createSampleGraph();
    sourceNode = null;
    destNode = null;
    mode = 'none';
    isRunning = false;
    distances.clear();
    previous.clear();
    priorityQueue.style.display = 'none';
    status.textContent = 'Graph reset. Click \'Set Source\' to begin';
    updateDistanceTable();
  };
  
  ui.querySelector('#setSourceBtn').onclick = () => {
    mode = 'source';
    status.textContent = 'Click a node to set as source';
  };
  
  ui.querySelector('#setDestBtn').onclick = () => {
    mode = 'dest';
    status.textContent = 'Click a node to set as destination';
  };
  
  ui.querySelector('#runBtn').onclick = runDijkstra;
  
  // Node click handling
  graph.svg.onclick = (e) => {
    if (isRunning) return;
    
    const rect = graph.svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find clicked node
    let clickedNode = null;
    for (const [nodeId, node] of graph.nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= 25) {
        clickedNode = nodeId;
        break;
      }
    }
    
    if (clickedNode) {
      if (mode === 'source') {
        if (sourceNode) graph.setNodeClass(sourceNode, 'unvisited');
        sourceNode = clickedNode;
        graph.setNodeClass(sourceNode, 'source');
        status.textContent = `Source set to ${sourceNode}`;
        mode = 'none';
      } else if (mode === 'dest') {
        if (destNode) graph.setNodeClass(destNode, 'unvisited');
        destNode = clickedNode;
        graph.setNodeClass(destNode, 'destination');
        status.textContent = `Destination set to ${destNode}`;
        mode = 'none';
      }
    }
  };
  
  updateDistanceTable();
}

// Prim's MST Algorithm Visualization  
function renderPrimsGame(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Interactive Visualization</h2>
    <div class="muted">Watch Prim's algorithm build a Minimum Spanning Tree by growing from a single vertex, always choosing the minimum weight edge.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="graph-controls">
      <button id="resetBtn" class="ghost">Reset Graph</button>
      <button id="setStartBtn" class="ghost">Set Start Vertex</button>
      <button id="runBtn" class="btn">Run Prim's</button>
      <button id="stepBtn" class="btn secondary">Step</button>
      <span class="spacer"></span>
      <label>Speed:</label>
      <input id="speedSlider" type="range" min="1" max="10" value="5" style="width:100px"/>
      <span id="status" class="pill">Click 'Set Start Vertex' to begin</span>
    </div>
    <div class="graph-container" id="graphContainer"></div>
    <div class="priority-queue" id="priorityQueue" style="display: none;">
      <div class="queue-title">Edge Priority Queue (min-weight)</div>
      <div class="queue-items" id="queueItems"></div>
    </div>
    <div class="distance-table" id="mstInfo">
      <div style="text-align: center; margin-bottom: 10px;">
        <span class="pill" id="mstWeight">MST Weight: 0</span>
        <span class="pill" id="edgeCount">Edges: 0/5</span>
      </div>
    </div>
  `;
  
  box.appendChild(ui);
  main.appendChild(box);
  
  const graphContainer = ui.querySelector('#graphContainer');
  const priorityQueue = ui.querySelector('#priorityQueue');
  const queueItems = ui.querySelector('#queueItems');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const mstWeight = ui.querySelector('#mstWeight');
  const edgeCount = ui.querySelector('#edgeCount');
  
  let graph = new GraphVisualizer(graphContainer);
  let mode = 'none';
  let startNode = null;
  let isRunning = false;
  let totalWeight = 0;
  let edgesInMST = 0;
  
  // Initialize sample graph
  graph.createSampleGraph();
  const totalNodes = graph.nodes.size;
  
  function updateQueue(queue) {
    queueItems.innerHTML = '';
    queue.forEach((item, index) => {
      const queueItem = document.createElement('div');
      queueItem.className = 'queue-item';
      if (index === 0) queueItem.classList.add('processing');
      queueItem.textContent = `${item[1]}-${item[2]} (${item[0]})`;
      queueItems.appendChild(queueItem);
    });
  }
  
  async function runPrims() {
    if (!startNode) {
      status.textContent = 'Please set a start vertex first';
      return;
    }
    
    isRunning = true;
    status.textContent = 'Running Prim\'s MST algorithm...';
    priorityQueue.style.display = 'block';
    
    // Reset visualization
    for (const [nodeId] of graph.nodes) {
      graph.setNodeClass(nodeId, 'unvisited');
    }
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    totalWeight = 0;
    edgesInMST = 0;
    const visited = new Set();
    const pq = new MinHeap(); // [weight, from, to, edgeId]
    const speed = 1100 - Number(speedSlider.value) * 100;
    
    // Start with the chosen vertex
    visited.add(startNode);
    graph.setNodeClass(startNode, 'in-mst');
    
    // Add all edges from start vertex to queue
    for (const [edgeId, edge] of graph.edges) {
      if (edge.from === startNode) {
        if (!visited.has(edge.to)) {
          pq.push([edge.weight, edge.from, edge.to, edgeId]);
        }
      } else if (edge.to === startNode && !edge.directed) {
        if (!visited.has(edge.from)) {
          pq.push([edge.weight, edge.to, edge.from, edgeId]);
        }
      }
    }
    
    updateQueue(pq.heap);
    mstWeight.textContent = `MST Weight: ${totalWeight}`;
    edgeCount.textContent = `Edges: ${edgesInMST}/${totalNodes - 1}`;
    
    while (!pq.isEmpty() && visited.size < totalNodes && isRunning) {
      const [weight, from, to, edgeId] = pq.pop();
      
      updateQueue(pq.heap);
      
      // Skip if both vertices are already in MST
      if (visited.has(to)) {
        graph.setEdgeClass(edgeId, 'rejected');
        status.textContent = `Edge ${from}-${to} rejected (would create cycle)`;
        await new Promise(resolve => setTimeout(resolve, speed));
        continue;
      }
      
      // Highlight processing edge
      graph.setEdgeClass(edgeId, 'processing');
      status.textContent = `Processing edge ${from}-${to} with weight ${weight}`;
      
      await new Promise(resolve => setTimeout(resolve, speed));
      
      // Add vertex to MST
      visited.add(to);
      graph.setNodeClass(to, 'in-mst');
      graph.setEdgeClass(edgeId, 'mst');
      
      totalWeight += weight;
      edgesInMST++;
      
      mstWeight.textContent = `MST Weight: ${totalWeight}`;
      edgeCount.textContent = `Edges: ${edgesInMST}/${totalNodes - 1}`;
      
      status.textContent = `Added edge ${from}-${to} to MST (weight: ${weight})`;
      
      // Add new edges to queue from newly added vertex
      for (const [newEdgeId, edge] of graph.edges) {
        let otherVertex = null;
        if (edge.from === to && !visited.has(edge.to)) {
          otherVertex = edge.to;
          pq.push([edge.weight, edge.from, edge.to, newEdgeId]);
        } else if (edge.to === to && !edge.directed && !visited.has(edge.from)) {
          otherVertex = edge.from;
          pq.push([edge.weight, edge.to, edge.from, newEdgeId]);
        }
      }
      
      updateQueue(pq.heap);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    if (edgesInMST === totalNodes - 1) {
      status.textContent = `MST completed! Total weight: ${totalWeight}`;
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    } else {
      status.textContent = 'Graph is not connected - MST incomplete';
    }
    
    isRunning = false;
    priorityQueue.style.display = 'none';
  }
  
  // Event listeners
  ui.querySelector('#resetBtn').onclick = () => {
    graph.clear();
    graph.createSampleGraph();
    startNode = null;
    mode = 'none';
    isRunning = false;
    totalWeight = 0;
    edgesInMST = 0;
    priorityQueue.style.display = 'none';
    status.textContent = 'Graph reset. Click \'Set Start Vertex\' to begin';
    mstWeight.textContent = 'MST Weight: 0';
    edgeCount.textContent = 'Edges: 0/5';
  };
  
  ui.querySelector('#setStartBtn').onclick = () => {
    mode = 'start';
    status.textContent = 'Click a vertex to start Prim\'s algorithm';
  };
  
  ui.querySelector('#runBtn').onclick = runPrims;
  
  // Node click handling
  graph.svg.onclick = (e) => {
    if (isRunning) return;
    
    const rect = graph.svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let clickedNode = null;
    for (const [nodeId, node] of graph.nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= 25) {
        clickedNode = nodeId;
        break;
      }
    }
    
    if (clickedNode && mode === 'start') {
      if (startNode) graph.setNodeClass(startNode, 'unvisited');
      startNode = clickedNode;
      graph.setNodeClass(startNode, 'source');
      status.textContent = `Start vertex set to ${startNode}`;
      mode = 'none';
    }
  };
  
  mstWeight.textContent = 'MST Weight: 0';
  edgeCount.textContent = `Edges: 0/${totalNodes - 1}`;
}

// Kruskal's MST Algorithm Visualization
function renderKruskalsGame(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Interactive Visualization</h2>
    <div class="muted">Watch Kruskal's algorithm build MST by sorting all edges and using Union-Find to avoid cycles.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="graph-controls">
      <button id="resetBtn" class="ghost">Reset Graph</button>
      <button id="sortBtn" class="ghost">Sort Edges</button>
      <button id="runBtn" class="btn">Run Kruskal's</button>
      <button id="stepBtn" class="btn secondary">Step</button>
      <span class="spacer"></span>
      <label>Speed:</label>
      <input id="speedSlider" type="range" min="1" max="10" value="5" style="width:100px"/>
      <span id="status" class="pill">Click 'Sort Edges' to begin</span>
    </div>
    <div class="graph-container" id="graphContainer"></div>
    <div class="distance-table" id="edgeList" style="display: none;">
      <div class="queue-title">Sorted Edges</div>
      <div class="queue-items" id="sortedEdges"></div>
    </div>
    <div class="distance-table" id="mstInfo">
      <div style="text-align: center; margin-bottom: 10px;">
        <span class="pill" id="mstWeight">MST Weight: 0</span>
        <span class="pill" id="edgeCount">Edges: 0/5</span>
      </div>
      <div style="text-align: center;">
        <span class="pill" id="components">Components: 6</span>
      </div>
    </div>
  `;
  
  box.appendChild(ui);
  main.appendChild(box);
  
  const graphContainer = ui.querySelector('#graphContainer');
  const edgeList = ui.querySelector('#edgeList');
  const sortedEdgesDiv = ui.querySelector('#sortedEdges');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const mstWeight = ui.querySelector('#mstWeight');
  const edgeCount = ui.querySelector('#edgeCount');
  const componentsSpan = ui.querySelector('#components');
  
  let graph = new GraphVisualizer(graphContainer);
  let isRunning = false;
  let totalWeight = 0;
  let edgesInMST = 0;
  let sortedEdges = [];
  let unionFind = null;
  
  // Initialize sample graph
  graph.createSampleGraph();
  const totalNodes = graph.nodes.size;
  
  class UnionFind {
    constructor(n) {
      this.parent = Array.from({length: n}, (_, i) => i);
      this.rank = new Array(n).fill(0);
      this.components = n;
      this.nodeIds = Array.from(graph.nodes.keys());
    }
    
    find(x) {
      const idx = this.nodeIds.indexOf(x);
      if (this.parent[idx] !== idx) {
        this.parent[idx] = this.find(this.nodeIds[this.parent[idx]]);
      }
      return this.parent[idx];
    }
    
    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      const idxX = this.nodeIds.indexOf(x);
      const idxY = this.nodeIds.indexOf(y);
      
      if (rootX === rootY) return false;
      
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      
      this.components--;
      return true;
    }
    
    connected(x, y) {
      return this.find(x) === this.find(y);
    }
  }
  
  function updateComponents() {
    // Color nodes by component
    const componentColors = ['var(--accent)', 'var(--ok)', 'var(--warning)', 'var(--info)', 'var(--error)', '#9c27b0'];
    const componentMap = new Map();
    let colorIndex = 0;
    
    for (const [nodeId] of graph.nodes) {
      const root = unionFind.find(nodeId);
      if (!componentMap.has(root)) {
        componentMap.set(root, componentColors[colorIndex % componentColors.length]);
        colorIndex++;
      }
      
      const node = graph.nodes.get(nodeId);
      if (node && node.element) {
        node.element.circle.style.fill = componentMap.get(root);
      }
    }
    
    componentsSpan.textContent = `Components: ${unionFind.components}`;
  }
  
  function sortEdges() {
    sortedEdges = Array.from(graph.edges.entries()).map(([id, edge]) => ({
      id,
      from: edge.from,
      to: edge.to,
      weight: edge.weight
    }));
    
    sortedEdges.sort((a, b) => a.weight - b.weight);
    
    sortedEdgesDiv.innerHTML = '';
    sortedEdges.forEach((edge, index) => {
      const edgeItem = document.createElement('div');
      edgeItem.className = 'queue-item';
      edgeItem.id = `sorted-edge-${index}`;
      edgeItem.textContent = `${edge.from}-${edge.to} (${edge.weight})`;
      sortedEdgesDiv.appendChild(edgeItem);
    });
    
    edgeList.style.display = 'block';
    status.textContent = 'Edges sorted by weight. Ready to run Kruskal\'s!';
  }
  
  async function runKruskals() {
    if (sortedEdges.length === 0) {
      status.textContent = 'Please sort edges first';
      return;
    }
    
    isRunning = true;
    status.textContent = 'Running Kruskal\'s MST algorithm...';
    
    // Reset visualization
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    totalWeight = 0;
    edgesInMST = 0;
    unionFind = new UnionFind(totalNodes);
    const speed = 1100 - Number(speedSlider.value) * 100;
    
    updateComponents();
    mstWeight.textContent = `MST Weight: ${totalWeight}`;
    edgeCount.textContent = `Edges: ${edgesInMST}/${totalNodes - 1}`;
    
    for (let i = 0; i < sortedEdges.length && edgesInMST < totalNodes - 1 && isRunning; i++) {
      const edge = sortedEdges[i];
      
      // Highlight current edge in sorted list
      document.querySelectorAll('.queue-item').forEach(item => item.classList.remove('processing'));
      const currentEdgeItem = document.getElementById(`sorted-edge-${i}`);
      if (currentEdgeItem) currentEdgeItem.classList.add('processing');
      
      // Highlight edge in graph
      graph.setEdgeClass(edge.id, 'processing');
      status.textContent = `Considering edge ${edge.from}-${edge.to} (weight: ${edge.weight})`;
      
      await new Promise(resolve => setTimeout(resolve, speed));
      
      // Check if edge creates cycle
      if (unionFind.connected(edge.from, edge.to)) {
        graph.setEdgeClass(edge.id, 'rejected');
        status.textContent = `Edge ${edge.from}-${edge.to} rejected (creates cycle)`;
      } else {
        // Add edge to MST
        unionFind.union(edge.from, edge.to);
        graph.setEdgeClass(edge.id, 'mst');
        totalWeight += edge.weight;
        edgesInMST++;
        
        mstWeight.textContent = `MST Weight: ${totalWeight}`;
        edgeCount.textContent = `Edges: ${edgesInMST}/${totalNodes - 1}`;
        
        status.textContent = `Added edge ${edge.from}-${edge.to} to MST`;
        updateComponents();
      }
      
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    if (edgesInMST === totalNodes - 1) {
      status.textContent = `MST completed! Total weight: ${totalWeight}`;
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    } else {
      status.textContent = 'Graph is not connected - MST incomplete';
    }
    
    isRunning = false;
  }
  
  // Event listeners
  ui.querySelector('#resetBtn').onclick = () => {
    graph.clear();
    graph.createSampleGraph();
    isRunning = false;
    totalWeight = 0;
    edgesInMST = 0;
    sortedEdges = [];
    unionFind = null;
    edgeList.style.display = 'none';
    status.textContent = 'Graph reset. Click \'Sort Edges\' to begin';
    mstWeight.textContent = 'MST Weight: 0';
    edgeCount.textContent = 'Edges: 0/5';
    componentsSpan.textContent = 'Components: 6';
  };
  
  ui.querySelector('#sortBtn').onclick = sortEdges;
  ui.querySelector('#runBtn').onclick = runKruskals;
  
  mstWeight.textContent = 'MST Weight: 0';
  edgeCount.textContent = `Edges: 0/${totalNodes - 1}`;
  componentsSpan.textContent = `Components: ${totalNodes}`;
}

// Topological Sort Visualization
function renderTopSortGame(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Interactive Visualization</h2>
    <div class="muted">Create a DAG and watch topological sort find a linear ordering respecting dependencies.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="graph-controls">
      <button id="resetBtn" class="ghost">Reset DAG</button>
      <button id="kahnBtn" class="btn">Kahn's Algorithm</button>
      <button id="dfsBtn" class="btn secondary">DFS Approach</button>
      <span class="spacer"></span>
      <label>Speed:</label>
      <input id="speedSlider" type="range" min="1" max="10" value="5" style="width:100px"/>
      <span id="status" class="pill">Ready to sort</span>
    </div>
    <div class="graph-container" id="graphContainer"></div>
    <div class="distance-table" id="indegreeTable">
      <div class="queue-title">In-degree Count</div>
      <div class="queue-items" id="indegreeItems"></div>
    </div>
    <div class="priority-queue" id="queueSection" style="display: none;">
      <div class="queue-title">Processing Queue</div>
      <div class="queue-items" id="queueItems"></div>
    </div>
    <div class="distance-table" id="resultSection">
      <div class="queue-title">Topological Order</div>
      <div class="queue-items" id="topoOrder"></div>
    </div>
  `;
  
  box.appendChild(ui);
  main.appendChild(box);
  
  const graphContainer = ui.querySelector('#graphContainer');
  const indegreeItems = ui.querySelector('#indegreeItems');
  const queueSection = ui.querySelector('#queueSection');
  const queueItems = ui.querySelector('#queueItems');
  const topoOrder = ui.querySelector('#topoOrder');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  
  let graph = new GraphVisualizer(graphContainer);
  let isRunning = false;
  
  // Create sample DAG
  function createSampleDAG() {
    graph.clear();
    graph.addNode('A', 150, 100, 'A');
    graph.addNode('B', 300, 80, 'B');
    graph.addNode('C', 450, 100, 'C');
    graph.addNode('D', 200, 200, 'D');
    graph.addNode('E', 350, 200, 'E');
    graph.addNode('F', 500, 180, 'F');
    
    // Directed edges for DAG
    graph.addEdge('AB', 'A', 'B', 1, true);
    graph.addEdge('AC', 'A', 'C', 1, true);
    graph.addEdge('BD', 'B', 'D', 1, true);
    graph.addEdge('BE', 'B', 'E', 1, true);
    graph.addEdge('CE', 'C', 'E', 1, true);
    graph.addEdge('CF', 'C', 'F', 1, true);
    graph.addEdge('EF', 'E', 'F', 1, true);
  }
  
  function calculateIndegrees() {
    const indegrees = new Map();
    for (const [nodeId] of graph.nodes) {
      indegrees.set(nodeId, 0);
    }
    
    for (const [, edge] of graph.edges) {
      if (edge.directed) {
        indegrees.set(edge.to, indegrees.get(edge.to) + 1);
      }
    }
    
    return indegrees;
  }
  
  function updateIndegreeDisplay(indegrees, highlight = null) {
    indegreeItems.innerHTML = '';
    for (const [nodeId, degree] of indegrees) {
      const item = document.createElement('div');
      item.className = 'queue-item';
      if (highlight && highlight.includes(nodeId)) {
        item.classList.add('processing');
      }
      item.textContent = `${nodeId}: ${degree}`;
      indegreeItems.appendChild(item);
    }
  }
  
  function updateQueue(queue) {
    queueItems.innerHTML = '';
    queue.forEach((nodeId, index) => {
      const item = document.createElement('div');
      item.className = 'queue-item';
      if (index === 0) item.classList.add('processing');
      item.textContent = nodeId;
      queueItems.appendChild(item);
    });
  }
  
  function updateTopoOrder(order) {
    topoOrder.innerHTML = '';
    order.forEach((nodeId, index) => {
      const item = document.createElement('div');
      item.className = 'queue-item';
      item.textContent = `${index + 1}. ${nodeId}`;
      topoOrder.appendChild(item);
    });
  }
  
  async function runKahnsAlgorithm() {
    isRunning = true;
    status.textContent = 'Running Kahn\'s topological sort...';
    queueSection.style.display = 'block';
    
    // Reset visualization
    for (const [nodeId] of graph.nodes) {
      graph.setNodeClass(nodeId, 'unvisited');
    }
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    const indegrees = calculateIndegrees();
    const queue = [];
    const result = [];
    const speed = 1100 - Number(speedSlider.value) * 100;
    
    // Find all nodes with indegree 0
    for (const [nodeId, degree] of indegrees) {
      if (degree === 0) {
        queue.push(nodeId);
        graph.setNodeClass(nodeId, 'source');
      }
    }
    
    updateIndegreeDisplay(indegrees);
    updateQueue(queue);
    updateTopoOrder(result);
    
    await new Promise(resolve => setTimeout(resolve, speed));
    
    while (queue.length > 0 && isRunning) {
      const currentNode = queue.shift();
      result.push(currentNode);
      
      graph.setNodeClass(currentNode, 'visited');
      status.textContent = `Processing node ${currentNode}`;
      
      updateQueue(queue);
      updateTopoOrder(result);
      
      await new Promise(resolve => setTimeout(resolve, speed));
      
      // Remove outgoing edges and update indegrees
      const updatedNodes = [];
      for (const [edgeId, edge] of graph.edges) {
        if (edge.from === currentNode && edge.directed) {
          graph.setEdgeClass(edgeId, 'processing');
          indegrees.set(edge.to, indegrees.get(edge.to) - 1);
          updatedNodes.push(edge.to);
          
          // If indegree becomes 0, add to queue
          if (indegrees.get(edge.to) === 0) {
            queue.push(edge.to);
            graph.setNodeClass(edge.to, 'source');
          }
          
          await new Promise(resolve => setTimeout(resolve, speed / 2));
          graph.setEdgeClass(edgeId, 'selected');
        }
      }
      
      updateIndegreeDisplay(indegrees, updatedNodes);
      updateQueue(queue);
      
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    if (result.length === graph.nodes.size) {
      status.textContent = 'Topological sort completed successfully!';
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    } else {
      status.textContent = 'Cycle detected! Topological sort impossible.';
    }
    
    isRunning = false;
    queueSection.style.display = 'none';
  }
  
  async function runDFSTopSort() {
    isRunning = true;
    status.textContent = 'Running DFS-based topological sort...';
    
    // Reset visualization
    for (const [nodeId] of graph.nodes) {
      graph.setNodeClass(nodeId, 'unvisited');
    }
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    const visited = new Set();
    const visiting = new Set(); // For cycle detection
    const result = [];
    const speed = 1100 - Number(speedSlider.value) * 100;
    let hasCycle = false;
    
    async function dfsVisit(nodeId) {
      if (visiting.has(nodeId)) {
        hasCycle = true;
        return;
      }
      if (visited.has(nodeId)) return;
      
      visiting.add(nodeId);
      graph.setNodeClass(nodeId, 'current');
      status.textContent = `DFS visiting ${nodeId}`;
      
      await new Promise(resolve => setTimeout(resolve, speed));
      
      // Visit all adjacent nodes
      for (const [edgeId, edge] of graph.edges) {
        if (edge.from === nodeId && edge.directed) {
          graph.setEdgeClass(edgeId, 'processing');
          await dfsVisit(edge.to);
          graph.setEdgeClass(edgeId, 'selected');
        }
      }
      
      visiting.delete(nodeId);
      visited.add(nodeId);
      result.unshift(nodeId); // Add to front for reverse post-order
      graph.setNodeClass(nodeId, 'visited');
      
      updateTopoOrder(result);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    // Visit all unvisited nodes
    for (const [nodeId] of graph.nodes) {
      if (!visited.has(nodeId) && !hasCycle) {
        await dfsVisit(nodeId);
      }
    }
    
    if (hasCycle) {
      status.textContent = 'Cycle detected! Topological sort impossible.';
    } else {
      status.textContent = 'DFS topological sort completed!';
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    }
    
    isRunning = false;
  }
  
  // Event listeners
  ui.querySelector('#resetBtn').onclick = () => {
    createSampleDAG();
    isRunning = false;
    queueSection.style.display = 'none';
    status.textContent = 'DAG reset. Ready to sort';
    updateIndegreeDisplay(calculateIndegrees());
    updateTopoOrder([]);
  };
  
  ui.querySelector('#kahnBtn').onclick = runKahnsAlgorithm;
  ui.querySelector('#dfsBtn').onclick = runDFSTopSort;
  
  // Initialize
  createSampleDAG();
  updateIndegreeDisplay(calculateIndegrees());
  updateTopoOrder([]);
}

// Bellman-Ford Algorithm Visualization
function renderBellmanFordGame(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Interactive Visualization</h2>
    <div class="muted">Watch Bellman-Ford handle negative weights and detect negative cycles through V-1 iterations.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="graph-controls">
      <button id="resetBtn" class="ghost">Reset Graph</button>
      <button id="negativeBtn" class="ghost">Add Negative Edges</button>
      <button id="setSourceBtn" class="ghost">Set Source</button>
      <button id="runBtn" class="btn">Run Bellman-Ford</button>
      <span class="spacer"></span>
      <label>Speed:</label>
      <input id="speedSlider" type="range" min="1" max="10" value="5" style="width:100px"/>
      <span id="status" class="pill">Click 'Set Source' to begin</span>
    </div>
    <div class="graph-container" id="graphContainer"></div>
    <div class="distance-table" id="distanceTable"></div>
    <div class="distance-table" id="iterationInfo">
      <div style="text-align: center;">
        <span class="pill" id="currentIteration">Iteration: 0/5</span>
        <span class="pill" id="changesCount">Changes: 0</span>
      </div>
    </div>
  `;
  
  box.appendChild(ui);
  main.appendChild(box);
  
  const graphContainer = ui.querySelector('#graphContainer');
  const distanceTable = ui.querySelector('#distanceTable');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const currentIteration = ui.querySelector('#currentIteration');
  const changesCount = ui.querySelector('#changesCount');
  
  let graph = new GraphVisualizer(graphContainer);
  let sourceNode = null;
  let isRunning = false;
  let distances = new Map();
  let previous = new Map();
  
  function createGraphWithNegativeEdges() {
    graph.clear();
    graph.addNode('S', 100, 150, 'S');
    graph.addNode('A', 250, 100, 'A');
    graph.addNode('B', 400, 100, 'B');
    graph.addNode('C', 250, 200, 'C');
    graph.addNode('D', 400, 200, 'D');
    
    // Mix of positive and negative edges
    graph.addEdge('SA', 'S', 'A', 4, true);
    graph.addEdge('SC', 'S', 'C', 2, true);
    graph.addEdge('AB', 'A', 'B', 3, true);
    graph.addEdge('AC', 'A', 'C', -2, true); // Negative edge
    graph.addEdge('CB', 'C', 'B', 4, true);
    graph.addEdge('CD', 'C', 'D', 3, true);
    graph.addEdge('BD', 'B', 'D', -1, true); // Negative edge
  }
  
  function updateDistanceTable(changedNodes = []) {
    distanceTable.innerHTML = '';
    for (const [nodeId] of graph.nodes) {
      const entry = document.createElement('div');
      entry.className = 'distance-entry';
      if (changedNodes.includes(nodeId)) {
        entry.classList.add('updated');
      }
      
      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'distance-node';
      nodeDiv.textContent = nodeId;
      
      const distDiv = document.createElement('div');
      distDiv.className = 'distance-value';
      const dist = distances.get(nodeId);
      distDiv.textContent = dist === Infinity ? '∞' : dist;
      
      entry.appendChild(nodeDiv);
      entry.appendChild(distDiv);
      distanceTable.appendChild(entry);
    }
  }
  
  async function runBellmanFord() {
    if (!sourceNode) {
      status.textContent = 'Please set a source node first';
      return;
    }
    
    isRunning = true;
    status.textContent = 'Running Bellman-Ford algorithm...';
    
    // Initialize distances
    distances.clear();
    previous.clear();
    for (const [nodeId] of graph.nodes) {
      distances.set(nodeId, Infinity);
      previous.set(nodeId, null);
      graph.setNodeClass(nodeId, 'unvisited');
    }
    
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    distances.set(sourceNode, 0);
    graph.setNodeClass(sourceNode, 'source');
    
    const totalNodes = graph.nodes.size;
    const speed = 1100 - Number(speedSlider.value) * 100;
    updateDistanceTable();
    
    // Main algorithm: V-1 iterations
    for (let iteration = 1; iteration < totalNodes && isRunning; iteration++) {
      currentIteration.textContent = `Iteration: ${iteration}/${totalNodes - 1}`;
      let changes = 0;
      const changedNodes = [];
      
      status.textContent = `Iteration ${iteration}: Relaxing all edges...`;
      
      // Relax all edges
      for (const [edgeId, edge] of graph.edges) {
        if (!edge.directed) continue;
        
        graph.setEdgeClass(edgeId, 'processing');
        
        const u = edge.from;
        const v = edge.to;
        const weight = edge.weight;
        
        await new Promise(resolve => setTimeout(resolve, speed / 2));
        
        if (distances.get(u) !== Infinity && 
            distances.get(u) + weight < distances.get(v)) {
          distances.set(v, distances.get(u) + weight);
          previous.set(v, u);
          changes++;
          changedNodes.push(v);
          
          graph.setEdgeClass(edgeId, 'selected');
          status.textContent = `Relaxed edge ${u}→${v}: distance to ${v} = ${distances.get(v)}`;
          
          await new Promise(resolve => setTimeout(resolve, speed));
        } else {
          graph.setEdgeClass(edgeId, 'unprocessed');
        }
      }
      
      changesCount.textContent = `Changes: ${changes}`;
      updateDistanceTable(changedNodes);
      
      // Remove temporary highlighting
      setTimeout(() => {
        document.querySelectorAll('.distance-entry.updated').forEach(entry => {
          entry.classList.remove('updated');
        });
      }, 1000);
      
      if (changes === 0) {
        status.textContent = `Converged early at iteration ${iteration}!`;
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    // Check for negative cycles (extra iteration)
    status.textContent = 'Checking for negative cycles...';
    currentIteration.textContent = `Iteration: ${totalNodes}/${totalNodes - 1} (Cycle Check)`;
    let hasNegativeCycle = false;
    
    for (const [edgeId, edge] of graph.edges) {
      if (!edge.directed) continue;
      
      graph.setEdgeClass(edgeId, 'processing');
      
      const u = edge.from;
      const v = edge.to;
      const weight = edge.weight;
      
      await new Promise(resolve => setTimeout(resolve, speed / 2));
      
      if (distances.get(u) !== Infinity && 
          distances.get(u) + weight < distances.get(v)) {
        hasNegativeCycle = true;
        graph.setEdgeClass(edgeId, 'rejected');
        status.textContent = 'Negative cycle detected!';
        break;
      } else {
        graph.setEdgeClass(edgeId, 'unprocessed');
      }
    }
    
    if (!hasNegativeCycle) {
      status.textContent = 'Bellman-Ford completed - shortest paths found!';
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    }
    
    isRunning = false;
  }
  
  // Event listeners
  ui.querySelector('#resetBtn').onclick = () => {
    graph.clear();
    graph.createSampleGraph();
    sourceNode = null;
    isRunning = false;
    distances.clear();
    previous.clear();
    status.textContent = 'Graph reset. Click \'Set Source\' to begin';
    currentIteration.textContent = 'Iteration: 0/5';
    changesCount.textContent = 'Changes: 0';
    updateDistanceTable();
  };
  
  ui.querySelector('#negativeBtn').onclick = () => {
    createGraphWithNegativeEdges();
    sourceNode = null;
    distances.clear();
    previous.clear();
    status.textContent = 'Graph with negative edges loaded';
    updateDistanceTable();
  };
  
  ui.querySelector('#setSourceBtn').onclick = () => {
    status.textContent = 'Click a node to set as source';
    
    graph.svg.onclick = (e) => {
      if (isRunning) return;
      
      const rect = graph.svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      let clickedNode = null;
      for (const [nodeId, node] of graph.nodes) {
        const dx = x - node.x;
        const dy = y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) <= 25) {
          clickedNode = nodeId;
          break;
        }
      }
      
      if (clickedNode) {
        if (sourceNode) graph.setNodeClass(sourceNode, 'unvisited');
        sourceNode = clickedNode;
        graph.setNodeClass(sourceNode, 'source');
        status.textContent = `Source set to ${sourceNode}`;
        graph.svg.onclick = null;
      }
    };
  };
  
  ui.querySelector('#runBtn').onclick = runBellmanFord;
  
  // Initialize
  graph.createSampleGraph();
  updateDistanceTable();
}

// Floyd-Warshall Algorithm Visualization
function renderFloydWarshallGame(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Interactive Visualization</h2>
    <div class="muted">Watch Floyd-Warshall compute all-pairs shortest paths using dynamic programming with intermediate vertices.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="graph-controls">
      <button id="resetBtn" class="ghost">Reset Graph</button>
      <button id="runBtn" class="btn">Run Floyd-Warshall</button>
      <span class="spacer"></span>
      <label>Speed:</label>
      <input id="speedSlider" type="range" min="1" max="10" value="3" style="width:100px"/>
      <span id="status" class="pill">Ready to compute all-pairs shortest paths</span>
    </div>
    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
      <div class="graph-container" id="graphContainer" style="flex: 1; min-width: 400px;"></div>
      <div class="matrix-container" id="matrixContainer" style="flex: 1; min-width: 300px;">
        <div style="text-align: center; margin-bottom: 10px;">
          <span class="pill" id="currentK">Intermediate Vertex: None</span>
        </div>
        <table class="matrix-table" id="distanceMatrix"></table>
      </div>
    </div>
  `;
  
  box.appendChild(ui);
  main.appendChild(box);
  
  const graphContainer = ui.querySelector('#graphContainer');
  const matrixContainer = ui.querySelector('#matrixContainer');
  const distanceMatrix = ui.querySelector('#distanceMatrix');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const currentK = ui.querySelector('#currentK');
  
  let graph = new GraphVisualizer(graphContainer, 400, 300);
  let isRunning = false;
  let dist = [];
  let nodeList = [];
  
  function createSmallGraph() {
    graph.clear();
    graph.addNode('A', 80, 60, 'A');
    graph.addNode('B', 200, 60, 'B');
    graph.addNode('C', 80, 160, 'C');
    graph.addNode('D', 200, 160, 'D');
    
    // Directed edges with weights
    graph.addEdge('AB', 'A', 'B', 3, true);
    graph.addEdge('AC', 'A', 'C', 8, true);
    graph.addEdge('AD', 'A', 'D', -4, true);
    graph.addEdge('BD', 'B', 'D', 1, true);
    graph.addEdge('BC', 'B', 'C', -2, true);
    graph.addEdge('CD', 'C', 'D', 2, true);
    
    nodeList = ['A', 'B', 'C', 'D'];
  }
  
  function initializeMatrix() {
    const n = nodeList.length;
    dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    
    // Distance from node to itself is 0
    for (let i = 0; i < n; i++) {
      dist[i][i] = 0;
    }
    
    // Initialize with direct edge weights
    for (const [, edge] of graph.edges) {
      if (edge.directed) {
        const i = nodeList.indexOf(edge.from);
        const j = nodeList.indexOf(edge.to);
        if (i >= 0 && j >= 0) {
          dist[i][j] = edge.weight;
        }
      }
    }
  }
  
  function updateMatrix(highlightK = -1, highlightI = -1, highlightJ = -1) {
    distanceMatrix.innerHTML = '';
    const n = nodeList.length;
    
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('td')); // Empty corner
    nodeList.forEach(node => {
      const th = document.createElement('td');
      th.className = 'matrix-cell header';
      th.textContent = node;
      headerRow.appendChild(th);
    });
    distanceMatrix.appendChild(headerRow);
    
    // Data rows
    for (let i = 0; i < n; i++) {
      const row = document.createElement('tr');
      
      // Row header
      const rowHeader = document.createElement('td');
      rowHeader.className = 'matrix-cell header';
      rowHeader.textContent = nodeList[i];
      row.appendChild(rowHeader);
      
      // Data cells
      for (let j = 0; j < n; j++) {
        const cell = document.createElement('td');
        cell.className = 'matrix-cell';
        cell.textContent = dist[i][j] === Infinity ? '∞' : dist[i][j];
        
        if (i === highlightI && j === highlightJ) {
          cell.classList.add('updated');
        } else if (i === highlightK || j === highlightK) {
          cell.classList.add('considering');
        }
        
        row.appendChild(cell);
      }
      
      distanceMatrix.appendChild(row);
    }
  }
  
  async function runFloydWarshall() {
    isRunning = true;
    status.textContent = 'Running Floyd-Warshall algorithm...';
    
    // Reset visualization
    for (const [nodeId] of graph.nodes) {
      graph.setNodeClass(nodeId, 'unvisited');
    }
    for (const [edgeId] of graph.edges) {
      graph.setEdgeClass(edgeId, 'unprocessed');
    }
    
    initializeMatrix();
    updateMatrix();
    
    const n = nodeList.length;
    const speed = 1100 - Number(speedSlider.value) * 100;
    
    await new Promise(resolve => setTimeout(resolve, speed));
    
    // Main Floyd-Warshall algorithm
    for (let k = 0; k < n && isRunning; k++) {
      currentK.textContent = `Intermediate Vertex: ${nodeList[k]}`;
      graph.setNodeClass(nodeList[k], 'current');
      status.textContent = `Using ${nodeList[k]} as intermediate vertex...`;
      
      updateMatrix(k);
      await new Promise(resolve => setTimeout(resolve, speed));
      
      for (let i = 0; i < n && isRunning; i++) {
        for (let j = 0; j < n && isRunning; j++) {
          if (i === j || i === k || j === k) continue;
          
          const directDist = dist[i][j];
          const viaKDist = dist[i][k] + dist[k][j];
          
          // Highlight the calculation
          updateMatrix(k, i, j);
          status.textContent = `Checking path ${nodeList[i]} → ${nodeList[k]} → ${nodeList[j]}: ${dist[i][k]} + ${dist[k][j]} = ${viaKDist} vs ${directDist === Infinity ? '∞' : directDist}`;
          
          await new Promise(resolve => setTimeout(resolve, speed));
          
          if (viaKDist < directDist) {
            dist[i][j] = viaKDist;
            status.textContent = `Updated: ${nodeList[i]} → ${nodeList[j]} = ${viaKDist}`;
            updateMatrix(k, i, j);
            
            await new Promise(resolve => setTimeout(resolve, speed / 2));
          }
        }
      }
      
      graph.setNodeClass(nodeList[k], 'visited');
    }
    
    currentK.textContent = 'Intermediate Vertex: Complete';
    status.textContent = 'Floyd-Warshall completed! All-pairs shortest paths computed.';
    updateMatrix();
    
    // Check for negative cycles
    let hasNegativeCycle = false;
    for (let i = 0; i < n; i++) {
      if (dist[i][i] < 0) {
        hasNegativeCycle = true;
        break;
      }
    }
    
    if (hasNegativeCycle) {
      status.textContent = 'Warning: Negative cycle detected in graph!';
    } else {
      const it = State.ensureItem(state, topic.id, item.id);
      it.learnDone = true;
      State.save(state);
    }
    
    isRunning = false;
  }
  
  // Event listeners
  ui.querySelector('#resetBtn').onclick = () => {
    createSmallGraph();
    isRunning = false;
    status.textContent = 'Graph reset. Ready to compute all-pairs shortest paths';
    currentK.textContent = 'Intermediate Vertex: None';
    initializeMatrix();
    updateMatrix();
  };
  
  ui.querySelector('#runBtn').onclick = runFloydWarshall;
  
  // Initialize
  createSmallGraph();
  initializeMatrix();
  updateMatrix();
}
