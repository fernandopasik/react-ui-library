import React from 'react';
import { mount, shallow } from 'enzyme';
import Dropdown from '../dropdown/dropdown';
import Select from './select';
import { setReactRoot } from '../utils/test-utils';

const options = ['red', 'green', 'blue'];

describe('select', () => {
  it('select element without options', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper.find('select')).toExist();
    expect(wrapper.find(Dropdown)).toExist();
    expect(wrapper.find('option')).not.toExist();
    expect(wrapper.find('.option')).not.toExist();
    expect(wrapper.find('.options')).not.toExist();
  });

  it('placeholder message for empty option', () => {
    const wrapper = shallow(<Select placeholder="Pick a color" />);
    const $select = wrapper.find('select');
    expect(wrapper.find('select')).toExist();
    expect(wrapper.find('option')).toHaveLength(1);
    expect($select.childAt(0)).toHaveValue('');
    expect($select.childAt(0)).toHaveText('Pick a color');
    expect(wrapper.find('.selected-option')).toHaveText('Pick a color');
  });

  it('with options as an array of strings', () => {
    const wrapper = mount(<Select options={options} placeholder="Pick a color" />);
    const $select = wrapper.find('select');
    expect(wrapper.find('option')).toHaveLength(4);
    expect($select.childAt(0)).toHaveValue('');
    expect($select.childAt(0)).toHaveText('Pick a color');
    expect($select.childAt(1)).toHaveValue('red');
    expect($select.childAt(1)).toHaveText('red');
    expect($select.childAt(2)).toHaveValue('green');
    expect($select.childAt(2)).toHaveText('green');
    expect($select.childAt(3)).toHaveValue('blue');
    expect($select.childAt(3)).toHaveText('blue');
    wrapper
      .find('.selected-option')
      .first()
      .simulate('click');
    const $fakeSelect = wrapper.find('.options');
    expect(wrapper.find('.option')).toHaveLength(4);
    expect($fakeSelect.childAt(0)).toHaveText('Pick a color');
    expect($fakeSelect.childAt(1)).toHaveText('red');
    expect($fakeSelect.childAt(2)).toHaveText('green');
    expect($fakeSelect.childAt(3)).toHaveText('blue');
  });

  it('with options as an array of objects with label and value', () => {
    const optionsObj = [
      { label: 'Red Color', value: 'red' },
      { label: 'Green Color', value: 'green' },
      { label: 'Blue Color', value: 'blue' },
    ];
    const wrapper = mount(<Select options={optionsObj} placeholder="Pick a color" />);
    const $select = wrapper.find('select');
    expect(wrapper.find('option')).toHaveLength(4);
    expect($select.childAt(0)).toHaveValue('');
    expect($select.childAt(0)).toHaveText('Pick a color');
    expect($select.childAt(1)).toHaveValue('red');
    expect($select.childAt(1)).toHaveText('Red Color');
    expect($select.childAt(2)).toHaveValue('green');
    expect($select.childAt(2)).toHaveText('Green Color');
    expect($select.childAt(3)).toHaveValue('blue');
    expect($select.childAt(3)).toHaveText('Blue Color');
    wrapper
      .find('.selected-option')
      .first()
      .simulate('click');
    const $fakeSelect = wrapper.find('.options');
    expect(wrapper.find('.option')).toHaveLength(4);
    expect($fakeSelect.childAt(0)).toHaveText('Pick a color');
    expect($fakeSelect.childAt(1)).toHaveText('Red Color');
    expect($fakeSelect.childAt(2)).toHaveText('Green Color');
    expect($fakeSelect.childAt(3)).toHaveText('Blue Color');
  });

  it('selected value through select element', () => {
    const wrapper = mount(<Select options={options} placeholder="Pick a color" />);
    const $select = wrapper.find('select');
    const $fakeSelectOption = wrapper.find('.selected-option');
    expect($select.instance().value).toStrictEqual('');
    expect($fakeSelectOption).toHaveText('Pick a color');
    $select.instance().value = 'blue';
    $select.first().simulate('change', { target: { value: 'blue' } });
    expect(wrapper).toHaveState('value', 'blue');
    expect($fakeSelectOption).toHaveText('blue');
    expect($select.instance().value).toStrictEqual('blue');
  });

  it('selected value through fake select click', () => {
    const wrapper = mount(<Select options={options} placeholder="Pick a color" />);
    const $select = wrapper.find('select');
    const $fakeSelectOption = wrapper.find('.selected-option');
    expect($select.instance().value).toStrictEqual('');
    expect($fakeSelectOption).toHaveText('Pick a color');
    wrapper
      .find('.trigger')
      .first()
      .simulate('click');
    wrapper
      .find('.options')
      .childAt(2)
      .simulate('click');
    expect(wrapper).toHaveState('value', 'green');
    expect($fakeSelectOption).toHaveText('green');
    expect($select.instance().value).toStrictEqual('green');
  });

  it('onChange handler through select change', () => {
    const handler = jest.fn();
    const wrapper = mount(<Select onChange={handler} options={options} placeholder="Choose" />);
    const $select = wrapper.find('select');
    const $fakeSelectOption = wrapper.find('.selected-option');
    expect($select.instance().value).toStrictEqual('');
    expect($fakeSelectOption).toHaveText('Choose');
    $select.instance().value = 'blue';
    $select.first().simulate('change', { target: { value: 'blue' } });
    expect(wrapper).toHaveState('value', 'blue');
    expect($fakeSelectOption).toHaveText('blue');
    expect($select.instance().value).toStrictEqual('blue');
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'blue' } }));
  });

  it.skip('onChange handler through fake select click', () => {
    const handler = jest.fn();
    const wrapper = mount(<Select onChange={handler} options={options} placeholder="Choose" />, {
      attachTo: setReactRoot(),
    });
    const $select = wrapper.find('select');
    const $fakeSelectOption = wrapper.find('.selected-option');
    expect($select.instance().value).toStrictEqual('');
    expect($fakeSelectOption).toHaveText('Choose');
    wrapper
      .find('.trigger')
      .first()
      .simulate('click');
    wrapper
      .find('.options')
      .childAt(2)
      .simulate('click');
    expect(wrapper).toHaveState('value', 'green');
    expect($fakeSelectOption).toHaveText('green');
    expect($select.instance().value).toStrictEqual('green');
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'green' } }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('onFocus and onBlur sets style', () => {
    const wrapper = mount(<Select options={options} placeholder="Choose" />);
    const $select = wrapper.find('select');
    expect(wrapper.find('.selected-option')).not.toHaveClassName('focus');
    $select.first().simulate('focus');
    expect(wrapper.find('.selected-option')).toHaveClassName('focus');
    $select.first().simulate('blur');
    expect(wrapper.find('.selected-option')).not.toHaveClassName('focus');
  });
});
