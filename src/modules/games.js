import { State } from './state.js';

export function renderGame(main, state, topic, item){
  const type = item.game?.type;
  if(type === 'binary-search') return renderBinarySearchGame(main, state, topic, item);
  if(type === 'linear-search-visual') return renderLinearSearchVisual(main, state, topic, item);
  if(type === 'bubble-sort-visual') return renderBubbleSortVisual(main, state, topic, item);
  if(type === 'selection-sort-visual') return renderSelectionSortVisual(main, state, topic, item);
  if(type === 'insertion-sort-visual') return renderInsertionSortVisual(main, state, topic, item);
  if(type === 'merge-sort-visual') return renderMergeSortVisual(main, state, topic, item);
  if(type === 'quick-sort-visual') return renderQuickSortVisual(main, state, topic, item);
  if(type === 'heap-sort-visual') return renderHeapSortVisual(main, state, topic, item);
  if(type === 'radix-sort-visual') return renderRadixSortVisual(main, state, topic, item);
  if(type === 'tim-sort-visual') return renderTimSortVisual(main, state, topic, item);
  if(type === 'tree-sort-visual') return renderTreeSortVisual(main, state, topic, item);
  if(type === 'fibonacci-visual') return renderFibonacciVisual(main, state, topic, item);
  if(type === 'house-robber-visual') return renderHouseRobberVisual(main, state, topic, item);
  if(type === 'climbing-stairs-visual') return renderClimbingStairsVisual(main, state, topic, item);
  if(type === 'knapsack-visual') return renderKnapsackVisual(main, state, topic, item);
  if(type === 'lcs-visual') return renderLCSVisual(main, state, topic, item);
  if(type === 'edit-distance-visual') return renderEditDistanceVisual(main, state, topic, item);
  if(type === 'max-subarray-visual') return renderMaxSubarrayVisual(main, state, topic, item);
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
  // Array & Two Pointers visualizations
  if(type === 'two-sum-visual') return renderTwoSumVisual(main, state, topic, item);
  if(type === 'sliding-window-visual') return renderSlidingWindowVisual(main, state, topic, item);
  if(type === 'three-sum-visual') return renderThreeSumVisual(main, state, topic, item);
  if(type === 'two-pointers-palindrome-visual') return renderTwoPointersPalindromeVisual(main, state, topic, item);
  if(type === 'container-water-visual') return renderContainerWaterVisual(main, state, topic, item);
  // Hash Map visualizations
  if(type === 'hashmap-visual') return renderHashMapVisual(main, state, topic, item);
  if(type === 'group-anagrams-visual') return renderGroupAnagramsVisual(main, state, topic, item);
  if(type === 'top-k-frequent-visual') return renderTopKFrequentVisual(main, state, topic, item);
  // Linked List visualizations
  if(type === 'linked-list-visual') return renderLinkedListVisual(main, state, topic, item);
  if(type === 'reverse-linked-list-visual') return renderReverseLinkedListVisual(main, state, topic, item);
  if(type === 'linked-list-cycle-visual') return renderLinkedListCycleVisual(main, state, topic, item);
  // Tree visualizations
  if(type === 'binary-tree-visual') return renderBinaryTreeVisual(main, state, topic, item);
  if(type === 'tree-traversal-visual') return renderTreeTraversalVisual(main, state, topic, item);
  if(type === 'bst-operations-visual') return renderBSTOperationsVisual(main, state, topic, item);
  if(type === 'avl-tree-visual') return renderAVLTreeVisual(main, state, topic, item);
  // Graph visualizations
  if(type === 'graph-bfs-visual') return renderGraphBFSVisual(main, state, topic, item);
  if(type === 'graph-dfs-visual') return renderGraphDFSVisual(main, state, topic, item);
  if(type === 'dijkstra-visual') return renderDijkstraVisual(main, state, topic, item);
  if(type === 'kruskal-visual') return renderKruskalVisual(main, state, topic, item);
  if(type === 'topological-sort-visual') return renderTopologicalSortVisual(main, state, topic, item);
  // String Algorithm visualizations
  if(type === 'kmp-visual') return renderKMPVisual(main, state, topic, item);
  if(type === 'rabin-karp-visual') return renderRabinKarpVisual(main, state, topic, item);
  if(type === 'manacher-visual') return renderManacherVisual(main, state, topic, item);
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title}</h2><div class="muted">Game type not implemented.</div>`;
  main.appendChild(box);
}

// Array & Two Pointers Visualizations
function renderTwoSumVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how two pointers approach finds the target sum</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <label>Target:</label>
      <input id="targetInput" type="number" value="9" style="max-width:80px" />
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="playBtn" class="btn secondary">Play</button>
      <button id="resetBtn" class="btn secondary">Reset</button>
    </div>
    <div id="arrayViz" style="display:flex;gap:8px;margin:16px 0;flex-wrap:wrap"></div>
    <div id="statusText" class="muted">Click Generate Array to start</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [];
  let left = 0, right = 0;
  let target = 9;
  let isPlaying = false;

  const targetInput = ui.querySelector('#targetInput');
  const generateBtn = ui.querySelector('#generateBtn');
  const playBtn = ui.querySelector('#playBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const arrayViz = ui.querySelector('#arrayViz');
  const statusText = ui.querySelector('#statusText');

  function generateArray() {
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 10) + 1);
    array.sort((a, b) => a - b);
    target = parseInt(targetInput.value);
    left = 0;
    right = array.length - 1;
    drawArray();
    statusText.textContent = `Array generated. Target: ${target}`;
  }

  function drawArray() {
    arrayViz.innerHTML = '';
    array.forEach((val, i) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:12px 16px; border:2px solid var(--border); border-radius:8px;
        background:var(--elev); color:var(--text); font-weight:600;
        transition:all 0.3s ease; position:relative; min-width:50px; text-align:center;
      `;
      
      if (i === left) {
        cell.style.borderColor = 'var(--accent)';
        cell.style.background = 'rgba(88,166,255,0.2)';
      }
      if (i === right) {
        cell.style.borderColor = 'var(--accent-2)';
        cell.style.background = 'rgba(57,211,83,0.2)';
      }
      if (i === left && i === right) {
        cell.style.background = 'rgba(88,166,255,0.4)';
      }
      
      cell.textContent = val;
      arrayViz.appendChild(cell);
    });
  }

  async function playAnimation() {
    if (isPlaying) return;
    isPlaying = true;
    playBtn.disabled = true;
    
    left = 0;
    right = array.length - 1;
    
    while (left < right) {
      drawArray();
      const sum = array[left] + array[right];
      statusText.textContent = `Left: ${array[left]}, Right: ${array[right]}, Sum: ${sum}`;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (sum === target) {
        statusText.textContent = `Found! ${array[left]} + ${array[right]} = ${target}`;
        break;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    
    if (left >= right && array[left] + array[right] !== target) {
      statusText.textContent = `No solution found for target ${target}`;
    }
    
    isPlaying = false;
    playBtn.disabled = false;
  }

  generateBtn.onclick = generateArray;
  playBtn.onclick = playAnimation;
  resetBtn.onclick = () => {
    left = 0; right = array.length - 1;
    drawArray();
    statusText.textContent = 'Reset to start position';
  };

  generateArray();
}

function renderSlidingWindowVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch the sliding window technique find the maximum sum subarray</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <label>Window Size:</label>
      <input id="windowSize" type="number" value="3" min="2" max="6" style="max-width:80px" />
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="playBtn" class="btn secondary">Slide Window</button>
    </div>
    <div id="arrayViz" style="display:flex;gap:4px;margin:16px 0;flex-wrap:wrap"></div>
    <div id="statusText" class="muted">Window sum: 0 | Max sum: 0</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [];
  let windowSize = 3;
  let currentPos = 0;
  let maxSum = 0;
  let currentSum = 0;

  const windowSizeInput = ui.querySelector('#windowSize');
  const generateBtn = ui.querySelector('#generateBtn');
  const playBtn = ui.querySelector('#playBtn');
  const arrayViz = ui.querySelector('#arrayViz');
  const statusText = ui.querySelector('#statusText');

  function generateArray() {
    array = Array.from({length: 10}, () => Math.floor(Math.random() * 20) - 5);
    windowSize = parseInt(windowSizeInput.value);
    currentPos = 0;
    maxSum = -Infinity;
    currentSum = array.slice(0, windowSize).reduce((a, b) => a + b, 0);
    maxSum = currentSum;
    drawArray();
    statusText.textContent = `Window sum: ${currentSum} | Max sum: ${maxSum}`;
  }

  function drawArray() {
    arrayViz.innerHTML = '';
    array.forEach((val, i) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:10px 12px; border:2px solid var(--border); border-radius:6px;
        background:var(--elev); color:var(--text); font-weight:600;
        transition:all 0.3s ease; min-width:40px; text-align:center;
      `;
      
      if (i >= currentPos && i < currentPos + windowSize) {
        cell.style.borderColor = 'var(--accent)';
        cell.style.background = 'rgba(88,166,255,0.3)';
        cell.style.transform = 'translateY(-2px)';
      }
      
      cell.textContent = val;
      arrayViz.appendChild(cell);
    });
  }

  async function slideWindow() {
    currentPos = 0;
    currentSum = array.slice(0, windowSize).reduce((a, b) => a + b, 0);
    maxSum = currentSum;
    
    for (let i = 0; i <= array.length - windowSize; i++) {
      currentPos = i;
      if (i > 0) {
        currentSum = currentSum - array[i - 1] + array[i + windowSize - 1];
      }
      maxSum = Math.max(maxSum, currentSum);
      
      drawArray();
      statusText.textContent = `Window sum: ${currentSum} | Max sum: ${maxSum}`;
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  generateBtn.onclick = generateArray;
  playBtn.onclick = slideWindow;
  generateArray();
}

function renderThreeSumVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how three pointers find triplets that sum to target</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="playBtn" class="btn secondary">Find Triplets</button>
    </div>
    <div id="arrayViz" style="display:flex;gap:4px;margin:16px 0;flex-wrap:wrap"></div>
    <div id="statusText" class="muted">Click Generate Array to start</div>
    <div id="resultsText" style="margin-top:8px;font-size:12px;color:var(--muted)"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [];
  let i = 0, left = 0, right = 0;
  let foundTriplets = [];

  const generateBtn = ui.querySelector('#generateBtn');
  const playBtn = ui.querySelector('#playBtn');
  const arrayViz = ui.querySelector('#arrayViz');
  const statusText = ui.querySelector('#statusText');
  const resultsText = ui.querySelector('#resultsText');

  function generateArray() {
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 10) - 5);
    array.sort((a, b) => a - b);
    foundTriplets = [];
    drawArray();
    statusText.textContent = 'Array generated and sorted';
    resultsText.textContent = '';
  }

  function drawArray() {
    arrayViz.innerHTML = '';
    array.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:10px 12px; border:2px solid var(--border); border-radius:6px;
        background:var(--elev); color:var(--text); font-weight:600;
        transition:all 0.3s ease; min-width:40px; text-align:center;
      `;
      
      if (idx === i) {
        cell.style.borderColor = 'var(--danger)';
        cell.style.background = 'rgba(248,81,73,0.2)';
      } else if (idx === left) {
        cell.style.borderColor = 'var(--accent)';
        cell.style.background = 'rgba(88,166,255,0.2)';
      } else if (idx === right) {
        cell.style.borderColor = 'var(--accent-2)';
        cell.style.background = 'rgba(57,211,83,0.2)';
      }
      
      cell.textContent = val;
      arrayViz.appendChild(cell);
    });
  }

  async function findTriplets() {
    foundTriplets = [];
    
    for (i = 0; i < array.length - 2; i++) {
      left = i + 1;
      right = array.length - 1;
      
      while (left < right) {
        drawArray();
        const sum = array[i] + array[left] + array[right];
        statusText.textContent = `${array[i]} + ${array[left]} + ${array[right]} = ${sum}`;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (sum === 0) {
          foundTriplets.push([array[i], array[left], array[right]]);
          resultsText.textContent = `Found triplets: ${foundTriplets.map(t => `[${t.join(',')}]`).join(', ')}`;
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
    
    statusText.textContent = `Complete! Found ${foundTriplets.length} triplet(s)`;
  }

  generateBtn.onclick = generateArray;
  playBtn.onclick = findTriplets;
  generateArray();
}

function renderTwoPointersPalindromeVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch two pointers check if a string is a palindrome</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <label>Text:</label>
      <input id="textInput" type="text" value="racecar" style="max-width:200px" />
      <button id="checkBtn" class="btn">Check Palindrome</button>
    </div>
    <div id="stringViz" style="display:flex;gap:4px;margin:16px 0;justify-content:center"></div>
    <div id="statusText" class="muted">Enter text and click Check</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let text = 'racecar';
  let left = 0, right = 0;

  const textInput = ui.querySelector('#textInput');
  const checkBtn = ui.querySelector('#checkBtn');
  const stringViz = ui.querySelector('#stringViz');
  const statusText = ui.querySelector('#statusText');

  function drawString() {
    stringViz.innerHTML = '';
    text.split('').forEach((char, i) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:12px 14px; border:2px solid var(--border); border-radius:8px;
        background:var(--elev); color:var(--text); font-weight:600;
        transition:all 0.3s ease; min-width:40px; text-align:center;
      `;
      
      if (i === left) {
        cell.style.borderColor = 'var(--accent)';
        cell.style.background = 'rgba(88,166,255,0.3)';
      }
      if (i === right) {
        cell.style.borderColor = 'var(--accent-2)';
        cell.style.background = 'rgba(57,211,83,0.3)';
      }
      if (i === left && i === right) {
        cell.style.background = 'rgba(88,166,255,0.5)';
      }
      
      cell.textContent = char;
      stringViz.appendChild(cell);
    });
  }

  async function checkPalindrome() {
    text = textInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    left = 0;
    right = text.length - 1;
    
    while (left < right) {
      drawString();
      statusText.textContent = `Comparing '${text[left]}' and '${text[right]}'`;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (text[left] !== text[right]) {
        statusText.textContent = `Not a palindrome! '${text[left]}' ≠ '${text[right]}'`;
        return;
      }
      
      left++;
      right--;
    }
    
    drawString();
    statusText.textContent = 'It\'s a palindrome! ✓';
  }

  textInput.oninput = () => {
    text = textInput.value;
    left = 0;
    right = text.length - 1;
    drawString();
  };

  checkBtn.onclick = checkPalindrome;
  drawString();
}

function renderContainerWaterVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how two pointers find the container that holds the most water</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Heights</button>
      <button id="playBtn" class="btn secondary">Find Max Area</button>
    </div>
    <div id="containerViz" style="height:200px;display:flex;align-items:end;gap:4px;margin:16px 0;border-bottom:2px solid var(--border);padding:10px"></div>
    <div id="statusText" class="muted">Max area: 0 | Current area: 0</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let heights = [];
  let left = 0, right = 0;
  let maxArea = 0;

  const generateBtn = ui.querySelector('#generateBtn');
  const playBtn = ui.querySelector('#playBtn');
  const containerViz = ui.querySelector('#containerViz');
  const statusText = ui.querySelector('#statusText');

  function generateHeights() {
    heights = Array.from({length: 8}, () => Math.floor(Math.random() * 8) + 1);
    left = 0;
    right = heights.length - 1;
    maxArea = 0;
    drawContainer();
  }

  function drawContainer() {
    containerViz.innerHTML = '';
    const maxHeight = Math.max(...heights);
    
    heights.forEach((height, i) => {
      const bar = document.createElement('div');
      const barHeight = (height / maxHeight) * 160;
      bar.style.cssText = `
        width:30px; height:${barHeight}px; 
        background:var(--elev); border:2px solid var(--border);
        border-radius:4px 4px 0 0; transition:all 0.3s ease;
        position:relative; display:flex; align-items:end; justify-content:center;
        color:var(--text); font-size:12px; font-weight:600;
      `;
      
      if (i === left || i === right) {
        bar.style.borderColor = 'var(--accent)';
        bar.style.background = 'rgba(88,166,255,0.3)';
      }
      
      bar.textContent = height;
      containerViz.appendChild(bar);
    });
    
    if (left !== right) {
      const currentArea = Math.min(heights[left], heights[right]) * (right - left);
      statusText.textContent = `Area: ${Math.min(heights[left], heights[right])} × ${right - left} = ${currentArea} | Max: ${maxArea}`;
    }
  }

  async function findMaxArea() {
    left = 0;
    right = heights.length - 1;
    maxArea = 0;
    
    while (left < right) {
      drawContainer();
      const currentArea = Math.min(heights[left], heights[right]) * (right - left);
      maxArea = Math.max(maxArea, currentArea);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }
    
    statusText.textContent = `Complete! Maximum area: ${maxArea}`;
  }

  generateBtn.onclick = generateHeights;
  playBtn.onclick = findMaxArea;
  generateHeights();
}

// Hash Map & Set Visualizations
function renderHashMapVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how hash map operations work with collision handling</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <input id="keyInput" type="text" placeholder="Key" style="max-width:100px" />
      <input id="valueInput" type="text" placeholder="Value" style="max-width:100px" />
      <button id="insertBtn" class="btn">Insert</button>
      <button id="searchBtn" class="btn secondary">Search</button>
      <button id="deleteBtn" class="btn secondary">Delete</button>
      <button id="clearBtn" class="btn secondary">Clear</button>
    </div>
    <div id="hashTableViz" style="margin:16px 0"></div>
    <div id="statusText" class="muted">Hash table with 8 buckets (chaining for collisions)</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const buckets = Array(8).fill(null).map(() => []);
  let operations = [];

  const keyInput = ui.querySelector('#keyInput');
  const valueInput = ui.querySelector('#valueInput');
  const insertBtn = ui.querySelector('#insertBtn');
  const searchBtn = ui.querySelector('#searchBtn');
  const deleteBtn = ui.querySelector('#deleteBtn');
  const clearBtn = ui.querySelector('#clearBtn');
  const hashTableViz = ui.querySelector('#hashTableViz');
  const statusText = ui.querySelector('#statusText');

  function hashFunction(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % buckets.length;
    }
    return Math.abs(hash);
  }

  function drawHashTable() {
    hashTableViz.innerHTML = '';
    buckets.forEach((bucket, index) => {
      const bucketDiv = document.createElement('div');
      bucketDiv.style.cssText = `
        display:flex; align-items:center; margin:4px 0; padding:8px;
        border:2px solid var(--border); border-radius:8px; background:var(--elev);
      `;
      
      const indexLabel = document.createElement('div');
      indexLabel.style.cssText = `
        min-width:30px; padding:4px 8px; background:var(--panel); 
        border-radius:4px; font-weight:600; margin-right:8px;
      `;
      indexLabel.textContent = index;
      bucketDiv.appendChild(indexLabel);

      if (bucket.length === 0) {
        const emptyLabel = document.createElement('div');
        emptyLabel.style.cssText = `color:var(--muted); font-style:italic;`;
        emptyLabel.textContent = 'empty';
        bucketDiv.appendChild(emptyLabel);
      } else {
        bucket.forEach((item, i) => {
          const itemDiv = document.createElement('div');
          itemDiv.style.cssText = `
            padding:4px 8px; margin:0 2px; background:var(--accent);
            color:white; border-radius:4px; font-size:12px; font-weight:600;
          `;
          itemDiv.textContent = `${item.key}:${item.value}`;
          bucketDiv.appendChild(itemDiv);
          
          if (i < bucket.length - 1) {
            const arrow = document.createElement('div');
            arrow.style.cssText = `margin:0 4px; color:var(--muted);`;
            arrow.textContent = '→';
            bucketDiv.appendChild(arrow);
          }
        });
      }
      
      hashTableViz.appendChild(bucketDiv);
    });
  }

  async function insert(key, value) {
    const hash = hashFunction(key);
    statusText.textContent = `Inserting ${key}:${value} → hash(${key}) = ${hash}`;
    
    // Highlight bucket
    const bucketDivs = hashTableViz.children;
    bucketDivs[hash].style.borderColor = 'var(--accent)';
    bucketDivs[hash].style.background = 'rgba(88,166,255,0.1)';
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if key already exists
    const bucket = buckets[hash];
    const existingIndex = bucket.findIndex(item => item.key === key);
    
    if (existingIndex >= 0) {
      bucket[existingIndex].value = value;
      statusText.textContent = `Updated existing key ${key} with new value ${value}`;
    } else {
      bucket.push({key, value});
      statusText.textContent = `Inserted ${key}:${value} in bucket ${hash}`;
    }
    
    drawHashTable();
  }

  async function search(key) {
    const hash = hashFunction(key);
    statusText.textContent = `Searching for ${key} → hash(${key}) = ${hash}`;
    
    const bucketDivs = hashTableViz.children;
    bucketDivs[hash].style.borderColor = 'var(--accent-2)';
    bucketDivs[hash].style.background = 'rgba(57,211,83,0.1)';
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const bucket = buckets[hash];
    const found = bucket.find(item => item.key === key);
    
    if (found) {
      statusText.textContent = `Found ${key}:${found.value} in bucket ${hash}`;
    } else {
      statusText.textContent = `Key ${key} not found in bucket ${hash}`;
    }
    
    setTimeout(() => drawHashTable(), 1000);
  }

  insertBtn.onclick = () => {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    if (key && value) {
      insert(key, value);
      keyInput.value = '';
      valueInput.value = '';
    }
  };

  searchBtn.onclick = () => {
    const key = keyInput.value.trim();
    if (key) search(key);
  };

  deleteBtn.onclick = () => {
    const key = keyInput.value.trim();
    if (key) {
      const hash = hashFunction(key);
      const bucket = buckets[hash];
      const index = bucket.findIndex(item => item.key === key);
      if (index >= 0) {
        bucket.splice(index, 1);
        statusText.textContent = `Deleted key ${key} from bucket ${hash}`;
        drawHashTable();
      } else {
        statusText.textContent = `Key ${key} not found`;
      }
    }
  };

  clearBtn.onclick = () => {
    buckets.forEach(bucket => bucket.length = 0);
    statusText.textContent = 'Hash table cleared';
    drawHashTable();
  };

  drawHashTable();
}

function renderGroupAnagramsVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how words are grouped by their sorted character signature</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <input id="wordInput" type="text" placeholder="Add word" style="max-width:150px" />
      <button id="addBtn" class="btn">Add Word</button>
      <button id="groupBtn" class="btn secondary">Group Anagrams</button>
      <button id="clearBtn" class="btn secondary">Clear</button>
    </div>
    <div id="wordsViz" style="margin:16px 0"></div>
    <div id="groupsViz" style="margin:16px 0"></div>
    <div id="statusText" class="muted">Add words to see anagram grouping</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let words = [];
  let groups = new Map();

  const wordInput = ui.querySelector('#wordInput');
  const addBtn = ui.querySelector('#addBtn');
  const groupBtn = ui.querySelector('#groupBtn');
  const clearBtn = ui.querySelector('#clearBtn');
  const wordsViz = ui.querySelector('#wordsViz');
  const groupsViz = ui.querySelector('#groupsViz');
  const statusText = ui.querySelector('#statusText');

  function getSignature(word) {
    return word.toLowerCase().split('').sort().join('');
  }

  function drawWords() {
    wordsViz.innerHTML = '<h4>Words:</h4>';
    const wordContainer = document.createElement('div');
    wordContainer.style.cssText = 'display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;';
    
    words.forEach((word, i) => {
      const wordDiv = document.createElement('div');
      wordDiv.style.cssText = `
        padding:8px 12px; border:2px solid var(--border); border-radius:8px;
        background:var(--elev); font-weight:600; transition:all 0.3s ease;
      `;
      wordDiv.textContent = word;
      wordContainer.appendChild(wordDiv);
    });
    
    wordsViz.appendChild(wordContainer);
  }

  function drawGroups() {
    groupsViz.innerHTML = '<h4>Anagram Groups:</h4>';
    
    const colors = ['var(--accent)', 'var(--accent-2)', 'var(--warn)', 'var(--danger)', '#9333ea', '#dc2626'];
    let colorIndex = 0;
    
    groups.forEach((group, signature) => {
      const groupDiv = document.createElement('div');
      groupDiv.style.cssText = `
        margin:8px 0; padding:12px; border-radius:8px;
        background:rgba(88,166,255,0.1); border:1px solid var(--border);
      `;
      
      const signatureDiv = document.createElement('div');
      signatureDiv.style.cssText = `
        font-size:12px; color:var(--muted); margin-bottom:8px; font-family:monospace;
      `;
      signatureDiv.textContent = `Signature: "${signature}"`;
      groupDiv.appendChild(signatureDiv);
      
      const wordsDiv = document.createElement('div');
      wordsDiv.style.cssText = 'display:flex; gap:8px; flex-wrap:wrap;';
      
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      
      group.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.style.cssText = `
          padding:6px 12px; border-radius:6px; font-weight:600;
          background:${color}; color:white;
        `;
        wordDiv.textContent = word;
        wordsDiv.appendChild(wordDiv);
      });
      
      groupDiv.appendChild(wordsDiv);
      groupsViz.appendChild(groupDiv);
    });
  }

  async function groupAnagrams() {
    groups.clear();
    statusText.textContent = 'Grouping anagrams by signature...';
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const signature = getSignature(word);
      
      statusText.textContent = `Processing "${word}" → signature "${signature}"`;
      
      if (!groups.has(signature)) {
        groups.set(signature, []);
      }
      groups.get(signature).push(word);
      
      drawGroups();
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    statusText.textContent = `Found ${groups.size} anagram group(s)`;
  }

  addBtn.onclick = () => {
    const word = wordInput.value.trim();
    if (word) {
      words.push(word);
      wordInput.value = '';
      drawWords();
      statusText.textContent = `Added "${word}" to word list`;
    }
  };

  wordInput.onkeypress = (e) => {
    if (e.key === 'Enter') addBtn.click();
  };

  groupBtn.onclick = () => {
    if (words.length > 0) groupAnagrams();
  };

  clearBtn.onclick = () => {
    words = [];
    groups.clear();
    drawWords();
    groupsViz.innerHTML = '';
    statusText.textContent = 'Cleared all words and groups';
  };

  // Add some sample words
  words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
  drawWords();
  statusText.textContent = 'Sample words loaded. Click "Group Anagrams" to see them grouped';
}

function renderTopKFrequentVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how we find the top K most frequent elements using a hash map and heap</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <label>K:</label>
      <input id="kInput" type="number" value="2" min="1" max="10" style="max-width:60px" />
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="findBtn" class="btn secondary">Find Top K</button>
    </div>
    <div id="arrayViz" style="margin:16px 0"></div>
    <div id="freqMapViz" style="margin:16px 0"></div>
    <div id="resultViz" style="margin:16px 0"></div>
    <div id="statusText" class="muted">Click Generate Array to start</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [];
  let k = 2;
  let freqMap = new Map();

  const kInput = ui.querySelector('#kInput');
  const generateBtn = ui.querySelector('#generateBtn');
  const findBtn = ui.querySelector('#findBtn');
  const arrayViz = ui.querySelector('#arrayViz');
  const freqMapViz = ui.querySelector('#freqMapViz');
  const resultViz = ui.querySelector('#resultViz');
  const statusText = ui.querySelector('#statusText');

  function generateArray() {
    const elements = [1, 2, 3, 4, 5];
    array = [];
    // Generate array with varying frequencies
    for (let i = 0; i < 12; i++) {
      const element = elements[Math.floor(Math.random() * elements.length)];
      array.push(element);
    }
    k = parseInt(kInput.value);
    freqMap.clear();
    drawArray();
    freqMapViz.innerHTML = '';
    resultViz.innerHTML = '';
    statusText.textContent = `Generated array of ${array.length} elements`;
  }

  function drawArray() {
    arrayViz.innerHTML = '<h4>Array:</h4>';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex; gap:4px; flex-wrap:wrap; margin-top:8px;';
    
    array.forEach((val, i) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:8px 12px; border:2px solid var(--border); border-radius:6px;
        background:var(--elev); font-weight:600; min-width:30px; text-align:center;
      `;
      cell.textContent = val;
      container.appendChild(cell);
    });
    
    arrayViz.appendChild(container);
  }

  function drawFrequencyMap() {
    freqMapViz.innerHTML = '<h4>Frequency Map:</h4>';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;';
    
    Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
      .forEach(([element, freq]) => {
        const freqDiv = document.createElement('div');
        freqDiv.style.cssText = `
          padding:8px 12px; border:2px solid var(--border); border-radius:8px;
          background:var(--elev); text-align:center; min-width:60px;
        `;
        freqDiv.innerHTML = `<div style="font-weight:600;">${element}</div><div style="font-size:12px;color:var(--muted);">×${freq}</div>`;
        container.appendChild(freqDiv);
      });
    
    freqMapViz.appendChild(container);
  }

  function drawResult(topK) {
    resultViz.innerHTML = `<h4>Top ${k} Most Frequent:</h4>`;
    const container = document.createElement('div');
    container.style.cssText = 'display:flex; gap:8px; margin-top:8px;';
    
    topK.forEach((element, i) => {
      const resultDiv = document.createElement('div');
      resultDiv.style.cssText = `
        padding:12px 16px; border-radius:8px; font-weight:700;
        background:var(--accent); color:white; text-align:center;
        animation: slideIn 0.5s ease ${i * 0.2}s both;
      `;
      resultDiv.innerHTML = `<div>${element}</div><div style="font-size:12px;">×${freqMap.get(element)}</div>`;
      container.appendChild(resultDiv);
    });
    
    resultViz.appendChild(container);
  }

  async function findTopK() {
    // Step 1: Build frequency map
    statusText.textContent = 'Step 1: Building frequency map...';
    freqMap.clear();
    
    for (let i = 0; i < array.length; i++) {
      const val = array[i];
      freqMap.set(val, (freqMap.get(val) || 0) + 1);
      
      // Highlight current element
      const arrayContainer = arrayViz.children[1];
      if (arrayContainer) {
        Array.from(arrayContainer.children).forEach((cell, idx) => {
          cell.style.background = idx === i ? 'rgba(88,166,255,0.3)' : 'var(--elev)';
        });
      }
      
      drawFrequencyMap();
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Reset array highlighting
    drawArray();
    
    // Step 2: Find top K
    statusText.textContent = 'Step 2: Finding top K most frequent...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const topK = Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map(([element]) => element);
    
    drawResult(topK);
    statusText.textContent = `Found top ${k} most frequent elements: [${topK.join(', ')}]`;
  }

  generateBtn.onclick = generateArray;
  findBtn.onclick = () => {
    if (array.length > 0) findTopK();
  };

  generateArray();
}

// Linked List Visualizations
function renderLinkedListVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Visualize linked list operations and pointer manipulation</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <input id="valueInput" type="number" placeholder="Value" style="max-width:80px" />
      <input id="positionInput" type="number" placeholder="Position" style="max-width:80px" />
      <button id="insertBtn" class="btn">Insert</button>
      <button id="deleteBtn" class="btn secondary">Delete</button>
      <button id="searchBtn" class="btn secondary">Search</button>
      <button id="clearBtn" class="btn secondary">Clear</button>
    </div>
    <div id="listViz" style="margin:20px 0; min-height:100px; display:flex; align-items:center; gap:8px; overflow-x:auto; padding:10px;"></div>
    <div id="statusText" class="muted">Linked list operations visualization</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  class ListNode {
    constructor(val, next = null) {
      this.val = val;
      this.next = next;
    }
  }

  let head = null;
  let highlightedNode = null;

  const valueInput = ui.querySelector('#valueInput');
  const positionInput = ui.querySelector('#positionInput');
  const insertBtn = ui.querySelector('#insertBtn');
  const deleteBtn = ui.querySelector('#deleteBtn');
  const searchBtn = ui.querySelector('#searchBtn');
  const clearBtn = ui.querySelector('#clearBtn');
  const listViz = ui.querySelector('#listViz');
  const statusText = ui.querySelector('#statusText');

  function drawList() {
    listViz.innerHTML = '';
    
    if (!head) {
      const nullDiv = document.createElement('div');
      nullDiv.style.cssText = `
        padding:20px; color:var(--muted); font-style:italic;
        border:2px dashed var(--border); border-radius:8px;
      `;
      nullDiv.textContent = 'Empty List (head → null)';
      listViz.appendChild(nullDiv);
      return;
    }

    let current = head;
    let index = 0;
    
    while (current) {
      const nodeDiv = document.createElement('div');
      nodeDiv.style.cssText = `
        display:flex; align-items:center; animation: slideIn 0.3s ease;
      `;
      
      const valueBox = document.createElement('div');
      valueBox.style.cssText = `
        padding:12px 16px; border:3px solid var(--border); border-radius:8px;
        background:var(--elev); font-weight:700; font-size:16px; min-width:60px; text-align:center;
        ${current === highlightedNode ? 'border-color:var(--accent); background:rgba(88,166,255,0.2);' : ''}
      `;
      valueBox.textContent = current.val;
      
      const indexLabel = document.createElement('div');
      indexLabel.style.cssText = `
        position:absolute; top:-20px; left:50%; transform:translateX(-50%);
        font-size:11px; color:var(--muted); background:var(--panel);
        padding:2px 6px; border-radius:4px;
      `;
      indexLabel.textContent = index;
      valueBox.style.position = 'relative';
      valueBox.appendChild(indexLabel);
      
      nodeDiv.appendChild(valueBox);
      
      if (current.next) {
        const arrow = document.createElement('div');
        arrow.style.cssText = `
          margin:0 8px; color:var(--accent); font-size:18px; font-weight:700;
        `;
        arrow.textContent = '→';
        nodeDiv.appendChild(arrow);
      } else {
        const nullLabel = document.createElement('div');
        nullLabel.style.cssText = `
          margin-left:8px; padding:6px 10px; color:var(--muted); 
          border:1px dashed var(--border); border-radius:4px; font-size:12px;
        `;
        nullLabel.textContent = 'null';
        nodeDiv.appendChild(nullLabel);
      }
      
      listViz.appendChild(nodeDiv);
      current = current.next;
      index++;
    }
  }

  function getLength() {
    let count = 0;
    let current = head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  async function insertAt(value, position) {
    const length = getLength();
    
    if (position < 0 || position > length) {
      statusText.textContent = `Invalid position ${position}. Valid range: 0-${length}`;
      return;
    }

    const newNode = new ListNode(value);
    
    if (position === 0) {
      newNode.next = head;
      head = newNode;
      statusText.textContent = `Inserted ${value} at head (position 0)`;
    } else {
      let current = head;
      for (let i = 0; i < position - 1; i++) {
        highlightedNode = current;
        drawList();
        statusText.textContent = `Traversing to position ${position - 1}... (currently at ${i})`;
        await new Promise(resolve => setTimeout(resolve, 600));
        current = current.next;
      }
      
      highlightedNode = current;
      drawList();
      statusText.textContent = `Found position ${position - 1}. Inserting ${value} after this node.`;
      await new Promise(resolve => setTimeout(resolve, 800));
      
      newNode.next = current.next;
      current.next = newNode;
      statusText.textContent = `Inserted ${value} at position ${position}`;
    }
    
    highlightedNode = null;
    drawList();
  }

  async function deleteAt(position) {
    const length = getLength();
    
    if (position < 0 || position >= length) {
      statusText.textContent = `Invalid position ${position}. Valid range: 0-${length - 1}`;
      return;
    }

    if (position === 0) {
      const deletedValue = head.val;
      head = head.next;
      statusText.textContent = `Deleted ${deletedValue} from head (position 0)`;
    } else {
      let current = head;
      for (let i = 0; i < position - 1; i++) {
        highlightedNode = current;
        drawList();
        statusText.textContent = `Traversing to position ${position - 1}... (currently at ${i})`;
        await new Promise(resolve => setTimeout(resolve, 600));
        current = current.next;
      }
      
      highlightedNode = current.next;
      drawList();
      statusText.textContent = `Found node to delete at position ${position}. Removing...`;
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const deletedValue = current.next.val;
      current.next = current.next.next;
      statusText.textContent = `Deleted ${deletedValue} from position ${position}`;
    }
    
    highlightedNode = null;
    drawList();
  }

  async function search(value) {
    let current = head;
    let position = 0;
    
    statusText.textContent = `Searching for ${value}...`;
    
    while (current) {
      highlightedNode = current;
      drawList();
      statusText.textContent = `Checking position ${position}: ${current.val} ${current.val === value ? '= ' : '≠ '}${value}`;
      
      if (current.val === value) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        statusText.textContent = `Found ${value} at position ${position}!`;
        setTimeout(() => {
          highlightedNode = null;
          drawList();
        }, 2000);
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      current = current.next;
      position++;
    }
    
    highlightedNode = null;
    drawList();
    statusText.textContent = `Value ${value} not found in the list`;
  }

  insertBtn.onclick = () => {
    const value = parseInt(valueInput.value);
    const position = parseInt(positionInput.value) || 0;
    if (!isNaN(value)) {
      insertAt(value, position);
      valueInput.value = '';
      positionInput.value = '';
    }
  };

  deleteBtn.onclick = () => {
    const position = parseInt(positionInput.value) || 0;
    deleteAt(position);
    positionInput.value = '';
  };

  searchBtn.onclick = () => {
    const value = parseInt(valueInput.value);
    if (!isNaN(value)) search(value);
  };

  clearBtn.onclick = () => {
    head = null;
    highlightedNode = null;
    drawList();
    statusText.textContent = 'List cleared';
  };

  // Initialize with sample data
  head = new ListNode(1, new ListNode(2, new ListNode(3)));
  drawList();
}

function renderReverseLinkedListVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch how pointers are manipulated to reverse a linked list</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate List</button>
      <button id="reverseBtn" class="btn secondary">Reverse List</button>
      <button id="resetBtn" class="btn secondary">Reset</button>
    </div>
    <div id="listViz" style="margin:20px 0; min-height:120px; display:flex; flex-direction:column; gap:16px;"></div>
    <div id="statusText" class="muted">Click Generate List to start</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  class ListNode {
    constructor(val, next = null) {
      this.val = val;
      this.next = next;
    }
  }

  let originalHead = null;
  let prev = null, current = null, next = null;
  let step = 0;

  const generateBtn = ui.querySelector('#generateBtn');
  const reverseBtn = ui.querySelector('#reverseBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const listViz = ui.querySelector('#listViz');
  const statusText = ui.querySelector('#statusText');

  function generateList() {
    const values = [1, 2, 3, 4, 5];
    originalHead = new ListNode(values[0]);
    let current = originalHead;
    for (let i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
    }
    
    prev = null;
    current = originalHead;
    next = null;
    step = 0;
    
    drawVisualization();
    statusText.textContent = 'List generated. Click "Reverse List" to see step-by-step reversal';
  }

  function drawVisualization() {
    listViz.innerHTML = '';
    
    // Draw original list
    const originalDiv = document.createElement('div');
    originalDiv.innerHTML = '<h4 style="margin:0 0 8px 0; color:var(--muted)">Original List:</h4>';
    originalDiv.appendChild(drawListNodes(originalHead, null, null, null));
    listViz.appendChild(originalDiv);
    
    // Draw current state during reversal
    if (step > 0) {
      const currentDiv = document.createElement('div');
      currentDiv.innerHTML = '<h4 style="margin:16px 0 8px 0; color:var(--accent)">Reversal Process:</h4>';
      currentDiv.appendChild(drawListNodes(prev, current, next, 'reversal'));
      listViz.appendChild(currentDiv);
      
      // Draw pointers explanation
      const pointersDiv = document.createElement('div');
      pointersDiv.style.cssText = `
        display:flex; gap:16px; margin-top:12px; font-size:12px;
        padding:8px; background:rgba(88,166,255,0.05); border-radius:6px;
      `;
      pointersDiv.innerHTML = `
        <span style="color:var(--accent)">🔵 current</span>
        <span style="color:var(--accent-2)">🟢 prev</span>
        <span style="color:var(--warn)">🟡 next</span>
      `;
      listViz.appendChild(pointersDiv);
    }
  }

  function drawListNodes(head, currentPtr, nextPtr, mode) {
    const container = document.createElement('div');
    container.style.cssText = 'display:flex; align-items:center; gap:8px; flex-wrap:wrap;';
    
    if (!head && mode === 'reversal' && step > 0) {
      // Show the reversed portion
      let reversedNodes = [];
      let temp = prev;
      while (temp) {
        reversedNodes.unshift(temp);
        temp = temp.next;
      }
      
      reversedNodes.forEach((node, i) => {
        const nodeDiv = createNodeElement(node.val, null);
        if (node === prev) nodeDiv.style.borderColor = 'var(--accent-2)';
        container.appendChild(nodeDiv);
        
        if (i < reversedNodes.length - 1) {
          const arrow = document.createElement('div');
          arrow.style.cssText = 'margin:0 4px; color:var(--accent); font-size:18px; font-weight:700;';
          arrow.textContent = '→';
          container.appendChild(arrow);
        }
      });
      
      if (current) {
        if (prev) {
          const arrow = document.createElement('div');
          arrow.style.cssText = 'margin:0 4px; color:var(--accent); font-size:18px; font-weight:700;';
          arrow.textContent = '→';
          container.appendChild(arrow);
        }
        
        const nodeDiv = createNodeElement(current.val, 'current');
        container.appendChild(nodeDiv);
        
        if (current.next) {
          const arrow = document.createElement('div');
          arrow.style.cssText = 'margin:0 4px; color:var(--muted); font-size:18px; font-weight:700;';
          arrow.textContent = '→';
          container.appendChild(arrow);
          
          const remainingDiv = document.createElement('div');
          remainingDiv.style.cssText = 'color:var(--muted); padding:8px; border:1px dashed var(--border); border-radius:4px;';
          remainingDiv.textContent = '... rest of list';
          container.appendChild(remainingDiv);
        }
      }
      
      return container;
    }

    let temp = head;
    while (temp) {
      let highlight = null;
      if (temp === currentPtr) highlight = 'current';
      else if (temp === prev) highlight = 'prev';
      else if (temp === nextPtr) highlight = 'next';
      
      const nodeDiv = createNodeElement(temp.val, highlight);
      container.appendChild(nodeDiv);
      
      if (temp.next) {
        const arrow = document.createElement('div');
        arrow.style.cssText = 'margin:0 4px; color:var(--accent); font-size:18px; font-weight:700;';
        arrow.textContent = '→';
        container.appendChild(arrow);
      }
      
      temp = temp.next;
    }
    
    if (!head) {
      const nullDiv = document.createElement('div');
      nullDiv.style.cssText = 'padding:8px; color:var(--muted); font-style:italic;';
      nullDiv.textContent = 'null';
      container.appendChild(nullDiv);
    }
    
    return container;
  }

  function createNodeElement(value, highlight) {
    const nodeDiv = document.createElement('div');
    let borderColor = 'var(--border)';
    let backgroundColor = 'var(--elev)';
    
    if (highlight === 'current') {
      borderColor = 'var(--accent)';
      backgroundColor = 'rgba(88,166,255,0.2)';
    } else if (highlight === 'prev') {
      borderColor = 'var(--accent-2)';
      backgroundColor = 'rgba(57,211,83,0.2)';
    } else if (highlight === 'next') {
      borderColor = 'var(--warn)';
      backgroundColor = 'rgba(217,153,34,0.2)';
    }
    
    nodeDiv.style.cssText = `
      padding:12px 16px; border:3px solid ${borderColor}; border-radius:8px;
      background:${backgroundColor}; font-weight:700; font-size:16px;
      min-width:50px; text-align:center; transition:all 0.3s ease;
    `;
    nodeDiv.textContent = value;
    return nodeDiv;
  }

  async function reverseList() {
    prev = null;
    current = originalHead;
    step = 1;
    
    statusText.textContent = 'Starting reversal: prev=null, current=head';
    drawVisualization();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    while (current) {
      // Store next
      next = current.next;
      step++;
      statusText.textContent = `Step ${step-1}: Store next pointer`;
      drawVisualization();
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Reverse the link
      current.next = prev;
      statusText.textContent = `Step ${step-1}: Reverse current.next to point to prev`;
      drawVisualization();
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Move pointers
      prev = current;
      current = next;
      statusText.textContent = `Step ${step-1}: Move prev and current forward`;
      drawVisualization();
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    // Update head
    originalHead = prev;
    statusText.textContent = 'Reversal complete! New head points to the last node.';
  }

  generateBtn.onclick = generateList;
  reverseBtn.onclick = reverseList;
  resetBtn.onclick = () => {
    generateList();
  };

  generateList();
}

function renderLinkedListCycleVisual(main, state, topic, item) {
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch Floyd's cycle detection algorithm (tortoise and hare) in action</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="noCycleBtn" class="btn">Generate List (No Cycle)</button>
      <button id="cycleBtn" class="btn">Generate List (With Cycle)</button>
      <button id="detectBtn" class="btn secondary">Detect Cycle</button>
    </div>
    <div id="listViz" style="margin:20px 0; min-height:150px;"></div>
    <div id="statusText" class="muted">Generate a list to start cycle detection</div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  class ListNode {
    constructor(val, next = null) {
      this.val = val;
      this.next = next;
    }
  }

  let head = null;
  let slow = null, fast = null;
  let hasCycle = false;

  const noCycleBtn = ui.querySelector('#noCycleBtn');
  const cycleBtn = ui.querySelector('#cycleBtn');
  const detectBtn = ui.querySelector('#detectBtn');
  const listViz = ui.querySelector('#listViz');
  const statusText = ui.querySelector('#statusText');

  function generateNoCycle() {
    const values = [1, 2, 3, 4, 5, 6];
    head = new ListNode(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
    }
    hasCycle = false;
    slow = fast = null;
    drawList();
    statusText.textContent = 'Generated list without cycle (linear list ending in null)';
  }

  function generateWithCycle() {
    const values = [1, 2, 3, 4, 5, 6];
    head = new ListNode(values[0]);
    let current = head;
    let cycleStart = null;
    
    for (let i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
      if (i === 2) cycleStart = current; // Cycle starts at node with value 3
    }
    
    // Create cycle: last node points back to node 3
    current.next = cycleStart;
    hasCycle = true;
    slow = fast = null;
    drawList();
    statusText.textContent = 'Generated list with cycle (last node points back to node with value 3)';
  }

  function drawList() {
    listViz.innerHTML = '';
    
    if (!head) return;

    const container = document.createElement('div');
    container.style.cssText = 'position:relative; display:flex; align-items:center; gap:12px; flex-wrap:wrap;';
    
    const visited = new Set();
    let current = head;
    let position = 0;
    const nodeElements = [];
    
    // Draw nodes in a line
    while (current && position < 10) { // Limit to prevent infinite loop
      const nodeId = `${current.val}-${position}`;
      
      if (visited.has(current)) {
        // We've hit a cycle - show the cycle arrow
        const cycleArrow = document.createElement('div');
        cycleArrow.style.cssText = `
          position:absolute; top:60px; left:${position * 80}px;
          width:${(visited.size - position) * 80}px; height:30px;
          border:3px solid var(--warn); border-top:none; border-radius:0 0 15px 15px;
        `;
        
        const arrowHead = document.createElement('div');
        arrowHead.style.cssText = `
          position:absolute; right:-8px; top:-8px;
          width:0; height:0; border-left:8px solid var(--warn);
          border-top:8px solid transparent; border-bottom:8px solid transparent;
        `;
        cycleArrow.appendChild(arrowHead);
        
        const cycleLabel = document.createElement('div');
        cycleLabel.style.cssText = `
          position:absolute; bottom:-25px; left:50%; transform:translateX(-50%);
          font-size:11px; color:var(--warn); font-weight:600;
        `;
        cycleLabel.textContent = 'CYCLE';
        cycleArrow.appendChild(cycleLabel);
        
        container.appendChild(cycleArrow);
        break;
      }
      
      visited.add(current);
      
      const nodeDiv = document.createElement('div');
      let borderColor = 'var(--border)';
      let backgroundColor = 'var(--elev)';
      
      if (current === slow && current === fast) {
        borderColor = 'var(--danger)';
        backgroundColor = 'rgba(248,81,73,0.3)';
      } else if (current === slow) {
        borderColor = 'var(--accent)';
        backgroundColor = 'rgba(88,166,255,0.2)';
      } else if (current === fast) {
        borderColor = 'var(--accent-2)';
        backgroundColor = 'rgba(57,211,83,0.2)';
      }
      
      nodeDiv.style.cssText = `
        padding:12px 16px; border:3px solid ${borderColor}; border-radius:8px;
        background:${backgroundColor}; font-weight:700; font-size:16px;
        min-width:50px; text-align:center; position:relative; transition:all 0.3s ease;
      `;
      nodeDiv.textContent = current.val;
      
      // Add position label
      const posLabel = document.createElement('div');
      posLabel.style.cssText = `
        position:absolute; bottom:-20px; left:50%; transform:translateX(-50%);
        font-size:10px; color:var(--muted);
      `;
      posLabel.textContent = position;
      nodeDiv.appendChild(posLabel);
      
      container.appendChild(nodeDiv);
      nodeElements.push(nodeDiv);
      
      if (current.next && !visited.has(current.next)) {
        const arrow = document.createElement('div');
        arrow.style.cssText = 'color:var(--accent); font-size:18px; font-weight:700;';
        arrow.textContent = '→';
        container.appendChild(arrow);
      }
      
      current = current.next;
      position++;
    }
    
    if (!hasCycle && position < 10) {
      const nullDiv = document.createElement('div');
      nullDiv.style.cssText = `
        padding:8px 12px; color:var(--muted); font-style:italic;
        border:2px dashed var(--border); border-radius:6px;
      `;
      nullDiv.textContent = 'null';
      container.appendChild(nullDiv);
    }
    
    listViz.appendChild(container);
    
    // Add legend
    const legend = document.createElement('div');
    legend.style.cssText = `
      display:flex; gap:16px; margin-top:20px; font-size:12px;
      padding:8px; background:rgba(88,166,255,0.05); border-radius:6px;
    `;
    legend.innerHTML = `
      <span style="color:var(--accent)">🔵 Slow pointer (tortoise)</span>
      <span style="color:var(--accent-2)">🟢 Fast pointer (hare)</span>
      <span style="color:var(--danger)">🔴 Meeting point</span>
    `;
    listViz.appendChild(legend);
  }

  async function detectCycle() {
    if (!head) return;
    
    slow = fast = head;
    let step = 0;
    
    statusText.textContent = 'Starting Floyd\'s algorithm: slow and fast both start at head';
    drawList();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    while (fast && fast.next) {
      step++;
      
      // Move slow one step
      slow = slow.next;
      statusText.textContent = `Step ${step}: Move slow pointer 1 step → ${slow.val}`;
      drawList();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Move fast two steps
      fast = fast.next.next;
      statusText.textContent = `Step ${step}: Move fast pointer 2 steps → ${fast ? fast.val : 'null'}`;
      drawList();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if they meet
      if (slow === fast) {
        statusText.textContent = `Cycle detected! Slow and fast pointers meet at node ${slow.val}`;
        return;
      }
      
      statusText.textContent = `Step ${step}: Slow at ${slow.val}, Fast at ${fast ? fast.val : 'null'} - continue...`;
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (step > 10) break; // Prevent infinite loop in case of error
    }
    
    slow = fast = null;
    drawList();
    statusText.textContent = 'No cycle detected - fast pointer reached the end of the list';
  }

  noCycleBtn.onclick = generateNoCycle;
  cycleBtn.onclick = generateWithCycle;
  detectBtn.onclick = detectCycle;

  generateNoCycle();
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

// Linear Search Visualization
function renderLinearSearchVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch linear search scan through the array element by element.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <input id="targetInput" type="number" placeholder="Target value" style="max-width:120px" />
      <button id="searchBtn" class="btn">Search</button>
      <button id="resetBtn" class="ghost">Reset</button>
      <span class="spacer"></span>
      <span id="status" class="pill">Ready</span>
    </div>
    <div id="arrayViz" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [3, 7, 1, 9, 4, 6, 8, 2, 5];
  let currentIndex = -1;
  let isSearching = false;
  let target = null;
  
  const arrayViz = ui.querySelector('#arrayViz');
  const status = ui.querySelector('#status');
  
  function renderArray() {
    arrayViz.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap';
    
    array.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.style.cssText = 'width:50px;height:50px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;border-radius:8px;font-weight:bold';
      
      if (idx === currentIndex) {
        cell.style.background = 'var(--accent)';
        cell.style.color = 'var(--bg)';
      } else if (idx < currentIndex) {
        cell.style.opacity = '0.5';
      }
      
      cell.textContent = val;
      container.appendChild(cell);
    });
    
    arrayViz.appendChild(container);
  }
  
  async function linearSearch() {
    if (isSearching) return;
    const targetVal = parseInt(ui.querySelector('#targetInput').value);
    if (isNaN(targetVal)) {
      status.textContent = 'Enter a target value';
      return;
    }
    
    isSearching = true;
    target = targetVal;
    currentIndex = 0;
    status.textContent = `Searching for ${target}...`;
    
    for (let i = 0; i < array.length; i++) {
      currentIndex = i;
      renderArray();
      
      if (array[i] === target) {
        status.textContent = `Found at index ${i}!`;
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    if (array[currentIndex] !== target) {
      status.textContent = `${target} not found`;
    }
    
    isSearching = false;
  }
  
  ui.querySelector('#generateBtn').onclick = () => {
    array = Array.from({length: 10}, () => Math.floor(Math.random() * 20));
    currentIndex = -1;
    renderArray();
    status.textContent = 'Array generated';
  };
  
  ui.querySelector('#searchBtn').onclick = linearSearch;
  
  ui.querySelector('#resetBtn').onclick = () => {
    currentIndex = -1;
    renderArray();
    status.textContent = 'Ready';
  };
  
  renderArray();
}

// Bubble Sort Visualization
function renderBubbleSortVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch elements bubble to their correct positions.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="sortBtn" class="btn">Sort</button>
      <button id="stepBtn" class="ghost">Step</button>
      <input id="speedSlider" type="range" min="100" max="1000" value="300" />
      <span id="speedLabel" class="pill">Speed: 300ms</span>
      <span class="spacer"></span>
      <span id="status" class="pill">Ready</span>
    </div>
    <div id="arrayViz" class="section" style="margin-top:12px"></div>
    <div id="stats" class="section" style="margin-top:8px">
      <span class="pill">Comparisons: <span id="comparisons">0</span></span>
      <span class="pill">Swaps: <span id="swaps">0</span></span>
    </div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [8, 3, 5, 4, 6, 2, 7, 1];
  let isSorting = false;
  let speed = 300;
  let comparisons = 0;
  let swaps = 0;
  let currentI = -1;
  let currentJ = -1;
  
  const arrayViz = ui.querySelector('#arrayViz');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const speedLabel = ui.querySelector('#speedLabel');
  
  speedSlider.oninput = () => {
    speed = parseInt(speedSlider.value);
    speedLabel.textContent = `Speed: ${speed}ms`;
  };
  
  function renderArray() {
    arrayViz.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:4px;align-items:flex-end';
    
    const maxVal = Math.max(...array);
    
    array.forEach((val, idx) => {
      const bar = document.createElement('div');
      const height = (val / maxVal) * 200;
      bar.style.cssText = `width:40px;height:${height}px;background:var(--accent);border-radius:4px 4px 0 0;display:flex;align-items:flex-end;justify-content:center;color:var(--bg);font-weight:bold;padding:4px`;
      
      if (idx === currentJ || idx === currentJ + 1) {
        bar.style.background = 'var(--danger)';
      } else if (idx >= array.length - currentI) {
        bar.style.background = 'var(--ok)';
      }
      
      bar.textContent = val;
      container.appendChild(bar);
    });
    
    arrayViz.appendChild(container);
    ui.querySelector('#comparisons').textContent = comparisons;
    ui.querySelector('#swaps').textContent = swaps;
  }
  
  async function bubbleSort() {
    if (isSorting) return;
    isSorting = true;
    comparisons = 0;
    swaps = 0;
    status.textContent = 'Sorting...';
    
    for (let i = 0; i < array.length - 1; i++) {
      currentI = i;
      let swapped = false;
      
      for (let j = 0; j < array.length - i - 1; j++) {
        currentJ = j;
        comparisons++;
        renderArray();
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
          swapped = true;
          await new Promise(resolve => setTimeout(resolve, speed));
          renderArray();
        }
        
        await new Promise(resolve => setTimeout(resolve, speed / 2));
      }
      
      if (!swapped) break;
    }
    
    currentI = array.length;
    currentJ = -1;
    renderArray();
    status.textContent = 'Sorted!';
    isSorting = false;
  }
  
  ui.querySelector('#generateBtn').onclick = () => {
    if (isSorting) return;
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 20) + 1);
    currentI = -1;
    currentJ = -1;
    comparisons = 0;
    swaps = 0;
    renderArray();
    status.textContent = 'Array generated';
  };
  
  ui.querySelector('#sortBtn').onclick = bubbleSort;
  
  renderArray();
}

// Selection Sort Visualization
function renderSelectionSortVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch the algorithm select the minimum element in each pass.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="sortBtn" class="btn">Sort</button>
      <input id="speedSlider" type="range" min="100" max="1000" value="300" />
      <span id="speedLabel" class="pill">Speed: 300ms</span>
      <span class="spacer"></span>
      <span id="status" class="pill">Ready</span>
    </div>
    <div id="arrayViz" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [8, 3, 5, 4, 6, 2, 7, 1];
  let isSorting = false;
  let speed = 300;
  let currentI = -1;
  let currentJ = -1;
  let minIdx = -1;
  
  const arrayViz = ui.querySelector('#arrayViz');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const speedLabel = ui.querySelector('#speedLabel');
  
  speedSlider.oninput = () => {
    speed = parseInt(speedSlider.value);
    speedLabel.textContent = `Speed: ${speed}ms`;
  };
  
  function renderArray() {
    arrayViz.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:4px;align-items:flex-end';
    
    const maxVal = Math.max(...array);
    
    array.forEach((val, idx) => {
      const bar = document.createElement('div');
      const height = (val / maxVal) * 200;
      bar.style.cssText = `width:40px;height:${height}px;background:var(--accent);border-radius:4px 4px 0 0;display:flex;align-items:flex-end;justify-content:center;color:var(--bg);font-weight:bold;padding:4px`;
      
      if (idx === minIdx) {
        bar.style.background = 'var(--warn)';
      } else if (idx === currentJ) {
        bar.style.background = 'var(--danger)';
      } else if (idx < currentI) {
        bar.style.background = 'var(--ok)';
      }
      
      bar.textContent = val;
      container.appendChild(bar);
    });
    
    arrayViz.appendChild(container);
  }
  
  async function selectionSort() {
    if (isSorting) return;
    isSorting = true;
    status.textContent = 'Sorting...';
    
    for (let i = 0; i < array.length - 1; i++) {
      currentI = i;
      minIdx = i;
      
      for (let j = i + 1; j < array.length; j++) {
        currentJ = j;
        renderArray();
        
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
        
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        renderArray();
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    }
    
    currentI = array.length;
    currentJ = -1;
    minIdx = -1;
    renderArray();
    status.textContent = 'Sorted!';
    isSorting = false;
  }
  
  ui.querySelector('#generateBtn').onclick = () => {
    if (isSorting) return;
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 20) + 1);
    currentI = -1;
    currentJ = -1;
    minIdx = -1;
    renderArray();
    status.textContent = 'Array generated';
  };
  
  ui.querySelector('#sortBtn').onclick = selectionSort;
  
  renderArray();
}

// Insertion Sort Visualization
function renderInsertionSortVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Visualization</h2>
    <div class="muted">Watch elements being inserted into their correct position.</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="sortBtn" class="btn">Sort</button>
      <input id="speedSlider" type="range" min="100" max="1000" value="300" />
      <span id="speedLabel" class="pill">Speed: 300ms</span>
      <span class="spacer"></span>
      <span id="status" class="pill">Ready</span>
    </div>
    <div id="arrayViz" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [8, 3, 5, 4, 6, 2, 7, 1];
  let isSorting = false;
  let speed = 300;
  let currentI = -1;
  let currentJ = -1;
  let key = null;
  
  const arrayViz = ui.querySelector('#arrayViz');
  const status = ui.querySelector('#status');
  const speedSlider = ui.querySelector('#speedSlider');
  const speedLabel = ui.querySelector('#speedLabel');
  
  speedSlider.oninput = () => {
    speed = parseInt(speedSlider.value);
    speedLabel.textContent = `Speed: ${speed}ms`;
  };
  
  function renderArray() {
    arrayViz.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:4px;align-items:flex-end';
    
    const maxVal = Math.max(...array);
    
    array.forEach((val, idx) => {
      const bar = document.createElement('div');
      const height = (val / maxVal) * 200;
      bar.style.cssText = `width:40px;height:${height}px;background:var(--accent);border-radius:4px 4px 0 0;display:flex;align-items:flex-end;justify-content:center;color:var(--bg);font-weight:bold;padding:4px`;
      
      if (idx === currentI && key !== null) {
        bar.style.background = 'var(--warn)';
      } else if (idx === currentJ + 1) {
        bar.style.background = 'var(--danger)';
      } else if (idx <= currentI && idx > currentJ) {
        bar.style.opacity = '0.5';
      } else if (idx < currentI) {
        bar.style.background = 'var(--ok)';
      }
      
      bar.textContent = val;
      container.appendChild(bar);
    });
    
    arrayViz.appendChild(container);
  }
  
  async function insertionSort() {
    if (isSorting) return;
    isSorting = true;
    status.textContent = 'Sorting...';
    
    for (let i = 1; i < array.length; i++) {
      currentI = i;
      key = array[i];
      let j = i - 1;
      currentJ = j;
      
      renderArray();
      await new Promise(resolve => setTimeout(resolve, speed));
      
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
        currentJ = j;
        renderArray();
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      
      array[j + 1] = key;
      key = null;
      renderArray();
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    currentI = array.length;
    currentJ = -1;
    renderArray();
    status.textContent = 'Sorted!';
    isSorting = false;
  }
  
  ui.querySelector('#generateBtn').onclick = () => {
    if (isSorting) return;
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 20) + 1);
    currentI = -1;
    currentJ = -1;
    key = null;
    renderArray();
    status.textContent = 'Array generated';
  };
  
  ui.querySelector('#sortBtn').onclick = insertionSort;
  
  renderArray();
}

// Simplified visualizations for advanced algorithms
function renderMergeSortVisual(main, state, topic, item){
  renderSimpleSortVisual(main, 'Merge Sort', 'Divide-and-conquer sorting');
}

function renderQuickSortVisual(main, state, topic, item){
  renderSimpleSortVisual(main, 'Quick Sort', 'Partition-based sorting');
}

function renderHeapSortVisual(main, state, topic, item){
  renderSimpleSortVisual(main, 'Heap Sort', 'Heap-based sorting');
}

function renderRadixSortVisual(main, state, topic, item){
  renderSimpleSortVisual(main, 'Radix Sort', 'Digit-by-digit sorting');
}

function renderTimSortVisual(main, state, topic, item){
  renderSimpleSortVisual(main, 'Tim Sort', 'Hybrid merge/insertion sort');
}

function renderTreeSortVisual(main, state, topic, item){
  renderSimpleSortVisual(main, 'Tree Sort', 'BST-based sorting');
}

// Helper for simplified visualizations
function renderSimpleSortVisual(main, title, description){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${title} — Visualization</h2>
    <div class="muted">${description}</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="sortBtn" class="btn">Sort</button>
      <span class="spacer"></span>
      <span id="status" class="pill">Ready</span>
    </div>
    <div id="arrayViz" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  let array = [8, 3, 5, 4, 6, 2, 7, 1];
  
  const arrayViz = ui.querySelector('#arrayViz');
  const status = ui.querySelector('#status');
  
  function renderArray() {
    arrayViz.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:4px;align-items:flex-end';
    
    const maxVal = Math.max(...array);
    
    array.forEach((val) => {
      const bar = document.createElement('div');
      const height = (val / maxVal) * 200;
      bar.style.cssText = `width:40px;height:${height}px;background:var(--accent);border-radius:4px 4px 0 0;display:flex;align-items:flex-end;justify-content:center;color:var(--bg);font-weight:bold;padding:4px`;
      bar.textContent = val;
      container.appendChild(bar);
    });
    
    arrayViz.appendChild(container);
  }
  
  ui.querySelector('#generateBtn').onclick = () => {
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 20) + 1);
    renderArray();
    status.textContent = 'Array generated';
  };
  
  ui.querySelector('#sortBtn').onclick = () => {
    status.textContent = 'Sorting...';
    array.sort((a, b) => a - b);
    renderArray();
    status.textContent = 'Sorted!';
  };
  
  renderArray();
}

// Dynamic Programming Visualizations

// Fibonacci Visualization
function renderFibonacciVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>Fibonacci — DP Tree Visualization</h2>
    <div class="muted">Visualize the recursive calls and overlapping subproblems in Fibonacci computation</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <label>Fibonacci N:</label>
      <input id="fibN" type="range" min="1" max="10" value="6" />
      <span id="fibNLabel" class="pill">F(6)</span>
      <button id="computeBtn" class="btn">Compute</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="resultLabel" class="pill">Result: —</span>
    </div>
    <div class="row" style="gap:12px;margin-bottom:8px">
      <label>Mode:</label>
      <button id="naiveBtn" class="btn active">Naive Recursion</button>
      <button id="memoBtn" class="btn">With Memoization</button>
    </div>
    <div id="fibViz" class="section"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const fibN = ui.querySelector('#fibN');
  const fibNLabel = ui.querySelector('#fibNLabel');
  const computeBtn = ui.querySelector('#computeBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const resultLabel = ui.querySelector('#resultLabel');
  const naiveBtn = ui.querySelector('#naiveBtn');
  const memoBtn = ui.querySelector('#memoBtn');
  const fibViz = ui.querySelector('#fibViz');

  let n = 6;
  let mode = 'naive'; // 'naive' or 'memo'
  let callTree = {};
  let memo = {};
  let callCount = 0;

  const updateN = () => {
    n = parseInt(fibN.value);
    fibNLabel.textContent = `F(${n})`;
  };
  fibN.oninput = updateN;

  naiveBtn.onclick = () => {
    mode = 'naive';
    naiveBtn.classList.add('active');
    memoBtn.classList.remove('active');
    reset();
  };

  memoBtn.onclick = () => {
    mode = 'memo';
    memoBtn.classList.remove('active');
    naiveBtn.classList.add('active');
    reset();
  };

  function reset() {
    callTree = {};
    memo = {};
    callCount = 0;
    resultLabel.textContent = 'Result: —';
    renderTree();
  }

  function fibonacci(num, depth = 0, path = []) {
    callCount++;
    const currentPath = [...path, num];
    
    if (mode === 'memo' && memo[num] !== undefined) {
      callTree[currentPath.join('-')] = {
        n: num, 
        result: memo[num], 
        depth, 
        cached: true,
        path: currentPath
      };
      return memo[num];
    }

    callTree[currentPath.join('-')] = {
      n: num, 
      result: null, 
      depth, 
      cached: false,
      path: currentPath
    };

    if (num <= 1) {
      const result = num;
      callTree[currentPath.join('-')].result = result;
      if (mode === 'memo') memo[num] = result;
      return result;
    }

    const left = fibonacci(num - 1, depth + 1, currentPath);
    const right = fibonacci(num - 2, depth + 1, currentPath);
    const result = left + right;
    
    callTree[currentPath.join('-')].result = result;
    if (mode === 'memo') memo[num] = result;
    
    return result;
  }

  function renderTree() {
    fibViz.innerHTML = '';
    
    if (Object.keys(callTree).length === 0) {
      fibViz.innerHTML = '<div class="muted">Click "Compute" to see the recursion tree</div>';
      return;
    }

    const container = document.createElement('div');
    container.style.cssText = 'font-family: monospace; line-height: 1.8';
    
    const entries = Object.entries(callTree).sort((a, b) => {
      return a[1].depth - b[1].depth || a[0].localeCompare(b[0]);
    });

    entries.forEach(([key, call]) => {
      const div = document.createElement('div');
      const indent = '  '.repeat(call.depth);
      const cached = call.cached ? ' (cached)' : '';
      const result = call.result !== null ? ` = ${call.result}` : '';
      
      div.innerHTML = `${indent}F(${call.n})${cached}${result}`;
      div.style.cssText = `margin-left: ${call.depth * 20}px; color: ${call.cached ? 'var(--muted)' : 'var(--fg)'};`;
      
      if (call.cached) {
        div.style.backgroundColor = 'rgba(var(--accent-rgb), 0.1)';
        div.style.padding = '2px 6px';
        div.style.borderRadius = '4px';
      }
      
      container.appendChild(div);
    });

    fibViz.appendChild(container);
    
    const statsDiv = document.createElement('div');
    statsDiv.className = 'muted';
    statsDiv.style.marginTop = '12px';
    statsDiv.textContent = `Total function calls: ${callCount}`;
    fibViz.appendChild(statsDiv);
  }

  computeBtn.onclick = () => {
    reset();
    const result = fibonacci(n);
    resultLabel.textContent = `Result: ${result}`;
    renderTree();
  };

  resetBtn.onclick = reset;
  renderTree();
}

// House Robber Visualization  
function renderHouseRobberVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>House Robber — DP Decision Visualization</h2>
    <div class="muted">Visualize the decision-making process: rob current house or skip it</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <button id="generateBtn" class="btn">Generate Houses</button>
      <button id="solveBtn" class="btn">Solve Step-by-Step</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="maxProfitLabel" class="pill">Max Profit: —</span>
    </div>
    <div id="housesViz" class="section"></div>
    <div id="dpTable" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const generateBtn = ui.querySelector('#generateBtn');
  const solveBtn = ui.querySelector('#solveBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const maxProfitLabel = ui.querySelector('#maxProfitLabel');
  const housesViz = ui.querySelector('#housesViz');
  const dpTable = ui.querySelector('#dpTable');

  let houses = [2, 7, 9, 3, 1];
  let dp = [];
  let currentStep = -1;
  let isAnimating = false;

  function renderHouses() {
    housesViz.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:8px;align-items:flex-end;margin-bottom:12px';
    
    houses.forEach((value, i) => {
      const house = document.createElement('div');
      const height = (value / Math.max(...houses)) * 100 + 40;
      house.style.cssText = `
        width:60px;
        height:${height}px;
        background: ${i <= currentStep ? (dp[i] === (i > 0 ? Math.max(dp[i-1], houses[i] + (dp[i-2] || 0)) : houses[i]) && dp[i] !== (dp[i-1] || 0) ? 'var(--accent)' : 'var(--muted)') : '#ddd'};
        border-radius:8px 8px 4px 4px;
        display:flex;
        flex-direction:column;
        justify-content:flex-end;
        align-items:center;
        color:var(--bg);
        font-weight:bold;
        padding:8px;
        border: ${i <= currentStep && dp[i] !== (dp[i-1] || 0) ? '2px solid var(--accent)' : '2px solid transparent'};
      `;
      
      const valueDiv = document.createElement('div');
      valueDiv.textContent = `$${value}`;
      valueDiv.style.fontSize = '14px';
      
      const indexDiv = document.createElement('div');
      indexDiv.textContent = `H${i}`;
      indexDiv.style.cssText = 'font-size:12px;margin-top:4px;opacity:0.8';
      
      house.appendChild(valueDiv);
      house.appendChild(indexDiv);
      container.appendChild(house);
    });
    
    housesViz.appendChild(container);
  }

  function renderDPTable() {
    if (dp.length === 0) {
      dpTable.innerHTML = '<div class="muted">Click "Solve Step-by-Step" to see DP table</div>';
      return;
    }

    dpTable.innerHTML = '';
    const table = document.createElement('div');
    table.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:8px;max-width:600px';
    
    houses.forEach((_, i) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:12px;
        border-radius:6px;
        text-align:center;
        font-weight:bold;
        background: ${i <= currentStep ? 'var(--accent)' : '#eee'};
        color: ${i <= currentStep ? 'var(--bg)' : 'var(--muted)'};
      `;
      
      cell.innerHTML = `
        <div style="font-size:12px;opacity:0.8">dp[${i}]</div>
        <div>${i <= currentStep ? dp[i] : '?'}</div>
      `;
      
      table.appendChild(cell);
    });
    
    dpTable.appendChild(table);
    
    if (currentStep >= 0) {
      const explanation = document.createElement('div');
      explanation.className = 'muted';
      explanation.style.marginTop = '8px';
      
      if (currentStep === 0) {
        explanation.textContent = `dp[0] = ${houses[0]} (only one house, must rob it)`;
      } else if (currentStep === 1) {
        explanation.textContent = `dp[1] = max(${houses[0]}, ${houses[1]}) = ${dp[1]} (rob house 0 OR house 1)`;
      } else {
        const robCurrent = houses[currentStep] + (dp[currentStep-2] || 0);
        const skipCurrent = dp[currentStep-1];
        explanation.textContent = `dp[${currentStep}] = max(${skipCurrent}, ${houses[currentStep]} + ${dp[currentStep-2] || 0}) = max(${skipCurrent}, ${robCurrent}) = ${dp[currentStep]}`;
      }
      
      dpTable.appendChild(explanation);
    }
  }

  async function solveStepByStep() {
    if (isAnimating) return;
    isAnimating = true;
    
    dp = new Array(houses.length);
    currentStep = -1;
    maxProfitLabel.textContent = 'Max Profit: —';
    
    renderHouses();
    renderDPTable();
    
    for (let i = 0; i < houses.length; i++) {
      currentStep = i;
      
      if (i === 0) {
        dp[i] = houses[i];
      } else if (i === 1) {
        dp[i] = Math.max(houses[0], houses[1]);
      } else {
        dp[i] = Math.max(dp[i-1], houses[i] + dp[i-2]);
      }
      
      renderHouses();
      renderDPTable();
      
      if (i === houses.length - 1) {
        maxProfitLabel.textContent = `Max Profit: $${dp[i]}`;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    isAnimating = false;
  }

  function reset() {
    dp = [];
    currentStep = -1;
    maxProfitLabel.textContent = 'Max Profit: —';
    renderHouses();
    renderDPTable();
  }

  generateBtn.onclick = () => {
    if (isAnimating) return;
    houses = Array.from({length: 5}, () => Math.floor(Math.random() * 9) + 1);
    reset();
  };

  solveBtn.onclick = solveStepByStep;
  resetBtn.onclick = reset;
  
  renderHouses();
  renderDPTable();
}

// Climbing Stairs Visualization
function renderClimbingStairsVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>Climbing Stairs — DP Path Visualization</h2>
    <div class="muted">Visualize all possible ways to climb stairs with steps of size 1 or 2</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <label>Stairs N:</label>
      <input id="stairsN" type="range" min="1" max="8" value="5" />
      <span id="stairsNLabel" class="pill">N=5</span>
      <button id="computeBtn" class="btn">Compute Ways</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="waysLabel" class="pill">Ways: —</span>
    </div>
    <div id="stairsViz" class="section"></div>
    <div id="dpTableStairs" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const stairsN = ui.querySelector('#stairsN');
  const stairsNLabel = ui.querySelector('#stairsNLabel');
  const computeBtn = ui.querySelector('#computeBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const waysLabel = ui.querySelector('#waysLabel');
  const stairsViz = ui.querySelector('#stairsViz');
  const dpTableStairs = ui.querySelector('#dpTableStairs');

  let n = 5;
  let dp = [];
  let currentStep = -1;
  let allPaths = [];

  const updateN = () => {
    n = parseInt(stairsN.value);
    stairsNLabel.textContent = `N=${n}`;
  };
  stairsN.oninput = updateN;

  function findAllPaths(target, current = 0, path = []) {
    if (current === target) {
      allPaths.push([...path]);
      return;
    }
    if (current > target) return;
    
    // Try step of 1
    path.push(1);
    findAllPaths(target, current + 1, path);
    path.pop();
    
    // Try step of 2
    path.push(2);
    findAllPaths(target, current + 2, path);
    path.pop();
  }

  function renderStairs() {
    stairsViz.innerHTML = '';
    
    // Draw stairs
    const stairsContainer = document.createElement('div');
    stairsContainer.style.cssText = 'position:relative;height:300px;margin-bottom:20px';
    
    for (let i = 0; i <= n; i++) {
      const step = document.createElement('div');
      const x = i * 50;
      const y = 280 - (i * 25);
      
      step.style.cssText = `
        position:absolute;
        left:${x}px;
        top:${y}px;
        width:40px;
        height:25px;
        background: ${i <= currentStep ? 'var(--accent)' : '#ddd'};
        border-radius:4px;
        display:flex;
        align-items:center;
        justify-content:center;
        color:var(--bg);
        font-weight:bold;
        font-size:12px;
      `;
      
      step.textContent = i;
      stairsContainer.appendChild(step);
    }
    
    stairsViz.appendChild(stairsContainer);
    
    // Show some example paths
    if (allPaths.length > 0) {
      const pathsDiv = document.createElement('div');
      pathsDiv.innerHTML = '<strong>Example paths to reach step ' + n + ':</strong>';
      pathsDiv.style.marginBottom = '12px';
      
      const pathsList = document.createElement('div');
      pathsList.style.cssText = 'font-family:monospace;line-height:1.6';
      
      allPaths.slice(0, Math.min(8, allPaths.length)).forEach((path, idx) => {
        const pathDiv = document.createElement('div');
        pathDiv.style.cssText = 'padding:4px;background:rgba(var(--accent-rgb),0.1);margin:2px 0;border-radius:4px';
        pathDiv.textContent = `Path ${idx + 1}: [${path.join(', ')}] (${path.length} moves)`;
        pathsList.appendChild(pathDiv);
      });
      
      if (allPaths.length > 8) {
        const moreDiv = document.createElement('div');
        moreDiv.className = 'muted';
        moreDiv.textContent = `... and ${allPaths.length - 8} more paths`;
        pathsList.appendChild(moreDiv);
      }
      
      pathsDiv.appendChild(pathsList);
      stairsViz.appendChild(pathsDiv);
    }
  }

  function renderDPTable() {
    if (dp.length === 0) {
      dpTableStairs.innerHTML = '<div class="muted">Click "Compute Ways" to see DP table</div>';
      return;
    }

    dpTableStairs.innerHTML = '';
    const table = document.createElement('div');
    table.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(60px,1fr));gap:8px;max-width:500px;margin-bottom:12px';
    
    for (let i = 0; i <= n; i++) {
      const cell = document.createElement('div');
      cell.style.cssText = `
        padding:10px;
        border-radius:6px;
        text-align:center;
        font-weight:bold;
        background: ${i <= currentStep ? 'var(--accent)' : '#eee'};
        color: ${i <= currentStep ? 'var(--bg)' : 'var(--muted)'};
      `;
      
      cell.innerHTML = `
        <div style="font-size:11px;opacity:0.8">dp[${i}]</div>
        <div>${i <= currentStep ? dp[i] : '?'}</div>
      `;
      
      table.appendChild(cell);
    }
    
    dpTableStairs.appendChild(table);
    
    if (currentStep >= 0) {
      const explanation = document.createElement('div');
      explanation.className = 'muted';
      explanation.style.marginBottom = '8px';
      
      if (currentStep === 0) {
        explanation.textContent = `dp[0] = 1 (one way to stay at ground)`;
      } else if (currentStep === 1) {
        explanation.textContent = `dp[1] = 1 (only one step of size 1)`;
      } else {
        explanation.textContent = `dp[${currentStep}] = dp[${currentStep-1}] + dp[${currentStep-2}] = ${dp[currentStep-1]} + ${dp[currentStep-2]} = ${dp[currentStep]}`;
      }
      
      dpTableStairs.appendChild(explanation);
    }
  }

  async function computeWays() {
    dp = new Array(n + 1);
    currentStep = -1;
    allPaths = [];
    waysLabel.textContent = 'Ways: —';
    
    // Find all paths for visualization
    findAllPaths(n);
    
    renderStairs();
    renderDPTable();
    
    // Animate DP computation
    for (let i = 0; i <= n; i++) {
      currentStep = i;
      
      if (i === 0) {
        dp[i] = 1;
      } else if (i === 1) {
        dp[i] = 1;
      } else {
        dp[i] = dp[i-1] + dp[i-2];
      }
      
      renderStairs();
      renderDPTable();
      
      if (i === n) {
        waysLabel.textContent = `Ways: ${dp[i]}`;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  function reset() {
    dp = [];
    currentStep = -1;
    allPaths = [];
    waysLabel.textContent = 'Ways: —';
    renderStairs();
    renderDPTable();
  }

  computeBtn.onclick = computeWays;
  resetBtn.onclick = reset;
  
  renderStairs();
  renderDPTable();
}

// Knapsack Visualization
function renderKnapsackVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>0/1 Knapsack — DP Grid Visualization</h2>
    <div class="muted">Visualize the 2D DP table for optimal item selection</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <button id="generateBtn" class="btn">Generate Items</button>
      <button id="solveBtn" class="btn">Solve Step-by-Step</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="maxValueLabel" class="pill">Max Value: —</span>
    </div>
    <div id="itemsDisplay" class="section"></div>
    <div id="knapsackGrid" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const generateBtn = ui.querySelector('#generateBtn');
  const solveBtn = ui.querySelector('#solveBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const maxValueLabel = ui.querySelector('#maxValueLabel');
  const itemsDisplay = ui.querySelector('#itemsDisplay');
  const knapsackGrid = ui.querySelector('#knapsackGrid');

  let items = [
    {weight: 1, value: 1, name: 'A'},
    {weight: 3, value: 4, name: 'B'},
    {weight: 4, value: 5, name: 'C'},
    {weight: 5, value: 7, name: 'D'}
  ];
  let capacity = 7;
  let dp = [];
  let currentI = -1;
  let currentW = -1;
  let isAnimating = false;

  function renderItems() {
    itemsDisplay.innerHTML = '';
    
    const capacityDiv = document.createElement('div');
    capacityDiv.innerHTML = `<strong>Knapsack Capacity: ${capacity}</strong>`;
    capacityDiv.style.marginBottom = '12px';
    itemsDisplay.appendChild(capacityDiv);
    
    const itemsContainer = document.createElement('div');
    itemsContainer.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap';
    
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.style.cssText = `
        padding:12px;
        background:var(--accent);
        color:var(--bg);
        border-radius:8px;
        text-align:center;
        min-width:60px;
      `;
      
      itemDiv.innerHTML = `
        <div style="font-weight:bold;font-size:16px">${item.name}</div>
        <div style="font-size:12px">W:${item.weight}</div>
        <div style="font-size:12px">V:${item.value}</div>
      `;
      
      itemsContainer.appendChild(itemDiv);
    });
    
    itemsDisplay.appendChild(itemsContainer);
  }

  function renderGrid() {
    if (dp.length === 0) {
      knapsackGrid.innerHTML = '<div class="muted">Click "Solve Step-by-Step" to see DP grid</div>';
      return;
    }

    knapsackGrid.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText = 'overflow:auto;max-width:100%';
    
    const table = document.createElement('table');
    table.style.cssText = 'border-collapse:collapse;font-size:12px;margin:auto';
    
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th style="padding:8px;border:1px solid #ddd;background:#f5f5f5"></th>';
    for (let w = 0; w <= capacity; w++) {
      headerRow.innerHTML += `<th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">W=${w}</th>`;
    }
    table.appendChild(headerRow);
    
    // DP table rows
    for (let i = 0; i <= items.length; i++) {
      const row = document.createElement('tr');
      
      // Row header
      const rowHeader = document.createElement('th');
      rowHeader.style.cssText = 'padding:8px;border:1px solid #ddd;background:#f5f5f5';
      rowHeader.textContent = i === 0 ? '∅' : items[i-1].name;
      row.appendChild(rowHeader);
      
      // DP cells
      for (let w = 0; w <= capacity; w++) {
        const cell = document.createElement('td');
        const isActive = i === currentI && w === currentW;
        const isComputed = i < currentI || (i === currentI && w < currentW);
        
        cell.style.cssText = `
          padding:8px;
          border:1px solid #ddd;
          text-align:center;
          background: ${isActive ? 'var(--accent)' : (isComputed ? '#e8f5e8' : 'white')};
          color: ${isActive ? 'var(--bg)' : 'var(--fg)'};
          font-weight: ${isActive ? 'bold' : 'normal'};
        `;
        
        if (isComputed || isActive) {
          cell.textContent = dp[i][w];
        } else {
          cell.textContent = '?';
        }
        
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }
    
    gridContainer.appendChild(table);
    knapsackGrid.appendChild(gridContainer);
    
    // Add explanation
    if (currentI >= 0 && currentW >= 0) {
      const explanation = document.createElement('div');
      explanation.className = 'muted';
      explanation.style.cssText = 'margin-top:12px;max-width:600px';
      
      if (currentI === 0) {
        explanation.textContent = `dp[0][${currentW}] = 0 (no items available)`;
      } else {
        const item = items[currentI - 1];
        if (item.weight > currentW) {
          explanation.textContent = `dp[${currentI}][${currentW}]: Item ${item.name} (weight ${item.weight}) too heavy for capacity ${currentW}, so dp[${currentI}][${currentW}] = dp[${currentI-1}][${currentW}] = ${dp[currentI][currentW]}`;
        } else {
          const include = dp[currentI-1][currentW - item.weight] + item.value;
          const exclude = dp[currentI-1][currentW];
          explanation.textContent = `dp[${currentI}][${currentW}]: Include ${item.name}? max(exclude=${exclude}, include=${include}) = ${dp[currentI][currentW]}`;
        }
      }
      
      knapsackGrid.appendChild(explanation);
    }
  }

  async function solveStepByStep() {
    if (isAnimating) return;
    isAnimating = true;
    
    dp = Array.from({length: items.length + 1}, () => new Array(capacity + 1).fill(0));
    currentI = -1;
    currentW = -1;
    maxValueLabel.textContent = 'Max Value: —';
    
    renderItems();
    renderGrid();
    
    for (let i = 0; i <= items.length; i++) {
      for (let w = 0; w <= capacity; w++) {
        currentI = i;
        currentW = w;
        
        if (i === 0 || w === 0) {
          dp[i][w] = 0;
        } else {
          const item = items[i - 1];
          if (item.weight <= w) {
            dp[i][w] = Math.max(
              dp[i-1][w],
              dp[i-1][w - item.weight] + item.value
            );
          } else {
            dp[i][w] = dp[i-1][w];
          }
        }
        
        renderGrid();
        
        if (i === items.length && w === capacity) {
          maxValueLabel.textContent = `Max Value: ${dp[i][w]}`;
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    isAnimating = false;
  }

  function reset() {
    dp = [];
    currentI = -1;
    currentW = -1;
    maxValueLabel.textContent = 'Max Value: —';
    renderItems();
    renderGrid();
  }

  generateBtn.onclick = () => {
    if (isAnimating) return;
    items = [];
    for (let i = 0; i < 4; i++) {
      items.push({
        weight: Math.floor(Math.random() * 5) + 1,
        value: Math.floor(Math.random() * 8) + 1,
        name: String.fromCharCode(65 + i)
      });
    }
    capacity = Math.floor(Math.random() * 5) + 5;
    reset();
  };

  solveBtn.onclick = solveStepByStep;
  resetBtn.onclick = reset;
  
  renderItems();
  renderGrid();
}

// LCS Visualization
function renderLCSVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>Longest Common Subsequence — DP Grid Visualization</h2>
    <div class="muted">Visualize the 2D DP table for finding longest common subsequence</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <label>String 1:</label>
      <input id="string1" type="text" value="ABCDGH" style="max-width:120px" />
      <label>String 2:</label>
      <input id="string2" type="text" value="AEDFHR" style="max-width:120px" />
      <button id="solveBtn" class="btn">Solve</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="lcsLengthLabel" class="pill">LCS Length: —</span>
    </div>
    <div id="stringsDisplay" class="section"></div>
    <div id="lcsGrid" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const string1Input = ui.querySelector('#string1');
  const string2Input = ui.querySelector('#string2');
  const solveBtn = ui.querySelector('#solveBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const lcsLengthLabel = ui.querySelector('#lcsLengthLabel');
  const stringsDisplay = ui.querySelector('#stringsDisplay');
  const lcsGrid = ui.querySelector('#lcsGrid');

  let str1 = 'ABCDGH';
  let str2 = 'AEDFHR';
  let dp = [];
  let currentI = -1;
  let currentJ = -1;
  let isAnimating = false;
  let lcsString = '';

  function renderStrings() {
    stringsDisplay.innerHTML = '';
    
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:12px';
    
    const str1Display = document.createElement('div');
    str1Display.innerHTML = `<strong>String 1:</strong> `;
    
    const str1Chars = document.createElement('span');
    str1Chars.style.cssText = 'font-family:monospace;font-size:16px;letter-spacing:2px';
    str1Chars.innerHTML = str1.split('').map((char, i) => 
      `<span style="padding:4px 8px;margin:2px;background:${i < currentI ? '#e8f5e8' : '#f5f5f5'};border-radius:4px">${char}</span>`
    ).join('');
    str1Display.appendChild(str1Chars);
    
    const str2Display = document.createElement('div');
    str2Display.innerHTML = `<strong>String 2:</strong> `;
    
    const str2Chars = document.createElement('span');
    str2Chars.style.cssText = 'font-family:monospace;font-size:16px;letter-spacing:2px';
    str2Chars.innerHTML = str2.split('').map((char, j) => 
      `<span style="padding:4px 8px;margin:2px;background:${j < currentJ ? '#e8f5e8' : '#f5f5f5'};border-radius:4px">${char}</span>`
    ).join('');
    str2Display.appendChild(str2Chars);
    
    container.appendChild(str1Display);
    container.appendChild(str2Display);
    
    if (lcsString) {
      const lcsDisplay = document.createElement('div');
      lcsDisplay.innerHTML = `<strong>LCS:</strong> `;
      const lcsChars = document.createElement('span');
      lcsChars.style.cssText = 'font-family:monospace;font-size:16px;letter-spacing:2px;color:var(--accent)';
      lcsChars.innerHTML = lcsString.split('').map(char => 
        `<span style="padding:4px 8px;margin:2px;background:var(--accent);color:var(--bg);border-radius:4px">${char}</span>`
      ).join('');
      lcsDisplay.appendChild(lcsChars);
      container.appendChild(lcsDisplay);
    }
    
    stringsDisplay.appendChild(container);
  }

  function renderGrid() {
    if (dp.length === 0) {
      lcsGrid.innerHTML = '<div class="muted">Click "Solve" to see DP grid</div>';
      return;
    }

    lcsGrid.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText = 'overflow:auto;max-width:100%';
    
    const table = document.createElement('table');
    table.style.cssText = 'border-collapse:collapse;font-size:12px;margin:auto';
    
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th style="padding:8px;border:1px solid #ddd;background:#f5f5f5"></th><th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">∅</th>';
    for (let j = 0; j < str2.length; j++) {
      headerRow.innerHTML += `<th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">${str2[j]}</th>`;
    }
    table.appendChild(headerRow);
    
    // DP table rows
    for (let i = 0; i <= str1.length; i++) {
      const row = document.createElement('tr');
      
      // Row header
      const rowHeader = document.createElement('th');
      rowHeader.style.cssText = 'padding:8px;border:1px solid #ddd;background:#f5f5f5';
      rowHeader.textContent = i === 0 ? '∅' : str1[i-1];
      row.appendChild(rowHeader);
      
      // DP cells
      for (let j = 0; j <= str2.length; j++) {
        const cell = document.createElement('td');
        const isActive = i === currentI && j === currentJ;
        const isComputed = i < currentI || (i === currentI && j < currentJ);
        
        cell.style.cssText = `
          padding:8px;
          border:1px solid #ddd;
          text-align:center;
          background: ${isActive ? 'var(--accent)' : (isComputed ? '#e8f5e8' : 'white')};
          color: ${isActive ? 'var(--bg)' : 'var(--fg)'};
          font-weight: ${isActive ? 'bold' : 'normal'};
        `;
        
        if (isComputed || isActive) {
          cell.textContent = dp[i][j];
        } else {
          cell.textContent = '?';
        }
        
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }
    
    gridContainer.appendChild(table);
    lcsGrid.appendChild(gridContainer);
    
    // Add explanation
    if (currentI >= 0 && currentJ >= 0) {
      const explanation = document.createElement('div');
      explanation.className = 'muted';
      explanation.style.cssText = 'margin-top:12px;max-width:600px';
      
      if (currentI === 0 || currentJ === 0) {
        explanation.textContent = `dp[${currentI}][${currentJ}] = 0 (empty string has no common subsequence)`;
      } else {
        const char1 = str1[currentI - 1];
        const char2 = str2[currentJ - 1];
        if (char1 === char2) {
          explanation.textContent = `dp[${currentI}][${currentJ}]: '${char1}' === '${char2}', so dp[${currentI}][${currentJ}] = 1 + dp[${currentI-1}][${currentJ-1}] = 1 + ${dp[currentI-1][currentJ-1]} = ${dp[currentI][currentJ]}`;
        } else {
          explanation.textContent = `dp[${currentI}][${currentJ}]: '${char1}' ≠ '${char2}', so dp[${currentI}][${currentJ}] = max(dp[${currentI-1}][${currentJ}], dp[${currentI}][${currentJ-1}]) = max(${dp[currentI-1][currentJ]}, ${dp[currentI][currentJ-1]}) = ${dp[currentI][currentJ]}`;
        }
      }
      
      lcsGrid.appendChild(explanation);
    }
  }

  function reconstructLCS() {
    let i = str1.length, j = str2.length;
    let lcs = [];
    
    while (i > 0 && j > 0) {
      if (str1[i-1] === str2[j-1]) {
        lcs.unshift(str1[i-1]);
        i--; j--;
      } else if (dp[i-1][j] > dp[i][j-1]) {
        i--;
      } else {
        j--;
      }
    }
    
    lcsString = lcs.join('');
  }

  async function solve() {
    if (isAnimating) return;
    isAnimating = true;
    
    str1 = string1Input.value.toUpperCase();
    str2 = string2Input.value.toUpperCase();
    
    dp = Array.from({length: str1.length + 1}, () => new Array(str2.length + 1).fill(0));
    currentI = -1;
    currentJ = -1;
    lcsString = '';
    lcsLengthLabel.textContent = 'LCS Length: —';
    
    renderStrings();
    renderGrid();
    
    for (let i = 0; i <= str1.length; i++) {
      for (let j = 0; j <= str2.length; j++) {
        currentI = i;
        currentJ = j;
        
        if (i === 0 || j === 0) {
          dp[i][j] = 0;
        } else if (str1[i-1] === str2[j-1]) {
          dp[i][j] = dp[i-1][j-1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
        
        renderStrings();
        renderGrid();
        
        if (i === str1.length && j === str2.length) {
          lcsLengthLabel.textContent = `LCS Length: ${dp[i][j]}`;
          reconstructLCS();
          renderStrings();
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    isAnimating = false;
  }

  function reset() {
    dp = [];
    currentI = -1;
    currentJ = -1;
    lcsString = '';
    lcsLengthLabel.textContent = 'LCS Length: —';
    renderStrings();
    renderGrid();
  }

  string1Input.oninput = reset;
  string2Input.oninput = reset;
  solveBtn.onclick = solve;
  resetBtn.onclick = reset;
  
  renderStrings();
  renderGrid();
}

// Edit Distance Visualization
function renderEditDistanceVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>Edit Distance — DP Grid Visualization</h2>
    <div class="muted">Visualize the 2D DP table for computing minimum edit distance</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <label>String 1:</label>
      <input id="editStr1" type="text" value="kitten" style="max-width:120px" />
      <label>String 2:</label>
      <input id="editStr2" type="text" value="sitting" style="max-width:120px" />
      <button id="solveBtn" class="btn">Solve</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="distanceLabel" class="pill">Distance: —</span>
    </div>
    <div id="editStringsDisplay" class="section"></div>
    <div id="editGrid" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const editStr1Input = ui.querySelector('#editStr1');
  const editStr2Input = ui.querySelector('#editStr2');
  const solveBtn = ui.querySelector('#solveBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const distanceLabel = ui.querySelector('#distanceLabel');
  const editStringsDisplay = ui.querySelector('#editStringsDisplay');
  const editGrid = ui.querySelector('#editGrid');

  let str1 = 'kitten';
  let str2 = 'sitting';
  let dp = [];
  let currentI = -1;
  let currentJ = -1;
  let isAnimating = false;

  function renderStrings() {
    editStringsDisplay.innerHTML = '';
    
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:12px';
    
    const str1Display = document.createElement('div');
    str1Display.innerHTML = `<strong>String 1 (${str1.length} chars):</strong> `;
    
    const str1Chars = document.createElement('span');
    str1Chars.style.cssText = 'font-family:monospace;font-size:16px;letter-spacing:2px';
    str1Chars.innerHTML = str1.split('').map((char, i) => 
      `<span style="padding:4px 8px;margin:2px;background:${i < currentI ? '#e8f5e8' : '#f5f5f5'};border-radius:4px">${char}</span>`
    ).join('');
    str1Display.appendChild(str1Chars);
    
    const str2Display = document.createElement('div');
    str2Display.innerHTML = `<strong>String 2 (${str2.length} chars):</strong> `;
    
    const str2Chars = document.createElement('span');
    str2Chars.style.cssText = 'font-family:monospace;font-size:16px;letter-spacing:2px';
    str2Chars.innerHTML = str2.split('').map((char, j) => 
      `<span style="padding:4px 8px;margin:2px;background:${j < currentJ ? '#e8f5e8' : '#f5f5f5'};border-radius:4px">${char}</span>`
    ).join('');
    str2Display.appendChild(str2Chars);
    
    container.appendChild(str1Display);
    container.appendChild(str2Display);
    editStringsDisplay.appendChild(container);
  }

  function renderGrid() {
    if (dp.length === 0) {
      editGrid.innerHTML = '<div class="muted">Click "Solve" to see DP grid</div>';
      return;
    }

    editGrid.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText = 'overflow:auto;max-width:100%';
    
    const table = document.createElement('table');
    table.style.cssText = 'border-collapse:collapse;font-size:11px;margin:auto';
    
    // Header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th style="padding:6px;border:1px solid #ddd;background:#f5f5f5"></th><th style="padding:6px;border:1px solid #ddd;background:#f5f5f5">∅</th>';
    for (let j = 0; j < str2.length; j++) {
      headerRow.innerHTML += `<th style="padding:6px;border:1px solid #ddd;background:#f5f5f5">${str2[j]}</th>`;
    }
    table.appendChild(headerRow);
    
    // DP table rows
    for (let i = 0; i <= str1.length; i++) {
      const row = document.createElement('tr');
      
      // Row header
      const rowHeader = document.createElement('th');
      rowHeader.style.cssText = 'padding:6px;border:1px solid #ddd;background:#f5f5f5';
      rowHeader.textContent = i === 0 ? '∅' : str1[i-1];
      row.appendChild(rowHeader);
      
      // DP cells
      for (let j = 0; j <= str2.length; j++) {
        const cell = document.createElement('td');
        const isActive = i === currentI && j === currentJ;
        const isComputed = i < currentI || (i === currentI && j < currentJ);
        
        cell.style.cssText = `
          padding:6px;
          border:1px solid #ddd;
          text-align:center;
          background: ${isActive ? 'var(--accent)' : (isComputed ? '#e8f5e8' : 'white')};
          color: ${isActive ? 'var(--bg)' : 'var(--fg)'};
          font-weight: ${isActive ? 'bold' : 'normal'};
          min-width:30px;
        `;
        
        if (isComputed || isActive) {
          cell.textContent = dp[i][j];
        } else {
          cell.textContent = '?';
        }
        
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }
    
    gridContainer.appendChild(table);
    editGrid.appendChild(gridContainer);
    
    // Add explanation
    if (currentI >= 0 && currentJ >= 0) {
      const explanation = document.createElement('div');
      explanation.className = 'muted';
      explanation.style.cssText = 'margin-top:12px;max-width:700px';
      
      if (currentI === 0) {
        explanation.textContent = `dp[0][${currentJ}] = ${currentJ} (need ${currentJ} insertions to get from empty string to "${str2.substring(0, currentJ)}")`;
      } else if (currentJ === 0) {
        explanation.textContent = `dp[${currentI}][0] = ${currentI} (need ${currentI} deletions to get from "${str1.substring(0, currentI)}" to empty string)`;
      } else {
        const char1 = str1[currentI - 1];
        const char2 = str2[currentJ - 1];
        if (char1 === char2) {
          explanation.textContent = `dp[${currentI}][${currentJ}]: '${char1}' === '${char2}', no operation needed, so dp[${currentI}][${currentJ}] = dp[${currentI-1}][${currentJ-1}] = ${dp[currentI][currentJ]}`;
        } else {
          const replace = dp[currentI-1][currentJ-1] + 1;
          const insert = dp[currentI][currentJ-1] + 1;
          const delete_ = dp[currentI-1][currentJ] + 1;
          explanation.textContent = `dp[${currentI}][${currentJ}]: '${char1}' ≠ '${char2}', min(replace=${replace}, insert=${insert}, delete=${delete_}) = ${dp[currentI][currentJ]}`;
        }
      }
      
      editGrid.appendChild(explanation);
    }
  }

  async function solve() {
    if (isAnimating) return;
    isAnimating = true;
    
    str1 = editStr1Input.value.toLowerCase();
    str2 = editStr2Input.value.toLowerCase();
    
    dp = Array.from({length: str1.length + 1}, () => new Array(str2.length + 1).fill(0));
    currentI = -1;
    currentJ = -1;
    distanceLabel.textContent = 'Distance: —';
    
    renderStrings();
    renderGrid();
    
    for (let i = 0; i <= str1.length; i++) {
      for (let j = 0; j <= str2.length; j++) {
        currentI = i;
        currentJ = j;
        
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else if (str1[i-1] === str2[j-1]) {
          dp[i][j] = dp[i-1][j-1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i-1][j],     // Delete
            dp[i][j-1],     // Insert
            dp[i-1][j-1]    // Replace
          );
        }
        
        renderStrings();
        renderGrid();
        
        if (i === str1.length && j === str2.length) {
          distanceLabel.textContent = `Distance: ${dp[i][j]}`;
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    isAnimating = false;
  }

  function reset() {
    dp = [];
    currentI = -1;
    currentJ = -1;
    distanceLabel.textContent = 'Distance: —';
    renderStrings();
    renderGrid();
  }

  editStr1Input.oninput = reset;
  editStr2Input.oninput = reset;
  solveBtn.onclick = solve;
  resetBtn.onclick = reset;
  
  renderStrings();
  renderGrid();
}

// Maximum Subarray Visualization
function renderMaxSubarrayVisual(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>Maximum Subarray (Kadane's) — DP Visualization</h2>
    <div class="muted">Visualize Kadane's algorithm for finding maximum contiguous subarray sum</div>`;

  const ui = document.createElement('div');
  ui.className = 'section';
  ui.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:12px">
      <button id="generateBtn" class="btn">Generate Array</button>
      <button id="solveBtn" class="btn">Solve Step-by-Step</button>
      <button id="resetBtn" class="btn">Reset</button>
      <span class="spacer"></span>
      <span id="maxSumLabel" class="pill">Max Sum: —</span>
    </div>
    <div id="arrayDisplay" class="section"></div>
    <div id="kadaneSteps" class="section" style="margin-top:12px"></div>
  `;
  box.appendChild(ui);
  main.appendChild(box);

  const generateBtn = ui.querySelector('#generateBtn');
  const solveBtn = ui.querySelector('#solveBtn');
  const resetBtn = ui.querySelector('#resetBtn');
  const maxSumLabel = ui.querySelector('#maxSumLabel');
  const arrayDisplay = ui.querySelector('#arrayDisplay');
  const kadaneSteps = ui.querySelector('#kadaneSteps');

  let array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  let currentSum = [];
  let maxSum = [];
  let currentIndex = -1;
  let isAnimating = false;
  let bestStart = -1, bestEnd = -1;

  function renderArray() {
    arrayDisplay.innerHTML = '';
    
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;gap:4px;align-items:flex-end;justify-content:center;flex-wrap:wrap';
    
    array.forEach((val, i) => {
      const bar = document.createElement('div');
      const height = Math.abs(val) * 20 + 30;
      const isInBest = bestStart !== -1 && i >= bestStart && i <= bestEnd;
      const isCurrent = i === currentIndex;
      
      bar.style.cssText = `
        width:50px;
        height:${height}px;
        background: ${isCurrent ? 'var(--accent)' : (isInBest ? '#4CAF50' : (val >= 0 ? '#8BC34A' : '#F44336'))};
        border-radius:4px 4px 0 0;
        display:flex;
        align-items:flex-end;
        justify-content:center;
        color:white;
        font-weight:bold;
        padding:4px;
        margin:2px;
        position:relative;
        border: ${isCurrent ? '2px solid var(--accent)' : '1px solid rgba(0,0,0,0.1)'};
      `;
      
      bar.textContent = val;
      
      // Add index label
      const indexLabel = document.createElement('div');
      indexLabel.textContent = i;
      indexLabel.style.cssText = 'position:absolute;bottom:-20px;font-size:12px;color:var(--fg)';
      bar.appendChild(indexLabel);
      
      container.appendChild(bar);
    });
    
    arrayDisplay.appendChild(container);
  }

  function renderSteps() {
    if (currentSum.length === 0) {
      kadaneSteps.innerHTML = '<div class="muted">Click "Solve Step-by-Step" to see Kadane\'s algorithm in action</div>';
      return;
    }

    kadaneSteps.innerHTML = '';
    
    const table = document.createElement('table');
    table.style.cssText = 'width:100%;border-collapse:collapse;margin-bottom:16px';
    
    // Header
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">Index</th>
      <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">Element</th>
      <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">Current Sum</th>
      <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">Max Sum So Far</th>
      <th style="padding:8px;border:1px solid #ddd;background:#f5f5f5">Decision</th>
    `;
    table.appendChild(headerRow);
    
    // Data rows
    for (let i = 0; i <= currentIndex && i < array.length; i++) {
      const row = document.createElement('tr');
      const isActive = i === currentIndex;
      
      row.style.backgroundColor = isActive ? 'rgba(var(--accent-rgb), 0.1)' : 'white';
      
      const decision = i === 0 ? 'Start' : 
                      (currentSum[i-1] + array[i] > array[i] ? 'Extend subarray' : 'Start new subarray');
      
      row.innerHTML = `
        <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:${isActive ? 'bold' : 'normal'}">${i}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:${isActive ? 'bold' : 'normal'}">${array[i]}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:${isActive ? 'bold' : 'normal'}">${currentSum[i] || 0}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:${isActive ? 'bold' : 'normal'}">${maxSum[i] || 0}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:${isActive ? 'bold' : 'normal'}">${decision}</td>
      `;
      
      table.appendChild(row);
    }
    
    kadaneSteps.appendChild(table);
    
    // Add explanation
    if (currentIndex >= 0) {
      const explanation = document.createElement('div');
      explanation.className = 'muted';
      explanation.style.cssText = 'margin-top:8px;max-width:700px';
      
      if (currentIndex === 0) {
        explanation.textContent = `Initialize: currentSum = ${array[0]}, maxSum = ${array[0]}`;
      } else {
        const extendSum = currentSum[currentIndex-1] + array[currentIndex];
        const startNewSum = array[currentIndex];
        const decision = extendSum > startNewSum ? 'extend' : 'start new';
        explanation.textContent = `At index ${currentIndex}: extend (${extendSum}) vs start new (${startNewSum}) → ${decision} subarray. Update maxSum if current > max.`;
      }
      
      kadaneSteps.appendChild(explanation);
    }
  }

  function findBestSubarray() {
    let maxSoFar = Math.max(...maxSum);
    let tempSum = 0;
    let start = 0;
    
    for (let i = 0; i < array.length; i++) {
      tempSum = Math.max(array[i], tempSum + array[i]);
      
      if (tempSum === array[i]) {
        start = i;
      }
      
      if (tempSum === maxSoFar) {
        bestStart = start;
        bestEnd = i;
        break;
      }
    }
  }

  async function solve() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentSum = [];
    maxSum = [];
    currentIndex = -1;
    bestStart = -1;
    bestEnd = -1;
    maxSumLabel.textContent = 'Max Sum: —';
    
    renderArray();
    renderSteps();
    
    for (let i = 0; i < array.length; i++) {
      currentIndex = i;
      
      if (i === 0) {
        currentSum[i] = array[i];
        maxSum[i] = array[i];
      } else {
        currentSum[i] = Math.max(array[i], currentSum[i-1] + array[i]);
        maxSum[i] = Math.max(maxSum[i-1], currentSum[i]);
      }
      
      renderArray();
      renderSteps();
      
      if (i === array.length - 1) {
        maxSumLabel.textContent = `Max Sum: ${maxSum[i]}`;
        findBestSubarray();
        renderArray();
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    isAnimating = false;
  }

  function reset() {
    currentSum = [];
    maxSum = [];
    currentIndex = -1;
    bestStart = -1;
    bestEnd = -1;
    maxSumLabel.textContent = 'Max Sum: —';
    renderArray();
    renderSteps();
  }

  generateBtn.onclick = () => {
    if (isAnimating) return;
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 21) - 10);
    reset();
  };

  solveBtn.onclick = solve;
  resetBtn.onclick = reset;
  
  renderArray();
  renderSteps();
}

function renderBinaryTreeVisual(main, state, topic, item) {
  main.innerHTML = `
    <div class="game-header">
      <h3>Binary Tree Basics</h3>
      <p>Interactive binary tree structure and basic operations</p>
    </div>
    
    <div style="display: flex; gap: 20px;">
      <div class="tree-controls" style="min-width: 250px;">
        <div class="section">
          <h4>Tree Operations</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <input type="number" id="nodeValue" placeholder="Node value" min="1" max="99">
            <button id="insertBtn" class="primary">Insert Node</button>
            <button id="searchBtn" class="secondary">Search Node</button>
            <button id="deleteBtn" class="danger">Delete Node</button>
          </div>
        </div>
        
        <div class="section">
          <h4>Tree Stats</h4>
          <div class="stats">
            <div><strong>Height:</strong> <span id="treeHeight">0</span></div>
            <div><strong>Nodes:</strong> <span id="nodeCount">0</span></div>
            <div><strong>Leaves:</strong> <span id="leafCount">0</span></div>
          </div>
        </div>
        
        <div class="section">
          <h4>Operations</h4>
          <button id="clearTreeBtn" class="danger">Clear Tree</button>
          <button id="generateTreeBtn" class="secondary">Generate Sample Tree</button>
        </div>
      </div>
      
      <div class="tree-visual" style="flex: 1; min-height: 500px; border: 1px solid var(--border); border-radius: 8px; padding: 20px; overflow: auto; background: white;">
        <div id="treeContainer" style="position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
          <div id="emptyMessage" style="color: var(--muted); font-size: 18px; text-align: center; margin-top: 100px;">
            Tree is empty. Insert nodes to visualize the structure.
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .tree-node {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
      }
      
      .tree-node.highlight {
        background: var(--error);
        transform: scale(1.2);
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
      }
      
      .tree-node.found {
        background: var(--success);
        animation: pulse 1s infinite;
      }
      
      .tree-edge {
        position: absolute;
        background: var(--border);
        height: 2px;
        transform-origin: left center;
        z-index: 1;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      .stats {
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--bg-secondary);
        padding: 12px;
        border-radius: 6px;
      }
    </style>
  `;

  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let root = null;
  
  const nodeValueInput = document.getElementById('nodeValue');
  const insertBtn = document.getElementById('insertBtn');
  const searchBtn = document.getElementById('searchBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const clearTreeBtn = document.getElementById('clearTreeBtn');
  const generateTreeBtn = document.getElementById('generateTreeBtn');
  
  const treeHeightEl = document.getElementById('treeHeight');
  const nodeCountEl = document.getElementById('nodeCount');
  const leafCountEl = document.getElementById('leafCount');
  const treeContainer = document.getElementById('treeContainer');
  const emptyMessage = document.getElementById('emptyMessage');

  function insertNode(value) {
    if (root === null) {
      root = new TreeNode(value);
    } else {
      insertRecursive(root, value);
    }
    renderTree();
    updateStats();
  }

  function insertRecursive(node, value) {
    if (value < node.val) {
      if (node.left === null) {
        node.left = new TreeNode(value);
      } else {
        insertRecursive(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TreeNode(value);
      } else {
        insertRecursive(node.right, value);
      }
    }
  }

  function searchNode(value) {
    const path = [];
    const found = searchRecursive(root, value, path);
    visualizeSearch(path, found);
    return found;
  }

  function searchRecursive(node, value, path) {
    if (node === null) return false;
    
    path.push(node);
    
    if (node.val === value) return true;
    
    if (value < node.val) {
      return searchRecursive(node.left, value, path);
    } else {
      return searchRecursive(node.right, value, path);
    }
  }

  async function visualizeSearch(path, found) {
    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      const nodeEl = document.querySelector(`[data-value="${node.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('highlight');
        await new Promise(resolve => setTimeout(resolve, 800));
        nodeEl.classList.remove('highlight');
      }
    }
    
    if (found && path.length > 0) {
      const lastNode = path[path.length - 1];
      const nodeEl = document.querySelector(`[data-value="${lastNode.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('found');
        setTimeout(() => nodeEl.classList.remove('found'), 2000);
      }
    }
  }

  function getTreeHeight(node) {
    if (node === null) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  }

  function getNodeCount(node) {
    if (node === null) return 0;
    return 1 + getNodeCount(node.left) + getNodeCount(node.right);
  }

  function getLeafCount(node) {
    if (node === null) return 0;
    if (node.left === null && node.right === null) return 1;
    return getLeafCount(node.left) + getLeafCount(node.right);
  }

  function updateStats() {
    treeHeightEl.textContent = getTreeHeight(root);
    nodeCountEl.textContent = getNodeCount(root);
    leafCountEl.textContent = getLeafCount(root);
  }

  function renderTree() {
    treeContainer.innerHTML = '';
    
    if (root === null) {
      emptyMessage.style.display = 'block';
      treeContainer.appendChild(emptyMessage);
      return;
    }
    
    emptyMessage.style.display = 'none';
    
    const nodePositions = new Map();
    const levelWidth = 80;
    const levelHeight = 80;
    
    // Calculate positions
    function calculatePositions(node, level, position, minX, maxX) {
      if (node === null) return position;
      
      const x = (minX + maxX) / 2;
      const y = level * levelHeight + 50;
      
      nodePositions.set(node, { x, y });
      
      const leftBound = minX;
      const rightBound = maxX;
      const midX = x;
      
      if (node.left) {
        calculatePositions(node.left, level + 1, position, leftBound, midX);
      }
      if (node.right) {
        calculatePositions(node.right, level + 1, position, midX, rightBound);
      }
      
      return position + 1;
    }
    
    calculatePositions(root, 0, 0, -300, 300);
    
    // Render edges first
    function renderEdges(node) {
      if (node === null) return;
      
      const pos = nodePositions.get(node);
      
      if (node.left) {
        const leftPos = nodePositions.get(node.left);
        const edge = document.createElement('div');
        edge.className = 'tree-edge';
        edge.style.left = (pos.x + 20) + 'px';
        edge.style.top = (pos.y + 20) + 'px';
        
        const dx = leftPos.x - pos.x;
        const dy = leftPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        treeContainer.appendChild(edge);
        renderEdges(node.left);
      }
      
      if (node.right) {
        const rightPos = nodePositions.get(node.right);
        const edge = document.createElement('div');
        edge.className = 'tree-edge';
        edge.style.left = (pos.x + 20) + 'px';
        edge.style.top = (pos.y + 20) + 'px';
        
        const dx = rightPos.x - pos.x;
        const dy = rightPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        treeContainer.appendChild(edge);
        renderEdges(node.right);
      }
    }
    
    renderEdges(root);
    
    // Render nodes
    function renderNodes(node) {
      if (node === null) return;
      
      const pos = nodePositions.get(node);
      const nodeEl = document.createElement('div');
      nodeEl.className = 'tree-node';
      nodeEl.textContent = node.val;
      nodeEl.setAttribute('data-value', node.val);
      nodeEl.style.left = pos.x + 'px';
      nodeEl.style.top = pos.y + 'px';
      
      treeContainer.appendChild(nodeEl);
      
      renderNodes(node.left);
      renderNodes(node.right);
    }
    
    renderNodes(root);
  }

  function clearTree() {
    root = null;
    renderTree();
    updateStats();
  }

  function generateSampleTree() {
    clearTree();
    const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
    values.forEach(val => insertNode(val));
  }

  insertBtn.onclick = () => {
    const value = parseInt(nodeValueInput.value);
    if (isNaN(value) || value < 1 || value > 99) return;
    
    insertNode(value);
    nodeValueInput.value = '';
  };

  searchBtn.onclick = () => {
    const value = parseInt(nodeValueInput.value);
    if (isNaN(value)) return;
    
    searchNode(value);
  };

  clearTreeBtn.onclick = clearTree;
  generateTreeBtn.onclick = generateSampleTree;

  nodeValueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') insertBtn.click();
  });

  generateSampleTree();
}

function renderBSTOperationsVisual(main, state, topic, item) {
  main.innerHTML = `
    <div class="game-header">
      <h3>BST Operations: Search, Insert, Delete</h3>
      <p>Interactive visualization of Binary Search Tree operations</p>
    </div>
    
    <div style="display: flex; gap: 20px;">
      <div class="bst-controls" style="min-width: 280px;">
        <div class="section">
          <h4>BST Operations</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <input type="number" id="bstValue" placeholder="Value (1-99)" min="1" max="99">
            <button id="bstInsertBtn" class="primary">Insert</button>
            <button id="bstSearchBtn" class="secondary">Search</button>
            <button id="bstDeleteBtn" class="danger">Delete</button>
          </div>
        </div>
        
        <div class="section">
          <h4>BST Properties</h4>
          <div class="stats">
            <div><strong>Height:</strong> <span id="bstHeight">0</span></div>
            <div><strong>Nodes:</strong> <span id="bstNodeCount">0</span></div>
            <div><strong>Min Value:</strong> <span id="bstMinValue">—</span></div>
            <div><strong>Max Value:</strong> <span id="bstMaxValue">—</span></div>
          </div>
        </div>
        
        <div class="section">
          <h4>Validation</h4>
          <div id="bstValidation" style="padding: 8px; border-radius: 4px; font-weight: bold;">
            Valid BST ✓
          </div>
        </div>
        
        <div class="section">
          <button id="clearBSTBtn" class="danger">Clear BST</button>
          <button id="generateBSTBtn" class="secondary">Generate Sample BST</button>
        </div>
      </div>
      
      <div class="bst-visual" style="flex: 1; min-height: 500px; border: 1px solid var(--border); border-radius: 8px; padding: 20px; overflow: auto; background: white;">
        <div id="bstContainer" style="position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
          <div id="bstEmptyMessage" style="color: var(--muted); font-size: 18px; text-align: center; margin-top: 100px;">
            BST is empty. Insert nodes to visualize the structure.
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .bst-node {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
        font-size: 14px;
      }
      
      .bst-node.searching {
        background: var(--warning);
        transform: scale(1.2);
        box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
      }
      
      .bst-node.found {
        background: var(--success);
        animation: bst-pulse 1s infinite;
      }
      
      .bst-node.inserting {
        background: var(--info);
        transform: scale(1.3);
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.5);
      }
      
      .bst-node.deleting {
        background: var(--error);
        transform: scale(1.1);
        animation: bst-shake 0.5s ease-in-out infinite;
      }
      
      .bst-edge {
        position: absolute;
        background: var(--border);
        height: 2px;
        transform-origin: left center;
        z-index: 1;
      }
      
      .bst-edge.highlight {
        background: var(--primary);
        height: 3px;
      }
      
      @keyframes bst-pulse {
        0%, 100% { transform: scale(1.2); }
        50% { transform: scale(1.4); }
      }
      
      @keyframes bst-shake {
        0%, 100% { transform: translateX(0) scale(1.1); }
        25% { transform: translateX(-2px) scale(1.1); }
        75% { transform: translateX(2px) scale(1.1); }
      }
      
      .stats {
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--bg-secondary);
        padding: 12px;
        border-radius: 6px;
      }
    </style>
  `;

  class BSTNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let bstRoot = null;
  
  const bstValueInput = document.getElementById('bstValue');
  const bstInsertBtn = document.getElementById('bstInsertBtn');
  const bstSearchBtn = document.getElementById('bstSearchBtn');
  const bstDeleteBtn = document.getElementById('bstDeleteBtn');
  const clearBSTBtn = document.getElementById('clearBSTBtn');
  const generateBSTBtn = document.getElementById('generateBSTBtn');
  
  const bstHeightEl = document.getElementById('bstHeight');
  const bstNodeCountEl = document.getElementById('bstNodeCount');
  const bstMinValueEl = document.getElementById('bstMinValue');
  const bstMaxValueEl = document.getElementById('bstMaxValue');
  const bstValidationEl = document.getElementById('bstValidation');
  const bstContainer = document.getElementById('bstContainer');
  const bstEmptyMessage = document.getElementById('bstEmptyMessage');

  function insertBSTNode(value) {
    if (bstRoot === null) {
      bstRoot = new BSTNode(value);
    } else {
      insertBSTRecursive(bstRoot, value);
    }
    renderBST();
    updateBSTStats();
  }

  function insertBSTRecursive(node, value) {
    if (value < node.val) {
      if (node.left === null) {
        node.left = new BSTNode(value);
      } else {
        insertBSTRecursive(node.left, value);
      }
    } else if (value > node.val) {
      if (node.right === null) {
        node.right = new BSTNode(value);
      } else {
        insertBSTRecursive(node.right, value);
      }
    }
  }

  async function searchBSTNode(value) {
    const path = [];
    const found = searchBSTRecursive(bstRoot, value, path);
    await visualizeBSTSearch(path, found, value);
    return found;
  }

  function searchBSTRecursive(node, value, path) {
    if (node === null) return false;
    
    path.push(node);
    
    if (node.val === value) return true;
    
    if (value < node.val) {
      return searchBSTRecursive(node.left, value, path);
    } else {
      return searchBSTRecursive(node.right, value, path);
    }
  }

  async function visualizeBSTSearch(path, found, searchValue) {
    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      const nodeEl = document.querySelector(`[data-bst-value="${node.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('searching');
        
        if (i < path.length - 1 || !found) {
          const comparison = searchValue < node.val ? 'Go Left' : searchValue > node.val ? 'Go Right' : 'Found!';
          nodeEl.title = `${searchValue} vs ${node.val}: ${comparison}`;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1200));
        nodeEl.classList.remove('searching');
      }
    }
    
    if (found && path.length > 0) {
      const lastNode = path[path.length - 1];
      const nodeEl = document.querySelector(`[data-bst-value="${lastNode.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('found');
        setTimeout(() => nodeEl.classList.remove('found'), 3000);
      }
    }
  }

  function deleteBSTNode(value) {
    bstRoot = deleteBSTRecursive(bstRoot, value);
    renderBST();
    updateBSTStats();
  }

  function deleteBSTRecursive(node, value) {
    if (node === null) return null;
    
    if (value < node.val) {
      node.left = deleteBSTRecursive(node.left, value);
    } else if (value > node.val) {
      node.right = deleteBSTRecursive(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      
      node.val = successor.val;
      node.right = deleteBSTRecursive(node.right, successor.val);
    }
    
    return node;
  }

  function getBSTHeight(node) {
    if (node === null) return 0;
    return 1 + Math.max(getBSTHeight(node.left), getBSTHeight(node.right));
  }

  function getBSTNodeCount(node) {
    if (node === null) return 0;
    return 1 + getBSTNodeCount(node.left) + getBSTNodeCount(node.right);
  }

  function getBSTMinValue(node) {
    if (node === null) return null;
    while (node.left !== null) {
      node = node.left;
    }
    return node.val;
  }

  function getBSTMaxValue(node) {
    if (node === null) return null;
    while (node.right !== null) {
      node = node.right;
    }
    return node.val;
  }

  function validateBST(node, min = null, max = null) {
    if (node === null) return true;
    
    if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
      return false;
    }
    
    return validateBST(node.left, min, node.val) && validateBST(node.right, node.val, max);
  }

  function updateBSTStats() {
    bstHeightEl.textContent = getBSTHeight(bstRoot);
    bstNodeCountEl.textContent = getBSTNodeCount(bstRoot);
    
    const minVal = getBSTMinValue(bstRoot);
    const maxVal = getBSTMaxValue(bstRoot);
    bstMinValueEl.textContent = minVal !== null ? minVal : '—';
    bstMaxValueEl.textContent = maxVal !== null ? maxVal : '—';
    
    const isValid = validateBST(bstRoot);
    bstValidationEl.textContent = isValid ? 'Valid BST ✓' : 'Invalid BST ✗';
    bstValidationEl.style.background = isValid ? 'var(--success-bg)' : 'var(--error-bg)';
    bstValidationEl.style.color = isValid ? 'var(--success)' : 'var(--error)';
  }

  function renderBST() {
    bstContainer.innerHTML = '';
    
    if (bstRoot === null) {
      bstEmptyMessage.style.display = 'block';
      bstContainer.appendChild(bstEmptyMessage);
      return;
    }
    
    bstEmptyMessage.style.display = 'none';
    
    const bstNodePositions = new Map();
    const levelHeight = 90;
    
    function calculateBSTPositions(node, level, minX, maxX) {
      if (node === null) return;
      
      const x = (minX + maxX) / 2;
      const y = level * levelHeight + 50;
      
      bstNodePositions.set(node, { x, y });
      
      const midX = x;
      
      if (node.left) {
        calculateBSTPositions(node.left, level + 1, minX, midX);
      }
      if (node.right) {
        calculateBSTPositions(node.right, level + 1, midX, maxX);
      }
    }
    
    calculateBSTPositions(bstRoot, 0, -400, 400);
    
    function renderBSTEdges(node) {
      if (node === null) return;
      
      const pos = bstNodePositions.get(node);
      
      if (node.left) {
        const leftPos = bstNodePositions.get(node.left);
        const edge = document.createElement('div');
        edge.className = 'bst-edge';
        edge.style.left = (pos.x + 25) + 'px';
        edge.style.top = (pos.y + 25) + 'px';
        
        const dx = leftPos.x - pos.x;
        const dy = leftPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        bstContainer.appendChild(edge);
        renderBSTEdges(node.left);
      }
      
      if (node.right) {
        const rightPos = bstNodePositions.get(node.right);
        const edge = document.createElement('div');
        edge.className = 'bst-edge';
        edge.style.left = (pos.x + 25) + 'px';
        edge.style.top = (pos.y + 25) + 'px';
        
        const dx = rightPos.x - pos.x;
        const dy = rightPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        bstContainer.appendChild(edge);
        renderBSTEdges(node.right);
      }
    }
    
    renderBSTEdges(bstRoot);
    
    function renderBSTNodes(node) {
      if (node === null) return;
      
      const pos = bstNodePositions.get(node);
      const nodeEl = document.createElement('div');
      nodeEl.className = 'bst-node';
      nodeEl.textContent = node.val;
      nodeEl.setAttribute('data-bst-value', node.val);
      nodeEl.style.left = pos.x + 'px';
      nodeEl.style.top = pos.y + 'px';
      
      bstContainer.appendChild(nodeEl);
      
      renderBSTNodes(node.left);
      renderBSTNodes(node.right);
    }
    
    renderBSTNodes(bstRoot);
  }

  function clearBST() {
    bstRoot = null;
    renderBST();
    updateBSTStats();
  }

  function generateSampleBST() {
    clearBST();
    const values = [50, 30, 70, 20, 40, 60, 80, 15, 25, 35, 45];
    values.forEach(val => insertBSTNode(val));
  }

  bstInsertBtn.onclick = () => {
    const value = parseInt(bstValueInput.value);
    if (isNaN(value) || value < 1 || value > 99) return;
    
    insertBSTNode(value);
    bstValueInput.value = '';
  };

  bstSearchBtn.onclick = () => {
    const value = parseInt(bstValueInput.value);
    if (isNaN(value)) return;
    
    searchBSTNode(value);
  };

  bstDeleteBtn.onclick = () => {
    const value = parseInt(bstValueInput.value);
    if (isNaN(value)) return;
    
    deleteBSTNode(value);
    bstValueInput.value = '';
  };

  clearBSTBtn.onclick = clearBST;
  generateBSTBtn.onclick = generateSampleBST;

  bstValueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        bstSearchBtn.click();
      } else {
        bstInsertBtn.click();
      }
    }
  });

  generateSampleBST();
}

function renderTreeTraversalsVisual(main, state, topic, item) {
  main.innerHTML = `
    <div class="game-header">
      <h3>Tree Traversals: Inorder, Preorder, Postorder, Level Order</h3>
      <p>Interactive visualization of tree traversal algorithms</p>
    </div>
    
    <div style="display: flex; gap: 20px;">
      <div class="traversal-controls" style="min-width: 300px;">
        <div class="section">
          <h4>Traversal Methods</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button id="inorderBtn" class="primary">Inorder (L→R→R)</button>
            <button id="preorderBtn" class="secondary">Preorder (R→L→R)</button>
            <button id="postorderBtn" class="info">Postorder (L→R→R)</button>
            <button id="levelorderBtn" class="warning">Level Order (BFS)</button>
          </div>
        </div>
        
        <div class="section">
          <h4>Traversal Results</h4>
          <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px;">
            <div><strong>Order:</strong> <span id="traversalResult">—</span></div>
            <div><strong>Type:</strong> <span id="traversalType">—</span></div>
          </div>
        </div>
        
        <div class="section">
          <h4>Tree Management</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <input type="number" id="treeValue" placeholder="Node value" min="1" max="99">
            <button id="addNodeBtn" class="primary">Add Node</button>
            <button id="resetTreeBtn" class="danger">Reset Tree</button>
            <button id="generateTreeBtn" class="secondary">Generate Sample</button>
          </div>
        </div>
        
        <div class="section">
          <h4>Animation Control</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button id="pauseBtn" class="secondary" disabled>Pause</button>
            <div>Speed: <input type="range" id="speedSlider" min="100" max="2000" value="800" style="width: 100%;"></div>
          </div>
        </div>
      </div>
      
      <div class="traversal-visual" style="flex: 1; min-height: 500px; border: 1px solid var(--border); border-radius: 8px; padding: 20px; overflow: auto; background: white;">
        <div id="traversalContainer" style="position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
          <div id="traversalEmptyMessage" style="color: var(--muted); font-size: 18px; text-align: center; margin-top: 100px;">
            Tree is empty. Add nodes to visualize traversals.
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .traversal-node {
        position: absolute;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
        font-size: 14px;
      }
      
      .traversal-node.visiting {
        background: var(--warning);
        transform: scale(1.3);
        box-shadow: 0 0 25px rgba(251, 191, 36, 0.6);
        animation: traversal-pulse 0.8s ease-in-out;
      }
      
      .traversal-node.visited {
        background: var(--success);
        transform: scale(1.1);
      }
      
      .traversal-node.current {
        background: var(--error);
        transform: scale(1.4);
        box-shadow: 0 0 30px rgba(239, 68, 68, 0.7);
        animation: traversal-glow 1s infinite;
      }
      
      .traversal-edge {
        position: absolute;
        background: var(--border);
        height: 2px;
        transform-origin: left center;
        z-index: 1;
        transition: all 0.3s ease;
      }
      
      .traversal-edge.active {
        background: var(--primary);
        height: 3px;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
      }
      
      @keyframes traversal-pulse {
        0%, 100% { transform: scale(1.3); }
        50% { transform: scale(1.5); }
      }
      
      @keyframes traversal-glow {
        0%, 100% { 
          transform: scale(1.4); 
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.7);
        }
        50% { 
          transform: scale(1.5); 
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.9);
        }
      }
    </style>
  `;

  class TraversalNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let traversalRoot = null;
  let isTraversing = false;
  let isPaused = false;
  let animationSpeed = 800;
  
  const inorderBtn = document.getElementById('inorderBtn');
  const preorderBtn = document.getElementById('preorderBtn');
  const postorderBtn = document.getElementById('postorderBtn');
  const levelorderBtn = document.getElementById('levelorderBtn');
  const treeValueInput = document.getElementById('treeValue');
  const addNodeBtn = document.getElementById('addNodeBtn');
  const resetTreeBtn = document.getElementById('resetTreeBtn');
  const generateTreeBtn = document.getElementById('generateTreeBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const speedSlider = document.getElementById('speedSlider');
  const traversalResultEl = document.getElementById('traversalResult');
  const traversalTypeEl = document.getElementById('traversalType');
  const traversalContainer = document.getElementById('traversalContainer');
  const traversalEmptyMessage = document.getElementById('traversalEmptyMessage');

  function addTraversalNode(value) {
    if (traversalRoot === null) {
      traversalRoot = new TraversalNode(value);
    } else {
      addTraversalRecursive(traversalRoot, value);
    }
    renderTraversalTree();
  }

  function addTraversalRecursive(node, value) {
    if (value < node.val) {
      if (node.left === null) {
        node.left = new TraversalNode(value);
      } else {
        addTraversalRecursive(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TraversalNode(value);
      } else {
        addTraversalRecursive(node.right, value);
      }
    }
  }

  async function inorderTraversal() {
    if (isTraversing) return;
    isTraversing = true;
    isPaused = false;
    
    const result = [];
    traversalTypeEl.textContent = 'Inorder (Left → Root → Right)';
    traversalResultEl.textContent = '';
    
    resetNodeStates();
    
    async function inorder(node) {
      if (node === null || isPaused) return;
      
      // Highlight current node
      const nodeEl = document.querySelector(`[data-traversal-value="${node.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('current');
        await sleep(animationSpeed);
        if (isPaused) return;
      }
      
      // Traverse left
      if (node.left) {
        const leftEdge = getEdge(node, node.left);
        if (leftEdge) leftEdge.classList.add('active');
        await inorder(node.left);
        if (leftEdge) leftEdge.classList.remove('active');
        if (isPaused) return;
      }
      
      // Visit root
      if (nodeEl) {
        nodeEl.classList.remove('current');
        nodeEl.classList.add('visiting');
        result.push(node.val);
        traversalResultEl.textContent = result.join(', ');
        await sleep(animationSpeed);
        nodeEl.classList.remove('visiting');
        nodeEl.classList.add('visited');
        if (isPaused) return;
      }
      
      // Traverse right
      if (node.right) {
        const rightEdge = getEdge(node, node.right);
        if (rightEdge) rightEdge.classList.add('active');
        await inorder(node.right);
        if (rightEdge) rightEdge.classList.remove('active');
      }
    }
    
    await inorder(traversalRoot);
    isTraversing = false;
    pauseBtn.disabled = true;
  }

  async function preorderTraversal() {
    if (isTraversing) return;
    isTraversing = true;
    isPaused = false;
    
    const result = [];
    traversalTypeEl.textContent = 'Preorder (Root → Left → Right)';
    traversalResultEl.textContent = '';
    
    resetNodeStates();
    
    async function preorder(node) {
      if (node === null || isPaused) return;
      
      const nodeEl = document.querySelector(`[data-traversal-value="${node.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('current');
        await sleep(animationSpeed);
        if (isPaused) return;
        
        // Visit root first
        nodeEl.classList.remove('current');
        nodeEl.classList.add('visiting');
        result.push(node.val);
        traversalResultEl.textContent = result.join(', ');
        await sleep(animationSpeed);
        nodeEl.classList.remove('visiting');
        nodeEl.classList.add('visited');
        if (isPaused) return;
      }
      
      // Traverse left
      if (node.left) {
        const leftEdge = getEdge(node, node.left);
        if (leftEdge) leftEdge.classList.add('active');
        await preorder(node.left);
        if (leftEdge) leftEdge.classList.remove('active');
        if (isPaused) return;
      }
      
      // Traverse right
      if (node.right) {
        const rightEdge = getEdge(node, node.right);
        if (rightEdge) rightEdge.classList.add('active');
        await preorder(node.right);
        if (rightEdge) rightEdge.classList.remove('active');
      }
    }
    
    await preorder(traversalRoot);
    isTraversing = false;
    pauseBtn.disabled = true;
  }

  async function postorderTraversal() {
    if (isTraversing) return;
    isTraversing = true;
    isPaused = false;
    
    const result = [];
    traversalTypeEl.textContent = 'Postorder (Left → Right → Root)';
    traversalResultEl.textContent = '';
    
    resetNodeStates();
    
    async function postorder(node) {
      if (node === null || isPaused) return;
      
      const nodeEl = document.querySelector(`[data-traversal-value="${node.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('current');
        await sleep(animationSpeed);
        if (isPaused) return;
        nodeEl.classList.remove('current');
      }
      
      // Traverse left
      if (node.left) {
        const leftEdge = getEdge(node, node.left);
        if (leftEdge) leftEdge.classList.add('active');
        await postorder(node.left);
        if (leftEdge) leftEdge.classList.remove('active');
        if (isPaused) return;
      }
      
      // Traverse right
      if (node.right) {
        const rightEdge = getEdge(node, node.right);
        if (rightEdge) rightEdge.classList.add('active');
        await postorder(node.right);
        if (rightEdge) rightEdge.classList.remove('active');
        if (isPaused) return;
      }
      
      // Visit root last
      if (nodeEl) {
        nodeEl.classList.add('visiting');
        result.push(node.val);
        traversalResultEl.textContent = result.join(', ');
        await sleep(animationSpeed);
        nodeEl.classList.remove('visiting');
        nodeEl.classList.add('visited');
      }
    }
    
    await postorder(traversalRoot);
    isTraversing = false;
    pauseBtn.disabled = true;
  }

  async function levelOrderTraversal() {
    if (isTraversing || traversalRoot === null) return;
    isTraversing = true;
    isPaused = false;
    
    const result = [];
    traversalTypeEl.textContent = 'Level Order (Breadth-First Search)';
    traversalResultEl.textContent = '';
    
    resetNodeStates();
    
    const queue = [traversalRoot];
    
    while (queue.length > 0 && !isPaused) {
      const node = queue.shift();
      
      const nodeEl = document.querySelector(`[data-traversal-value="${node.val}"]`);
      if (nodeEl) {
        nodeEl.classList.add('current');
        await sleep(animationSpeed);
        if (isPaused) break;
        
        nodeEl.classList.remove('current');
        nodeEl.classList.add('visiting');
        result.push(node.val);
        traversalResultEl.textContent = result.join(', ');
        await sleep(animationSpeed);
        nodeEl.classList.remove('visiting');
        nodeEl.classList.add('visited');
        if (isPaused) break;
      }
      
      if (node.left) {
        queue.push(node.left);
        const leftEdge = getEdge(node, node.left);
        if (leftEdge) {
          leftEdge.classList.add('active');
          setTimeout(() => leftEdge.classList.remove('active'), animationSpeed * 2);
        }
      }
      
      if (node.right) {
        queue.push(node.right);
        const rightEdge = getEdge(node, node.right);
        if (rightEdge) {
          rightEdge.classList.add('active');
          setTimeout(() => rightEdge.classList.remove('active'), animationSpeed * 2);
        }
      }
    }
    
    isTraversing = false;
    pauseBtn.disabled = true;
  }

  function getEdge(parent, child) {
    return document.querySelector(`[data-edge="${parent.val}-${child.val}"]`);
  }

  function resetNodeStates() {
    document.querySelectorAll('.traversal-node').forEach(node => {
      node.classList.remove('current', 'visiting', 'visited');
    });
    document.querySelectorAll('.traversal-edge').forEach(edge => {
      edge.classList.remove('active');
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function renderTraversalTree() {
    traversalContainer.innerHTML = '';
    
    if (traversalRoot === null) {
      traversalEmptyMessage.style.display = 'block';
      traversalContainer.appendChild(traversalEmptyMessage);
      return;
    }
    
    traversalEmptyMessage.style.display = 'none';
    
    const nodePositions = new Map();
    const levelHeight = 90;
    
    function calculatePositions(node, level, minX, maxX) {
      if (node === null) return;
      
      const x = (minX + maxX) / 2;
      const y = level * levelHeight + 50;
      
      nodePositions.set(node, { x, y });
      
      const midX = x;
      
      if (node.left) {
        calculatePositions(node.left, level + 1, minX, midX);
      }
      if (node.right) {
        calculatePositions(node.right, level + 1, midX, maxX);
      }
    }
    
    calculatePositions(traversalRoot, 0, -400, 400);
    
    function renderEdges(node) {
      if (node === null) return;
      
      const pos = nodePositions.get(node);
      
      if (node.left) {
        const leftPos = nodePositions.get(node.left);
        const edge = document.createElement('div');
        edge.className = 'traversal-edge';
        edge.setAttribute('data-edge', `${node.val}-${node.left.val}`);
        edge.style.left = (pos.x + 22.5) + 'px';
        edge.style.top = (pos.y + 22.5) + 'px';
        
        const dx = leftPos.x - pos.x;
        const dy = leftPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        traversalContainer.appendChild(edge);
        renderEdges(node.left);
      }
      
      if (node.right) {
        const rightPos = nodePositions.get(node.right);
        const edge = document.createElement('div');
        edge.className = 'traversal-edge';
        edge.setAttribute('data-edge', `${node.val}-${node.right.val}`);
        edge.style.left = (pos.x + 22.5) + 'px';
        edge.style.top = (pos.y + 22.5) + 'px';
        
        const dx = rightPos.x - pos.x;
        const dy = rightPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        traversalContainer.appendChild(edge);
        renderEdges(node.right);
      }
    }
    
    renderEdges(traversalRoot);
    
    function renderNodes(node) {
      if (node === null) return;
      
      const pos = nodePositions.get(node);
      const nodeEl = document.createElement('div');
      nodeEl.className = 'traversal-node';
      nodeEl.textContent = node.val;
      nodeEl.setAttribute('data-traversal-value', node.val);
      nodeEl.style.left = pos.x + 'px';
      nodeEl.style.top = pos.y + 'px';
      
      traversalContainer.appendChild(nodeEl);
      
      renderNodes(node.left);
      renderNodes(node.right);
    }
    
    renderNodes(traversalRoot);
  }

  function resetTraversalTree() {
    traversalRoot = null;
    renderTraversalTree();
    traversalResultEl.textContent = '—';
    traversalTypeEl.textContent = '—';
  }

  function generateSampleTraversalTree() {
    resetTraversalTree();
    const values = [50, 30, 70, 20, 40, 60, 80];
    values.forEach(val => addTraversalNode(val));
  }

  inorderBtn.onclick = () => {
    if (!isTraversing) {
      pauseBtn.disabled = false;
      inorderTraversal();
    }
  };

  preorderBtn.onclick = () => {
    if (!isTraversing) {
      pauseBtn.disabled = false;
      preorderTraversal();
    }
  };

  postorderBtn.onclick = () => {
    if (!isTraversing) {
      pauseBtn.disabled = false;
      postorderTraversal();
    }
  };

  levelorderBtn.onclick = () => {
    if (!isTraversing) {
      pauseBtn.disabled = false;
      levelOrderTraversal();
    }
  };

  addNodeBtn.onclick = () => {
    const value = parseInt(treeValueInput.value);
    if (isNaN(value) || value < 1 || value > 99) return;
    
    addTraversalNode(value);
    treeValueInput.value = '';
  };

  resetTreeBtn.onclick = resetTraversalTree;
  generateTreeBtn.onclick = generateSampleTraversalTree;

  pauseBtn.onclick = () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
  };

  speedSlider.oninput = () => {
    animationSpeed = parseInt(speedSlider.value);
  };

  treeValueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNodeBtn.click();
  });

  generateSampleTraversalTree();
}

function renderValidateBSTVisual(main, state, topic, item) {
  main.innerHTML = `
    <div class="game-header">
      <h3>BST Validation: Check if Binary Tree is Valid BST</h3>
      <p>Interactive visualization of BST validation with range checking</p>
    </div>
    
    <div style="display: flex; gap: 20px;">
      <div class="validate-controls" style="min-width: 300px;">
        <div class="section">
          <h4>Tree Building</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <input type="number" id="validateValue" placeholder="Node value" min="1" max="99">
            <button id="addValidateNodeBtn" class="primary">Add Node</button>
            <button id="removeValidateNodeBtn" class="danger">Remove Node</button>
          </div>
        </div>
        
        <div class="section">
          <h4>Validation</h4>
          <button id="validateBSTBtn" class="secondary" style="width: 100%; margin-bottom: 12px;">Validate BST</button>
          <div id="validationResult" style="padding: 12px; border-radius: 6px; font-weight: bold; text-align: center;">
            Ready to validate
          </div>
        </div>
        
        <div class="section">
          <h4>Test Cases</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button id="validBSTBtn" class="success">Generate Valid BST</button>
            <button id="invalidBSTBtn" class="warning">Generate Invalid BST</button>
            <button id="clearValidateBtn" class="danger">Clear Tree</button>
          </div>
        </div>
        
        <div class="section">
          <h4>Current Node Ranges</h4>
          <div id="rangeDisplay" style="background: var(--bg-secondary); padding: 12px; border-radius: 6px; font-size: 14px;">
            Click "Validate BST" to see range constraints
          </div>
        </div>
      </div>
      
      <div class="validate-visual" style="flex: 1; min-height: 500px; border: 1px solid var(--border); border-radius: 8px; padding: 20px; overflow: auto; background: white;">
        <div id="validateContainer" style="position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: flex-start; padding-top: 50px;">
          <div id="validateEmptyMessage" style="color: var(--muted); font-size: 18px; text-align: center; margin-top: 100px;">
            Tree is empty. Add nodes to test BST validation.
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .validate-node {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
        font-size: 14px;
      }
      
      .validate-node.checking {
        background: var(--warning);
        transform: scale(1.3);
        box-shadow: 0 0 25px rgba(251, 191, 36, 0.6);
      }
      
      .validate-node.valid {
        background: var(--success);
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
      }
      
      .validate-node.invalid {
        background: var(--error);
        transform: scale(1.2);
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
        animation: validate-shake 0.5s ease-in-out;
      }
      
      .validate-edge {
        position: absolute;
        background: var(--border);
        height: 2px;
        transform-origin: left center;
        z-index: 1;
        transition: all 0.3s ease;
      }
      
      .validate-edge.active {
        background: var(--primary);
        height: 3px;
      }
      
      .validate-edge.invalid {
        background: var(--error);
        height: 3px;
      }
      
      @keyframes validate-shake {
        0%, 100% { transform: translateX(0) scale(1.2); }
        25% { transform: translateX(-3px) scale(1.2); }
        75% { transform: translateX(3px) scale(1.2); }
      }
      
      .range-item {
        margin: 4px 0;
        padding: 4px 8px;
        background: var(--bg);
        border-radius: 4px;
        font-family: monospace;
      }
    </style>
  `;

  class ValidateNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let validateRoot = null;
  let isValidating = false;
  let nodeRanges = new Map();
  
  const validateValueInput = document.getElementById('validateValue');
  const addValidateNodeBtn = document.getElementById('addValidateNodeBtn');
  const removeValidateNodeBtn = document.getElementById('removeValidateNodeBtn');
  const validateBSTBtn = document.getElementById('validateBSTBtn');
  const validBSTBtn = document.getElementById('validBSTBtn');
  const invalidBSTBtn = document.getElementById('invalidBSTBtn');
  const clearValidateBtn = document.getElementById('clearValidateBtn');
  const validationResult = document.getElementById('validationResult');
  const rangeDisplay = document.getElementById('rangeDisplay');
  const validateContainer = document.getElementById('validateContainer');
  const validateEmptyMessage = document.getElementById('validateEmptyMessage');

  function addValidateNode(value) {
    if (validateRoot === null) {
      validateRoot = new ValidateNode(value);
    } else {
      addValidateRecursive(validateRoot, value);
    }
    renderValidateTree();
  }

  function addValidateRecursive(node, value) {
    if (value < node.val) {
      if (node.left === null) {
        node.left = new ValidateNode(value);
      } else {
        addValidateRecursive(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new ValidateNode(value);
      } else {
        addValidateRecursive(node.right, value);
      }
    }
  }

  async function validateBSTAnimation() {
    if (isValidating || validateRoot === null) return;
    isValidating = true;
    
    validationResult.textContent = 'Validating...';
    validationResult.style.background = 'var(--warning-bg)';
    validationResult.style.color = 'var(--warning)';
    
    nodeRanges.clear();
    resetValidateNodeStates();
    
    const isValid = await validateRecursive(validateRoot, null, null);
    
    validationResult.textContent = isValid ? 'Valid BST ✓' : 'Invalid BST ✗';
    validationResult.style.background = isValid ? 'var(--success-bg)' : 'var(--error-bg)';
    validationResult.style.color = isValid ? 'var(--success)' : 'var(--error)';
    
    displayNodeRanges();
    isValidating = false;
  }

  async function validateRecursive(node, minVal, maxVal) {
    if (node === null) return true;
    
    // Store range for this node
    nodeRanges.set(node.val, { min: minVal, max: maxVal });
    
    const nodeEl = document.querySelector(`[data-validate-value="${node.val}"]`);
    if (nodeEl) {
      nodeEl.classList.add('checking');
      await sleep(800);
      nodeEl.classList.remove('checking');
    }
    
    // Check if current node violates BST property
    const violatesMin = minVal !== null && node.val <= minVal;
    const violatesMax = maxVal !== null && node.val >= maxVal;
    
    if (violatesMin || violatesMax) {
      if (nodeEl) {
        nodeEl.classList.add('invalid');
        // Highlight violating edges
        if (violatesMin) {
          highlightViolatingPath(node, 'min');
        }
        if (violatesMax) {
          highlightViolatingPath(node, 'max');
        }
      }
      return false;
    }
    
    // Mark as valid so far
    if (nodeEl) {
      nodeEl.classList.add('valid');
    }
    
    // Validate left subtree
    const leftValid = await validateRecursive(node.left, minVal, node.val);
    if (!leftValid) return false;
    
    // Validate right subtree
    const rightValid = await validateRecursive(node.right, node.val, maxVal);
    if (!rightValid) return false;
    
    return true;
  }

  function highlightViolatingPath(node, violationType) {
    // This would highlight the path that led to the violation
    // For simplicity, we'll just highlight the node itself
    const nodeEl = document.querySelector(`[data-validate-value="${node.val}"]`);
    if (nodeEl) {
      nodeEl.title = `Violates ${violationType} constraint`;
    }
  }

  function displayNodeRanges() {
    let rangeHTML = '<div style="font-weight: bold; margin-bottom: 8px;">Node Ranges:</div>';
    
    for (const [nodeVal, range] of nodeRanges) {
      const minStr = range.min !== null ? range.min : '-∞';
      const maxStr = range.max !== null ? range.max : '+∞';
      rangeHTML += `<div class="range-item">Node ${nodeVal}: (${minStr}, ${maxStr})</div>`;
    }
    
    rangeDisplay.innerHTML = rangeHTML;
  }

  function resetValidateNodeStates() {
    document.querySelectorAll('.validate-node').forEach(node => {
      node.classList.remove('checking', 'valid', 'invalid');
      node.title = '';
    });
    document.querySelectorAll('.validate-edge').forEach(edge => {
      edge.classList.remove('active', 'invalid');
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function renderValidateTree() {
    validateContainer.innerHTML = '';
    
    if (validateRoot === null) {
      validateEmptyMessage.style.display = 'block';
      validateContainer.appendChild(validateEmptyMessage);
      return;
    }
    
    validateEmptyMessage.style.display = 'none';
    
    const nodePositions = new Map();
    const levelHeight = 90;
    
    function calculatePositions(node, level, minX, maxX) {
      if (node === null) return;
      
      const x = (minX + maxX) / 2;
      const y = level * levelHeight + 50;
      
      nodePositions.set(node, { x, y });
      
      const midX = x;
      
      if (node.left) {
        calculatePositions(node.left, level + 1, minX, midX);
      }
      if (node.right) {
        calculatePositions(node.right, level + 1, midX, maxX);
      }
    }
    
    calculatePositions(validateRoot, 0, -400, 400);
    
    function renderEdges(node) {
      if (node === null) return;
      
      const pos = nodePositions.get(node);
      
      if (node.left) {
        const leftPos = nodePositions.get(node.left);
        const edge = document.createElement('div');
        edge.className = 'validate-edge';
        edge.setAttribute('data-edge', `${node.val}-${node.left.val}`);
        edge.style.left = (pos.x + 25) + 'px';
        edge.style.top = (pos.y + 25) + 'px';
        
        const dx = leftPos.x - pos.x;
        const dy = leftPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        validateContainer.appendChild(edge);
        renderEdges(node.left);
      }
      
      if (node.right) {
        const rightPos = nodePositions.get(node.right);
        const edge = document.createElement('div');
        edge.className = 'validate-edge';
        edge.setAttribute('data-edge', `${node.val}-${node.right.val}`);
        edge.style.left = (pos.x + 25) + 'px';
        edge.style.top = (pos.y + 25) + 'px';
        
        const dx = rightPos.x - pos.x;
        const dy = rightPos.y - pos.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        edge.style.width = length + 'px';
        edge.style.transform = `rotate(${angle}deg)`;
        
        validateContainer.appendChild(edge);
        renderEdges(node.right);
      }
    }
    
    renderEdges(validateRoot);
    
    function renderNodes(node) {
      if (node === null) return;
      
      const pos = nodePositions.get(node);
      const nodeEl = document.createElement('div');
      nodeEl.className = 'validate-node';
      nodeEl.textContent = node.val;
      nodeEl.setAttribute('data-validate-value', node.val);
      nodeEl.style.left = pos.x + 'px';
      nodeEl.style.top = pos.y + 'px';
      
      validateContainer.appendChild(nodeEl);
      
      renderNodes(node.left);
      renderNodes(node.right);
    }
    
    renderNodes(validateRoot);
  }

  function clearValidateTree() {
    validateRoot = null;
    nodeRanges.clear();
    renderValidateTree();
    validationResult.textContent = 'Ready to validate';
    validationResult.style.background = 'var(--bg-secondary)';
    validationResult.style.color = 'var(--text)';
    rangeDisplay.textContent = 'Click "Validate BST" to see range constraints';
  }

  function generateValidBST() {
    clearValidateTree();
    const values = [50, 30, 70, 20, 40, 60, 80];
    values.forEach(val => addValidateNode(val));
  }

  function generateInvalidBST() {
    clearValidateTree();
    // Build tree manually to create invalid structure
    validateRoot = new ValidateNode(50);
    validateRoot.left = new ValidateNode(30);
    validateRoot.right = new ValidateNode(70);
    validateRoot.left.left = new ValidateNode(20);
    validateRoot.left.right = new ValidateNode(60); // Invalid: 60 > 50 but in left subtree
    renderValidateTree();
  }

  addValidateNodeBtn.onclick = () => {
    const value = parseInt(validateValueInput.value);
    if (isNaN(value) || value < 1 || value > 99) return;
    
    addValidateNode(value);
    validateValueInput.value = '';
  };

  removeValidateNodeBtn.onclick = () => {
    const value = parseInt(validateValueInput.value);
    if (isNaN(value)) return;
    
    // Simple removal - just for demo
    validateValueInput.value = '';
  };

  validateBSTBtn.onclick = validateBSTAnimation;
  validBSTBtn.onclick = generateValidBST;
  invalidBSTBtn.onclick = generateInvalidBST;
  clearValidateBtn.onclick = clearValidateTree;

  validateValueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addValidateNodeBtn.click();
  });

  generateValidBST();
}
