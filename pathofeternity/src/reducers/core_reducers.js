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

export function tickReducer(state) {
  var stats = state.stats
  var oldScores = state.scores
  var newScores = {}
  var multiplier = state.availableSkills
      .map(skillName => SKILLS[skillName])
      .filter(skill => skill.eventType === PASSIVE)
      .reduce((result, skill) => {
        var stat
        for (stat of Object.keys(skill.multiplier)) {
          result[stat] *= skill.multiplier[stat]
        }
        return result
      }, {cultivation: 1, body: 1, mind: 1, soul: 1})


  var statName
  for (statName in stats) {
    newScores[statName] = Math.min(
      oldScores[statName] + (stats[statName].rate * multiplier[statName] * stats[statName].percent / 100),
      stats[statName].max
    )
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
