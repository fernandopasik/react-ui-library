import { mount, shallow } from 'enzyme';
import HelloWorld from './hello-world.js';
import HelloWorldStyles from './hello-world.scss';
import React from 'react';

let styles;

beforeAll(() => {
  styles = mount(<style>{ HelloWorldStyles }</style>,
    { attachTo: document.head });
});

afterAll(() => {
  styles.detach();
});

describe('HelloWorld', () => {

  it('has a default who value', () => {
    const wrapper = shallow(<HelloWorld />);
    expect(wrapper).toHaveText('Hello World');
  });

  it('can set who to say hello', () => {
    const wrapper = shallow(<HelloWorld who="Fernando" />);
    expect(wrapper).toHaveText('Hello Fernando');
  });
});
