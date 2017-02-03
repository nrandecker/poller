import axios from 'axios';
import { browserHistory } from 'react-router';

// ------------------------------------
// Constants
// ------------------------------------
export const FORM_CHANGE = 'FORM_CHANGE';
export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const RESET_FORM = 'RESET_FORM';
export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const SET_SNACKBAR = 'SET_SNACKBAR';
export const SET_SNACKBAR_OPEN = 'SET_SNACKBAR_OPEN';
export const SET_SNACKBAR_CLOSE = 'SET_SNACKBAR_CLOSE';

// ------------------------------------
// Actions
// ------------------------------------

/* helper function to extract route params from url
   credit http://www.netlobo.com/url_query_string_javascript.html
*/
function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  const regexS = `[\\?&]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
}

export function googleLogin() {
  return (dispatch) => {
    const url = 'http://localhost:3000/auth/google';
    const redirectUri = 'http://localhost:3000/signup';

    const win = window.open(url, 'name', 'height=600, width=450');
    if (win) win.focus();
    const pollTimer = window.setInterval(() => {
      try {
        if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
          window.clearInterval(pollTimer);
          const res = gup('?', win.location.search);
          win.close();

          // store our token in localStorge
          window.localStorage.token = JSON.stringify(({
            token: res,
            source: 'google',
          }));
          setTimeout(() => {
            // redirect to home page
            browserHistory.push('/');
          }, 200);
        }
      } catch (err) {

      }
    }, 100);
  };
}

export function githubLogin() {
  return (dispatch) => {
    const url = '/auth/github';
    const redirectUri = 'http://localhost:3000/signup';
    const win = window.open(url, 'name', 'height=600, width=450');
    if (win) win.focus();
    const pollTimer = window.setInterval(() => {
      try {
        if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
          window.clearInterval(pollTimer);
          const res = gup('?', win.location.search);
          win.close();

          // store our token in localStorge
          window.localStorage.token = JSON.stringify(({
            token: res,
            source: 'github',
          }));
          setTimeout(() => {
            // redirect to home page
            browserHistory.push('/');
          }, 200);
        }
      } catch (err) {

      }
    }, 100);
  };
}

export function signUp(data) {
  return (dispatch) => {
    axios.post('/auth/signup', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      // Give feedback to user and reset the form
      dispatch(actions.setSnackBar('User account succesfully created.'));
      dispatch(actions.resetForm());

      setTimeout(() => {
        // redirect to login page
        browserHistory.push('/login');
      }, 2000);
    })
    .catch((err) => {
      if (err.response) {
        dispatch(actions.setError(err.response.data.message));
      }
    });
  };
}

export function login(data) {
  return (dispatch, getState) => {
    axios.post('/auth/login', {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      // Give feedback to user and reset the form
      dispatch(actions.setSnackBar('User logged in.'));
      dispatch(actions.resetForm());

      // store our token in localStorge
      window.localStorage.token = JSON.stringify(({
        token: res.data.token,
        source: 'local',
      }));

      setTimeout(() => {
        // redirect to home page
        browserHistory.push('/');
      }, 2000);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        dispatch(actions.setError(err.response.data.message));
      }
    });
  };
}

/*
check the form data object and dispatch the action
object is empty? set the data to empty string
*/
export function formChange(data) {
  return (dispatch) => {
    if (data.firstName || data.firstName === '') {
      dispatch(actions.setFirstName(data.firstName));
    } else if (data.lastName || data.lastName === '') {
      dispatch(actions.setLastName(data.lastName));
    } else if (data.email || data.email === '') {
      dispatch(actions.setEmail(data.email));
    } else if (data.password || data.password === '') {
      dispatch(actions.setPassword(data.password));
    }
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

export function setSnackBar(message) {
  return (dispatch, getState) => {
    (getState().form.snackbar.open === true)
    ? dispatch(setSnackBarClose(message)) : dispatch(setSnackBarOpen(message));
  };
}

export function setSnackBarOpen(message) {
  return {
    type: SET_SNACKBAR_OPEN,
    message,
  };
}

export function setSnackBarClose(message) {
  return {
    type: SET_SNACKBAR_CLOSE,
    message,
  };
}

export function setUser(userResponse) {
  const user = {
    email: userResponse.email,
    firstName: userResponse.firstName,
    lastName: userResponse.lastName,
  };

  return {
    type: SET_USER,
    user,
  };
}

export function setFirstName(firstName) {
  return {
    type: SET_FIRST_NAME,
    firstName,
  };
}

export function setLastName(lastName) {
  return {
    type: SET_LAST_NAME,
    lastName,
  };
}

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email,
  };
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  };
}

export const actions = {
  signUp,
  formChange,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  resetForm,
  setUser,
  setError,
  setSnackBar,
  setSnackBarOpen,
  setSnackBarClose,
  googleLogin,
  githubLogin,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FIRST_NAME]: (state, action) => ({
    ...state,
    firstName: action.firstName,
  }),
  [SET_LAST_NAME]: (state, action) => ({
    ...state,
    lastName: action.lastName,
  }),
  [SET_EMAIL]: (state, action) => ({
    ...state,
    email: action.email,
  }),
  [SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
  }),
  [RESET_FORM]: (state, action) => ({
    ...state,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }),
  [SET_USER]: (state, action) => ({
    ...state,
    user: {
      firstName: action.user.firstName,
      lastName: action.user.lastName,
      email: action.user.email,
    },
  }),
  [SET_ERROR]: (state, action) => ({
    ...state,
    error: action.error,
  }),
  [SET_SNACKBAR_OPEN]: (state, action) => ({
    ...state,
    snackbar: {
      open: true,
      message: action.message,
    },
  }),
  [SET_SNACKBAR_CLOSE]: (state, action) => ({
    ...state,
    snackbar: {
      open: false,
      message: action.message,
    },
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: {},
  user: {},
  snackbar: {
    open: false,
    message: '',
  },
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
