import {SKILLS, PASSIVE} from './skills.js'

export function getTotalMultiplier(availableSkills) {
  var multiplier = Object.keys(availableSkills)
      .filter(skill => SKILLS[skill].eventType === PASSIVE)
      .reduce((result, skill) => {
        if (!SKILLS[skill].multiplierFunction ) {
          return result
        }
        var modifier = SKILLS[skill].multiplierFunction(availableSkills[skill].level)
        var stat
        for (stat in modifier) {
          result[stat] = (result[stat] ? result[stat] : 1) * modifier[stat]
        }
        return result
      }, {})
      return multiplier
}
