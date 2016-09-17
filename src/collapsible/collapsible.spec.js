import { mount, shallow } from 'enzyme';
import Collapsible from './collapsible.js';
import React from 'react';


describe('Collapsible', () => {

  it('it\'s a box that wraps content', () => {
    const wrapper = shallow(<Collapsible><div>Example</div></Collapsible>);
    expect(wrapper.find('.collapsible')).to.have.length(1);
    expect(wrapper.find('.collapsible-content')).to.have.length(1);
    expect(wrapper.find('.collapsible-content')).to.have.text('Example');
  });

  it('when collapsed collapsible height is 0', () => {
    const wrapper = shallow(
      <Collapsible collapsed><div>Example</div></Collapsible>
    );
    expect(wrapper.find('.collapsible')).to.have.attr('style', 'height:0;');
  });

  it('when not collapsed collapsible height is the same as content', () => {
    const wrapper = mount(
      <Collapsible><div style={{ height: '100px' }}>Example</div></Collapsible>
    );
    wrapper.setState({ height: '100px' });
    expect(wrapper).to.have.style('height', '100px');
  });
});
