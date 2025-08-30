// Content schema: topics -> items
// Each item: { id, title, brief, hints[], learn{intuition,visual,pattern,template}, quiz[], practice{funcName,starter,tests[],constraints,optimal,expectedComplexity} }

function makeArrayTwoSum(){
  return {
    id:'two-sum',
    title:'Two Pointers: Two Sum (Sorted)',
    difficulty:'easy',
    brief:'Find two numbers adding to target in a sorted array.',
    hints:[
      'Try one pointer at start and one at end.',
      'If sum is too small, move left pointer right; if too big, move right pointer left.',
      'Stop when pointers cross; ensure you justify correctness via monotonicity.',
    ],
    learn:{
      intuition:'Use two pointers on the sorted array. The sum moves monotonically as you adjust pointers, enabling linear search.',
      visual:'Imagine a matrix of pair sums; valid pairs lie along anti-diagonals; the two-pointer walk traces a monotone path.',
      pattern:'Two pointers on sorted structure; shrinking window based on comparison to target.',
      template:`function twoSumSorted(nums, target){
  let i = 0, j = nums.length-1;
  while(i < j){
    const s = nums[i] + nums[j];
    if(s === target) return [i, j];
    if(s < target) i++;
    else j--;
  }
  return [-1, -1];
}`
    },
    quiz:[
      { type:'mc', prompt:'Time complexity of two-pointer approach?', choices:['O(n^2)','O(log n)','O(n)','O(n log n)'], answer:2, explain:'Each pointer moves at most n steps total ⇒ O(n).'},
      { type:'sa', prompt:'Key correctness idea (one phrase)?', accept:['Monotonicity','Monotone','Monotonic'], explain:'Sum increases as left++ and decreases as right--, enabling elimination.' }
    ],
    practice:{
      funcName:'twoSumSorted',
      starter:`// Return indices [i,j] such that nums[i]+nums[j]==target; nums is sorted
function twoSumSorted(nums, target){
  // TODO: implement two-pointer approach in O(n)
}
`,
      constraints:'n up to 1e5; values within 32-bit; O(n) time, O(1) space.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[[2,7,11,15],9], expected:[0,1], n:4},
        {input:[[1,2,3,4,6],10], expected:[3,4], n:5},
        {input:[[1,3,3,4],6], expected:[1,3], n:4},
        {input:[[1,2,4,4],8], expected:[2,3], n:4},
        {input:[[1,2,5,9,11,19,21,30,40,41],51], expected:[7,9], n:10}
      ],
      optimal:`function twoSumSorted(nums, target){
  let i=0, j=nums.length-1;
  while(i<j){
    const s = nums[i]+nums[j];
    if(s===target) return [i,j];
    if(s<target) i++; else j--;
  }
  return [-1,-1];
}`
    }
  }
}

function makeSlidingWindow(){
  return {
    id:'longest-substring-no-repeat',
    title:'Sliding Window: Longest Substring Without Repeating',
    difficulty:'medium',
    brief:'Find length of longest substring without repeating characters.',
    hints:[
      'Use a sliding window with a hash map of last indices.',
      'When you see a repeat, move the left bound to max(left, lastIndex+1).',
      'Track best length as you expand the window.'
    ],
    learn:{
      intuition:'Maintain a window of unique chars. Expand right; on repeat, jump left past last occurrence to maintain invariant.',
      visual:'Window [L,R] over characters; map shows last index; left only moves forward.',
      pattern:'Sliding window with hashmap to enforce constraints.',
      template:`function lengthOfLongestSubstring(s){
  const last = new Map();
  let best = 0, left = 0;
  for(let r=0;r<s.length;r++){
    const ch = s[r];
    if(last.has(ch)) left = Math.max(left, last.get(ch)+1);
    last.set(ch, r);
    best = Math.max(best, r-left+1);
  }
  return best;
}`
    },
    quiz:[
      { type:'mc', prompt:'What is the time complexity?', choices:['O(n)','O(n log n)','O(n^2)','O(log n)'], answer:0, explain:'Left and right pointers each move at most n times.'},
      { type:'sa', prompt:'Name the core invariant in 3 words.', accept:['window has uniques','unique window','no repeats'], explain:'The window maintains “no repeats”.' }
    ],
    practice:{
      funcName:'lengthOfLongestSubstring',
      starter:`function lengthOfLongestSubstring(s){
  const last = new Map();
  let best = 0, left = 0;
  for(let r=0;r<s.length;r++){
    const ch = s[r];
    if(last.has(ch)) left = Math.max(left, last.get(ch)+1);
    last.set(ch, r);
    best = Math.max(best, r-left+1);
  }
  return best;
}
`,
      constraints:'n up to 1e5; ASCII; O(n) time, O(min(n,alphabet)) space.',
      expectedComplexity:'O(n)',
      tests:[
        {input:['abcabcbb'], expected:3, n:8},
        {input:['bbbbb'], expected:1, n:5},
        {input:['pwwkew'], expected:3, n:6},
        {input:[''], expected:0, n:0},
        {input:['au'], expected:2, n:2}
      ],
      optimal:`function lengthOfLongestSubstring(s){
  const last = new Map();
  let best=0, left=0;
  for(let r=0;r<s.length;r++){
    const ch=s[r];
    if(last.has(ch)) left=Math.max(left,last.get(ch)+1);
    last.set(ch,r);
    best=Math.max(best,r-left+1);
  }
  return best;
}`
    }
  }
}

function makeBinarySearch(){
  return {
    id:'binary-search-lb',
    title:'Binary Search: Lower Bound',
    difficulty:'easy',
    brief:'Find first index >= target in sorted array.',
    hints:[
      'Maintain loop invariant: answer in [lo, hi].',
      'Bias mid to left; move hi = mid on true branch.',
      'Stop when lo == hi; verify correctness with invariant.'
    ],
    learn:{
      intuition:'Binary search as a predicate search; keep minimal index satisfying condition.',
      visual:'Think of true/false array segments; lower bound is the first true.',
      pattern:'Binary search on monotone predicate.',
      template:`function lowerBound(a, x){
  let lo = 0, hi = a.length; // [lo,hi)
  while(lo < hi){
    const mid = Math.floor((lo+hi)/2);
    if(a[mid] >= x) hi = mid; else lo = mid+1;
  }
  return lo; // index in [0..n]
}`
    },
    quiz:[
      { type:'mc', prompt:'Loop condition for lower bound?', choices:['lo<=hi','lo<hi','lo!=hi','while(true)'], answer:1, explain:'Half-open interval [lo, hi) ends when lo == hi.'},
      { type:'sa', prompt:'What invariant holds?', accept:['answer in [lo, hi)','answer in [lo,hi)'], explain:'The minimal index satisfying a[mid] >= x lies in [lo, hi).' }
    ],
    practice:{
      funcName:'lowerBound',
      starter:`function lowerBound(a, x){
  let lo = 0, hi = a.length; // [lo,hi)
  while(lo < hi){
    const mid = (lo + hi) >> 1;
    if(a[mid] >= x) hi = mid; else lo = mid + 1;
  }
  return lo;
}
`,
      constraints:'O(log n) time; array sorted non-decreasing.',
      expectedComplexity:'O(log n)',
      tests:[
        {input:[[1,2,4,4,5],4], expected:2, n:5},
        {input:[[1,2,4,4,5],3], expected:2, n:5},
        {input:[[1,2,4,4,5],6], expected:5, n:5},
        {input:[[1,1,1,1],1], expected:0, n:4}
      ],
      optimal:`function lowerBound(a,x){
  let lo=0, hi=a.length;
  while(lo<hi){
    const mid=(lo+hi)>>1;
    if(a[mid]>=x) hi=mid; else lo=mid+1;
  }
  return lo;
}`
    }
  }
}

export const content = {
  topics:[
    {
      id:'games',
      title:'Games & Animations',
      summary:'Interactive visualizations to build deep intuition.',
      items:[
        makeBinarySearchGame(),
        makeBFSMazeGame(),
        makeHeapSandboxGame(),
        makeSortingRaceGame(),
        makeUnionFindGame(),
        makeDPGridGame(),
        makeKMPExplorerGame(),
        makeAhoExplorerGame(),
        makeDinicFlowGame(),
        makeHLDGame()
      ]
    },
    {
      id:'complexity',
      title:'Complexity Primer',
      summary:'Big-O basics, loop patterns, binary search, and core cost models.',
      items:[ makeBigOBasics(), makeNestedLoops(), makeBinarySearchPrimer(), makeAmortizedDynamicArray(), makeMasterTheorem(), makeDSCostCheatsheet() ]
    },
    {
      id:'complexity',
      title:'Complexity Primer',
      summary:'Big-O basics, loop patterns, binary search, and core cost models.',
      items:[ makeBigOBasics(), makeNestedLoops(), makeBinarySearchPrimer(), makeAmortizedDynamicArray(), makeMasterTheorem(), makeDSCostCheatsheet() ]
    },
    {
      id:'arrays-pointers',
      title:'Arrays & Two Pointers',
      summary:'Classic scanning patterns: opposite ends, fast/slow, partitioning.',
      items:[ makeArrayTwoSum(), makeSlidingWindow(), makeThreeSum(), makeMinWindow() ]
    },
    {
      id:'searching',
      title:'Searching & Sorting',
      summary:'Binary search patterns and reasoning about invariants.',
      items:[ makeBinarySearch() ]
    },
    {
      id:'intervals',
      title:'Intervals',
      summary:'Sorting-based merging and sweep-line reasoning.',
      items:[ makeMergeIntervals() ]
    },
    {
      id:'heaps-selection',
      title:'Heaps & Selection',
      summary:'Priority queues to pick extremes efficiently.',
      items:[ makeKthLargest(), makeTopKFrequent() ]
    },
    {
      id:'dp',
      title:'Dynamic Programming',
      summary:'Optimal substructure, overlapping subproblems, transitions.',
      items:[ makeCoinChange(), makeLIS(), makeEditDistance(), makeWordBreak() ]
    },
    {
      id:'greedy',
      title:'Greedy Strategies',
      summary:'Locally optimal moves for global optimum.',
      items:[ makeJumpGame2() ]
    },
    {
      id:'stacks',
      title:'Stacks',
      summary:'Parentheses validation and monotone stack patterns.',
      items:[ makeValidParentheses(), makeDailyTemperatures() ]
    },
    {
      id:'graphs-bfs-dijkstra',
      title:'Graphs: BFS & Dijkstra',
      summary:'Shortest paths in un/weighted graphs.',
      items:[ makeBFSShortestPath(), makeDijkstraSP() ]
    },
    {
      id:'graphs-dag',
      title:'Graphs: DAG & Topo',
      summary:'Topological ordering and cycle detection for scheduling.',
      items:[ makeCourseSchedule() ]
    },
    {
      id:'matrix-dfs',
      title:'Matrix DFS/BFS',
      summary:'Grid traversal and connected components.',
      items:[ makeNumIslands() ]
    },
    {
      id:'union-find',
      title:'Disjoint Set (Union-Find)',
      summary:'Connectivity and components with near-constant-time ops.',
      items:[ makeUnionFindComponents() ]
    },
    {
      id:'binary-search-answer',
      title:'Binary Search on Answer',
      summary:'Optimize threshold by searching feasible space.',
      items:[ makeShipWithinDays() ]
    },
    {
      id:'bit-manip',
      title:'Bit Manipulation',
      summary:'XOR, masks, and bitwise tricks.',
      items:[ makeSingleNumber() ]
    },
    {
      id:'hashing',
      title:'Hashing & Strings',
      summary:'Grouping, counters, and maps.',
      items:[ makeGroupAnagrams() ]
    },
    {
      id:'trees',
      title:'Trees & BST',
      summary:'Invariants on structure and traversals.',
      items:[ makeValidateBST(), makeLevelOrder() ]
    },
    {
      id:'trees-ranges',
      title:'Trees & Ranges',
      summary:'Fenwick/Segment Trees and Sparse Table for queries.',
      items:[ makeFenwick(), makeSegmentTree(), makeSparseTable() ]
    },
    {
      id:'strings',
      title:'String Algorithms',
      summary:'Linear-time pattern matching and preprocessing.',
      items:[ makeKMP(), makeZFunction() ]
    },
    {
      id:'graphs-advanced',
      title:'Graphs: Advanced',
      summary:'SCC, MST (Kruskal), and LCA (binary lifting).',
      items:[ makeSCCKosaraju(), makeMSTKruskal(), makeLCABinaryLifting() ]
    },
    {
      id:'flows-cuts',
      title:'Flows & Cuts',
      summary:'Max flow via Edmonds–Karp for small graphs.',
      items:[ makeMaxFlowEK() ]
    },
    {
      id:'number-theory',
      title:'Number Theory',
      summary:'Fast exponentiation and matrix exponentiation.',
      items:[ makeFastPowMod(), makeFibMatrixExpo() ]
    }
  ]
};

// --------------- Additional Item Makers ---------------

function makeMergeIntervals(){
  return {
    id:'merge-intervals',
    title:'Merge Intervals',
    difficulty:'medium',
    brief:'Merge overlapping intervals after sorting by start.',
    hints:[
      'Sort by start time ascending.',
      'Keep a current interval; merge if next.start <= current.end.',
      'Otherwise, push current and start a new one.'
    ],
    learn:{
      intuition:'Sorting enables a single forward pass to combine overlaps.',
      visual:'Intervals on a number line; merging compresses overlapping segments.',
      pattern:'Sort + linear scan with carry-over interval.',
      template:`function mergeIntervals(iv){
  iv.sort((a,b)=>a[0]-b[0]);
  const res=[]; let cur=null;
  for(const [s,e] of iv){
    if(!cur) cur=[s,e];
    else if(s<=cur[1]) cur[1]=Math.max(cur[1],e);
    else { res.push(cur); cur=[s,e]; }
  }
  if(cur) res.push(cur);
  return res;
}`
    },
    quiz:[
      {type:'mc', prompt:'Overall time complexity?', choices:['O(n)','O(n log n)','O(n^2)','O(log n)'], answer:1, explain:'Sorting dominates: O(n log n).'},
      {type:'sa', prompt:'Why sort by start?', accept:['to ensure overlaps are adjacent','adjacent overlaps','group overlaps'], explain:'Sorting clusters overlapping intervals to adjacent positions.'}
    ],
    practice:{
      funcName:'mergeIntervals',
      starter:`function mergeIntervals(iv){
  iv.sort((a,b)=>a[0]-b[0]);
  const res=[]; let cur=null;
  for(const [s,e] of iv){
    if(!cur) cur=[s,e];
    else if(s<=cur[1]) cur[1]=Math.max(cur[1],e);
    else { res.push(cur); cur=[s,e]; }
  }
  if(cur) res.push(cur);
  return res;
}
`,
      constraints:'n up to 1e5; return merged intervals sorted.',
      expectedComplexity:'O(n log n)',
      tests:[
        {input:[[[1,3],[2,6],[8,10],[15,18]]], expected:[[1,6],[8,10],[15,18]], n:4},
        {input:[[[1,4],[4,5]]], expected:[[1,5]], n:2},
        {input:[[[1,4],[0,4]]], expected:[[0,4]], n:2}
      ],
      optimal:`function mergeIntervals(iv){
  iv.sort((a,b)=>a[0]-b[0]);
  const res=[]; let cur=null;
  for(const [s,e] of iv){
    if(!cur) cur=[s,e];
    else if(s<=cur[1]) cur[1]=Math.max(cur[1],e);
    else { res.push(cur); cur=[s,e]; }
  }
  if(cur) res.push(cur);
  return res;
}`
    }
  }
}

function makeKthLargest(){
  return {
    id:'kth-largest',
    title:'Kth Largest via Min-Heap',
    difficulty:'medium',
    brief:'Maintain a size-k min-heap while scanning.',
    hints:[
      'Keep the k largest seen so far.',
      'If heap size exceeds k, pop the smallest.',
      'Final root is kth largest.'
    ],
    learn:{
      intuition:'Streaming selection: cap heap at k to avoid full sort.',
      visual:'A small heap floats the kth largest to the top.',
      pattern:'Min-heap of size k; O(n log k).',
      template:`function kthLargest(nums, k){
  // Use a simple array as heap with helper functions push/pop
}`
    },
    quiz:[
      {type:'mc', prompt:'Time complexity?', choices:['O(n log k)','O(n log n)','O(n)','O(k log n)'], answer:0, explain:'Each push/pop costs log k for n elements.'},
      {type:'sa', prompt:'Space complexity?', accept:['O(k)','k'], explain:'Heap stores at most k items.'}
    ],
    practice:{
      funcName:'kthLargest',
      starter:`function kthLargest(nums, k){
  const heap=[]; // min-heap
  const up=(i)=>{while(i>0){const p=(i-1)>>1;if(heap[p]<=heap[i])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p;}};
  const down=(i)=>{for(;;){let l=i*2+1,r=l+1,s=i;if(l<heap.length&&heap[l]<heap[s])s=l;if(r<heap.length&&heap[r]<heap[s])s=r;if(s===i)break;[heap[s],heap[i]]=[heap[i],heap[s]];i=s;}};
  for(const x of nums){
    heap.push(x); up(heap.length-1);
    if(heap.length>k){ heap[0]=heap.pop(); if(heap.length) down(0); }
  }
  return heap[0];
}
`,
      constraints:'n up to 1e5; values 32-bit; O(n log k).',
      expectedComplexity:'O(n log k)',
      tests:[
        {input:[[3,2,1,5,6,4],2], expected:5, n:6},
        {input:[[3,2,3,1,2,4,5,5,6],4], expected:4, n:9}
      ],
      optimal:`function kthLargest(nums, k){
  const h=[]; const up=i=>{while(i){let p=(i-1)>>1;if(h[p]<=h[i])break;[h[p],h[i]]=[h[i],h[p]];i=p;}}; const dn=i=>{for(;;){let l=i*2+1,r=l+1,s=i;if(l<h.length&&h[l]<h[s])s=l;if(r<h.length&&h[r]<h[s])s=r;if(s===i)break;[h[s],h[i]]=[h[i],h[s]];i=s;}};
  for(const x of nums){ h.push(x); up(h.length-1); if(h.length>k){ h[0]=h.pop(); if(h.length) dn(0);} }
  return h[0];
}`
    }
  }
}

function makeCoinChange(){
  return {
    id:'coin-change',
    title:'DP: Coin Change (Min Coins)',
    difficulty:'medium',
    brief:'Min coins to make amount using unlimited coins.',
    hints:[
      'Classic unbounded knapsack variant.',
      'Transition: dp[a] = min(dp[a], dp[a-coin]+1).',
      'Initialize dp with INF, dp[0]=0.'
    ],
    learn:{
      intuition:'Build from 0..amount; each coin relaxes future states.',
      visual:'1D DP array; coins “paint” reachable states with minimal steps.',
      pattern:'Bottom-up DP; unbounded transitions.',
      template:`function coinChange(coins, amount){
  const INF=1e9, dp=new Array(amount+1).fill(INF); dp[0]=0;
  for(const c of coins){
    for(let a=c;a<=amount;a++) dp[a]=Math.min(dp[a], dp[a-c]+1);
  }
  return dp[amount]===1e9?-1:dp[amount];
}`
    },
    quiz:[
      {type:'mc', prompt:'DP complexity?', choices:['O(n*amount)','O(amount)','O(n log amount)','O(n+amount)'], answer:0, explain:'n coins times amount states.'},
      {type:'sa', prompt:'Base case value for dp[0]?', accept:['0'], explain:'Zero coins to reach amount 0.'}
    ],
    practice:{
      funcName:'coinChange',
      starter:`function coinChange(coins, amount){
  const INF=1e9, dp=new Array(amount+1).fill(INF); dp[0]=0;
  for(const c of coins){
    for(let a=c;a<=amount;a++) dp[a]=Math.min(dp[a], dp[a-c]+1);
  }
  return dp[amount]===1e9?-1:dp[amount];
}
`,
      constraints:'n up to 50; amount up to 1e4.',
      expectedComplexity:'O(n*amount)',
      tests:[
        {input:[[1,2,5],11], expected:3, n:11},
        {input:[[2],3], expected:-1, n:3},
        {input:[[1],0], expected:0, n:0}
      ],
      optimal:`function coinChange(coins, amount){
  const INF=1e9, dp=new Array(amount+1).fill(INF); dp[0]=0;
  for(const c of coins){ for(let a=c;a<=amount;a++) dp[a]=Math.min(dp[a], dp[a-c]+1); }
  return dp[amount]===1e9?-1:dp[amount];
}`
    }
  }
}

function makeLIS(){
  return {
    id:'lis-length',
    title:'DP: Longest Increasing Subsequence (O(n log n))',
    difficulty:'medium-hard',
    brief:'Patience sorting with tails array.',
    hints:[
      'Maintain tails[i] = min tail of length i+1.',
      'Binary search position of current element in tails.',
      'Length of tails is LIS length.'
    ],
    learn:{
      intuition:'Greedy + binary search keeps best candidates compact.',
      visual:'Tails array grows slowly; each number replaces a ceiling.',
      pattern:'Binary search over tails to keep minimal ends.',
      template:`function lengthOfLIS(a){
  const tails=[];
  for(const x of a){
    let i=0,j=tails.length; while(i<j){const m=(i+j)>>1; if(tails[m]<x) i=m+1; else j=m;}
    tails[i]=x;
  }
  return tails.length;
}`
    },
    quiz:[
      {type:'mc', prompt:'Time complexity?', choices:['O(n log n)','O(n)','O(n^2)','O(log n)'], answer:0, explain:'Binary search per element.'},
      {type:'sa', prompt:'What does tails[i] store?', accept:['min tail of length i+1','minimum tail'], explain:'The minimal possible tail value for any subsequence of length i+1.'}
    ],
    practice:{
      funcName:'lengthOfLIS',
      starter:`function lengthOfLIS(a){
  const tails=[];
  for(const x of a){
    let i=0,j=tails.length; while(i<j){ const m=(i+j)>>1; if(tails[m]<x) i=m+1; else j=m; }
    tails[i]=x;
  }
  return tails.length;
}
`,
      constraints:'n up to 1e5; 32-bit ints.',
      expectedComplexity:'O(n log n)',
      tests:[
        {input:[[10,9,2,5,3,7,101,18]], expected:4, n:8},
        {input:[[0,1,0,3,2,3]], expected:4, n:6},
        {input:[[7,7,7,7,7]], expected:1, n:5}
      ],
      optimal:`function lengthOfLIS(a){
  const tails=[];
  for(const x of a){
    let i=0,j=tails.length; while(i<j){const m=(i+j)>>1; if(tails[m]<x) i=m+1; else j=m;}
    tails[i]=x;
  }
  return tails.length;
}`
    }
  }
}

function makeJumpGame2(){
  return {
    id:'jump-game-2',
    title:'Greedy: Jump Game II',
    difficulty:'medium',
    brief:'Minimum jumps to reach end of array.',
    hints:[
      'Greedy layers: farthest reach within current jump window.',
      'Increment jumps when you finish current range.',
      'Track current end and farthest next.'
    ],
    learn:{
      intuition:'Treat indices as BFS layers; greedy picks next frontier.',
      visual:'Sliding window of reach; when r crosses end, increase jumps.',
      pattern:'Greedy range expansion.',
      template:`function jump(nums){
  let jumps=0, end=0, far=0;
  for(let i=0;i<nums.length-1;i++){
    far=Math.max(far, i+nums[i]);
    if(i===end){ jumps++; end=far; }
  }
  return jumps;
}`
    },
    quiz:[
      {type:'mc', prompt:'Why greedy works?', choices:['Optimal substructure of ranges','DP memo only','Binary search','Randomization'], answer:0, explain:'Each layer greedily picks farthest reach for minimal steps.'},
      {type:'sa', prompt:'What triggers a jump?', accept:['when i==end','end reached'], explain:'When finishing the current reachable range.'}
    ],
    practice:{
      funcName:'jump',
      starter:`function jump(nums){
  let jumps=0, end=0, far=0;
  for(let i=0;i<nums.length-1;i++){
    far=Math.max(far, i+nums[i]);
    if(i===end){ jumps++; end=far; }
  }
  return jumps;
}
`,
      constraints:'n up to 1e5; guaranteed reachable.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[[2,3,1,1,4]], expected:2, n:5},
        {input:[[2,3,0,1,4]], expected:2, n:5}
      ],
      optimal:`function jump(nums){
  let jumps=0,end=0,far=0; for(let i=0;i<nums.length-1;i++){ far=Math.max(far,i+nums[i]); if(i===end){ jumps++; end=far; } } return jumps;
}`
    }
  }
}

function makeBFSShortestPath(){
  return {
    id:'bfs-shortest',
    title:'BFS: Shortest Path (Unweighted)',
    difficulty:'easy-medium',
    brief:'Find shortest path length between two nodes.',
    hints:[
      'Use a queue with visited set.',
      'Push neighbors with dist+1.',
      'Stop early when target is reached.'
    ],
    learn:{
      intuition:'In unweighted graphs, BFS explores by distance layers.',
      visual:'Concentric layers from source; first time you see target is optimal.',
      pattern:'Queue-based BFS with visited set.',
      template:`function shortestPath(start, target, adj){
  const q=[[start,0]]; const vis=new Set([start]);
  while(q.length){ const [u,d]=q.shift(); if(u===target) return d; for(const v of (adj[u]||[])){ if(!vis.has(v)){ vis.add(v); q.push([v,d+1]); } } }
  return -1;
}`
    },
    quiz:[
      {type:'mc', prompt:'When is BFS optimal?', choices:['Unweighted graphs','Weighted positive','Weighted negative','DAG only'], answer:0, explain:'Unweighted edges imply equal cost per step.'},
      {type:'sa', prompt:'What prevents cycles?', accept:['visited set','visited'], explain:'Visited set ensures each node enqueued once.'}
    ],
    practice:{
      funcName:'shortestPath',
      starter:`function shortestPath(start, target, adj){
  const q=[[start,0]]; const vis=new Set([start]);
  while(q.length){ const [u,d]=q.shift(); if(u===target) return d; for(const v of (adj[u]||[])){ if(!vis.has(v)){ vis.add(v); q.push([v,d+1]); } } }
  return -1;
}
`,
      constraints:'Nodes up to 1e5 total across tests.',
      expectedComplexity:'O(V+E)',
      tests:[
        {input:['A','E',{A:['B','C'],B:['D'],C:['D'],D:['E'],E:[]}], expected:3, n:5},
        {input:[1,4,{1:[2,3],2:[4],3:[4],4:[]}], expected:2, n:4}
      ],
      optimal:`function shortestPath(start, target, adj){
  const q=[[start,0]]; const vis=new Set([start]);
  while(q.length){ const [u,d]=q.shift(); if(u===target) return d; const nb=adj[u]||[]; for(const v of nb){ if(!vis.has(v)){ vis.add(v); q.push([v,d+1]); } } }
  return -1;
}`
    }
  }
}

function makeDijkstraSP(){
  return {
    id:'dijkstra',
    title:'Dijkstra: Single-Source Shortest Paths',
    difficulty:'medium-hard',
    brief:'Non-negative edge weights with priority queue.',
    hints:[
      'Use min-heap keyed by distance.',
      'Relax edges; skip outdated heap entries.',
      'Initialize dist[src]=0, others INF.'
    ],
    learn:{
      intuition:'Greedy expansion by current shortest frontier.',
      visual:'Settled set grows; distances only decrease via relaxation.',
      pattern:'Priority queue + adjacency list.',
      template:`function dijkstra(n, edges, src){
  const adj=Array.from({length:n},()=>[]);
  for(const [u,v,w] of edges){ adj[u].push([v,w]); adj[v].push([u,w]); }
  const INF=1e15, dist=Array(n).fill(INF); dist[src]=0;
  const h=[[0,src]]; const up=i=>{while(i){let p=(i-1)>>1;if(h[p][0]<=h[i][0])break;[h[p],h[i]]=[h[i],h[p]];i=p;}}; const dn=i=>{for(;;){let l=i*2+1,r=l+1,s=i;if(l<h.length&&h[l][0]<h[s][0])s=l;if(r<h.length&&h[r][0]<h[s][0])s=r;if(s===i)break;[h[s],h[i]]=[h[i],h[s]];i=s;}};
  while(h.length){ const [d,u]=h[0]; h[0]=h.pop(); if(h.length) dn(0); if(d!==dist[u]) continue; for(const [v,w] of adj[u]){ if(d+w<dist[v]){ dist[v]=d+w; h.push([dist[v],v]); up(h.length-1);} } }
  return dist;
}`
    },
    quiz:[
      {type:'mc', prompt:'When is Dijkstra valid?', choices:['Non-negative weights','Negative edges OK','Negative cycles OK','Unweighted only'], answer:0, explain:'Requires non-negative weights.'},
      {type:'sa', prompt:'Heap stores pairs of what?', accept:['(distance,node)','distance and node'], explain:'Each entry is the best-known distance and its node.'}
    ],
    practice:{
      funcName:'dijkstra',
      starter:`function dijkstra(n, edges, src){
  const adj=Array.from({length:n},()=>[]);
  for(const [u,v,w] of edges){ adj[u].push([v,w]); adj[v].push([u,w]); }
  const INF=1e15, dist=Array(n).fill(INF); dist[src]=0; const h=[[0,src]];
  const up=i=>{while(i){let p=(i-1)>>1;if(h[p][0]<=h[i][0])break;[h[p],h[i]]=[h[i],h[p]];i=p;}}; const dn=i=>{for(;;){let l=i*2+1,r=l+1,s=i;if(l<h.length&&h[l][0]<h[s][0])s=l;if(r<h.length&&h[r][0]<h[s][0])s=r;if(s===i)break;[h[s],h[i]]=[h[i],h[s]];i=s;}};
  while(h.length){ const [d,u]=h[0]; h[0]=h.pop(); if(h.length) dn(0); if(d!==dist[u]) continue; for(const [v,w] of adj[u]){ const nd=d+w; if(nd<dist[v]){ dist[v]=nd; h.push([nd,v]); up(h.length-1);} } }
  return dist;
}
`,
      constraints:'n up to 2e4; m up to 1e5.',
      expectedComplexity:'O((V+E) log V)',
      tests:[
        {input:[5,[[0,1,2],[1,2,3],[0,3,6],[3,2,2],[2,4,1]],0], expected:[0,2,5,6,6], n:5},
        {input:[3,[[0,1,1],[1,2,1],[0,2,5]],0], expected:[0,1,2], n:3}
      ],
      optimal:`function dijkstra(n, edges, src){
  const adj=Array.from({length:n},()=>[]); for(const [u,v,w] of edges){ adj[u].push([v,w]); adj[v].push([u,w]); }
  const INF=1e15, dist=Array(n).fill(INF); dist[src]=0; const h=[[0,src]];
  const up=i=>{while(i){let p=(i-1)>>1;if(h[p][0]<=h[i][0])break;[h[p],h[i]]=[h[i],h[p]];i=p;}}; const dn=i=>{for(;;){let l=i*2+1,r=l+1,s=i;if(l<h.length&&h[l][0]<h[s][0])s=l;if(r<h.length&&h[r][0]<h[s][0])s=r;if(s===i)break;[h[s],h[i]]=[h[i],h[s]];i=s;}};
  while(h.length){ const [d,u]=h[0]; h[0]=h.pop(); if(h.length) dn(0); if(d!==dist[u]) continue; for(const [v,w] of adj[u]){ const nd=d+w; if(nd<dist[v]){ dist[v]=nd; h.push([nd,v]); up(h.length-1);} } }
  return dist;
}`
    }
  }
}

function makeUnionFindComponents(){
  return {
    id:'uf-components',
    title:'Union-Find: Count Components',
    difficulty:'medium',
    brief:'Return number of connected components in undirected graph.',
    hints:[
      'Parent + rank (union by rank).',
      'Path compression in find.',
      'Initialize count=n; decrement on successful union.'
    ],
    learn:{
      intuition:'Merge sets efficiently; structure flattens over time.',
      visual:'Forest of trees; unions link roots with rank heuristic.',
      pattern:'Disjoint-set with path compression.',
      template:`function countComponents(n, edges){
  const p=Array(n).fill(0).map((_,i)=>i), r=Array(n).fill(0); let c=n;
  const f=a=>p[a]===a?a:(p[a]=f(p[a]));
  const u=(a,b)=>{a=f(a); b=f(b); if(a===b) return false; if(r[a]<r[b]) [a,b]=[b,a]; p[b]=a; if(r[a]===r[b]) r[a]++; return true; };
  for(const [u1,v1] of edges) if(u(u1,v1)) c--; return c;
}`
    },
    quiz:[
      {type:'mc', prompt:'Amortized cost of find with compression?', choices:['α(n)','O(log n)','O(1) worst-case','O(n)'], answer:0, explain:'Inverse Ackermann, practically constant.'},
      {type:'sa', prompt:'What decreases when union succeeds?', accept:['components','count'], explain:'Each union reduces component count by one.'}
    ],
    practice:{
      funcName:'countComponents',
      starter:`function countComponents(n, edges){
  // TODO: DSU with path compression and union by rank
}
`,
      constraints:'n up to 1e5; edges up to 2e5.',
      expectedComplexity:'O(m α(n))',
      tests:[
        {input:[5,[[0,1],[1,2],[3,4]]], expected:2, n:5},
        {input:[5,[[0,1],[1,2],[2,3],[3,4]]], expected:1, n:5}
      ],
      optimal:`function countComponents(n, edges){
  const p=Array(n).fill(0).map((_,i)=>i), r=Array(n).fill(0); let c=n; const f=a=>p[a]===a?a:(p[a]=f(p[a])); const un=(a,b)=>{a=f(a); b=f(b); if(a===b) return false; if(r[a]<r[b]) [a,b]=[b,a]; p[b]=a; if(r[a]===r[b]) r[a]++; return true;};
  for(const [u,v] of edges) if(un(u,v)) c--; return c;
}`
    }
  }
}

function makeShipWithinDays(){
  return {
    id:'ship-within-days',
    title:'Binary Search on Answer: Ship Packages',
    difficulty:'medium',
    brief:'Min capacity to ship within D days.',
    hints:[
      'Feasibility: can we ship in ≤D days with capacity C?',
      'Binary search C from max(weight) to sum(weight).',
      'Greedy pack until exceeding C, then new day.'
    ],
    learn:{
      intuition:'Monotone feasibility lets us search thresholds.',
      visual:'Capacity axis; feasible region is suffix interval.',
      pattern:'Binary search on monotone predicate.',
      template:`function shipWithinDays(w, D){
  let lo=Math.max(...w), hi=w.reduce((a,b)=>a+b,0);
  const ok=(C)=>{ let d=1, cur=0; for(const x of w){ if(cur+x> C){ d++; cur=0; } cur+=x; } return d<=D; };
  while(lo<hi){ const mid=Math.floor((lo+hi)/2); if(ok(mid)) hi=mid; else lo=mid+1; }
  return lo;
}`
    },
    quiz:[
      {type:'mc', prompt:'Search space bounds?', choices:['[max,sum]','[0,sum]','[0,max]','[min,max]'], answer:0, explain:'Capacity must be at least max item and at most sum.'},
      {type:'sa', prompt:'Why predicate monotone?', accept:['higher capacity never worse','nondecreasing feasibility'], explain:'Increasing capacity can only make shipping easier.'}
    ],
    practice:{
      funcName:'shipWithinDays',
      starter:`function shipWithinDays(w, D){
  // TODO: binary search capacity with feasibility check
}
`,
      constraints:'n up to 1e5; weights positive.',
      expectedComplexity:'O(n log sum)',
      tests:[
        {input:[[1,2,3,4,5,6,7,8,9,10],5], expected:15, n:10},
        {input:[[3,2,2,4,1,4],3], expected:6, n:6}
      ],
      optimal:`function shipWithinDays(w,D){ let lo=Math.max(...w),hi=w.reduce((a,b)=>a+b,0); const ok=C=>{let d=1,cur=0; for(const x of w){ if(cur+x> C){ d++; cur=0; } cur+=x; } return d<=D; }; while(lo<hi){ const m=(lo+hi)>>1; if(ok(m)) hi=m; else lo=m+1; } return lo; }`
    }
  }
}

function makeSingleNumber(){
  return {
    id:'single-number',
    title:'Bit Manipulation: Single Number',
    difficulty:'easy',
    brief:'Find the element that appears once when others appear twice.',
    hints:[
      'Use XOR properties: a^a=0, a^0=a.',
      'XOR all numbers; pairs cancel out.',
      'Works because exactly one number is unique.'
    ],
    learn:{
      intuition:'XOR acts like parity accumulator over bits.',
      visual:'Pair elements cancel; lone element remains in accumulator.',
      pattern:'Linear scan with XOR.',
      template:`function singleNumber(a){ let x=0; for(const v of a) x^=v; return x; }`
    },
    quiz:[
      {type:'mc', prompt:'Space complexity?', choices:['O(1)','O(n)','O(log n)','O(k)'], answer:0, explain:'Only one accumulator.'},
      {type:'sa', prompt:'Key XOR identity?', accept:['a^a=0','x xor x = 0'], explain:'Equal pairs cancel to zero.'}
    ],
    practice:{
      funcName:'singleNumber',
      starter:`function singleNumber(a){
  // TODO: XOR all elements
}
`,
      constraints:'n up to 1e5.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[[2,2,1]], expected:1, n:3},
        {input:[[4,1,2,1,2]], expected:4, n:5}
      ],
      optimal:`function singleNumber(a){ let x=0; for(const v of a) x^=v; return x; }`
    }
  }
}

function makeValidateBST(){
  return {
    id:'validate-bst',
    title:'Validate Binary Search Tree',
    difficulty:'easy',
    brief:'Check BST property using bounds.',
    hints:[
      'Pass down allowable value range (min,max).',
      'Left subtree < node.val; right subtree > node.val.',
      'Null children are valid.'
    ],
    learn:{
      intuition:'Global constraints propagate via bounds during DFS.',
      visual:'Intervals shrink as you descend the tree.',
      pattern:'DFS with bounds (min,max).',
      template:`function isValidBST(root, min=-Infinity, max=Infinity){
  if(!root) return true; if(root.val<=min||root.val>=max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`
    },
    quiz:[
      {type:'mc', prompt:'Inorder traversal of BST yields?', choices:['Sorted order','Random','Preorder','Level order'], answer:0, explain:'Strictly increasing for valid BST.'},
      {type:'sa', prompt:'Key invariant per node?', accept:['min<val<max','value within bounds'], explain:'Node value must stay in its range.'}
    ],
    practice:{
      funcName:'isValidBST',
      starter:`function isValidBST(root, min=-Infinity, max=Infinity){
  if(!root) return true; if(root.val<=min||root.val>=max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}
`,
      constraints:'Node shape: {val,left,right}.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[{val:2,left:{val:1,left:null,right:null},right:{val:3,left:null,right:null}}], expected:true, n:3},
        {input:[{val:5,left:{val:1,left:null,right:null},right:{val:4,left:{val:3,left:null,right:null},right:{val:6,left:null,right:null}}}], expected:false, n:5}
      ],
      optimal:`function isValidBST(root,min=-Infinity,max=Infinity){ if(!root) return true; if(root.val<=min||root.val>=max) return false; return isValidBST(root.left,min,root.val)&&isValidBST(root.right,root.val,max); }`
    }
  }
}

function makeLevelOrder(){
  return {
    id:'level-order',
    title:'Binary Tree Level Order Traversal',
    difficulty:'easy',
    brief:'Return values level by level from root.',
    hints:[
      'Use BFS queue and process per-level size.',
      'Push children if not null.',
      'Collect level into array.'
    ],
    learn:{
      intuition:'Breadth-first expansion naturally yields levels.',
      visual:'Each queue iteration consumes one level block.',
      pattern:'Queue-based BFS; track size.',
      template:`function levelOrder(root){
  if(!root) return [];
  const q=[root], res=[];
  while(q.length){
    const sz=q.length, lvl=[];
    for(let i=0;i<sz;i++){
      const n=q.shift();
      lvl.push(n.val);
      if(n.left) q.push(n.left); if(n.right) q.push(n.right);
    }
    res.push(lvl);
  }
  return res;
}`
    },
    quiz:[
      {type:'mc', prompt:'Which data structure?', choices:['Queue','Stack','Heap','Trie'], answer:0, explain:'Queue processes nodes FIFO by level.'},
      {type:'sa', prompt:'What’s the loop granularity?', accept:['per-level size','level size'], explain:'Process exactly current queue length for a level.'}
    ],
    practice:{
      funcName:'levelOrder',
      starter:`function levelOrder(root){
  if(!root) return []; const q=[root], res=[]; while(q.length){ const sz=q.length, lvl=[]; for(let i=0;i<sz;i++){ const n=q.shift(); lvl.push(n.val); if(n.left) q.push(n.left); if(n.right) q.push(n.right);} res.push(lvl);} return res;
}
`,
      constraints:'Node shape: {val,left,right}.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[{val:3,left:{val:9,left:null,right:null},right:{val:20,left:{val:15,left:null,right:null},right:{val:7,left:null,right:null}}}], expected:[[3],[9,20],[15,7]], n:5},
        {input:[null], expected:[], n:0}
      ],
      optimal:`function levelOrder(root){ if(!root) return []; const q=[root], res=[]; while(q.length){ const sz=q.length, lvl=[]; for(let i=0;i<sz;i++){ const n=q.shift(); lvl.push(n.val); if(n.left) q.push(n.left); if(n.right) q.push(n.right); } res.push(lvl); } return res; }`
    }
  }
}

// -------- New item makers for expanded curriculum --------

function makeBigOBasics(){
  return {
    id:'big-o-basics',
    title:'Big-O Basics',
    difficulty:'easy',
    brief:'Understand how input size drives time and space growth.',
    hints:[
      'Focus on dominant terms; drop constants and lower-order terms.',
      'Common classes: O(1), O(log n), O(n), O(n log n), O(n^2)...',
      'Space complexity tracks peak auxiliary memory, not input storage.'
    ],
    learn:{
      intuition:'Big-O abstracts how runtime grows with input size. We compare growth rates to reason about scalability without constants.',
      visual:'Plot functions: log n grows slowly; n log n sits between linear and quadratic; exponentials explode.',
      pattern:'Count key operations, keep the dominant term, justify via loops and branching structure.',
      template:`// Example: sum of array is O(n) time, O(1) extra space
function sumArray(a){
  let s=0; for(const x of a) s+=x; return s;
}`
    },
    quiz:[
      {type:'mc', prompt:'Dominant term for 5n + 20?', choices:['O(1)','O(log n)','O(n)','O(n^2)'], answer:2, explain:'Linear term dominates as n grows.'},
      {type:'sa', prompt:'Space for in-place two-pointer scan?', accept:['O(1)','constant'], explain:'Uses constant extra pointers regardless of n.'}
    ],
    practice:{
      funcName:'sumArray',
      starter:`function sumArray(a){
  // TODO: linear scan sum, O(n) time, O(1) space
}
`,
      constraints:'n up to 1e5; integers 32-bit.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[[1,2,3]], expected:6, n:3},
        {input:[[5]], expected:5, n:1},
        {input:[[10, -3, 7, 0]], expected:14, n:4}
      ],
      optimal:`function sumArray(a){ let s=0; for(const x of a) s+=x; return s; }`
    }
  }
}

function makeNestedLoops(){
  return {
    id:'nested-loops',
    title:'Loop Patterns: Nested vs Logarithmic',
    difficulty:'easy-medium',
    brief:'Contrast O(n^2) nested loops with O(n log n) patterns.',
    hints:[
      'A loop inside a loop over n typically gives O(n^2).',
      'Binary search inside a loop yields O(n log n).',
      'Count iterations rather than instructions.'
    ],
    learn:{
      intuition:'Total work is iterations multiplied; combining loops multiplies complexities, summing separate passes.',
      visual:'n×n grid for nested loops vs. n lines with log n height for search per item.',
      pattern:'Model iterations; prefer searches or maps to replace inner scans.',
      template:`// Example: count pairs i<j with a[i]<a[j] in O(n^2)
function countIncreasingPairs(a){
  let c=0; for(let i=0;i<a.length;i++) for(let j=i+1;j<a.length;j++) if(a[i]<a[j]) c++;
  return c;
}`
    },
    quiz:[
      {type:'mc', prompt:'Which pattern is O(n log n)?', choices:['Two nested full loops','Loop + binary search','Triple nested loops','All of the above'], answer:1, explain:'Binary search inside outer loop yields O(n log n).'},
      {type:'sa', prompt:'Two separate linear passes complexity?', accept:['O(n)','linear'], explain:'O(n)+O(n)=O(n).'}
    ],
    practice:{
      funcName:'countIncreasingPairs',
      starter:`function countIncreasingPairs(a){
  // TODO: nested loops to count a[i] < a[j] for i<j
}
`,
      constraints:'n up to 2000.',
      expectedComplexity:'O(n^2)',
      tests:[
        {input:[[1,2,3]], expected:3, n:3},
        {input:[[3,2,1]], expected:0, n:3},
        {input:[[1,1,1]], expected:0, n:3}
      ],
      optimal:`function countIncreasingPairs(a){ let c=0; for(let i=0;i<a.length;i++) for(let j=i+1;j<a.length;j++) if(a[i]<a[j]) c++; return c; }`
    }
  }
}

function makeBinarySearchPrimer(){
  return {
    id:'binary-search-primer',
    title:'Binary Search (Complexity Focus)',
    difficulty:'easy',
    brief:'Use binary search to find a target; reason about O(log n).',
    hints:[
      'Halve the search space each step.',
      'Stop when low > high or when found.',
      'Beware overflow when computing mid.'
    ],
    learn:{
      intuition:'Each iteration halves the remaining search space; logarithms count how many halvings to get to 1.',
      visual:'Search interval shrinks geometrically: n, n/2, n/4, ...',
      pattern:'Classic binary search on sorted arrays.',
      template:`function binarySearch(a, x){
  let lo=0, hi=a.length-1;
  while(lo<=hi){ const mid = (lo+hi)>>1; if(a[mid]===x) return mid; if(a[mid]<x) lo=mid+1; else hi=mid-1; }
  return -1;
}`
    },
    quiz:[
      {type:'mc', prompt:'How many steps for size n?', choices:['~log2 n','~n','~n^2','constant'], answer:0, explain:'Each step halves: steps ≈ log2 n.'},
      {type:'sa', prompt:'Space complexity iterative version?', accept:['O(1)','constant'], explain:'Only a few indices are stored.'}
    ],
    practice:{
      funcName:'binarySearch',
      starter:`function binarySearch(a, x){
  let lo=0, hi=a.length-1; while(lo<=hi){ const m=(lo+hi)>>1; if(a[m]===x) return m; if(a[m]<x) lo=m+1; else hi=m-1; } return -1;
}
`,
      constraints:'Array sorted ascending; no duplicates needed.',
      expectedComplexity:'O(log n)',
      tests:[
        {input:[[1,3,5,7,9],7], expected:3, n:5},
        {input:[[1,3,5,7,9],4], expected:-1, n:5},
        {input:[[],1], expected:-1, n:0}
      ],
      optimal:`function binarySearch(a,x){ let lo=0,hi=a.length-1; while(lo<=hi){ const m=(lo+hi)>>1; if(a[m]===x) return m; if(a[m]<x) lo=m+1; else hi=m-1; } return -1; }`
    }
  }
}

function makeAmortizedDynamicArray(){
  return {
    id:'amortized-dynamic-array',
    title:'Amortized Analysis: Dynamic Array Push',
    difficulty:'easy-medium',
    brief:'Why push is O(1) amortized under doubling reallocation.',
    hints:[
      'On resize, we copy all current elements (cost equals size).',
      'Resizes happen at sizes 1,2,4,8,... — geometric series.',
      'Total copies over n pushes is < 2n; average < 2 per push.'
    ],
    learn:{
      intuition:'Although individual resizes are expensive, they happen rarely (exponentially spaced). The average work per push is constant.',
      visual:'Spikes at powers of two; area under spikes is linear in n.',
      pattern:'Aggregate method: sum costs across a sequence of operations.',
      template:`function simulatePushes(n){
  // Return total number of element moves due to resizes when pushing n items
  let cap=1, size=0, moves=0;
  for(let i=0;i<n;i++){
    if(size===cap){ moves += size; cap*=2; }
    size++;
  }
  return moves;
}`
    },
    quiz:[
      {type:'mc', prompt:'Total copies after n pushes with doubling?', choices:['Θ(n)','Θ(n log n)','Θ(n^2)','Θ(log n)'], answer:0, explain:'Geometric series 1+2+4+... < 2n ⇒ Θ(n).'},
      {type:'sa', prompt:'Amortized cost per push?', accept:['O(1)','constant'], explain:'Total Θ(n) over n ops ⇒ O(1) on average.'}
    ],
    practice:{
      funcName:'simulatePushes',
      starter:`function simulatePushes(n){ let cap=1,size=0,m=0; for(let i=0;i<n;i++){ if(size===cap){ m+=size; cap*=2; } size++; } return m; }
`,
      constraints:'n up to 1e6 (simulation is O(n)).',
      expectedComplexity:'O(n)',
      tests:[
        {input:[1], expected:0, n:1},
        {input:[5], expected:7, n:5},
        {input:[10], expected:15, n:10}
      ],
      optimal:`function simulatePushes(n){ let cap=1,size=0,m=0; for(let i=0;i<n;i++){ if(size===cap){ m+=size; cap*=2; } size++; } return m; }`
    }
  }
}

function makeMasterTheorem(){
  return {
    id:'master-theorem',
    title:'Master Theorem (Divide & Conquer)',
    difficulty:'medium-hard',
    brief:'Classify T(n) = a T(n/b) + Θ(n^k log^p n).',
    hints:[
      'Compare n^k to n^{log_b a}.',
      'Case 1: f(n) smaller ⇒ T(n) = Θ(n^{log_b a}).',
      'Case 2: equal ⇒ T(n) = Θ(n^k log^{p+1} n).',
      'Case 3: larger (regularity) ⇒ T(n) = Θ(f(n)).'
    ],
    learn:{
      intuition:'The work splits into a subproblems of size n/b plus combine work f(n). The larger term between n^{log_b a} and f(n) dictates the solution (with a log factor in the balanced case).',
      visual:'Two curves on a log-log plot: n^{log_b a} vs n^k log^p n.',
      pattern:'Compare exponents; handle the tie with an extra log.',
      template:`function classifyRecurrence(a,b,k,p){
  const nlog = Math.log(a)/Math.log(b);
  const eps = 1e-9;
  if(k < nlog - eps) return 'Case1';
  if(Math.abs(k - nlog) <= eps) return 'Case2';
  return 'Case3';
}`
    },
    quiz:[
      {type:'mc', prompt:'T(n)=2T(n/2)+n, classification?', choices:['Case1','Case2','Case3','None'], answer:1, explain:'a=2,b=2,k=1 ⇒ k=log_b a ⇒ Case2 ⇒ Θ(n log n).'},
      {type:'sa', prompt:'T(n)=T(n/2)+1 ⇒ Θ(?)', accept:['log n','O(log n)'], explain:'a=1,b=2,k=0 ⇒ k>log_b a? Here log_b a=0; p=0 and equal ⇒ Θ(n^0 log^{1} n)=Θ(log n).'}
    ],
    practice:{
      funcName:'classifyRecurrence',
      starter:`function classifyRecurrence(a,b,k,p){ const nlog=Math.log(a)/Math.log(b),e=1e-9; if(k<nlog-e) return 'Case1'; if(Math.abs(k-nlog)<=e) return 'Case2'; return 'Case3'; }
`,
      constraints:'b>1, a>=1; k,p real numbers (assumed integers in tests).',
      expectedComplexity:'O(1)',
      tests:[
        {input:[2,2,1,0], expected:'Case2', n:1},
        {input:[3,2,1,0], expected:'Case3', n:1},
        {input:[2,2,0,0], expected:'Case1', n:1}
      ],
      optimal:`function classifyRecurrence(a,b,k,p){ const nlog=Math.log(a)/Math.log(b),e=1e-9; if(k<nlog-e) return 'Case1'; if(Math.abs(k-nlog)<=e) return 'Case2'; return 'Case3'; }`
    }
  }
}

function makeDSCostCheatsheet(){
  return {
    id:'ds-costs',
    title:'Data Structure Operation Costs',
    difficulty:'easy',
    brief:'Know common operation complexities to guide choices.',
    hints:[
      'Arrays: random access O(1), middle insert O(n).',
      'Linked list: head insert O(1), index access O(n).',
      'Hash map: avg O(1) get/put/delete (watch load factor).',
      'Binary heap: push/pop O(log n), peek O(1).',
      'Stack/Queue: O(1) per op (amortized constant for dynamic array).'
    ],
    learn:{
      intuition:'Choosing the right structure often turns quadratic scans into linear or logarithmic operations.',
      visual:'Small table mapping ops to Big-O.',
      pattern:'Use maps/sets for membership; heaps for extremes; arrays for tight locality.',
      template:`function dsOpCosts(){
  return {
    array:{ index:'O(1)', search:'O(n)', insertEnd:'O(1) amortized', insertMiddle:'O(n)' },
    linkedList:{ index:'O(n)', search:'O(n)', insertHead:'O(1)', insertTail:'O(1) if tail' },
    hashMap:{ get:'O(1) avg', put:'O(1) avg', delete:'O(1) avg' },
    stack:{ push:'O(1)', pop:'O(1)' },
    queue:{ enqueue:'O(1)', dequeue:'O(1)' },
    binaryHeap:{ push:'O(log n)', pop:'O(log n)', peek:'O(1)' }
  };
}`
    },
    quiz:[
      {type:'mc', prompt:'Random access cost in array?', choices:['O(1)','O(log n)','O(n)','O(n log n)'], answer:0, explain:'Indexing is constant-time.'},
      {type:'sa', prompt:'Heap push complexity?', accept:['O(log n)','log n'], explain:'Percolate up along the height of heap.'}
    ],
    practice:{
      funcName:'dsOpCosts',
      starter:`function dsOpCosts(){ return { array:{ index:'O(1)', search:'O(n)', insertEnd:'O(1) amortized', insertMiddle:'O(n)' } }; }
`,
      constraints:'N/A',
      expectedComplexity:'O(1)',
      tests:[
        {input:[], expected:{ array:{ index:'O(1)', search:'O(n)', insertEnd:'O(1) amortized', insertMiddle:'O(n)' } }, n:1}
      ],
      optimal:`function dsOpCosts(){ return { array:{ index:'O(1)', search:'O(n)', insertEnd:'O(1) amortized', insertMiddle:'O(n)' }, linkedList:{ index:'O(n)', search:'O(n)', insertHead:'O(1)', insertTail:'O(1) if tail' }, hashMap:{ get:'O(1) avg', put:'O(1) avg', delete:'O(1) avg' }, stack:{ push:'O(1)', pop:'O(1)' }, queue:{ enqueue:'O(1)', dequeue:'O(1)' }, binaryHeap:{ push:'O(log n)', pop:'O(log n)', peek:'O(1)' } }; }`
    }
  }
}
function makeThreeSum(){
  return {
    id:'three-sum',
    title:'Two Pointers: 3Sum',
    difficulty:'medium',
    brief:'Return all unique triplets that sum to zero.',
    hints:[
      'Sort the array and fix one index i.',
      'Use two pointers j,k to find pairs summing to -nums[i].',
      'Skip duplicates for i, j, and k to avoid repeats.'
    ],
    learn:{
      intuition:'Sorting enables linear two-pointer sweep per fixed i.',
      visual:'For each i, move j,k inward as sum compares to target.',
      pattern:'Sort + two-pointers + dedup.',
      template:`function threeSum(nums){
  nums.sort((a,b)=>a-b);
  const res=[];
  for(let i=0;i<nums.length;i++){
    if(i>0 && nums[i]===nums[i-1]) continue;
    let j=i+1,k=nums.length-1;
    while(j<k){
      const s=nums[i]+nums[j]+nums[k];
      if(s===0){ res.push([nums[i],nums[j],nums[k]]);
        j++; k--; while(j<k && nums[j]===nums[j-1]) j++; while(j<k && nums[k]===nums[k+1]) k--; }
      else if(s<0) j++; else k--;
    }
  }
  return res;
}`
    },
    quiz:[
      {type:'mc', prompt:'Time complexity?', choices:['O(n^2)','O(n log n)','O(n^3)','O(n)'], answer:0, explain:'Sort O(n log n) + O(n^2) sweep dominates.'},
      {type:'sa', prompt:'How to avoid duplicates?', accept:['skip equal neighbors','deduplicate indices'], explain:'Skip same values for i, j, and k.'}
    ],
    practice:{
      funcName:'threeSum',
      starter:`function threeSum(nums){
  nums.sort((a,b)=>a-b); const res=[]; for(let i=0;i<nums.length;i++){ if(i&&nums[i]===nums[i-1]) continue; let j=i+1,k=nums.length-1; while(j<k){ const s=nums[i]+nums[j]+nums[k]; if(s===0){ res.push([nums[i],nums[j],nums[k]]); j++; k--; while(j<k&&nums[j]===nums[j-1]) j++; while(j<k&&nums[k]===nums[k+1]) k--; } else if(s<0) j++; else k--; } } return res;
}
`,
      constraints:'n up to 2000; distinct triplets only.',
      expectedComplexity:'O(n^2)',
      tests:[
        {input:[[-1,0,1,2,-1,-4]], expected:[[-1,-1,2],[-1,0,1]], n:6},
        {input:[[0,0,0,0]], expected:[[0,0,0]], n:4}
      ],
      optimal:`function threeSum(nums){ nums.sort((a,b)=>a-b); const res=[]; for(let i=0;i<nums.length;i++){ if(i&&nums[i]===nums[i-1]) continue; let j=i+1,k=nums.length-1; while(j<k){ const s=nums[i]+nums[j]+nums[k]; if(s===0){ res.push([nums[i],nums[j],nums[k]]); j++; k--; while(j<k&&nums[j]===nums[j-1]) j++; while(j<k&&nums[k]===nums[k+1]) k--; } else if(s<0) j++; else k--; } } return res; }`
    }
  }
}

function makeMinWindow(){
  return {
    id:'min-window',
    title:'Sliding Window: Minimum Window Substring',
    difficulty:'hard',
    brief:'Smallest substring of s that contains all chars of t.',
    hints:[
      'Use a need counter and a missing count.',
      'Expand right to satisfy, then shrink left to minimal.',
      'Track best window as you go.'
    ],
    learn:{
      intuition:'Two-phase window: grow to valid, shrink to minimal.',
      visual:'Left bound only moves forward; counts stay valid/incremental.',
      pattern:'Sliding window with frequency maps.',
      template:`function minWindow(s,t){
  const need=new Map(); for(const ch of t) need.set(ch,(need.get(ch)||0)+1);
  let missing=t.length, best=[Infinity,0,0];
  for(let l=0,r=0;r<s.length;r++){
    const ch=s[r]; if(need.has(ch)){ const v=need.get(ch); if(v>0) missing--; need.set(ch,v-1); }
    while(missing===0){ if(r-l+1<best[0]) best=[r-l+1,l,r+1]; const chl=s[l]; if(need.has(chl)){ const v=need.get(chl); need.set(chl,v+1); if(v+1>0) missing++; } l++; }
  }
  return best[0]===Infinity?"":s.slice(best[1],best[2]);
}`
    },
    quiz:[
      {type:'mc', prompt:'Why can left only move forward?', choices:['To keep O(n)','To avoid TLE','Because monotonic','All of the above'], answer:3, explain:'Window contracts monotonically for linear time.'},
      {type:'sa', prompt:'What resets validity?', accept:['missing>0','missing becomes positive'], explain:'When a required char count becomes positive, window invalid.'}
    ],
    practice:{
      funcName:'minWindow',
      starter:`function minWindow(s,t){
  const need=new Map(); for(const ch of t) need.set(ch,(need.get(ch)||0)+1); let missing=t.length,b=[Infinity,0,0]; for(let l=0,r=0;r<s.length;r++){ const ch=s[r]; if(need.has(ch)){ const v=need.get(ch); if(v>0) missing--; need.set(ch,v-1);} while(missing===0){ if(r-l+1<b[0]) b=[r-l+1,l,r+1]; const chl=s[l]; if(need.has(chl)){ const v=need.get(chl); need.set(chl,v+1); if(v+1>0) missing++; } l++; } } return b[0]===Infinity?"":s.slice(b[1],b[2]);
}
`,
      constraints:'|s| up to 1e5; ASCII.',
      expectedComplexity:'O(n)',
      tests:[
        {input:['ADOBECODEBANC','ABC'], expected:'BANC', n:14},
        {input:['a','a'], expected:'a', n:1},
        {input:['a','aa'], expected:'', n:1}
      ],
      optimal:`function minWindow(s,t){ const need=new Map(); for(const ch of t) need.set(ch,(need.get(ch)||0)+1); let missing=t.length,b=[Infinity,0,0]; for(let l=0,r=0;r<s.length;r++){ const ch=s[r]; if(need.has(ch)){ const v=need.get(ch); if(v>0) missing--; need.set(ch,v-1);} while(missing===0){ if(r-l+1<b[0]) b=[r-l+1,l,r+1]; const chl=s[l]; if(need.has(chl)){ const v=need.get(chl); need.set(chl,v+1); if(v+1>0) missing++; } l++; } } return b[0]===Infinity?"":s.slice(b[1],b[2]); }`
    }
  }
}

function makeTopKFrequent(){
  return {
    id:'top-k-frequent',
    title:'Top K Frequent Elements',
    difficulty:'medium',
    brief:'Return k elements by frequency with deterministic ordering.',
    hints:[
      'Count with a map; then pick by heap or buckets.',
      'For deterministic results, sort by freq desc, value asc.',
      'Buckets give O(n) average if value domain is large.'
    ],
    learn:{
      intuition:'Counting then selecting avoids full sort of raw array.',
      visual:'Frequency spectrum; top‑k picked from highest buckets.',
      pattern:'HashMap counter + heap or bucket sort.',
      template:`function topKFrequent(nums,k){
  const cnt=new Map(); for(const x of nums) cnt.set(x,(cnt.get(x)||0)+1);
  const arr=[...cnt.entries()].sort((a,b)=> b[1]-a[1] || a[0]-b[0]);
  return arr.slice(0,k).map(e=>e[0]);
}`
    },
    quiz:[
      {type:'mc', prompt:'Bucket vs heap tradeoff?', choices:['Buckets O(n) avg','Heap simpler','Heap O(n log k)','All true'], answer:3, explain:'All are true depending on constraints.'},
      {type:'sa', prompt:'Tie-break rule used?', accept:['value asc','ascending value'], explain:'We sort by frequency desc then value asc.'}
    ],
    practice:{
      funcName:'topKFrequent',
      starter:`function topKFrequent(nums,k){
  const m=new Map(); for(const x of nums) m.set(x,(m.get(x)||0)+1); const arr=[...m.entries()].sort((a,b)=> b[1]-a[1] || a[0]-b[0]); return arr.slice(0,k).map(e=>e[0]);
}
`,
      constraints:'n up to 1e5.',
      expectedComplexity:'O(n log u)',
      tests:[
        {input:[[1,1,1,2,2,3],2], expected:[1,2], n:6},
        {input:[[1],1], expected:[1], n:1}
      ],
      optimal:`function topKFrequent(nums,k){ const m=new Map(); for(const x of nums) m.set(x,(m.get(x)||0)+1); const arr=[...m.entries()].sort((a,b)=> b[1]-a[1] || a[0]-b[0]); return arr.slice(0,k).map(e=>e[0]); }`
    }
  }
}

function makeCourseSchedule(){
  return {
    id:'course-schedule',
    title:'Course Schedule (canFinish)',
    difficulty:'medium',
    brief:'Detect cycles with Kahn’s algorithm (BFS topological sort).',
    hints:[
      'Build in-degree and adjacency list.',
      'Push nodes with in-degree 0; pop and reduce neighbors.',
      'If processed count < n, there is a cycle.'
    ],
    learn:{
      intuition:'In-degree zero nodes represent available tasks.',
      visual:'Nodes peel off in layers; cycles never reach zero in-degree.',
      pattern:'Topological sort via queue.',
      template:`function canFinish(n, prereq){
  const indeg=Array(n).fill(0), adj=Array.from({length:n},()=>[]);
  for(const [a,b] of prereq){ adj[b].push(a); indeg[a]++; }
  const q=[]; for(let i=0;i<n;i++) if(indeg[i]===0) q.push(i);
  let seen=0; while(q.length){ const u=q.shift(); seen++; for(const v of adj[u]){ if(--indeg[v]===0) q.push(v); } }
  return seen===n;
}`
    },
    quiz:[
      {type:'mc', prompt:'When is schedule impossible?', choices:['Graph has cycle','Too many edges','n is large','Multiple sources'], answer:0, explain:'Cycle prevents finishing all courses.'},
      {type:'sa', prompt:'Initial queue contains nodes with what?', accept:['in-degree 0','zero in-degree'], explain:'No prerequisites.'}
    ],
    practice:{
      funcName:'canFinish',
      starter:`function canFinish(n, prereq){
  // TODO: Kahn's algorithm with queue and indegrees
}
`,
      constraints:'n up to 1e5; m up to 2e5.',
      expectedComplexity:'O(n+m)',
      tests:[
        {input:[2,[[1,0]]], expected:true, n:2},
        {input:[2,[[1,0],[0,1]]], expected:false, n:2}
      ],
      optimal:`function canFinish(n,pr){ const indeg=Array(n).fill(0), adj=Array.from({length:n},()=>[]); for(const [a,b] of pr){ adj[b].push(a); indeg[a]++; } const q=[]; for(let i=0;i<n;i++) if(indeg[i]===0) q.push(i); let seen=0; while(q.length){ const u=q.shift(); seen++; for(const v of adj[u]) if(--indeg[v]===0) q.push(v); } return seen===n; }`
    }
  }
}

function makeNumIslands(){
  return {
    id:'num-islands',
    title:'Number of Islands',
    difficulty:'medium',
    brief:'Count connected components of 1s using DFS/BFS.',
    hints:[
      'Traverse grid and start DFS from unseen land.',
      'Mark visited to avoid recounting.',
      '4-directional adjacency (up/down/left/right).'
    ],
    learn:{
      intuition:'Each DFS flood fills one island.',
      visual:'Marking visited shrinks search to new components.',
      pattern:'Grid DFS/BFS with visited set or in-place marking.',
      template:`function numIslands(g){
  if(!g||!g.length) return 0; const m=g.length,n=g[0].length; let count=0;
  const dfs=(i,j)=>{ if(i<0||j<0||i>=m||j>=n||g[i][j]!=='1') return; g[i][j]='0'; dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1); };
  for(let i=0;i<m;i++) for(let j=0;j<n;j++) if(g[i][j]==='1'){ count++; dfs(i,j); }
  return count;
}`
    },
    quiz:[
      {type:'mc', prompt:'Space complexity (recursion)?', choices:['O(#island size)','O(1)','O(mn)','O(log n)'], answer:0, explain:'Call stack depth up to island size.'},
      {type:'sa', prompt:'Adjacency directions used?', accept:['4','four','4-directional'], explain:'Up, down, left, right.'}
    ],
    practice:{
      funcName:'numIslands',
      starter:`function numIslands(g){
  // TODO: grid DFS/BFS and mark visited/in-place
}
`,
      constraints:'m,n up to 200.',
      expectedComplexity:'O(mn)',
      tests:[
        {input:[[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected:3, n:16}
      ],
      optimal:`function numIslands(g){ if(!g||!g.length) return 0; const m=g.length,n=g[0].length; let c=0; const dfs=(i,j)=>{ if(i<0||j<0||i>=m||j>=n||g[i][j]!=='1') return; g[i][j]='0'; dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1); }; for(let i=0;i<m;i++) for(let j=0;j<n;j++) if(g[i][j]==='1'){ c++; dfs(i,j);} return c; }`
    }
  }
}

function makeGroupAnagrams(){
  return {
    id:'group-anagrams',
    title:'Group Anagrams',
    difficulty:'medium',
    brief:'Group words that are anagrams; deterministic order.',
    hints:[
      'Normalize words by sorted letters or frequency signature.',
      'Collect groups by signature.',
      'Sort each group and groups by first element.'
    ],
    learn:{
      intuition:'Hashing by canonical form collapses equivalent strings.',
      visual:'Buckets by signature; each contains a sorted list.',
      pattern:'HashMap signature → list of words.',
      template:`function groupAnagrams(strs){
  const m=new Map();
  for(const s of strs){ const key=[...s].sort().join(''); if(!m.has(key)) m.set(key,[]); m.get(key).push(s); }
  const res=[...m.values()].map(g=>g.sort());
  res.sort((a,b)=> a[0].localeCompare(b[0]));
  return res;
}`
    },
    quiz:[
      {type:'mc', prompt:'Signature choice?', choices:['Sorted string','Frequency vector','Both valid','Neither'], answer:2, explain:'Both yield canonical keys.'},
      {type:'sa', prompt:'Why sort groups?', accept:['deterministic output','stable compare'], explain:'To match expected ordering deterministically.'}
    ],
    practice:{
      funcName:'groupAnagrams',
      starter:`function groupAnagrams(strs){
  // TODO: group by sorted signature; sort groups and lists
}
`,
      constraints:'Total chars up to 1e5; lowercase ASCII.',
      expectedComplexity:'O(total log L)',
      tests:[
        {input:[["eat","tea","tan","ate","nat","bat"]], expected:[["ate","eat","tea"],["bat"],["nat","tan"]], n:6}
      ],
      optimal:`function groupAnagrams(strs){ const m=new Map(); for(const s of strs){ const key=[...s].sort().join(''); (m.get(key)||m.set(key,[]).get(key)).push(s); } const res=[...m.values()].map(g=>g.sort()); res.sort((a,b)=> a[0].localeCompare(b[0])); return res; }`
    }
  }
}

function makeFenwick(){
  return {
    id:'fenwick-tree',
    title:'Fenwick Tree (Binary Indexed Tree)',
    difficulty:'medium',
    brief:'Point updates and prefix/range sums in O(log n).',
    hints:[
      'Store partial sums; lowbit isolates least significant 1-bit.',
      'Update climbs by adding lowbit; prefix sum descends by subtracting it.',
      'Range sum [l,r] = pref(r) - pref(l-1).'
    ],
    learn:{
      intuition:'Fenwick compresses a tree of partial sums in an array; bit tricks navigate parents/children.',
      visual:'Indices cover ranges of power-of-two sizes.',
      pattern:'lowbit(x) = x & -x; add and sum loops.',
      template:`function fenwickProcess(n, ops){
  const bit=Array(n+1).fill(0);
  const lowbit=x=>x & -x; const add=(i,delta)=>{ for(i++; i<=n; i+=lowbit(i)) bit[i]+=delta; };
  const sum=i=>{ let s=0; for(i++; i>0; i-=lowbit(i)) s+=bit[i]; return s; };
  const out=[]; for(const op of ops){ if(op[0]==='add') add(op[1], op[2]); else if(op[0]==='sum') out.push(sum(op[1])); else if(op[0]==='range') out.push(sum(op[2])-sum(op[1]-1)); }
  return out;
}`
    },
    quiz:[
      {type:'mc', prompt:'Time per add/sum?', choices:['O(log n)','O(1)','O(n)','O(n log n)'], answer:0, explain:'Traverse bits to root or leaf via lowbit.'},
      {type:'sa', prompt:'lowbit(x) equals?', accept:['x & -x','lowbit = x & -x'], explain:'Two’s complement trick isolates least significant 1-bit.'}
    ],
    practice:{
      funcName:'fenwickProcess',
      starter:`function fenwickProcess(n, ops){
  const bit=Array(n+1).fill(0), lb=x=>x&-x;
  const add=(i,d)=>{ for(i++; i<=n; i+=lb(i)) bit[i]+=d; };
  const sum=(i)=>{ let s=0; for(i++; i>0; i-=lb(i)) s+=bit[i]; return s; };
  const out=[]; for(const op of ops){ if(op[0]==='add') add(op[1],op[2]); else if(op[0]==='sum') out.push(sum(op[1])); else out.push(sum(op[2])-sum(op[1]-1)); } return out;
}
`,
      constraints:'n up to 1e5; ops up to 1e5.',
      expectedComplexity:'O((n+q) log n)',
      tests:[
        {input:[5,[['add',0,1],['add',1,2],['add',2,3],['sum',2],['range',1,2]]], expected:[6,5], n:5}
      ],
      optimal:`function fenwickProcess(n,ops){ const bit=Array(n+1).fill(0),lb=x=>x&-x,add=(i,d)=>{ for(i++; i<=n; i+=lb(i)) bit[i]+=d; },sum=i=>{ let s=0; for(i++; i>0; i-=lb(i)) s+=bit[i]; return s; }; const out=[]; for(const op of ops){ if(op[0]==='add') add(op[1],op[2]); else if(op[0]==='sum') out.push(sum(op[1])); else out.push(sum(op[2])-sum(op[1]-1)); } return out; }`
    }
  }
}

function makeSegmentTree(){
  return {
    id:'segment-tree',
    title:'Segment Tree (Range Sum, Point Update)',
    difficulty:'medium-hard',
    brief:'Explicit tree supporting range sum queries and point updates.',
    hints:[
      'Build tree size as power-of-two base for simplicity.',
      'Update affects O(log n) nodes; query aggregates over segments.',
      'Store in flat array: children of i are 2i and 2i+1.'
    ],
    learn:{
      intuition:'Segment trees generalize range queries with merge functions, trading space for fast updates/queries.',
      visual:'Complete binary tree over array indices.',
      pattern:'Bottom-up tree with flat array for performance.',
      template:`function segtreeProcess(a, ops){
  const n=a.length; let N=1; while(N<n) N<<=1; const t=Array(2*N).fill(0);
  for(let i=0;i<n;i++) t[N+i]=a[i]; for(let i=N-1;i>0;i--) t[i]=t[i<<1]+t[i<<1|1];
  const update=(i,val)=>{ i+=N; t[i]=val; for(i>>=1;i;i>>=1) t[i]=t[i<<1]+t[i<<1|1]; };
  const query=(l,r)=>{ let res=0; for(l+=N,r+=N; l<=r; l>>=1,r>>=1){ if(l&1) res+=t[l++]; if(!(r&1)) res+=t[r--]; } return res; };
  const out=[]; for(const op of ops){ if(op[0]==='set') update(op[1],op[2]); else if(op[0]==='sum') out.push(query(op[1],op[2])); }
  return out;
}`
    },
    quiz:[
      {type:'mc', prompt:'Build time?', choices:['O(n)','O(n log n)','O(log n)','O(1)'], answer:0, explain:'Bottom-up build is linear.'},
      {type:'sa', prompt:'Query time?', accept:['O(log n)'], explain:'At most 2 log n segments.'}
    ],
    practice:{
      funcName:'segtreeProcess',
      starter:`function segtreeProcess(a, ops){
  // TODO: bottom-up segment tree; ops: ['set',i,val], ['sum',l,r]
}
`,
      constraints:'n up to 1e5; q up to 1e5.',
      expectedComplexity:'O((n+q) log n)',
      tests:[
        {input:[[1,2,3,4],[['sum',1,3],['set',2,10],['sum',0,3]]], expected:[9,17], n:4}
      ],
      optimal:`function segtreeProcess(a,ops){ const n=a.length; let N=1; while(N<n) N<<=1; const t=Array(2*N).fill(0); for(let i=0;i<n;i++) t[N+i]=a[i]; for(let i=N-1;i>0;i--) t[i]=t[i<<1]+t[i<<1|1]; const upd=(i,v)=>{ i+=N; t[i]=v; for(i>>=1;i;i>>=1) t[i]=t[i<<1]+t[i<<1|1]; }, qry=(l,r)=>{ let s=0; for(l+=N,r+=N;l<=r;l>>=1,r>>=1){ if(l&1) s+=t[l++]; if(!(r&1)) s+=t[r--]; } return s; }; const out=[]; for(const op of ops){ if(op[0]==='set') upd(op[1],op[2]); else out.push(qry(op[1],op[2])); } return out; }`
    }
  }
}

function makeSparseTable(){
  return {
    id:'sparse-table',
    title:'Sparse Table (RMQ, static)',
    difficulty:'medium',
    brief:'O(n log n) build, O(1) min query on static array.',
    hints:[
      'st[k][i] = min of interval length 2^k starting at i.',
      'Query by overlapping two blocks covering length.',
      'Precompute logs for O(1) queries.'
    ],
    learn:{
      intuition:'Overlapping power-of-two blocks let us answer min queries in constant time without updates.',
      visual:'Intervals doubling each level; combine two blocks for any length.',
      pattern:'Dynamic programming over interval lengths.',
      template:`function rmqSparseTable(a, queries){
  const n=a.length, K=Math.floor(Math.log2(Math.max(1,n)))+1; const st=Array.from({length:K},()=>Array(n).fill(Infinity));
  for(let i=0;i<n;i++) st[0][i]=a[i];
  for(let k=1;k<K;k++) for(let i=0;i+(1<<k)<=n;i++) st[k][i]=Math.min(st[k-1][i], st[k-1][i+(1<<(k-1))]);
  const lg=Array(n+1).fill(0); for(let i=2;i<=n;i++) lg[i]=lg[i>>1]+1;
  const out=[]; for(const [l,r] of queries){ const k=lg[r-l+1]; out.push(Math.min(st[k][l], st[k][r-(1<<k)+1])); }
  return out;
}`
    },
    quiz:[
      {type:'mc', prompt:'Update support?', choices:['No (static)','Yes O(log n)','Yes O(1)','Only insert'], answer:0, explain:'Sparse table is for static arrays.'},
      {type:'sa', prompt:'Query time?', accept:['O(1)'], explain:'Two precomputed blocks cover the interval.'}
    ],
    practice:{
      funcName:'rmqSparseTable',
      starter:`function rmqSparseTable(a, queries){
  // TODO: build sparse table for min; answer queries [l,r]
}
`,
      constraints:'n up to 1e5; q up to 1e5.',
      expectedComplexity:'O(n log n) build, O(1) query',
      tests:[
        {input:[[1,3,0,2,5,4],[[0,2],[2,5],[1,3]]], expected:[0,0,0], n:6}
      ],
      optimal:`function rmqSparseTable(a,qs){ const n=a.length,K=Math.floor(Math.log2(Math.max(1,n)))+1,st=Array.from({length:K},()=>Array(n).fill(Infinity)); for(let i=0;i<n;i++) st[0][i]=a[i]; for(let k=1;k<K;k++) for(let i=0;i+(1<<k)<=n;i++) st[k][i]=Math.min(st[k-1][i],st[k-1][i+(1<<(k-1))]); const lg=Array(n+1).fill(0); for(let i=2;i<=n;i++) lg[i]=lg[i>>1]+1; const out=[]; for(const [l,r] of qs){ const k=lg[r-l+1]; out.push(Math.min(st[k][l], st[k][r-(1<<k)+1])); } return out; }`
    }
  }
}

function makeKMP(){
  return {
    id:'kmp',
    title:'KMP String Matching',
    difficulty:'medium-hard',
    brief:'Linear-time search using prefix-function (pi/LPS).',
    hints:[
      'Compute LPS (longest proper prefix which is also suffix).',
      'On mismatch, jump using LPS instead of resetting.',
      'Concatenate pattern + # + text to reuse prefix-function.'
    ],
    learn:{
      intuition:'KMP precomputes self-overlaps of the pattern to avoid rechecking characters, guaranteeing linear time.',
      visual:'Automaton-like jumps on mismatches guided by LPS.',
      pattern:'Prefix-function or LPS array + linear scan.',
      template:`function kmpSearch(text, pat){
  const s = pat+'#'+text; const n=s.length; const pi=Array(n).fill(0);
  for(let i=1;i<n;i++){ let j=pi[i-1]; while(j>0 && s[i]!==s[j]) j=pi[j-1]; if(s[i]===s[j]) j++; pi[i]=j; }
  const m=pat.length, out=[]; for(let i=0;i<n;i++) if(pi[i]===m) out.push(i-2*m); return out;
}`
    },
    quiz:[
      {type:'mc', prompt:'Time complexity?', choices:['O(n+m)','O(nm)','O(n log n)','O(m^2)'], answer:0, explain:'Build LPS/prefix in O(n+m); scan is linear.'},
      {type:'sa', prompt:'What does LPS[i] store?', accept:['longest proper prefix which is also suffix','prefix function'], explain:'Standard definition.'}
    ],
    practice:{
      funcName:'kmpSearch',
      starter:`function kmpSearch(text, pat){
  // TODO: return array of starting indices where pat occurs in text
}
`,
      constraints:'|text| up to 2e5; |pat| up to 2e5.',
      expectedComplexity:'O(n+m)',
      tests:[
        {input:['ababcabcabababd','ababd'], expected:[10], n:17},
        {input:['aaaaa','aa'], expected:[0,1,2,3], n:5}
      ],
      optimal:`function kmpSearch(text,pat){ const s=pat+'#'+text; const n=s.length,pi=Array(n).fill(0); for(let i=1;i<n;i++){ let j=pi[i-1]; while(j>0 && s[i]!==s[j]) j=pi[j-1]; if(s[i]===s[j]) j++; pi[i]=j; } const m=pat.length,out=[]; for(let i=0;i<n;i++) if(pi[i]===m) out.push(i-2*m); return out; }`
    }
  }
}

function makeZFunction(){
  return {
    id:'z-function',
    title:'Z-Algorithm',
    difficulty:'medium',
    brief:'Linear-time prefix match lengths for every position.',
    hints:[
      'Maintain [L,R] window of matched prefix.',
      'Reuse previous Z values when inside [L,R].',
      'Useful for pattern matching and string properties.'
    ],
    learn:{
      intuition:'Z[i] tells how many characters match starting at i with the string prefix. Keeping a current match window avoids rework.',
      visual:'Sliding window of equality with the prefix.',
      pattern:'Extend matches and reuse Z inside the window.',
      template:`function zFunction(s){
  const n=s.length, z=Array(n).fill(0); let L=0,R=0;
  for(let i=1;i<n;i++){
    if(i<=R) z[i]=Math.min(R-i+1, z[i-L]);
    while(i+z[i]<n && s[z[i]]===s[i+z[i]]) z[i]++;
    if(i+z[i]-1>R){ L=i; R=i+z[i]-1; }
  }
  return z;
}`
    },
    quiz:[
      {type:'mc', prompt:'Z[0] value typically?', choices:['0','n','1','-'], answer:0, explain:'Often set to 0 by convention (full length is known).'},
      {type:'sa', prompt:'Time complexity?', accept:['O(n)'], explain:'Each i extends at most once past R.'}
    ],
    practice:{
      funcName:'zFunction',
      starter:`function zFunction(s){
  // TODO: compute Z array
}
`,
      constraints:'|s| up to 2e5.',
      expectedComplexity:'O(n)',
      tests:[
        {input:['aaaaa'], expected:[0,4,3,2,1], n:5},
        {input:['abacaba'], expected:[0,0,1,0,3,0,1], n:7}
      ],
      optimal:`function zFunction(s){ const n=s.length,z=Array(n).fill(0); let L=0,R=0; for(let i=1;i<n;i++){ if(i<=R) z[i]=Math.min(R-i+1,z[i-L]); while(i+z[i]<n && s[z[i]]===s[i+z[i]]) z[i]++; if(i+z[i]-1>R){ L=i; R=i+z[i]-1; } } return z; }`
    }
  }
}

function makeSCCKosaraju(){
  return {
    id:'scc-kosaraju',
    title:'Strongly Connected Components (Kosaraju)',
    difficulty:'medium-hard',
    brief:'Two-pass DFS on graph and its transpose.',
    hints:[
      'DFS to compute finish order; run DFS on reversed graph in that order.',
      'Each DFS tree in pass 2 is one SCC.',
      'Use adjacency lists; be mindful of recursion limits.'
    ],
    learn:{
      intuition:'Finishing times order sources in the DAG of SCCs; reversing edges discovers components.',
      visual:'Condensation graph DAG; reverse edges collapse sources first.',
      pattern:'Two DFS passes with stack/order list.',
      template:`function sccCount(n, edges){
  const g=Array.from({length:n},()=>[]), gr=Array.from({length:n},()=>[]);
  for(const [u,v] of edges){ g[u].push(v); gr[v].push(u); }
  const vis=Array(n).fill(false), order=[];
  const dfs=u=>{ vis[u]=true; for(const v of g[u]) if(!vis[v]) dfs(v); order.push(u); };
  for(let i=0;i<n;i++) if(!vis[i]) dfs(i);
  const vis2=Array(n).fill(false); let comp=0; const dfs2=u=>{ vis2[u]=true; for(const v of gr[u]) if(!vis2[v]) dfs2(v); };
  for(let i=n-1;i>=0;i--){ const u=order[i]; if(!vis2[u]){ comp++; dfs2(u); } }
  return comp;
}`
    },
    quiz:[
      {type:'mc', prompt:'Condensation graph is always?', choices:['DAG','Tree','Complete graph','Bipartite'], answer:0, explain:'SCC condensation has no cycles.'},
      {type:'sa', prompt:'Pass order for reversed graph?', accept:['reverse finishing times','decreasing finish time'], explain:'Use nodes in reverse first-pass postorder.'}
    ],
    practice:{
      funcName:'sccCount',
      starter:`function sccCount(n, edges){
  // TODO: two-pass DFS (Kosaraju) and return number of SCCs
}
`,
      constraints:'n up to 1e5; m up to 2e5.',
      expectedComplexity:'O(n+m)',
      tests:[
        {input:[5,[[0,1],[1,2],[2,0],[1,3],[3,4]]], expected:3, n:5}
      ],
      optimal:`function sccCount(n,edges){ const g=Array.from({length:n},()=>[]),gr=Array.from({length:n},()=>[]); for(const [u,v] of edges){ g[u].push(v); gr[v].push(u);} const vis=Array(n).fill(false),ord=[]; const dfs=u=>{ vis[u]=true; for(const v of g[u]) if(!vis[v]) dfs(v); ord.push(u); }; for(let i=0;i<n;i++) if(!vis[i]) dfs(i); const vis2=Array(n).fill(false); let c=0; const dfs2=u=>{ vis2[u]=true; for(const v of gr[u]) if(!vis2[v]) dfs2(v); }; for(let i=n-1;i>=0;i--){ const u=ord[i]; if(!vis2[u]){ c++; dfs2(u);} } return c; }`
    }
  }
}

function makeMSTKruskal(){
  return {
    id:'mst-kruskal',
    title:'Minimum Spanning Tree (Kruskal)',
    difficulty:'medium',
    brief:'Sort edges by weight, add if they connect different components.',
    hints:[
      'Use DSU/Union-Find for cycle checks.',
      'Sort edges ascending; add when union succeeds.',
      'Stop after n-1 edges added.'
    ],
    learn:{
      intuition:'Greedy stays safe because the lightest edge crossing any cut is safe (cut property).',
      visual:'Edges added form a forest; components merge over time.',
      pattern:'Sort + DSU unions.',
      template:`function mstWeight(n, edges){
  edges.sort((a,b)=>a[2]-b[2]); const p=Array(n).fill(0).map((_,i)=>i), r=Array(n).fill(0);
  const f=a=>p[a]===a?a:(p[a]=f(p[a])); const u=(a,b)=>{ a=f(a); b=f(b); if(a===b) return false; if(r[a]<r[b]) [a,b]=[b,a]; p[b]=a; if(r[a]===r[b]) r[a]++; return true; };
  let w=0, cnt=0; for(const [a,b,c] of edges){ if(u(a,b)){ w+=c; cnt++; if(cnt===n-1) break; } }
  return w;
}`
    },
    quiz:[
      {type:'mc', prompt:'Correctness based on?', choices:['Cut property','Cycle property','Both','Neither'], answer:2, explain:'Kruskal uses both properties in proofs.'},
      {type:'sa', prompt:'Edge count in MST?', accept:['n-1'], explain:'A spanning tree on n nodes has exactly n-1 edges.'}
    ],
    practice:{
      funcName:'mstWeight',
      starter:`function mstWeight(n, edges){
  // TODO: Kruskal with DSU; return total weight
}
`,
      constraints:'n up to 1e5; m up to 2e5.',
      expectedComplexity:'O(m log m)',
      tests:[
        {input:[4,[[0,1,1],[1,2,2],[2,3,3],[3,0,4],[0,2,10]]], expected:6, n:4}
      ],
      optimal:`function mstWeight(n,edges){ edges.sort((a,b)=>a[2]-b[2]); const p=Array(n).fill(0).map((_,i)=>i),r=Array(n).fill(0); const f=a=>p[a]===a?a:(p[a]=f(p[a])); const un=(a,b)=>{ a=f(a); b=f(b); if(a===b) return false; if(r[a]<r[b]) [a,b]=[b,a]; p[b]=a; if(r[a]===r[b]) r[a]++; return true; }; let w=0,c=0; for(const [a,b,wt] of edges){ if(un(a,b)){ w+=wt; if(++c===n-1) break; } } return w; }`
    }
  }
}

function makeLCABinaryLifting(){
  return {
    id:'lca-binary-lifting',
    title:'LCA via Binary Lifting',
    difficulty:'medium-hard',
    brief:'Precompute 2^k ancestors and depths to answer LCA queries.',
    hints:[
      'Root the tree; up[k][v] is the 2^k-th ancestor.',
      'Lift the deeper node to same depth; then jump both.',
      'Precompute up to floor(log2 n).' 
    ],
    learn:{
      intuition:'Binary lifting accelerates ancestor jumps from O(depth) to O(log n).',
      visual:'Jump table like sparse table over parent pointers.',
      pattern:'BFS/DFS to set depths, then DP table of ancestors.',
      template:`function lcaQueries(n, edges, root, queries){
  const g=Array.from({length:n},()=>[]); for(const [u,v] of edges){ g[u].push(v); g[v].push(u); }
  const LOG=Math.floor(Math.log2(Math.max(1,n)))+1; const up=Array.from({length:LOG},()=>Array(n).fill(0)); const depth=Array(n).fill(0);
  const q=[root]; const vis=Array(n).fill(false); vis[root]=true; up[0][root]=root; while(q.length){ const u=q.shift(); for(const v of g[u]) if(!vis[v]){ vis[v]=true; depth[v]=depth[u]+1; up[0][v]=u; q.push(v);} }
  for(let k=1;k<LOG;k++) for(let v=0;v<n;v++) up[k][v]=up[k-1][ up[k-1][v] ];
  const lift=(v,d)=>{ for(let k=0;k<LOG;k++) if(d>>k & 1) v=up[k][v]; return v; };
  const lca=(a,b)=>{ if(depth[a]<depth[b]) [a,b]=[b,a]; a=lift(a, depth[a]-depth[b]); if(a===b) return a; for(let k=LOG-1;k>=0;k--) if(up[k][a]!==up[k][b]){ a=up[k][a]; b=up[k][b]; } return up[0][a]; };
  return queries.map(([a,b])=> lca(a,b));
}`
    },
    quiz:[
      {type:'mc', prompt:'Preprocessing time?', choices:['O(n log n)','O(n)','O(log n)','O(n^2)'], answer:0, explain:'LOG levels for n nodes.'},
      {type:'sa', prompt:'Per-query time?', accept:['O(log n)'], explain:'Lift bits of depth difference and jump table.'}
    ],
    practice:{
      funcName:'lcaQueries',
      starter:`function lcaQueries(n, edges, root, queries){
  // TODO: binary lifting precompute + LCA answers
}
`,
      constraints:'n up to 1e5; q up to 1e5.',
      expectedComplexity:'O(n log n) prep, O(log n) query',
      tests:[
        {input:[5,[[0,1],[1,2],[1,3],[3,4]],0,[[2,4],[2,3],[0,4]]], expected:[1,1,0], n:5}
      ],
      optimal:`function lcaQueries(n,edges,root,qs){ const g=Array.from({length:n},()=>[]); for(const [u,v] of edges){ g[u].push(v); g[v].push(u);} const LOG=Math.floor(Math.log2(Math.max(1,n)))+1,up=Array.from({length:LOG},()=>Array(n).fill(0)),dep=Array(n).fill(0),vis=Array(n).fill(false),q=[root]; vis[root]=true; up[0][root]=root; while(q.length){ const u=q.shift(); for(const v of g[u]) if(!vis[v]){ vis[v]=true; dep[v]=dep[u]+1; up[0][v]=u; q.push(v);} } for(let k=1;k<LOG;k++) for(let v=0;v<n;v++) up[k][v]=up[k-1][ up[k-1][v] ]; const lift=(v,d)=>{ for(let k=0;k<LOG;k++) if(d>>k & 1) v=up[k][v]; return v; }; const lca=(a,b)=>{ if(dep[a]<dep[b]) [a,b]=[b,a]; a=lift(a,dep[a]-dep[b]); if(a===b) return a; for(let k=LOG-1;k>=0;k--) if(up[k][a]!==up[k][b]){ a=up[k][a]; b=up[k][b]; } return up[0][a]; }; return qs.map(([a,b])=> lca(a,b)); }`
    }
  }
}

function makeMaxFlowEK(){
  return {
    id:'max-flow-ek',
    title:'Max Flow (Edmonds–Karp)',
    difficulty:'hard',
    brief:'BFS on residual graph to find augmenting paths (O(VE^2)).',
    hints:[
      'Build residual capacities; reverse edges gain capacity when used.',
      'Use BFS to find shortest augmenting paths; augment along min residual.',
      'Stop when no path from s to t exists.'
    ],
    learn:{
      intuition:'Flow increases via augmenting paths; BFS bounds the number of augmentations for correctness and complexity.',
      visual:'Residual edges appear/disappear as flow changes.',
      pattern:'Residual graph + BFS parent arrays.',
      template:`function maxFlow(n, edges, s, t){
  const g=Array.from({length:n},()=>[]);
  const addEdge=(u,v,c)=>{ const a={v,cap:c,rev:0}, b={v:u,cap:0,rev:0}; a.rev=g[v].length; b.rev=g[u].length; g[u].push(a); g[v].push(b); };
  for(const [u,v,c] of edges) addEdge(u,v,c);
  let flow=0; const INF=1e15;
  for(;;){ const q=[s], par=Array(n).fill([-1,-1]); let head=0; par[s]=[s,-1];
    while(head<q.length){ const u=q[head++]; for(let i=0;i<g[u].length;i++){ const e=g[u][i]; if(e.cap>0 && par[e.v][0]===-1){ par[e.v]=[u,i]; if(e.v===t){ head=q.length; break; } q.push(e.v); } } }
    if(par[t][0]===-1) break; let aug=INF; for(let v=t; v!==s; ){ const [u,idx]=par[v]; const e=g[u][idx]; aug=Math.min(aug,e.cap); v=u; }
    for(let v=t; v!==s; ){ const [u,idx]=par[v]; const e=g[u][idx]; e.cap-=aug; g[v][e.rev].cap+=aug; v=u; } flow+=aug; }
  return flow;
}`
    },
    quiz:[
      {type:'mc', prompt:'When does algorithm terminate?', choices:['No s→t path','Negative cycle','All edges saturated','When max degree reached'], answer:0, explain:'No augmenting path exists in residual graph.'},
      {type:'sa', prompt:'Complexity bound?', accept:['O(VE^2)'], explain:'Edmonds–Karp complexity is O(VE^2).'}
    ],
    practice:{
      funcName:'maxFlow',
      starter:`function maxFlow(n, edges, s, t){
  // TODO: Edmonds–Karp BFS on residual graph
}
`,
      constraints:'n up to 200; m up to 1000 (keep small).',
      expectedComplexity:'O(VE^2)',
      tests:[
        {input:[4,[[0,1,3],[0,2,2],[1,2,1],[1,3,2],[2,3,4]],0,3], expected:5, n:4}
      ],
      optimal:`function maxFlow(n,edges,s,t){ const g=Array.from({length:n},()=>[]); const add=(u,v,c)=>{ const a={v,cap:c,rev:0},b={v:u,cap:0,rev:0}; a.rev=g[v].length; b.rev=g[u].length; g[u].push(a); g[v].push(b); }; for(const [u,v,c] of edges) add(u,v,c); let flow=0,INF=1e15; for(;;){ const q=[s],par=Array(n).fill([-1,-1]); let h=0; par[s]=[s,-1]; while(h<q.length){ const u=q[h++]; for(let i=0;i<g[u].length;i++){ const e=g[u][i]; if(e.cap>0 && par[e.v][0]===-1){ par[e.v]=[u,i]; if(e.v===t){ h=q.length; break; } q.push(e.v); } } } if(par[t][0]===-1) break; let aug=INF; for(let v=t; v!==s; ){ const [u,i]=par[v]; aug=Math.min(aug,g[u][i].cap); v=u; } for(let v=t; v!==s; ){ const [u,i]=par[v]; const e=g[u][i]; e.cap-=aug; g[v][e.rev].cap+=aug; v=u; } flow+=aug; } return flow; }`
    }
  }
}

function makeFastPowMod(){
  return {
    id:'fast-pow',
    title:'Fast Power (Modular Exponentiation)',
    difficulty:'easy',
    brief:'Binary exponentiation in O(log b).',
    hints:[
      'Repeated squaring; multiply when bit set.',
      'Use 64-bit safe math by modular multiplication.',
      'Handle b=0 case (return 1 mod m).'
    ],
    learn:{
      intuition:'Exponentiation by squaring halves the exponent each step.',
      visual:'Binary decomposition of exponent controls multiplies.',
      pattern:'Iterative or recursive fast power.',
      template:`function powmod(a,b,m){
  a%=m; let res=1%m; while(b>0){ if(b&1) res=(res*a)%m; a=(a*a)%m; b>>=1; } return res;
}`
    },
    quiz:[
      {type:'mc', prompt:'Time complexity?', choices:['O(log b)','O(b)','O(b log b)','O(1)'], answer:0, explain:'Each step halves exponent.'},
      {type:'sa', prompt:'powmod(2,0,7)=?', accept:['1'], explain:'Any^0 = 1; mod doesn’t change 1.'}
    ],
    practice:{
      funcName:'powmod',
      starter:`function powmod(a,b,m){
  // TODO: fast power via repeated squaring
}
`,
      constraints:'0<=a<m<=1e9+7; b up to 1e18 (JS safe with integers here).',
      expectedComplexity:'O(log b)',
      tests:[
        {input:[2,10,1000], expected:24, n:1},
        {input:[3,0,7], expected:1, n:1}
      ],
      optimal:`function powmod(a,b,m){ a%=m; let r=1%m; while(b>0){ if(b&1) r=(r*a)%m; a=(a*a)%m; b>>=1; } return r; }`
    }
  }
}

function makeFibMatrixExpo(){
  return {
    id:'fib-mat-expo',
    title:'Matrix Exponentiation: Fibonacci',
    difficulty:'medium',
    brief:'Compute F(n) using fast exponentiation of 2x2 matrices.',
    hints:[
      '[ [1,1],[1,0] ]^n gives Fibonacci in top-right/top-left.',
      'Multiply matrices mod M; exponentiate by squaring.',
      'Edge cases: n=0 returns 0.'
    ],
    learn:{
      intuition:'Linear recurrences can be encoded as matrix powers for O(log n) computation.',
      visual:'Exponentiation tree of matrices.',
      pattern:'Binary exponentiation generalized to matrices.',
      template:`function fibN(n, M=1000000007){
  const mul=(A,B)=>[[ (A[0][0]*B[0][0]+A[0][1]*B[1][0])%M, (A[0][0]*B[0][1]+A[0][1]*B[1][1])%M ], [ (A[1][0]*B[0][0]+A[1][1]*B[1][0])%M, (A[1][0]*B[0][1]+A[1][1]*B[1][1])%M ]];
  const pow=(A,k)=>{ let R=[[1,0],[0,1]]; while(k>0){ if(k&1) R=mul(R,A); A=mul(A,A); k>>=1; } return R; };
  if(n===0) return 0; const Q=[[1,1],[1,0]]; const R=pow(Q,n-1); return R[0][0];
}`
    },
    quiz:[
      {type:'mc', prompt:'Time complexity?', choices:['O(log n)','O(n)','O(n log n)','O(1)'], answer:0, explain:'Exponentiation halves n each step.'},
      {type:'sa', prompt:'F(0)=?', accept:['0'], explain:'By definition in this setup.'}
    ],
    practice:{
      funcName:'fibN',
      starter:`function fibN(n, M=1000000007){
  // TODO: matrix exponentiation of Q-matrix
}
`,
      constraints:'n up to 1e18 (use JS numbers prudently modulo M).',
      expectedComplexity:'O(log n)',
      tests:[
        {input:[10,1000000007], expected:55, n:10},
        {input:[0,1000000007], expected:0, n:0}
      ],
      optimal:`function fibN(n,M=1000000007){ const mul=(A,B)=>[[ (A[0][0]*B[0][0]+A[0][1]*B[1][0])%M, (A[0][0]*B[0][1]+A[0][1]*B[1][1])%M ], [ (A[1][0]*B[0][0]+A[1][1]*B[1][0])%M, (A[1][0]*B[0][1]+A[1][1]*B[1][1])%M ]]; const pow=(A,k)=>{ let R=[[1,0],[0,1]]; while(k>0){ if(k&1) R=mul(R,A); A=mul(A,A); k>>=1; } return R; }; if(n===0) return 0; const Q=[[1,1],[1,0]]; const R=pow(Q,n-1); return R[0][0]; }`
    }
  }
}
function makeDailyTemperatures(){
  return {
    id:'daily-temps',
    title:'Daily Temperatures (Monotonic Stack)',
    difficulty:'medium',
    brief:'For each day, wait until a warmer temperature.',
    hints:[
      'Use a decreasing stack of indices.',
      'Pop while current temp is higher; fill answers.',
      'Push current index afterward.'
    ],
    learn:{
      intuition:'Each index is processed and popped at most once.',
      visual:'Stack holds unresolved colder days; resolved on warmer days.',
      pattern:'Monotone decreasing stack.',
      template:`function dailyTemperatures(T){
  const n=T.length, ans=Array(n).fill(0), st=[];
  for(let i=0;i<n;i++){
    while(st.length && T[i]>T[st[st.length-1]]){ const j=st.pop(); ans[j]=i-j; }
    st.push(i);
  }
  return ans;
}`
    },
    quiz:[
      {type:'mc', prompt:'Amortized complexity?', choices:['O(n)','O(n log n)','O(n^2)','O(log n)'], answer:0, explain:'Each index pushed and popped once.'},
      {type:'sa', prompt:'Stack stores what?', accept:['indices','index'], explain:'Indices, not temperatures.'}
    ],
    practice:{
      funcName:'dailyTemperatures',
      starter:`function dailyTemperatures(T){
  // TODO: monotone decreasing stack of indices
}
`,
      constraints:'n up to 1e5.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[[73,74,75,71,69,72,76,73]], expected:[1,1,4,2,1,1,0,0], n:8}
      ],
      optimal:`function dailyTemperatures(T){ const n=T.length,ans=Array(n).fill(0),st=[]; for(let i=0;i<n;i++){ while(st.length && T[i]>T[st[st.length-1]]){ const j=st.pop(); ans[j]=i-j; } st.push(i);} return ans; }`
    }
  }
}

function makeEditDistance(){
  return {
    id:'edit-distance',
    title:'DP: Edit Distance (Levenshtein)',
    difficulty:'medium-hard',
    brief:'Min operations (insert, delete, replace) to convert word1 to word2.',
    hints:[
      'dp[i][j] = edit distance for prefixes word1[0..i), word2[0..j).',
      'Transition: if same char, copy diag; else 1+min(del,ins,rep).',
      'Initialize first row/col with i or j.'
    ],
    learn:{
      intuition:'Grid DP where neighbors represent edit ops.',
      visual:'Paths through the grid accumulate operation counts.',
      pattern:'2D DP over string lengths.',
      template:`function minDistance(a,b){
  const m=a.length,n=b.length; const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i; for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
    if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1];
    else dp[i][j]=1+Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
  return dp[m][n];
}`
    },
    quiz:[
      {type:'mc', prompt:'Space optimization possibility?', choices:['Yes to O(min(m,n))','No','Only O(log n)','Only O(1)'], answer:0, explain:'Keep two rows if only distance needed.'},
      {type:'sa', prompt:'Base cases on edges?', accept:['i or j','i and j'], explain:'dp[i][0]=i and dp[0][j]=j.'}
    ],
    practice:{
      funcName:'minDistance',
      starter:`function minDistance(a,b){
  // TODO: classic 2D DP for edit distance
}
`,
      constraints:'|a|,|b| up to 500.',
      expectedComplexity:'O(mn)',
      tests:[
        {input:['horse','ros'], expected:3, n:8},
        {input:['intention','execution'], expected:5, n:18}
      ],
      optimal:`function minDistance(a,b){ const m=a.length,n=b.length; const dp=Array.from({length:m+1},()=>Array(n+1).fill(0)); for(let i=0;i<=m;i++) dp[i][0]=i; for(let j=0;j<=n;j++) dp[0][j]=j; for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){ if(a[i-1]===b[j-1]) dp[i][j]=dp[i-1][j-1]; else dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]); } return dp[m][n]; }`
    }
  }
}

function makeWordBreak(){
  return {
    id:'word-break',
    title:'DP: Word Break',
    difficulty:'medium',
    brief:'Decide if string can be segmented into dictionary words.',
    hints:[
      'dp[i]=true if some j<i with dp[j] and s[j..i) in dict.',
      'Use a Set for O(1) lookup.',
      'Optionally optimize by max word length.'
    ],
    learn:{
      intuition:'Boolean DP that builds valid prefixes.',
      visual:'Prefix states connect to prior valid splits.',
      pattern:'1D DP over prefix lengths.',
      template:`function wordBreak(s, dict){
  const set=new Set(dict), n=s.length, dp=Array(n+1).fill(false); dp[0]=true;
  for(let i=1;i<=n;i++) for(let j=0;j<i;j++) if(dp[j] && set.has(s.slice(j,i))){ dp[i]=true; break; }
  return dp[n];
}`
    },
    quiz:[
      {type:'mc', prompt:'Worst-case complexity?', choices:['O(n^2)','O(n)','O(n^3)','O(n log n)'], answer:2, explain:'Nested i,j plus substring hash can make O(n^3) naive; with prefix hashing or pruning it improves.'},
      {type:'sa', prompt:'State dp[i] means?', accept:['prefix length i','first i chars'], explain:'Whether first i characters can be segmented.'}
    ],
    practice:{
      funcName:'wordBreak',
      starter:`function wordBreak(s, dict){
  // TODO: DP over prefixes using a Set
}
`,
      constraints:'|s| up to 1e4; dict size up to 1e3.',
      expectedComplexity:'O(n^2) typical',
      tests:[
        {input:['leetcode',['leet','code']], expected:true, n:8},
        {input:['applepenapple',['apple','pen']], expected:true, n:13},
        {input:['catsandog',['cats','dog','sand','and','cat']], expected:false, n:10}
      ],
      optimal:`function wordBreak(s,dict){ const set=new Set(dict),n=s.length,dp=Array(n+1).fill(false); dp[0]=true; for(let i=1;i<=n;i++){ for(let j=0;j<i;j++){ if(dp[j] && set.has(s.slice(j,i))){ dp[i]=true; break; } } } return dp[n]; }`
    }
  }
}

function makeValidParentheses(){
  return {
    id:'valid-parens',
    title:'Valid Parentheses',
    brief:'Check if brackets string is valid.',
    hints:[
      'Use a stack; push opens and match on close.',
      'Early exit on mismatch; stack must end empty.',
      'Use a map of closing→opening.'
    ],
    learn:{
      intuition:'Stack models nested structure.',
      visual:'Pairs open/close in LIFO order.',
      pattern:'Stack with map for bracket pairs.',
      template:`function isValid(s){
  const st=[], m={')':'(',']':'[','}':'{'};
  for(const ch of s){ if(ch in m){ if(st.pop()!==m[ch]) return false; } else st.push(ch); }
  return st.length===0;
}`
    },
    quiz:[
      {type:'mc', prompt:'Empty string valid?', choices:['Yes','No'], answer:0, explain:'Trivially balanced.'},
      {type:'sa', prompt:'Data structure used?', accept:['stack'], explain:'LIFO structure fits nesting.'}
    ],
    practice:{
      funcName:'isValid',
      starter:`function isValid(s){
  // TODO: stack + map of pairs
}
`,
      constraints:'|s| up to 1e5.',
      expectedComplexity:'O(n)',
      tests:[
        {input:['()'], expected:true, n:2},
        {input:['()[]{}'], expected:true, n:6},
        {input:['(]'], expected:false, n:2}
      ],
      optimal:`function isValid(s){ const st=[],m={')':'(',']':'[','}':'{'}; for(const ch of s){ if(m[ch]){ if(st.pop()!==m[ch]) return false; } else st.push(ch);} return st.length===0; }`
    }
  }
}

function makeBinarySearchGame(){
  return {
    id:'binary-search-game',
    title:'Binary Search — Guessing Game',
    difficulty:'easy',
    brief:'Find the hidden number with as few guesses as possible.',
    hints:[
      'Always guess the midpoint of the current interval.',
      'Halving the range each time takes about log2 N steps.',
      'Track low/high bounds and update after feedback.'
    ],
    game:{ type:'binary-search' },
    learn:{
      intuition:'Binary search halves the search space; this game makes you practice the halving decisions under pressure.',
      visual:'The current valid interval shrinks each guess.',
      pattern:'mid = floor((lo+hi)/2), compare, shrink interval.' ,
      template:`function nextGuess(lo, hi){
  // Always choose the midpoint of [lo,hi]
  return Math.floor((lo + hi) / 2);
}

function shrink(lo, hi, feedback, g){
  // feedback: 'low' | 'high' | 'hit'
  if(feedback==='low') return [g+1, hi];
  if(feedback==='high') return [lo, g-1];
  return [g, g];
}`
    },
    quiz:[
      {type:'mc', prompt:'Optimal guesses needed for N≈100?', choices:['~7','~10','~50','~5'], answer:0, explain:'ceil(log2 100) ≈ 7.'}
    ]
  }
}

function makeBFSMazeGame(){
  return {
    id:'bfs-maze',
    title:'BFS Maze — Shortest Path',
    difficulty:'easy-medium',
    brief:'Place walls and watch BFS explore and find shortest path.',
    hints:[
      'BFS explores in layers (by distance).',
      'Visited prevents infinite loops.',
      'Parents let you reconstruct the path after reaching the end.'
    ],
    game:{ type:'bfs-maze' },
    learn:{
      intuition:'BFS is a wavefront expanding uniformly; the first time you reach the end is optimal distance.',
      visual:'Cells color from the start outward; final path overlays at the end.',
      pattern:'Queue + visited + parent backtracking.',
      template:`function bfs(grid, start, end){
  const R=grid.length, C=grid[0].length, q=[[...start]], vis=new Set([start+'' ]), prev=new Map();
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  for(let h=0; h<q.length; h++){
    const [r,c]=q[h]; if(r===end[0]&&c===end[1]) break;
    for(const [dr,dc] of dirs){
      const nr=r+dr, nc=c+dc, k=nr+','+nc;
      if(nr>=0&&nr<R&&nc>=0&&nc<C && grid[nr][nc]===0 && !vis.has(k)){
        vis.add(k); prev.set(k, r+','+c); q.push([nr,nc]);
      }
    }
  }
  return prev; // backtrack to reconstruct path
}`
    },
    quiz:[
      {type:'mc', prompt:'When is BFS optimal?', choices:['Unweighted grids','Weighted edges','Negative weights','Only trees'], answer:0, explain:'Equal edge weights ⇒ BFS shortest path.'}
    ]
  }
}

function makeHeapSandboxGame(){
  return {
    id:'heap-sandbox',
    title:'Heap Sandbox — Push/Pop',
    difficulty:'easy-medium',
    brief:'Interact with a min-heap: push values, pop min, and watch heap order.',
    hints:[
      'Percolate up on push; percolate down on pop.',
      'Array index i has children 2i+1 and 2i+2.',
      'Peek is O(1), push/pop are O(log n).'
    ],
    game:{ type:'heap-sandbox' },
    learn:{ intuition:'Heaps maintain a partial order that makes extremes cheap to access.', visual:'Array view plus simple tree-like rows.', pattern:'Min-heap push/pop.' , template:`const heap=[]; // min-heap
function up(i){ while(i>0){ const p=(i-1)>>1; if(heap[p]<=heap[i]) break; [heap[p],heap[i]]=[heap[i],heap[p]]; i=p; } }
function down(i){ for(;;){ let l=i*2+1,r=l+1,s=i; if(l<heap.length&&heap[l]<heap[s]) s=l; if(r<heap.length&&heap[r]<heap[s]) s=r; if(s===i) break; [heap[s],heap[i]]=[heap[i],heap[s]]; i=s; } }
function push(x){ heap.push(x); up(heap.length-1); }
function pop(){ const x=heap[0]; heap[0]=heap.pop(); if(heap.length) down(0); return x; }` },
    quiz:[ {type:'mc', prompt:'Pop time complexity?', choices:['O(log n)','O(1)','O(n)','O(n log n)'], answer:0, explain:'Percolate along height.'} ]
  }
}

function makeSortingRaceGame(){
  return {
    id:'sorting-race',
    title:'Sorting Race — Visualize Algorithms',
    difficulty:'easy-medium',
    brief:'Watch sorting algorithms race on the same array.',
    hints:[ 'Compare runtime growth and swap patterns.', 'Use small N and adjust speed.', 'Try worst-case for insertion sort.' ],
    game:{ type:'sorting-race' },
    learn:{ intuition:'Different algorithms exhibit distinct movement patterns and complexity.', visual:'Bars swap/merge/partition over time.', pattern:'Insertion vs Merge (and more later).', template:`function insertionSort(a){
  for(let i=1;i<a.length;i++){
    let j=i; while(j>0 && a[j]<a[j-1]){ [a[j],a[j-1]]=[a[j-1],a[j]]; j--; }
  }
}
async function mergeSort(a,l=0,r=a.length-1){ if(l>=r) return; const m=(l+r)>>1; await mergeSort(a,l,m); await mergeSort(a,m+1,r); const t=[]; let i=l,j=m+1; while(i<=m&&j<=r) t.push(a[i]<=a[j]?a[i++]:a[j++]); while(i<=m) t.push(a[i++]); while(j<=r) t.push(a[j++]); for(let k=0;k<t.length;k++){ a[l+k]=t[k]; } }` },
    quiz:[ {type:'mc', prompt:'Insertion sort worst-case?', choices:['O(n^2)','O(n log n)','O(n)','O(log n)'], answer:0, explain:'Shifts for each element in reversed input.'} ]
  }
}

function makeUnionFindGame(){
  return {
    id:'uf-playground',
    title:'Union-Find Playground',
    difficulty:'easy-medium',
    brief:'Add unions and watch components merge with path compression.',
    hints:[ 'Union by rank; compress paths on find.', 'Component count decreases on successful union.' ],
    game:{ type:'uf-playground' },
    learn:{ intuition:'Repeated find/union flattens the forest.', visual:'Nodes show parent links; components colored.', pattern:'DSU with path compression.', template:`const parent=[] , rank=[];
function find(a){ return parent[a]===a? a: (parent[a]=find(parent[a])); }
function unite(a,b){ a=find(a); b=find(b); if(a===b) return false; if(rank[a]<rank[b]) [a,b]=[b,a]; parent[b]=a; if(rank[a]===rank[b]) rank[a]++; return true; }` },
    quiz:[ {type:'sa', prompt:'Amortized find cost?', accept:['α(n)'], explain:'Inverse Ackermann — effectively constant.'} ]
  }
}

function makeDPGridGame(){
  return {
    id:'dp-grid',
    title:'DP Grid — Unique Paths',
    difficulty:'easy',
    brief:'Fill a DP table for unique paths with obstacles.',
    hints:[ 'dp[i][j] = dp[i-1][j]+dp[i][j-1] for open cells.', 'Initialize first row/col respecting obstacles.' ],
    game:{ type:'dp-grid' },
    learn:{ intuition:'Local transitions accumulate into global counts.', visual:'Table fills left-to-right, top-to-bottom.', pattern:'2D DP over grid.', template:`function uniquePaths(grid){
  const R=grid.length, C=grid[0].length; const dp=Array.from({length:R},()=>Array(C).fill(0));
  if(grid[0][0]===0) dp[0][0]=1; for(let i=0;i<R;i++) for(let j=0;j<C;j++) if(grid[i][j]===0){ if(i) dp[i][j]+=dp[i-1][j]; if(j) dp[i][j]+=dp[i][j-1]; }
  return dp[R-1][C-1];
}` },
    quiz:[ {type:'mc', prompt:'Transition for open cell?', choices:['up+left','diag only','max of neighbors','constant'], answer:0, explain:'Sum of ways from top and left.'} ]
  }
}

function makeKMPExplorerGame(){
  return {
    id:'kmp-explorer',
    title:'KMP Explorer — Prefix Function',
    difficulty:'medium',
    brief:'Step through building the prefix (LPS) table and matching.',
    hints:[ 'LPS captures self-overlaps of the pattern.', 'On mismatch, jump to LPS[j-1].' ],
    game:{ type:'kmp-explorer' },
    learn:{ intuition:'Automaton-like jumps avoid rechecks.', visual:'Pointers move with highlighted matches/mismatches.', pattern:'Prefix-function + linear scan.', template:`function buildLPS(p){
  const lps=Array(p.length).fill(0); let j=0; for(let i=1;i<p.length;i++){ while(j>0 && p[i]!==p[j]) j=lps[j-1]; if(p[i]===p[j]) j++; lps[i]=j; } return lps;
}
function kmp(text, pat){ const lps=buildLPS(pat); let j=0; for(let i=0;i<text.length;i++){ while(j>0 && text[i]!==pat[j]) j=lps[j-1]; if(text[i]===pat[j]) j++; if(j===pat.length) return i-j+1; } return -1; }` },
    quiz:[ {type:'mc', prompt:'LPS used to…', choices:['skip comparisons','sort prefix','hash string','reverse text'], answer:0, explain:'Skip rechecks via known overlaps.'} ]
  }
}

function makeAhoExplorerGame(){
  return {
    id:'aho-explorer',
    title:'Aho–Corasick Explorer — Multi-Pattern',
    difficulty:'hard',
    brief:'Build automaton from patterns and step through the text to see matches.',
    hints:[ 'Construct trie; compute failure links via BFS.', 'On mismatch, follow failure links.', 'Output links collect all pattern ends.' ],
    game:{ type:'aho-explorer' },
    learn:{ intuition:'The automaton streams text in linear time while reporting all pattern occurrences.', visual:'Trie with failure edges; states advance or fall back.', pattern:'Trie + failure (π) + output lists.', template:`function buildTrie(patterns){ const trie=[{}], out=[[]]; for(const p of patterns){ let v=0; for(const ch of p){ if(trie[v][ch]==null){ trie[v][ch]=trie.length; trie.push({}); out.push([]); } v=trie[v][ch]; } out[v].push(p); } return {trie,out}; }` },
    quiz:[ {type:'mc', prompt:'Time complexity to scan text T?', choices:['O(|T|+Σ|P|+matches)','O(|T|·|P|)','O(|T| log |P|)','O(|P|^2)'], answer:0, explain:'Linear in text plus construction and outputs.'} ]
  }
}

function makeDinicFlowGame(){
  return {
    id:'dinic-flow',
    title:'Dinic Flow — Levels & Blocking Flow',
    difficulty:'hard',
    brief:'See level graph construction and augment along blocking flows.',
    hints:[ 'BFS builds level graph; DFS sends blocking flow.', 'Edges only go from level u to level u+1 in level graph.' ],
    game:{ type:'dinic-flow' },
    learn:{ intuition:'Separating levels accelerates augmentations, improving complexity in many graphs.', visual:'Nodes labeled by level; edges only forward in level graph.', pattern:'BFS levels + DFS blocking flow.', template:`function bfsLevels(g,s,t){ const level=Array(g.length).fill(-1); const q=[s]; level[s]=0; for(let h=0;h<q.length;h++){ const u=q[h]; for(const e of g[u]) if(e.cap>0 && level[e.v]===-1){ level[e.v]=level[u]+1; q.push(e.v); } } return level; }` },
    quiz:[ {type:'mc', prompt:'Level graph edges go from?', choices:['level i to i+1','i to i','i to i+2','any'], answer:0, explain:'Only forward one level in level graph.'} ]
  }
}

function makeHLDGame(){
  return {
    id:'hld-play',
    title:'Heavy-Light Decomposition — Path Queries',
    difficulty:'hard',
    brief:'Decompose a tree, then query paths by segment ranges.',
    hints:[ 'Heavy child = argmax subtree size.', 'Path queries break into O(log n) segments by heads.', 'Map tree nodes to base array indices.' ],
    game:{ type:'hld-play' },
    learn:{ intuition:'HLD reduces arbitrary path queries to few contiguous segments over a base array.', visual:'Heavy paths become chains; light edges jump between chains.', pattern:'DFS sizes → heads/pos → path split.', template:'// Predefined tree; enter queries (u,v) to see decomposition.' },
    quiz:[ {type:'sa', prompt:'Segments per query (big-O)?', accept:['O(log n)'], explain:'Each step jumps at least one light edge.'} ]
  }
}
