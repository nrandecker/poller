import React from 'react';
import { mount, shallow } from 'enzyme';
import { bindActionCreators } from 'redux'
import {expect} from 'chai';

import Login from '../../../src/components/Login/Login';

describe('<Login/>', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      touched: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      },
      error: {
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
        serverError: '',
      },
      submitDisabled: false,
      user: {},
      snackbar: {
        open: false,
        message: '',
      },
      ...bindActionCreators({
        login: (_spies.login = sinon.spy()),
        formChange: (_spies.addOption = sinon.spy()),
        setError: (_spies.setError = sinon.spy()),
        setSnackBar: (_spies.setSnackBar = sinon.spy()),
        googleLogin: (_spies.googleLogin = sinon.spy()),
        githubLogin: (_spies.githubLogin = sinon.spy()),
        formTouched: (_spies.formTouched = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Login {..._props} />)
  });

  it('renders without exploding', () => {
    expect(_wrapper).to.have.length(1);
  });
});
