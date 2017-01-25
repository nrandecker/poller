import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Navbar from '../../components/Navbar/Navbar'

export const CoreLayout = ({ children }) => (
  <div>
    <Navbar />
    <p> Hello </p>
    {children}
  </div>
)

export default CoreLayout
