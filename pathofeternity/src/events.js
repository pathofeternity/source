import {successfulBreakthrough, grantItem} from './actions.js'
import {SKILLS, BATTLE, MEDITATION, SLASHING, BURNING} from './skills.js'

export const DEFAULT = "default"

export const EVENTS = {
  breakthroughE1: {
    name: "A Mysterious Phenomenon",
    shouldDisplay: (eventDisplayInfo) => false,
    steps: [
      {
        type: MEDITATION,
        titleText: "Gather Specks",
        displayText: "Gathering Specks",
        defaultActionName: "Gather",
        showDefaultAction: true,
        finishAction: (skillName) => successfulBreakthrough(),
      }
    ],
  },
  gatherHerbs: {
    name: "Gather Herbs",
    shouldDisplay: (eventDisplayInfo) => eventDisplayInfo.maxCultivation >= 1e2,
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
    shouldDisplay: (eventDisplayInfo) => false,
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
    shouldDisplay: (eventDisplayInfo) => false,
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
