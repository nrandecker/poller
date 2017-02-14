import { connect } from 'react-redux';
import { signUp, formChange, setError, setSnackBar, googleLogin, githubLogin, formTouched } from '../../modules/form';
import Signup from './Signup';

const mapStatetoProps = state => ({
  error: state.form.error,
  firstName: state.form.firstName,
  lastName: state.form.lastName,
  email: state.form.email,
  password: state.form.password,
  user: state.form.user,
  snackbar: state.form.snackbar,
  touched: state.form.touched,
  submitDisabled: state.form.submitDisabled,
});

const mapDispatchToProps = {
  signUp,
  formChange,
  setError,
  setSnackBar,
  googleLogin,
  githubLogin,
  formTouched,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Signup);
