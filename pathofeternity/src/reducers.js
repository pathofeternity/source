import { TICK, SET_PERCENT } from './actions.js'

const initialState = {
  stats: {
    cultivation: {
      trainingName: 'Meditation',
      max: 1000,
      rate: 400,
      percent: 25
    },
    body: {
      trainingName: 'Physical Training',
      max: 100,
      rate: 1,
      percent: 25
    },
    mind: {
      trainingName: 'Mental Training',
      max: 100,
      rate: 1,
      percent: 25
    },
    soul: {
      trainingName: 'Soul Training',
      max: 100,
      rate: 1,
      percent: 25
    }
  },
  // Separate scores so we don't reallocate all stats every time.
  scores: {
    cultivation: 0,
    body: 0,
    mind: 0,
    soul: 0
  },
  checkpoints: {
    reachedFirstBreakthrough: false
  }
}

// Top-level reducer.
export function pathApp(state = initialState, action) {
  console.log(state)
  return setCheckpoints(actionPicker(state, action))
}
function actionPicker(state, action) {
  switch (action.type) {
    case TICK:
    return tickReducer(state)
    case SET_PERCENT:
    return setPercentReducer(state, action)
    default:
    return state
  }
}
function setCheckpoints(state) {
  var newCheckpoints = Object.assign({}, state.checkpoints)
  if (state.scores.cultivation >= state.stats.cultivation.max) {
    newCheckpoints.reachedFirstBreakthrough = true
  }
  return Object.assign({}, state, {checkpoints: newCheckpoints})
}
function tickReducer(state) {
  var stats = state.stats
  var oldScores = state.scores
  var newScores = {}
  for (var statName in stats) {
    newScores[statName] = Math.min(oldScores[statName] +
      (stats[statName].rate * stats[statName].percent / 100),
      stats[statName].max)
  }
  return Object.assign({}, state, {
    scores: newScores,
  })
}

function setPercentReducer(state, action) {
  var stats = state.stats
  var newStats = {}
  var sum = 0
  // Calculate how much room we have left.
  for (var statName in stats) {
    sum += stats[statName].percent
  }
  sum -= stats[action.statName].percent
  var remaining = 100 - sum

  newStats = Object.assign({}, stats)
  newStats[action.statName] = Object.assign({}, stats[action.statName],
    { percent: Math.min(remaining, action.percent)})
  return Object.assign({}, state, {stats: newStats})
}
