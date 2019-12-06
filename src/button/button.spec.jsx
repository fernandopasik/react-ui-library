import React from 'react';
import { shallow } from 'enzyme';
import Button from './button';

describe('button', () => {
  it('can have a label', () => {
    expect(shallow(<Button caption="Accept" />)).toHaveText('Accept');
  });

  it('can have content', () => {
    const wrapper = shallow(
      <Button>
        <span>Accept</span>
      </Button>,
    );
    expect(wrapper.find('span')).toExist();
    expect(wrapper.find('span')).toHaveText('Accept');
  });

  it('if it has label, content is ignored', () => {
    const wrapper = shallow(
      <Button caption="Accept">
        <span>Ignored</span>
      </Button>,
    );
    expect(wrapper).toHaveText('Accept');
    expect(wrapper.find('span')).not.toExist();
  });

  it('when click executes handler', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Button caption="Accept" onClick={handler} />);
    wrapper.simulate('click');
    expect(handler).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    expect(shallow(<Button caption="Accept" disabled />)).toBeDisabled();
  });

  it('can be set as active', () => {
    expect(shallow(<Button active caption="Accept" />)).toHaveClassName('active');
  });

  it('can have a custom id or class set', () => {
    const wrapper = shallow(<Button caption="Accept" className="test" id="test1" />);
    expect(wrapper).toHaveClassName('test');
    expect(wrapper).toHaveProp('id', 'test1');
  });

  it('display types include primary and link', () => {
    const element = (display) => <Button caption="Accept" display={display} />;
    expect(shallow(element('primary'))).toHaveClassName('primary');
    expect(shallow(element('link'))).toHaveClassName('link');
  });

  it('type attribute for forms can be set', () => {
    const element = (type) => <Button caption="Accept" type={type} />;
    expect(shallow(element('submit'))).toHaveProp('type', 'submit');
    expect(shallow(element('reset'))).toHaveProp('type', 'reset');
  });

  it('can have different sizes', () => {
    const element = (size) => <Button caption="Accept" size={size} />;
    expect(shallow(element('large'))).toHaveClassName('large');
    expect(shallow(element('small'))).toHaveClassName('small');
  });

  it('can span full width', () => {
    expect(shallow(<Button block caption="Accept" />)).toHaveClassName('block');
  });
});
