import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../styles/core.scss';
import NavbarContainer from '../../components/Navbar/NavbarContainer';
import Footer from '../../components/Footer/Footer';

const muiTheme = getMuiTheme({
  fontFamily: 'Montserrat, sans-serif ',
  palette: {
    primary1Color: '#2196F3',
  },
});

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <NavbarContainer />
      {children}
      <Footer />
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default CoreLayout;
