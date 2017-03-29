import {successfulBreakthrough} from './actions.js'

export const events = {
  breakthroughE1: {
    name: "Breakthrough to Essence 1",
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
  }
}
