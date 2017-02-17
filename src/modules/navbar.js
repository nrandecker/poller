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
  return (dispatch) => {
    if (window.localStorage.token) {
      try {
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
          let user;
          if (tokenSource === 'github') {
            user = res.data.user.github;
          } else if (tokenSource === 'google') {
            user = res.data.user.google;
          } else {
            user = res.data.user.local;
          }
          dispatch(setUser(user));
          dispatch(logIn());
        }).catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
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
  [LOG_IN]: state => ({
    ...state,
    authenticated: true,
  }),
  [LOG_OUT]: state => ({
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
