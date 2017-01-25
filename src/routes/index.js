import React from 'react'
import { Route, IndexRoute } from 'react-router'

import CoreLayout from '../layouts/CoreLayout'

export const createRoutes = (store) => (
  <Route path='/' component={CoreLayout} />
)

export default createRoutes
