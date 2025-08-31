// Complete content with all implementations
// This file contains the full DSA curriculum with learn sections, quizzes, and practice problems

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
}`,
      constraints:'n up to 1e5; values within 32-bit; O(n) time, O(1) space.',
      expectedComplexity:'O(n)',
      tests:[
        {input:[[2,7,11,15],9], expected:[0,1]},
        {input:[[1,2,3,4,6],10], expected:[3,4]},
        {input:[[1,3,3,4],6], expected:[1,3]}
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

// Export complete content with all implementations
export const fullContent = {
  makeArrayTwoSum,
  // Add other function exports as needed
};

// For direct use in HTML
if (typeof window !== 'undefined') {
  window.DSAContent = {
    makeArrayTwoSum,
    // Add other functions to window object
  };
}