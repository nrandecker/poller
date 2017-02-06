import { connect } from 'react-redux';
import { addOption, removeOption, titleChange, optionChange, pollSubmit, setSnackBar } from '../../modules/home';
import Home from './Home';

const mapStatetoProps = state => ({
  options: state.home.options,
  pollTitle: state.home.pollTitle,
  snackbar: state.home.snackbar,
});

const mapDispatchToProps = {
  addOption,
  removeOption,
  titleChange,
  optionChange,
  pollSubmit,
  setSnackBar,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
