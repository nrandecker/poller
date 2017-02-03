import axios from 'axios';
import { setUser } from './form';

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

// ------------------------------------
// Actions
// ------------------------------------
export function auth() {
  return (dispatch, getState) => {
    if (window.localStorage.token) {
      const token = JSON.parse(window.localStorage.token);
      const tokenSource = token.source;

      const config = {
        headers: {
          authorization: token.token,
        },
      };

      axios.post('/auth/authenticate', {
        source: tokenSource,
      }, config).then((res) => {
        const user = res.data.user.local;
        dispatch(setUser(user));
        dispatch(logIn());
      }).catch((err) => {
        console.log(err);
      });
    }
  };
}

export function logIn() {
  return {
    type: LOG_IN,
  };
}

export function logOut() {
  delete window.localStorage.token;
  return {
    type: LOG_OUT,
  };
}

export const actions = {
  logIn,
  logOut,
  auth,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_IN]: (state, action) => ({
    ...state,
    authenticated: true,
  }),
  [LOG_OUT]: (state, action) => ({
    ...state,
    authenticated: false,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  authenticated: false,
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
