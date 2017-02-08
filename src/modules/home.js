import axios from 'axios';
import { browserHistory } from 'react-router';
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_OPTION = 'ADD_OPTION';
export const REMOVE_OPTION = 'REMOVE_OPTION';
export const FORM_CHANGE = 'FORM_CHANGE';
export const RESET_FORM = 'RESET_FORM';
export const SET_POLL_TITLE = 'SET_POLL_TITLE';
export const SET_POLL_OPTION = 'SET_POLL_OPTION';
export const SET_SNACKBAR_OPEN = 'SET_SNACKBAR_OPEN';
export const SET_SNACKBAR_CLOSE = 'SET_SNACKBAR_CLOSE';
// ------------------------------------
// Actions
// ------------------------------------
/*
check the form data object and dispatch the action
object is empty? set the data to empty string
*/
export function titleChange(data) {
  return (dispatch) => {
    if (data.pollTitle || data.pollTitle === '') {
      dispatch(actions.setPollTitle(data.pollTitle));
    }
  };
}

export function optionChange(index, data) {
  return (dispatch) => {
    if (data || data === '') {
      dispatch(actions.setPollOption(index, data));
    }
  };
}

export function pollSubmit(data) {
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

        axios.post('/api/newPoll', {
          data,
        }, config).then((res) => {
          if (res.data.poll) {
            const polls = res.data.poll;
            const pollId = polls[polls.length - 1].id;
            dispatch(actions.resetForm());

            setTimeout(() => {
              browserHistory.push(`/poll/${pollId}`);
            }, 200);
          }
        }).catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      dispatch(actions.setSnackBar())
    }
  };
}
export function setSnackBar() {
  return (dispatch, getState) => {
    (getState().home.snackbar.open === true)
    ? dispatch(actions.setSnackBarClose()) : dispatch(actions.setSnackBarOpen());
  };
}

export function setSnackBarOpen() {
  return {
    type: SET_SNACKBAR_OPEN,
  };
}

export function setSnackBarClose() {
  return {
    type: SET_SNACKBAR_CLOSE,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

export function setPollTitle(pollTitle) {
  return {
    type: SET_POLL_TITLE,
    pollTitle,
  };
}

export function setPollOption(index, pollOption) {
  return {
    type: SET_POLL_OPTION,
    index,
    pollOption,
  };
}


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

export const actions = {
  removeOption,
  addOption,
  titleChange,
  optionChange,
  resetForm,
  setPollOption,
  setPollTitle,
  pollSubmit,
  setSnackBar,
  setSnackBarClose,
  setSnackBarOpen,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_OPTION]: state => ({
    ...state,
    options: state.options.concat({ text: '' }),
  }),
  [REMOVE_OPTION]: (state, action) => ({
    ...state,
    options: [...state.options.slice(0, action.index), ...state.options.slice(action.index + 1)],
  }),
  [SET_POLL_TITLE]: (state, action) => ({
    ...state,
    pollTitle: action.pollTitle,
  }),
  [SET_POLL_OPTION]: (state, action) => ({
    ...state,
    options: [...state.options.slice(0, action.index).concat([{
      text: action.pollOption,
      votes: 0,
    }]).concat(...state.options.slice(action.index + 1)),
    ],
  }),
  [RESET_FORM]: state => ({
    ...state,
    pollTitle: '',
    options: [
      { text: '' },
      { text: '' },
    ],
  }),
  [SET_SNACKBAR_OPEN]: state => ({
    ...state,
    snackbar: {
      open: true,
      message: '',
    },
  }),
  [SET_SNACKBAR_CLOSE]: state => ({
    ...state,
    snackbar: {
      open: false,
      message: '',
    },
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pollTitle: '',
  options: [
    { text: '' },
    { text: '' },
  ],
  snackbar: {
    open: false,
    message: '',
  },
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
