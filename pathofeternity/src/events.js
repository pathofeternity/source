import {successfulBreakthrough, grantItem} from './actions.js'

export const EVENTS = {
  breakthroughE1: {
    name: "Breakthrough to Essence 1",
    listDisplay: false,
    steps: [
      {
        titleText: "Focus Mind",
        displayText: "Preparing Mind",
        defaultActionName: "Focus",
        skillRequired: false,
        cost: {},
      },
      {
        titleText: "Focus Energy",
        displayText: "Focusing Energy",
        defaultActionName: "Focus",
        skillRequired: false,
        cost: {},
        finishAction: (skillName) => successfulBreakthrough(),
      }
    ],
  },
  gatherHerbs: {
    name: "Gather Herbs",
    steps: [
      {
        titleText: "Gather Herbs",
        displayText: "Gathering Herbs",
        defaultActionName: "Gather Herbs",
        skillRequired: false,
        cost: {},
        finishAction: (skillName) => grantItem('herb', 2),
      },
    ],
  },
}
