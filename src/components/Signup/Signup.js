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
    width: ''
  },
  textField: {
    width: '80%'
  },
  checkboxLabel: {
    width: '100%',
    marginRight: '20px'
  },
  button: {
    width: '80%',
    margin: 12
  }
};

class Signup extends Component {
  handleChange = (e) => {
    this.props.formChange({ [e.target.name]: e.target.value });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    let data = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.props.password
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
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-by-three six columns'>
            <div className='form'>
              <Paper style={style} zDepth={2} >
                <h1> Signup </h1>
                <form onSubmit={this.handleFormSubmit}>
                  <TextField
                    style={style.textField}
                    hintText='First Name'
                    type='text'
                    name='firstName'
                    value={this.props.firstName}
                    onChange={this.handleChange}
                    /><br />
                  <TextField
                    style={style.textField}
                    hintText='Last Name'
                    type='text'
                    name='lastName'
                    value={this.props.lastName}
                    onChange={this.handleChange}
                    /><br />
                  <TextField
                    style={style.textField}
                    hintText='Email'
                    type='text'
                    name='email'
                    value={this.props.email}
                    onChange={this.handleChange}
                    /><br />
                  <TextField
                    style={style.textField}
                    hintText='Password'
                    type='password'
                    name='password'
                    value={this.props.password}
                    onChange={this.handleChange}
                    /><br />
                  <RaisedButton label='Signup' type='submit' primary style={style.button} />
                </form>
                <Divider />
                <RaisedButton
                  label='Signup with Github'
                  secondary
                  style={style.button}
                  onClick={this.handleGithubLogin}
                  icon={<FontIcon className='fa fa-github-alt' />}
                />
                <RaisedButton
                  label='Signup with Google'
                  secondary
                  style={style.button}
                  onClick={this.handleGoogleLogin}
                  icon={<FontIcon className='fa fa-google' />}
                />
                <div className='no-account'>
                  <p>Already have an account?</p>
                  <Link to='/login'>
                    <RaisedButton label='Login' primary style={style.button} />
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
  githubLogin: React.PropTypes.func
};

export default Signup;
