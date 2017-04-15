export function startEventReducer(state, action) {
  return Object.assign({}, state, {activeEvent: action.eventName, eventStep: 0})
}

export function progressEventReducer(state) {
  return Object.assign({}, state, {eventStep: state.eventStep + 1})
}

export function endEventReducer(state) {
  return Object.assign({}, state, {activeEvent: null, eventStep: 0})
}

export function deductCostReducer(state, action) {
  var newScores = Object.assign({}, state.scores)
  var cost = action.cost
  if (cost.statCosts) {
    var stat
    for (stat of Object.keys(cost.statCosts)) {
      newScores[stat] -= cost.statCosts[stat]
    }
  }
  var newInventory = Object.assign({}, state.inventory)
  if (cost.itemCosts) {
    var item
    for (item of Object.keys(cost.itemCosts)) {
      newInventory[item] -= cost.itemCosts[item]
    }
  }
  return Object.assign({}, state, {
    scores: newScores,
    inventory: newInventory
  })
}
