import React from 'react';
import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import {expect} from 'chai';

import Navbar from '../../../src/components/Navbar/Navbar';

describe('<Navbar/>', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      authenticated: false,
      ...bindActionCreators({
        auth: (_spies.auth = sinon.spy()),
        logOut: (_spies.logOut = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Navbar {..._props} />)
  });

  it('renders without exploding', () => {
    expect(_wrapper).to.have.length(1);
  });
});
