import {successfulBreakthrough, grantItem} from './actions.js'
import {BATTLE, ALCHEMY, MEDITATION} from './skills.js'

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
        cost: (skillName) => {},
      },
      {
        type: MEDITATION,
        titleText: "Focus Energy",
        displayText: "Focusing Energy",
        defaultActionName: "Focus",
        showDefaultAction: true,
        cost: (skillName) => {},
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
        cost: (skillName) => {},
        finishAction: (skillName) => grantItem('herb', 2),
      },
    ],
  },
}
