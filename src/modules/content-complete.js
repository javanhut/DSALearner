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
  
  // Trees
  makeValidateBST,
  
  // Stacks
  makeValidParentheses,
  
  // Games
  makeBinarySearchGame,
  makeBFSMazeGame
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
      summary: 'BFS, DFS, shortest paths, and connectivity.',
      items: [
        makeBFS(),
        makeUnionFind()
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
        makeBFSMazeGame()
      ]
    }
  ]
};

// Export for use in browser
if (typeof window !== 'undefined') {
  window.DSAContent = fullContent;
}