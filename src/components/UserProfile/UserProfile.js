import React, { Component } from 'react';

import UserPolls from './UserPolls';


class UserProfile extends Component {
  render() {
    return (
      <div>
        User Profile
        <UserPolls />
      </div>
    );
  }
}

export default UserProfile;
