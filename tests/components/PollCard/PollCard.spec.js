import React from 'react';
import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import {expect} from 'chai';

import PollCard from '../../../src/components/PollCard/PollCard';

describe('<PollCard/>', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      polls: [],
      ...bindActionCreators({
        getPolls: (_spies.getPolls = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<PollCard {..._props} />)
  });

  it('renders without exploding', () => {
    expect(_wrapper).to.have.length(1);
  });
});
