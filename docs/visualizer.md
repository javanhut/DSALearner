# Algorithm Visualizer Documentation

## Overview
The Algorithm Visualizer provides interactive, step-by-step visual representations of various data structures and algorithms. Each visualization includes:
- Visual representation using nodes, arrays, tables, or graphs
- Step-by-step execution with explanations
- Code highlighting showing which lines are executing
- Playback controls (play, pause, next, previous, reset)
- Adjustable animation speed

## Available Visualizations

### Array Algorithms

#### Two Pointers
- **Description**: Visualizes the two-pointer technique for finding pairs in sorted arrays
- **Features**:
  - Shows left and right pointers moving through the array
  - Highlights current elements being compared
  - Displays sum calculation and comparison with target
  - Shows when a valid pair is found

#### Sliding Window
- **Description**: Demonstrates the sliding window technique for subarray problems
- **Features**:
  - Visual window sliding through the array
  - Shows elements being added and removed
  - Tracks window sum and maximum sum
  - Highlights the optimal window

#### Binary Search
- **Description**: Shows binary search algorithm on sorted arrays
- **Features**:
  - Displays search boundaries (left, right, mid)
  - Shows elimination of search space
  - Highlights the middle element being checked
  - Visual indication when target is found

### Tree Algorithms

#### BFS (Breadth-First Search)
- **Description**: Tree traversal level by level
- **Features**:
  - Queue visualization showing nodes to be processed
  - Level-by-level node highlighting
  - Shows the order of traversal
  - Edge highlighting as nodes are visited

#### DFS (Depth-First Search)
- **Description**: Tree traversal using depth-first approach
- **Features**:
  - Stack visualization (implicit in recursion)
  - Shows preorder/inorder/postorder traversal
  - Path highlighting from root to current node

### Graph Algorithms

#### Graph DFS
- **Description**: Depth-first search on graphs
- **Features**:
  - Stack visualization for iterative DFS
  - Node coloring (unvisited, visiting, visited)
  - Edge highlighting for traversal path
  - Shows detection of cycles if present

#### Graph BFS
- **Description**: Breadth-first search on graphs
- **Features**:
  - Queue visualization
  - Level-wise exploration
  - Shortest path highlighting
  - Distance calculation from source

### Sorting Algorithms

#### Bubble Sort
- **Description**: Simple comparison-based sorting
- **Features**:
  - Bar chart representation of array elements
  - Comparison highlighting between adjacent elements
  - Swap animation when elements are exchanged
  - Shows sorted portion growing from the end

#### Merge Sort
- **Description**: Divide-and-conquer sorting algorithm
- **Features**:
  - Shows array division into subarrays
  - Merge process visualization
  - Comparison during merging
  - Final sorted array assembly

#### Quick Sort
- **Description**: Efficient divide-and-conquer sorting
- **Features**:
  - Pivot selection and positioning
  - Partitioning visualization
  - Recursive calls on subarrays
  - In-place sorting demonstration

### Dynamic Programming

#### Fibonacci with DP
- **Description**: Computing Fibonacci numbers using dynamic programming
- **Features**:
  - DP table showing memoized values
  - Highlights dependencies (F(n-1) and F(n-2))
  - Shows how previously computed values are reused
  - Comparison with recursive approach

#### Longest Common Subsequence
- **Description**: Finding LCS of two strings
- **Features**:
  - 2D DP table visualization
  - Character comparison highlighting
  - Path reconstruction for the actual LCS
  - Cell dependencies visualization

## How to Use

### In Learn Mode
1. Navigate to any problem in the DSA Learner
2. Select "Learn" mode
3. Click "Show Algorithm Visualization" button
4. Use the controls to:
   - **Play/Pause**: Auto-play through all steps
   - **Next/Previous**: Manual step control
   - **Reset**: Return to the first step
   - **Speed**: Adjust animation speed (0.1s to 2s)

### Controls
- **Step Info**: Shows current step number and total steps
- **Explanation Panel**: Provides detailed explanation for each step
- **Code Panel**: Shows the algorithm code with current line highlighted
- **Visual Display**: Main visualization area

## Implementation Details

### Adding New Visualizations

To add a new algorithm visualization:

1. Create a new function in `visualizer.js`:
```javascript
export function visualizeYourAlgorithm(container, input) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    const steps = [];
    // Your algorithm logic here
    // For each step, add to steps array:
    steps.push({
        visual: createYourVisualization(...),
        explanation: "What's happening in this step",
        code: `your algorithm code`,
        highlightLines: [lineNumbers]
    });
    
    viz.steps = steps;
    viz.renderStep();
    return viz;
}
```

2. Add to the Visualizers export:
```javascript
export const Visualizers = {
    // ... existing visualizers
    yourAlgorithm: visualizeYourAlgorithm
}
```

3. Map it in the main application's `showVisualization` function

### Customization

The visualizer supports various customization options:
- **Colors**: Defined in CSS variables (--accent, --ok, --warning, --error)
- **Sizes**: Adjustable cell/node sizes in CSS
- **Animation Speed**: Configurable through the speed slider
- **Layout**: Responsive grid and flexbox layouts

## Best Practices

1. **Step Granularity**: Create steps for meaningful algorithm states, not every variable change
2. **Clear Explanations**: Write explanations assuming no prior knowledge of the algorithm
3. **Visual Clarity**: Use consistent colors (green for success, orange for processing, red for errors)
4. **Code Highlighting**: Highlight the exact lines being executed in each step
5. **Input Variety**: Provide different input examples to demonstrate various cases

## Troubleshooting

### Visualization Not Loading
- Check browser console for errors
- Ensure the visualizer module is properly imported
- Verify that the problem ID matches the visualization mapping

### Performance Issues
- Reduce array/graph size for complex algorithms
- Adjust animation speed to slower setting
- Clear browser cache if animations are stuttering

### Visual Glitches
- Refresh the page to reset the visualizer state
- Check that CSS styles are properly loaded
- Ensure container element has sufficient size

## Future Enhancements

Planned improvements include:
- More algorithm visualizations (Dijkstra, A*, advanced DP)
- Custom input support for all visualizations
- Export animations as GIF/video
- Side-by-side algorithm comparison
- Complexity analysis visualization
- Interactive problem-solving mode