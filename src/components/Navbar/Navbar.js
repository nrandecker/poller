import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { logIn, logOut } from '../../modules/navbar'
import './Navbar.scss'

const mapStatetoProps = (state) => ({
  loggedIn: state.navbar.loggedIn
})

const mapDispatchToProps = {
  logIn,
  logOut
}

class Login extends Component {
  static muiName = 'FlatButton';

  render () {
    return (
      <div>
        <Link to='/login'>
          <FlatButton {...this.props} label='Login' />
        </Link>
        <Link to='/signup'>
          <FlatButton {...this.props} label='Signup' />
        </Link>
      </div>
    )
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText='Sign out' />
  </IconMenu>
)

Logged.muiName = 'IconMenu'

export const Navbar = (props) => (
  <MuiThemeProvider>
    <div className='navbar'>
      <AppBar
        showMenuIconButton={false}
        title={<IndexLink to='/' activeClassName='route--active'>
          Poller
        </IndexLink>}
        iconElementRight={props.loggedIn ? <Logged /> : <Login />}
      />
    </div>
  </MuiThemeProvider>
)

export default connect(mapStatetoProps, mapDispatchToProps)(Navbar)
