# DSA Learner Architecture

## 🏗️ System Architecture

DSALearner is a modular, ES6-based web application that uses a **module-first architecture**. This document defines the canonical structure to prevent breaking changes.

## 📁 File Structure

```
DSALearner/
├── index.html                 # Main HTML entry point (CANONICAL)
├── styles.css                 # Global CSS styles (CANONICAL)
├── favicon.svg
├── ai_coach/                  # Backend services (containers)
├── src/                       # Frontend modules (CANONICAL)
│   ├── main.js               # Main application entry point
│   └── modules/
│       ├── content-complete.js    # Complete content export (PRIMARY)
│       ├── ai-coach.js           # AI Coach functionality
│       ├── coach.js              # Coach UI rendering
│       ├── games.js              # Interactive games
│       ├── lab.js                # Code lab/editor
│       ├── learn.js              # Learning mode UI
│       ├── problem.js            # Practice mode UI
│       ├── quiz.js               # Quiz mode UI
│       ├── scheduler.js          # Spaced repetition
│       └── state.js              # State management
├── docker/                    # Docker configs
├── tools/                     # Build utilities
└── ARCHITECTURE.md           # This file
```

## ⚠️ CRITICAL - DO NOT MODIFY

### 1. HTML Structure (index.html)
```html
<body>
  <!-- Header with navigation -->
  <div class="app-header">
    <div class="brand">DSA Learner</div>
    <div><!-- Nav buttons --></div>
  </div>
  
  <!-- Main 3-column layout -->
  <div class="app">
    <div class="sidebar">
      <div id="sidebar"><!-- Module content --></div>
    </div>
    <div class="main">
      <div id="main"><!-- Module content --></div>
    </div>
    <div class="coach">
      <div id="coach"><!-- Module content --></div>
    </div>
  </div>
</body>
```

### 2. CSS Grid Layout (styles.css)
- `.app` uses `grid-template-columns: 280px 1fr 300px`
- `.sidebar`, `.main`, `.coach` are the layout containers
- `#sidebar`, `#main`, `#coach` are content containers managed by modules

### 3. Module Loading Pattern (index.html)
```html
<script type="module">
  // Load content and make globally available
  import { fullContent } from './src/modules/content-complete.js';
  import { AICoach } from './src/modules/ai-coach.js';
  
  window.fullContent = fullContent;
  window.aiCoach = new AICoach();
  
  // Load main application
  import('./src/main.js');
</script>
```

## 🎯 Module System Rules

### 1. Entry Point: `src/main.js`
- **MUST** be the primary entry point
- Handles all DOM manipulation for `#sidebar`, `#main`, `#coach`
- Imports all other modules as needed

### 2. Content: `src/modules/content-complete.js`
- **CANONICAL** source of all DSA content
- Exports `fullContent` object
- Available globally as `window.fullContent`

### 3. State: `src/modules/state.js`
- Manages user progress and local storage
- Provides State.load(), State.save(), etc.

### 4. Rendering Modules
- `coach.js` - Renders coach panel content
- `learn.js` - Renders learn mode
- `quiz.js` - Renders quiz mode  
- `problem.js` - Renders practice/coding mode
- `games.js` - Renders interactive games
- `lab.js` - Renders code laboratory

## 🚫 FORBIDDEN PATTERNS

### ❌ DO NOT ADD INLINE JAVASCRIPT TO HTML
- HTML should **ONLY** contain the module loader script
- All JavaScript logic **MUST** be in modules
- No `onclick`, `window.function`, or inline scripts

### ❌ DO NOT CREATE COMPETING SYSTEMS
- Do not add new HTML files that duplicate functionality
- Do not bypass the module system
- Do not add conflicting CSS frameworks

### ❌ DO NOT MODIFY CORE LAYOUT
- The 3-column grid layout is fixed
- Element IDs `#sidebar`, `#main`, `#coach` are reserved
- CSS classes `.app`, `.sidebar`, `.main`, `.coach` are reserved

## ✅ APPROVED MODIFICATION PATTERNS

### ✅ Adding New Content
1. Add new functions to `content-complete.js`
2. Follow existing `make*()` function pattern
3. Add to appropriate topic's `items` array

### ✅ Adding New Features
1. Create new module in `src/modules/`
2. Import in `main.js`
3. Follow existing rendering patterns

### ✅ Styling Changes  
1. Modify `styles.css` only
2. Use existing CSS custom properties (--variables)
3. Follow existing class naming conventions

## 🔧 Development Guidelines

### Module Import Pattern
```javascript
// In main.js
import { ModuleName } from './modules/module-name.js';

// Use globally available content
const content = window.fullContent;
```

### DOM Manipulation Pattern
```javascript
// Always target the inner containers
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main'); 
const coach = document.getElementById('coach');

// Clear and populate
main.innerHTML = '';
main.appendChild(newContent);
```

### Content Access Pattern
```javascript
// Access content through global
const content = window.fullContent;
const topic = content.topics.find(t => t.id === topicId);
const item = topic.items.find(i => i.id === itemId);
```

## 🐛 Debugging

### Check Module Loading
```javascript
console.log('Content available:', !!window.fullContent);
console.log('Topics:', window.fullContent?.topics?.length);
console.log('AI Coach:', !!window.aiCoach);
```

### Check DOM Structure
```javascript
console.log('Sidebar:', document.getElementById('sidebar'));
console.log('Main:', document.getElementById('main'));
console.log('Coach:', document.getElementById('coach'));
```

## 📈 Performance Guidelines

1. **Lazy Loading**: Only import modules when needed
2. **Global State**: Use `window.fullContent` to avoid re-imports
3. **DOM Reuse**: Clear and repopulate containers instead of recreating
4. **CSS Efficiency**: Use existing classes, avoid inline styles

## 🔒 Backwards Compatibility

This architecture ensures:
- Module system remains consistent
- HTML structure stays stable  
- CSS classes don't conflict
- Content format is preserved
- State management is centralized

---

**⚠️ WARNING**: Modifying the core architecture without updating this document will cause system-wide breaking changes. Always consult this document before making structural changes.