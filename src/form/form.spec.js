import { mount, shallow } from 'enzyme';
import Button from '../button/button.js';
import Field from './field.js';
import Form from './form.js';
import React from 'react';
import { spy } from 'sinon';

const setupExample = props => (
  <Form { ...props }>
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
    expect(wrapper).to.have.exactly(1).descendants('form');
    expect(wrapper).to.have.exactly(3).descendants(Field);
    expect(wrapper).to.have.exactly(2).descendants(Button);
  });

  it('form footer', () => {
    const wrapper = shallow(setupExample());
    expect(wrapper).to.not.have.descendants('footer');
    expect(wrapper).to.have.exactly(1).descendants('.form-footer');
    expect(wrapper).to.have.exactly(2).descendants(Button);
    expect(wrapper.find('.form-footer')).to.have.exactly(2).descendants(Button);
    expect(wrapper.find('.form-footer')).to.not.have.descendants(Field);
  });

  it('set state when any field updates', () => {
    const wrapper = shallow(setupExample());
    wrapper.find('[name="firstName"]').simulate('change', { target: { value: 'Fernando' } });
    wrapper.find('[name="lastName"]').simulate('change', { target: { value: 'Pasik' } });
    wrapper.find('[name="email"]').simulate('change', { target: { value: 'fernando@pasik.com.ar' } });
    expect(wrapper).to.have.state('values').include({
      firstName: 'Fernando',
      lastName: 'Pasik',
      email: 'fernando@pasik.com.ar'
    });
  });

  it('submit event', () => {
    const callback = spy();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper.find('form').simulate('submit');
    expect(callback).to.have.been.called();
  });

  it('submit event when click submit', () => {
    const callback = spy();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper.find('[type="submit"]').get(0).click();
    expect(callback).to.have.been.called();
  });

  it('submit event handler receives object with fields', () => {
    const callback = spy();
    const wrapper = mount(setupExample({ onSubmit: callback }));
    wrapper.find('[name="firstName"]').simulate('change', { target: { value: 'Fernando' } });
    wrapper.find('[name="lastName"]').simulate('change', { target: { value: 'Pasik' } });
    wrapper.find('[name="email"]').simulate('change', { target: { value: 'fernando@pasik.com.ar' } });
    wrapper.find('form').simulate('submit');
    expect(callback).to.have.been.called();
    expect(callback).to.have.been.calledWith({
      firstName: 'Fernando',
      lastName: 'Pasik',
      email: 'fernando@pasik.com.ar'
    });
  });

  it('clears the state on reset event', () => {
    const callback = spy();
    const wrapper = mount(setupExample({ onReset: callback }));
    wrapper.find('[name="firstName"]').simulate('change', { target: { value: 'Fernando' } });
    wrapper.find('[name="lastName"]').simulate('change', { target: { value: 'Pasik' } });
    wrapper.find('[name="email"]').simulate('change', { target: { value: 'fernando@pasik.com.ar' } });
    wrapper.find('form').simulate('reset');
    expect(callback).to.have.been.called();
  });
});
