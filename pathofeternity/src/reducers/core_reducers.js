import {getTotalMultiplier} from '../utils.js'
import {SKILLS} from '../skills.js'

export function successfulBreakthroughReducer(state) {
  return Object.assign({}, state, {
    stats: Object.assign({}, state.stats, {
      cultivation: Object.assign({}, state.stats.cultivation, {
        max: state.stats.cultivation.max * 10
      })
    })
  })
}

// Two chunks - handles core stats and skills similarly.
export function tickReducer(state) {
  var stats = state.stats
  var availableSkills = state.availableSkills
  var oldScores = state.scores
  var newScores = {}
  var multiplier = getTotalMultiplier(state);
  var statName
  for (statName in stats) {
    var statMultiplier = multiplier[statName] ? multiplier[statName] : 1
    newScores[statName] = Math.min(
      oldScores[statName] + (stats[statName].rate * statMultiplier * stats[statName].percent / 100),
      stats[statName].max
    )
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
