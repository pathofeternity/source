import { TICK } from './actions.js'

const initialState = {
  score: 0
}

// Top-level reducer. 
export function pathApp(state = initialState, action) {
  switch (action.type) {
    case TICK:
    return Object.assign({}, state, {
      score: state.score + 1
    })
    default:
    return state
  }
}
