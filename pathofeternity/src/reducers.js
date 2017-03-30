import { TICK, SET_PERCENT, SUCCESSFUL_BREAKTHROUGH,
START_EVENT, PROGRESS_EVENT, END_EVENT} from './actions.js'

const initialState = {
  stats: {
    cultivation: {
      trainingName: 'Meditation',
      max: 10,
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
  activeEvent: null,
  eventStep: 0,
}

// Top-level reducer.
export function pathApp(state = loadGame(), action) {

  switch (action.type) {
    case TICK:
    return tickReducer(state)
    case SET_PERCENT:
    return setPercentReducer(state, action)
    case SUCCESSFUL_BREAKTHROUGH:
    return successfulBreakthroughReducer(state)
    case START_EVENT:
    return startEventReducer(state, action)
    case PROGRESS_EVENT:
    return progressEventReducer(state)
    case END_EVENT:
    return endEventReducer(state)
    default:
    return state
  }
}
function loadGame() {
  var loadedState = JSON.parse(localStorage.getItem('saved_game'))
  if (loadedState == null) {
    return initialState;
  } else {
    return loadedState;
  }
}
function successfulBreakthroughReducer(state) {
  return Object.assign({}, state, {
    stats: Object.assign({}, state.stats, {
      cultivation: Object.assign({}, state.stats.cultivation, {
        max: state.stats.cultivation.max * 10
      })
    })
  })
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

function startEventReducer(state, action) {
  return Object.assign({}, state, {activeEvent: action.eventName, eventStep: 0})
}
function progressEventReducer(state) {
  return Object.assign({}, state, {eventStep: state.eventStep + 1})
}
function endEventReducer(state) {
  return Object.assign({}, state, {activeEvent: null, eventStep: 0})
}
