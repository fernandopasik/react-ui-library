import Button from './button.js';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('Button', () => {

  it('can have a label', () => {
    expect(shallow(<Button caption="Accept" />)).to.have.text('Accept');
  });

  it('can have content', () => {
    const wrapper = shallow(<Button><span>Accept</span></Button>);
    expect(wrapper.find('span')).to.have.text('Accept');
    expect(wrapper).to.have.html().match(/<span>Accept<\/span>/);
  });

  it('if it has label, content is ignored', () => {
    const wrapper = shallow(<Button caption="Accept"><span>Ignored</span></Button>);
    expect(wrapper).to.have.text('Accept');
    expect(wrapper).to.have.html().not.match(/Ignored/);
  });

  it('when click executes handler', () => {
    const
      handler = spy(),
      wrapper = shallow(<Button caption="Accept" onClick={ handler } />);
    wrapper.simulate('click');
    expect(handler).to.have.been.called();
  });

  it('can be disabled', () => {
    expect(shallow(<Button caption="Accept" disabled />)).to.be.disabled();
  });

  it('can be set as active', () => {
    expect(shallow(<Button active caption="Accept" />)).to.have.className('active');
  });

  it('can have a custom id or class set', () => {
    const wrapper = shallow(<Button caption="Accept" className="test" id="test1" />);
    expect(wrapper).to.have.className('test');
    expect(wrapper).to.have.id('test1');
  });

  it('display types include primary and link', () => {
    const element = display => <Button caption="Accept" display={ display } />;
    expect(shallow(element('primary'))).to.have.className('primary');
    expect(shallow(element('link'))).to.have.className('link');
  });

  it('type attribute for forms can be set', () => {
    const element = type => <Button caption="Accept" type={ type } />;
    expect(shallow(element('submit'))).to.have.attr('type', 'submit');
    expect(shallow(element('reset'))).to.have.attr('type', 'reset');
  });

  it('can have different sizes', () => {
    const element = size => <Button caption="Accept" size={ size } />;
    expect(shallow(element('large'))).to.have.className('large');
    expect(shallow(element('small'))).to.have.className('small');
  });

  it('can span full width', () => {
    expect(shallow(<Button block caption="Accept" />)).to.have.className('block');
  });
});
