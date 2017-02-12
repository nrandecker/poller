import { connect } from 'react-redux';
import { login, formChange, setError, setSnackBar, googleLogin, githubLogin, formTouched } from '../../modules/form';
import Login from './Login';

const mapStatetoProps = state => ({
  error: state.form.error,
  email: state.form.email,
  password: state.form.password,
  user: state.form.user,
  snackbar: state.form.snackbar,
  touched: state.form.touched,
});

const mapDispatchToProps = {
  login,
  formChange,
  setError,
  setSnackBar,
  googleLogin,
  githubLogin,
  formTouched,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
