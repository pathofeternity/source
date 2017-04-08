// Each use function should return the new state.
const HERB_BONUS = 50
const useHerb = (state, quantity) => {
  var numHerbs = state.inventory.herb
  var cultivation =  state.scores.cultivation
  quantity = Math.min(numHerbs, quantity)

  return Object.assign({}, state, {
    scores: Object.assign({}, state.scores, {
      cultivation: cultivation + HERB_BONUS * quantity
    }),
    inventory: Object.assign({}, state.inventory, {
      herb: numHerbs - quantity
    })
  })
}


export const ITEMS = {
  herb: {
    displayName: "Herb",
    instantUse: true,
    onUse: useHerb,
  },
}
