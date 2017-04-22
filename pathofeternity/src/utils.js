import {SKILLS, PASSIVE} from './skills.js'

export function getTotalMultiplier(state) {
  var availableSkills = state.availableSkills
  var multiplier = Object.keys(availableSkills)
      .filter(skill => SKILLS[skill].eventType === PASSIVE)
      .reduce((result, skill) => {
        if (!SKILLS[skill].multiplierFunction ) {
          return result
        }
        var modifier = SKILLS[skill].multiplierFunction(availableSkills[skill].level)
        var stat
        for (stat of Object.keys(modifier)) {
          result[stat] = (result[stat] ? result[stat] : 1) * modifier[stat]
        }
        return result
      }, {})
      return multiplier
}
