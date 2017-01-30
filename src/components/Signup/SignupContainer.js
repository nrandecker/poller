import { connect } from 'react-redux';
import { signUp, formChange } from '../../modules/signup';
import Signup from './Signup';

const mapStatetoProps = (state) => ({
  error: state.signup.error,
  firstName: state.signup.firstName,
  lastName: state.signup.lastName,
  email: state.signup.email,
  password: state.signup.password
});

const mapDispatchToProps = {
  signUp,
  formChange
};

export default connect(mapStatetoProps, mapDispatchToProps)(Signup);
