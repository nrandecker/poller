// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

// ------------------------------------
// Actions
// ------------------------------------
export function logIn () {
  return {
    type: LOG_IN
  }
}

export function logOut () {
  return {
    type: LOG_OUT
  }
}

export const actions = {
  logIn,
  logOut
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_IN] : (state, action) => state.loggedIn = true,
  [LOG_OUT] : (state, action) => state.loggedIn = false
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loggedIn: false
}

export default function navbarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
