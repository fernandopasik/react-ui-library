import React from 'react';
import { mount, shallow } from 'enzyme';
import Collapsible from './collapsible';


describe('Collapsible', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    Collapsible.prototype.getHeight = jest.fn();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('it\'s a box that wraps content', () => {
    const wrapper = shallow(<Collapsible><div>Test</div></Collapsible>);
    expect(wrapper).toHaveClassName('collapsible');
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper).toHaveText('Test');
  });

  it('when collapsed collapsible height is 0', () => {
    const wrapper = mount(<Collapsible collapsed><div>Test</div></Collapsible>);
    expect(wrapper.find('.collapsible')).toHaveStyle('height', 0);
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'hidden');
  });

  it('when not collapsed collapsible height is the same as content', () => {
    Collapsible.prototype.getHeight.mockReturnValue('100px');
    const wrapper = mount(<Collapsible><div>100</div></Collapsible>);
    jest.runTimersToTime(401);
    expect(wrapper.find('.collapsible')).toHaveStyle('height', '100px');
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'visible');
  });

  it('when not collapsed and then collapses height changes', () => {
    Collapsible.prototype.getHeight.mockReturnValue('100px');
    const wrapper = mount(<Collapsible><div>100</div></Collapsible>);
    jest.runTimersToTime(401);
    expect(wrapper.find('.collapsible')).toHaveStyle('height', '100px');
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'visible');
    // Collapse it
    wrapper.setProps({ collapsed: true });
    jest.runTimersToTime(401);
    expect(wrapper.find('.collapsible')).toHaveStyle('height', 0);
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'hidden');
  });

  it('when collapsed and then decollapses height changes', () => {
    Collapsible.prototype.getHeight.mockReturnValue('100px');
    const wrapper = mount(<Collapsible collapsed><div>100</div></Collapsible>);
    jest.runTimersToTime(401);
    expect(wrapper.find('.collapsible')).toHaveStyle('height', 0);
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'hidden');
    // Collapse it
    wrapper.setProps({ collapsed: false });
    jest.runTimersToTime(401);
    wrapper.update();
    expect(wrapper.find('.collapsible')).toHaveStyle('height', '100px');
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'visible');
  });

  it('when not collapsed and content changes re calculate height', () => {
    Collapsible.prototype.getHeight.mockReturnValue('100px');
    const wrapper = mount(<Collapsible><div>100</div></Collapsible>);
    expect(wrapper.find('.collapsible')).toHaveStyle('height', '100px');
    // Change content
    Collapsible.prototype.getHeight.mockReturnValue('200px');
    wrapper.setProps({ children: <div>200</div> });
    jest.runTimersToTime(401);
    wrapper.update();
    expect(wrapper.find('.collapsible')).toHaveStyle('height', '200px');
    expect(wrapper.find('.collapsible')).toHaveStyle('overflow', 'visible');
  });
});
