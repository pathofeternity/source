import {successfulBreakthrough, grantItem} from './actions.js'
import {SKILLS, BATTLE, MEDITATION, SLASHING} from './skills.js'

export const DEFAULT = "default"

export const EVENTS = {
  breakthroughE1: {
    name: "Breakthrough to Essence 1",
    listDisplay: false,
    steps: [
      {
        type: MEDITATION,
        titleText: "Focus Mind",
        displayText: "Preparing Mind",
        defaultActionName: "Focus",
        showDefaultAction: true,
      },
      {
        type: MEDITATION,
        titleText: "Focus Energy",
        displayText: "Focusing Energy",
        defaultActionName: "Focus",
        showDefaultAction: true,
        finishAction: (skillName) => successfulBreakthrough(),
      }
    ],
  },
  gatherHerbs: {
    name: "Gather Herbs",
    steps: [
      {
        type: BATTLE,
        titleText: "Gather Herbs",
        displayText: "Gathering Herbs",
        defaultActionName: "Gather Herbs",
        showDefaultAction: true,
        legalSkillIndicator: (skillName) => {
          var skill = SKILLS[skillName]
          if (!skill) { return false }
          return skill.tags.indexOf(SLASHING) !== -1
        },
        finishAction: (skillName) => {
          var skill = SKILLS[skillName]
          var numHerbs = 2
          if (skill && skill.tags.indexOf(SLASHING) !== -1) {
            numHerbs = 3
          }
          return grantItem('herb', numHerbs)
        },
      },
    ],
  },
}
