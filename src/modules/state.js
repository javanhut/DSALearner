const STORAGE_KEY = 'dsa-learner-state-v1';

export const State = {
  load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){ console.warn('State load failed', e); }
    return { progress:{}, history:[], version:1 };
  },
  save(state){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  reset(){ localStorage.removeItem(STORAGE_KEY); },
  ensureItem(state, topicId, itemId){
    state.progress[topicId] = state.progress[topicId] || { items:{} };
    state.progress[topicId].items[itemId] = state.progress[topicId].items[itemId] || {
      learnDone:false, quizScore:0, quizAttempts:0, codePassed:false, codeAttempts:0,
      justification:'', mastered:false, ef:2.5, interval:0, due:0, last:0
    };
    return state.progress[topicId].items[itemId];
  },
  topicProgress(state, topicId){
    const t = state.progress[topicId];
    if(!t) return 0;
    const items = Object.values(t.items || {});
    if(!items.length) return 0;
    const score = items.reduce((acc,it)=> acc + (
      (it.learnDone?0.2:0) + (Math.min(1,it.quizScore)?0.3:0) + (it.codePassed?0.5:0)
    ), 0);
    return score / items.length;
  },
  setMastery(state, topicId, itemId){
    const it = State.ensureItem(state, topicId, itemId);
    if(it.quizScore >= 0.8 && it.codePassed && it.justification && it.justification.length >= 60){
      it.mastered = true;
    }
    State.save(state);
  },
  recordReview(state, topicId, itemId, quality){
    const it = State.ensureItem(state, topicId, itemId);
    const now = Date.now();
    // SM-2 lite
    if(quality < 3){
      it.interval = 1; it.due = now + 24*3600*1000; it.ef = Math.max(1.3, it.ef - 0.2);
    } else {
      if(it.interval === 0) it.interval = 1;
      else if(it.interval === 1) it.interval = 3;
      else it.interval = Math.round(it.interval * it.ef);
      it.ef = Math.max(1.3, it.ef + (0.1 - (5-quality)*(0.08 + (5-quality)*0.02)));
      it.due = now + it.interval * 24*3600*1000;
    }
    it.last = now;
    State.save(state);
  }
}

