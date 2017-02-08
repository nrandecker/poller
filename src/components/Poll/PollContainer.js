import { connect } from 'react-redux';
import { getPoll, showVote, vote } from '../../modules/poll';
import Poll from './Poll';

const mapStatetoProps = state => ({
  pollTitle: state.poll.pollTitle,
  pollOptions: state.poll.pollOptions,
  optionVote: state.poll.optionVote,
  votes: state.poll.votes,
});

const mapDispatchToProps = {
  getPoll,
  showVote,
  vote,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Poll);
