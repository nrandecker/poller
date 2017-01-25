import React from 'react'
import '../../styles/core.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

export const CoreLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
)

export default CoreLayout
