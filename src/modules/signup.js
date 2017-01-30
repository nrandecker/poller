// ------------------------------------
// Constants
// ------------------------------------
export const SIGN_UP_SUBMIT = 'SIGN_UP';
export const FORM_CHANGE = 'FORM_CHANGE';
export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const RESET_FORM = 'RESET_FORM';

// ------------------------------------
// Actions
// ------------------------------------
export function signUp (data) {
  return (dispatch) => {
    // reset the form
    dispatch(actions.resetForm());

    let req = new Request('/auth/signup/', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
    });

    fetch(req)
          .then(function (data) {
            console.log(data);
          }).catch(function (err) {
            console.log(err);
          });
  };
}

/*
check the form data object and dispatch the action
object is empty? set the data to empty string
*/
export function formChange (data) {
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

export function resetForm () {
  return {
    type: RESET_FORM
  };
}

export function setFirstName (firstName) {
  return {
    type: SET_FIRST_NAME,
    firstName: firstName
  };
}

export function setLastName (lastName) {
  return {
    type: SET_LAST_NAME,
    lastName: lastName
  };
}

export function setEmail (email) {
  return {
    type: SET_EMAIL,
    email: email
  };
}

export function setPassword (password) {
  return {
    type: SET_PASSWORD,
    password: password
  };
}

export const actions = {
  signUp,
  formChange,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  resetForm
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FIRST_NAME] : (state, action) => ({
    ...state,
    firstName: action.firstName
  }),
  [SET_LAST_NAME] : (state, action) => ({
    ...state,
    lastName: action.lastName
  }),
  [SET_EMAIL] : (state, action) => ({
    ...state,
    email: action.email
  }),
  [SET_PASSWORD] : (state, action) => ({
    ...state,
    password: action.password
  }),
  [RESET_FORM] : (state, action) => ({
    ...state,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  error: {}
};

export default function navbarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
