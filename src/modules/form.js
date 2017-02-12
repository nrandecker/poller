import axios from 'axios';
import { browserHistory } from 'react-router';
import validator from 'validator';
import { auth } from './navbar';

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

export const SET_TOUCHED = 'SET_TOUCHED';
export const SET_FIRST_NAME_ERROR = 'SET_FIRST_NAME_ERROR';
export const SET_LAST_NAME_ERROR = 'SET_LAST_NAME_ERROR';
export const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR';
export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';
export const SET_SERVER_ERROR = 'SET_SERVER_ERROR';

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
    const redirectUri = '/signup';

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
            dispatch(auth());
            // redirect to home page
            browserHistory.push('/');
          }, 200);
        }
      } catch (err) {
        console.log(err);
      }
    }, 100);
  };
}

export function githubLogin() {
  return (dispatch) => {
    const url = '/auth/github';
    const redirectUri = '/signup';
    const win = window.open(url, 'name', 'height=600, width=450');
    if (win) win.focus();
    const pollTimer = window.setInterval(() => {
      try {
        if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
          window.clearInterval(pollTimer);
          const res = gup('?', win.location.search);
          win.close();

          try {
            // store our token in localStorge
            window.localStorage.token = JSON.stringify(({
              token: res,
              source: 'github',
            }));
          } catch (e) {
            console.log(e);
          }
          setTimeout(() => {
            dispatch(auth());
            // redirect to home page
            browserHistory.push('/');
          }, 200);
        }
      } catch (err) {
        console.log(err);
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
    .then(() => {
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
        dispatch(actions.setServerError(err.response.data.message));
      }
    });
  };
}

export function login(data) {
  return (dispatch) => {
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
        dispatch(auth());
        // redirect to home page
        browserHistory.push('/');
      }, 2000);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        dispatch(actions.setServerError(err.response.data.message));
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
    dispatch(actions.validate(data));
  };
}

export function setSnackBar(message) {
  return (dispatch, getState) => {
    (getState().form.snackbar.open === true)
    ? dispatch(setSnackBarClose(message)) : dispatch(setSnackBarOpen(message));
  };
}

export function validate(data) {
  return (dispatch, getState) => {
    if (getState().form.touched.email && data.email) {
      if (validator.isEmail(data.email)) {
        dispatch(actions.setEmailError(''));
      } else {
        dispatch(actions.setEmailError('Email is invaild'));
      }
    } else if (getState().form.touched.password) {
      if (data.password === '') {
        dispatch(actions.setPasswordError('Password Field is required'));
      } else {
        dispatch(actions.setPasswordError(''));
      }
    } else if (getState().form.touched.firstName) {
      if (data.firstName === '') {
        dispatch(actions.setFirstNameError('First Name is required'));
      } else {
        dispatch(actions.setFirstNameError(''))
      }
    } else if (getState().form.touched.lastName) {
      if (data.lastName === '') {
        dispatch(actions.setLastNameError('Last Name is required'));
      } else {
        dispatch(actions.setLastNameError(''));
      }
    }
  };
}

export function formTouched(data) {
  return (dispatch, getState) => {
    const newTouched = Object.assign({}, getState().form.touched);
    if (data === 'firstName') {
      newTouched.firstName = true;
    }
    if (data === 'lastName') {
      newTouched.lastName = true;
    }

    if (data === 'email') {
      newTouched.email = true;
    }
    if (data === 'password') {
      newTouched.password = true;
    }
    dispatch(actions.setTouched(newTouched));
  };
}


export function setTouched(touched) {
  return {
    type: SET_TOUCHED,
    touched,
  };
}

export function setLastNameError(lastNameError) {
  return {
    type: SET_LAST_NAME_ERROR,
    lastNameError,
  };
}

export function setFirstNameError(firstNameError) {
  return {
    type: SET_FIRST_NAME_ERROR,
    firstNameError,
  };
}

export function setPasswordError(passwordError) {
  return {
    type: SET_PASSWORD_ERROR,
    passwordError,
  };
}

export function setEmailError(emailError) {
  return {
    type: SET_EMAIL_ERROR,
    emailError,
  };
}

export function setServerError(serverError) {
  return {
    type: SET_SERVER_ERROR,
    serverError,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
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
  formTouched,
  setTouched,
  validate,
  setServerError,
  setEmailError,
  setFirstNameError,
  setLastNameError,
  setPasswordError,
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
  [RESET_FORM]: state => ({
    ...state,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }),
  [SET_TOUCHED]: (state, action) => ({
    ...state,
    touched: {
      firstName: action.touched.firstName,
      lastName: action.touched.lastName,
      password: action.touched.password,
      email: action.touched.email,
    },
  }),
  [SET_USER]: (state, action) => ({
    ...state,
    user: {
      firstName: action.user.firstName,
      lastName: action.user.lastName,
      email: action.user.email,
    },
  }),
  [SET_SERVER_ERROR]: (state, action) => ({
    ...state,
    error: {
      serverError: action.serverError,
    },
  }),
  [SET_EMAIL_ERROR]: (state, action) => ({
    ...state,
    error: {
      emailError: action.emailError,
    },
  }),
  [SET_FIRST_NAME_ERROR]: (state, action) => ({
    ...state,
    error: {
      firstNameError: action.firstNameError,
    },
  }),
  [SET_LAST_NAME_ERROR]: (state, action) => ({
    ...state,
    error: {
      lastNameError: action.lastNameError,
    },
  }),
  [SET_PASSWORD_ERROR]: (state, action) => ({
    ...state,
    error: {
      passwordError: action.passwordError,
    },
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
  touched: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  error: {
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    serverError: '',
  },
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
