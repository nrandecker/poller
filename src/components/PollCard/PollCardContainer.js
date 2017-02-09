import { connect } from 'react-redux';
import { getPolls } from '../../modules/pollCard';
import PollCard from './PollCard';

const mapStatetoProps = state => ({
  polls: state.pollCard.polls,
});

const mapDispatchToProps = {
  getPolls,
};

export default connect(mapStatetoProps, mapDispatchToProps)(PollCard);
