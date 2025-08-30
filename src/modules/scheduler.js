export function pickNextForReview(state, content){
  const now = Date.now();
  let best = null;
  for(const topic of content.topics){
    const tprog = state.progress[topic.id];
    if(!tprog) continue;
    for(const item of topic.items){
      const it = (tprog.items||{})[item.id];
      if(!it) continue;
      const dueScore = (now - (it.due||0));
      const masteredBias = it.mastered ? 0 : 1e9; // prioritize unmastered
      const candidate = { topicId: topic.id, itemId: item.id, mode: suggestMode(it), score: dueScore + masteredBias };
      if(!best || candidate.score > best.score){ best = candidate; }
    }
  }
  return best;
}

function suggestMode(it){
  if(!it.learnDone) return 'learn';
  if(it.quizScore < 0.8) return 'quiz';
  if(!it.codePassed) return 'practice';
  // Interleave modes for reinforcement
  const modes = ['quiz','practice'];
  return modes[Math.floor(Math.random()*modes.length)];
}

export function nextByDifficulty(state, content){
  const order = {'easy':1,'easy-medium':2,'medium':3,'medium-hard':4,'hard':5};
  const all = [];
  for(const topic of content.topics){
    for(const item of topic.items){
      const progTopic = state.progress[topic.id];
      const it = (progTopic && progTopic.items && progTopic.items[item.id]) || {};
      if(it.mastered) continue;
      all.push({topicId:topic.id, itemId:item.id, difficultyOrder: order[item.difficulty]||9, learned:!!it.learnDone});
    }
  }
  all.sort((a,b)=> (a.difficultyOrder-b.difficultyOrder) || (a.learned - b.learned));
  return all[0] || null;
}
