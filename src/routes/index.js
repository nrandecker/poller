import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from '../layouts/CoreLayout';
import HomeContainer from '../components/Home/HomeContainer';
import LoginContainer from '../components/Login/LoginContainer';
import SignupContainer from '../components/Signup/SignupContainer';
import PollContainer from '../components/Poll/PollContainer';
import UserProfileContainer from '../components/UserProfile/UserProfileContainer';

export const createRoutes = store => (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/signup" component={SignupContainer} />
    <Route path="/forgot" />
    <Route path="/profile" component={UserProfileContainer} />
    <Route path="/poll/:id" component={PollContainer} />
  </Route>
);

export default createRoutes;
