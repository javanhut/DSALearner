import { UI } from '../main.js';
import { State } from './state.js';

export function renderCoach(node, state, topicId, itemId, content){
  node.innerHTML = '';
  const c = document.createElement('div');
  c.className = 'section';
  c.innerHTML = `<h2>Coach</h2>
    <div class="muted">Hints, tips, and intuition builders appear here. Use them sparingly to strengthen retrieval.</div>`;

  if(topicId && itemId){
    const topic = content.topics.find(t=>t.id===topicId);
    const item = topic.items.find(i=>i.id===itemId);
    const it = State.ensureItem(state, topicId, itemId);
    const list = document.createElement('div');
    list.className = 'list';

    // Tiered hints (lock deeper hints until attempts/time)
    const attempts = it.quizAttempts + it.codeAttempts;
    const now = Date.now();
    const secondsSinceStart = it.last ? Math.round((now - it.last)/1000) : 0;

    const unlocked = Math.min(item.hints.length, 1 + Math.floor(attempts/2) + Math.floor(secondsSinceStart/180));
    for(let i=0;i<unlocked;i++){
      const h = document.createElement('div');
      h.className = 'hint';
      h.innerHTML = `<strong>Hint ${i+1}:</strong> ${item.hints[i]}`;
      list.appendChild(h);
    }
    if(unlocked < item.hints.length){
      const btn = document.createElement('button');
      btn.className = 'ghost';
      btn.textContent = `Unlock more hints (${item.hints.length - unlocked} hidden)`;
      btn.onclick = ()=>{
        it.codeAttempts += 1; // soft cost to unlock
        State.save(state);
        renderCoach(node, state, topicId, itemId, content);
      };
      list.appendChild(btn);
    }

    c.appendChild(list);

    const tips = document.createElement('div');
    tips.className = 'section';
    tips.innerHTML = `<h3>Neuroscience Tips</h3>
      <ul>
        <li><b>Active recall:</b> attempt before reading hints.</li>
        <li><b>Interleave:</b> mix patterns (e.g., two-pointers vs sliding window).</li>
        <li><b>Spaced repetition:</b> revisit on the due schedule.</li>
        <li><b>Deliberate practice:</b> target weak spots shown in feedback.</li>
        <li><b>Explain it:</b> write a justification to solidify schemas.</li>
      </ul>`;
    c.appendChild(tips);

    // AI Coach (gpt-oss via local Tutor API)
    const ai = document.createElement('div');
    ai.className = 'section';
    const topic = content.topics.find(t=>t.id===topicId);
    const item = topic.items.find(i=>i.id===itemId);
    const defaultUrl = localStorage.getItem('aiCoachUrl') || 'http://localhost:8000/tutor/ask';
    ai.innerHTML = `
      <h3>AI Coach (gpt-oss)</h3>
      <div class="muted">Ask for hints or explanations powered by your local gpt-oss tutor.</div>
      <div class="row" style="gap:6px; margin:6px 0">
        <input id="aiCoachUrl" type="text" value="${defaultUrl}" placeholder="Tutor API endpoint (POST /tutor/ask)" />
        <button id="saveAiUrl" class="ghost">Save</button>
      </div>
      <textarea id="aiQ" rows="4" class="code editor" placeholder="Ask about ${item.title}…"></textarea>
      <div class="row" style="gap:6px; margin-top:6px">
        <button id="askAi" class="btn">Ask Coach</button>
        <span id="aiStatus" class="muted"></span>
      </div>
      <div id="aiA" class="section" style="margin-top:8px"><div class="muted">Answer will appear here.</div></div>
    `;
    c.appendChild(ai);

    const aiUrlInput = ai.querySelector('#aiCoachUrl');
    ai.querySelector('#saveAiUrl').onclick = () => {
      localStorage.setItem('aiCoachUrl', aiUrlInput.value.trim());
      ai.querySelector('#aiStatus').textContent = 'Saved URL';
      setTimeout(()=> ai.querySelector('#aiStatus').textContent='', 1200);
    };
    ai.querySelector('#askAi').onclick = async () => {
      const url = (aiUrlInput.value||'').trim();
      if(!url){ alert('Set Tutor API URL first'); return; }
      const sys = `You are a DSA tutor. Topic: ${topic.title}. Item: ${item.title}. Brief: ${item.brief}. Provide a hint first, then a solution outline, then complexity.`;
      const q = ai.querySelector('#aiQ').value || `Explain ${item.title} and guide me step by step.`;
      const body = { question: `${sys}\n\nStudent: ${q}` };
      const btn = ai.querySelector('#askAi');
      const status = ai.querySelector('#aiStatus');
      const out = ai.querySelector('#aiA');
      btn.disabled = true; status.textContent = 'Asking…'; out.innerHTML = '<div class="muted">Thinking…</div>';
      try{
        const resp = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
        const json = await resp.json();
        const ans = json.answer || JSON.stringify(json);
        out.innerHTML = `<div>${ans.replace(/\n/g,'<br>')}</div>`;
        status.textContent = 'Done';
      }catch(e){ out.innerHTML = `<div class="danger-text">${e}</div>`; status.textContent = 'Error'; }
      finally{ btn.disabled = false; setTimeout(()=> status.textContent='', 1500); }
    };
  }

  node.appendChild(c);
}
