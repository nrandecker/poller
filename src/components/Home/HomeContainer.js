import { connect } from 'react-redux'
import { addOption, removeOption } from '../../modules/home'
import Home from './Home'

const mapStatetoProps = (state) => ({
  options: state.home.options
})

const mapDispatchToProps = {
  addOption,
  removeOption
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
