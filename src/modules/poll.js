import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_POLL_TITLE = 'SET_POLL_TITLE';
export const SET_POLL_OPTIONS = 'SET_POLL_OPTIONS';
export const SET_POLL_VOTES = 'SET_POLL_VOTES';
export const SET_OPTION_VOTE = 'SET_VOTE';
export const SHOW_VOTE_TRUE = 'SHOW_VOTE_TRUE';
export const SHOW_VOTE_FALSE = 'SHOW_VOTE_FALSE';
export const SET_VOTE = 'SET_VOTE';
export const RESET = 'RESET';

// ------------------------------------
// Actions
// ------------------------------------

export function getPoll(id) {
  return (dispatch) => {
    axios.get(`/api/getPoll/${id}`)
    .then((res) => {
      const { poll } = res.data;
      dispatch(actions.setPollTitle(poll[0].title));
      dispatch(actions.setPollVotes(poll[0].options));
      dispatch(actions.setPollOptions(poll[0].options));
    })
    .catch((err) => {
      console.log(err);
    });
  };
}

export function vote(id, option) {
  return (dispatch) => {
    axios.post('/api/vote', {
      id,
      option,
    })
    .then((res) => {
      const { poll } = res.data;
      dispatch(actions.setPollVotes(poll));
      dispatch(actions.setVoteStatus(true));
    })
    .catch((err) => {
      console.log(err);
    });
  };
}

export function setPollVotes(poll) {
  const votes = [];

  poll.map((option) => {
    return votes.push(option.votes);
  });

  return {
    type: SET_POLL_VOTES,
    votes,
  };
}

export function setVoteStatus(voteStatus) {
  return {
    type: SET_VOTE,
    voteStatus,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function showVote() {
  return (dispatch, getState) => {
    const { optionVote } = getState().poll;
    (optionVote === false) ? dispatch(actions.showVoteTrue()) : dispatch(actions.showVoteFalse());
  };
}

export function showVoteTrue() {
  return {
    type: SHOW_VOTE_TRUE,
  };
}

export function showVoteFalse() {
  return {
    type: SHOW_VOTE_FALSE,
  };
}

export function setPollOptions(options) {
  return {
    type: SET_POLL_OPTIONS,
    options,
  };
}

export function setPollTitle(title) {
  return {
    type: SET_POLL_TITLE,
    title,
  };
}

export const actions = {
  getPoll,
  setPollTitle,
  setPollOptions,
  showVote,
  vote,
  setPollVotes,
  showVoteFalse,
  showVoteTrue,
  setVoteStatus,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_POLL_TITLE]: (state, action) => ({
    ...state,
    pollTitle: action.title,
  }),
  [SET_POLL_OPTIONS]: (state, action) => ({
    ...state,
    pollOptions: action.options,
  }),
  [SHOW_VOTE_TRUE]: state => ({
    ...state,
    optionVote: true,
  }),
  [SHOW_VOTE_FALSE]: state => ({
    ...state,
    optionVote: false,
  }),
  [SET_POLL_VOTES]: (state, action) => ({
    ...state,
    votes: action.votes,
  }),
  [SET_VOTE]: (state, action) => ({
    ...state,
    voted: action.voteStatus,
  }),
  [RESET]: state => ({
    ...state,
    pollTitle: '',
    pollOptions: [],
    optionVote: false,
    votes: [],
    voted: false,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pollTitle: '',
  pollOptions: [],
  optionVote: false,
  votes: [],
  voted: false,
};

export default function navbarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
