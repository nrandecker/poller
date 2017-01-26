import { connect } from 'react-redux'
import { logIn, logOut } from '../../modules/navbar'
import Navbar from './Navbar'

const mapStatetoProps = (state) => ({
  loggedIn: state.navbar.loggedIn
})

const mapDispatchToProps = {
  logIn,
  logOut
}

export default connect(mapStatetoProps, mapDispatchToProps)(Navbar)
