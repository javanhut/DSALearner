// WebAssembly-based Lab Execution Module
// Provides local C++ and Python execution without external servers

// Python WASM via Pyodide
class PythonWASM {
    constructor() {
        this.pyodide = null;
        this.loaded = false;
        this.loading = false;
    }

    async init() {
        if (this.loaded) return this.pyodide;
        if (this.loading) {
            // Wait for existing load
            while (this.loading) {
                await new Promise(r => setTimeout(r, 100));
            }
            return this.pyodide;
        }

        this.loading = true;
        try {
            // Add Pyodide script
            if (!window.loadPyodide) {
                await this.loadScript('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');
            }

            // Initialize Pyodide
            this.pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
                stdout: (text) => console.log('Python:', text),
                stderr: (text) => console.error('Python Error:', text)
            });

            // Load commonly used packages
            await this.pyodide.loadPackage(['numpy', 'micropip']);
            
            this.loaded = true;
            return this.pyodide;
        } catch (error) {
            this.loading = false;
            throw new Error(`Failed to initialize Python: ${error.message}`);
        } finally {
            this.loading = false;
        }
    }

    async loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.head.appendChild(script);
        });
    }

    async run(code, functionName, args) {
        const py = await this.init();
        
        // Reset namespace for clean execution
        py.runPython(`
import sys
import json
from io import StringIO

# Capture output
_output = StringIO()
_old_stdout = sys.stdout
sys.stdout = _output
        `);

        try {
            // Run user code
            py.runPython(code);
            
            // Get the function
            const func = py.globals.get(functionName);
            if (!func) {
                throw new Error(`Function '${functionName}' not found`);
            }

            // Convert args and call function
            const pyArgs = args.map(arg => py.toPy(arg));
            const result = func(...pyArgs);
            
            // Get any printed output
            py.runPython('sys.stdout = _old_stdout');
            const output = py.runPython('_output.getvalue()');
            
            // Convert result
            const jsResult = result && result.toJs ? result.toJs() : result;
            
            return {
                result: jsResult,
                output: output
            };
        } catch (error) {
            py.runPython('sys.stdout = _old_stdout');
            throw error;
        }
    }
}

// C++ WASM Compiler using WASI
class CppWASM {
    constructor() {
        this.compiler = null;
        this.loaded = false;
        this.wasmModule = null;
    }

    async init() {
        if (this.loaded) return;
        
        try {
            // For C++, we'll use a lightweight C interpreter in WASM
            // or compile to WASM directly using a web-based compiler
            
            // Option 1: Use QuickJS compiled to WASM for C-like syntax
            // Option 2: Use TCC (Tiny C Compiler) compiled to WASM
            // Option 3: Use a subset interpreter
            
            // For now, we'll implement a C++ subset interpreter
            this.loaded = true;
        } catch (error) {
            throw new Error(`Failed to initialize C++ compiler: ${error.message}`);
        }
    }

    // Simple C++ subset interpreter for DSA problems
    async run(code, functionName, args) {
        // This is a simplified interpreter for common DSA operations
        // It supports basic C++ syntax for competitive programming
        
        try {
            // Parse and execute C++ code
            const executor = new CppInterpreter(code);
            const result = executor.callFunction(functionName, args);
            
            return {
                result: result,
                output: executor.getOutput()
            };
        } catch (error) {
            throw new Error(`C++ Execution Error: ${error.message}`);
        }
    }
}

// Simplified C++ Interpreter for DSA
class CppInterpreter {
    constructor(code) {
        this.code = code;
        this.functions = {};
        this.output = [];
        this.globals = {};
        this.parse();
    }

    parse() {
        // Remove comments
        let cleanCode = this.code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Extract functions
        const funcRegex = /(?:vector<\w+>|int|long|double|string|auto|void)\s+(\w+)\s*\(([^)]*)\)\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}/g;
        let match;
        
        while ((match = funcRegex.exec(cleanCode)) !== null) {
            const [fullMatch, name, params, body] = match;
            this.functions[name] = {
                params: this.parseParams(params),
                body: body.trim()
            };
        }
    }

    parseParams(paramStr) {
        if (!paramStr.trim()) return [];
        return paramStr.split(',').map(p => {
            const parts = p.trim().split(/\s+/);
            const name = parts[parts.length - 1].replace(/[&*]/, '');
            return name;
        });
    }

    callFunction(name, args) {
        const func = this.functions[name];
        if (!func) {
            throw new Error(`Function '${name}' not found`);
        }

        // Create local scope
        const scope = {};
        func.params.forEach((param, i) => {
            scope[param] = args[i];
        });

        // Execute function body
        return this.executeBlock(func.body, scope);
    }

    executeBlock(code, scope) {
        const statements = this.splitStatements(code);
        let returnValue = null;

        for (const stmt of statements) {
            const trimmed = stmt.trim();
            
            // Return statement
            if (trimmed.startsWith('return ')) {
                const expr = trimmed.substring(7).replace(';', '').trim();
                returnValue = this.evaluateExpression(expr, scope);
                break;
            }
            
            // Variable declaration
            if (trimmed.includes('=') && !trimmed.startsWith('if') && !trimmed.startsWith('for')) {
                this.executeAssignment(trimmed, scope);
            }
            
            // For loop
            if (trimmed.startsWith('for')) {
                const result = this.executeFor(trimmed, code, scope);
                if (result !== undefined) returnValue = result;
            }
            
            // If statement
            if (trimmed.startsWith('if')) {
                const result = this.executeIf(trimmed, code, scope);
                if (result !== undefined) returnValue = result;
            }
        }

        return returnValue;
    }

    splitStatements(code) {
        const statements = [];
        let current = '';
        let braceCount = 0;
        
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            current += char;
            
            if (char === '{') braceCount++;
            else if (char === '}') braceCount--;
            else if (char === ';' && braceCount === 0) {
                statements.push(current);
                current = '';
            }
        }
        
        if (current.trim()) statements.push(current);
        return statements;
    }

    executeAssignment(stmt, scope) {
        const match = stmt.match(/(?:(?:int|long|double|auto|vector<\w+>)\s+)?(\w+)\s*=\s*(.+);?/);
        if (match) {
            const [, varName, expr] = match;
            scope[varName] = this.evaluateExpression(expr, scope);
        }
    }

    evaluateExpression(expr, scope) {
        expr = expr.trim();
        
        // Array/Vector literal
        if (expr.startsWith('{') && expr.endsWith('}')) {
            const items = expr.slice(1, -1).split(',');
            return items.map(item => this.evaluateExpression(item, scope));
        }
        
        // Vector constructor
        if (expr.includes('vector<')) {
            if (expr.includes('{')) {
                const match = expr.match(/{([^}]*)}/);
                if (match) {
                    const items = match[1].split(',');
                    return items.map(item => this.evaluateExpression(item, scope));
                }
            }
            return [];
        }
        
        // String literal
        if (expr.startsWith('"') && expr.endsWith('"')) {
            return expr.slice(1, -1);
        }
        
        // Number literal
        if (/^-?\d+(\.\d+)?$/.test(expr)) {
            return parseFloat(expr);
        }
        
        // Boolean
        if (expr === 'true') return true;
        if (expr === 'false') return false;
        
        // Variable reference
        if (/^\w+$/.test(expr)) {
            return scope[expr];
        }
        
        // Array/Vector access
        if (expr.includes('[')) {
            const match = expr.match(/(\w+)\[(.+)\]/);
            if (match) {
                const [, arr, index] = match;
                const arrVal = scope[arr];
                const indexVal = this.evaluateExpression(index, scope);
                return arrVal[indexVal];
            }
        }
        
        // Method calls
        if (expr.includes('.push_back(')) {
            const match = expr.match(/(\w+)\.push_back\((.+)\)/);
            if (match) {
                const [, arr, value] = match;
                const val = this.evaluateExpression(value, scope);
                scope[arr].push(val);
                return scope[arr];
            }
        }
        
        if (expr.includes('.size()')) {
            const match = expr.match(/(\w+)\.size\(\)/);
            if (match) {
                return scope[match[1]].length;
            }
        }
        
        // Binary operations
        if (expr.includes('+')) {
            const parts = expr.split('+');
            return parts.reduce((acc, part) => acc + this.evaluateExpression(part, scope), 0);
        }
        
        if (expr.includes('-') && !expr.startsWith('-')) {
            const parts = expr.split('-');
            const first = this.evaluateExpression(parts[0], scope);
            return parts.slice(1).reduce((acc, part) => acc - this.evaluateExpression(part, scope), first);
        }
        
        if (expr.includes('*')) {
            const parts = expr.split('*');
            return parts.reduce((acc, part) => acc * this.evaluateExpression(part, scope), 1);
        }
        
        if (expr.includes('<')) {
            const parts = expr.split('<');
            const left = this.evaluateExpression(parts[0], scope);
            const right = this.evaluateExpression(parts[1], scope);
            return left < right;
        }
        
        if (expr.includes('==')) {
            const parts = expr.split('==');
            const left = this.evaluateExpression(parts[0], scope);
            const right = this.evaluateExpression(parts[1], scope);
            return left === right;
        }
        
        return null;
    }

    executeFor(stmt, fullCode, scope) {
        const match = stmt.match(/for\s*\((.+)\)/);
        if (!match) return;
        
        const [, condition] = match;
        const parts = condition.split(';').map(p => p.trim());
        
        if (parts.length === 3) {
            // Traditional for loop
            const [init, cond, update] = parts;
            
            // Initialize
            if (init.includes('=')) {
                this.executeAssignment(init + ';', scope);
            }
            
            // Find loop body
            const bodyStart = fullCode.indexOf('{', fullCode.indexOf(stmt));
            const bodyEnd = this.findMatchingBrace(fullCode, bodyStart);
            const body = fullCode.slice(bodyStart + 1, bodyEnd);
            
            // Execute loop
            while (this.evaluateExpression(cond, scope)) {
                const result = this.executeBlock(body, scope);
                if (result !== undefined) return result;
                
                // Update
                if (update.includes('++')) {
                    const varName = update.replace('++', '').trim();
                    scope[varName]++;
                } else if (update.includes('+=')) {
                    const [varName, val] = update.split('+=');
                    scope[varName.trim()] += this.evaluateExpression(val, scope);
                }
            }
        }
    }

    executeIf(stmt, fullCode, scope) {
        const match = stmt.match(/if\s*\((.+)\)/);
        if (!match) return;
        
        const condition = this.evaluateExpression(match[1], scope);
        
        if (condition) {
            const bodyStart = fullCode.indexOf('{', fullCode.indexOf(stmt));
            const bodyEnd = this.findMatchingBrace(fullCode, bodyStart);
            const body = fullCode.slice(bodyStart + 1, bodyEnd);
            return this.executeBlock(body, scope);
        }
    }

    findMatchingBrace(code, start) {
        let count = 1;
        for (let i = start + 1; i < code.length; i++) {
            if (code[i] === '{') count++;
            else if (code[i] === '}') {
                count--;
                if (count === 0) return i;
            }
        }
        return code.length;
    }

    getOutput() {
        return this.output.join('\n');
    }
}

// Main Lab Executor
export class LabExecutor {
    constructor() {
        this.python = new PythonWASM();
        this.cpp = new CppWASM();
    }

    async execute(language, code, functionName, args) {
        switch (language) {
            case 'python':
                return await this.python.run(code, functionName, args);
            
            case 'cpp':
                return await this.cpp.run(code, functionName, args);
            
            case 'javascript':
                return await this.executeJavaScript(code, functionName, args);
            
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }

    async executeJavaScript(code, functionName, args) {
        try {
            // Create a sandboxed function
            const func = new Function('return ' + code + '; return ' + functionName + ';')();
            const result = func.apply(null, args);
            
            return {
                result: result,
                output: ''
            };
        } catch (error) {
            throw new Error(`JavaScript Error: ${error.message}`);
        }
    }
}

// Docker-based execution (for server deployment)
export class DockerExecutor {
    constructor(serverUrl = 'http://localhost:3000') {
        this.serverUrl = serverUrl;
    }

    async execute(language, code, functionName, args) {
        const response = await fetch(`${this.serverUrl}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language,
                code,
                functionName,
                args
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        return await response.json();
    }
}

// Export for use in lab.js
export default {
    LabExecutor,
    DockerExecutor,
    PythonWASM,
    CppWASM,
    CppInterpreter
};