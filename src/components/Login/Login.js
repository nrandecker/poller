import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

const style = {
  height: '100%',
  textAlign: 'center',
  padding: 15,
  checkbox: {
    marginBottom: 16,
    width: '',
  },
  textField: {
    width: '85%',
  },
  checkboxLabel: {
    width: '100%',
    marginRight: '20px',
  },
  button: {
    width: '85%',
    margin: 12,
  },
};

class Login extends Component {
  handleChange = (e) => {
    this.props.formChange({ [e.target.name]: e.target.value });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.props.email,
      password: this.props.password,
    };
    this.props.login(data);
  }
  handleGoogleLogin = () => {
    this.props.googleLogin();
  }
  handleGithubLogin = () => {
    this.props.githubLogin();
  }
  handleSnackbarClose = () => {
    this.props.setSnackBar('');
  }
  handleOnFocus = (e) => {
    this.props.formTouched(e.target.name);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-by-three six columns">
            <div className="form">
              <Paper style={style} zDepth={2} >
                <h1> Log In </h1>
                <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                  <TextField
                    style={style.textField}
                    hintText="Email"
                    type="text"
                    name="email"
                    errorText={this.props.error.emailError || this.props.error.serverError}
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.props.email}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                  /><br />
                  <TextField
                    style={style.textField}
                    hintText="Password"
                    name="password"
                    type="password"
                    errorText={this.props.error.passwordError || this.props.error.serverError}
                    value={this.props.password}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                  /><br />
                  <RaisedButton label="Login" type="submit" disabled={this.props.submitDisabled} primary style={style.button} />
                </form>
                <Divider />
                <RaisedButton
                  label="Login with Github"
                  secondary
                  style={style.button}
                  onClick={this.handleGithubLogin}
                  icon={<FontIcon className="fa fa-github-alt" />}
                />
                <RaisedButton
                  label="Login with Google"
                  secondary
                  style={style.button}
                  onClick={this.handleGoogleLogin}
                  icon={<FontIcon className="fa fa-google" />}
                />
                <div className="no-account">
                  <p>Don't have an account?</p>
                  <Link to="/signup">
                    <RaisedButton label="Signup" primary style={style.button} />
                  </Link>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.props.snackbar.open}
          message={this.props.snackbar.message}
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

Login.propTypes = {
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  login: React.PropTypes.func.isRequired,
  formChange: React.PropTypes.func.isRequired,
  snackbar: React.PropTypes.shape({
    open: React.PropTypes.bool,
    message: React.PropTypes.string,
  }).isRequired,
  setSnackBar: React.PropTypes.func.isRequired,
  googleLogin: React.PropTypes.func.isRequired,
  githubLogin: React.PropTypes.func.isRequired,
  formTouched: React.PropTypes.func.isRequired,
  submitDisabled: React.PropTypes.bool.isRequired,
  error: React.PropTypes.shape({
    firstNameError: React.PropTypes.string,
    lastNameError: React.PropTypes.string,
    passwordError: React.PropTypes.string,
    emailError: React.PropTypes.string,
    serverError: React.PropTypes.string,
  }).isRequired,
};

export default Login;
