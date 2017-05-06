export const NO_OP = 'NO_OP'
export const TICK = 'TICK'
export const SET_PERCENT = 'SET_RATE'
export const SUCCESSFUL_BREAKTHROUGH = 'SUCCESSFUL_BREAKTHROUGH'
export const START_EVENT = 'START_EVENT'
export const PROGRESS_EVENT = 'PROGRESS_EVENT'
export const END_EVENT = 'END_EVENT'
export const GRANT_SKILL = 'GRANT_SKILL'
export const EQUIP_SKILL = 'EQUIP_SKILL'
export const UNEQUIP_SKILL = 'UNEQUIP_SKILL'
export const SELECT_SKILL = 'SELECT_SKILL'
export const GRANT_ITEM = 'GRANT_ITEM'
export const USE_ITEM = 'USE_ITEM'
export const DEDUCT_COST = 'DEDUCT_COST'
export const SHOW_POPUP = 'SHOW_POPUP'
export const HIDE_POPUP = 'HIDE_POPUP'
export const GRANT_EVENT = 'GRANT_EVENT'

export function noOp() {
  return { type: NO_OP }
}

export function tick() {
  return { type: TICK }
}

export function setPercent(statName, percent) {
  return{
    type: SET_PERCENT,
    percent: percent,
    statName: statName
  }
}

export function successfulBreakthrough() {
  return { type: SUCCESSFUL_BREAKTHROUGH }
}

export function startEvent(eventName) {
  return {
    type: START_EVENT,
    eventName: eventName
  }
}
export function progressEvent() {
  return { type: PROGRESS_EVENT }
}
export function endEvent() {
  return { type: END_EVENT }
}

export function grantSkill(skillName) {
  return { type: GRANT_SKILL, skillName: skillName }
}
export function equipSkill(skillName, index) {
  return { type: EQUIP_SKILL, skillName: skillName, index: index }
}
export function unequipSkill(skillName) {
  return { type: UNEQUIP_SKILL, skillName: skillName}
}
export function selectSkill(skillName) {
  return { type: SELECT_SKILL, skillName: skillName}
}

export function grantItem(itemName, quantity) {
  return {type: GRANT_ITEM, itemName: itemName, quantity: quantity}
}
export function useItem(itemName, quantity) {
  return {
    type: USE_ITEM,
    itemName: itemName,
    quantity: quantity ? quantity : 1
  }
}

export function deductCost(cost) {
  return {type: DEDUCT_COST, cost: cost}
}
export function hidePopup() {
  return {type: HIDE_POPUP}
}
export function showPopup(title, message) {
  return {type: SHOW_POPUP, title: title, message: message}
}

export function grantEvent(eventName) {
  return {type: GRANT_EVENT, eventName: eventName}
}
