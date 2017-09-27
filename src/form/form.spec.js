import React from 'react';
import { mount, shallow } from 'enzyme';
import Button from '../button/button';
import Field from './field';
import Form from './form';

const setupExample = props => (
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

describe('Form', () => {
  it('wraps children with a form element', () => {
    const wrapper = shallow(setupExample());
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('form footer', () => {
    const wrapper = shallow(setupExample());
    expect(wrapper.find('footer')).not.toBePresent();
    expect(wrapper.find('.form-footer')).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find('.form-footer').find(Button)).toHaveLength(2);
    expect(wrapper.find('.form-footer').find(Field)).not.toBePresent();
  });

  it('set state when any field updates', () => {
    const wrapper = shallow(setupExample());
    wrapper.find('[name="firstName"]').first().simulate('change', { target: { value: 'Fernando' } });
    wrapper.find('[name="lastName"]').first().simulate('change', { target: { value: 'Pasik' } });
    wrapper.find('[name="email"]').first().simulate('change', { target: { value: 'fernando@pasik.com.ar' } });
    expect(wrapper).toHaveState('values', {
      firstName: 'Fernando',
      lastName: 'Pasik',
      email: 'fernando@pasik.com.ar',
    });
  });

  it('submit event', () => {
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper.find('form').first().simulate('submit');
    expect(callback).toHaveBeenCalled();
  });

  it('submit event when click submit', () => {
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper.find('[type="submit"]').instance().click();
    expect(callback).toHaveBeenCalled();
  });

  it('submit event handler receives object with fields', () => {
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper.find('[name="firstName"]').first().simulate('change', { target: { value: 'Fernando' } });
    wrapper.find('[name="lastName"]').first().simulate('change', { target: { value: 'Pasik' } });
    wrapper.find('[name="email"]').first().simulate('change', { target: { value: 'fernando@pasik.com.ar' } });
    wrapper.find('form').first().simulate('submit');
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({
      firstName: 'Fernando',
      lastName: 'Pasik',
      email: 'fernando@pasik.com.ar',
    });
  });

  it('clears the state on reset event', () => {
    const callback = jest.fn();
    const wrapper = mount(setupExample({ onReset: callback }));
    wrapper.find('[name="firstName"]').first().simulate('change', { target: { value: 'Fernando' } });
    wrapper.find('[name="lastName"]').first().simulate('change', { target: { value: 'Pasik' } });
    wrapper.find('[name="email"]').first().simulate('change', { target: { value: 'fernando@pasik.com.ar' } });
    wrapper.find('form').first().simulate('reset');
    expect(callback).toHaveBeenCalled();
  });
});
