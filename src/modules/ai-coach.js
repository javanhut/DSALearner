// AI Coach Integration Module
// Provides context-aware help and guidance using local GPT-OSS

class AICoach {
  constructor() {
    this.baseUrl = 'http://localhost:8000'; // Local tutor API
    this.isEnabled = false;
    this.conversationHistory = [];
    this.currentContext = {
      topic: null,
      problem: null,
      mode: null,
      userProgress: null,
      strugglingWith: null
    };
    this.init();
  }

  async init() {
    await this.checkConnection();
    this.setupUI();
    this.bindEvents();
    
    // If enabled, show welcome message
    if (this.isEnabled) {
      setTimeout(() => {
        this.addMessage('assistant', '👋 Hi! I\'m your local DSA tutor powered by GPT-OSS. I can help you understand concepts, debug code, provide hints, and guide your learning journey. What would you like to work on?');
      }, 1000);
    }
  }

  async checkConnection() {
    try {
      console.log('🔍 AI Coach: Checking connection to local GPT-OSS...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch(`${this.baseUrl}/health`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        this.isEnabled = true;
        console.log('✅ AI Coach: Connected to local GPT-OSS');
      } else {
        this.isEnabled = false;
        console.log('❌ AI Coach: Health check failed with status:', response.status);
      }
    } catch (error) {
      this.isEnabled = false;
      if (error.name === 'AbortError') {
        console.log('❌ AI Coach: Connection timeout - services may not be running');
      } else {
        console.log('❌ AI Coach: Connection failed:', error.message);
      }
    }
  }

  setupUI() {
    const coachContent = document.getElementById('coach-content');
    if (!coachContent) return;

    coachContent.innerHTML = `
      <div id="coach-status">
        ${this.isEnabled ? 
          '<div class="coach-status-enabled">🟢 Local GPT-OSS Ready</div>' :
          '<div class="coach-status-disabled">🔴 GPT-OSS Disconnected</div>'
        }
      </div>
      
      ${!this.isEnabled ? `
        <div class="connection-setup" style="margin-top: 10px;">
          <p style="font-size: 12px; color: var(--muted); margin-bottom: 8px;">
            🚀 <strong>Start AI Coach Services:</strong>
          </p>
          <div style="background: var(--bg-secondary); padding: 10px; border-radius: 4px; margin: 8px 0;">
            <code style="display: block; font-size: 11px; margin: 2px 0;">cd ai_coach</code>
            <code style="display: block; font-size: 11px; margin: 2px 0;">./up.sh</code>
          </div>
          <p style="font-size: 11px; color: var(--muted); margin: 4px 0;">
            This will start Ollama (GPT-OSS), Chroma DB, and the Tutor API locally.
          </p>
          <button id="retryConnectionBtn" class="btn" style="width: 100%; padding: 6px; font-size: 12px;">
            🔄 Retry Connection
          </button>
          <div id="startup-tips" style="margin-top: 8px; font-size: 11px; color: var(--muted);">
            <details>
              <summary style="cursor: pointer;">Startup Tips</summary>
              <ul style="margin: 8px 0; padding-left: 16px;">
                <li>First startup downloads ~20GB model</li>
                <li>Check: <code>podman ps</code> to see running containers</li>
                <li>Logs: <code>podman logs dsa_tutor_api</code></li>
                <li>Stop: <code>cd ai_coach && ./down.sh</code></li>
              </ul>
            </details>
          </div>
        </div>
      ` : ''}
      
      <div id="chat-container" style="display: ${this.isEnabled ? 'block' : 'none'}">
        <div id="chat-messages" style="max-height: 300px; overflow-y: auto; 
                                      border: 1px solid var(--border); border-radius: 4px; 
                                      padding: 8px; margin: 10px 0; background: var(--bg);">
          <div class="coach-message" style="font-size: 12px; color: var(--muted);">
            👋 Hi! I'm your AI DSA coach. I can help you understand concepts, debug code, 
            provide hints, and guide your learning journey. What would you like to work on?
          </div>
        </div>
        
        <div style="display: flex; gap: 4px;">
          <input type="text" id="chatInput" placeholder="Ask me anything about DSA..." 
                 style="flex: 1; padding: 6px; border: 1px solid var(--border); 
                        border-radius: 4px; font-size: 12px;">
          <button id="sendBtn" class="btn" style="padding: 6px 12px; font-size: 12px;">
            Send
          </button>
        </div>
        
        <div class="quick-actions" style="margin-top: 8px;">
          <button class="coach-quick-btn" data-prompt="explain-concept">💡 Explain Concept</button>
          <button class="coach-quick-btn" data-prompt="give-hint">💭 Give Hint</button>
          <button class="coach-quick-btn" data-prompt="debug-help">🐛 Debug Help</button>
          <button class="coach-quick-btn" data-prompt="best-practices">⭐ Best Practices</button>
        </div>
      </div>
    `;

    // Add CSS for coach UI
    this.addCoachStyles();
  }

  addCoachStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .coach-status-enabled {
        font-size: 12px;
        color: var(--ok);
        font-weight: bold;
      }
      
      .coach-status-disabled {
        font-size: 12px;
        color: var(--error);
        font-weight: bold;
      }
      
      .coach-status-checking {
        font-size: 12px;
        color: var(--warning);
        font-weight: bold;
      }
      
      .coach-message {
        margin: 8px 0;
        padding: 6px;
        border-radius: 4px;
        line-height: 1.4;
      }
      
      .coach-message.user {
        background: var(--accent);
        color: white;
        margin-left: 20px;
        text-align: right;
      }
      
      .coach-message.assistant {
        background: var(--bg-secondary);
        margin-right: 20px;
      }
      
      .coach-quick-btn {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 10px;
        cursor: pointer;
        margin: 2px;
        transition: background 0.2s;
      }
      
      .coach-quick-btn:hover {
        background: var(--elev);
      }
      
      .coach-typing {
        font-style: italic;
        color: var(--muted);
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    // Connection retry and interaction buttons
    document.addEventListener('click', (e) => {
      if (e.target.id === 'retryConnectionBtn') {
        this.retryConnection();
      } else if (e.target.id === 'sendBtn') {
        this.sendMessage();
      } else if (e.target.classList.contains('coach-quick-btn')) {
        this.handleQuickAction(e.target.dataset.prompt);
      }
    });

    // Enter key in chat input
    document.addEventListener('keypress', (e) => {
      if (e.target.id === 'chatInput' && e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  async retryConnection() {
    // Show checking status
    const statusDiv = document.getElementById('coach-status');
    if (statusDiv) {
      statusDiv.innerHTML = '<div class="coach-status-checking">🟡 Checking connection...</div>';
    }
    
    await this.checkConnection();
    this.setupUI(); // Refresh UI
    
    if (this.isEnabled) {
      this.addMessage('assistant', '🎉 Connected to local GPT-OSS! Ready to help you with DSA. What would you like to learn?');
    } else {
      this.addMessage('assistant', '❌ Still cannot connect. Please ensure the AI Coach containers are running:\n\n```\ncd ai_coach\n./up.sh\n```\n\nThis may take a few minutes on first run to download the model.');
    }
  }

  // Add diagnostic information
  async getDiagnostics() {
    const diagnostics = {
      baseUrl: this.baseUrl,
      isEnabled: this.isEnabled,
      timestamp: new Date().toISOString(),
      services: {}
    };

    // Check individual services
    const services = [
      { name: 'Tutor API', url: `${this.baseUrl}/health`, port: '8000' },
      { name: 'Ollama', url: 'http://localhost:11434/api/tags', port: '11434' },
      { name: 'Chroma DB', url: 'http://localhost:8001/api/v1/heartbeat', port: '8001' }
    ];

    for (const service of services) {
      try {
        const response = await fetch(service.url, { 
          method: 'GET',
          signal: AbortSignal.timeout(2000)
        });
        diagnostics.services[service.name] = {
          status: response.ok ? 'running' : 'error',
          port: service.port,
          statusCode: response.status
        };
      } catch (error) {
        diagnostics.services[service.name] = {
          status: 'disconnected',
          port: service.port,
          error: error.message
        };
      }
    }

    return diagnostics;
  }

  updateContext(context) {
    this.currentContext = { ...this.currentContext, ...context };
  }

  buildContextualQuestion(userMessage) {
    const context = this.currentContext;
    let contextInfo = '';

    if (context.topic) {
      contextInfo += `Currently studying: ${context.topic}. `;
    }
    if (context.problem) {
      contextInfo += `Working on problem: ${context.problem}. `;
    }
    if (context.mode) {
      contextInfo += `Current mode: ${context.mode}. `;
    }
    if (context.strugglingWith) {
      contextInfo += `Student struggling with: ${context.strugglingWith}. `;
    }

    // Prepend context to user message
    return contextInfo ? `${contextInfo}\n\nQuestion: ${userMessage}` : userMessage;
  }

  async sendMessage(customMessage = null) {
    if (!this.isEnabled) return;

    const chatInput = document.getElementById('chatInput');
    const message = customMessage || chatInput?.value.trim();
    
    if (!message) return;

    // Clear input
    if (chatInput) chatInput.value = '';

    // Add user message
    this.addMessage('user', message);

    // Show typing indicator
    this.addTypingIndicator();

    try {
      const response = await this.callLocalGPT(message);
      this.removeTypingIndicator();
      this.addMessage('assistant', response);
    } catch (error) {
      this.removeTypingIndicator();
      this.addMessage('assistant', '❌ Sorry, I encountered an error. Please ensure the AI Coach containers are running.');
      console.error('AI Coach error:', error);
    }
  }

  async callLocalGPT(userMessage, code = null) {
    const contextualQuestion = this.buildContextualQuestion(userMessage);
    
    const requestBody = {
      question: contextualQuestion,
      code: code,
      language: 'python', // Default language
      k: 5 // Number of relevant docs to retrieve
    };

    const response = await fetch(`${this.baseUrl}/tutor/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const assistantMessage = data.answer;

    // Update conversation history (simplified for local model)
    this.conversationHistory.push(
      { role: 'user', content: userMessage },
      { role: 'assistant', content: assistantMessage }
    );

    // Keep conversation history manageable
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    return assistantMessage;
  }

  addMessage(role, content) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `coach-message ${role}`;
    messageDiv.innerHTML = content.replace(/\n/g, '<br>');
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  addTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'coach-message assistant coach-typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '💭 Thinking...';
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  handleQuickAction(action) {
    const context = this.currentContext;
    let message = '';

    switch (action) {
      case 'explain-concept':
        if (context.topic) {
          message = `Can you explain the key concepts in ${context.topic}? What are the main algorithms and when should I use them?`;
        } else {
          message = 'Can you explain the current concept I\'m studying?';
        }
        break;

      case 'give-hint':
        if (context.problem) {
          message = `I'm working on ${context.problem}. Can you give me a hint without spoiling the solution?`;
        } else {
          message = 'Can you give me a hint for the current problem?';
        }
        break;

      case 'debug-help':
        message = 'I\'m having trouble with my code. Can you help me debug it?';
        break;

      case 'best-practices':
        if (context.topic) {
          message = `What are the best practices and common pitfalls for ${context.topic}?`;
        } else {
          message = 'What are some general best practices for DSA problems?';
        }
        break;
    }

    this.sendMessage(message);
  }

  // Public methods for integration with main app
  onTopicChange(topic) {
    this.updateContext({ topic: topic.title });
    if (this.isEnabled) {
      this.addMessage('assistant', `📚 Now studying: ${topic.title}. ${topic.summary} Need help with anything?`);
    }
  }

  onProblemChange(problem) {
    this.updateContext({ problem: problem.title });
    if (this.isEnabled) {
      this.addMessage('assistant', `🎯 Working on: ${problem.title}. This is a ${problem.difficulty} level problem. Ready to tackle it?`);
    }
  }

  onModeChange(mode) {
    this.updateContext({ mode });
  }

  onStruggle(area) {
    this.updateContext({ strugglingWith: area });
    if (this.isEnabled) {
      this.addMessage('assistant', `I noticed you might be struggling with ${area}. Would you like me to explain it differently or provide some guidance?`);
    }
  }

  // Context-aware suggestions
  suggestHelp(context) {
    if (!this.isEnabled) return;
    
    const suggestions = [
      '💡 Need an explanation?',
      '🔍 Want to see a different approach?',
      '⚡ Looking for optimization tips?',
      '🎯 Need practice problems?'
    ];
    
    // Show contextual help options
    setTimeout(() => {
      if (Math.random() < 0.3) { // 30% chance to show proactive help
        const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        this.addMessage('assistant', `${suggestion} Just ask! I'm here to help. 😊`);
      }
    }, 30000); // After 30 seconds of inactivity
  }

  // Add method for code debugging help
  async offerCodeHelp(code, error, language = 'python') {
    if (!this.isEnabled) return;
    
    const debugMessage = error ? 
      `I'm getting an error with this code: ${error}` : 
      'Can you help me debug this code?';
    
    this.addMessage('user', `${debugMessage}\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\``);
    this.addTypingIndicator();
    
    try {
      const response = await this.callLocalGPT(debugMessage, code);
      this.removeTypingIndicator();
      this.addMessage('assistant', response);
    } catch (error) {
      this.removeTypingIndicator();
      this.addMessage('assistant', '❌ Sorry, I encountered an error while analyzing your code.');
      console.error('Code debug error:', error);
    }
  }

  // Track user activity for proactive suggestions
  trackActivity(action) {
    this.lastActivity = Date.now();
    
    // Reset inactivity timer
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    
    // Set new inactivity timer
    this.inactivityTimer = setTimeout(() => {
      this.suggestHelp();
    }, 45000); // 45 seconds of inactivity
  }

  // Add method to provide algorithm complexity explanations
  explainComplexity(algorithm) {
    if (!this.isEnabled) return;
    
    const message = `Can you explain the time and space complexity of ${algorithm} and why it has that complexity?`;
    this.sendMessage(message);
  }

  // Method to ask for step-by-step walkthrough
  requestWalkthrough(problem) {
    if (!this.isEnabled) return;
    
    const message = `Can you walk me through solving "${problem}" step by step? I'd like to understand the thought process.`;
    this.sendMessage(message);
  }
}

// Export for use in main application
export { AICoach };