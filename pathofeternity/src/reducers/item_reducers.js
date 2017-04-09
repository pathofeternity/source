import {ITEMS} from '../items.js'

export function grantItemReducer(state, action) {
  var itemName = action.itemName
  var currentInventory = Object.assign({}, state.inventory)
  if (state.inventory[itemName]) {
    currentInventory[itemName] += action.quantity
  }
  else {
    currentInventory[itemName] = action.quantity
  }
  return Object.assign({}, state, {
    inventory: currentInventory
  })
}

export function useItemReducer(state, action) {
  var itemName = action.itemName
  return ITEMS[itemName].onUse(state, action.quantity)
}
