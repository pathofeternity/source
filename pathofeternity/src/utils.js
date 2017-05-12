import {SKILLS, PASSIVE} from './skills.js'
const numberformat = require('swarm-numberformat')

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
        for (stat in modifier) {
          result[stat] = (result[stat] ? result[stat] : 1) * modifier[stat]
        }
        return result
      }, {})
      return multiplier
}

export function formatNumber(number) {
    // 3 digits or less.
    if (number < 1000) {
      if (Number.isInteger(number)) {
        return number
      }
      return number.toPrecision(3)
    }
    // 6 digits or less.
    if (number < 1e6) {
      return Math.round(number)
    }
    return numberformat.formatShort(number)
}

const tierNames = ["Essence", "Foundation", "Azoth", "Nascent Soul", "Demigod"];

export function levelName (cultivation) {
  var levelNumber = Math.floor(Math.log10(Math.max(1,cultivation - 1)));
  var tier = Math.floor(levelNumber / 10);
  var level = levelNumber % 10;
  return tierNames[tier] + " " + level;
}
