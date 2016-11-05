import { mount, shallow } from 'enzyme';
import Dropdown from '../dropdown/dropdown.js';
import React from 'react';
import Select from './select.js';
import { spy } from 'sinon';

const options = [ 'red', 'green', 'blue' ];

describe('Select', () => {

  it('select element without options', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper).to.have.exactly(1).descendants('select');
    expect(wrapper).to.have.exactly(1).descendants(Dropdown);
    expect(wrapper).to.not.have.descendants('option');
    expect(wrapper).to.not.have.descendants('.option');
    expect(wrapper).to.not.have.descendants('.options');
  });

  it('placeholder message for empty option', () => {
    const
      wrapper = shallow(<Select placeholder="Pick a color" />),
      $select = wrapper.find('select');
    expect(wrapper).to.have.exactly(1).descendants('select');
    expect(wrapper).to.have.exactly(1).descendants('option');
    expect($select.childAt(0)).to.have.value('');
    expect($select.childAt(0)).to.have.text('Pick a color');
    expect(wrapper.find('.selected-option')).to.have.text('Pick a color');
  });

  it('with options as an array of strings', () => {
    const
      wrapper = mount(<Select options={ options } placeholder="Pick a color" />),
      $select = wrapper.find('select');

    expect(wrapper).to.have.exactly(1).descendants('select');
    expect(wrapper).to.have.exactly(4).descendants('option');
    expect($select.childAt(0)).to.have.value('').and.to.have.text('Pick a color');
    expect($select.childAt(1)).to.have.value('red').and.to.have.text('red');
    expect($select.childAt(2)).to.have.value('green').and.to.have.text('green');
    expect($select.childAt(3)).to.have.value('blue').and.to.have.text('blue');
    wrapper.find('.selected-option').simulate('click');

    const $fakeSelect = wrapper.find('.options');
    expect(wrapper).to.have.exactly(1).descendants('.options');
    expect(wrapper).to.have.exactly(4).descendants('.option');
    expect($fakeSelect.childAt(0)).to.have.text('Pick a color');
    expect($fakeSelect.childAt(1)).to.have.text('red');
    expect($fakeSelect.childAt(2)).to.have.text('green');
    expect($fakeSelect.childAt(3)).to.have.text('blue');
  });

  it('with options as an array of objects with label and value', () => {
    const
      options = [
        { label: 'Red Color', value: 'red' },
        { label: 'Green Color', value: 'green' },
        { label: 'Blue Color', value: 'blue' }
      ],
      wrapper = mount(<Select options={ options } placeholder="Pick a color" />),
      $select = wrapper.find('select');

    expect(wrapper).to.have.exactly(1).descendants('select');
    expect(wrapper).to.have.exactly(4).descendants('option');
    expect($select.childAt(0)).to.have.value('').and.to.have.text('Pick a color');
    expect($select.childAt(1)).to.have.value('red').and.to.have.text('Red Color');
    expect($select.childAt(2)).to.have.value('green').and.to.have.text('Green Color');
    expect($select.childAt(3)).to.have.value('blue').and.to.have.text('Blue Color');
    wrapper.find('.selected-option').simulate('click');

    const $fakeSelect = wrapper.find('.options');
    expect(wrapper).to.have.exactly(1).descendants('.options');
    expect(wrapper).to.have.exactly(4).descendants('.option');
    expect($fakeSelect.childAt(0)).to.have.text('Pick a color');
    expect($fakeSelect.childAt(1)).to.have.text('Red Color');
    expect($fakeSelect.childAt(2)).to.have.text('Green Color');
    expect($fakeSelect.childAt(3)).to.have.text('Blue Color');
  });

  it('selected value through select element', () => {
    const
      wrapper = mount(<Select options={ options } placeholder="Pick a color" />),
      $select = wrapper.find('select'),
      $fakeSelectOption = wrapper.find('.selected-option');

    expect($select).to.have.value('');
    expect($fakeSelectOption).to.have.text('Pick a color');
    $select.get(0).value = 'blue';
    $select.simulate('change', { target: { value: 'blue' } });
    expect(wrapper).to.have.state('value', 'blue');
    expect($fakeSelectOption).to.have.text('blue');
    expect($select).to.have.value('blue');
  });

  it('selected value through fake select click', () => {
    const
      wrapper = mount(<Select options={ options } placeholder="Pick a color" />),
      $select = wrapper.find('select'),
      $fakeSelectOption = wrapper.find('.selected-option');

    expect($select).to.have.value('');
    expect($fakeSelectOption).to.have.text('Pick a color');
    wrapper.find('.trigger').simulate('click');
    wrapper.find('.options').childAt(2).simulate('click');
    expect(wrapper).to.have.state('value', 'green');
    expect($fakeSelectOption).to.have.text('green');
    expect($select).to.have.value('green');
  });

  it('onChange handler through select change', () => {
    const
      handler = spy(),
      wrapper = mount(<Select onChange={ handler } options={ options } placeholder="Choose" />),
      $select = wrapper.find('select'),
      $fakeSelectOption = wrapper.find('.selected-option');

    expect($select).to.have.value('');
    expect($fakeSelectOption).to.have.text('Choose');
    $select.get(0).value = 'blue';
    $select.simulate('change', { target: { value: 'blue' } });
    expect(wrapper).to.have.state('value', 'blue');
    expect($fakeSelectOption).to.have.text('blue');
    expect($select).to.have.value('blue');
    expect(handler).to.have.been.exactly.calledOnce();
    expect(handler).to.have.been.calledWithMatch({ target: { value: 'blue' } });
  });

  it('onChange handler through fake select click', () => {
    const
      handler = spy(),
      wrapper = mount(<Select onChange={ handler } options={ options } placeholder="Choose" />),
      $select = wrapper.find('select'),
      $fakeSelectOption = wrapper.find('.selected-option');

    expect($select).to.have.value('');
    expect($fakeSelectOption).to.have.text('Choose');
    wrapper.find('.trigger').simulate('click');
    wrapper.find('.options').childAt(2).simulate('click');
    expect(wrapper).to.have.state('value', 'green');
    expect($fakeSelectOption).to.have.text('green');
    expect($select).to.have.value('green');
    expect(handler).to.have.been.exactly.calledOnce();
    expect(handler).to.have.been.calledWithMatch({ target: { value: 'green' } });
  });

  it('onFocus and onBlur sets style', () => {
    const
      wrapper = mount(<Select options={ options } placeholder="Choose" />),
      $select = wrapper.find('select'),
      $selectedOption = wrapper.find('.selected-option');
    expect($selectedOption).to.not.have.className('focus');
    $select.simulate('focus');
    expect($selectedOption).to.have.className('focus');
    $select.simulate('blur');
    expect($selectedOption).to.not.have.className('focus');
  });
});
