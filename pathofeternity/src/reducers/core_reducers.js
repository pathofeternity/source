import {SKILLS, PASSIVE} from '../skills.js'

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
  var multiplier = Object.keys(state.availableSkills)
      .filter(skill => SKILLS[skill].eventType === PASSIVE)
      .reduce((result, skill) => {
        console.log(skill)
        if (!SKILLS[skill].multiplierFunction ) {
          return result
        }
        var modifier = SKILLS[skill].multiplierFunction(availableSkills[skill].level)
        console.log(modifier)
        var stat
        for (stat of Object.keys(modifier)) {
          result[stat] = (result[stat] ? result[stat] : 1) * modifier[stat]
        }
        return result
      }, {cultivation: 1, body: 1, mind: 1, soul: 1})


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
  for (skillName in availableSkills) {
    var xpMultiplier = multiplier[skillName] ? multiplier[skillName] : 1
    var thisSkill = availableSkills[skillName]
    newScores[skillName] = oldScores[skillName] + (thisSkill.rate * xpMultiplier * thisSkill.percent / 100)
  }

  return Object.assign({}, state, {
    scores: newScores,
  })
}

export function setPercentReducer(state, action) {
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
    { percent: Math.min(remaining, action.percent)}
  )
  return Object.assign({}, state, {stats: newStats})
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
