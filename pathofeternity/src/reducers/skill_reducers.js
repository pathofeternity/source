import {SKILLS, BATTLE, ALCHEMY, MEDITATION} from '../skills.js'

export function grantSkillReducer(state, action) {
  var newSkill = {}
  newSkill[action.skillName] = {level: 0, xp: 0}
  return Object.assign({}, state, {
    availableSkills: Object.assign(
      {}, state.availableSkills, newSkill)
  })
}

export function equipSkillReducer(state, action) {
  if (!SKILLS[action.skillName]) {
    return state
  }
  var eventType = SKILLS[action.skillName].eventType
  switch (eventType) {
    case BATTLE:
      if (state.equippedBattleSkills.indexOf(action.skillName) !== -1) {
        return state
      }
      return Object.assign({}, state, {
        equippedBattleSkills: state.equippedBattleSkills.map(
          (item, index) => index === action.index ? action.skillName : item)
        }
      )
    case ALCHEMY:
      if (state.equippedAlchemySkills.indexOf(action.skillName) !== -1) {
        return state
      }
      return Object.assign({}, state, {
        equippedAlchemySkills: state.equippedAlchemySkills.map(
          (item, index) => index === action.index ? action.skillName : item)
        }
      )
    case MEDITATION:
      if (state.equippedMeditationSkills.indexOf(action.skillName) !== -1) {
        return state
      }
      return Object.assign({}, state, {
        equippedMeditationSkills: state.equippedMeditationSkills.map(
          (item, index) => index === action.index ? action.skillName : item)
        }
      )
    default:
      console.log("THIS SHOULD NEVER HAPPEN")
      console.log(state)
      console.log(action)
  }
}

export function unequipSkillReducer(state, action) {
  if (!SKILLS[action.skillName]) {
    return state
  }
  var eventType = SKILLS[action.skillName].eventType
  switch(eventType) {
    case BATTLE:
      return Object.assign({}, state, {
        equippedBattleSkills: state.equippedBattleSkills.map(
          (item) => item === action.skillName ? null : item)
        }
      )
    case ALCHEMY:
      return Object.assign({}, state, {
        equippedAlchemySkills: state.equippedAlchemySkills.map(
          (item) => item === action.skillName ? null : item)
        }
      )
    case MEDITATION:
      return Object.assign({}, state, {
        equippedMeditationSkills: state.equippedMeditationSkills.map(
          (item) => item === action.skillName ? null : item)
        }
      )
    default:
      console.log("THIS SHOULD NEVER HAPPEN")
      console.log(state)
      console.log(action)
      return state
  }
}

export function selectSkillReducer(state, action) {
  return Object.assign({}, state, {
    selectedSkill: action.skillName
  })
}
