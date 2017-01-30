import React, { Component } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'

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
}

class Signup extends Component {
  constructor (props) {
    super(props)
  }
  handleChange = (e) => {
    this.props.formChange({ [e.target.name]: e.target.value });
  }
  handleFormSubmit = (e) => {
    e.preventDefault()
    let data = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: this.props.password
    }
    this.props.signUp(data)
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-by-three six columns'>
            <div className='form'>
              <Paper style={style} zDepth={2} >
                <h1> Signup </h1>
                <form onSubmit={this.handleFormSubmit} ref='form'>
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
                <RaisedButton label='Signup' type='submit' primary={true} style={style.button} />
                </form>
                <Divider />
                <RaisedButton
                  label='Signup with Github'
                  secondary={true}
                  style={style.button}
                  icon={<FontIcon className='fa fa-github-alt' />}
                />
                <RaisedButton
                  label='Signup with Google'
                  secondary={true}
                  style={style.button}
                  icon={<FontIcon className='fa fa-google' />}
                />
                <div className='no-account'>
                  <p>Already have an account?</p>
                  <Link to='/login'>
                    <RaisedButton label='Login' primary={true} style={style.button} />
                  </Link>
                </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Signup
