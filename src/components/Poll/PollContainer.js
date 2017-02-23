import { connect } from 'react-redux';
import { getPoll, showVote, vote, reset, checkVote } from '../../modules/poll';
import Poll from './Poll';

const mapStatetoProps = state => ({
  pollTitle: state.poll.pollTitle,
  pollOptions: state.poll.pollOptions,
  optionVote: state.poll.optionVote,
  votes: state.poll.votes,
  voted: state.poll.voted,
});

const mapDispatchToProps = {
  getPoll,
  showVote,
  vote,
  reset,
  checkVote,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Poll);
