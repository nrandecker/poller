import { connect } from 'react-redux';
import { auth, logOut } from '../../modules/navbar';
import Navbar from './Navbar';

const mapStatetoProps = state => ({
  authenticated: state.navbar.authenticated,
});

const mapDispatchToProps = {
  auth,
  logOut,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Navbar);
