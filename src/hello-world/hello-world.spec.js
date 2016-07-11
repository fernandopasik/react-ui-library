import { getCSSValue, setReactRoot } from '../utils/test.js';
import { mount, shallow } from 'enzyme';
import HelloWorld from './hello-world.js';
import HelloWorldStyles from './hello-world.scss';
import React from 'react';

describe('HelloWorld', () => {

  it('has a default who value', () => {
    const wrapper = shallow(<HelloWorld />);
    expect(wrapper.text()).to.equal('Hello World');
  });

  it('can set who to say hello', () => {
    const wrapper = shallow(<HelloWorld who="Avenida" />);
    expect(wrapper.text()).to.equal('Hello Avenida');
  });

  it('use blue color for text', () => {
    mount(<style>{ HelloWorldStyles }</style>, { attachTo: document.head });
    const
      wrapper = mount(<HelloWorld />, { attachTo: setReactRoot() }),
      $helloWorld = wrapper.find('.hello-world').get(0);

    getCSSValue($helloWorld, 'color').should.be.colored('#3a99d8');
  });

});
