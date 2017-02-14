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
  button: {
    width: '85%',
    margin: 12,
  },
};

class Signup extends Component {
  handleChange = (e) => {
    this.props.formChange({ [e.target.name]: e.target.value });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.props.password,
    };
    this.props.signUp(data);
  }
  handleSnackbarClose = () => {
    this.props.setSnackBar('');
  }
  handleGoogleLogin = () => {
    this.props.googleLogin();
  }
  handleGithubLogin = () => {
    this.props.githubLogin();
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
                <h1> Signup </h1>
                <form autoComplete="on" onSubmit={this.handleFormSubmit}>
                  <TextField
                    style={style.textField}
                    hintText="First Name"
                    type="text"
                    name="firstName"
                    value={this.props.firstName}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                    errorText={this.props.error.firstNameError || this.props.error.serverError}
                  /><br />
                  <TextField
                    style={style.textField}
                    hintText="Last Name"
                    type="text"
                    name="lastName"
                    value={this.props.lastName}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                    errorText={this.props.error.lastNameError || this.props.error.serverError}
                  /><br />
                  <TextField
                    style={style.textField}
                    hintText="Email"
                    type="text"
                    name="email"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.props.email}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                    errorText={this.props.error.emailError || this.props.error.serverError}
                  /><br />
                  <TextField
                    style={style.textField}
                    hintText="Password"
                    type="password"
                    name="password"
                    value={this.props.password}
                    onChange={this.handleChange}
                    onFocus={this.handleOnFocus}
                    errorText={this.props.error.passwordError || this.props.error.serverError}
                  /><br />
                  <RaisedButton label="Signup" type="submit" disabled={this.props.submitDisabled} primary style={style.button} />
                </form>
                <Divider />
                <RaisedButton
                  label="Signup with Github"
                  secondary
                  style={style.button}
                  onClick={this.handleGithubLogin}
                  icon={<FontIcon className="fa fa-github-alt" />}
                />
                <RaisedButton
                  label="Signup with Google"
                  secondary
                  style={style.button}
                  onClick={this.handleGoogleLogin}
                  icon={<FontIcon className="fa fa-google" />}
                />
                <div className="no-account">
                  <p>Already have an account?</p>
                  <Link to="/login">
                    <RaisedButton label="Login" primary style={style.button} />
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

Signup.propTypes = {
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  signUp: React.PropTypes.func,
  formChange: React.PropTypes.func,
  snackbar: React.PropTypes.object,
  setSnackBar: React.PropTypes.func,
  googleLogin: React.PropTypes.func,
  githubLogin: React.PropTypes.func,
  submitDisabled: React.PropTypes.bool,
};

export default Signup;
