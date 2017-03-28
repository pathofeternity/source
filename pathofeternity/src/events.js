import {successfulBreakthrough} from './actions.js'

export const events = {
  breakthroughE1:{
    steps: [
      {
        name: "Focusing Energy",
        buttonText: "Focus Energy",
        legalSkills: () => ["Focus", "Cancel"],
      }
    ],
    finishAction: successfulBreakthrough(),
  }
}
