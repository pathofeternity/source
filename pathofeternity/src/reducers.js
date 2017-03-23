import { TICK } from './actions.js'

const initialState = {
  stats: {
    cultivation: {
      trainingName: 'Meditation',
      max: 1000,
      rate: 4
    },
    body: {
      trainingName: 'Physical Training',
      max: 100,
      rate: 1
    },
    mind: {
      trainingName: 'Mental Training',
      max: 100,
      rate: 1
    },
    soul: {
      trainingName: 'Soul Training',
      max: 100,
      rate: 1
    }
  },
  // Separate scores so we don't reallocate all stats every time.
  scores: {
    cultivation: 0,
    body: 0,
    mind: 0,
    soul: 0
  },
  score: 0
}

// Top-level reducer.
export function pathApp(state = initialState, action) {
  switch (action.type) {
    case TICK:
    return tickReducer(state)

    default:
    return state
  }
}

function tickReducer(state) {
  var stats = state.stats
  var oldScores = state.scores
  var newScores = {}
  for (var statName in stats) {
    newScores[statName] = Math.min(oldScores[statName] + stats[statName].rate, stats[statName].max)
  }
  return Object.assign({}, state, {
    scores: newScores,
    score: state.score + 1
  })
}
