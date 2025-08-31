// Complete DSA Content with all implementations
// This file contains the full curriculum with learn, quiz, and practice sections

// Helper function to create standard problem structure
function createProblem(config) {
  return {
    id: config.id,
    title: config.title,
    difficulty: config.difficulty,
    brief: config.brief,
    hints: config.hints || [],
    learn: config.learn || {},
    quiz: config.quiz || [],
    practice: config.practice || {},
    game: config.game || null
  };
}

// Arrays & Two Pointers Problems
function makeArrayTwoSum() {
  return createProblem({
    id: 'two-sum',
    title: 'Two Pointers: Two Sum (Sorted)',
    difficulty: 'easy',
    brief: 'Find two numbers adding to target in a sorted array.',
    hints: [
      'Try one pointer at start and one at end.',
      'If sum is too small, move left pointer right; if too big, move right pointer left.',
      'Stop when pointers cross; ensure you justify correctness via monotonicity.'
    ],
    learn: {
      intuition: 'Use two pointers on the sorted array. The sum moves monotonically as you adjust pointers, enabling linear search.',
      visual: 'Imagine a matrix of pair sums; valid pairs lie along anti-diagonals; the two-pointer walk traces a monotone path.',
      pattern: 'Two pointers on sorted structure; shrinking window based on comparison to target.',
      template: `function twoSumSorted(nums, target) {
  let i = 0, j = nums.length - 1;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) return [i, j];
    if (sum < target) i++;
    else j--;
  }
  return [-1, -1];
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Time complexity of two-pointer approach?',
        choices: ['O(n²)', 'O(log n)', 'O(n)', 'O(n log n)'],
        answer: 2,
        explain: 'Each pointer moves at most n steps total ⇒ O(n).'
      },
      {
        type: 'sa',
        prompt: 'Key correctness idea (one phrase)?',
        accept: ['Monotonicity', 'Monotone', 'Monotonic'],
        explain: 'Sum increases as left++ and decreases as right--, enabling elimination.'
      }
    ],
    practice: {
      funcName: 'twoSumSorted',
      starter: `// Return indices [i,j] such that nums[i]+nums[j]==target; nums is sorted
function twoSumSorted(nums, target) {
  // TODO: implement two-pointer approach in O(n)
}`,
      constraints: 'n up to 10⁵; values within 32-bit; O(n) time, O(1) space.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1], n: 4 },
        { input: [[1, 2, 3, 4, 6], 10], expected: [3, 4], n: 5 },
        { input: [[1, 3, 3, 4], 6], expected: [1, 3], n: 4 }
      ],
      optimal: `function twoSumSorted(nums, target) {
  let i = 0, j = nums.length - 1;
  while (i < j) {
    const s = nums[i] + nums[j];
    if (s === target) return [i, j];
    if (s < target) i++;
    else j--;
  }
  return [-1, -1];
}`
    }
  });
}

function makeSlidingWindow() {
  return createProblem({
    id: 'sliding-window',
    title: 'Sliding Window: Longest Substring Without Repeating',
    difficulty: 'medium',
    brief: 'Find length of longest substring without repeating characters.',
    hints: [
      'Use a sliding window with a hash map of last indices.',
      'When you see a repeat, move the left bound to max(left, lastIndex+1).',
      'Track best length as you expand the window.'
    ],
    learn: {
      intuition: 'Maintain a window of unique chars. Expand right; on repeat, jump left past last occurrence.',
      visual: 'Window [L,R] over characters; map shows last index; left only moves forward.',
      pattern: 'Sliding window with hashmap to enforce constraints.',
      template: `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let best = 0, left = 0;
  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    if (last.has(ch)) {
      left = Math.max(left, last.get(ch) + 1);
    }
    last.set(ch, r);
    best = Math.max(best, r - left + 1);
  }
  return best;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the time complexity?',
        choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        answer: 0,
        explain: 'Left and right pointers each move at most n times.'
      }
    ],
    practice: {
      funcName: 'lengthOfLongestSubstring',
      starter: `function lengthOfLongestSubstring(s) {
  // TODO: implement sliding window with hashmap
}`,
      constraints: 'n up to 10⁵; ASCII characters; O(n) time.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: ['abcabcbb'], expected: 3, n: 8 },
        { input: ['bbbbb'], expected: 1, n: 5 },
        { input: ['pwwkew'], expected: 3, n: 6 }
      ]
    }
  });
}

// Binary Search Problems
function makeBinarySearch() {
  return createProblem({
    id: 'binary-search',
    title: 'Binary Search: Lower Bound',
    difficulty: 'easy',
    brief: 'Find first index >= target in sorted array.',
    hints: [
      'Maintain loop invariant: answer in [lo, hi].',
      'Bias mid to left; move hi = mid on true branch.',
      'Stop when lo == hi; verify correctness with invariant.'
    ],
    learn: {
      intuition: 'Binary search as a predicate search; keep minimal index satisfying condition.',
      visual: 'Think of true/false array segments; lower bound is the first true.',
      pattern: 'Binary search on monotone predicate.',
      template: `function lowerBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (a[mid] >= x) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Loop condition for lower bound?',
        choices: ['lo <= hi', 'lo < hi', 'lo != hi', 'while(true)'],
        answer: 1,
        explain: 'Half-open interval [lo, hi) ends when lo == hi.'
      }
    ],
    practice: {
      funcName: 'lowerBound',
      starter: `function lowerBound(a, x) {
  // TODO: implement binary search for lower bound
}`,
      constraints: 'Array sorted; O(log n) time.',
      expectedComplexity: 'O(log n)',
      tests: [
        { input: [[1, 2, 4, 4, 5], 4], expected: 2, n: 5 },
        { input: [[1, 2, 4, 4, 5], 3], expected: 2, n: 5 },
        { input: [[1, 2, 4, 4, 5], 6], expected: 5, n: 5 }
      ]
    }
  });
}

// Dynamic Programming Problems
function makeCoinChange() {
  return createProblem({
    id: 'coin-change',
    title: 'DP: Coin Change (Min Coins)',
    difficulty: 'medium',
    brief: 'Min coins to make amount using unlimited coins.',
    hints: [
      'Classic unbounded knapsack variant.',
      'Transition: dp[a] = min(dp[a], dp[a-coin]+1).',
      'Initialize dp with INF, dp[0]=0.'
    ],
    learn: {
      intuition: 'Build from 0..amount; each coin relaxes future states.',
      visual: '1D DP array; coins "paint" reachable states with minimal steps.',
      pattern: 'Bottom-up DP; unbounded transitions.',
      template: `function coinChange(coins, amount) {
  const INF = 1e9;
  const dp = new Array(amount + 1).fill(INF);
  dp[0] = 0;
  
  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  
  return dp[amount] === INF ? -1 : dp[amount];
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'DP complexity?',
        choices: ['O(n*amount)', 'O(amount)', 'O(n log amount)', 'O(n+amount)'],
        answer: 0,
        explain: 'n coins times amount states.'
      }
    ],
    practice: {
      funcName: 'coinChange',
      starter: `function coinChange(coins, amount) {
  // TODO: implement DP solution
}`,
      constraints: 'n up to 50; amount up to 10⁴.',
      expectedComplexity: 'O(n*amount)',
      tests: [
        { input: [[1, 2, 5], 11], expected: 3, n: 11 },
        { input: [[2], 3], expected: -1, n: 3 },
        { input: [[1], 0], expected: 0, n: 0 }
      ]
    }
  });
}

function makeLIS() {
  return createProblem({
    id: 'lis',
    title: 'DP: Longest Increasing Subsequence',
    difficulty: 'medium-hard',
    brief: 'Find LIS length using O(n log n) algorithm.',
    hints: [
      'Maintain tails[i] = min tail of length i+1.',
      'Binary search position of current element in tails.',
      'Length of tails is LIS length.'
    ],
    learn: {
      intuition: 'Greedy + binary search keeps best candidates compact.',
      visual: 'Tails array grows slowly; each number replaces a ceiling.',
      pattern: 'Binary search over tails to keep minimal ends.',
      template: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let i = 0, j = tails.length;
    while (i < j) {
      const m = (i + j) >> 1;
      if (tails[m] < x) i = m + 1;
      else j = m;
    }
    tails[i] = x;
  }
  return tails.length;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Time complexity?',
        choices: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
        answer: 0,
        explain: 'Binary search per element.'
      }
    ],
    practice: {
      funcName: 'lengthOfLIS',
      starter: `function lengthOfLIS(nums) {
  // TODO: implement O(n log n) solution
}`,
      constraints: 'n up to 10⁵.',
      expectedComplexity: 'O(n log n)',
      tests: [
        { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, n: 8 },
        { input: [[0, 1, 0, 3, 2, 3]], expected: 4, n: 6 }
      ]
    }
  });
}

// Graph Problems
function makeBFS() {
  return createProblem({
    id: 'bfs-shortest',
    title: 'BFS: Shortest Path (Unweighted)',
    difficulty: 'easy-medium',
    brief: 'Find shortest path length between two nodes.',
    hints: [
      'Use a queue with visited set.',
      'Push neighbors with dist+1.',
      'Stop early when target is reached.'
    ],
    learn: {
      intuition: 'In unweighted graphs, BFS explores by distance layers.',
      visual: 'Concentric layers from source; first time you see target is optimal.',
      pattern: 'Queue-based BFS with visited set.',
      template: `function shortestPath(start, target, adj) {
  const q = [[start, 0]];
  const vis = new Set([start]);
  
  while (q.length) {
    const [u, d] = q.shift();
    if (u === target) return d;
    
    for (const v of (adj[u] || [])) {
      if (!vis.has(v)) {
        vis.add(v);
        q.push([v, d + 1]);
      }
    }
  }
  return -1;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'When is BFS optimal?',
        choices: ['Unweighted graphs', 'Weighted positive', 'Weighted negative', 'DAG only'],
        answer: 0,
        explain: 'Unweighted edges imply equal cost per step.'
      }
    ],
    practice: {
      funcName: 'shortestPath',
      starter: `function shortestPath(start, target, adj) {
  // TODO: implement BFS
}`,
      constraints: 'Nodes up to 10⁵.',
      expectedComplexity: 'O(V+E)',
      tests: [
        { input: ['A', 'E', { A: ['B', 'C'], B: ['D'], C: ['D'], D: ['E'], E: [] }], expected: 3, n: 5 }
      ]
    }
  });
}

function makeUnionFind() {
  return createProblem({
    id: 'union-find',
    title: 'Union-Find: Count Components',
    difficulty: 'medium',
    brief: 'Count connected components using DSU.',
    hints: [
      'Parent + rank (union by rank).',
      'Path compression in find.',
      'Initialize count=n; decrement on successful union.'
    ],
    learn: {
      intuition: 'Merge sets efficiently; structure flattens over time.',
      visual: 'Forest of trees; unions link roots with rank heuristic.',
      pattern: 'Disjoint-set with path compression.',
      template: `function countComponents(n, edges) {
  const parent = Array(n).fill(0).map((_, i) => i);
  const rank = Array(n).fill(0);
  let count = n;
  
  const find = (a) => {
    if (parent[a] !== a) {
      parent[a] = find(parent[a]);
    }
    return parent[a];
  };
  
  const union = (a, b) => {
    a = find(a);
    b = find(b);
    if (a === b) return false;
    
    if (rank[a] < rank[b]) [a, b] = [b, a];
    parent[b] = a;
    if (rank[a] === rank[b]) rank[a]++;
    return true;
  };
  
  for (const [u, v] of edges) {
    if (union(u, v)) count--;
  }
  
  return count;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Amortized find complexity?',
        choices: ['α(n)', 'O(log n)', 'O(1)', 'O(n)'],
        answer: 0,
        explain: 'Inverse Ackermann, practically constant.'
      }
    ],
    practice: {
      funcName: 'countComponents',
      starter: `function countComponents(n, edges) {
  // TODO: implement DSU
}`,
      constraints: 'n up to 10⁵; edges up to 2×10⁵.',
      expectedComplexity: 'O(m α(n))',
      tests: [
        { input: [5, [[0, 1], [1, 2], [3, 4]]], expected: 2, n: 5 },
        { input: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]], expected: 1, n: 5 }
      ]
    }
  });
}

// Tree Problems
function makeValidateBST() {
  return createProblem({
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'easy',
    brief: 'Check BST property using bounds.',
    hints: [
      'Pass down allowable value range (min,max).',
      'Left subtree < node.val; right subtree > node.val.',
      'Null children are valid.'
    ],
    learn: {
      intuition: 'Global constraints propagate via bounds during DFS.',
      visual: 'Intervals shrink as you descend the tree.',
      pattern: 'DFS with bounds (min,max).',
      template: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Inorder traversal of BST yields?',
        choices: ['Sorted order', 'Random', 'Preorder', 'Level order'],
        answer: 0,
        explain: 'Strictly increasing for valid BST.'
      }
    ],
    practice: {
      funcName: 'isValidBST',
      starter: `function isValidBST(root, min = -Infinity, max = Infinity) {
  // TODO: implement validation
}`,
      constraints: 'Tree nodes up to 10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        {
          input: [{ val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }],
          expected: true,
          n: 3
        }
      ]
    }
  });
}

// Stack Problems
function makeValidParentheses() {
  return createProblem({
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    brief: 'Check if brackets string is valid.',
    hints: [
      'Use a stack; push opens and match on close.',
      'Early exit on mismatch; stack must end empty.',
      'Use a map of closing→opening.'
    ],
    learn: {
      intuition: 'Stack models nested structure.',
      visual: 'Pairs open/close in LIFO order.',
      pattern: 'Stack with map for bracket pairs.',
      template: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  
  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  
  return stack.length === 0;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Empty string valid?',
        choices: ['Yes', 'No'],
        answer: 0,
        explain: 'Trivially balanced.'
      }
    ],
    practice: {
      funcName: 'isValid',
      starter: `function isValid(s) {
  // TODO: implement stack solution
}`,
      constraints: '|s| up to 10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: ['()'], expected: true, n: 2 },
        { input: ['()[]{}'], expected: true, n: 6 },
        { input: ['(]'], expected: false, n: 2 }
      ]
    }
  });
}

// Interactive Games
function makeBinarySearchGame() {
  return createProblem({
    id: 'binary-search-game',
    title: 'Binary Search — Guessing Game',
    difficulty: 'easy',
    brief: 'Find the hidden number with as few guesses as possible.',
    game: { type: 'binary-search' },
    learn: {
      intuition: 'Binary search halves the search space each guess.',
      visual: 'The current valid interval shrinks each guess.',
      pattern: 'mid = floor((lo+hi)/2), compare, shrink interval.'
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Optimal guesses for N≈100?',
        choices: ['~7', '~10', '~50', '~5'],
        answer: 0,
        explain: 'ceil(log₂ 100) ≈ 7.'
      }
    ]
  });
}

function makeBFSMazeGame() {
  return createProblem({
    id: 'bfs-maze',
    title: 'BFS Maze — Shortest Path',
    difficulty: 'easy-medium',
    brief: 'Place walls and watch BFS explore.',
    game: { type: 'bfs-maze' },
    learn: {
      intuition: 'BFS explores uniformly by distance.',
      visual: 'Cells color from start outward.',
      pattern: 'Queue + visited + parent tracking.'
    }
  });
}

function makeDFSMazeGame() {
  return createProblem({
    id: 'dfs-maze',
    title: 'DFS Maze Explorer',
    difficulty: 'medium',
    brief: 'Watch DFS explore a maze using depth-first search.',
    learn: {
      intuition: 'DFS explores as deep as possible before backtracking.',
      visual: 'See how DFS dives deep into paths and backtracks when stuck.',
      pattern: 'Stack-based exploration for path finding and maze solving.'
    },
    game: {
      type: 'dfs-maze'
    }
  });
}

// Graph Algorithms
function makeDijkstra() {
  return createProblem({
    id: 'dijkstra',
    title: "Dijkstra's Shortest Path",
    difficulty: 'medium',
    brief: 'Find shortest paths in weighted graphs using priority queue.',
    hints: [
      'Use min-heap to process nearest unvisited node.',
      'Relax edges: if dist[u] + weight < dist[v], update.',
      'Track parent pointers to reconstruct path.'
    ],
    learn: {
      intuition: 'Greedily expand from source by shortest known distance.',
      visual: 'Watch distance values update as algorithm explores.',
      pattern: 'Priority queue + distance array + relaxation.',
      template: `function dijkstra(graph, start) {
  const dist = new Array(graph.length).fill(Infinity);
  const visited = new Set();
  const pq = new MinHeap();
  
  dist[start] = 0;
  pq.push([0, start]);
  
  while (!pq.isEmpty()) {
    const [d, u] = pq.pop();
    if (visited.has(u)) continue;
    visited.add(u);
    
    for (const [v, weight] of graph[u]) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why use priority queue in Dijkstra?',
        choices: ['Process nearest node first', 'Random order', 'LIFO order', 'FIFO order'],
        answer: 0,
        explain: 'Greedy: always expand shortest distance node.'
      }
    ],
    game: { type: 'dijkstra-graph' }
  });
}

function makePrims() {
  return createProblem({
    id: 'prims',
    title: "Prim's MST Algorithm",
    difficulty: 'medium',
    brief: 'Build minimum spanning tree by growing from a single vertex.',
    hints: [
      'Start from any vertex, mark as visited.',
      'Add all edges from visited vertices to priority queue.',
      'Pick minimum weight edge that connects to unvisited vertex.'
    ],
    learn: {
      intuition: 'Grow MST one vertex at a time, always choosing minimum edge.',
      visual: 'Watch tree grow from starting vertex.',
      pattern: 'Priority queue of edges + visited set.',
      template: `function prims(graph, n) {
  const visited = new Set();
  const pq = new MinHeap();
  const mst = [];
  let totalWeight = 0;
  
  visited.add(0);
  for (const [v, weight] of graph[0]) {
    pq.push([weight, 0, v]);
  }
  
  while (!pq.isEmpty() && visited.size < n) {
    const [weight, u, v] = pq.pop();
    if (visited.has(v)) continue;
    
    visited.add(v);
    mst.push([u, v, weight]);
    totalWeight += weight;
    
    for (const [next, w] of graph[v]) {
      if (!visited.has(next)) {
        pq.push([w, v, next]);
      }
    }
  }
  return { mst, totalWeight };
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: "Prim's vs Kruskal's: which grows from single vertex?",
        choices: ["Prim's", "Kruskal's", 'Both', 'Neither'],
        answer: 0,
        explain: "Prim's grows from start vertex, Kruskal's picks global min edges."
      }
    ],
    game: { type: 'prims-mst' }
  });
}

function makeKruskals() {
  return createProblem({
    id: 'kruskals',
    title: "Kruskal's MST Algorithm",
    difficulty: 'medium',
    brief: 'Build MST by sorting edges and using Union-Find.',
    hints: [
      'Sort all edges by weight.',
      'Use Union-Find to detect cycles.',
      'Add edge if it connects different components.'
    ],
    learn: {
      intuition: 'Pick minimum weight edges that don\'t create cycles.',
      visual: 'Watch disconnected components merge into tree.',
      pattern: 'Sort edges + Union-Find for cycle detection.',
      template: `function kruskals(edges, n) {
  edges.sort((a, b) => a[2] - b[2]);
  const parent = Array(n).fill(0).map((_, i) => i);
  const rank = Array(n).fill(0);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) [px, py] = [py, px];
    parent[py] = px;
    if (rank[px] === rank[py]) rank[px]++;
    return true;
  }
  
  const mst = [];
  let totalWeight = 0;
  
  for (const [u, v, weight] of edges) {
    if (union(u, v)) {
      mst.push([u, v, weight]);
      totalWeight += weight;
      if (mst.length === n - 1) break;
    }
  }
  return { mst, totalWeight };
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Time complexity of Kruskal\'s?',
        choices: ['O(E log E)', 'O(V²)', 'O(E + V)', 'O(V³)'],
        answer: 0,
        explain: 'Dominated by edge sorting: O(E log E).'
      }
    ],
    game: { type: 'kruskals-mst' }
  });
}

function makeTopologicalSort() {
  return createProblem({
    id: 'topological-sort',
    title: 'Topological Sort',
    difficulty: 'medium',
    brief: 'Order vertices in DAG so edges point forward.',
    hints: [
      'Use DFS and add to result in reverse post-order.',
      'Or use Kahn\'s: process vertices with indegree 0.',
      'Detect cycles if not all vertices processed.'
    ],
    learn: {
      intuition: 'Linear ordering respecting dependencies.',
      visual: 'Watch vertices get ordered by dependencies.',
      pattern: 'DFS post-order or BFS with indegree.',
      template: `function topSort(graph, n) {
  const indegree = Array(n).fill(0);
  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) {
      indegree[v]++;
    }
  }
  
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) queue.push(i);
  }
  
  const result = [];
  while (queue.length > 0) {
    const u = queue.shift();
    result.push(u);
    
    for (const v of graph[u]) {
      indegree[v]--;
      if (indegree[v] === 0) queue.push(v);
    }
  }
  
  return result.length === n ? result : null; // null if cycle
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Can we topologically sort a graph with cycles?',
        choices: ['No', 'Yes', 'Sometimes', 'Only self-loops'],
        answer: 0,
        explain: 'Cycles create circular dependencies.'
      }
    ],
    game: { type: 'topsort-dag' }
  });
}

function makeBellmanFord() {
  return createProblem({
    id: 'bellman-ford',
    title: 'Bellman-Ford Algorithm',
    difficulty: 'medium-hard',
    brief: 'Find shortest paths with negative edges, detect negative cycles.',
    hints: [
      'Relax all edges V-1 times.',
      'Extra iteration detects negative cycles.',
      'Works with negative weights unlike Dijkstra.'
    ],
    learn: {
      intuition: 'Iteratively relax edges until convergence.',
      visual: 'Watch distances converge over iterations.',
      pattern: 'V-1 iterations of edge relaxation.',
      template: `function bellmanFord(edges, n, start) {
  const dist = Array(n).fill(Infinity);
  dist[start] = 0;
  
  // Relax edges V-1 times
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, weight] of edges) {
      if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }
  
  // Check for negative cycles
  for (const [u, v, weight] of edges) {
    if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
      return null; // Negative cycle detected
    }
  }
  
  return dist;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why V-1 iterations in Bellman-Ford?',
        choices: ['Max path length is V-1 edges', 'Random choice', 'Efficiency', 'Tradition'],
        answer: 0,
        explain: 'Shortest path has at most V-1 edges in graph with V vertices.'
      }
    ],
    game: { type: 'bellman-ford' }
  });
}

function makeFloydWarshall() {
  return createProblem({
    id: 'floyd-warshall',
    title: 'Floyd-Warshall Algorithm',
    difficulty: 'medium-hard',
    brief: 'Find all-pairs shortest paths using dynamic programming.',
    hints: [
      'DP state: dist[k][i][j] = shortest i→j using vertices 0..k.',
      'For each k, try path through k: dist[i][k] + dist[k][j].',
      'Space optimization: update in-place.'
    ],
    learn: {
      intuition: 'Consider paths through intermediate vertices.',
      visual: 'Watch distance matrix update for each intermediate vertex.',
      pattern: '3 nested loops: intermediate, source, destination.',
      template: `function floydWarshall(graph, n) {
  const dist = Array(n).fill(null).map(() => 
    Array(n).fill(Infinity)
  );
  
  // Initialize distances
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
    for (const [j, weight] of graph[i]) {
      dist[i][j] = weight;
    }
  }
  
  // Consider each vertex as intermediate
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  
  return dist;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Time complexity of Floyd-Warshall?',
        choices: ['O(V³)', 'O(V²)', 'O(E log V)', 'O(VE)'],
        answer: 0,
        explain: 'Three nested loops over V vertices.'
      }
    ],
    game: { type: 'floyd-warshall' }
  });
}

// Export all content creators
const contentCreators = {
  // Arrays & Two Pointers
  makeArrayTwoSum,
  makeSlidingWindow,
  
  // Binary Search
  makeBinarySearch,
  
  // Dynamic Programming
  makeCoinChange,
  makeLIS,
  
  // Graphs
  makeBFS,
  makeUnionFind,
  makeDijkstra,
  makePrims,
  makeKruskals,
  makeTopologicalSort,
  makeBellmanFord,
  makeFloydWarshall,
  
  // Trees
  makeValidateBST,
  
  // Stacks
  makeValidParentheses,
  
  // Games
  makeBinarySearchGame,
  makeBFSMazeGame,
  makeDFSMazeGame
};

// Build complete content structure
export const fullContent = {
  topics: [
    {
      id: 'arrays',
      title: 'Arrays & Two Pointers',
      summary: 'Classic scanning patterns: opposite ends, fast/slow, partitioning.',
      items: [
        makeArrayTwoSum(),
        makeSlidingWindow()
      ]
    },
    {
      id: 'searching',
      title: 'Searching & Sorting',
      summary: 'Binary search patterns and reasoning about invariants.',
      items: [
        makeBinarySearch()
      ]
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      summary: 'Optimal substructure, overlapping subproblems, transitions.',
      items: [
        makeCoinChange(),
        makeLIS()
      ]
    },
    {
      id: 'graphs',
      title: 'Graphs',
      summary: 'BFS, DFS, shortest paths, MST, and advanced algorithms.',
      items: [
        makeBFS(),
        makeUnionFind(),
        makeDijkstra(),
        makePrims(),
        makeKruskals(),
        makeTopologicalSort(),
        makeBellmanFord(),
        makeFloydWarshall()
      ]
    },
    {
      id: 'trees',
      title: 'Trees & BST',
      summary: 'Tree traversals and BST properties.',
      items: [
        makeValidateBST()
      ]
    },
    {
      id: 'stacks',
      title: 'Stacks & Queues',
      summary: 'LIFO/FIFO patterns and applications.',
      items: [
        makeValidParentheses()
      ]
    },
    {
      id: 'games',
      title: 'Interactive Games',
      summary: 'Learn through interactive visualizations.',
      items: [
        makeBinarySearchGame(),
        makeBFSMazeGame(),
        makeDFSMazeGame()
      ]
    }
  ]
};

// Also export for browser global access
if (typeof window !== 'undefined') {
  window.DSAContent = fullContent;
}