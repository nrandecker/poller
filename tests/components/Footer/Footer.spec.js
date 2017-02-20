import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Footer from '../../../src/components/Footer/Footer';

describe('<Footer/>', () => {
  const _wrapper = shallow(<Footer/>);

  it('Renders a footer message', () => {
    const footer = _wrapper.find('p');
    expect(footer).to.exist;
    expect(footer.text()).to.match(/Built with React, Redux, and ❤ by Nathan Randecker/);
  });
});
