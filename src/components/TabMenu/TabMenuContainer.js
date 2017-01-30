import { connect } from 'react-redux';
import { setTabIndex } from '../../modules/tabmenu';
import TabMenu from './TabMenu';

const mapStatetoProps = (state) => ({
  tabIndex: state.tabmenu.tabIndex
});

const mapDispatchToProps = {
  setTabIndex
};

export default connect(mapStatetoProps, mapDispatchToProps)(TabMenu);
