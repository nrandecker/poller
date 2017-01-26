import React from 'react'
import '../../styles/core.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const muiTheme = getMuiTheme({
  fontFamily: 'Montserrat, sans-serif ',
  palette: {
    primary1Color: '#2196F3'
  }
})

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  </MuiThemeProvider>
)

export default CoreLayout
