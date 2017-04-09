export function startEventReducer(state, action) {
  return Object.assign({}, state, {activeEvent: action.eventName, eventStep: 0})
}

export function progressEventReducer(state) {
  return Object.assign({}, state, {eventStep: state.eventStep + 1})
}

export function endEventReducer(state) {
  return Object.assign({}, state, {activeEvent: null, eventStep: 0})
}
