import React from 'react';
import { mount, shallow } from 'enzyme';
import Button from '../button/button';
import Dropdown from './dropdown';
import { setReactRoot } from '../utils/test-utils';

const options = ['red', 'green', 'blue'];

describe('Dropdown', () => {
  it('by default adds a button as trigger', () => {
    const wrapper = shallow(<Dropdown caption="Menu" />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find('.trigger')).toHaveLength(1);
  });

  it('wrap trigger elements', () => {
    const wrapper = shallow(<Dropdown><Button caption="Menu" /></Dropdown>);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find('.trigger')).toHaveLength(1);
  });

  describe('options', () => {
    it('array of strings', () => {
      const wrapper = shallow(<Dropdown caption="Menu" isOpen options={options} />);
      const $options = wrapper.find('.options');
      expect(wrapper.find('.dropdown')).toHaveLength(1);
      expect(wrapper.find('.options')).toHaveLength(1);
      expect(wrapper.find('.option')).toHaveLength(3);
      expect($options.childAt(0)).toHaveText('red');
      expect($options.childAt(1)).toHaveText('green');
      expect($options.childAt(2)).toHaveText('blue');
    });

    it('array of objects with label and value', () => {
      const optionsObj = [
        { label: 'Red Color', value: 'red' },
        { label: 'Green Color', value: 'green' },
        { label: 'Blue Color', value: 'blue' },
      ];
      const wrapper = shallow(<Dropdown caption="Menu" isOpen options={optionsObj} />);
      const $options = wrapper.find('.options');
      expect(wrapper.find('.dropdown')).toHaveLength(1);
      expect(wrapper.find('.options')).toHaveLength(1);
      expect(wrapper.find('.option')).toHaveLength(3);
      expect($options.childAt(0)).toHaveText('Red Color');
      expect($options.childAt(1)).toHaveText('Green Color');
      expect($options.childAt(2)).toHaveText('Blue Color');
    });
  });

  describe('open', () => {
    it('can start opened', () => {
      expect(shallow(<Dropdown caption="Menu" isOpen />)).toHaveState('isOpen', true);
    });

    it('when trigger clicked', () => {
      const wrapper = shallow(<Dropdown caption="Menu" options={options} />);
      expect(wrapper).toHaveState('isOpen', false);
      wrapper.find('.trigger').first().simulate('click');
      expect(wrapper).toHaveState('isOpen', true);
    });

    it('when trigger key pressed space', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={options} />);
      const $trigger = wrapper.find('.trigger');
      expect(wrapper).toHaveState('isOpen', false);
      $trigger.first().simulate('keyup', { which: 32 });
      expect(wrapper).toHaveState('isOpen', true);
    });

    it('when trigger key pressed enter', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={options} />);
      const $trigger = wrapper.find('.trigger');
      expect(wrapper).toHaveState('isOpen', false);
      $trigger.first().simulate('keyup', { which: 13 });
      expect(wrapper).toHaveState('isOpen', true);
    });
  });

  describe('closes', () => {
    it('by default it\'s closed', () => {
      expect(shallow(<Dropdown caption="Menu" />)).toHaveState('isOpen', false);
    });

    it('when trigger key pressed space', () => {
      const wrapper = mount(<Dropdown caption="Menu" isOpen options={options} />);
      const $trigger = wrapper.find('.trigger');
      expect(wrapper).toHaveState('isOpen', true);
      $trigger.first().simulate('keyup', { which: 32 });
      expect(wrapper).toHaveState('isOpen', false);
    });

    it('when trigger key pressed enter', () => {
      const wrapper = mount(<Dropdown caption="Menu" isOpen options={options} />);
      const $trigger = wrapper.find('.trigger');
      expect(wrapper).toHaveState('isOpen', true);
      $trigger.first().simulate('keyup', { which: 13 });
      expect(wrapper).toHaveState('isOpen', false);
    });

    it('when trigger key pressed esc', () => {
      const wrapper = mount(<Dropdown caption="Menu" isOpen options={options} />);
      const $trigger = wrapper.find('.trigger');
      expect(wrapper).toHaveState('isOpen', true);
      $trigger.first().simulate('keyup', { which: 27 });
      expect(wrapper).toHaveState('isOpen', false);
    });

    it('on blur', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={options} />);
      wrapper.find('.trigger').first().simulate('click');
      expect(wrapper).toHaveState('isOpen', true);
      wrapper.find('.options').first().simulate('mousedown');
      wrapper.simulate('blur');
      expect(wrapper).toHaveState('isOpen', false);
      expect(wrapper.find('.options')).not.toBePresent();
    });

    it('when click outside', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={options} />);
      wrapper.find('.trigger').first().simulate('click');
      expect(wrapper).toHaveState('isOpen', true);
      document.body.click();
      expect(wrapper).toHaveState('isOpen', false);
      expect(wrapper.find('.options')).not.toBePresent();
    });

    it('removes click outside listener', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" options={options} />);
      wrapper.instance().close = handler;
      wrapper.find('.trigger').first().simulate('click');
      wrapper.unmount();
      document.body.click();
      expect(handler).not.toHaveBeenCalled();
    });

    it('closes when option clicked', () => {
      const wrapper = mount(<Dropdown caption="Menu" options={options} />);
      wrapper.find('.trigger').first().simulate('click');
      wrapper.find('.options').childAt(1).simulate('click');
      expect(wrapper).toHaveState('isOpen', false);
      expect(wrapper.find('.options')).not.toBePresent();
    });
  });

  describe('select', () => {
    it('when option clicked', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('click');
      wrapper.find('.options').childAt(1).simulate('click');
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('green');
    });

    it('when option press enter', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('keyup', { which: 13 });
      wrapper.find('.options').childAt(1).simulate('keyup', { which: 13 });
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('green');
    });

    it('when option press space', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      wrapper.find('.options').childAt(1).simulate('keyup', { which: 32 });
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('green');
    });

    it('not when option press other key', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      wrapper.find('.options').childAt(1).simulate('keyup', { which: 33 });
      expect(handler).not.toHaveBeenCalled();
    });

    it('cycling selection with arrows and press enter to select', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 38 });
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('green');
    });

    it('cycling selection with arrows has limits on length', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.simulate('keyup', { which: 40 });
      expect(wrapper).toHaveState('optionFocused', 2);
      wrapper.simulate('keyup', { which: 40 });
      expect(wrapper).toHaveState('optionFocused', 2);
      wrapper.simulate('keyup', { which: 38 });
      expect(wrapper).toHaveState('optionFocused', 1);
      wrapper.simulate('keyup', { which: 38 });
      expect(wrapper).toHaveState('optionFocused', 0);
      wrapper.simulate('keyup', { which: 38 });
      expect(wrapper).toHaveState('optionFocused', 0);
    });

    it('cycling selection with arrows, then hover other option and press enter to select', () => {
      const handler = jest.fn();
      const wrapper = mount(<Dropdown caption="Menu" onSelect={handler} options={options} />);
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      wrapper.simulate('keyup', { which: 40 });
      wrapper.find('.options').childAt(1).simulate('mouseover');
      wrapper.find('.trigger').first().simulate('keyup', { which: 32 });
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('green');
    });
  });

  describe('cap visible options', () => {
    it('maximum options visible', () => {
      const wrapper = shallow(<Dropdown caption="Menu" options={options} size={2} />);
      wrapper.find('.trigger').first().simulate('click');
      expect(wrapper.find('.options')).toHaveStyle('overflowY', 'scroll');
      expect(wrapper.find('.options')).toHaveStyle('maxHeight', '120px');
    });

    it('when options less than size, dont\'t cap', () => {
      const wrapper = shallow(<Dropdown caption="Menu" options={options} size={4} />);
      wrapper.find('.trigger').first().simulate('click');
      expect(wrapper.find('.options')).not.toHaveStyle('overflowY', 'scroll');
      expect(wrapper.find('.options')).not.toHaveStyle('maxHeight', '120px');
    });
  });

  it('disable scroll on page', () => {
    const keyboardEvent = keyCode => new window.KeyboardEvent('keydown', { bubbles: true, keyCode });
    const handler = jest.fn();
    const wrapper = mount(<Dropdown caption="Menu" options={options} />, { attachTo: setReactRoot() });
    const $dropdown = wrapper.find('.dropdown');
    window.addEventListener('keydown', handler);
    $dropdown.instance().dispatchEvent(keyboardEvent(40));
    $dropdown.instance().dispatchEvent(keyboardEvent(38));
    $dropdown.instance().dispatchEvent(keyboardEvent(13));
    $dropdown.instance().dispatchEvent(keyboardEvent(32));
    expect(handler).not.toHaveBeenCalled();
    $dropdown.instance().dispatchEvent(keyboardEvent(31));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
