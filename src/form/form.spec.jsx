/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Button from '../button/button';
import Field from './field';
import Form from './form';

const setupExample = (props) => (
  <Form {...props}>
    <Field id="firstName" name="firstName" />
    <Field id="lastName" name="lastName" />
    <Field id="email" name="email" type="email" />
    <footer>
      <Button caption="Send" display="primary" type="submit" />
      <Button caption="Clear" type="reset" />
    </footer>
  </Form>
);

describe('form', () => {
  it('wraps children with a form element', () => {
    const wrapper = shallow(setupExample());
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it.skip('form footer', () => {
    const wrapper = shallow(setupExample());
    expect(wrapper.find('footer')).not.toExist();
    expect(wrapper.find('.form-footer')).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find('.form-footer').find(Button)).toHaveLength(2);
    expect(wrapper.find('.form-footer').find(Field)).not.toExist();
  });

  it('submit event', () => {
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper
      .find('form')
      .first()
      .simulate('submit');

    expect(callback).toHaveBeenCalledWith({});

    wrapper.unmount();
  });

  it('submit event handler receives object with fields', () => {
    const firstName = 'Fernando';
    const lastName = 'Pasik';
    const email = 'fernando@pasik.com.ar';
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onSubmit: callback }));

    wrapper.find('input[name="firstName"]').simulate('change', { target: { value: firstName } });
    wrapper.find('input[name="lastName"]').simulate('change', { target: { value: lastName } });
    wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('submit');

    expect(callback).toHaveBeenCalledWith({ firstName, lastName, email });

    wrapper.unmount();
  });

  it.skip('clears the state on reset event', () => {
    const firstName = 'Fernando';
    const lastName = 'Pasik';
    const email = 'fernando@pasik.com.ar';
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onReset: callback }));

    wrapper.find('input[name="firstName"]').simulate('change', { target: { value: firstName } });
    wrapper.find('input[name="lastName"]').simulate('change', { target: { value: lastName } });
    wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('reset');

    expect(callback).toHaveBeenCalledWith({});

    wrapper.unmount();
  });
});
