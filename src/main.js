import { content } from './modules/content.js';
import { State } from './modules/state.js';
import { pickNextForReview, nextByDifficulty } from './modules/scheduler.js';
import { renderCoach } from './modules/coach.js';
import { renderProblem } from './modules/problem.js';
import { renderQuiz } from './modules/quiz.js';
import { renderLearn } from './modules/learn.js';
import { renderGame } from './modules/games.js';
import { renderLab } from './modules/lab.js';

const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const coach = document.getElementById('coach');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const state = State.load();

function openModal(title, bodyNode){
  modalTitle.textContent = title;
  modalBody.innerHTML = '';
  if(bodyNode) modalBody.appendChild(bodyNode);
  modal.classList.remove('hidden');
}
modalClose.onclick = ()=> modal.classList.add('hidden');

document.getElementById('resetProgressBtn').onclick = () => {
  if(confirm('Reset all local progress?')){
    State.reset();
    location.reload();
  }
};

document.getElementById('reviewQueueBtn').onclick = () => {
  const next = pickNextForReview(state, content);
  if(!next){
    alert('Review queue is empty. Do a Learn/Practice first!');
    return;
  }
  navigateTo(next.topicId, next.itemId, next.mode);
};

document.getElementById('labBtn').onclick = () => {
  main.innerHTML = '';
  renderLab(main);
};

document.getElementById('startPathBtn').onclick = () => {
  const next = nextByDifficulty(state, content);
  if(!next){
    alert('All items are mastered — great job!');
    return;
  }
  navigateTo(next.topicId, next.itemId, 'learn');
};

document.getElementById('aboutLink').onclick = (e) => {
  e.preventDefault();
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="section">
      <h2>DSA Learner</h2>
      <p>Master data structures and algorithms using retrieval practice, spaced repetition, interleaving, and deliberate code drills. No installs needed — just your browser.</p>
      <ul>
        <li><b>Mastery gating:</b> quizzes + code tests + justification.</li>
        <li><b>Hints:</b> tiered, Socratic prompts, intuition builders.</li>
        <li><b>Optimals:</b> see optimal code after demonstrating mastery.</li>
        <li><b>Review:</b> smart scheduling with lightweight SM-2.</li>
      </ul>
    </div>`;
  openModal('About', div);
};

function renderSidebar(){
  sidebar.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'list';
  content.topics.forEach(t => {
    const box = document.createElement('div');
    box.className = 'topic';
    const pct = Math.round(State.topicProgress(state, t.id) * 100);
    box.innerHTML = `
      <div class="row">
        <div><strong>${t.title}</strong></div>
        <span class="spacer"></span>
        <span class="pill"><small class="muted">${pct}%</small></span>
      </div>
      <div class="muted" style="font-size:12px">${t.summary}</div>
      <div class="progress" aria-label="progress"><span style="width:${pct}%"></span></div>
    `;
    box.onclick = () => renderTopic(t.id);
    list.appendChild(box);
  });
  sidebar.appendChild(list);
}

function renderTopic(topicId){
  const topic = content.topics.find(t=>t.id===topicId);
  const prog = state.progress[topicId] || {};
  main.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'section';
  header.innerHTML = `
    <h2>${topic.title}</h2>
    <div class="muted">${topic.summary}</div>
    <div class="kpi">
      <div class="box">Mastered: <b class="${prog.mastered?'ok':''}">${prog.mastered? 'Yes':'No'}</b></div>
      <div class="box">Items: <b>${topic.items.length}</b></div>
      <div class="box">Progress: <b>${Math.round(State.topicProgress(state, topicId)*100)}%</b></div>
    </div>
  `;
  main.appendChild(header);

  const items = document.createElement('div');
  items.className = 'grid cols-2';
  // Sort items by difficulty level: easy < medium < hard
  const order = {'easy':1,'easy-medium':2,'medium':3,'medium-hard':4,'hard':5};
  const sorted = [...topic.items].sort((a,b)=> (order[a.difficulty]||9)-(order[b.difficulty]||9));
  sorted.forEach(item => {
    const p = (prog.items || {})[item.id] || {};
    const mastered = p.mastered ? 'ok' : '';
    const card = document.createElement('div');
    card.className = 'section clickable';
    card.innerHTML = `
      <div class="row">
        <div><strong>${item.title}</strong></div>
        <span class="spacer"></span>
        <span class="pill">${item.difficulty||'—'}</span>
        <span class="pill ${mastered}">${p.mastered? 'Mastered' : 'In Progress'}</span>
      </div>
      <div class="muted" style="margin:6px 0">${item.brief}</div>
      <div class="row">
        <button class="tab" data-mode="learn">Learn</button>
        <button class="tab" data-mode="quiz">Quiz</button>
        <button class="tab" data-mode="practice">Practice</button>
        <span class="spacer"></span>
        <button class="ghost" data-mode="review">Review Next</button>
      </div>
    `;
    // Clicking the whole card opens Learn by default (unless a button is clicked)
    card.addEventListener('click', (e) => {
      if(e.target.closest('button')) return;
      navigateTo(topicId, item.id, 'learn');
    });
    card.querySelectorAll('button[data-mode]').forEach(btn => {
      if(btn.dataset.mode === 'review'){
        btn.onclick = (e) => {
          e.stopPropagation();
          const next = pickNextForReview(state, content);
          if(!next){
            alert('Review queue is empty. Do a Learn/Practice first!');
            return;
          }
          navigateTo(next.topicId, next.itemId, next.mode);
        };
      } else {
        btn.onclick = (e) => { e.stopPropagation(); navigateTo(topicId, item.id, btn.dataset.mode); };
      }
    });
    items.appendChild(card);
  });
  main.appendChild(items);

  renderCoach(coach, state, topicId, null, content);
}

export function navigateTo(topicId, itemId, mode='learn'){
  const topic = content.topics.find(t=>t.id===topicId);
  const item = topic.items.find(i=>i.id===itemId);
  main.innerHTML = '';

  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  const isGame = !!item.game;
  const modes = isGame ? ['learn','play'] : ['learn','quiz','practice'];
  modes.forEach(m => {
    const b = document.createElement('button');
    b.className = 'tab' + (m===mode? ' active':'');
    b.textContent = m[0].toUpperCase()+m.slice(1);
    b.onclick = () => navigateTo(topicId, itemId, m);
    tabs.appendChild(b);
  });
  main.appendChild(tabs);

  if(mode==='learn') renderLearn(main, state, topic, item);
  if(mode==='quiz') renderQuiz(main, state, topic, item);
  if(mode==='practice') renderProblem(main, state, topic, item);
  if(mode==='play') renderGame(main, state, topic, item);

  renderCoach(coach, state, topicId, itemId, content);
}

function initial(){
  renderSidebar();
  // Default to first topic
  const t0 = content.topics[0];
  renderTopic(t0.id);
  // Basic keyboard shortcuts
  window.addEventListener('keydown', (e)=>{
    if(e.key==='?' || (e.ctrlKey && e.key.toLowerCase()==='h')){
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="section"><h2>Shortcuts</h2>
          <ul>
            <li><small class="key">Ctrl</small>+<small class="key">H</small> — Help</li>
            <li><small class="key">Alt</small>+<small class="key">R</small> — Review next</li>
          </ul>
        </div>`;
      openModal('Help', div);
    }
    if(e.altKey && e.key.toLowerCase()==='r'){
      const next = pickNextForReview(state, content);
      if(next) navigateTo(next.topicId, next.itemId, next.mode);
    }
  });
}

initial();

// Expose for other modules to open modal
export const UI = { openModal };
