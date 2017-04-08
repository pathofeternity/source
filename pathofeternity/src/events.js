import {successfulBreakthrough} from './actions.js'

export const EVENTS = {
  breakthroughE1: {
    name: "Breakthrough to Essence 1",
    listDisplay: false,
    steps: [
      {
        buttonText: "Focus Mind",
        name: "Preparing Mind",
      },
      {
        buttonText: "Focus Energy",
        name: "Focusing Energy",
      }
    ],
    finishAction: successfulBreakthrough(),
  },
  gatherHerbs: {
    name: "Gather Herbs",
    steps: [
      {
        buttonText: "Gather Herbs",
        name: "Gathering Herbs",
      },
    ],
    finishAction: null,
  }
}
