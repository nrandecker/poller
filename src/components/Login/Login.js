import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
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
      email: this.props.email,
      password: this.props.password
    };
    this.props.login(data);
  }
  handleSnackbarClose = () => {
    this.props.setSnackBar('');
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-by-three six columns'>
            <div className='form'>
              <Paper style={style} zDepth={2} >
                <h1> Log In </h1>
                <form onSubmit={this.handleFormSubmit}>
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
                    name='password'
                    type='password'
                    value={this.props.password}
                    onChange={this.handleChange}
                    /><br />
                  <div className='check-box'>
                    <Checkbox
                      label='Remeber Me'
                      style={style.checkbox}
                      labelStyle={style.checkboxLabel}
                      />
                    <Link to='/forgot'>
                      <p>Forgot Password?</p>
                    </Link>
                  </div>
                  <RaisedButton label='Login' type='submit' primary style={style.button} />
                </form>
                <Divider />
                <RaisedButton
                  label='Login with Github'
                  secondary
                  style={style.button}
                  icon={<FontIcon className='fa fa-github-alt' />}
                />
                <RaisedButton
                  label='Login with Google'
                  secondary
                  style={style.button}
                  icon={<FontIcon className='fa fa-google' />}
                />
                <div className='no-account'>
                  <p>Don't have an account?</p>
                  <Link to='/signup'>
                    <RaisedButton label='Signup' primary style={style.button} />
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
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  login: React.PropTypes.func,
  formChange: React.PropTypes.func,
  snackbar: React.PropTypes.object,
  setSnackBar: React.PropTypes.func
};

export default Signup;
