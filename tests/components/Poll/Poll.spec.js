import React from 'react';
import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import {expect} from 'chai';

import Poll from '../../../src/components/Poll/Poll';

describe('<Poll/>', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      pollTitle: '',
      pollOptions: [],
      optionVote: false,
      params: {},
      votes: [],
      voted: false,
      ...bindActionCreators({
        getPoll: (_spies.getPoll = sinon.spy()),
        showVote: (_spies.showVote = sinon.spy()),
        vote: (_spies.vote = sinon.spy()),
        reset: (_spies.reset = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Poll {..._props} />)
  });

  it('renders without exploding', () => {
    expect(_wrapper).to.have.length(1);
  });
});
