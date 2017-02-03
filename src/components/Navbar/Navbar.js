import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  boxShadow: 'none',
  margin: '0 auto',
  padding: '',
  buttonStyles: {
    color: 'white',
    fontSize: '16px',
    marginRight: '10px',
  },
  iconMenuStyles: {
    marginRight: '20px',
  },
};

const Login = props => (
  <div>
    <Link to="/login">
      <FlatButton {...props} labelStyle={styles.buttonStyles} hoverColor="#2196F3" label="Login" />
    </Link>
    <Link to="/signup">
      <FlatButton {...props} labelStyle={styles.buttonStyles} hoverColor="#2196F3" label="Signup" />
    </Link>
  </div>
);

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton
        style={styles.iconMenuStyles}
        touch
      ><MoreVertIcon />
      </IconButton>
    }
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class Navbar extends Component {
  componentWillMount() {
    this.props.auth();
  }
  componenetDidUpdate() {
    this.props.auth();
  }

  handleLogOut = () => {
    this.props.logOut();
  }
  render() {
    return (
      <AppBar
        style={styles}
        className="navbar"
        showMenuIconButton={false}
        title={<IndexLink to="/" activeClassName="route--active">
          <i className="icon fa fa-hand-peace-o" aria-hidden="true" />
          Poller
        </IndexLink>}
        iconElementRight={this.props.authenticated ? <Logged /> : <Login />}
      />
    );
  }
}

Navbar.propTypes = {
  authenticated: React.PropTypes.bool,
  auth: React.PropTypes.func,
  logOut: React.PropTypes.func,
};

export default Navbar;
