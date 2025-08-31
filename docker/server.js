// Docker-based Code Execution Server
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;
const EXEC_DIR = '/tmp/code-exec';

// Ensure execution directory exists
async function ensureExecDir() {
    try {
        await fs.mkdir(EXEC_DIR, { recursive: true });
    } catch (err) {
        console.error('Failed to create exec directory:', err);
    }
}

// Execute Python code
async function executePython(code, functionName, args) {
    const id = crypto.randomBytes(8).toString('hex');
    const fileName = path.join(EXEC_DIR, `${id}.py`);
    
    const wrapper = `
import json
import sys

${code}

# Call the function with provided args
try:
    result = ${functionName}(*json.loads('${JSON.stringify(args)}'))
    print(json.dumps({"result": result, "output": ""}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
`;

    await fs.writeFile(fileName, wrapper);
    
    return new Promise((resolve, reject) => {
        exec(`python3 ${fileName}`, { timeout: 5000 }, async (error, stdout, stderr) => {
            // Clean up
            try { await fs.unlink(fileName); } catch {}
            
            if (error) {
                reject(new Error(stderr || error.message));
            } else {
                try {
                    const result = JSON.parse(stdout);
                    if (result.error) {
                        reject(new Error(result.error));
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(new Error('Failed to parse Python output: ' + stdout));
                }
            }
        });
    });
}

// Execute C++ code
async function executeCpp(code, functionName, args) {
    const id = crypto.randomBytes(8).toString('hex');
    const cppFile = path.join(EXEC_DIR, `${id}.cpp`);
    const exeFile = path.join(EXEC_DIR, `${id}.out`);
    
    // Create C++ wrapper
    const wrapper = `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <map>
#include <set>

using namespace std;

${code}

// JSON serialization helpers
template<typename T>
string toJson(const T& val);

template<>
string toJson(const int& val) { return to_string(val); }

template<>
string toJson(const long& val) { return to_string(val); }

template<>
string toJson(const double& val) { return to_string(val); }

template<>
string toJson(const string& val) { 
    return "\\"" + val + "\\""; 
}

template<typename T>
string toJson(const vector<T>& vec) {
    string result = "[";
    for (size_t i = 0; i < vec.size(); i++) {
        result += toJson(vec[i]);
        if (i < vec.size() - 1) result += ",";
    }
    result += "]";
    return result;
}

int main() {
    try {
        // Parse and call function based on args
        ${generateCppCall(functionName, args)}
    } catch (const exception& e) {
        cout << "{\\"error\\": \\"" << e.what() << "\\"}" << endl;
        return 1;
    }
    return 0;
}
`;

    await fs.writeFile(cppFile, wrapper);
    
    return new Promise((resolve, reject) => {
        // Compile
        exec(`g++ -std=c++17 -O2 -o ${exeFile} ${cppFile}`, async (compileError, compileStdout, compileStderr) => {
            if (compileError) {
                // Clean up
                try { await fs.unlink(cppFile); } catch {}
                reject(new Error('Compilation failed: ' + compileStderr));
                return;
            }
            
            // Execute
            exec(exeFile, { timeout: 5000 }, async (runError, runStdout, runStderr) => {
                // Clean up
                try { 
                    await fs.unlink(cppFile); 
                    await fs.unlink(exeFile);
                } catch {}
                
                if (runError) {
                    reject(new Error(runStderr || runError.message));
                } else {
                    try {
                        const result = JSON.parse(runStdout);
                        if (result.error) {
                            reject(new Error(result.error));
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        // If not JSON, treat as raw output
                        resolve({ result: runStdout.trim(), output: '' });
                    }
                }
            });
        });
    });
}

// Generate C++ function call based on args
function generateCppCall(functionName, args) {
    // Convert JS args to C++ literals
    const cppArgs = args.map((arg, i) => {
        if (Array.isArray(arg)) {
            const type = typeof arg[0] === 'number' ? 'int' : 'string';
            return `vector<${type}> arg${i} = {${arg.map(v => 
                typeof v === 'string' ? `"${v}"` : v
            ).join(', ')}};`;
        } else if (typeof arg === 'string') {
            return `string arg${i} = "${arg}";`;
        } else {
            return `auto arg${i} = ${arg};`;
        }
    }).join('\n        ');
    
    const callArgs = args.map((_, i) => `arg${i}`).join(', ');
    
    return `
        ${cppArgs}
        auto result = ${functionName}(${callArgs});
        cout << "{\\"result\\": " << toJson(result) << "}" << endl;
    `;
}

// Execute JavaScript code
async function executeJavaScript(code, functionName, args) {
    const id = crypto.randomBytes(8).toString('hex');
    const fileName = path.join(EXEC_DIR, `${id}.js`);
    
    const wrapper = `
${code}

// Call the function with provided args
try {
    const result = ${functionName}(...${JSON.stringify(args)});
    console.log(JSON.stringify({ result, output: '' }));
} catch (error) {
    console.log(JSON.stringify({ error: error.message }));
    process.exit(1);
}
`;

    await fs.writeFile(fileName, wrapper);
    
    return new Promise((resolve, reject) => {
        exec(`node ${fileName}`, { timeout: 5000 }, async (error, stdout, stderr) => {
            // Clean up
            try { await fs.unlink(fileName); } catch {}
            
            if (error) {
                reject(new Error(stderr || error.message));
            } else {
                try {
                    const result = JSON.parse(stdout);
                    if (result.error) {
                        reject(new Error(result.error));
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(new Error('Failed to parse output: ' + stdout));
                }
            }
        });
    });
}

// Main execution endpoint
app.post('/execute', async (req, res) => {
    const { language, code, functionName, args } = req.body;
    
    if (!code || !functionName) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    try {
        let result;
        
        switch (language) {
            case 'python':
                result = await executePython(code, functionName, args || []);
                break;
            case 'cpp':
                result = await executeCpp(code, functionName, args || []);
                break;
            case 'javascript':
                result = await executeJavaScript(code, functionName, args || []);
                break;
            default:
                return res.status(400).json({ error: `Unsupported language: ${language}` });
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', languages: ['python', 'cpp', 'javascript'] });
});

// Start server
ensureExecDir().then(() => {
    app.listen(PORT, () => {
        console.log(`Code execution server running on port ${PORT}`);
        console.log('Supported languages: Python, C++, JavaScript');
    });
});