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
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-by-three six columns'>
            <div className='form'>
              <Paper style={style} zDepth={2} >
                <h1> Signup </h1>
                <form>
                    <TextField
                      style={style.textField}
                      hintText='First Name'
                    /><br />
                    <TextField
                      style={style.textField}
                      hintText='Last Name'
                    /><br />
                    <TextField
                      style={style.textField}
                      hintText='Email'
                    /><br />
                    <TextField
                      style={style.textField}
                      hintText='Password'
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
