import { mount, shallow } from 'enzyme';
import Button from '../button/button.js';
import Dropdown from './dropdown.js';
import React from 'react';
import { spy } from 'sinon';

const options = [ 'red', 'green', 'blue' ];

describe('Dropdown', () => {

  it('by defult adds a button as trigger', () => {
    const wrapper = shallow(<Dropdown caption="Menu" />);
    expect(wrapper).to.have.exactly(1).descendants(Button);
    expect(wrapper).to.have.exactly(1).descendants('.trigger');
  });

  it('wrap trigger elements', () => {
    const wrapper = shallow(<Dropdown><Button caption="Menu" /></Dropdown>);
    expect(wrapper).to.have.exactly(1).descendants(Button);
    expect(wrapper).to.have.exactly(1).descendants('.trigger');
  });

  it('click on trigger element toggles open or close', () => {
    const wrapper = shallow(<Dropdown caption="Menu" />);
    expect(wrapper).to.have.state('isOpen', false);
    wrapper.find('.trigger').simulate('click');
    expect(wrapper).to.have.state('isOpen', true);
    wrapper.find('.trigger').simulate('click');
    expect(wrapper).to.have.state('isOpen', false);
  });

  it('by default it\'s closed', () => {
    expect(shallow(<Dropdown caption="Menu" />))
      .to.have.state('isOpen', false);
  });

  it('can start opened', () => {
    expect(shallow(<Dropdown caption="Menu" isOpen />))
      .to.have.state('isOpen', true);
  });

  it('with options as an array of strings', () => {
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

  it('with options as an array of objects with label and value', () => {
    const
      options = [ {
        label: 'Red Color',
        value: 'red'
      }, {
        label: 'Green Color',
        value: 'green'
      }, {
        label: 'Blue Color',
        value: 'blue'
      } ],
      wrapper = shallow(<Dropdown caption="Menu" isOpen options={ options } />),
      $options = wrapper.find('.options');

    expect(wrapper).to.have.exactly(1).descendants('.dropdown');
    expect(wrapper).to.have.exactly(1).descendants('.options');
    expect(wrapper).to.have.exactly(3).descendants('.option');
    expect($options.childAt(0)).to.have.text('Red Color');
    expect($options.childAt(1)).to.have.text('Green Color');
    expect($options.childAt(2)).to.have.text('Blue Color');
  });

  it('open when trigger clicked', () => {
    const wrapper = shallow(<Dropdown caption="Menu" options={ options } />);
    expect(wrapper).to.have.state('isOpen', false);
    wrapper.find('.trigger').simulate('click');
    expect(wrapper).to.have.state('isOpen', true);
  });

  it('handler when option clicked', () => {
    const
      handler = spy(),
      wrapper = shallow(
        <Dropdown caption="Menu" onSelect={ handler } options={ options } />
      );

    wrapper.find('.trigger').simulate('click');
    wrapper.find('.options').childAt(1).simulate('click');
    expect(handler).to.have.been.called();
    expect(handler).to.have.been.calledWith('green');
  });

  it('closes when option clicked', () => {
    const wrapper = shallow(<Dropdown caption="Menu" options={ options } />);
    wrapper.find('.trigger').simulate('click');
    wrapper.find('.options').childAt(1).simulate('click');
    expect(wrapper).to.have.state('isOpen', false);
    expect(wrapper.find('.options')).to.have.length(0);
  });

  it('closes when click outside', () => {
    const wrapper = mount(<Dropdown caption="Menu" options={ options } />);
    wrapper.find('.trigger').simulate('click');
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

  it('can cap the maximum options visible', () => {
    const wrapper = shallow(
      <Dropdown caption="Menu" options={ options } size={ 2 } />
    );
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.options')).to.have.style('overflow-y', 'scroll');
    expect(wrapper.find('.options')).to.have.style('max-height');
  });

  it('when options less than size doesn\'t cap', () => {
    const wrapper = shallow(
      <Dropdown caption="Menu" options={ options } size={ 4 } />
    );
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.options')).to.not.have.style('overflow', 'scroll');
    expect(wrapper.find('.options')).to.not.have.style('max-height');
  });
});
