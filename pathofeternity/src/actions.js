export const TICK = 'TICK'
export const SET_PERCENT = 'SET_RATE'
export const SUCCESSFUL_BREAKTHROUGH = 'SUCCESSFUL_BREAKTHROUGH'
export const START_EVENT = 'START_EVENT'
export const PROGRESS_EVENT = 'PROGRESS_EVENT'
export const FINISH_EVENT = 'FINISH_EVENT'
export const CANCEL_EVENT = 'CANCEL_EVENT'

export function tick() {
  return {
    type: TICK
  }
}

export function setPercent(statName, percent) {
  return{
    type: SET_PERCENT,
    percent: percent,
    statName: statName
  }
}

export function successfulBreakthrough() {
  return {
    type: SUCCESSFUL_BREAKTHROUGH
  }
}

export function startEvent(eventName) {
  return {
    type: START_EVENT,
    eventName: eventName
  }
}
export function progressEvent() {
  return {
    type: PROGRESS_EVENT
  }
}
export function finishEvent() {
  return {
    type: FINISH_EVENT
  }
}
export function cancelEvent()  {
  return {
    type: CANCEL_EVENT
  }
}
