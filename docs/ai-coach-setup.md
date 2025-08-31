# 🤖 AI Coach Setup Guide

The DSA Learner includes an integrated AI Coach powered by **local GPT-OSS** to provide personalized tutoring and guidance **without requiring API keys or internet access**.

## 🚀 Quick Setup

1. **Start AI Coach Services**
   ```bash
   cd ai_coach
   ./up.sh
   ```
   
   This will start:
   - **Ollama** with GPT-OSS 20B model (port 11434)
   - **Chroma DB** for knowledge retrieval (port 8001)  
   - **Tutor API** that connects everything (port 8000)

2. **First Run Setup**
   - First startup downloads ~20GB GPT-OSS model
   - This may take 10-15 minutes depending on internet speed
   - Subsequent startups are much faster (cached model)

3. **Verify Connection**
   - Open DSA Learner in your browser
   - Look for **"🟢 Local GPT-OSS Ready"** in the AI Coach panel
   - If disconnected, click **"🔄 Retry Connection"**

4. **Start Learning**
   - No API keys needed - everything runs locally!
   - Use the chat interface to ask questions
   - Click quick action buttons for common requests

## 💬 How to Use the AI Coach

### **Interactive Chat**
- Type questions in the chat input at the bottom of the coach panel
- Ask about concepts, algorithms, debugging help, or study strategies
- The coach understands your current context (topic, problem, mode)

### **Quick Actions**
- **💡 Explain Concept**: Get explanations for current topic
- **💭 Give Hint**: Receive hints without spoiling solutions
- **🐛 Debug Help**: Get assistance with code problems  
- **⭐ Best Practices**: Learn optimization tips and common pitfalls

### **Contextual Help**
- **🤖 Ask AI Coach** button: Get specific help for current problem
- **Auto-suggestions**: Coach offers proactive help during struggles
- **Progress tracking**: Coach celebrates completions and suggests next steps

## 🎯 Example Interactions

### **Getting Concept Explanations**
```
You: "Can you explain how Dijkstra's algorithm works?"

Coach: "Dijkstra's algorithm finds shortest paths by using a greedy approach:

1. Start with source node, set distance to 0
2. Use a priority queue to always process nearest unvisited node  
3. For each neighbor, check if path through current node is shorter
4. Update distances and continue until all nodes processed

The key insight is that once we visit a node, we've found its shortest path because we always process the nearest node first. Would you like me to walk through a specific example?"
```

### **Getting Problem Hints**
```
You: "I'm stuck on the Two Sum problem"

Coach: "Here's a hint without spoiling the solution:

Think about what you need to find for each number - you need its complement that adds up to the target. Instead of checking every pair (O(n²)), consider what data structure lets you quickly check if a complement exists.

What if you could store numbers you've seen and look them up instantly? 🤔"
```

### **Debugging Code**
```
You: "My binary search keeps giving wrong answers"

Coach: "Let me help debug this! Can you share your code? Common binary search issues include:

1. Off-by-one errors in loop conditions
2. Integer overflow when calculating mid = (left + right) / 2
3. Incorrect update of left/right boundaries
4. Wrong comparison logic for target

Share your code and I'll spot the issue! 🔍"
```

## 🎨 Coach Features

### **Context Awareness**
- Knows what topic you're studying
- Understands current problem difficulty
- Adapts explanations to your progress level
- Remembers conversation history

### **Learning Styles**
- **Visual learners**: Describes algorithm visualizations  
- **Step-by-step**: Breaks down complex problems
- **Analogies**: Uses real-world examples
- **Code-focused**: Provides implementation details

### **Proactive Help**
- Detects when you're struggling with quizzes
- Offers encouragement after completing problems
- Suggests related concepts to explore
- Provides study recommendations

## 🛡️ Privacy & Security

- **Fully Local**: No data sent to external services
- **No API Keys**: No need for OpenAI or other cloud accounts
- **Conversation Privacy**: All chats stay on your machine
- **Offline Capable**: Works without internet after initial setup

## 🔧 Troubleshooting

### **Services Won't Start**
1. **Check Podman/Docker**: Ensure podman is installed and running
   ```bash
   podman --version
   podman system info
   ```

2. **Port Conflicts**: Check if ports 8000, 8001, 11434 are in use
   ```bash
   netstat -tulpn | grep -E ":(8000|8001|11434)"
   ```

3. **Insufficient Resources**: GPT-OSS 20B needs ~12GB RAM
   - Check system resources: `htop` or `free -h`
   - Consider using smaller model if needed

### **Connection Failed**
1. **Check Service Status**:
   ```bash
   podman ps
   podman logs dsa_tutor_api
   podman logs dsa_ollama
   ```

2. **Health Checks**:
   - Tutor API: http://localhost:8000/health
   - Ollama: http://localhost:11434/api/tags  
   - Chroma: http://localhost:8001/api/v1/heartbeat

3. **Restart Services**:
   ```bash
   cd ai_coach
   ./down.sh
   ./up.sh
   ```

### **Model Download Issues**
- **Slow Download**: GPT-OSS 20B is large (~20GB)
- **Network Timeout**: Use stable internet connection
- **Disk Space**: Ensure sufficient storage (~25GB free)
- **Alternative**: Try smaller model by editing `.env` file

## 📚 Best Practices

### **Effective Questions**
- Be specific about what you're struggling with
- Include code snippets when debugging
- Ask follow-up questions for clarification
- Request examples for complex concepts

### **Learning Strategy**
- Use hints before looking at full solutions
- Ask "why" questions to understand reasoning
- Request complexity analysis explanations
- Ask for alternative approaches

### **Study Sessions**
- Start conversations with current learning goals
- Ask for study plan recommendations
- Request progress assessments
- Get suggestions for next topics

## 🎓 Educational Philosophy

The AI Coach is designed to:
- **Guide, don't solve**: Provide hints and direction rather than complete solutions
- **Build understanding**: Focus on concepts and reasoning, not just answers  
- **Encourage exploration**: Suggest different approaches and optimizations
- **Personalize learning**: Adapt to individual progress and learning style
- **Build confidence**: Provide encouragement and celebrate achievements

---

**Ready to start learning with your AI Coach? Get your API key and dive in!** 🚀