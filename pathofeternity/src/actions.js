export const TICK = 'TICK'
export const SET_PERCENT = 'SET_RATE'

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
