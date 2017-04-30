import {getTotalMultiplier} from '../utils.js'
import {SKILLS} from '../skills.js'
import {showPopup, grantSkill} from '../actions.js'
import {grantSkillReducer} from './skill_reducers.js'

export function successfulBreakthroughReducer(state) {

  var newState = Object.assign({}, state, {
    stats: Object.assign({}, state.stats, {
      cultivation: Object.assign({}, state.stats.cultivation, {
        max: state.stats.cultivation.max * 10
      })
    })
  })
  if (state.stats.cultivation.max === 10) {
      return grantSkillReducer(
        showPopupReducer(newState, showPopup("A Chance Encounter",
        "A wandering cultivator happens by as you finish your breakthrough, and gives you some tips. You gained the Cultivation Proficiency skill.")),
        grantSkill("cultivationProficiency")
      )
  }
  return newState
}

// Two chunks - handles core stats and skills similarly.
export function tickReducer(state) {
  var stats = state.stats
  var availableSkills = state.availableSkills
  var oldScores = state.scores
  var newScores = Object.assign({}, state.scores)
  var newStats = Object.assign({}, state.stats)
  var multiplier = getTotalMultiplier(state);

  var cultivationMultiplier = multiplier.cultivation ? multiplier.cultivation : 1
  newScores.cultivation += stats.cultivation.rate * cultivationMultiplier * stats.cultivation.percent / 100
  newScores.cultivation = Math.min(newScores.cultivation, stats.cultivation.max)
  // Bit of a hacky workaround; cultivation works differently from BMS now.
  var statName
  for (statName in stats) {
    if (statName === "cultivation") { continue }
    var statMultiplier = multiplier[statName] ? multiplier[statName] : 1
    var rate = stats[statName].rate * statMultiplier * stats[statName].percent / 100
      newScores[statName] += rate
      newStats[statName].max += rate

  }
  //TODO: handle leveling up skills and disabling things after reaching max level.
  var skillName
  var newSkills = Object.assign({}, availableSkills)
  for (skillName in oldScores) {
    if (!(skillName in availableSkills)) { continue }
    var xpMultiplier = multiplier[skillName] ? multiplier[skillName] : 1
    var thisSkill = availableSkills[skillName]
    newScores[skillName] = oldScores[skillName] + (thisSkill.rate * xpMultiplier * thisSkill.percent / 100)
    var xpRequired = SKILLS[skillName].xpRequiredFunction(thisSkill.level)
    if (newScores[skillName] >= xpRequired) {
      newSkills[skillName].level++
      newScores[skillName] = 0
      if (newSkills[skillName].level >= SKILLS[skillName].maxLevel) {
        newSkills[skillName].percent = 0
        delete newScores[skillName]
      }
    }
  }

  return Object.assign({}, state, {
    scores: newScores,
    availableSkills: newSkills,
  })
}

export function setPercentReducer(state, action) {
  var stats = state.stats
  var skills = state.availableSkills
  var sum = 0
  // Calculate how much room we have left.
  var statName
  for (statName in stats) {
    sum += stats[statName].percent
  }
  var skillName
  for (skillName in skills) {
    sum += skills[skillName].percent
  }
  if (stats[action.statName]) {
    sum -= stats[action.statName].percent
  } else { //the stat is XP for a skill.
    sum -= skills[action.statName].percent
  }
  var remaining = 100 - sum

  var newValue = Math.min(remaining, action.percent)
  var newStats = Object.assign({}, stats)
  var newSkills = Object.assign({}, skills)
  if (stats[action.statName]) {
    newStats[action.statName] = Object.assign({}, stats[action.statName],
      { percent: newValue}
    )
  } else {
    newSkills[action.statName] = Object.assign({}, skills[action.statName],
      { percent: newValue}
    )
  }
  return Object.assign({}, state, {stats: newStats, availableSkills: newSkills})
}
export function hidePopupReducer(state) {
  return Object.assign({}, state, {
    popup: Object.assign({}, state.popup, {show: false})
  })
}
export function showPopupReducer(state, action) {
  return Object.assign({}, state, {
    popup: {show: true, message: action.message, title: action.title}
  })
}
