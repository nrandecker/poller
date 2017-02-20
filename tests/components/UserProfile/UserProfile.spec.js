import React from 'react';
import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import {expect} from 'chai';

import UserProfile from '../../../src/components/UserProfile/UserProfile';

describe('<UserProfile/>', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      currentUser: {
        local: {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        },
        github: {
          id: '',
          token: '',
          email: '',
          string: '',
        },
        google: {
          id: '',
          token: '',
          email: '',
          string: '',
        },
        polls: [{
          id: '',
          title: '',
          options: [{}],
          created: '',
          createby: '',
        }],
      },
      ...bindActionCreators({
        getUserPolls: (_spies.getUserPolls = sinon.spy()),
        deletePoll: (_spies.getUserPolls = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<UserProfile {..._props} />)
  });

  it('renders without exploding', () => {
    expect(_wrapper).to.have.length(1);
  });
});
