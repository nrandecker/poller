// ------------------------------------
// Constants
// ------------------------------------
export const SET_TAB_INDEX = 'TAB_INDEX'

// ------------------------------------
// Actions
// ------------------------------------
export function setTabIndex (value) {
  return {
    type: SET_TAB_INDEX,
    value: value
  }
}

export const actions = {
  setTabIndex
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TAB_INDEX] : (state, action) => ({
    ...state,
    tabIndex: action.value
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  tabIndex: 0
}

export default function navbarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
