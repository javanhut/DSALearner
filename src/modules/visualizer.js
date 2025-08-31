// Algorithm Visualizer Module
// Provides step-by-step visual representations of algorithms with explanations

export class AlgorithmVisualizer {
    constructor(container) {
        this.container = container;
        this.currentStep = 0;
        this.steps = [];
        this.animationSpeed = 500;
        this.isPlaying = false;
        this.explanation = '';
    }

    // Create the visualizer UI
    createUI() {
        this.container.innerHTML = `
            <div class="visualizer-container">
                <div class="viz-controls">
                    <button class="viz-btn" id="viz-prev">⏮ Previous</button>
                    <button class="viz-btn" id="viz-play">▶ Play</button>
                    <button class="viz-btn" id="viz-next">⏭ Next</button>
                    <button class="viz-btn" id="viz-reset">🔄 Reset</button>
                    <span class="viz-step-info">Step: <span id="viz-step">0</span> / <span id="viz-total">0</span></span>
                    <label class="viz-speed">
                        Speed: <input type="range" id="viz-speed" min="100" max="2000" value="500" step="100">
                        <span id="viz-speed-val">0.5s</span>
                    </label>
                </div>
                <div class="viz-main">
                    <div class="viz-display" id="viz-display"></div>
                    <div class="viz-explanation" id="viz-explanation">
                        <h4>Explanation</h4>
                        <p id="viz-explanation-text">Select an algorithm to visualize</p>
                    </div>
                </div>
                <div class="viz-code" id="viz-code"></div>
            </div>
        `;

        this.setupControls();
    }

    setupControls() {
        const prevBtn = this.container.querySelector('#viz-prev');
        const playBtn = this.container.querySelector('#viz-play');
        const nextBtn = this.container.querySelector('#viz-next');
        const resetBtn = this.container.querySelector('#viz-reset');
        const speedSlider = this.container.querySelector('#viz-speed');
        const speedVal = this.container.querySelector('#viz-speed-val');

        prevBtn.onclick = () => this.previousStep();
        nextBtn.onclick = () => this.nextStep();
        resetBtn.onclick = () => this.reset();
        playBtn.onclick = () => this.togglePlay();

        speedSlider.oninput = (e) => {
            this.animationSpeed = parseInt(e.target.value);
            speedVal.textContent = (this.animationSpeed / 1000).toFixed(1) + 's';
        };
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
        }
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.renderStep();
        }
    }

    reset() {
        this.currentStep = 0;
        this.isPlaying = false;
        this.updatePlayButton();
        this.renderStep();
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        if (this.isPlaying) {
            this.play();
        }
    }

    updatePlayButton() {
        const playBtn = this.container.querySelector('#viz-play');
        playBtn.textContent = this.isPlaying ? '⏸ Pause' : '▶ Play';
    }

    async play() {
        while (this.isPlaying && this.currentStep < this.steps.length - 1) {
            this.nextStep();
            await new Promise(resolve => setTimeout(resolve, this.animationSpeed));
        }
        if (this.currentStep >= this.steps.length - 1) {
            this.isPlaying = false;
            this.updatePlayButton();
        }
    }

    renderStep() {
        if (this.steps.length === 0) return;
        
        const step = this.steps[this.currentStep];
        const display = this.container.querySelector('#viz-display');
        const explanation = this.container.querySelector('#viz-explanation-text');
        const stepSpan = this.container.querySelector('#viz-step');
        const totalSpan = this.container.querySelector('#viz-total');
        const codeDiv = this.container.querySelector('#viz-code');

        display.innerHTML = step.visual;
        explanation.textContent = step.explanation;
        stepSpan.textContent = this.currentStep + 1;
        totalSpan.textContent = this.steps.length;

        if (step.code) {
            codeDiv.innerHTML = `<pre class="viz-code-block">${this.highlightCode(step.code, step.highlightLines || [])}</pre>`;
        }
    }

    highlightCode(code, highlightLines) {
        const lines = code.split('\n');
        return lines.map((line, index) => {
            const lineNum = index + 1;
            const isHighlighted = highlightLines.includes(lineNum);
            return `<span class="code-line ${isHighlighted ? 'highlighted' : ''}">${lineNum.toString().padStart(2, ' ')}  ${this.escapeHtml(line)}</span>`;
        }).join('\n');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Two Pointers Visualization
export function visualizeTwoPointers(container, arr, target) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    const steps = [];
    let left = 0, right = arr.length - 1;
    
    // Initial state
    steps.push({
        visual: createArrayVisualization(arr, [left, right], [], 'Two Pointers: Finding pair with sum = ' + target),
        explanation: `Initialize two pointers: left at index 0 (${arr[0]}) and right at index ${right} (${arr[right]})`,
        code: `function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return null;
}`,
        highlightLines: [2]
    });

    // Simulation
    while (left < right) {
        const sum = arr[left] + arr[right];
        const comparison = sum === target ? 'equals' : sum < target ? 'less than' : 'greater than';
        
        steps.push({
            visual: createArrayVisualization(arr, [left, right], [], 
                `Sum: ${arr[left]} + ${arr[right]} = ${sum} (${comparison} ${target})`),
            explanation: `Current sum is ${sum}. ${
                sum === target ? 'Found the target!' : 
                sum < target ? 'Sum too small, move left pointer right.' : 
                'Sum too large, move right pointer left.'
            }`,
            code: `function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return null;
}`,
            highlightLines: sum === target ? [5] : sum < target ? [6] : [7]
        });

        if (sum === target) {
            steps.push({
                visual: createArrayVisualization(arr, [], [left, right], `Found pair: [${left}, ${right}]`),
                explanation: `Success! Elements at indices ${left} and ${right} sum to ${target}`,
                code: `function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return null;
}`,
                highlightLines: [5]
            });
            break;
        }

        if (sum < target) left++;
        else right--;
    }

    if (left >= right && arr[left] + arr[right] !== target) {
        steps.push({
            visual: createArrayVisualization(arr, [], [], 'No pair found'),
            explanation: 'No two elements sum to the target',
            code: `function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return null;
}`,
            highlightLines: [9]
        });
    }

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// Sliding Window Visualization
export function visualizeSlidingWindow(container, arr, k) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    const steps = [];
    let windowSum = 0;
    let maxSum = 0;
    let maxStart = 0;

    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    steps.push({
        visual: createArrayVisualization(arr, [], Array.from({length: k}, (_, i) => i), 
            `Initial window: sum = ${windowSum}`),
        explanation: `Create initial window of size ${k}. Sum = ${windowSum}`,
        code: `function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
        highlightLines: [6, 7, 8, 9]
    });

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        const removeIdx = i - k;
        const addIdx = i;
        
        steps.push({
            visual: createSlidingWindowVisualization(arr, removeIdx, addIdx, 
                Array.from({length: k}, (_, j) => i - k + 1 + j),
                `Removing ${arr[removeIdx]}, Adding ${arr[addIdx]}`),
            explanation: `Slide window: Remove ${arr[removeIdx]} (index ${removeIdx}), Add ${arr[addIdx]} (index ${addIdx})`,
            code: `function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
            highlightLines: [13]
        });

        windowSum = windowSum - arr[i - k] + arr[i];
        
        if (windowSum > maxSum) {
            maxSum = windowSum;
            maxStart = i - k + 1;
            steps.push({
                visual: createArrayVisualization(arr, [], 
                    Array.from({length: k}, (_, j) => i - k + 1 + j),
                    `New max sum: ${maxSum}`),
                explanation: `New maximum sum found: ${maxSum} at position ${maxStart}`,
                code: `function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
                highlightLines: [14]
            });
        }
    }

    steps.push({
        visual: createArrayVisualization(arr, [], 
            Array.from({length: k}, (_, j) => maxStart + j),
            `Maximum sum: ${maxSum}`),
        explanation: `Algorithm complete. Maximum sum subarray of size ${k} is ${maxSum}`,
        code: `function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
        highlightLines: [16]
    });

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// Binary Search Visualization
export function visualizeBinarySearch(container, arr, target) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    const steps = [];
    let left = 0, right = arr.length - 1;
    let found = false;
    let foundIdx = -1;

    steps.push({
        visual: createBinarySearchVisualization(arr, left, right, -1, target),
        explanation: `Initialize search space: left = 0, right = ${right}. Looking for ${target}`,
        code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
        highlightLines: [2]
    });

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        steps.push({
            visual: createBinarySearchVisualization(arr, left, right, mid, target),
            explanation: `Calculate mid = floor((${left} + ${right}) / 2) = ${mid}. Check arr[${mid}] = ${arr[mid]}`,
            code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
            highlightLines: [5]
        });

        if (arr[mid] === target) {
            found = true;
            foundIdx = mid;
            steps.push({
                visual: createBinarySearchVisualization(arr, left, right, mid, target, true),
                explanation: `Found target ${target} at index ${mid}!`,
                code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
                highlightLines: [7, 8]
            });
            break;
        } else if (arr[mid] < target) {
            steps.push({
                visual: createBinarySearchVisualization(arr, left, right, mid, target, false, 'right'),
                explanation: `${arr[mid]} < ${target}, search right half. Update left = ${mid + 1}`,
                code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
                highlightLines: [9, 10]
            });
            left = mid + 1;
        } else {
            steps.push({
                visual: createBinarySearchVisualization(arr, left, right, mid, target, false, 'left'),
                explanation: `${arr[mid]} > ${target}, search left half. Update right = ${mid - 1}`,
                code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
                highlightLines: [11, 12]
            });
            right = mid - 1;
        }
    }

    if (!found) {
        steps.push({
            visual: createBinarySearchVisualization(arr, left, right, -1, target),
            explanation: `Target ${target} not found in array`,
            code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
            highlightLines: [15]
        });
    }

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// Helper function to create array visualization
function createArrayVisualization(arr, pointers = [], highlighted = [], message = '') {
    let html = `<div class="viz-array-container">`;
    if (message) {
        html += `<div class="viz-message">${message}</div>`;
    }
    html += `<div class="viz-array">`;
    
    arr.forEach((val, idx) => {
        let classes = ['viz-array-cell'];
        if (highlighted.includes(idx)) classes.push('highlighted');
        if (pointers.includes(idx)) classes.push('pointer');
        
        html += `<div class="${classes.join(' ')}">
            <div class="viz-array-value">${val}</div>
            <div class="viz-array-index">${idx}</div>`;
        
        if (pointers.includes(idx)) {
            const pointerLabel = pointers.indexOf(idx) === 0 ? 'L' : 'R';
            html += `<div class="viz-pointer-label">${pointerLabel}</div>`;
        }
        
        html += `</div>`;
    });
    
    html += `</div></div>`;
    return html;
}

// Helper function for sliding window visualization
function createSlidingWindowVisualization(arr, removeIdx, addIdx, windowIndices, message = '') {
    let html = `<div class="viz-array-container">`;
    if (message) {
        html += `<div class="viz-message">${message}</div>`;
    }
    html += `<div class="viz-array">`;
    
    arr.forEach((val, idx) => {
        let classes = ['viz-array-cell'];
        if (windowIndices.includes(idx)) classes.push('in-window');
        if (idx === removeIdx) classes.push('removing');
        if (idx === addIdx) classes.push('adding');
        
        html += `<div class="${classes.join(' ')}">
            <div class="viz-array-value">${val}</div>
            <div class="viz-array-index">${idx}</div>`;
        
        if (idx === removeIdx) {
            html += `<div class="viz-action-label">-</div>`;
        } else if (idx === addIdx) {
            html += `<div class="viz-action-label">+</div>`;
        }
        
        html += `</div>`;
    });
    
    html += `</div></div>`;
    return html;
}

// Binary search visualization helper
function createBinarySearchVisualization(arr, left, right, mid, target, found = false, direction = '') {
    let html = `<div class="viz-array-container">`;
    html += `<div class="viz-message">Target: ${target} | Search range: [${left}, ${right}]${mid >= 0 ? ` | Mid: ${mid}` : ''}</div>`;
    html += `<div class="viz-array">`;
    
    arr.forEach((val, idx) => {
        let classes = ['viz-array-cell'];
        if (idx < left || idx > right) classes.push('out-of-range');
        if (idx === mid) classes.push(found ? 'found' : 'checking');
        if (direction === 'left' && idx > mid && idx <= right) classes.push('eliminating');
        if (direction === 'right' && idx < mid && idx >= left) classes.push('eliminating');
        
        html += `<div class="${classes.join(' ')}">
            <div class="viz-array-value">${val}</div>
            <div class="viz-array-index">${idx}</div>`;
        
        if (idx === left && left <= right) {
            html += `<div class="viz-boundary-label">L</div>`;
        }
        if (idx === right && left <= right) {
            html += `<div class="viz-boundary-label">R</div>`;
        }
        if (idx === mid && mid >= 0) {
            html += `<div class="viz-mid-label">M</div>`;
        }
        
        html += `</div>`;
    });
    
    html += `</div></div>`;
    return html;
}

// Tree Visualization
export function visualizeBinaryTree(container, operation = 'bfs') {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    // Sample tree structure
    const tree = {
        value: 1,
        left: {
            value: 2,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null }
        },
        right: {
            value: 3,
            left: { value: 6, left: null, right: null },
            right: { value: 7, left: null, right: null }
        }
    };

    const steps = [];

    if (operation === 'bfs') {
        // BFS visualization
        const queue = [tree];
        const visited = [];
        const order = [];

        steps.push({
            visual: createTreeVisualization(tree, [], [], 'BFS Traversal'),
            explanation: 'Initialize queue with root node',
            code: `function bfs(root) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return result;
}`,
            highlightLines: [3]
        });

        while (queue.length > 0) {
            const node = queue.shift();
            visited.push(node.value);
            order.push(node.value);

            steps.push({
                visual: createTreeVisualization(tree, visited, [node.value], 
                    `Processing node ${node.value} | Queue: [${queue.map(n => n.value).join(', ')}]`),
                explanation: `Dequeue and process node ${node.value}. Add its children to queue.`,
                code: `function bfs(root) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return result;
}`,
                highlightLines: [7, 8]
            });

            if (node.left) {
                queue.push(node.left);
                steps.push({
                    visual: createTreeVisualization(tree, visited, [], 
                        `Added left child ${node.left.value} to queue | Queue: [${queue.map(n => n.value).join(', ')}]`),
                    explanation: `Add left child (${node.left.value}) to queue`,
                    code: `function bfs(root) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return result;
}`,
                    highlightLines: [10]
                });
            }
            
            if (node.right) {
                queue.push(node.right);
                steps.push({
                    visual: createTreeVisualization(tree, visited, [], 
                        `Added right child ${node.right.value} to queue | Queue: [${queue.map(n => n.value).join(', ')}]`),
                    explanation: `Add right child (${node.right.value}) to queue`,
                    code: `function bfs(root) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return result;
}`,
                    highlightLines: [11]
                });
            }
        }

        steps.push({
            visual: createTreeVisualization(tree, visited, [], `BFS Complete: [${order.join(' → ')}]`),
            explanation: `BFS traversal complete. Order: ${order.join(' → ')}`,
            code: `function bfs(root) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return result;
}`,
            highlightLines: [13]
        });
    }

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// Tree visualization helper
function createTreeVisualization(tree, visited = [], current = [], message = '') {
    let html = `<div class="viz-tree-container">`;
    if (message) {
        html += `<div class="viz-message">${message}</div>`;
    }
    
    html += `<div class="viz-tree">`;
    html += createTreeNodeHTML(tree, visited, current, 0, 0, 4);
    html += `</div></div>`;
    
    return html;
}

function createTreeNodeHTML(node, visited, current, level, position, maxWidth) {
    if (!node) return '';
    
    const isVisited = visited.includes(node.value);
    const isCurrent = current.includes(node.value);
    
    let classes = ['viz-tree-node'];
    if (isVisited) classes.push('visited');
    if (isCurrent) classes.push('current');
    
    const x = 280 + (position - maxWidth/2) * 80;  // Center at 280px (half of 600px container minus node width)
    const y = 50 + level * 80;
    
    let html = `<div class="${classes.join(' ')}" style="left: ${x}px; top: ${y}px;">
        ${node.value}
    </div>`;
    
    // Draw edges to children
    if (node.left) {
        const childX = 280 + (position - maxWidth/Math.pow(2, level + 2) - maxWidth/2) * 80;
        const childY = y + 80;
        html += `<svg class="viz-tree-edge" style="position: absolute; overflow: visible; width: 100%; height: 100%;">
            <line x1="${x + 20}" y1="${y + 40}" x2="${childX + 20}" y2="${childY}" 
                  stroke="${isVisited ? '#4caf50' : '#666'}" stroke-width="2"/>
        </svg>`;
        html += createTreeNodeHTML(node.left, visited, current, level + 1, position - maxWidth/Math.pow(2, level + 2), maxWidth);
    }
    
    if (node.right) {
        const childX = 280 + (position + maxWidth/Math.pow(2, level + 2) - maxWidth/2) * 80;
        const childY = y + 80;
        html += `<svg class="viz-tree-edge" style="position: absolute; overflow: visible; width: 100%; height: 100%;">
            <line x1="${x + 20}" y1="${y + 40}" x2="${childX + 20}" y2="${childY}" 
                  stroke="${isVisited ? '#4caf50' : '#666'}" stroke-width="2"/>
        </svg>`;
        html += createTreeNodeHTML(node.right, visited, current, level + 1, position + maxWidth/Math.pow(2, level + 2), maxWidth);
    }
    
    return html;
}

// Sorting Visualizations
export function visualizeBubbleSort(container, arr) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    const steps = [];
    const workingArr = [...arr];
    
    steps.push({
        visual: createSortingVisualization(workingArr, [], [], 'Bubble Sort - Initial Array'),
        explanation: 'Starting bubble sort. Will repeatedly swap adjacent elements if they are in wrong order.',
        code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
        highlightLines: [1]
    });

    for (let i = 0; i < workingArr.length - 1; i++) {
        steps.push({
            visual: createSortingVisualization(workingArr, [], [], `Pass ${i + 1}`),
            explanation: `Starting pass ${i + 1}. Will bubble the largest unsorted element to position ${workingArr.length - 1 - i}`,
            code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
            highlightLines: [2]
        });

        for (let j = 0; j < workingArr.length - i - 1; j++) {
            steps.push({
                visual: createSortingVisualization(workingArr, [j, j + 1], [], 
                    `Comparing ${workingArr[j]} and ${workingArr[j + 1]}`),
                explanation: `Comparing elements at positions ${j} and ${j + 1}: ${workingArr[j]} ${workingArr[j] > workingArr[j + 1] ? '>' : '≤'} ${workingArr[j + 1]}`,
                code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
                highlightLines: [4]
            });

            if (workingArr[j] > workingArr[j + 1]) {
                [workingArr[j], workingArr[j + 1]] = [workingArr[j + 1], workingArr[j]];
                steps.push({
                    visual: createSortingVisualization(workingArr, [], [j, j + 1], 
                        `Swapped ${workingArr[j + 1]} and ${workingArr[j]}`),
                    explanation: `Swapped elements to maintain order`,
                    code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
                    highlightLines: [5]
                });
            }
        }

        steps.push({
            visual: createSortingVisualization(workingArr, [], 
                Array.from({length: i + 1}, (_, idx) => workingArr.length - 1 - idx), 
                `Pass ${i + 1} complete`),
            explanation: `Element ${workingArr[workingArr.length - 1 - i]} is now in its final position`,
            code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
            highlightLines: [7]
        });
    }

    steps.push({
        visual: createSortingVisualization(workingArr, [], 
            Array.from({length: workingArr.length}, (_, i) => i), 
            'Sorted!'),
        explanation: 'Array is now completely sorted',
        code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
        highlightLines: [9]
    });

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// Sorting visualization helper
function createSortingVisualization(arr, comparing = [], swapped = [], message = '') {
    const maxVal = Math.max(...arr);
    let html = `<div class="viz-sort-container">`;
    if (message) {
        html += `<div class="viz-message">${message}</div>`;
    }
    
    html += `<div class="viz-bars">`;
    arr.forEach((val, idx) => {
        const height = (val / maxVal) * 200;
        let classes = ['viz-bar'];
        if (comparing.includes(idx)) classes.push('comparing');
        if (swapped.includes(idx)) classes.push('swapped');
        
        html += `<div class="${classes.join(' ')}" style="height: ${height}px;">
            <span class="viz-bar-value">${val}</span>
        </div>`;
    });
    html += `</div></div>`;
    
    return html;
}

// Dynamic Programming Visualization
export function visualizeFibonacciDP(container, n) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    const steps = [];
    const dp = new Array(n + 1).fill(null);
    
    steps.push({
        visual: createDPTableVisualization(dp, [], 'Fibonacci with DP'),
        explanation: `Initialize DP table of size ${n + 1}`,
        code: `function fibonacci(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
        highlightLines: [2]
    });

    dp[0] = 0;
    steps.push({
        visual: createDPTableVisualization(dp, [0], 'Base case: F(0) = 0'),
        explanation: 'Set base case: F(0) = 0',
        code: `function fibonacci(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
        highlightLines: [3]
    });

    if (n >= 1) {
        dp[1] = 1;
        steps.push({
            visual: createDPTableVisualization(dp, [1], 'Base case: F(1) = 1'),
            explanation: 'Set base case: F(1) = 1',
            code: `function fibonacci(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
            highlightLines: [4]
        });
    }

    for (let i = 2; i <= n; i++) {
        steps.push({
            visual: createDPTableVisualization(dp, [i - 2, i - 1], 
                `Computing F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]}`),
            explanation: `Calculate F(${i}) using previously computed values`,
            code: `function fibonacci(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
            highlightLines: [7]
        });

        dp[i] = dp[i - 1] + dp[i - 2];

        steps.push({
            visual: createDPTableVisualization(dp, [i], `F(${i}) = ${dp[i]}`),
            explanation: `Stored F(${i}) = ${dp[i]} in DP table`,
            code: `function fibonacci(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
            highlightLines: [7]
        });
    }

    steps.push({
        visual: createDPTableVisualization(dp, [n], `Result: F(${n}) = ${dp[n]}`),
        explanation: `Final answer: F(${n}) = ${dp[n]}`,
        code: `function fibonacci(n) {
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
        highlightLines: [10]
    });

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// DP table visualization helper
function createDPTableVisualization(dp, highlighted = [], message = '') {
    let html = `<div class="viz-dp-container">`;
    if (message) {
        html += `<div class="viz-message">${message}</div>`;
    }
    
    html += `<div class="viz-dp-table">`;
    html += `<div class="viz-dp-row">`;
    
    // Index row
    dp.forEach((_, idx) => {
        html += `<div class="viz-dp-cell header">i=${idx}</div>`;
    });
    html += `</div><div class="viz-dp-row">`;
    
    // Value row
    dp.forEach((val, idx) => {
        let classes = ['viz-dp-cell'];
        if (highlighted.includes(idx)) classes.push('highlighted');
        if (val === null) classes.push('empty');
        
        html += `<div class="${classes.join(' ')}">${val !== null ? val : '—'}</div>`;
    });
    
    html += `</div></div></div>`;
    return html;
}

// Graph Visualization - DFS
export function visualizeDFS(container) {
    const viz = new AlgorithmVisualizer(container);
    viz.createUI();
    
    // Sample graph
    const graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    };
    
    const steps = [];
    const visited = new Set();
    const stack = ['A'];
    const order = [];

    steps.push({
        visual: createGraphVisualization(graph, visited, 'A', stack, 'DFS Starting from A'),
        explanation: 'Initialize DFS with starting node A in stack',
        code: `function dfs(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    return result;
}`,
        highlightLines: [2, 3]
    });

    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            order.push(node);
            
            steps.push({
                visual: createGraphVisualization(graph, visited, node, stack, 
                    `Visiting ${node} | Stack: [${stack.join(', ')}]`),
                explanation: `Pop ${node} from stack and mark as visited`,
                code: `function dfs(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    return result;
}`,
                highlightLines: [7, 10, 11]
            });
            
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                    steps.push({
                        visual: createGraphVisualization(graph, visited, node, stack, 
                            `Added ${neighbor} to stack | Stack: [${stack.join(', ')}]`),
                        explanation: `Push unvisited neighbor ${neighbor} to stack`,
                        code: `function dfs(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    return result;
}`,
                        highlightLines: [15]
                    });
                }
            }
        }
    }

    steps.push({
        visual: createGraphVisualization(graph, visited, null, [], 
            `DFS Complete: ${order.join(' → ')}`),
        explanation: `DFS traversal complete. Visit order: ${order.join(' → ')}`,
        code: `function dfs(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    return result;
}`,
        highlightLines: [20]
    });

    viz.steps = steps;
    viz.renderStep();
    return viz;
}

// Graph visualization helper
function createGraphVisualization(graph, visited, current, stack, message = '') {
    const positions = {
        'A': { x: 200, y: 100 },
        'B': { x: 100, y: 200 },
        'C': { x: 300, y: 200 },
        'D': { x: 50, y: 300 },
        'E': { x: 150, y: 300 },
        'F': { x: 250, y: 300 }
    };
    
    let html = `<div class="viz-graph-container">`;
    if (message) {
        html += `<div class="viz-message">${message}</div>`;
    }
    
    html += `<svg class="viz-graph" width="400" height="400">`;
    
    // Draw edges
    for (const [node, neighbors] of Object.entries(graph)) {
        for (const neighbor of neighbors) {
            const x1 = positions[node].x;
            const y1 = positions[node].y;
            const x2 = positions[neighbor].x;
            const y2 = positions[neighbor].y;
            
            html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                          stroke="${visited.has(node) && visited.has(neighbor) ? '#4caf50' : '#666'}" 
                          stroke-width="2"/>`;
        }
    }
    
    // Draw nodes
    for (const node of Object.keys(graph)) {
        const pos = positions[node];
        let classes = ['viz-graph-node'];
        if (visited.has(node)) classes.push('visited');
        if (node === current) classes.push('current');
        if (stack.includes(node)) classes.push('in-stack');
        
        html += `<g>
            <circle cx="${pos.x}" cy="${pos.y}" r="25" 
                    class="${classes.join(' ')}" 
                    fill="${node === current ? '#ff9800' : visited.has(node) ? '#4caf50' : '#2196f3'}"
                    stroke="#fff" stroke-width="2"/>
            <text x="${pos.x}" y="${pos.y + 5}" text-anchor="middle" 
                  fill="white" font-size="16" font-weight="bold">${node}</text>
        </g>`;
    }
    
    html += `</svg></div>`;
    return html;
}

// Export all visualizers
export const Visualizers = {
    twoPointers: visualizeTwoPointers,
    slidingWindow: visualizeSlidingWindow,
    binarySearch: visualizeBinarySearch,
    binaryTree: visualizeBinaryTree,
    bubbleSort: visualizeBubbleSort,
    fibonacci: visualizeFibonacciDP,
    dfs: visualizeDFS
};