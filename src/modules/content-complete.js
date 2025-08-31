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
    },
    game: { type: 'two-sum-visual' }
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
    },
    game: { type: 'sliding-window-visual' }
  });
}

// Three Sum
function makeThreeSum() {
  return createProblem({
    id: 'three-sum',
    title: 'Two Pointers: Three Sum',
    difficulty: 'medium',
    brief: 'Find all unique triplets that sum to zero.',
    hints: [
      'Fix first element, use two pointers on remaining sorted array.',
      'Skip duplicates to avoid duplicate triplets.',
      'For each fixed element, find two-sum pairs in remaining array.'
    ],
    learn: {
      intuition: 'Fix one element, reduce to two-sum problem on remaining array.',
      visual: 'One fixed pointer, two moving pointers scanning from opposite ends.',
      pattern: 'Nested two-pointers with duplicate handling.',
      template: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
    
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicates
        while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicates
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we need to sort the array first?',
        choices: ['For O(n log n) complexity', 'To use two pointers effectively', 'To handle duplicates', 'For space optimization'],
        answer: 1,
        explain: 'Sorting enables us to use two pointers technique and skip duplicates systematically.'
      }
    ],
    practice: {
      funcName: 'threeSum',
      starter: `function threeSum(nums) {
  // TODO: implement three sum solution
}`,
      constraints: 'Array length up to 3000.',
      expectedComplexity: 'O(n²)',
      tests: [
        { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]], n: 6 },
        { input: [[0, 1, 1]], expected: [], n: 3 }
      ]
    },
    game: { type: 'three-sum-visual' }
  });
}

// Palindrome Check
function makeTwoPointersPalindrome() {
  return createProblem({
    id: 'valid-palindrome',
    title: 'Two Pointers: Valid Palindrome',
    difficulty: 'easy',
    brief: 'Check if string is a palindrome using two pointers.',
    hints: [
      'Use two pointers from opposite ends moving toward center.',
      'Skip non-alphanumeric characters and ignore case.',
      'Continue until pointers meet or cross.'
    ],
    learn: {
      intuition: 'Compare characters from both ends, moving inward.',
      visual: 'Two pointers converging from opposite ends of string.',
      pattern: 'Two pointers convergence with preprocessing.',
      template: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  
  while (left < right) {
    // Skip non-alphanumeric characters
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    
    left++;
    right--;
  }
  
  return true;
}

function isAlphaNumeric(char) {
  return /^[a-zA-Z0-9]$/.test(char);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the time complexity of this approach?',
        choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explain: 'We visit each character at most once, giving us O(n) time complexity.'
      }
    ],
    practice: {
      funcName: 'isPalindrome',
      starter: `function isPalindrome(s) {
  // TODO: implement palindrome check
}`,
      constraints: 'String length up to 2×10⁵.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: ["A man, a plan, a canal: Panama"], expected: true, n: 30 },
        { input: ["race a car"], expected: false, n: 9 }
      ]
    },
    game: { type: 'two-pointers-palindrome-visual' }
  });
}

// Container With Most Water
function makeContainerMostWater() {
  return createProblem({
    id: 'container-water',
    title: 'Two Pointers: Container With Most Water',
    difficulty: 'medium',
    brief: 'Find two lines that form container holding most water.',
    hints: [
      'Use two pointers at opposite ends of array.',
      'Move pointer with shorter height (it limits capacity).',
      'Track maximum area seen so far.'
    ],
    learn: {
      intuition: 'Area = width × min(heights). To maximize area, move from shorter height.',
      visual: 'Two vertical lines forming container, pointers at ends moving inward.',
      pattern: 'Two pointers optimization with greedy choice.',
      template: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  
  while (left < right) {
    const width = right - left;
    const currentArea = width * Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, currentArea);
    
    // Move pointer with shorter height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxWater;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we move the pointer with shorter height?',
        choices: ['To increase width', 'To increase height', 'Shorter height limits the area', 'Random choice'],
        answer: 2,
        explain: 'The area is limited by the shorter height, so we try to find a taller one.'
      }
    ],
    practice: {
      funcName: 'maxArea',
      starter: `function maxArea(height) {
  // TODO: implement container with most water
}`,
      constraints: 'Array length up to 10⁵.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, n: 9 },
        { input: [[1, 1]], expected: 1, n: 2 }
      ]
    },
    game: { type: 'container-water-visual' }
  });
}

// Remove Duplicates
function makeRemoveDuplicates() {
  return createProblem({
    id: 'remove-duplicates',
    title: 'Two Pointers: Remove Duplicates from Sorted Array',
    difficulty: 'easy',
    brief: 'Remove duplicates in-place from sorted array.',
    hints: [
      'Use slow and fast pointers.',
      'Fast pointer scans array, slow pointer tracks unique elements.',
      'Only increment slow pointer when finding new unique element.'
    ],
    learn: {
      intuition: 'Maintain unique prefix using slow pointer, scan with fast pointer.',
      visual: 'Two pointers: slow builds unique array, fast explores ahead.',
      pattern: 'Fast-slow pointers for in-place modification.',
      template: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let slow = 0; // Points to last unique element
  
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  
  return slow + 1; // Length of unique array
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the role of the slow pointer?',
        choices: ['Scan the array', 'Track unique elements', 'Find duplicates', 'Count elements'],
        answer: 1,
        explain: 'The slow pointer maintains the end of the unique elements subarray.'
      }
    ],
    practice: {
      funcName: 'removeDuplicates',
      starter: `function removeDuplicates(nums) {
  // TODO: implement remove duplicates
}`,
      constraints: 'Array length up to 3×10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 1, 2]], expected: 2, n: 3 },
        { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5, n: 10 }
      ]
    }
  });
}

// Merge Sorted Arrays
function makeMergeSortedArrays() {
  return createProblem({
    id: 'merge-arrays',
    title: 'Two Pointers: Merge Sorted Arrays',
    difficulty: 'easy',
    brief: 'Merge two sorted arrays into first array in-place.',
    hints: [
      'Work backwards to avoid overwriting elements.',
      'Use three pointers: end of nums1, end of nums2, current position.',
      'Fill from the end of nums1 using larger elements first.'
    ],
    learn: {
      intuition: 'Merge from back to front to avoid overwriting unprocessed elements.',
      visual: 'Three pointers working backwards, filling largest elements first.',
      pattern: 'Reverse two-pointers merge to avoid conflicts.',
      template: `function merge(nums1, m, nums2, n) {
  let i = m - 1; // Last element in nums1
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Last position in nums1
  
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }
  
  // Copy remaining elements from nums2
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we work backwards?',
        choices: ['For efficiency', 'To avoid overwriting', 'Random choice', 'To sort descending'],
        answer: 1,
        explain: 'Working backwards prevents overwriting unprocessed elements in nums1.'
      }
    ],
    practice: {
      funcName: 'merge',
      starter: `function merge(nums1, m, nums2, n) {
  // TODO: implement merge sorted arrays
}`,
      constraints: 'Array lengths up to 200.',
      expectedComplexity: 'O(m + n)',
      tests: [
        { input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expected: [1, 2, 2, 3, 5, 6], n: 6 },
        { input: [[1], 1, [], 0], expected: [1], n: 1 }
      ]
    }
  });
}

// Partition Array
function makePartitionArray() {
  return createProblem({
    id: 'partition-array',
    title: 'Two Pointers: Partition Array (Dutch Flag)',
    difficulty: 'medium',
    brief: 'Partition array with 0s, 1s, 2s in one pass.',
    hints: [
      'Use three pointers: low (0s boundary), high (2s boundary), current.',
      'When current = 0, swap with low; when current = 2, swap with high.',
      'Only increment current when value is 1 or after swapping with low.'
    ],
    learn: {
      intuition: 'Maintain three regions: [0s][1s][unknown][2s] using three pointers.',
      visual: 'Three pointers dividing array into sorted regions.',
      pattern: 'Three-way partitioning with invariant maintenance.',
      template: `function sortColors(nums) {
  let low = 0, high = nums.length - 1, current = 0;
  
  while (current <= high) {
    if (nums[current] === 0) {
      [nums[low], nums[current]] = [nums[current], nums[low]];
      low++;
      current++;
    } else if (nums[current] === 2) {
      [nums[current], nums[high]] = [nums[high], nums[current]];
      high--;
      // Don't increment current - need to check swapped element
    } else {
      current++; // nums[current] === 1
    }
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why don\'t we increment current after swapping with high?',
        choices: ['Bug in algorithm', 'Need to check swapped element', 'Performance optimization', 'Random choice'],
        answer: 1,
        explain: 'The element swapped from high position hasn\'t been examined yet.'
      }
    ],
    practice: {
      funcName: 'sortColors',
      starter: `function sortColors(nums) {
  // TODO: implement partition array
}`,
      constraints: 'Array length up to 300.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2], n: 6 },
        { input: [[2, 0, 1]], expected: [0, 1, 2], n: 3 }
      ]
    }
  });
}

// Move Zeros
function makeMoveZeros() {
  return createProblem({
    id: 'move-zeros',
    title: 'Two Pointers: Move Zeros to End',
    difficulty: 'easy',
    brief: 'Move all zeros to end while maintaining relative order.',
    hints: [
      'Use slow-fast pointers: slow tracks non-zero position.',
      'Fast pointer scans array, moves non-zero elements to slow position.',
      'Fill remaining positions with zeros.'
    ],
    learn: {
      intuition: 'Build non-zero prefix with slow pointer, scan with fast pointer.',
      visual: 'Two pointers: slow builds non-zero array, fast finds non-zero elements.',
      pattern: 'Fast-slow pointers for stable partitioning.',
      template: `function moveZeroes(nums) {
  let slow = 0; // Position for next non-zero element
  
  // Move all non-zero elements to front
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  
  // Fill remaining positions with zeros
  while (slow < nums.length) {
    nums[slow] = 0;
    slow++;
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Does this approach maintain relative order of non-zero elements?',
        choices: ['Yes', 'No', 'Sometimes', 'Depends on input'],
        answer: 0,
        explain: 'Yes, we copy non-zero elements in the same order they appear.'
      }
    ],
    practice: {
      funcName: 'moveZeroes',
      starter: `function moveZeroes(nums) {
  // TODO: implement move zeros
}`,
      constraints: 'Array length up to 10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0], n: 5 },
        { input: [[0]], expected: [0], n: 1 }
      ]
    }
  });
}

// Maximum Subarray Length
function makeMaxSubarrayLen() {
  return createProblem({
    id: 'max-subarray-len',
    title: 'Sliding Window: Maximum Subarray Length with Sum K',
    difficulty: 'medium',
    brief: 'Find maximum length subarray with sum equal to k.',
    hints: [
      'Use sliding window with prefix sum and hash map.',
      'For each position, check if (prefixSum - k) exists in map.',
      'Store first occurrence of each prefix sum for maximum length.'
    ],
    learn: {
      intuition: 'Use prefix sums: if sum[j] - sum[i] = k, then subarray [i+1, j] has sum k.',
      visual: 'Prefix sum array with hash map storing first occurrences.',
      pattern: 'Sliding window with prefix sum and hash map.',
      template: `function maxSubArrayLen(nums, k) {
  const prefixSumMap = new Map();
  prefixSumMap.set(0, -1); // Handle case where subarray starts from index 0
  
  let prefixSum = 0;
  let maxLen = 0;
  
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    
    if (prefixSumMap.has(prefixSum - k)) {
      const len = i - prefixSumMap.get(prefixSum - k);
      maxLen = Math.max(maxLen, len);
    }
    
    // Store first occurrence only (for maximum length)
    if (!prefixSumMap.has(prefixSum)) {
      prefixSumMap.set(prefixSum, i);
    }
  }
  
  return maxLen;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we store only the first occurrence of each prefix sum?',
        choices: ['To save space', 'For maximum length', 'To avoid duplicates', 'Random choice'],
        answer: 1,
        explain: 'First occurrence gives us maximum possible subarray length for that prefix sum.'
      }
    ],
    practice: {
      funcName: 'maxSubArrayLen',
      starter: `function maxSubArrayLen(nums, k) {
  // TODO: implement maximum subarray length
}`,
      constraints: 'Array length up to 10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, -1, 5, -2, 3], 3], expected: 4, n: 5 },
        { input: [[-2, -1, 2, 1], 1], expected: 2, n: 4 }
      ]
    }
  });
}

// Hash Maps & Sets
function makeHashMapBasics() {
  return createProblem({
    id: 'hashmap-basics',
    title: 'Hash Map: Two Sum',
    difficulty: 'easy',
    brief: 'Find two numbers that add up to target using hash map.',
    hints: [
      'Store each number and its index in a hash map.',
      'For each number, check if (target - number) exists in map.',
      'Return indices when complement is found.'
    ],
    learn: {
      intuition: 'Use hash map for O(1) lookups to find complements.',
      visual: 'Hash map storing {value: index} pairs for fast access.',
      pattern: 'Hash map for complement search and fast lookups.',
      template: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return []; // No solution found
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the time complexity of this approach?',
        choices: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
        answer: 2,
        explain: 'We scan the array once with O(1) hash map operations.'
      }
    ],
    practice: {
      funcName: 'twoSum',
      starter: `function twoSum(nums, target) {
  // TODO: implement two sum using hash map
}`,
      constraints: 'Array length up to 10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1], n: 4 },
        { input: [[3, 2, 4], 6], expected: [1, 2], n: 3 }
      ]
    },
    game: { type: 'hashmap-visual' }
  });
}

function makeHashSetOperations() {
  return createProblem({
    id: 'hashset-operations',
    title: 'Hash Set: Contains Duplicate',
    difficulty: 'easy',
    brief: 'Check if array contains any duplicates using hash set.',
    hints: [
      'Use a hash set to track seen elements.',
      'If element already exists in set, return true.',
      'Add each new element to the set.'
    ],
    learn: {
      intuition: 'Hash set provides O(1) insertion and lookup for uniqueness checking.',
      visual: 'Hash set growing as we encounter new unique elements.',
      pattern: 'Hash set for duplicate detection and uniqueness.',
      template: `function containsDuplicate(nums) {
  const seen = new Set();
  
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the space complexity in worst case?',
        choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explain: 'In worst case (no duplicates), we store all n elements in the set.'
      }
    ],
    practice: {
      funcName: 'containsDuplicate',
      starter: `function containsDuplicate(nums) {
  // TODO: implement contains duplicate check
}`,
      constraints: 'Array length up to 10⁵.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 2, 3, 1]], expected: true, n: 4 },
        { input: [[1, 2, 3, 4]], expected: false, n: 4 }
      ]
    }
  });
}

function makeGroupAnagrams() {
  return createProblem({
    id: 'group-anagrams',
    title: 'Hash Map: Group Anagrams',
    difficulty: 'medium',
    brief: 'Group strings that are anagrams of each other.',
    hints: [
      'Use sorted string as key to group anagrams.',
      'All anagrams have the same sorted character sequence.',
      'Hash map maps sorted string to list of original strings.'
    ],
    learn: {
      intuition: 'Anagrams have identical sorted character sequences - use as hash key.',
      visual: 'Hash map with sorted strings as keys, arrays of anagrams as values.',
      pattern: 'Hash map grouping with normalized keys.',
      template: `function groupAnagrams(strs) {
  const groups = new Map();
  
  for (const str of strs) {
    const key = str.split('').sort().join('');
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    
    groups.get(key).push(str);
  }
  
  return Array.from(groups.values());
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we sort each string?',
        choices: ['For efficiency', 'As grouping key', 'To remove duplicates', 'Random requirement'],
        answer: 1,
        explain: 'Sorting creates a canonical form that anagrams share as a grouping key.'
      }
    ],
    practice: {
      funcName: 'groupAnagrams',
      starter: `function groupAnagrams(strs) {
  // TODO: implement group anagrams
}`,
      constraints: 'Array length up to 10⁴, string length up to 100.',
      expectedComplexity: 'O(n * m log m) where m is max string length',
      tests: [
        { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]], n: 6 }
      ]
    },
    game: { type: 'group-anagrams-visual' }
  });
}

function makeTopKFrequent() {
  return createProblem({
    id: 'top-k-frequent',
    title: 'Hash Map: Top K Frequent Elements',
    difficulty: 'medium',
    brief: 'Find k most frequent elements in array.',
    hints: [
      'Count frequencies using hash map.',
      'Use bucket sort or min-heap to find top k.',
      'Bucket sort: create buckets by frequency, iterate from high to low.'
    ],
    learn: {
      intuition: 'Count frequencies, then find k elements with highest counts.',
      visual: 'Hash map for counting, then buckets/heap for top k selection.',
      pattern: 'Frequency counting + top k selection.',
      template: `function topKFrequent(nums, k) {
  // Count frequencies
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  
  // Bucket sort by frequency
  const buckets = new Array(nums.length + 1);
  for (const [num, freq] of freqMap) {
    if (!buckets[freq]) buckets[freq] = [];
    buckets[freq].push(num);
  }
  
  // Collect top k
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i]) {
      result.push(...buckets[i]);
    }
  }
  
  return result.slice(0, k);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the time complexity using bucket sort?',
        choices: ['O(n log n)', 'O(n log k)', 'O(n)', 'O(k log n)'],
        answer: 2,
        explain: 'Bucket sort approach gives us O(n) time complexity.'
      }
    ],
    practice: {
      funcName: 'topKFrequent',
      starter: `function topKFrequent(nums, k) {
  // TODO: implement top k frequent elements
}`,
      constraints: 'Array length up to 10⁵.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2], n: 6 },
        { input: [[1], 1], expected: [1], n: 1 }
      ]
    },
    game: { type: 'top-k-frequent-visual' }
  });
}

function makeSubarraySum() {
  return createProblem({
    id: 'subarray-sum-k',
    title: 'Hash Map: Subarray Sum Equals K',
    difficulty: 'medium',
    brief: 'Count subarrays with sum equal to k.',
    hints: [
      'Use prefix sums and hash map.',
      'If prefixSum - k exists in map, we found a subarray.',
      'Count occurrences of each prefix sum.'
    ],
    learn: {
      intuition: 'Prefix sum difference gives subarray sum. Use map to count occurrences.',
      visual: 'Hash map tracking prefix sum frequencies for subarray counting.',
      pattern: 'Prefix sum with hash map for subarray problems.',
      template: `function subarraySum(nums, k) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // Empty prefix
  
  let prefixSum = 0;
  let count = 0;
  
  for (const num of nums) {
    prefixSum += num;
    
    if (prefixSumCount.has(prefixSum - k)) {
      count += prefixSumCount.get(prefixSum - k);
    }
    
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }
  
  return count;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we initialize map with {0: 1}?',
        choices: ['Error in code', 'Handle prefix starting from index 0', 'Random initialization', 'For efficiency'],
        answer: 1,
        explain: 'Handles case where subarray starts from index 0 (empty prefix sum).'
      }
    ],
    practice: {
      funcName: 'subarraySum',
      starter: `function subarraySum(nums, k) {
  // TODO: implement subarray sum equals k
}`,
      constraints: 'Array length up to 2×10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 1, 1], 2], expected: 2, n: 3 },
        { input: [[1, 2, 3], 3], expected: 2, n: 3 }
      ]
    }
  });
}

function makeLongestConsecutive() {
  return createProblem({
    id: 'longest-consecutive',
    title: 'Hash Set: Longest Consecutive Sequence',
    difficulty: 'medium',
    brief: 'Find length of longest consecutive elements sequence.',
    hints: [
      'Use hash set for O(1) lookups.',
      'For each number, check if it\'s start of sequence (num-1 not in set).',
      'If start of sequence, count consecutive numbers.'
    ],
    learn: {
      intuition: 'Only start counting from sequence beginnings to avoid duplicates.',
      visual: 'Hash set for fast lookups, identify sequence starts and count lengths.',
      pattern: 'Hash set for consecutive sequence detection.',
      template: `function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;
  
  for (const num of nums) {
    // Check if this is the start of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;
      
      // Count consecutive numbers
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }
      
      longest = Math.max(longest, currentLength);
    }
  }
  
  return longest;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why check if num-1 exists before starting count?',
        choices: ['Bug avoidance', 'Only count from sequence start', 'Performance', 'Random check'],
        answer: 1,
        explain: 'We only start counting from the beginning of each sequence to avoid duplicates.'
      }
    ],
    practice: {
      funcName: 'longestConsecutive',
      starter: `function longestConsecutive(nums) {
  // TODO: implement longest consecutive sequence
}`,
      constraints: 'Array length up to 10⁵.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[100, 4, 200, 1, 3, 2]], expected: 4, n: 6 },
        { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9, n: 10 }
      ]
    }
  });
}

function makeIsomorphicStrings() {
  return createProblem({
    id: 'isomorphic-strings',
    title: 'Hash Map: Isomorphic Strings',
    difficulty: 'easy',
    brief: 'Check if two strings are isomorphic (bijective mapping).',
    hints: [
      'Use two hash maps for bidirectional mapping.',
      'Each character in s must map to exactly one character in t.',
      'Each character in t must be mapped from exactly one character in s.'
    ],
    learn: {
      intuition: 'Need bijective (one-to-one) mapping between characters of both strings.',
      visual: 'Two hash maps maintaining character mappings in both directions.',
      pattern: 'Bidirectional hash map mapping for isomorphism.',
      template: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  
  const mapST = new Map();
  const mapTS = new Map();
  
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];
    
    if (mapST.has(charS)) {
      if (mapST.get(charS) !== charT) return false;
    } else {
      mapST.set(charS, charT);
    }
    
    if (mapTS.has(charT)) {
      if (mapTS.get(charT) !== charS) return false;
    } else {
      mapTS.set(charT, charS);
    }
  }
  
  return true;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why do we need two hash maps?',
        choices: ['For efficiency', 'Ensure bijective mapping', 'Handle edge cases', 'Random requirement'],
        answer: 1,
        explain: 'We need bidirectional mapping to ensure one-to-one correspondence.'
      }
    ],
    practice: {
      funcName: 'isIsomorphic',
      starter: `function isIsomorphic(s, t) {
  // TODO: implement isomorphic strings check
}`,
      constraints: 'String length up to 5×10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: ["egg", "add"], expected: true, n: 3 },
        { input: ["foo", "bar"], expected: false, n: 3 }
      ]
    }
  });
}

function makeWordPattern() {
  return createProblem({
    id: 'word-pattern',
    title: 'Hash Map: Word Pattern',
    difficulty: 'easy',
    brief: 'Check if string follows the same pattern as given pattern.',
    hints: [
      'Split string into words and map pattern characters to words.',
      'Use two hash maps for bidirectional mapping.',
      'Ensure pattern length matches number of words.'
    ],
    learn: {
      intuition: 'Similar to isomorphic strings but mapping characters to words.',
      visual: 'Hash maps connecting pattern characters with words bidirectionally.',
      pattern: 'Bidirectional mapping between different data types.',
      template: `function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  
  const charToWord = new Map();
  const wordToChar = new Map();
  
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];
    
    if (charToWord.has(char)) {
      if (charToWord.get(char) !== word) return false;
    } else {
      charToWord.set(char, word);
    }
    
    if (wordToChar.has(word)) {
      if (wordToChar.get(word) !== char) return false;
    } else {
      wordToChar.set(word, char);
    }
  }
  
  return true;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What happens if pattern length != words length?',
        choices: ['Continue processing', 'Return false immediately', 'Throw error', 'Pad with nulls'],
        answer: 1,
        explain: 'Different lengths mean pattern cannot match, so return false immediately.'
      }
    ],
    practice: {
      funcName: 'wordPattern',
      starter: `function wordPattern(pattern, s) {
  // TODO: implement word pattern matching
}`,
      constraints: 'Pattern length up to 300.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: ["abba", "dog cat cat dog"], expected: true, n: 4 },
        { input: ["abba", "dog cat cat fish"], expected: false, n: 4 }
      ]
    }
  });
}

// Linked Lists
function makeLinkedListBasics() {
  return createProblem({
    id: 'linkedlist-basics',
    title: 'Linked List: Basics',
    difficulty: 'easy',
    brief: 'Understand linked list structure and basic operations.',
    hints: [
      'Linked list consists of nodes with data and next pointer.',
      'Always check for null pointers before accessing next.',
      'Use dummy head for easier insertion/deletion at beginning.'
    ],
    learn: {
      intuition: 'Dynamic data structure with nodes linked via pointers.',
      visual: 'Chain of nodes: [data|next] -> [data|next] -> [data|null]',
      pattern: 'Pointer manipulation and traversal patterns.',
      template: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function traverseList(head) {
  let current = head;
  const values = [];
  
  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }
  
  return values;
}

function insertAtBeginning(head, val) {
  const newNode = new ListNode(val);
  newNode.next = head;
  return newNode; // New head
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What happens if you access next on a null pointer?',
        choices: ['Returns null', 'Runtime error', 'Returns undefined', 'Creates new node'],
        answer: 1,
        explain: 'Accessing properties on null results in a runtime error.'
      }
    ],
    practice: {
      funcName: 'traverseList',
      starter: `function traverseList(head) {
  // TODO: implement linked list traversal
}`,
      constraints: 'List length up to 1000.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], n: 5 }
      ]
    }
  });
}

function makeReverseLinkedList() {
  return createProblem({
    id: 'reverse-linkedlist',
    title: 'Linked List: Reverse',
    difficulty: 'easy',
    brief: 'Reverse a singly linked list iteratively and recursively.',
    hints: [
      'Use three pointers: prev, current, next.',
      'Save next before breaking the link.',
      'Reverse the link, then move pointers forward.'
    ],
    learn: {
      intuition: 'Reverse direction of all next pointers by breaking and reconnecting links.',
      visual: 'Three pointers moving through list, reversing connections.',
      pattern: 'Pointer manipulation with state tracking.',
      template: `// Iterative approach
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const next = current.next; // Save next
    current.next = prev;       // Reverse link
    prev = current;            // Move prev
    current = next;            // Move current
  }
  
  return prev; // New head
}

// Recursive approach
function reverseListRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head; // Reverse link
  head.next = null;      // Break old link
  
  return newHead;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does the prev pointer track?',
        choices: ['Next node', 'Previous node in original list', 'Previous node in reversed list', 'Current node'],
        answer: 2,
        explain: 'prev tracks the previous node in the reversed portion of the list.'
      }
    ],
    practice: {
      funcName: 'reverseList',
      starter: `function reverseList(head) {
  // TODO: implement linked list reversal
}`,
      constraints: 'List length up to 5000.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], n: 5 },
        { input: [[1, 2]], expected: [2, 1], n: 2 }
      ]
    }
  });
}

function makeMergeTwoLists() {
  return createProblem({
    id: 'merge-two-lists',
    title: 'Linked List: Merge Two Sorted Lists',
    difficulty: 'easy',
    brief: 'Merge two sorted linked lists into one sorted list.',
    hints: [
      'Use dummy head to simplify edge cases.',
      'Compare values and attach smaller node to result.',
      'Move pointer in list with smaller value.'
    ],
    learn: {
      intuition: 'Similar to merging two sorted arrays, but with pointer manipulation.',
      visual: 'Two pointers scanning sorted lists, building merged result.',
      pattern: 'Two-pointer merge with dummy head technique.',
      template: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  // Attach remaining nodes
  current.next = list1 !== null ? list1 : list2;
  
  return dummy.next; // Skip dummy head
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why use a dummy head?',
        choices: ['Better performance', 'Simplifies edge cases', 'Required by algorithm', 'Saves memory'],
        answer: 1,
        explain: 'Dummy head eliminates special handling for empty result list.'
      }
    ],
    practice: {
      funcName: 'mergeTwoLists',
      starter: `function mergeTwoLists(list1, list2) {
  // TODO: implement merge two sorted lists
}`,
      constraints: 'List length up to 50.',
      expectedComplexity: 'O(n + m)',
      tests: [
        { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], n: 6 },
        { input: [[], []], expected: [], n: 0 }
      ]
    }
  });
}

function makeRemoveNthNode() {
  return createProblem({
    id: 'remove-nth-node',
    title: 'Linked List: Remove Nth Node From End',
    difficulty: 'medium',
    brief: 'Remove nth node from end of linked list in one pass.',
    hints: [
      'Use two pointers with n+1 gap between them.',
      'When fast pointer reaches end, slow pointer is at node before target.',
      'Use dummy head to handle edge cases.'
    ],
    learn: {
      intuition: 'Two pointers maintain constant gap to find nth from end.',
      visual: 'Fast pointer n steps ahead, both move until fast reaches end.',
      pattern: 'Two pointers with gap technique.',
      template: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  
  // Move fast pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both pointers until fast reaches end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // Remove the nth node
  slow.next = slow.next.next;
  
  return dummy.next;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why move fast pointer n+1 steps instead of n?',
        choices: ['Bug in algorithm', 'To reach node before target', 'For efficiency', 'Random choice'],
        answer: 1,
        explain: 'We need slow pointer at node before target to perform removal.'
      }
    ],
    practice: {
      funcName: 'removeNthFromEnd',
      starter: `function removeNthFromEnd(head, n) {
  // TODO: implement remove nth node from end
}`,
      constraints: 'List length up to 30.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5], n: 4 },
        { input: [[1], 1], expected: [], n: 0 }
      ]
    }
  });
}

function makeLinkedListCycle() {
  return createProblem({
    id: 'linkedlist-cycle',
    title: 'Linked List: Cycle Detection (Floyd\'s)',
    difficulty: 'easy',
    brief: 'Detect if linked list has a cycle using Floyd\'s algorithm.',
    hints: [
      'Use two pointers: slow (1 step) and fast (2 steps).',
      'If there\'s a cycle, fast and slow will meet.',
      'If fast reaches null, there\'s no cycle.'
    ],
    learn: {
      intuition: 'Fast pointer laps slow pointer if there\'s a cycle.',
      visual: 'Race track: faster runner catches up to slower in circular track.',
      pattern: 'Floyd\'s cycle detection (tortoise and hare).',
      template: `function hasCycle(head) {
  if (head === null || head.next === null) {
    return false;
  }
  
  let slow = head;
  let fast = head;
  
  while (fast !== null && fast.next !== null) {
    slow = slow.next;      // Move 1 step
    fast = fast.next.next; // Move 2 steps
    
    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  
  return false; // No cycle
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why does Floyd\'s algorithm work?',
        choices: ['Fast pointer is faster', 'Mathematical proof', 'Fast pointer will lap slow in cycle', 'Random property'],
        answer: 2,
        explain: 'In a cycle, fast pointer gains 1 step per iteration and will eventually catch slow.'
      }
    ],
    practice: {
      funcName: 'hasCycle',
      starter: `function hasCycle(head) {
  // TODO: implement cycle detection
}`,
      constraints: 'List length up to 10⁴.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[3, 2, 0, -4], 1], expected: true, n: 4 }, // Cycle at index 1
        { input: [[1, 2], 0], expected: true, n: 2 },        // Cycle at index 0
        { input: [[1], -1], expected: false, n: 1 }          // No cycle
      ]
    }
  });
}

function makeIntersectionTwoLists() {
  return createProblem({
    id: 'intersection-two-lists',
    title: 'Linked List: Intersection of Two Lists',
    difficulty: 'easy',
    brief: 'Find intersection node of two linked lists.',
    hints: [
      'Use two pointers starting at both heads.',
      'When pointer reaches end, redirect to other list\'s head.',
      'They will meet at intersection or both reach null.'
    ],
    learn: {
      intuition: 'Eliminate length difference by switching pointers to other lists.',
      visual: 'Two pointers traverse both lists completely, meeting at intersection.',
      pattern: 'Two pointers with list switching technique.',
      template: `function getIntersectionNode(headA, headB) {
  if (headA === null || headB === null) {
    return null;
  }
  
  let pointerA = headA;
  let pointerB = headB;
  
  while (pointerA !== pointerB) {
    // Switch to other list when reaching end
    pointerA = pointerA === null ? headB : pointerA.next;
    pointerB = pointerB === null ? headA : pointerB.next;
  }
  
  return pointerA; // Intersection or null
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What happens if lists don\'t intersect?',
        choices: ['Infinite loop', 'Both pointers become null', 'Runtime error', 'Return random node'],
        answer: 1,
        explain: 'Both pointers will eventually become null and the loop terminates.'
      }
    ],
    practice: {
      funcName: 'getIntersectionNode',
      starter: `function getIntersectionNode(headA, headB) {
  // TODO: implement intersection detection
}`,
      constraints: 'List length up to 3×10⁴.',
      expectedComplexity: 'O(m + n)',
      tests: [
        { input: [[4, 1, 8, 4, 5], [5, 6, 1, 8, 4, 5], 2], expected: 8, n: 5 } // Intersection at value 8
      ]
    }
  });
}

function makePalindromeLinkedList() {
  return createProblem({
    id: 'palindrome-linkedlist',
    title: 'Linked List: Palindrome Check',
    difficulty: 'easy',
    brief: 'Check if linked list is a palindrome in O(1) space.',
    hints: [
      'Find middle using slow/fast pointers.',
      'Reverse second half of the list.',
      'Compare first half with reversed second half.'
    ],
    learn: {
      intuition: 'Compare first half with reversed second half.',
      visual: 'Split list at middle, reverse second half, compare both halves.',
      pattern: 'Two pointers + reverse + comparison.',
      template: `function isPalindrome(head) {
  if (head === null || head.next === null) {
    return true;
  }
  
  // Find middle
  let slow = head;
  let fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let secondHalf = reverseList(slow.next);
  
  // Compare halves
  let firstHalf = head;
  while (secondHalf !== null) {
    if (firstHalf.val !== secondHalf.val) {
      return false;
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }
  
  return true;
}

function reverseList(head) {
  let prev = null;
  while (head !== null) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why reverse only the second half?',
        choices: ['Easier implementation', 'Better performance', 'Maintain O(1) space', 'All of the above'],
        answer: 3,
        explain: 'Reversing second half is efficient and maintains O(1) space complexity.'
      }
    ],
    practice: {
      funcName: 'isPalindrome',
      starter: `function isPalindrome(head) {
  // TODO: implement palindrome check
}`,
      constraints: 'List length up to 10⁵.',
      expectedComplexity: 'O(n) time, O(1) space',
      tests: [
        { input: [[1, 2, 2, 1]], expected: true, n: 4 },
        { input: [[1, 2]], expected: false, n: 2 }
      ]
    }
  });
}

function makeRotateList() {
  return createProblem({
    id: 'rotate-list',
    title: 'Linked List: Rotate Right',
    difficulty: 'medium',
    brief: 'Rotate linked list to the right by k places.',
    hints: [
      'Find list length and make it circular.',
      'Calculate effective rotation: k % length.',
      'Find new tail position and break circle.'
    ],
    learn: {
      intuition: 'Make list circular, find new break point, restore linear structure.',
      visual: 'Circular list with break point moved k positions.',
      pattern: 'Circular list manipulation with modular arithmetic.',
      template: `function rotateRight(head, k) {
  if (head === null || head.next === null || k === 0) {
    return head;
  }
  
  // Find length and make circular
  let length = 1;
  let tail = head;
  while (tail.next !== null) {
    tail = tail.next;
    length++;
  }
  tail.next = head; // Make circular
  
  // Calculate effective rotation
  k = k % length;
  
  // Find new tail (length - k - 1 steps from head)
  let newTail = head;
  for (let i = 0; i < length - k - 1; i++) {
    newTail = newTail.next;
  }
  
  // Break circle and set new head
  const newHead = newTail.next;
  newTail.next = null;
  
  return newHead;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why use k % length?',
        choices: ['Bug prevention', 'Handle k > length', 'Performance', 'Mathematical requirement'],
        answer: 1,
        explain: 'When k > length, rotation wraps around, so k % length gives effective rotation.'
      }
    ],
    practice: {
      funcName: 'rotateRight',
      starter: `function rotateRight(head, k) {
  // TODO: implement rotate right
}`,
      constraints: 'List length up to 500.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3], n: 5 },
        { input: [[0, 1, 2], 4], expected: [2, 0, 1], n: 3 }
      ]
    }
  });
}

// Trees & Binary Search Trees
function makeBinaryTreeBasics() {
  return createProblem({
    id: 'binary-tree-basics',
    title: 'Binary Tree: Basics & Structure',
    difficulty: 'easy',
    brief: 'Understand binary tree structure and basic operations.',
    hints: [
      'Binary tree node has at most two children: left and right.',
      'Use recursion for most tree operations.',
      'Always check for null nodes before accessing properties.'
    ],
    learn: {
      intuition: 'Hierarchical data structure with parent-child relationships.',
      visual: 'Tree structure with root at top, leaves at bottom.',
      pattern: 'Recursive traversal and manipulation patterns.',
      template: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function treeHeight(root) {
  if (root === null) return 0;
  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
}

function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the maximum number of children in a binary tree node?',
        choices: ['1', '2', '3', 'Unlimited'],
        answer: 1,
        explain: 'Binary tree nodes have at most two children: left and right.'
      }
    ],
    practice: {
      funcName: 'treeHeight',
      starter: `function treeHeight(root) {
  // TODO: implement tree height calculation
}`,
      constraints: 'Tree with up to 10⁴ nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expected: 3, n: 7 }
      ]
    },
    game: { type: 'binary-tree-visual' }
  });
}

function makeBSTOperations() {
  return createProblem({
    id: 'bst-operations',
    title: 'BST: Search, Insert, Delete',
    difficulty: 'medium',
    brief: 'Implement basic BST operations maintaining BST property.',
    hints: [
      'BST property: left < root < right for all subtrees.',
      'Search: compare with root, go left or right.',
      'Insert: find position and attach new node.',
      'Delete: handle 3 cases - no children, one child, two children.'
    ],
    learn: {
      intuition: 'BST maintains sorted order enabling O(log n) operations.',
      visual: 'Tree where left subtree < root < right subtree recursively.',
      pattern: 'Recursive navigation using comparison with current node.',
      template: `function searchBST(root, val) {
  if (root === null || root.val === val) {
    return root;
  }
  
  return val < root.val ? 
    searchBST(root.left, val) : 
    searchBST(root.right, val);
}

function insertIntoBST(root, val) {
  if (root === null) {
    return new TreeNode(val);
  }
  
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  
  return root;
}

function deleteNode(root, key) {
  if (root === null) return null;
  
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node to be deleted
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    
    // Two children: find inorder successor
    let successor = root.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
    
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  
  return root;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'In BST deletion, what do we do when node has two children?',
        choices: ['Remove directly', 'Replace with predecessor', 'Replace with successor', 'Either predecessor or successor'],
        answer: 3,
        explain: 'We can replace with either inorder predecessor or successor to maintain BST property.'
      }
    ],
    practice: {
      funcName: 'searchBST',
      starter: `function searchBST(root, val) {
  // TODO: implement BST search
}`,
      constraints: 'BST with up to 5000 nodes.',
      expectedComplexity: 'O(log n) average, O(n) worst',
      tests: [
        { input: [[4, 2, 7, 1, 3], 2], expected: [2, 1, 3], n: 5 }
      ]
    },
    game: { type: 'bst-operations-visual' }
  });
}

function makeTreeTraversals() {
  return createProblem({
    id: 'tree-traversals',
    title: 'Tree: Traversals (Inorder, Preorder, Postorder, Level)',
    difficulty: 'medium',
    brief: 'Implement all four tree traversal methods.',
    hints: [
      'Inorder: Left → Root → Right (gives sorted order for BST).',
      'Preorder: Root → Left → Right (good for tree reconstruction).',
      'Postorder: Left → Right → Root (good for deletion).',
      'Level order: Use queue for breadth-first traversal.'
    ],
    learn: {
      intuition: 'Different traversal orders serve different purposes and algorithms.',
      visual: 'Each traversal visits nodes in a specific systematic order.',
      pattern: 'Recursive DFS for in/pre/post, iterative BFS for level order.',
      template: `// Inorder Traversal (Left -> Root -> Right)
function inorderTraversal(root) {
  const result = [];
  
  function inorder(node) {
    if (node === null) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}

// Preorder Traversal (Root -> Left -> Right)
function preorderTraversal(root) {
  const result = [];
  
  function preorder(node) {
    if (node === null) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  }
  
  preorder(root);
  return result;
}

// Postorder Traversal (Left -> Right -> Root)
function postorderTraversal(root) {
  const result = [];
  
  function postorder(node) {
    if (node === null) return;
    postorder(node.left);
    postorder(node.right);
    result.push(node.val);
  }
  
  postorder(root);
  return result;
}

// Level Order Traversal (Breadth-First)
function levelOrder(root) {
  if (root === null) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Which traversal gives sorted order for BST?',
        choices: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        answer: 1,
        explain: 'Inorder traversal visits left subtree, root, then right subtree - giving sorted order for BST.'
      }
    ],
    practice: {
      funcName: 'inorderTraversal',
      starter: `function inorderTraversal(root) {
  // TODO: implement inorder traversal
}`,
      constraints: 'Tree with up to 100 nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, null, 2, 3]], expected: [1, 3, 2], n: 3 }
      ]
    },
    game: { type: 'tree-traversals-visual' }
  });
}

function makeValidateBST() {
  return createProblem({
    id: 'validate-bst',
    title: 'BST: Validate Binary Search Tree',
    difficulty: 'medium',
    brief: 'Check if binary tree is a valid BST.',
    hints: [
      'Each node must be within a valid range [min, max].',
      'Left subtree: all values < root, Right subtree: all values > root.',
      'Pass down bounds recursively and check violations.'
    ],
    learn: {
      intuition: 'BST property must hold for ALL nodes, not just immediate children.',
      visual: 'Each node has valid range constraints inherited from ancestors.',
      pattern: 'Recursive validation with range bounds propagation.',
      template: `function isValidBST(root) {
  return validate(root, null, null);
}

function validate(node, minVal, maxVal) {
  if (node === null) return true;
  
  // Check if current node violates BST property
  if ((minVal !== null && node.val <= minVal) ||
      (maxVal !== null && node.val >= maxVal)) {
    return false;
  }
  
  // Recursively validate subtrees with updated bounds
  return validate(node.left, minVal, node.val) &&
         validate(node.right, node.val, maxVal);
}

// Alternative: Inorder traversal approach
function isValidBSTInorder(root) {
  const inorderValues = [];
  
  function inorder(node) {
    if (node === null) return;
    inorder(node.left);
    inorderValues.push(node.val);
    inorder(node.right);
  }
  
  inorder(root);
  
  // Check if inorder traversal is strictly increasing
  for (let i = 1; i < inorderValues.length; i++) {
    if (inorderValues[i] <= inorderValues[i - 1]) {
      return false;
    }
  }
  
  return true;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why check bounds instead of just comparing with parent?',
        choices: ['Better performance', 'Handles ancestor constraints', 'Easier implementation', 'No specific reason'],
        answer: 1,
        explain: 'A node must satisfy constraints from ALL ancestors, not just immediate parent.'
      }
    ],
    practice: {
      funcName: 'isValidBST',
      starter: `function isValidBST(root) {
  // TODO: implement BST validation
}`,
      constraints: 'Tree with up to 10⁴ nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[2, 1, 3]], expected: true, n: 3 },
        { input: [[5, 1, 4, null, null, 3, 6]], expected: false, n: 5 }
      ]
    },
    game: { type: 'validate-bst-visual' }
  });
}

function makeLowestCommonAncestor() {
  return createProblem({
    id: 'lowest-common-ancestor',
    title: 'Tree: Lowest Common Ancestor',
    difficulty: 'medium',
    brief: 'Find lowest common ancestor of two nodes in binary tree.',
    hints: [
      'LCA is the deepest node that has both p and q as descendants.',
      'If current node is p or q, it could be the LCA.',
      'If both subtrees contain one target each, current node is LCA.'
    ],
    learn: {
      intuition: 'LCA is where paths from root to both nodes first diverge.',
      visual: 'Tree with paths highlighted showing convergence point.',
      pattern: 'Recursive search with information bubbling up.',
      template: `// For general binary tree
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  // If both subtrees return non-null, current node is LCA
  if (left !== null && right !== null) {
    return root;
  }
  
  // Return whichever subtree found a target
  return left !== null ? left : right;
}

// For BST (more efficient)
function lowestCommonAncestorBST(root, p, q) {
  while (root !== null) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;  // Both in left subtree
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right; // Both in right subtree
    } else {
      return root;       // Split point found
    }
  }
  return null;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'In BST LCA, what does it mean when p < root < q?',
        choices: ['p and q in same subtree', 'Root is the LCA', 'Need to search deeper', 'Invalid case'],
        answer: 1,
        explain: 'When targets are on opposite sides of root, the root is their LCA.'
      }
    ],
    practice: {
      funcName: 'lowestCommonAncestor',
      starter: `function lowestCommonAncestor(root, p, q) {
  // TODO: implement LCA finding
}`,
      constraints: 'Tree with up to 10⁵ nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expected: 3, n: 9 }
      ]
    }
  });
}

function makeMaxDepth() {
  return createProblem({
    id: 'max-depth',
    title: 'Tree: Maximum Depth',
    difficulty: 'easy',
    brief: 'Find maximum depth (height) of binary tree.',
    hints: [
      'Depth is number of edges from root to deepest leaf.',
      'Use recursion: depth = 1 + max(left_depth, right_depth).',
      'Base case: null node has depth 0.'
    ],
    learn: {
      intuition: 'Tree height is longest path from root to any leaf.',
      visual: 'Count levels from root to deepest leaf node.',
      pattern: 'Recursive depth calculation with max aggregation.',
      template: `// Recursive approach
function maxDepth(root) {
  if (root === null) return 0;
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return 1 + Math.max(leftDepth, rightDepth);
}

// Iterative approach using level-order traversal
function maxDepthIterative(root) {
  if (root === null) return 0;
  
  const queue = [root];
  let depth = 0;
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    
    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    depth++; // Completed one level
  }
  
  return depth;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the maximum depth of a single node tree?',
        choices: ['0', '1', '2', 'Depends on value'],
        answer: 1,
        explain: 'A single node tree has depth 1 (one level).'
      }
    ],
    practice: {
      funcName: 'maxDepth',
      starter: `function maxDepth(root) {
  // TODO: implement maximum depth calculation
}`,
      constraints: 'Tree with up to 10⁴ nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expected: 3, n: 7 },
        { input: [[1, null, 2]], expected: 2, n: 2 }
      ]
    }
  });
}

function makeBalancedTree() {
  return createProblem({
    id: 'balanced-tree',
    title: 'Tree: Check if Height Balanced',
    difficulty: 'easy',
    brief: 'Check if binary tree is height-balanced.',
    hints: [
      'Height-balanced: height difference of subtrees ≤ 1 for every node.',
      'Calculate height while checking balance condition.',
      'Return -1 to indicate imbalance, propagate upward.'
    ],
    learn: {
      intuition: 'Balanced tree ensures O(log n) operations by limiting height.',
      visual: 'Check height difference at each node throughout tree.',
      pattern: 'Recursive height calculation with balance checking.',
      template: `function isBalanced(root) {
  return checkBalance(root) !== -1;
}

function checkBalance(node) {
  if (node === null) return 0;
  
  const leftHeight = checkBalance(node.left);
  if (leftHeight === -1) return -1; // Left subtree imbalanced
  
  const rightHeight = checkBalance(node.right);
  if (rightHeight === -1) return -1; // Right subtree imbalanced
  
  // Check current node balance
  if (Math.abs(leftHeight - rightHeight) > 1) {
    return -1; // Current node imbalanced
  }
  
  return 1 + Math.max(leftHeight, rightHeight);
}

// Alternative: separate height function
function isBalancedSeparate(root) {
  if (root === null) return true;
  
  const leftHeight = getHeight(root.left);
  const rightHeight = getHeight(root.right);
  
  return Math.abs(leftHeight - rightHeight) <= 1 &&
         isBalancedSeparate(root.left) &&
         isBalancedSeparate(root.right);
}

function getHeight(node) {
  if (node === null) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the maximum height difference allowed in balanced tree?',
        choices: ['0', '1', '2', 'log n'],
        answer: 1,
        explain: 'Height-balanced tree allows at most 1 level difference between subtrees.'
      }
    ],
    practice: {
      funcName: 'isBalanced',
      starter: `function isBalanced(root) {
  // TODO: implement balanced tree check
}`,
      constraints: 'Tree with up to 10⁴ nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[3, 9, 20, null, null, 15, 7]], expected: true, n: 7 },
        { input: [[1, 2, 2, 3, 3, null, null, 4, 4]], expected: false, n: 7 }
      ]
    }
  });
}

function makePathSum() {
  return createProblem({
    id: 'path-sum',
    title: 'Tree: Path Sum',
    difficulty: 'easy',
    brief: 'Check if tree has root-to-leaf path with given sum.',
    hints: [
      'Subtract current node value from target sum.',
      'At leaf node, check if remaining sum equals node value.',
      'Explore both left and right subtrees recursively.'
    ],
    learn: {
      intuition: 'Track remaining sum as we traverse down to leaves.',
      visual: 'Paths from root to leaves with running sum calculation.',
      pattern: 'Recursive path traversal with state tracking.',
      template: `function hasPathSum(root, targetSum) {
  if (root === null) return false;
  
  // If leaf node, check if it equals remaining sum
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }
  
  // Recursively check subtrees with reduced sum
  const remainingSum = targetSum - root.val;
  return hasPathSum(root.left, remainingSum) || 
         hasPathSum(root.right, remainingSum);
}

// Return all root-to-leaf paths with target sum
function pathSum(root, targetSum) {
  const result = [];
  const currentPath = [];
  
  function dfs(node, remainingSum) {
    if (node === null) return;
    
    currentPath.push(node.val);
    
    // If leaf and sum matches, add path to result
    if (node.left === null && node.right === null && 
        node.val === remainingSum) {
      result.push([...currentPath]);
    } else {
      // Continue exploring subtrees
      const newSum = remainingSum - node.val;
      dfs(node.left, newSum);
      dfs(node.right, newSum);
    }
    
    currentPath.pop(); // Backtrack
  }
  
  dfs(root, targetSum);
  return result;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'When do we check if sum equals target?',
        choices: ['At every node', 'Only at leaf nodes', 'Only at root', 'At internal nodes'],
        answer: 1,
        explain: 'We check sum only at leaf nodes since we need complete root-to-leaf paths.'
      }
    ],
    practice: {
      funcName: 'hasPathSum',
      starter: `function hasPathSum(root, targetSum) {
  // TODO: implement path sum check
}`,
      constraints: 'Tree with up to 5000 nodes.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22], expected: true, n: 11 }
      ]
    }
  });
}

// Advanced Trees
function makeAVLTree() {
  return createProblem({
    id: 'avl-tree',
    title: 'AVL Tree: Self-Balancing BST',
    difficulty: 'hard',
    brief: 'Implement AVL tree with rotations for automatic balancing.',
    hints: [
      'AVL property: height difference of subtrees ≤ 1.',
      'Track height and balance factor for each node.',
      'Use rotations to rebalance after insertions/deletions.'
    ],
    learn: {
      intuition: 'Self-balancing BST ensuring O(log n) operations always.',
      visual: 'Tree with height annotations and rotation operations.',
      pattern: 'Height tracking + rotation rebalancing.',
      template: `class AVLNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function getHeight(node) {
  return node ? node.height : 0;
}

function getBalance(node) {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node) {
  if (node) {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }
}

function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;
  
  // Perform rotation
  x.right = y;
  y.left = T2;
  
  // Update heights
  updateHeight(y);
  updateHeight(x);
  
  return x; // New root
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;
  
  // Perform rotation
  y.left = x;
  x.right = T2;
  
  // Update heights
  updateHeight(x);
  updateHeight(y);
  
  return y; // New root
}

function insertAVL(root, val) {
  // Step 1: Normal BST insertion
  if (!root) return new AVLNode(val);
  
  if (val < root.val) {
    root.left = insertAVL(root.left, val);
  } else if (val > root.val) {
    root.right = insertAVL(root.right, val);
  } else {
    return root; // Duplicate values not allowed
  }
  
  // Step 2: Update height
  updateHeight(root);
  
  // Step 3: Get balance factor
  const balance = getBalance(root);
  
  // Step 4: If unbalanced, perform rotations
  // Left Left Case
  if (balance > 1 && val < root.left.val) {
    return rotateRight(root);
  }
  
  // Right Right Case
  if (balance < -1 && val > root.right.val) {
    return rotateLeft(root);
  }
  
  // Left Right Case
  if (balance > 1 && val > root.left.val) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  
  // Right Left Case
  if (balance < -1 && val < root.right.val) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  
  return root; // Return unchanged root
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the maximum height difference in AVL tree?',
        choices: ['0', '1', '2', 'log n'],
        answer: 1,
        explain: 'AVL tree maintains height difference ≤ 1 between left and right subtrees.'
      }
    ],
    practice: {
      funcName: 'insertAVL',
      starter: `function insertAVL(root, val) {
  // TODO: implement AVL tree insertion with balancing
}`,
      constraints: 'Tree with up to 1000 nodes.',
      expectedComplexity: 'O(log n)',
      tests: [
        { input: [null, [10, 20, 30]], expected: 'balanced tree', n: 3 }
      ]
    }
  });
}

function makeRedBlackTree() {
  return createProblem({
    id: 'red-black-tree',
    title: 'Red-Black Tree: Self-Balancing BST',
    difficulty: 'hard',
    brief: 'Implement Red-Black tree with color-based balancing rules.',
    hints: [
      'Every node is either red or black.',
      'Root and leaves are black.',
      'Red nodes have black children.',
      'All paths from node to leaves have same number of black nodes.'
    ],
    learn: {
      intuition: 'Color-coded self-balancing BST with specific balancing rules.',
      visual: 'Tree nodes colored red/black with balancing invariants.',
      pattern: 'Color-based balancing with rotation and recoloring.',
      template: `const RED = true;
const BLACK = false;

class RBNode {
  constructor(val, color = RED) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.color = color;
  }
}

function isRed(node) {
  return node && node.color === RED;
}

function rotateLeft(h) {
  const x = h.right;
  h.right = x.left;
  x.left = h;
  x.color = h.color;
  h.color = RED;
  return x;
}

function rotateRight(h) {
  const x = h.left;
  h.left = x.right;
  x.right = h;
  x.color = h.color;
  h.color = RED;
  return x;
}

function flipColors(h) {
  h.color = RED;
  if (h.left) h.left.color = BLACK;
  if (h.right) h.right.color = BLACK;
}

function insertRB(root, val) {
  root = insertHelper(root, val);
  root.color = BLACK; // Root is always black
  return root;
}

function insertHelper(h, val) {
  if (h === null) return new RBNode(val);
  
  if (val < h.val) {
    h.left = insertHelper(h.left, val);
  } else if (val > h.val) {
    h.right = insertHelper(h.right, val);
  } else {
    return h; // No duplicates
  }
  
  // Fix any right-leaning links
  if (isRed(h.right) && !isRed(h.left)) {
    h = rotateLeft(h);
  }
  
  // Fix any consecutive red links
  if (isRed(h.left) && isRed(h.left && h.left.left)) {
    h = rotateRight(h);
  }
  
  // Balance 4-node
  if (isRed(h.left) && isRed(h.right)) {
    flipColors(h);
  }
  
  return h;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What color is the root node in Red-Black tree?',
        choices: ['Always red', 'Always black', 'Can be either', 'Depends on size'],
        answer: 1,
        explain: 'The root node is always black in Red-Black trees.'
      }
    ],
    practice: {
      funcName: 'insertRB',
      starter: `function insertRB(root, val) {
  // TODO: implement Red-Black tree insertion
}`,
      constraints: 'Tree with up to 1000 nodes.',
      expectedComplexity: 'O(log n)',
      tests: [
        { input: [null, [1, 2, 3, 4, 5]], expected: 'balanced RB tree', n: 5 }
      ]
    }
  });
}

function makeTrie() {
  return createProblem({
    id: 'trie',
    title: 'Trie: Prefix Tree Implementation',
    difficulty: 'medium',
    brief: 'Implement Trie (prefix tree) for string storage and prefix matching.',
    hints: [
      'Each node represents a character in the alphabet.',
      'Path from root to node represents a prefix.',
      'Mark end-of-word nodes to distinguish complete words.'
    ],
    learn: {
      intuition: 'Tree structure optimized for string prefix operations.',
      visual: 'Tree where each path represents a string prefix.',
      pattern: 'Character-based tree navigation and marking.',
      template: `class TrieNode {
  constructor() {
    this.children = {}; // Map character -> TrieNode
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let current = this.root;
    
    for (const char of word) {
      if (!(char in current.children)) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    
    current.isEndOfWord = true;
  }
  
  search(word) {
    let current = this.root;
    
    for (const char of word) {
      if (!(char in current.children)) {
        return false;
      }
      current = current.children[char];
    }
    
    return current.isEndOfWord;
  }
  
  startsWith(prefix) {
    let current = this.root;
    
    for (const char of prefix) {
      if (!(char in current.children)) {
        return false;
      }
      current = current.children[char];
    }
    
    return true;
  }
  
  // Find all words with given prefix
  findWordsWithPrefix(prefix) {
    const results = [];
    let current = this.root;
    
    // Navigate to prefix end
    for (const char of prefix) {
      if (!(char in current.children)) {
        return results; // Prefix doesn't exist
      }
      current = current.children[char];
    }
    
    // DFS to find all words from this point
    this.dfs(current, prefix, results);
    return results;
  }
  
  dfs(node, currentWord, results) {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }
    
    for (const [char, childNode] of Object.entries(node.children)) {
      this.dfs(childNode, currentWord + char, results);
    }
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does isEndOfWord flag indicate?',
        choices: ['Node has no children', 'Complete word ends here', 'Node is leaf', 'Prefix ends here'],
        answer: 1,
        explain: 'isEndOfWord marks nodes where complete words end, distinguishing them from prefixes.'
      }
    ],
    practice: {
      funcName: 'Trie',
      starter: `class Trie {
  constructor() {
    // TODO: implement Trie data structure
  }
}`,
      constraints: 'Up to 30000 operations.',
      expectedComplexity: 'O(m) where m is word length',
      tests: [
        { input: [['insert', 'apple'], ['search', 'apple'], ['search', 'app']], expected: [null, true, false], n: 3 }
      ]
    }
  });
}

function makeSegmentTree() {
  return createProblem({
    id: 'segment-tree',
    title: 'Segment Tree: Range Queries',
    difficulty: 'hard',
    brief: 'Implement segment tree for efficient range sum/min/max queries.',
    hints: [
      'Binary tree where each node represents a range.',
      'Leaves represent individual elements.',
      'Internal nodes store aggregated values of their ranges.'
    ],
    learn: {
      intuition: 'Tree structure enabling O(log n) range queries and updates.',
      visual: 'Binary tree with range intervals and aggregated values.',
      pattern: 'Range-based tree with lazy propagation for efficiency.',
      template: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n);
    this.build(arr, 0, 0, this.n - 1);
  }
  
  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(arr, 2 * node + 1, start, mid);
      this.build(arr, 2 * node + 2, mid + 1, end);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }
  
  update(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
    } else {
      const mid = Math.floor((start + end) / 2);
      if (idx <= mid) {
        this.update(2 * node + 1, start, mid, idx, val);
      } else {
        this.update(2 * node + 2, mid + 1, end, idx, val);
      }
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }
  
  query(node, start, end, l, r) {
    if (r < start || end < l) {
      return 0; // Outside range
    }
    if (l <= start && end <= r) {
      return this.tree[node]; // Complete overlap
    }
    
    const mid = Math.floor((start + end) / 2);
    const leftSum = this.query(2 * node + 1, start, mid, l, r);
    const rightSum = this.query(2 * node + 2, mid + 1, end, l, r);
    return leftSum + rightSum;
  }
  
  updateRange(idx, val) {
    this.update(0, 0, this.n - 1, idx, val);
  }
  
  queryRange(l, r) {
    return this.query(0, 0, this.n - 1, l, r);
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the space complexity of segment tree?',
        choices: ['O(n)', 'O(n log n)', 'O(4n)', 'O(n²)'],
        answer: 2,
        explain: 'Segment tree requires at most 4n space for n elements.'
      }
    ],
    practice: {
      funcName: 'SegmentTree',
      starter: `class SegmentTree {
  constructor(arr) {
    // TODO: implement segment tree
  }
}`,
      constraints: 'Array with up to 10⁵ elements.',
      expectedComplexity: 'O(log n) per operation',
      tests: [
        { input: [[1, 3, 5, 7, 9, 11], [[1, 3], [2, 5]]], expected: [15, 32], n: 6 }
      ]
    }
  });
}

function makeFenwickTree() {
  return createProblem({
    id: 'fenwick-tree',
    title: 'Fenwick Tree (Binary Indexed Tree)',
    difficulty: 'hard',
    brief: 'Implement Fenwick tree for efficient prefix sum queries and updates.',
    hints: [
      'Uses binary representation for efficient range operations.',
      'Each index stores sum of a specific range of elements.',
      'Update and query operations use bit manipulation.'
    ],
    learn: {
      intuition: 'Compact tree using bit tricks for efficient prefix operations.',
      visual: 'Array-based tree structure with bit manipulation indexing.',
      pattern: 'Bit manipulation for parent-child navigation.',
      template: `class FenwickTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }
  
  // Add val to index i
  update(i, val) {
    for (++i; i <= this.n; i += i & -i) {
      this.tree[i] += val;
    }
  }
  
  // Get prefix sum from 0 to i
  query(i) {
    let sum = 0;
    for (++i; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }
  
  // Get range sum from l to r
  rangeQuery(l, r) {
    return this.query(r) - (l > 0 ? this.query(l - 1) : 0);
  }
}

// Usage example
function createFenwickFromArray(arr) {
  const ft = new FenwickTree(arr.length);
  for (let i = 0; i < arr.length; i++) {
    ft.update(i, arr[i]);
  }
  return ft;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does (i & -i) compute?',
        choices: ['Next power of 2', 'Lowest set bit', 'Highest set bit', 'Bit count'],
        answer: 1,
        explain: '(i & -i) extracts the lowest set bit, used for parent-child navigation.'
      }
    ],
    practice: {
      funcName: 'FenwickTree',
      starter: `class FenwickTree {
  constructor(n) {
    // TODO: implement Fenwick tree
  }
}`,
      constraints: 'Array with up to 10⁵ elements.',
      expectedComplexity: 'O(log n) per operation',
      tests: [
        { input: [[1, 3, 5, 7, 9], [[0, 2], [1, 4]]], expected: [9, 24], n: 5 }
      ]
    }
  });
}

// String Algorithms
function makeStringBasics() {
  return createProblem({
    id: 'string-basics',
    title: 'String: Basic Operations',
    difficulty: 'easy',
    brief: 'Understand string manipulation and basic algorithms.',
    hints: [
      'Strings are arrays of characters.',
      'Common operations: concatenation, substring, searching.',
      'Consider time complexity of string operations.'
    ],
    learn: {
      intuition: 'Strings as sequences of characters with various manipulation needs.',
      visual: 'Character arrays with indices and common operations.',
      pattern: 'Linear scanning and character-by-character processing.',
      template: `// String reversal
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}

// Check if strings are anagrams
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const count = {};
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}

// String to integer conversion
function myAtoi(s) {
  let i = 0;
  let sign = 1;
  let result = 0;
  
  // Skip whitespace
  while (i < s.length && s[i] === ' ') i++;
  
  // Handle sign
  if (i < s.length && (s[i] === '+' || s[i] === '-')) {
    sign = s[i] === '-' ? -1 : 1;
    i++;
  }
  
  // Process digits
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + (s[i] - '0');
    i++;
  }
  
  return sign * result;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the time complexity of string concatenation?',
        choices: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
        answer: 1,
        explain: 'String concatenation typically takes O(n) time where n is the total length.'
      }
    ],
    practice: {
      funcName: 'reverseString',
      starter: `function reverseString(s) {
  // TODO: implement string reversal
}`,
      constraints: 'String length up to 10⁵.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [['h', 'e', 'l', 'l', 'o']], expected: ['o', 'l', 'l', 'e', 'h'], n: 5 }
      ]
    }
  });
}

function makeKMPAlgorithm() {
  return createProblem({
    id: 'kmp-algorithm',
    title: 'KMP: Knuth-Morris-Pratt Pattern Matching',
    difficulty: 'hard',
    brief: 'Implement KMP algorithm for efficient string pattern matching.',
    hints: [
      'Build failure function (LPS array) for pattern.',
      'Use failure function to avoid redundant comparisons.',
      'When mismatch occurs, jump to position indicated by failure function.'
    ],
    learn: {
      intuition: 'Avoid redundant comparisons by utilizing pattern structure.',
      visual: 'Pattern with failure function showing jump positions on mismatch.',
      pattern: 'Preprocessing + linear scan with smart backtracking.',
      template: `function buildLPS(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0; // Length of previous longest prefix suffix
  let i = 1;
  
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  
  return lps;
}

function KMPSearch(text, pattern) {
  const matches = [];
  const lps = buildLPS(pattern);
  let i = 0; // Index for text
  let j = 0; // Index for pattern
  
  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }
    
    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  
  return matches;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does the LPS array store?',
        choices: ['Pattern characters', 'Longest proper prefix which is suffix', 'Character frequencies', 'Jump distances'],
        answer: 1,
        explain: 'LPS[i] stores length of longest proper prefix of pattern[0..i] which is also suffix.'
      }
    ],
    practice: {
      funcName: 'KMPSearch',
      starter: `function KMPSearch(text, pattern) {
  // TODO: implement KMP pattern matching
}`,
      constraints: 'Text length up to 10⁶, pattern length up to 10⁵.',
      expectedComplexity: 'O(n + m)',
      tests: [
        { input: ['ABABDABACDABABCABCABCABCABC', 'ABABCABCABCABC'], expected: [15], n: 28 }
      ]
    }
  });
}

function makeRabinKarp() {
  return createProblem({
    id: 'rabin-karp',
    title: 'Rabin-Karp: Rolling Hash Pattern Matching',
    difficulty: 'medium',
    brief: 'Implement Rabin-Karp algorithm using rolling hash technique.',
    hints: [
      'Use rolling hash for efficient window comparisons.',
      'Hash function: treat string as base-d number.',
      'Update hash in O(1) when sliding window.'
    ],
    learn: {
      intuition: 'Use hash values to quickly compare substrings.',
      visual: 'Sliding window with hash calculation and comparison.',
      pattern: 'Rolling hash with collision handling.',
      template: `function rabinKarp(text, pattern) {
  const matches = [];
  const d = 256; // Number of characters in alphabet
  const q = 101; // Prime number for modulo
  const m = pattern.length;
  const n = text.length;
  
  let patternHash = 0;
  let textHash = 0;
  let h = 1; // Hash multiplier
  
  // Calculate h = d^(m-1) % q
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }
  
  // Calculate initial hash values
  for (let i = 0; i < m; i++) {
    patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
    textHash = (d * textHash + text.charCodeAt(i)) % q;
  }
  
  // Slide pattern over text
  for (let i = 0; i <= n - m; i++) {
    // Check if hash values match
    if (patternHash === textHash) {
      // Verify character by character (handle hash collisions)
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        matches.push(i);
      }
    }
    
    // Calculate rolling hash for next window
    if (i < n - m) {
      textHash = (d * (textHash - text.charCodeAt(i) * h) + 
                  text.charCodeAt(i + m)) % q;
      
      // Handle negative hash values
      if (textHash < 0) {
        textHash = textHash + q;
      }
    }
  }
  
  return matches;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why use modulo operation in rolling hash?',
        choices: ['For efficiency', 'Prevent integer overflow', 'Better distribution', 'All of the above'],
        answer: 3,
        explain: 'Modulo prevents overflow, improves distribution, and maintains efficiency.'
      }
    ],
    practice: {
      funcName: 'rabinKarp',
      starter: `function rabinKarp(text, pattern) {
  // TODO: implement Rabin-Karp pattern matching
}`,
      constraints: 'Text length up to 10⁶.',
      expectedComplexity: 'O(n + m) average, O(nm) worst',
      tests: [
        { input: ['GEEKS FOR GEEKS', 'GEEK'], expected: [0, 10], n: 15 }
      ]
    }
  });
}

function makeBoyerMoore() {
  return createProblem({
    id: 'boyer-moore',
    title: 'Boyer-Moore: Bad Character Heuristic',
    difficulty: 'hard',
    brief: 'Implement Boyer-Moore algorithm with bad character heuristic.',
    hints: [
      'Scan pattern from right to left.',
      'On mismatch, shift pattern based on bad character rule.',
      'Preprocess pattern to build bad character table.'
    ],
    learn: {
      intuition: 'Skip characters by scanning right-to-left and using mismatch info.',
      visual: 'Pattern scanning from right with smart shifting on mismatches.',
      pattern: 'Right-to-left scanning with heuristic-based shifts.',
      template: `function buildBadCharTable(pattern) {
  const badChar = {};
  
  // Initialize all characters to -1
  for (let i = 0; i < 256; i++) {
    badChar[String.fromCharCode(i)] = -1;
  }
  
  // Fill actual values for pattern characters
  for (let i = 0; i < pattern.length; i++) {
    badChar[pattern[i]] = i;
  }
  
  return badChar;
}

function boyerMoore(text, pattern) {
  const matches = [];
  const m = pattern.length;
  const n = text.length;
  const badChar = buildBadCharTable(pattern);
  
  let shift = 0;
  
  while (shift <= n - m) {
    let j = m - 1;
    
    // Scan pattern from right to left
    while (j >= 0 && pattern[j] === text[shift + j]) {
      j--;
    }
    
    if (j < 0) {
      // Pattern found
      matches.push(shift);
      
      // Shift pattern to align next character in text
      // with last occurrence in pattern
      shift += shift + m < n ? 
        m - badChar[text[shift + m]] : 1;
    } else {
      // Mismatch occurred, shift pattern
      shift += Math.max(1, j - badChar[text[shift + j]]);
    }
  }
  
  return matches;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the best-case time complexity of Boyer-Moore?',
        choices: ['O(n)', 'O(n/m)', 'O(nm)', 'O(m)'],
        answer: 1,
        explain: 'In best case, we can skip m characters at a time, giving O(n/m) complexity.'
      }
    ],
    practice: {
      funcName: 'boyerMoore',
      starter: `function boyerMoore(text, pattern) {
  // TODO: implement Boyer-Moore pattern matching
}`,
      constraints: 'Text length up to 10⁶.',
      expectedComplexity: 'O(n/m) best, O(nm) worst',
      tests: [
        { input: ['ABAAABCDABCDABDE', 'ABCD'], expected: [6, 10], n: 16 }
      ]
    }
  });
}

function makeZAlgorithm() {
  return createProblem({
    id: 'z-algorithm',
    title: 'Z Algorithm: Pattern Matching',
    difficulty: 'medium',
    brief: 'Implement Z algorithm for linear time pattern matching.',
    hints: [
      'Z[i] = length of longest substring starting at i which is prefix.',
      'Use previously computed Z values to optimize computation.',
      'Maintain rightmost Z-box to avoid redundant work.'
    ],
    learn: {
      intuition: 'Build Z array indicating prefix matches at each position.',
      visual: 'String with Z values showing prefix match lengths.',
      pattern: 'Linear preprocessing with smart reuse of computed values.',
      template: `function buildZArray(s) {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  
  for (let i = 1; i < n; i++) {
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
    
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }
  
  return z;
}

function zAlgorithmSearch(text, pattern) {
  const matches = [];
  const combined = pattern + '$' + text;
  const z = buildZArray(combined);
  const patternLength = pattern.length;
  
  for (let i = patternLength + 1; i < combined.length; i++) {
    if (z[i] === patternLength) {
      matches.push(i - patternLength - 1);
    }
  }
  
  return matches;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does Z[i] represent?',
        choices: ['Character at position i', 'Length of longest prefix match at i', 'Distance to next match', 'Hash value at i'],
        answer: 1,
        explain: 'Z[i] is length of longest substring starting at i which is also a prefix.'
      }
    ],
    practice: {
      funcName: 'zAlgorithmSearch',
      starter: `function zAlgorithmSearch(text, pattern) {
  // TODO: implement Z algorithm pattern matching
}`,
      constraints: 'Text length up to 10⁶.',
      expectedComplexity: 'O(n + m)',
      tests: [
        { input: ['AABAACAADAABAABA', 'AABA'], expected: [0, 9, 12], n: 16 }
      ]
    }
  });
}

function makeManacher() {
  return createProblem({
    id: 'manacher',
    title: 'Manacher: Longest Palindromic Substring',
    difficulty: 'hard',
    brief: 'Implement Manacher\'s algorithm for finding longest palindromic substring.',
    hints: [
      'Transform string to handle even-length palindromes.',
      'Use previously computed palindrome info to optimize.',
      'Maintain center and right boundary of rightmost palindrome.'
    ],
    learn: {
      intuition: 'Utilize palindrome symmetry to avoid redundant character comparisons.',
      visual: 'String with palindrome centers and radii marked.',
      pattern: 'Linear scan with palindrome property exploitation.',
      template: `function preprocessString(s) {
  // Transform "abc" to "^#a#b#c#$"
  let result = '^';
  for (let i = 0; i < s.length; i++) {
    result += '#' + s[i];
  }
  result += '#$';
  return result;
}

function manacher(s) {
  if (!s) return '';
  
  const T = preprocessString(s);
  const n = T.length;
  const P = new Array(n).fill(0);
  let center = 0, right = 0;
  
  for (let i = 1; i < n - 1; i++) {
    const mirror = 2 * center - i;
    
    if (i < right) {
      P[i] = Math.min(right - i, P[mirror]);
    }
    
    // Try to expand palindrome centered at i
    try {
      while (T[i + (1 + P[i])] === T[i - (1 + P[i])]) {
        P[i]++;
      }
    } catch (e) {
      // Handle boundary conditions
    }
    
    // If palindrome centered at i extends past right, adjust center and right
    if (i + P[i] > right) {
      center = i;
      right = i + P[i];
    }
  }
  
  // Find longest palindrome
  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < n - 1; i++) {
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }
  
  // Extract result from original string
  const start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why preprocess string with special characters?',
        choices: ['Better performance', 'Handle even-length palindromes', 'Prevent out of bounds', 'All of the above'],
        answer: 3,
        explain: 'Preprocessing handles even-length palindromes, prevents bounds issues, and simplifies logic.'
      }
    ],
    practice: {
      funcName: 'manacher',
      starter: `function manacher(s) {
  // TODO: implement Manacher's algorithm
}`,
      constraints: 'String length up to 1000.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: ['babad'], expected: 'bab', n: 5 },
        { input: ['cbbd'], expected: 'bb', n: 4 }
      ]
    }
  });
}

// Graph Algorithms
function makeGraphBFS() {
  return createProblem({
    id: 'graph-bfs',
    title: 'Graph: Breadth-First Search (BFS)',
    difficulty: 'medium',
    brief: 'Implement BFS traversal for graphs to explore nodes level by level.',
    hints: [
      'Use a queue to maintain nodes to visit.',
      'Mark visited nodes to avoid cycles.',
      'Process all neighbors before moving to next level.'
    ],
    learn: {
      intuition: 'BFS explores neighbors first, guaranteeing shortest path in unweighted graphs.',
      visual: 'Level-by-level exploration from source node.',
      pattern: 'Queue-based traversal with visited tracking.',
      template: `// BFS traversal
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    // Visit all unvisited neighbors
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

// BFS shortest path
function bfsShortestPath(graph, start, end) {
  const visited = new Set();
  const queue = [[start, [start]]];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const [node, path] = queue.shift();
    
    if (node === end) {
      return path;
    }
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null; // No path found
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What data structure does BFS use?',
        choices: ['Stack', 'Queue', 'Priority Queue', 'Hash Map'],
        answer: 1,
        explain: 'BFS uses a queue to process nodes in FIFO order, ensuring level-by-level traversal.'
      }
    ],
    practice: {
      funcName: 'bfs',
      starter: `function bfs(graph, start) {
  // TODO: implement BFS traversal
}`,
      constraints: 'Graph with up to 1000 nodes.',
      expectedComplexity: 'O(V + E)',
      tests: [
        { input: [{'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, 'A'], expected: ['A', 'B', 'C', 'D'], n: 4 }
      ]
    }
  });
}

function makeGraphDFS() {
  return createProblem({
    id: 'graph-dfs',
    title: 'Graph: Depth-First Search (DFS)',
    difficulty: 'medium',
    brief: 'Implement DFS traversal for graphs to explore deeply before backtracking.',
    hints: [
      'Use recursion or explicit stack.',
      'Mark visited nodes to avoid infinite cycles.',
      'Explore one path completely before backtracking.'
    ],
    learn: {
      intuition: 'DFS explores as far as possible before backtracking, useful for path finding.',
      visual: 'Deep exploration with backtracking when dead ends reached.',
      pattern: 'Stack-based or recursive traversal with visited tracking.',
      template: `// DFS recursive traversal
function dfsRecursive(graph, start, visited = new Set(), result = []) {
  visited.add(start);
  result.push(start);
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, result);
    }
  }
  
  return result;
}

// DFS iterative traversal
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      // Add neighbors to stack (in reverse order for left-to-right traversal)
      const neighbors = graph[node] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
  
  return result;
}

// DFS path detection
function hasPath(graph, start, end, visited = new Set()) {
  if (start === end) return true;
  if (visited.has(start)) return false;
  
  visited.add(start);
  
  for (const neighbor of graph[start] || []) {
    if (hasPath(graph, neighbor, end, visited)) {
      return true;
    }
  }
  
  return false;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Which traversal goes deeper first?',
        choices: ['BFS', 'DFS', 'Both equally', 'Neither'],
        answer: 1,
        explain: 'DFS (Depth-First Search) explores one path completely before trying alternatives.'
      }
    ],
    practice: {
      funcName: 'dfsRecursive',
      starter: `function dfsRecursive(graph, start, visited = new Set(), result = []) {
  // TODO: implement DFS traversal
}`,
      constraints: 'Graph with up to 1000 nodes.',
      expectedComplexity: 'O(V + E)',
      tests: [
        { input: [{'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}, 'A'], expected: ['A', 'B', 'D', 'C'], n: 4 }
      ]
    }
  });
}

function makeDijkstra() {
  return createProblem({
    id: 'dijkstra',
    title: 'Dijkstra: Shortest Path Algorithm',
    difficulty: 'hard',
    brief: 'Find shortest paths from source to all vertices in weighted graph.',
    hints: [
      'Use priority queue to get minimum distance vertex.',
      'Relax edges to update shorter distances.',
      'Works only with non-negative edge weights.'
    ],
    learn: {
      intuition: 'Greedy approach: always process the closest unvisited vertex.',
      visual: 'Distance table updates as closer paths are discovered.',
      pattern: 'Priority queue with distance relaxation.',
      template: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const previous = {};
  
  // Initialize distances
  for (const vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;
  
  // Priority queue simulation with array
  function getMinUnvisited() {
    let minVertex = null;
    let minDistance = Infinity;
    
    for (const vertex in distances) {
      if (!visited.has(vertex) && distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        minVertex = vertex;
      }
    }
    
    return minVertex;
  }
  
  while (true) {
    const current = getMinUnvisited();
    if (!current) break;
    
    visited.add(current);
    
    // Update distances to neighbors
    for (const neighbor in graph[current] || {}) {
      const weight = graph[current][neighbor];
      const newDistance = distances[current] + weight;
      
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = current;
      }
    }
  }
  
  return { distances, previous };
}

// Get shortest path between two vertices
function getPath(previous, start, end) {
  const path = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Dijkstra\'s algorithm requires what type of edges?',
        choices: ['Any edges', 'Non-negative weights', 'Integer weights only', 'Unweighted edges'],
        answer: 1,
        explain: 'Dijkstra requires non-negative edge weights to guarantee optimal solutions.'
      }
    ],
    practice: {
      funcName: 'dijkstra',
      starter: `function dijkstra(graph, start) {
  // TODO: implement Dijkstra's algorithm
}`,
      constraints: 'Weighted graph with non-negative edges.',
      expectedComplexity: 'O((V + E) log V)',
      tests: [
        { input: [{'A': {'B': 4, 'C': 2}, 'B': {'C': 1, 'D': 5}, 'C': {'D': 8}, 'D': {}}, 'A'], expected: {distances: {'A': 0, 'B': 4, 'C': 2, 'D': 9}}, n: 4 }
      ]
    }
  });
}

function makeBellmanFord() {
  return createProblem({
    id: 'bellman-ford',
    title: 'Bellman-Ford: Single Source Shortest Path',
    difficulty: 'hard',
    brief: 'Find shortest paths and detect negative cycles in weighted graphs.',
    hints: [
      'Relax all edges V-1 times for shortest paths.',
      'One more iteration detects negative cycles.',
      'Works with negative edge weights unlike Dijkstra.'
    ],
    learn: {
      intuition: 'Dynamic programming approach: iteratively improve distance estimates.',
      visual: 'Distance updates over V-1 iterations, then cycle detection.',
      pattern: 'Edge relaxation with negative cycle detection.',
      template: `function bellmanFord(edges, vertices, start) {
  const distances = {};
  const previous = {};
  
  // Initialize distances
  for (const vertex of vertices) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;
  
  // Relax edges V-1 times
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const [from, to, weight] of edges) {
      if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
        distances[to] = distances[from] + weight;
        previous[to] = from;
      }
    }
  }
  
  // Check for negative cycles
  for (const [from, to, weight] of edges) {
    if (distances[from] !== Infinity && distances[from] + weight < distances[to]) {
      throw new Error('Graph contains negative cycle');
    }
  }
  
  return { distances, previous };
}

// Helper to convert adjacency list to edge list
function graphToEdges(graph) {
  const edges = [];
  for (const from in graph) {
    for (const to in graph[from]) {
      edges.push([from, to, graph[from][to]]);
    }
  }
  return edges;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does Bellman-Ford detect that Dijkstra cannot?',
        choices: ['Shortest paths', 'Negative cycles', 'Disconnected graphs', 'Multiple sources'],
        answer: 1,
        explain: 'Bellman-Ford can detect negative cycles, which Dijkstra cannot handle.'
      }
    ],
    practice: {
      funcName: 'bellmanFord',
      starter: `function bellmanFord(edges, vertices, start) {
  // TODO: implement Bellman-Ford algorithm
}`,
      constraints: 'Graph may contain negative weights but no negative cycles.',
      expectedComplexity: 'O(VE)',
      tests: [
        { input: [[['A', 'B', -1], ['A', 'C', 4], ['B', 'C', 3]], ['A', 'B', 'C'], 'A'], expected: {distances: {'A': 0, 'B': -1, 'C': 2}}, n: 3 }
      ]
    }
  });
}

function makeKruskal() {
  return createProblem({
    id: 'kruskal',
    title: 'Kruskal: Minimum Spanning Tree',
    difficulty: 'hard',
    brief: 'Find minimum spanning tree using Kruskal\'s algorithm with Union-Find.',
    hints: [
      'Sort edges by weight in ascending order.',
      'Use Union-Find to detect cycles.',
      'Add edge if it doesn\'t create a cycle.'
    ],
    learn: {
      intuition: 'Greedy approach: always add the cheapest edge that doesn\'t create a cycle.',
      visual: 'Edges sorted by weight, gradually building spanning tree.',
      pattern: 'Edge sorting with Union-Find cycle detection.',
      template: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false; // Already connected
    
    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    
    return true;
  }
}

function kruskal(edges, numVertices) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const mst = [];
  const uf = new UnionFind(numVertices);
  
  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      
      // Stop when we have V-1 edges
      if (mst.length === numVertices - 1) {
        break;
      }
    }
  }
  
  return mst;
}

// Calculate total weight of MST
function getMSTWeight(mst) {
  return mst.reduce((sum, [u, v, weight]) => sum + weight, 0);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'How many edges are in a minimum spanning tree of n vertices?',
        choices: ['n', 'n-1', 'n+1', '2n-1'],
        answer: 1,
        explain: 'A spanning tree of n vertices always has exactly n-1 edges.'
      }
    ],
    practice: {
      funcName: 'kruskal',
      starter: `function kruskal(edges, numVertices) {
  // TODO: implement Kruskal's MST algorithm
}`,
      constraints: 'Connected weighted graph.',
      expectedComplexity: 'O(E log E)',
      tests: [
        { input: [[[0, 1, 10], [0, 2, 6], [1, 2, 5]], 3], expected: [[1, 2, 5], [0, 2, 6]], n: 3 }
      ]
    }
  });
}

function makePrim() {
  return createProblem({
    id: 'prim',
    title: 'Prim: Minimum Spanning Tree',
    difficulty: 'hard',
    brief: 'Find minimum spanning tree using Prim\'s algorithm with priority queue.',
    hints: [
      'Start with arbitrary vertex in MST.',
      'Always add minimum weight edge connecting MST to non-MST vertex.',
      'Use priority queue for efficient minimum edge selection.'
    ],
    learn: {
      intuition: 'Grow MST one vertex at a time by adding cheapest connection.',
      visual: 'MST grows outward from starting vertex, always adding minimum edge.',
      pattern: 'Priority queue with MST vertex tracking.',
      template: `function prim(graph, start) {
  const mst = [];
  const visited = new Set();
  const minHeap = []; // [weight, from, to]
  
  // Helper function to maintain min heap property
  function heapPush(item) {
    minHeap.push(item);
    minHeap.sort((a, b) => a[0] - b[0]); // Simple sort for demonstration
  }
  
  function heapPop() {
    return minHeap.shift();
  }
  
  // Start with arbitrary vertex
  visited.add(start);
  
  // Add all edges from start vertex to heap
  for (const neighbor in graph[start] || {}) {
    heapPush([graph[start][neighbor], start, neighbor]);
  }
  
  while (minHeap.length > 0 && visited.size < Object.keys(graph).length) {
    const [weight, from, to] = heapPop();
    
    // Skip if both vertices already in MST
    if (visited.has(to)) continue;
    
    // Add edge to MST
    mst.push([from, to, weight]);
    visited.add(to);
    
    // Add new edges from the newly added vertex
    for (const neighbor in graph[to] || {}) {
      if (!visited.has(neighbor)) {
        heapPush([graph[to][neighbor], to, neighbor]);
      }
    }
  }
  
  return mst;
}

// Convert edge list to adjacency list for Prim's
function edgeListToAdjList(edges) {
  const graph = {};
  
  for (const [u, v, weight] of edges) {
    if (!graph[u]) graph[u] = {};
    if (!graph[v]) graph[v] = {};
    
    graph[u][v] = weight;
    graph[v][u] = weight; // Undirected graph
  }
  
  return graph;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What\'s the main difference between Kruskal\'s and Prim\'s?',
        choices: ['Time complexity', 'Kruskal uses edges, Prim uses vertices', 'Output format', 'Graph representation'],
        answer: 1,
        explain: 'Kruskal focuses on edges (sorts them), while Prim grows from vertices.'
      }
    ],
    practice: {
      funcName: 'prim',
      starter: `function prim(graph, start) {
  // TODO: implement Prim's MST algorithm
}`,
      constraints: 'Connected weighted graph.',
      expectedComplexity: 'O(E log V)',
      tests: [
        { input: [{'0': {'1': 10, '2': 6}, '1': {'0': 10, '2': 5}, '2': {'0': 6, '1': 5}}, '0'], expected: [['0', '2', 6], ['2', '1', 5]], n: 3 }
      ]
    }
  });
}

function makeTopologicalSort() {
  return createProblem({
    id: 'topological-sort',
    title: 'Topological Sort: DAG Ordering',
    difficulty: 'medium',
    brief: 'Order vertices in directed acyclic graph based on dependencies.',
    hints: [
      'Only possible for directed acyclic graphs (DAGs).',
      'Use DFS with finish times or Kahn\'s algorithm.',
      'Multiple valid topological orderings may exist.'
    ],
    learn: {
      intuition: 'Linear ordering where each directed edge goes from earlier to later vertex.',
      visual: 'DAG flattened into linear sequence respecting all edge directions.',
      pattern: 'DFS-based or in-degree based sorting.',
      template: `// DFS-based topological sort
function topologicalSortDFS(graph) {
  const visited = new Set();
  const stack = [];
  
  function dfs(node) {
    visited.add(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    
    stack.push(node); // Add to stack after visiting all descendants
  }
  
  // Visit all vertices
  for (const vertex in graph) {
    if (!visited.has(vertex)) {
      dfs(vertex);
    }
  }
  
  return stack.reverse(); // Reverse to get correct order
}

// Kahn's algorithm (BFS-based)
function topologicalSortKahn(graph) {
  const inDegree = {};
  const result = [];
  const queue = [];
  
  // Initialize in-degrees
  for (const vertex in graph) {
    inDegree[vertex] = 0;
  }
  
  // Calculate in-degrees
  for (const vertex in graph) {
    for (const neighbor of graph[vertex] || []) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }
  
  // Find vertices with no incoming edges
  for (const vertex in inDegree) {
    if (inDegree[vertex] === 0) {
      queue.push(vertex);
    }
  }
  
  // Process vertices
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);
    
    // Reduce in-degree of neighbors
    for (const neighbor of graph[current] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // Check if graph has cycle
  if (result.length !== Object.keys(graph).length) {
    throw new Error('Graph has cycle - topological sort not possible');
  }
  
  return result;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Topological sort is possible for which type of graphs?',
        choices: ['Any graph', 'Undirected graphs', 'Directed acyclic graphs', 'Connected graphs only'],
        answer: 2,
        explain: 'Topological sort is only possible for directed acyclic graphs (DAGs).'
      }
    ],
    practice: {
      funcName: 'topologicalSortKahn',
      starter: `function topologicalSortKahn(graph) {
  // TODO: implement topological sort using Kahn's algorithm
}`,
      constraints: 'Directed acyclic graph.',
      expectedComplexity: 'O(V + E)',
      tests: [
        { input: [{'A': ['C'], 'B': ['C', 'D'], 'C': ['E'], 'D': ['F'], 'E': ['F'], 'F': []}], expected: ['A', 'B', 'C', 'D', 'E', 'F'], n: 6 }
      ]
    }
  });
}

function makeStronglyConnectedComponents() {
  return createProblem({
    id: 'strongly-connected-components',
    title: 'Strongly Connected Components (Kosaraju)',
    difficulty: 'hard',
    brief: 'Find strongly connected components in directed graph using Kosaraju\'s algorithm.',
    hints: [
      'Two-pass algorithm: DFS on original graph, then on transpose.',
      'First pass determines finishing order.',
      'Second pass on transpose graph finds SCCs.'
    ],
    learn: {
      intuition: 'Vertices that can reach each other through directed paths form SCCs.',
      visual: 'Groups of vertices with bidirectional reachability.',
      pattern: 'Two-pass DFS with graph transpose.',
      template: `function stronglyConnectedComponents(graph) {
  const visited = new Set();
  const stack = [];
  const sccs = [];
  
  // First DFS to fill stack with finish times
  function dfs1(node) {
    visited.add(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfs1(neighbor);
      }
    }
    
    stack.push(node);
  }
  
  // Create transpose graph
  function createTranspose(graph) {
    const transpose = {};
    
    // Initialize all vertices
    for (const vertex in graph) {
      transpose[vertex] = [];
    }
    
    // Reverse all edges
    for (const vertex in graph) {
      for (const neighbor of graph[vertex] || []) {
        if (!transpose[neighbor]) transpose[neighbor] = [];
        transpose[neighbor].push(vertex);
      }
    }
    
    return transpose;
  }
  
  // Second DFS on transpose to find SCCs
  function dfs2(node, transpose, component) {
    visited.add(node);
    component.push(node);
    
    for (const neighbor of transpose[node] || []) {
      if (!visited.has(neighbor)) {
        dfs2(neighbor, transpose, component);
      }
    }
  }
  
  // Step 1: Fill stack with finish times
  for (const vertex in graph) {
    if (!visited.has(vertex)) {
      dfs1(vertex);
    }
  }
  
  // Step 2: Create transpose and reset visited
  const transpose = createTranspose(graph);
  visited.clear();
  
  // Step 3: Process vertices in reverse finish order
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (!visited.has(vertex)) {
      const component = [];
      dfs2(vertex, transpose, component);
      sccs.push(component);
    }
  }
  
  return sccs;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does Kosaraju\'s algorithm use in its second pass?',
        choices: ['Original graph', 'Transpose graph', 'Undirected version', 'Minimum spanning tree'],
        answer: 1,
        explain: 'Kosaraju\'s second pass uses the transpose (reverse) graph to identify SCCs.'
      }
    ],
    practice: {
      funcName: 'stronglyConnectedComponents',
      starter: `function stronglyConnectedComponents(graph) {
  // TODO: implement Kosaraju's algorithm for SCCs
}`,
      constraints: 'Directed graph.',
      expectedComplexity: 'O(V + E)',
      tests: [
        { input: [{'A': ['B'], 'B': ['C'], 'C': ['A'], 'D': ['B', 'C'], 'E': ['D']}], expected: [['A', 'C', 'B'], ['D'], ['E']], n: 5 }
      ]
    }
  });
}

function makeSuffixArray() {
  return createProblem({
    id: 'suffix-array',
    title: 'Suffix Array: Construction',
    difficulty: 'hard',
    brief: 'Implement suffix array construction for string processing.',
    hints: [
      'Suffix array contains starting indices of all suffixes in lexicographical order.',
      'Use efficient sorting with radix sort or suffix tree.',
      'Applications: pattern matching, longest common prefix.'
    ],
    learn: {
      intuition: 'Sorted order of all suffixes enables efficient string queries.',
      visual: 'Array of suffix starting positions in sorted order.',
      pattern: 'Suffix sorting with efficient comparison techniques.',
      template: `// Simple O(n²log n) implementation
function buildSuffixArray(s) {
  const n = s.length;
  const suffixes = [];
  
  // Generate all suffixes with their starting indices
  for (let i = 0; i < n; i++) {
    suffixes.push({
      index: i,
      suffix: s.substring(i)
    });
  }
  
  // Sort suffixes lexicographically
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
  
  // Extract indices
  return suffixes.map(s => s.index);
}

// More efficient O(n log n) implementation using radix sort
function buildSuffixArrayOptimized(s) {
  const n = s.length;
  let suffixArray = Array.from({length: n}, (_, i) => i);
  let rank = new Array(n);
  let tempRank = new Array(n);
  
  // Initial ranking based on first character
  for (let i = 0; i < n; i++) {
    rank[i] = s.charCodeAt(i);
  }
  
  // Build suffix array using doubling technique
  for (let k = 1; k < n; k <<= 1) {
    // Sort by second half, then by first half
    suffixArray.sort((a, b) => {
      if (rank[a] !== rank[b]) {
        return rank[a] - rank[b];
      }
      const rankA = a + k < n ? rank[a + k] : -1;
      const rankB = b + k < n ? rank[b + k] : -1;
      return rankA - rankB;
    });
    
    // Update ranks
    tempRank[suffixArray[0]] = 0;
    for (let i = 1; i < n; i++) {
      const curr = suffixArray[i];
      const prev = suffixArray[i - 1];
      
      if (rank[curr] === rank[prev] && 
          (curr + k >= n ? -1 : rank[curr + k]) === 
          (prev + k >= n ? -1 : rank[prev + k])) {
        tempRank[curr] = tempRank[prev];
      } else {
        tempRank[curr] = i;
      }
    }
    
    [rank, tempRank] = [tempRank, rank];
  }
  
  return suffixArray;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What does suffix array enable efficiently?',
        choices: ['Pattern matching', 'LCP queries', 'Substring searches', 'All of the above'],
        answer: 3,
        explain: 'Suffix array enables efficient pattern matching, LCP computation, and various substring operations.'
      }
    ],
    practice: {
      funcName: 'buildSuffixArray',
      starter: `function buildSuffixArray(s) {
  // TODO: implement suffix array construction
}`,
      constraints: 'String length up to 1000.',
      expectedComplexity: 'O(n log n)',
      tests: [
        { input: ['banana'], expected: [5, 3, 1, 0, 4, 2], n: 6 }
      ]
    }
  });
}

function makeLongestPalindrome() {
  return createProblem({
    id: 'longest-palindrome',
    title: 'String: Longest Palindromic Substring',
    difficulty: 'medium',
    brief: 'Find longest palindromic substring using expand around centers.',
    hints: [
      'Try each position as potential palindrome center.',
      'Handle both odd and even length palindromes.',
      'Expand around center while characters match.'
    ],
    learn: {
      intuition: 'Check all possible centers and expand while characters match.',
      visual: 'String with centers marked and palindromes expanding outward.',
      pattern: 'Center expansion with odd/even length handling.',
      template: `function longestPalindrome(s) {
  if (!s || s.length < 2) return s;
  
  let start = 0;
  let maxLength = 1;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    // Check for odd length palindromes
    expandAroundCenter(i, i);
    
    // Check for even length palindromes
    expandAroundCenter(i, i + 1);
  }
  
  return s.substring(start, start + maxLength);
}

// Alternative: Dynamic Programming approach
function longestPalindromeDP(s) {
  const n = s.length;
  if (n === 0) return '';
  
  const dp = Array.from({length: n}, () => new Array(n).fill(false));
  let start = 0;
  let maxLength = 1;
  
  // All single characters are palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }
  
  // Check for palindromes of length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }
  
  // Check for palindromes of length 3 and more
  for (let length = 3; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;
      
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        start = i;
        maxLength = length;
      }
    }
  }
  
  return s.substring(start, start + maxLength);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'How many centers do we need to check for n-length string?',
        choices: ['n', '2n-1', 'n²', 'n/2'],
        answer: 1,
        explain: 'We check n centers for odd-length and n-1 centers for even-length palindromes: 2n-1 total.'
      }
    ],
    practice: {
      funcName: 'longestPalindrome',
      starter: `function longestPalindrome(s) {
  // TODO: implement longest palindromic substring
}`,
      constraints: 'String length up to 1000.',
      expectedComplexity: 'O(n²)',
      tests: [
        { input: ['babad'], expected: 'bab', n: 5 },
        { input: ['cbbd'], expected: 'bb', n: 4 }
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

// Additional Searching Algorithms
function makeLinearSearch() {
  return createProblem({
    id: 'linear-search',
    title: 'Linear Search',
    difficulty: 'easy',
    brief: 'Sequential search through unsorted data.',
    hints: [
      'Check each element one by one.',
      'Stop when element is found.',
      'Return -1 if not found.'
    ],
    learn: {
      intuition: 'Simple sequential scan through all elements.',
      visual: 'Arrow moving through array elements left to right.',
      pattern: 'Sequential iteration with early termination.',
      template: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Time complexity of linear search?',
        choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explain: 'Must check each element in worst case.'
      }
    ],
    practice: {
      funcName: 'linearSearch',
      starter: `function linearSearch(arr, target) {
  // TODO: implement linear search
}`,
      constraints: 'Any array; O(n) time.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[3, 1, 4, 1, 5], 4], expected: 2, n: 5 },
        { input: [[2, 7, 1, 8], 9], expected: -1, n: 4 }
      ]
    },
    game: { type: 'linear-search-visual' }
  });
}

// Sorting Algorithms
function makeBubbleSort() {
  return createProblem({
    id: 'bubble-sort',
    title: 'Bubble Sort',
    difficulty: 'easy',
    brief: 'Compare adjacent elements and swap if needed.',
    hints: [
      'Largest element "bubbles" to the end each pass.',
      'Optimize: stop if no swaps in a pass.',
      'After i passes, last i elements are sorted.'
    ],
    learn: {
      intuition: 'Repeatedly swap adjacent elements until sorted.',
      visual: 'Large elements bubble up like bubbles in water.',
      pattern: 'Nested loops with adjacent comparisons.',
      template: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Best case time complexity of bubble sort?',
        choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        answer: 0,
        explain: 'O(n) when array is already sorted (with optimization).'
      }
    ],
    practice: {
      funcName: 'bubbleSort',
      starter: `function bubbleSort(arr) {
  // TODO: implement bubble sort
}`,
      constraints: 'In-place sorting; O(n²) time.',
      expectedComplexity: 'O(n²)',
      tests: [
        { input: [[3, 1, 4, 1, 5]], expected: [1, 1, 3, 4, 5], n: 5 },
        { input: [[5, 2, 8, 1]], expected: [1, 2, 5, 8], n: 4 }
      ]
    },
    game: { type: 'bubble-sort-visual' }
  });
}

function makeSelectionSort() {
  return createProblem({
    id: 'selection-sort',
    title: 'Selection Sort',
    difficulty: 'easy',
    brief: 'Find minimum element and swap to front.',
    hints: [
      'Find minimum in unsorted portion.',
      'Swap with first unsorted element.',
      'Sorted portion grows from left.'
    ],
    learn: {
      intuition: 'Select the minimum and place it at the beginning.',
      visual: 'Divide array into sorted (left) and unsorted (right) portions.',
      pattern: 'Find minimum in remaining array, swap to position.',
      template: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'How many swaps does selection sort make?',
        choices: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'],
        answer: 1,
        explain: 'At most n-1 swaps, one per iteration.'
      }
    ],
    game: { type: 'selection-sort-visual' }
  });
}

function makeInsertionSort() {
  return createProblem({
    id: 'insertion-sort',
    title: 'Insertion Sort',
    difficulty: 'easy',
    brief: 'Build sorted array one element at a time.',
    hints: [
      'Insert each element into its correct position.',
      'Shift elements right to make space.',
      'Efficient for nearly sorted arrays.'
    ],
    learn: {
      intuition: 'Like sorting playing cards in your hand.',
      visual: 'Insert current element into sorted portion on left.',
      pattern: 'Shift elements right until correct position found.',
      template: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Best use case for insertion sort?',
        choices: ['Large arrays', 'Random data', 'Nearly sorted data', 'Reverse sorted'],
        answer: 2,
        explain: 'O(n) time for nearly sorted arrays.'
      }
    ],
    game: { type: 'insertion-sort-visual' }
  });
}

function makeMergeSort() {
  return createProblem({
    id: 'merge-sort',
    title: 'Merge Sort',
    difficulty: 'medium',
    brief: 'Divide-and-conquer sorting with guaranteed O(n log n).',
    hints: [
      'Divide array into halves recursively.',
      'Merge sorted halves into single sorted array.',
      'Stable sort: maintains relative order of equal elements.'
    ],
    learn: {
      intuition: 'Divide into smaller problems, merge sorted results.',
      visual: 'Tree of recursive splits, then merge back up.',
      pattern: 'Recursive divide + merge with two pointers.',
      template: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Space complexity of merge sort?',
        choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explain: 'Requires O(n) auxiliary space for merging.'
      }
    ],
    practice: {
      funcName: 'mergeSort',
      starter: `function mergeSort(arr) {
  // TODO: implement merge sort
}`,
      constraints: 'Divide and conquer; O(n log n) time.',
      expectedComplexity: 'O(n log n)',
      tests: [
        { input: [[3, 1, 4, 1, 5]], expected: [1, 1, 3, 4, 5], n: 5 },
        { input: [[5, 2, 8, 1, 9]], expected: [1, 2, 5, 8, 9], n: 5 }
      ]
    },
    game: { type: 'merge-sort-visual' }
  });
}

function makeQuickSort() {
  return createProblem({
    id: 'quick-sort',
    title: 'Quick Sort',
    difficulty: 'medium',
    brief: 'Efficient in-place sorting using partitioning.',
    hints: [
      'Choose pivot, partition array around it.',
      'Elements < pivot go left, > pivot go right.',
      'Recursively sort left and right partitions.'
    ],
    learn: {
      intuition: 'Partition around pivot, then recursively sort partitions.',
      visual: 'Pivot divides array, elements swap to correct sides.',
      pattern: 'Partition + recursive calls on subarrays.',
      template: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Worst case time complexity of quick sort?',
        choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        answer: 2,
        explain: 'O(n²) when pivot is always minimum or maximum.'
      }
    ],
    game: { type: 'quick-sort-visual' }
  });
}

function makeHeapSort() {
  return createProblem({
    id: 'heap-sort',
    title: 'Heap Sort',
    difficulty: 'medium-hard',
    brief: 'Sort using heap data structure properties.',
    hints: [
      'Build max heap from array.',
      'Repeatedly extract max and restore heap.',
      'In-place with O(n log n) guaranteed.'
    ],
    learn: {
      intuition: 'Use heap to efficiently find and remove maximum.',
      visual: 'Build heap tree, extract root repeatedly.',
      pattern: 'Heapify + repeated extraction.',
      template: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What makes heap sort better than quick sort in worst case?',
        choices: ['Faster average', 'O(n log n) guaranteed', 'Less memory', 'Simpler code'],
        answer: 1,
        explain: 'Heap sort guarantees O(n log n) even in worst case.'
      }
    ],
    game: { type: 'heap-sort-visual' }
  });
}

function makeRadixSort() {
  return createProblem({
    id: 'radix-sort',
    title: 'Radix Sort',
    difficulty: 'medium-hard',
    brief: 'Non-comparative integer sorting algorithm.',
    hints: [
      'Sort by each digit position.',
      'Use counting sort for each digit.',
      'Works from least to most significant digit.'
    ],
    learn: {
      intuition: 'Sort numbers digit by digit, preserving order.',
      visual: 'Numbers redistribute into buckets by current digit.',
      pattern: 'Multiple passes of stable sorting by digit.',
      template: `function radixSort(arr) {
  const max = Math.max(...arr);
  const maxDigits = Math.floor(Math.log10(max)) + 1;
  
  let exp = 1;
  for (let i = 0; i < maxDigits; i++) {
    countingSortByDigit(arr, exp);
    exp *= 10;
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy output to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Time complexity of radix sort for n numbers with d digits?',
        choices: ['O(n²)', 'O(n log n)', 'O(d × n)', 'O(d²)'],
        answer: 2,
        explain: 'O(d × n) where d is number of digits.'
      }
    ],
    game: { type: 'radix-sort-visual' }
  });
}

function makeTimSort() {
  return createProblem({
    id: 'tim-sort',
    title: 'Tim Sort',
    difficulty: 'hard',
    brief: 'Hybrid stable sort used in Python and Java.',
    hints: [
      'Combines merge sort and insertion sort.',
      'Finds existing runs in the data.',
      'Optimized for real-world data patterns.'
    ],
    learn: {
      intuition: 'Exploit existing order, use best algorithm for each part.',
      visual: 'Identify runs, merge them intelligently.',
      pattern: 'Find runs + insertion sort small runs + merge.',
      template: `function timSort(arr) {
  const MIN_MERGE = 32;
  const n = arr.length;
  
  // Sort individual runs using insertion sort
  for (let start = 0; start < n; start += MIN_MERGE) {
    const end = Math.min(start + MIN_MERGE - 1, n - 1);
    insertionSortRange(arr, start, end);
  }
  
  // Merge the sorted runs
  let size = MIN_MERGE;
  while (size < n) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);
      
      if (mid < end) {
        mergeRange(arr, start, mid, end);
      }
    }
    size *= 2;
  }
  
  return arr;
}

function insertionSortRange(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

function mergeRange(arr, left, mid, right) {
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) {
      arr[k++] = leftPart[i++];
    } else {
      arr[k++] = rightPart[j++];
    }
  }
  
  while (i < leftPart.length) {
    arr[k++] = leftPart[i++];
  }
  
  while (j < rightPart.length) {
    arr[k++] = rightPart[j++];
  }
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why is Tim Sort preferred for real-world data?',
        choices: ['Simplest code', 'Adapts to data patterns', 'Uses less memory', 'Fastest worst case'],
        answer: 1,
        explain: 'Tim Sort adapts to existing order in data, performing better on real-world datasets.'
      }
    ],
    game: { type: 'tim-sort-visual' }
  });
}

function makeTreeSort() {
  return createProblem({
    id: 'tree-sort',
    title: 'Tree Sort (BST Sort)',
    difficulty: 'medium',
    brief: 'Sort using binary search tree properties.',
    hints: [
      'Insert all elements into BST.',
      'In-order traversal gives sorted order.',
      'Balanced tree gives O(n log n) time.'
    ],
    learn: {
      intuition: 'BST property ensures in-order traversal is sorted.',
      visual: 'Build BST, then traverse in-order.',
      pattern: 'Build tree + in-order traversal.',
      template: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function treeSort(arr) {
  if (arr.length === 0) return arr;
  
  let root = null;
  
  // Build BST
  for (const num of arr) {
    root = insert(root, num);
  }
  
  // In-order traversal
  const result = [];
  inorder(root, result);
  return result;
}

function insert(root, val) {
  if (!root) return new TreeNode(val);
  
  if (val <= root.val) {
    root.left = insert(root.left, val);
  } else {
    root.right = insert(root.right, val);
  }
  
  return root;
}

function inorder(root, result) {
  if (!root) return;
  
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Worst case complexity of tree sort?',
        choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        answer: 2,
        explain: 'O(n²) when tree becomes skewed (unbalanced).'
      }
    ],
    game: { type: 'tree-sort-visual' }
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

// Fibonacci - Memoization vs Tabulation
function makeFibonacci() {
  return createProblem({
    id: 'fibonacci-dp',
    title: 'DP: Fibonacci (Memoization vs Tabulation)',
    difficulty: 'easy',
    brief: 'Compare top-down memoization with bottom-up tabulation.',
    game: { type: 'fibonacci-visual' },
    hints: [
      'Top-down: recursive with memoization cache.',
      'Bottom-up: iterative building from base cases.',
      'Both achieve O(n) time and space complexity.'
    ],
    learn: {
      intuition: 'Classic example showing two DP approaches: memoization (top-down) vs tabulation (bottom-up).',
      visual: 'Recursion tree vs iterative array filling.',
      pattern: 'Transform recursive solution with cache or build iteratively.',
      template: `// Memoization (Top-Down)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-Up)
function fibTab(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space Optimized
function fibOptimal(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Which approach is generally preferred for DP?',
        choices: ['Memoization', 'Tabulation', 'Both equal', 'Depends on problem'],
        answer: 3,
        explain: 'Tabulation is often preferred for its iterative nature and guaranteed computation order, but memoization can be more intuitive for some problems.'
      }
    ],
    practice: {
      funcName: 'fibonacci',
      starter: `function fibonacci(n) {
  // TODO: implement using memoization or tabulation
}`,
      constraints: 'n up to 50.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [0], expected: 0, n: 1 },
        { input: [1], expected: 1, n: 1 },
        { input: [5], expected: 5, n: 5 },
        { input: [10], expected: 55, n: 10 }
      ]
    }
  });
}

// House Robber
function makeHouseRobber() {
  return createProblem({
    id: 'house-robber',
    title: 'DP: House Robber',
    difficulty: 'medium',
    brief: 'Maximum money without robbing adjacent houses.',
    game: { type: 'house-robber-visual' },
    hints: [
      'For each house: rob it (skip previous) or skip it (take previous max).',
      'State: dp[i] = max money from houses 0..i.',
      'Transition: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).'
    ],
    learn: {
      intuition: 'At each house, decide whether to rob or skip based on maximum profit.',
      visual: 'Array of houses with cumulative max values.',
      pattern: 'Linear DP with choice: take current + non-adjacent or skip current.',
      template: `// Memoization approach
function robMemo(nums, i = 0, memo = {}) {
  if (i >= nums.length) return 0;
  if (i in memo) return memo[i];
  
  // Choice: rob current house or skip it
  const rob = nums[i] + robMemo(nums, i + 2, memo);
  const skip = robMemo(nums, i + 1, memo);
  
  memo[i] = Math.max(rob, skip);
  return memo[i];
}

// Tabulation approach
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  
  return dp[nums.length - 1];
}

// Space optimized
function robOptimal(nums) {
  if (nums.length === 0) return 0;
  
  let prev2 = 0, prev1 = 0;
  
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is the key insight for this problem?',
        choices: ['Greedy selection', 'Binary search', 'Choice at each step', 'Graph traversal'],
        answer: 2,
        explain: 'At each house, we have a choice: rob it (and skip adjacent) or skip it.'
      }
    ],
    practice: {
      funcName: 'rob',
      starter: `function rob(nums) {
  // TODO: implement house robber solution
}`,
      constraints: 'Array length up to 100.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[1, 2, 3, 1]], expected: 4, n: 4 },
        { input: [[2, 7, 9, 3, 1]], expected: 12, n: 5 },
        { input: [[5]], expected: 5, n: 1 }
      ]
    }
  });
}

// Climbing Stairs
function makeClimbingStairs() {
  return createProblem({
    id: 'climbing-stairs',
    title: 'DP: Climbing Stairs',
    difficulty: 'easy',
    brief: 'Number of ways to climb n stairs taking 1 or 2 steps.',
    game: { type: 'climbing-stairs-visual' },
    hints: [
      'Ways to reach step i = ways to reach step i-1 + ways to reach step i-2.',
      'Base cases: ways[0] = 1, ways[1] = 1.',
      'This is essentially Fibonacci sequence!'
    ],
    learn: {
      intuition: 'To reach step n, you can come from step n-1 or n-2.',
      visual: 'Staircase with cumulative ways marked at each step.',
      pattern: 'Linear recurrence similar to Fibonacci.',
      template: `// Memoization
function climbStairsMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return 1;
  
  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}

// Tabulation
function climbStairs(n) {
  if (n <= 1) return 1;
  
  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space optimized
function climbStairsOptimal(n) {
  if (n <= 1) return 1;
  
  let prev2 = 1, prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'How many ways to climb 4 stairs?',
        choices: ['3', '5', '8', '13'],
        answer: 1,
        explain: 'Ways: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2 = 5 ways.'
      }
    ],
    practice: {
      funcName: 'climbStairs',
      starter: `function climbStairs(n) {
  // TODO: implement climbing stairs solution
}`,
      constraints: 'n up to 45.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [2], expected: 2, n: 2 },
        { input: [3], expected: 3, n: 3 },
        { input: [4], expected: 5, n: 4 }
      ]
    }
  });
}

// 0/1 Knapsack
function makeKnapsack() {
  return createProblem({
    id: 'knapsack',
    title: 'DP: 0/1 Knapsack',
    difficulty: 'medium-hard',
    brief: 'Maximum value with weight constraint, each item used once.',
    game: { type: 'knapsack-visual' },
    hints: [
      '2D DP: dp[i][w] = max value using first i items with weight limit w.',
      'Choice: include item i (if weight allows) or exclude it.',
      'Transition: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]).'
    ],
    learn: {
      intuition: 'For each item and weight limit, decide whether to include the item.',
      visual: '2D table where rows are items and columns are weight limits.',
      pattern: 'Classic 2D DP with item inclusion/exclusion choice.',
      template: `// Memoization approach
function knapsackMemo(weights, values, capacity, i = 0, memo = new Map()) {
  if (i >= weights.length || capacity === 0) return 0;
  
  const key = \`\${i},\${capacity}\`;
  if (memo.has(key)) return memo.get(key);
  
  // Choice 1: exclude current item
  let maxValue = knapsackMemo(weights, values, capacity, i + 1, memo);
  
  // Choice 2: include current item (if it fits)
  if (weights[i] <= capacity) {
    const includeValue = values[i] + knapsackMemo(weights, values, capacity - weights[i], i + 1, memo);
    maxValue = Math.max(maxValue, includeValue);
  }
  
  memo.set(key, maxValue);
  return maxValue;
}

// Tabulation approach
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Don't include current item
      dp[i][w] = dp[i - 1][w];
      
      // Include current item if it fits
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  
  return dp[n][capacity];
}

// Space optimized (1D array)
function knapsackOptimal(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    // Process from right to left to avoid using updated values
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why process weights from right to left in space-optimized version?',
        choices: ['Performance', 'Avoid using updated values', 'Memory access', 'Random choice'],
        answer: 1,
        explain: 'Processing right to left ensures we use values from the previous iteration, not current.'
      }
    ],
    practice: {
      funcName: 'knapsack',
      starter: `function knapsack(weights, values, capacity) {
  // TODO: implement 0/1 knapsack solution
}`,
      constraints: 'Items up to 100, capacity up to 1000.',
      expectedComplexity: 'O(n*capacity)',
      tests: [
        { input: [[2, 3, 4, 5], [1, 4, 5, 7], 5], expected: 9, n: 4 },
        { input: [[1, 2, 3], [6, 10, 12], 5], expected: 22, n: 3 }
      ]
    }
  });
}

// Longest Common Subsequence
function makeLCS() {
  return createProblem({
    id: 'lcs',
    title: 'DP: Longest Common Subsequence',
    difficulty: 'medium',
    brief: 'Find length of longest common subsequence between two strings.',
    game: { type: 'lcs-visual' },
    hints: [
      'If characters match: LCS[i][j] = 1 + LCS[i-1][j-1].',
      'If they don\'t match: LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1]).',
      'Base case: empty string has LCS of 0.'
    ],
    learn: {
      intuition: 'Match characters when possible, otherwise try excluding from either string.',
      visual: '2D table where diagonal movement indicates character match.',
      pattern: 'Classic 2D string DP with character matching.',
      template: `// Memoization approach
function lcsMemo(text1, text2, i = 0, j = 0, memo = new Map()) {
  if (i >= text1.length || j >= text2.length) return 0;
  
  const key = \`\${i},\${j}\`;
  if (memo.has(key)) return memo.get(key);
  
  let result;
  if (text1[i] === text2[j]) {
    // Characters match, move both pointers
    result = 1 + lcsMemo(text1, text2, i + 1, j + 1, memo);
  } else {
    // Try skipping character from either string
    result = Math.max(
      lcsMemo(text1, text2, i + 1, j, memo),
      lcsMemo(text1, text2, i, j + 1, memo)
    );
  }
  
  memo.set(key, result);
  return result;
}

// Tabulation approach
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}

// Space optimized
function lcsOptimal(text1, text2) {
  const m = text1.length, n = text2.length;
  
  // Use only two rows
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = 1 + prev[j - 1];
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev]; // Swap arrays
  }
  
  return prev[n];
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'What is LCS of "ABCDGH" and "AEDFHR"?',
        choices: ['2', '3', '4', '5'],
        answer: 1,
        explain: 'LCS is "ADH" with length 3.'
      }
    ],
    practice: {
      funcName: 'longestCommonSubsequence',
      starter: `function longestCommonSubsequence(text1, text2) {
  // TODO: implement LCS solution
}`,
      constraints: 'String length up to 1000.',
      expectedComplexity: 'O(m*n)',
      tests: [
        { input: ["abcde", "ace"], expected: 3, n: 5 },
        { input: ["abc", "abc"], expected: 3, n: 3 },
        { input: ["abc", "def"], expected: 0, n: 3 }
      ]
    }
  });
}

// Edit Distance (Levenshtein Distance)
function makeEditDistance() {
  return createProblem({
    id: 'edit-distance',
    title: 'DP: Edit Distance (Levenshtein)',
    difficulty: 'hard',
    brief: 'Minimum operations to convert one string to another.',
    game: { type: 'edit-distance-visual' },
    hints: [
      'Operations: insert, delete, replace character.',
      'If characters match: no operation needed.',
      'If different: try all three operations, take minimum.'
    ],
    learn: {
      intuition: 'Transform one string to another with minimum edit operations.',
      visual: '2D table showing minimum operations for each substring pair.',
      pattern: 'String DP with multiple operation choices.',
      template: `// Memoization approach
function editDistanceMemo(word1, word2, i = 0, j = 0, memo = new Map()) {
  // Base cases
  if (i >= word1.length) return word2.length - j; // Insert remaining
  if (j >= word2.length) return word1.length - i; // Delete remaining
  
  const key = \`\${i},\${j}\`;
  if (memo.has(key)) return memo.get(key);
  
  let result;
  if (word1[i] === word2[j]) {
    // Characters match, no operation needed
    result = editDistanceMemo(word1, word2, i + 1, j + 1, memo);
  } else {
    // Try all three operations
    const insertOp = 1 + editDistanceMemo(word1, word2, i, j + 1, memo);
    const deleteOp = 1 + editDistanceMemo(word1, word2, i + 1, j, memo);
    const replaceOp = 1 + editDistanceMemo(word1, word2, i + 1, j + 1, memo);
    
    result = Math.min(insertOp, deleteOp, replaceOp);
  }
  
  memo.set(key, result);
  return result;
}

// Tabulation approach
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Base cases: converting empty string
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }
  
  return dp[m][n];
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Edit distance between "cat" and "bat"?',
        choices: ['1', '2', '3', '4'],
        answer: 0,
        explain: 'Replace c with b: 1 operation.'
      }
    ],
    practice: {
      funcName: 'minDistance',
      starter: `function minDistance(word1, word2) {
  // TODO: implement edit distance solution
}`,
      constraints: 'String length up to 500.',
      expectedComplexity: 'O(m*n)',
      tests: [
        { input: ["horse", "ros"], expected: 3, n: 5 },
        { input: ["intention", "execution"], expected: 5, n: 9 }
      ]
    }
  });
}

// Maximum Subarray (Kadane's Algorithm)
function makeMaxSubarray() {
  return createProblem({
    id: 'max-subarray',
    title: 'DP: Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'medium',
    brief: 'Find contiguous subarray with maximum sum.',
    game: { type: 'max-subarray-visual' },
    hints: [
      'At each position: extend current subarray or start new one.',
      'Keep track of maximum sum seen so far.',
      'Negative sum? Better to start fresh.'
    ],
    learn: {
      intuition: 'Decide at each position whether to extend or restart the subarray.',
      visual: 'Running sum with resets when it becomes negative.',
      pattern: 'Linear DP with local vs global maximum.',
      template: `// Classic Kadane's Algorithm
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    // Either extend current subarray or start new one
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    
    // Update global maximum
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

// DP interpretation
function maxSubArrayDP(nums) {
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let maxSum = dp[0];
  
  for (let i = 1; i < nums.length; i++) {
    // dp[i] = max sum ending at position i
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }
  
  return maxSum;
}

// With indices tracking
function maxSubArrayWithIndices(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  let start = 0, end = 0, tempStart = 0;
  
  for (let i = 1; i < nums.length; i++) {
    if (currentSum < 0) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }
    
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }
  
  return { maxSum, start, end };
}`
    },
    quiz: [
      {
        type: 'mc',
        prompt: 'Why does Kadane\'s algorithm work?',
        choices: ['Greedy choice', 'Optimal substructure', 'Binary search', 'Divide and conquer'],
        answer: 1,
        explain: 'Maximum subarray ending at position i depends on optimal solution at i-1.'
      }
    ],
    practice: {
      funcName: 'maxSubArray',
      starter: `function maxSubArray(nums) {
  // TODO: implement Kadane's algorithm
}`,
      constraints: 'Array length up to 10^5.',
      expectedComplexity: 'O(n)',
      tests: [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, n: 9 },
        { input: [[1]], expected: 1, n: 1 },
        { input: [[5, 4, -1, 7, 8]], expected: 23, n: 5 }
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


// Export all content creators
const contentCreators = {
  // Arrays & Two Pointers
  makeArrayTwoSum,
  makeSlidingWindow,
  makeThreeSum,
  makeTwoPointersPalindrome,
  makeContainerMostWater,
  makeRemoveDuplicates,
  makeMergeSortedArrays,
  makePartitionArray,
  makeMoveZeros,
  makeMaxSubarrayLen,
  
  // Hash Maps & Sets
  makeHashMapBasics,
  makeHashSetOperations,
  makeGroupAnagrams,
  makeTopKFrequent,
  makeSubarraySum,
  makeLongestConsecutive,
  makeIsomorphicStrings,
  makeWordPattern,
  
  // Linked Lists
  makeLinkedListBasics,
  makeReverseLinkedList,
  makeMergeTwoLists,
  makeRemoveNthNode,
  makeLinkedListCycle,
  makeIntersectionTwoLists,
  makePalindromeLinkedList,
  makeRotateList,
  
  // Trees & BST
  makeBinaryTreeBasics,
  makeBSTOperations,
  makeTreeTraversals,
  makeValidateBST,
  makeLowestCommonAncestor,
  makeMaxDepth,
  makeBalancedTree,
  makePathSum,
  
  // Advanced Trees
  makeAVLTree,
  makeRedBlackTree,
  makeTrie,
  makeSegmentTree,
  makeFenwickTree,
  
  // String Algorithms
  makeStringBasics,
  makeKMPAlgorithm,
  makeRabinKarp,
  makeBoyerMoore,
  makeZAlgorithm,
  makeManacher,
  makeSuffixArray,
  makeLongestPalindrome,
  
  // Searching & Sorting
  makeLinearSearch,
  makeBinarySearch,
  makeBubbleSort,
  makeSelectionSort,
  makeInsertionSort,
  makeMergeSort,
  makeQuickSort,
  makeHeapSort,
  makeRadixSort,
  makeTimSort,
  makeTreeSort,
  
  // Dynamic Programming
  makeCoinChange,
  makeLIS,
  makeFibonacci,
  makeHouseRobber,
  makeClimbingStairs,
  makeKnapsack,
  makeLCS,
  makeEditDistance,
  makeMaxSubarray,
  
  // Graphs
  makeGraphBFS,
  makeGraphDFS,
  makeDijkstra,
  makeBellmanFord,
  makeKruskal,
  makePrim,
  makeTopologicalSort,
  makeStronglyConnectedComponents,
  
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
      id: 'hashmaps',
      title: 'Hash Maps & Sets',
      summary: 'Hash-based data structures for fast lookups and uniqueness.',
      items: [
        makeHashMapBasics(),
        makeHashSetOperations(),
        makeGroupAnagrams(),
        makeTopKFrequent(),
        makeSubarraySum(),
        makeLongestConsecutive(),
        makeIsomorphicStrings(),
        makeWordPattern()
      ]
    },
    {
      id: 'linkedlists',
      title: 'Linked Lists',
      summary: 'Linear data structures with dynamic memory allocation.',
      items: [
        makeLinkedListBasics(),
        makeReverseLinkedList(),
        makeMergeTwoLists(),
        makeRemoveNthNode(),
        makeLinkedListCycle(),
        makeIntersectionTwoLists(),
        makePalindromeLinkedList(),
        makeRotateList()
      ]
    },
    {
      id: 'trees',
      title: 'Trees & Binary Search Trees',
      summary: 'Hierarchical data structures and tree algorithms.',
      items: [
        makeBinaryTreeBasics(),
        makeBSTOperations(),
        makeTreeTraversals(),
        makeValidateBST(),
        makeLowestCommonAncestor(),
        makeMaxDepth(),
        makeBalancedTree(),
        makePathSum()
      ]
    },
    {
      id: 'advanced-trees',
      title: 'Advanced Trees',
      summary: 'Self-balancing trees and advanced tree structures.',
      items: [
        makeAVLTree(),
        makeRedBlackTree(),
        makeTrie(),
        makeSegmentTree(),
        makeFenwickTree()
      ]
    },
    {
      id: 'strings',
      title: 'Strings & String Algorithms',
      summary: 'String manipulation and pattern matching algorithms.',
      items: [
        makeStringBasics(),
        makeKMPAlgorithm(),
        makeRabinKarp(),
        makeBoyerMoore(),
        makeZAlgorithm(),
        makeManacher(),
        makeSuffixArray(),
        makeLongestPalindrome()
      ]
    },
    {
      id: 'arrays',
      title: 'Arrays & Two Pointers',
      summary: 'Classic scanning patterns: opposite ends, fast/slow, partitioning.',
      items: [
        makeArrayTwoSum(),
        makeSlidingWindow(),
        makeThreeSum(),
        makeTwoPointersPalindrome(),
        makeContainerMostWater(),
        makeRemoveDuplicates(),
        makeMergeSortedArrays(),
        makePartitionArray(),
        makeMoveZeros(),
        makeMaxSubarrayLen()
      ]
    },
    {
      id: 'searching',
      title: 'Searching & Sorting',
      summary: 'Comprehensive searching and sorting algorithms with visualizations.',
      items: [
        // Searching algorithms
        makeLinearSearch(),
        makeBinarySearch(),
        
        // Basic sorting algorithms
        makeBubbleSort(),
        makeSelectionSort(),
        makeInsertionSort(),
        
        // Advanced sorting algorithms
        makeMergeSort(),
        makeQuickSort(),
        makeHeapSort(),
        makeRadixSort(),
        makeTimSort(),
        makeTreeSort()
      ]
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      summary: 'Optimal substructure, overlapping subproblems, transitions.',
      items: [
        makeCoinChange(),
        makeLIS(),
        makeFibonacci(),
        makeHouseRobber(),
        makeClimbingStairs(),
        makeKnapsack(),
        makeLCS(),
        makeEditDistance(),
        makeMaxSubarray()
      ]
    },
    {
      id: 'graphs',
      title: 'Graphs',
      summary: 'BFS, DFS, shortest paths, MST, and advanced algorithms.',
      items: [
        makeGraphBFS(),
        makeGraphDFS(),
        makeDijkstra(),
        makeBellmanFord(),
        makeKruskal(),
        makePrim(),
        makeTopologicalSort(),
        makeStronglyConnectedComponents()
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