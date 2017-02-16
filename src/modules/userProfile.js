import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// ------------------------------------
// Actions
// ------------------------------------'
export function getUserPolls() {
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
          dispatch(actions.setCurrentUser(res.data.user));
        }).catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export function deletePoll(id, index) {
  return (dispatch) => {
    if (window.localStorage.token) {
      try {
        const token = JSON.parse(window.localStorage.token);

        const config = {
          headers: {
            authorization: token.token,
          },
        };

        axios.post('/api/deletePoll', {
          id,
          index,
        }, config).then(() => {
          dispatch(actions.getUserPolls());
        }).catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export const actions = {
  getUserPolls,
  setCurrentUser,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CURRENT_USER]: (state, action) => ({
    ...state,
    currentUser: Object.assign({}, action.user),
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentUser: {
    local: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    github: {
      id: '',
      token: '',
      email: '',
      string: '',
    },
    google: {
      id: '',
      token: '',
      email: '',
      string: '',
    },
    polls: [{
      id: '',
      title: '',
      options: [{}],
      created: '',
      createby: '',
    }],
  },
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
