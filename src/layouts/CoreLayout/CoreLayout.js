import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

export const CoreLayout = ({ children }) => (
  <div>
    <Navbar />
    <p> Hello </p>
    {children}
    <Footer />
  </div>
)

export default CoreLayout
