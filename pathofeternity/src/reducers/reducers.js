import { TICK, SET_PERCENT, SUCCESSFUL_BREAKTHROUGH,
  START_EVENT, PROGRESS_EVENT, END_EVENT,
  GRANT_SKILL, EQUIP_SKILL, UNEQUIP_SKILL, SELECT_SKILL,
  GRANT_ITEM, USE_ITEM, DEDUCT_COST, SHOW_POPUP, HIDE_POPUP
} from '../actions.js'
import {startEventReducer, progressEventReducer, endEventReducer, deductCostReducer} from './event_reducers.js'
import {grantSkillReducer, equipSkillReducer, unequipSkillReducer, selectSkillReducer} from './skill_reducers.js'
import {tickReducer, setPercentReducer, successfulBreakthroughReducer, showPopupReducer, hidePopupReducer} from './core_reducers.js'
import {grantItemReducer, useItemReducer} from './item_reducers.js'

const SKILL_LIMIT = 6
const initialState = {
  stats: {
    cultivation: {
      trainingName: 'Meditation',
      max: 10,
      rate: 1,
      percent: 100
    },
    body: {
      trainingName: 'Physical Training',
      max: 10,
      rate: 1,
      percent: 0
    },
    mind: {
      trainingName: 'Mental Training',
      max: 10,
      rate: 1,
      percent: 0
    },
    soul: {
      trainingName: 'Soul Training',
      max: 10,
      rate: 1,
      percent: 0
    }
  },
  // Separate scores so we don't reallocate all stats every time.
  scores: {
    cultivation: 0,
    body: 0,
    mind: 0,
    soul: 0,
    burning: 0,
    slashing: 0,
  //  cultivationProficiency: 0,
  },

  level: 0,

  activeEvent: null,
  eventStep: 0,

  availableSkills: {
    burning: {level: 1, percent:0, rate:1},
    slashing: {level: 0, percent:0, rate:1},
  //  cultivationProficiency: {level: 1, percent:0, rate:1},
  },
  equippedBattleSkills: new Array(SKILL_LIMIT).fill(null),
  equippedAlchemySkills: new Array(SKILL_LIMIT).fill(null),
  equippedMeditationSkills: new Array(SKILL_LIMIT).fill(null),
  selectedSkill: null,

  popup: {
    show: true,
    message: "After a long day working in the fields, you relax on a chair watching the sunset peacefully.  Tonight though, the last few rays of sunlight seem to twinkle off of something hanging in the air.  You grab at the speck of light and when it touches your hand, you feel a strand of warmth enter your body.  This feeling is quite pleasant, so you start to gather every speck you can see nearby.",
    title: "The Story Begins",
  },
  inventory: {
  },
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
    case SELECT_SKILL:
      return selectSkillReducer(state, action)
    case GRANT_ITEM:
      return grantItemReducer(state, action)
    case USE_ITEM:
      return useItemReducer(state, action)
    case DEDUCT_COST:
      return deductCostReducer(state, action)
    case SHOW_POPUP:
      return showPopupReducer(state, action)
    case HIDE_POPUP:
      return hidePopupReducer(state)
    case GRANT_SKILL:
      return grantSkillReducer(state, action)
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
