import { mount, shallow } from 'enzyme';
import { stub, useFakeTimers } from 'sinon';
import Collapsible from './collapsible.js';
import React from 'react';


describe('Collapsible', () => {

  let clock, getHeight;

  before(() => {
    clock = useFakeTimers();
    getHeight = stub(Collapsible.prototype, 'getHeight');
  });

  after(() => {
    clock.restore();
    getHeight.restore();
  });

  it('it\'s a box that wraps content', () => {
    const wrapper = shallow(<Collapsible><div>Test</div></Collapsible>);
    expect(wrapper).to.have.className('collapsible');
    expect(wrapper).to.have.length(1);
    expect(wrapper).to.have.to.have.exactly(2).descendants('div');
    expect(wrapper).to.have.text('Test');
  });

  it('when collapsed collapsible height is 0', () => {
    const wrapper = mount(<Collapsible collapsed><div>Test</div></Collapsible>);
    expect(wrapper).to.have.style('height', '0px');
    expect(wrapper).to.have.style('overflow', 'hidden');
  });

  it('when not collapsed collapsible height is the same as content', () => {
    getHeight.returns('100px');
    const wrapper = mount(<Collapsible><div>100</div></Collapsible>);
    clock.tick(401);
    expect(wrapper).to.have.style('height', '100px');
    expect(wrapper).to.have.style('overflow', 'visible');
  });

  it('when not collapsed and then collapses height changes', () => {
    getHeight.returns('100px');
    const wrapper = mount(<Collapsible><div>100</div></Collapsible>);
    clock.tick(401);
    expect(wrapper).to.have.style('height', '100px');
    expect(wrapper).to.have.style('overflow', 'visible');
    // Collapse it
    wrapper.setProps({ collapsed: true });
    clock.tick(401);
    expect(wrapper).to.have.style('height', '0px');
    expect(wrapper).to.have.style('overflow', 'hidden');
  });

  it('when collapsed and then decollapses height changes', () => {
    getHeight.returns('100px');
    const wrapper = mount(<Collapsible collapsed><div>100</div></Collapsible>);
    clock.tick(401);
    expect(wrapper).to.have.style('height', '0px');
    expect(wrapper).to.have.style('overflow', 'hidden');
    // Collapse it
    wrapper.setProps({ collapsed: false });
    clock.tick(401);
    expect(wrapper).to.have.style('height', '100px');
    expect(wrapper).to.have.style('overflow', 'visible');
  });

  it('when not collapsed and content changes re calculate height', () => {
    getHeight.returns('100px');
    const wrapper = mount(<Collapsible><div>100</div></Collapsible>);
    expect(wrapper).to.have.style('height', '100px');
    // Change content
    getHeight.returns('200px');
    wrapper.setProps({ children: <div>200</div> });
    clock.tick(401);
    expect(wrapper).to.have.style('height', '200px');
    expect(wrapper).to.have.style('overflow', 'visible');
  });
});
