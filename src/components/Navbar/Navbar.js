import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const styles = {
  boxShadow: 'none',
  margin: '0 auto',
  padding: ''
}

const buttonStyles = {
  color: 'white',
  fontSize: '16px',
  marginRight: '10px'
}

class Login extends Component {
  static muiName = 'FlatButton';

  render () {
    return (
      <div>
        <Link to='/login'>
          <FlatButton {...this.props} labelStyle={buttonStyles} hoverColor='#2196F3' label='Login' />
        </Link>
        <Link to='/signup'>
          <FlatButton {...this.props} labelStyle={buttonStyles} hoverColor='#2196F3' label='Signup' />
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
  <AppBar
    style={styles}
    className='navbar'
    showMenuIconButton={false}
    title={<IndexLink to='/' activeClassName='route--active'>
      <i className='icon fa fa-hand-peace-o' aria-hidden='true' />
      Poller
    </IndexLink>}
    iconElementRight={props.loggedIn ? <Logged /> : <Login />}
  />
)

Navbar.propTypes = {
  loggedIn : React.PropTypes.bool
}

export default Navbar
