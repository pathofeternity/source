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
export function unequipSkill(skillName, index) {
  return { type: UNEQUIP_SKILL, skillName: skillName, index: index }
}
export function selectSkill(skillName) {
  return { type: SELECT_SKILL, skillName: skillName}
}
