import React from 'react';
import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import {expect} from 'chai';

import Home from '../../../src/components/Home/Home';

describe('<Home/>', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      pollTitle: '',
      options: [
        { text: '' },
        { text: '' },
      ],
      snackbar: {
        open: false,
        message: '',
      },
      ...bindActionCreators({
        addOption: (_spies.addOption = sinon.spy()),
        removeOption: (_spies.removeOption = sinon.spy()),
        titleChange: (_spies.titleChange = sinon.spy()),
        optionChange: (_spies.optionChange = sinon.spy()),
        pollSubmit: (_spies.pollSubmit = sinon.spy()),
        setSnackBar: (_spies.setSnackBar = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Home {..._props} />)
  });

  it('renders without exploding', () => {
    expect(_wrapper).to.have.length(1);
  });
});
