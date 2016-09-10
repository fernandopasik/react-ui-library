import { getCSSValue, setReactRoot } from '../utils/test.js';
import { mount, shallow } from 'enzyme';
import HelloWorld from './hello-world.js';
import HelloWorldStyles from './hello-world.scss';
import React from 'react';

let styles;

before(() => {
  styles = mount(<style>{ HelloWorldStyles }</style>,
    { attachTo: document.head });
});

after(() => {
  styles.detach();
});

describe('HelloWorld', () => {

  it('has a default who value', () => {
    const wrapper = shallow(<HelloWorld />);
    expect(wrapper).to.have.text('Hello World');
  });

  it('can set who to say hello', () => {
    const wrapper = shallow(<HelloWorld who="Fernando" />);
    expect(wrapper).to.have.text('Hello Fernando');
  });

  it('use blue color for text', () => {
    const
      wrapper = mount(<HelloWorld />, { attachTo: setReactRoot() }),
      $helloWorld = wrapper.find('.hello-world').get(0);

    getCSSValue($helloWorld, 'color').should.not.be.empty();
    getCSSValue($helloWorld, 'color').should.be.colored('#3a99d8');
  });

});
