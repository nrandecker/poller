import axios from 'axios';
import { flatten } from 'underscore';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_POLLS = 'SET_POLLS';

// ------------------------------------
// Actions
// ------------------------------------'

export function getPolls() {
  return (dispatch) => {
    axios.get('/api/polls')
    .then((res) => {
      let { polls } = res.data;
      polls = flatten(polls);
      dispatch(actions.setPolls(polls));
    })
    .catch((err) => {
      console.log(err);
    });
  };
}

export function setPolls(polls) {
  return {
    type: SET_POLLS,
    polls,
  };
}

export const actions = {
  getPolls,
  setPolls,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_POLLS]: (state, action) => ({
    ...state,
    polls: action.polls,
  }),
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  polls: [],
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
