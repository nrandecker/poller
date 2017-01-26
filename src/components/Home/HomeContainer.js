import { connect } from 'react-redux'
import { addOption } from '../../modules/home'
import Home from './Home'

const mapStatetoProps = (state) => ({
  options: state.home.options
})

const mapDispatchToProps = {
  addOption
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
