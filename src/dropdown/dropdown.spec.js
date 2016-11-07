import { mount, shallow } from 'enzyme';
import Button from '../button/button.js';
import Dropdown from './dropdown.js';
import React from 'react';
import { setReactRoot } from '../utils/test.js';
import { spy } from 'sinon';

const options = [ 'red', 'green', 'blue' ];

describe('Dropdown', () => {

  it('by default adds a button as trigger', () => {
    const wrapper = shallow(<Dropdown caption="Menu" />);
    expect(wrapper).to.have.exactly(1).descendants(Button);
    expect(wrapper).to.have.exactly(1).descendants('.trigger');
  });

  it('wrap trigger elements', () => {
    const wrapper = shallow(<Dropdown><Button caption="Menu" /></Dropdown>);
    expect(wrapper).to.have.exactly(1).descendants(Button);
    expect(wrapper).to.have.exactly(1).descendants('.trigger');
  });

  describe('options', () => {

    it('array of strings', () => {
      const
        wrapper = shallow(<Dropdown caption="Menu" isOpen options={ options } />),
        $options = wrapper.find('.options');
      expect(wrapper).to.have.exactly(1).descendants('.dropdown');
      expect(wrapper).to.have.exactly(1).descendants('.options');
      expect(wrapper).to.have.exactly(3).descendants('.option');
      expect($options.childAt(0)).to.have.text('red');
      expect($options.childAt(1)).to.have.text('green');
      expect($options.childAt(2)).to.have.text('blue');
    });

    it('array of objects with label and value', () => {
      const options = [
        { label: 'Red Color', value: 'red' },
        { label: 'Green Color', value: 'green' },
        { label: 'Blue Color', value: 'blue' }
      ];
      const
        wrapper = shallow(<Dropdown caption="Menu" isOpen options={ options } />),
        $options = wrapper.find('.options');
      expect(wrapper).to.have.exactly(1).descendants('.dropdown');
      expect(wrapper).to.have.exactly(1).descendants('.options');
      expect(wrapper).to.have.exactly(3).descendants('.option');
      expect($options.childAt(0)).to.have.text('Red Color');
      expect($options.childAt(1)).to.have.text('Green Color');
      expect($options.childAt(2)).to.have.text('Blue Color');
    });
  });

  describe('open', () => {

    it('can start opened', () => {
      expect(shallow(<Dropdown caption="Menu" isOpen />)).to.have.state('isOpen', true);
    });

    it('when trigger clicked', () => {
      const wrapper = shallow(<Dropdown caption="Menu" options={ options } />);
      expect(wrapper).to.have.state('isOpen', false);
      wrapper.find('.trigger').simulate('click');
      expect(wrapper).to.have.state('isOpen', true);
    });

    it('when trigger key pressed space', () => {
      const
        wrapper = mount(<Dropdown caption="Menu" options={ options } />),
        $trigger = wrapper.find('.trigger');
      expect(wrapper).to.have.state('isOpen', false);
      $trigger.simulate('keyup', { which: 32 });
      expect(wrapper).to.have.state('isOpen', true);
    });

    it('when trigger key pressed enter', () => {
      const
        wrapper = mount(<Dropdown caption="Menu" options={ options } />),
        $trigger = wrapper.find('.trigger');
      expect(wrapper).to.have.state('isOpen', false);
      $trigger.simulate('keyup', { which: 13 });
      expect(wrapper).to.have.state('isOpen', true);
    });
  });

  describe('closes', () => {

    it('by default it\'s closed', () => {
      expect(shallow(<Dropdown caption="Menu" />)).to.have.state('isOpen', false);
    });

    it('when trigger key pressed space', () => {
      const
        wrapper = mount(<Dropdown caption="Menu" isOpen options={ options } />),
        $trigger = wrapper.find('.trigger');
      expect(wrapper).to.have.state('isOpen', true);
      $trigger.simulate('keyup', { which: 32 });
      expect(wrapper).to.have.state('isOpen', false);
    });

    it('when trigger key pressed enter', () => {
      const
        wrapper = mount(<Dropdown caption="Menu" isOpen options={ options } />),
        $trigger = wrapper.find('.trigger');
      expect(wrapper).to.have.state('isOpen', true);
      $trigger.simulate('keyup', { which: 13 });
      expect(wrapper).to.have.state('isOpen', false);
    });

    it('when trigger key pressed esc', () => {
      const
        wrapper = mount(<Dropdown caption="Menu" isOpen options={ options } />),
        $trigger = wrapper.find('.trigger');
      expect(wrapper).to.have.state('isOpen', true);
      $trigger.simulate('keyup', { which: 27 });
      expect(wrapper).to.have.state('isOpen', false);
    });

    it('on blur', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={ options } />);
      wrapper.find('.trigger').simulate('click');
      expect(wrapper).to.have.state('isOpen', true);
      wrapper.simulate('mousedown');
      wrapper.simulate('blur');
      expect(wrapper).to.have.state('isOpen', false);
      expect(wrapper.find('.options')).to.have.length(0);
    });

    it('when click outside', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={ options } />);
      wrapper.find('.trigger').simulate('click');
      expect(wrapper).to.have.state('isOpen', true);
      document.body.click();
      expect(wrapper).to.have.state('isOpen', false);
      expect(wrapper.find('.options')).to.have.length(0);
    });

    it('removes click outside listener', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" options={ options } />);
      wrapper.instance().close = handler;
      wrapper.find('.trigger').simulate('click');
      wrapper.unmount();
      document.body.click();
      expect(handler).to.not.have.been.called();
    });

    it('closes when option clicked', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={ options } />);
      wrapper.find('.trigger').simulate('click');
      wrapper.find('.options').childAt(1).simulate('click');
      expect(wrapper).to.have.state('isOpen', false);
      expect(wrapper.find('.options')).to.have.length(0);
    });
  });

  describe('select', () => {

    it('when option clicked', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('click');
      wrapper.find('.options').childAt(1).simulate('click');
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('green');
    });

    it('when option press enter', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('keyup', { which: 13 });
      wrapper.find('.options').childAt(1).simulate('keyup', { which: 13 });
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('green');
    });

    it('when option press space', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      wrapper.find('.options').childAt(1).simulate('keyup', { which: 32 });
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('green');
    });

    it('not when option press other key', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      wrapper.find('.options').childAt(1).simulate('keyup', { which: 33 });
      expect(handler).to.not.have.been.called();
    });

    it('cycling selection with arrows and press enter to select', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 38 });
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('green');
    });

    it('cycling selection with arrows has limits on length', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      expect(wrapper).to.have.state('optionFocused', 2);
      wrapper.simulate('keyup', { which: 40 });
      expect(wrapper).to.have.state('optionFocused', 2);
      wrapper.simulate('keyup', { which: 38 });
      expect(wrapper).to.have.state('optionFocused', 1);
      wrapper.simulate('keyup', { which: 38 });
      expect(wrapper).to.have.state('optionFocused', 0);
      wrapper.simulate('keyup', { which: 38 });
      expect(wrapper).to.have.state('optionFocused', 0);
    });

    it('cycling selection with arrows, then hover other option and press enter to select', () => {
      const
        handler = spy(),
        wrapper = mount(<Dropdown caption="Menu" onSelect={ handler } options={ options } />);
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.find('.options').childAt(1).simulate('mouseover');
      wrapper.find('.trigger').simulate('keyup', { which: 32 });
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('green');
    });
  });

  describe('cap visible options', () => {

    it('maximum options visible', () => {
      const wrapper = shallow(<Dropdown caption="Menu" options={ options } size={ 2 } />);
      wrapper.find('.trigger').simulate('click');
      expect(wrapper.find('.options')).to.have.style('overflow-y', 'scroll');
      expect(wrapper.find('.options')).to.have.style('max-height');
    });

    it('when options less than size, dont\'t cap', () => {
      const wrapper = shallow(<Dropdown caption="Menu" options={ options } size={ 4 } />);
      wrapper.find('.trigger').simulate('click');
      expect(wrapper.find('.options')).to.not.have.style('overflow', 'scroll');
      expect(wrapper.find('.options')).to.not.have.style('max-height');
    });
  });

  it('disable scroll on page', () => {
    const
      keyboardEvent = keyCode => new window.KeyboardEvent('keydown', { bubbles: true, keyCode }),
      handler = spy(),
      wrapper = mount(<Dropdown caption="Menu" options={ options } />, { attachTo: setReactRoot() });
    window.addEventListener('keydown', handler);
    wrapper.find('.dropdown').get(0).dispatchEvent(keyboardEvent(40));
    wrapper.find('.dropdown').get(0).dispatchEvent(keyboardEvent(38));
    wrapper.find('.dropdown').get(0).dispatchEvent(keyboardEvent(13));
    wrapper.find('.dropdown').get(0).dispatchEvent(keyboardEvent(32));
    expect(handler).to.not.have.been.called();
    wrapper.find('.dropdown').get(0).dispatchEvent(keyboardEvent(31));
    expect(handler).to.have.been.calledOnce();
  });
});
