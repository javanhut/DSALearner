import { State } from './state.js';

export function renderQuiz(main, state, topic, item){
  const box = document.createElement('div');
  box.className = 'section';
  box.innerHTML = `<h2>${item.title} — Quiz</h2>`;

  const form = document.createElement('div');
  form.className = 'list';
  const answers = {};
  item.quiz.forEach((q, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'question';
    wrap.innerHTML = `<div><b>Q${idx+1}.</b> ${q.prompt}</div>`;
    if(q.type === 'mc'){
      q.choices.forEach((c,ci)=>{
        const id = `q${idx}-c${ci}`;
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `<input type="radio" name="q${idx}" id="${id}"><label for="${id}">${c}</label>`;
        row.querySelector('input').onchange = ()=> answers[idx] = ci;
        wrap.appendChild(row);
      });
    } else if(q.type === 'sa'){
      const input = document.createElement('input');
      input.type = 'text'; input.placeholder = 'Your answer';
      input.oninput = ()=> answers[idx] = input.value;
      wrap.appendChild(input);
    }
    form.appendChild(wrap);
  });

  const row = document.createElement('div');
  row.className = 'row';
  const gradeBtn = document.createElement('button');
  gradeBtn.className = 'btn'; gradeBtn.textContent = 'Grade';
  const confSel = document.createElement('select');
  confSel.innerHTML = '<option value="3">Confidence: 3/5</option><option value="4">4/5</option><option value="5">5/5</option><option value="2">2/5</option><option value="1">1/5</option>';
  row.appendChild(gradeBtn); row.appendChild(confSel);
  form.appendChild(row);

  const feedback = document.createElement('div');
  feedback.className = 'section';
  feedback.innerHTML = '<div class="muted">Feedback will appear here.</div>';

  gradeBtn.onclick = () => {
    const res = grade(item.quiz, answers);
    const it = State.ensureItem(state, topic.id, item.id);
    it.quizAttempts += 1;
    it.quizScore = res.score;
    State.recordReview(state, topic.id, item.id, Number(confSel.value));
    State.setMastery(state, topic.id, item.id);
    State.save(state);
    feedback.innerHTML = renderFeedback(res);
  };

  box.appendChild(form);
  main.appendChild(box);
  main.appendChild(feedback);
}

function grade(quiz, answers){
  let correct = 0;
  const details = [];
  quiz.forEach((q, idx) => {
    let ok = false;
    if(q.type==='mc') ok = answers[idx] === q.answer;
    if(q.type==='sa'){
      const a = (answers[idx]||'').trim().toLowerCase();
      ok = q.accept.some(x => a === x.toLowerCase());
    }
    if(ok) correct++;
    details.push({idx, ok, explain: q.explain});
  });
  return { score: quiz.length? correct/quiz.length : 0, correct, total: quiz.length, details };
}

function renderFeedback(res){
  const div = document.createElement('div');
  div.innerHTML = `<div><b>Score:</b> ${(res.score*100).toFixed(0)}%</div>`;
  res.details.forEach(d => {
    const line = document.createElement('div');
    line.className = 'hint';
    line.innerHTML = `Q${d.idx+1}: <span class="${d.ok?'ok':'danger-text'}">${d.ok? 'Correct':'Incorrect'}</span><br><small class="muted">${d.explain}</small>`;
    div.appendChild(line);
  });
  return div.outerHTML;
}

