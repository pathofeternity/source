import {successfulBreakthrough, grantItem} from './actions.js'
import {SKILLS, BATTLE, MEDITATION, SLASHING, BURNING} from './skills.js'

export const DEFAULT = "default"

export const EVENTS = {
  breakthroughE1: {
    name: "Breakthrough to Essence 1",
    listDisplay: false,
    steps: [
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
  thornyRoad: {
    name: "Travel through Woods",
    steps: [
      {
        type: BATTLE,
        titleText: "Get through Thorns",
        displayText: "Thorns block your way",
        defaultActionName: "Walk through",
        showDefaultAction: true,
        legalSkillIndicator: (skillName) => {
          var skill = SKILLS[skillName]
          if (!skill) { return false }
          return skill.tags.indexOf(SLASHING) !== -1 || skill.tags.indexOf(BURNING) !== -1
        },
        finishAction: (skillName) => {
          var skill = SKILLS[skillName]
          var numHerbs = 2
          if (skill && skill.tags.indexOf(SLASHING) !== -1) {
            numHerbs = 3
          }
          return grantItem('herb', numHerbs)
        },
        costFunction: (skillName) => {
          if (skillName === DEFAULT) {
            return {statCosts: { body: 30}}
          }
            return {statCosts: { body: 10}}
        }
      },
    ],
  },
  basicFight: {
    name: "Fight a dummy",
    steps: [
      {
        type: BATTLE,
        isFight: true,
        maxHp: 20,
        titleText: "Fight a dummy",
        enemyName: "Target Dummy",
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
  }
}
