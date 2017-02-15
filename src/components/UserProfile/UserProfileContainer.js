import { connect } from 'react-redux';
import { getUserPolls, deletePoll } from '../../modules/userProfile';
import UserProfile from './UserProfile';

const mapStatetoProps = state => ({
  currentUser: state.userProfile.currentUser,
});

const mapDispatchToProps = {
  getUserPolls,
  deletePoll,
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserProfile);
