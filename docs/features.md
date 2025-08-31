# DSA Learner Features Documentation

## Core Features

### 1. Start Path Button
**Location**: Header navigation bar

**Purpose**: Intelligently suggests the next problem to solve based on difficulty progression and learning status.

**How it works**:
- Analyzes your progress across all topics
- Finds unmastered problems
- Prioritizes by difficulty (easy → medium → hard)
- Skips already mastered problems
- Automatically navigates to the suggested problem

**Algorithm**:
1. Scans all problems in all topics
2. Filters out mastered problems
3. Sorts by difficulty level
4. Returns the easiest unstarted or incomplete problem
5. Shows a notification with problem details

**Usage**:
- Click "Start Path" button in the header
- System automatically navigates to the next recommended problem
- A notification appears showing the selected problem and its difficulty

### 2. Review Queue
**Location**: Header navigation bar

**Purpose**: Implements spaced repetition for long-term retention of learned concepts.

**Features**:
- Shows all problems that need review
- Sorts by due date (most overdue first)
- Displays last review date
- Shows current progress (quiz score, code completion)
- One-click navigation to review any problem

**Review Criteria**:
- Problems you've started learning
- Problems with quiz attempts
- Problems with code submissions
- Items due for review based on spaced repetition algorithm

**Modal Interface**:
- Opens a modal overlay with review queue
- Shows up to 10 most urgent items
- Each item displays:
  - Problem title and topic
  - Days since last review
  - Due status (overdue or days until due)
  - Current quiz score and code status
- Click any item to immediately start reviewing
- Close button or backdrop click to dismiss

**Spaced Repetition Algorithm**:
- Uses SM-2 lite algorithm
- Adjusts review intervals based on performance
- Tracks difficulty factor for each item
- Optimal review timing for maximum retention

### 3. Lab Feature
**Location**: Header navigation bar

**Purpose**: Provides a sandbox environment for experimenting with DSA code.

**Capabilities**:
- Multi-language support (Python, C++, JavaScript)
- Custom function writing and testing
- JSON input for test arguments
- Real-time code execution
- Output display with error handling

**Languages Supported**:

#### Python
- Uses Pyodide for browser-based execution
- Full Python standard library support
- Handles complex data structures
- Automatic type conversion between JS and Python

#### JavaScript
- Native browser execution
- Immediate feedback
- Support for all ES6+ features
- Direct function invocation

#### C++
- Online compilation via Coliru
- C++17 standard support
- STL containers and algorithms
- Automatic JSON serialization

**Interface Components**:
1. **Language Selector**: Choose Python, C++, or JavaScript
2. **Function Name Input**: Specify the function to test
3. **Code Editor**: Write or paste your implementation
4. **Arguments Input**: JSON array of function arguments
5. **Run Button**: Execute the code
6. **Output Display**: Shows results or errors

**Code Templates**:
- Automatically provides starter code for each language
- Templates update when switching languages
- Preserves language preference in localStorage

**Error Handling**:
- Invalid JSON input detection
- Function not found errors
- Compilation errors (C++)
- Runtime exceptions with stack traces

### 4. Progress Tracking
**Persistent State Management**

**What's Tracked**:
- Learning completion status
- Quiz scores and attempts
- Code submission results
- Review dates and intervals
- Mastery status
- Difficulty factors for spaced repetition

**Storage**:
- Uses localStorage for persistence
- Survives page refreshes
- Can be reset via Reset button
- Automatic saving after each action

### 5. Mode Switching
**Available Modes**:

#### Learn Mode
- Intuition and concepts
- Visual explanations
- Algorithm visualizations
- Code templates
- Progressive hints

#### Quiz Mode
- Multiple choice questions
- Short answer validation
- Immediate feedback
- Score tracking
- Multiple attempts allowed

#### Practice Mode
- Full code editor with syntax highlighting
- Test case validation
- Solution viewing
- Performance metrics
- Custom input testing

#### Game Mode
- Interactive algorithm games
- Visual learning through play
- Progress tracking
- Completion rewards

## Navigation Features

### Topic Sidebar
- Hierarchical topic organization
- Progress indicators for each topic
- Collapsible sections
- Visual progress bars
- Problem count display

### Problem Selection
- Difficulty indicators
- Completion status icons
- Quick mode switching
- Progress preservation

### Breadcrumb Navigation
- Current topic display
- Current problem display
- Mode indicator
- Quick navigation back to topic

## Utility Features

### Reset Progress
- Complete progress reset
- Confirmation dialog
- Immediate effect
- Page refresh after reset

### Coach Panel
- AI-powered hints and tips
- Context-aware suggestions
- Learning recommendations
- Progress encouragement

### Statistics Dashboard
- Total topics and problems
- Overall completion percentage
- Problems solved count
- Current streak tracking

## Keyboard Shortcuts
(To be implemented)
- `Ctrl/Cmd + Enter`: Run code
- `Ctrl/Cmd + S`: Save progress
- `Ctrl/Cmd + K`: Open command palette
- `Arrow Keys`: Navigate problems
- `Tab`: Switch between modes

## Best Practices

### For Learning Path
1. Start with "Start Path" for guided learning
2. Complete problems in suggested order
3. Don't skip difficulty levels
4. Master easier problems before advancing

### For Review Queue
1. Review daily for best retention
2. Complete overdue items first
3. Be honest with self-assessment
4. Use review to identify weak areas

### For Lab Usage
1. Test edge cases in the Lab
2. Experiment with different approaches
3. Use Lab to debug failing test cases
4. Try multiple languages for comparison

## Troubleshooting

### Start Path Not Working
- Ensure you have unmastered problems
- Check if all problems are completed
- Try refreshing the page

### Review Queue Empty
- Complete some problems first
- Wait for review intervals to pass
- Check if progress is being saved

### Lab Execution Errors
- Verify JSON syntax in arguments
- Check function name matches code
- Ensure network connection for C++
- Check browser console for errors

### Progress Not Saving
- Check localStorage is enabled
- Ensure sufficient storage space
- Try different browser if issues persist
- Export progress before clearing data