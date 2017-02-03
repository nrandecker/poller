// ------------------------------------
// Constants
// ------------------------------------
export const ADD_OPTION = 'ADD_OPTION';
export const REMOVE_OPTION = 'REMOVE_OPTION';

// ------------------------------------
// Actions
// ------------------------------------
export function addOption(index) {
  return {
    type: ADD_OPTION,
    index,
  };
}

export function removeOption(index) {
  return {
    type: REMOVE_OPTION,
    index,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_OPTION]: (state, action) => ({
    ...state,
    options: state.options.concat({ index: action.index + 1 }),
  }),
  [REMOVE_OPTION]: (state, action) => ({
    ...state,
    options: [...state.options.slice(0, action.index), ...state.options.slice(action.index + 1)],
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  options: [
    { index: 0 },
    { index: 1 },
  ],
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
