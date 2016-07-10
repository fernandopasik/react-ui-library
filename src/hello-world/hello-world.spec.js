import HelloWorld from './hello-world.js';
import React from 'react';
import { shallow } from 'enzyme';

describe('HelloWorld', () => {

  it('has a default who value', () => {
    const wrapper = shallow(<HelloWorld />);
    expect(wrapper.text()).to.equal('Hello World');
  });

  it('can set who to say hello', () => {
    const wrapper = shallow(<HelloWorld who="Avenida" />);
    expect(wrapper.text()).to.equal('Hello Avenida');
  });

});
