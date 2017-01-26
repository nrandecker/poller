// ------------------------------------
// Constants
// ------------------------------------
export const ADD_OPTION = 'ADD_OPTION'

// ------------------------------------
// Actions
// ------------------------------------
export function addOption () {
  return {
    type: ADD_OPTION
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_OPTION] : (state, action) => ({
    ...state,
    options: state.options + 1
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  options: 1
}

export default function navbarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
