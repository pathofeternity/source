import { TICK, SET_PERCENT, SUCCESSFUL_BREAKTHROUGH,
START_EVENT, PROGRESS_EVENT, END_EVENT,
GRANT_SKILL, EQUIP_SKILL, UNEQUIP_SKILL} from './actions.js'
import {skills, BATTLE, ALCHEMY, MEDITATION} from './skills.js'

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

  availableSkills: [
    "reaction", "reduction"
  ],
  equippedBattleSkills: [],
  battleSkillLimit: 6,
  equippedAlchemySkills: [],
  alchemySkillLimit: 6,
  equippedMeditationSkills: [],
  meditationSkillLimit: 6,
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
    case EQUIP_SKILL:
    return equipSkillReducer(state, action)
    case UNEQUIP_SKILL:
    return unequipSkillReducer(state, action)
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
  var statName
  for (statName in stats) {
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
  var statName
  for (statName in stats) {
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

function grantSkillReducer(state, action) {
  return Object.assign({}, state, {
    availableSkills: state.availableSkills.concat([action.skillName])
  })
}
function equipSkillReducer(state, action) {
  var category = skills[action.skillName].category
  switch (category) {
    case BATTLE:
    if (state.equippedBattleSkills.length >= state.battleSkillLimit) {
      return state;
    }
    if (state.equippedBattleSkills.indexOf(action.skillName) != -1) {
      return state;
    }
    return Object.assign({}, state, {
      equippedBattleSkills: state.equippedBattleSkills.concat([action.skillName])
    })
    case ALCHEMY:
    if (state.equippedAlchemySkills.length >= state.alchemySkillLimit) {
      return state;
    }
    if (state.equippedAlchemySkills.indexOf(action.skillName) != -1) {
      return state;
    }
    return Object.assign({}, state, {
      equippedAlchemySkills: state.equippedAlchemySkills.concat([action.skillName])
    })
    case MEDITATION:
    if (state.equippedMeditationSkills.length >= state.meditationSkillLimit) {
      return state;
    }
    if (state.equippedMeditationSkills.indexOf(action.skillName) != -1) {
      return state;
    }
    return Object.assign({}, state, {
      equippedMeditationSkills: state.equippedMeditationSkills.concat([action.skillName])
    })
  }
}
function unequipSkillReducer(state, action) {
  var category = skills[action.skillName].category
  switch(category) {
    case BATTLE:
    return Object.assign({}, state, {
      equippedBattleSkills: state.equippedBattleSkills.filter(item => item != action.skillName)
    })
    case ALCHEMY:
    return Object.assign({}, state, {
      equippedAlchemySkills: state.equippedAlchemySkills.filter(item => item != action.skillName)
    })
    case BATTLE:
    return Object.assign({}, state, {
      equippedMeditationSkills: state.equippedMeditationSkills.filter(item => item != action.skillName)
    })
  }
}
