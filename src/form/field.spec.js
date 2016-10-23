import Field from './field.js';
import React from 'react';
import Select from './select.js';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('Field', () => {

  describe('simple field', () => {

    it('spans an input element', () => {
      expect(shallow(<Field />)).to.have.exactly(1).descendants('input');
    });

    it('add field-element class', () => {
      expect(shallow(<Field />)).to.have.descendants('.field-element');
    });

    it('add id', () => {
      expect(shallow(<Field id="user" />)).to.have.descendants('#user');
    });

    it('add name', () => {
      expect(shallow(<Field name="user" />).find('input'))
        .to.have.attr('name', 'user');
    });

    it('if no type then default to text', () => {
      expect(shallow(<Field />).find('input')).to.have.attr('type', 'text');
    });

    it('valid types', () => {
      expect(shallow(<Field type="text" />))
        .to.have.descendants('input[type="text"]');
      expect(shallow(<Field type="email" />))
        .to.have.descendants('input[type="email"]');
      expect(shallow(<Field type="number" />))
        .to.have.descendants('input[type="number"]');
      expect(shallow(<Field type="password" />))
        .to.have.descendants('input[type="password"]');
      expect(shallow(<Field type="search" />))
        .to.have.descendants('input[type="search"]');
      expect(shallow(<Field type="tel" />))
        .to.have.descendants('input[type="tel"]');
      expect(shallow(<Field type="url" />))
        .to.have.descendants('input[type="url"]');
      expect(shallow(<Field type="color" />))
        .to.have.descendants('input[type="color"]');
      expect(shallow(<Field type="range" />))
        .to.have.descendants('input[type="range"]');
      expect(shallow(<Field type="date" />))
        .to.have.descendants('input[type="date"]');
      expect(shallow(<Field type="datetime-local" />))
        .to.have.descendants('input[type="datetime-local"]');
      expect(shallow(<Field type="week" />))
        .to.have.descendants('input[type="week"]');
      expect(shallow(<Field type="month" />))
        .to.have.descendants('input[type="month"]');
    });

    it('set a default value', () => {
      expect(shallow(<Field defaultValue="Username" />).find('input'))
        .to.have.attr('value', 'Username');
    });

    it('can be disabled', () => {
      const wrapper = shallow(<Field disabled name="user" />);
      expect(wrapper).to.have.className('disabled');
      expect(wrapper.find('input')).to.have.attr('disabled');
    });

    it('can be readonly', () => {
      const wrapper = shallow(<Field name="user" readOnly />);
      expect(wrapper).to.have.className('readonly');
      expect(wrapper.find('input')).to.have.attr('readonly');
    });

    it('can be a required field', () => {
      expect(shallow(<Field required />).find('input'))
        .to.have.attr('required');
    });

    it('a placeholder text can be set', () => {
      expect(shallow(<Field placeholder="User Name" />).find('input'))
        .to.have.attr('placeholder', 'User Name');
    });

    it('a pattern validation can be set', () => {
      expect(shallow(<Field pattern="[a-zA-Z0-9]+" />).find('input'))
        .to.have.attr('pattern', '[a-zA-Z0-9]+');
    });

    it('number validation attributes can be set', () => {
      const
        wrapper = shallow(
          <Field max={ 3 } min={ 1 } step={ 1 } type="number" />
        ),
        $input = wrapper.find('input');
      expect($input).to.have.attr('max', '3');
      expect($input).to.have.attr('min', '1');
      expect($input).to.have.attr('step', '1');
    });

    it('text length validation attributes can be set', () => {
      const
        wrapper = shallow(<Field maxLength={ 3 } minLength={ 1 } />),
        $input = wrapper.find('input');
      expect($input).to.have.attr('maxlength', '3');
      expect($input).to.have.attr('minlength', '1');
    });

    it('other input attributes can be set', () => {
      const
        wrapper = shallow(
          <Field
            autoComplete
            autoFocus
            size={ 20 }
            spellCheck
            tabIndex={ -1 }
          />
        ),
        $input = wrapper.find('input');
      expect($input).to.have.attr('autocomplete');
      expect($input).to.have.attr('spellcheck');
      expect($input).to.have.attr('size', '20');
      expect($input).to.have.attr('tabindex', '-1');
    });
  });

  describe('label', () => {

    it('render', () => {
      const
        wrapper = shallow(<Field id="user" label="User Name" name="user" />),
        $label = wrapper.find('label');
      expect($label).to.be.present();
      expect($label).to.have.text('User Name');
      expect($label).to.have.attr('for', 'user');
    });

    it('not rendered by default', () => {
      expect(shallow(<Field />)).to.not.have.descendants('label');
    });

    it('when field is required has an icon', () => {
      const
        wrapper = shallow(<Field label="User" name="user" required />),
        $icon = wrapper.find('.icon-required');
      expect($icon).to.be.present();
      expect($icon).to.have.attr('aria-label');
      expect($icon).to.have.attr('title');
      expect(wrapper.find('input')).to.have.attr('required');
    });
  });

  describe('display inline', () => {

    it('no divs present', () => {
      const wrapper = shallow(
        <Field id="user" inline name="user" />
      );
      expect(wrapper).to.have.className('inline');
      expect(wrapper).to.not.have.tagName('div');
      expect(wrapper).to.have.tagName('span');
    });

    it('by default is full block', () => {
      expect(shallow(<Field />)).to.not.have.className('inline');
    });

    it('when block no spans', () => {
      const wrapper = shallow(<Field id="user" label="Username" name="user" />);
      expect(wrapper).to.not.have.className('inline');
      expect(wrapper).to.have.tagName('div');
      expect(wrapper).to.not.have.tagName('span');
    });
  });

  describe('error message', () => {

    it('render', () => {
      const
        wrapper = shallow(
          <Field
            error="The field is required"
            id="user"
            label="User"
            name="user"
          />
        ),
        $error = wrapper.find('.field-error'),
        $input = wrapper.find('input');

      expect(wrapper).to.have.className('invalid');
      expect($error).to.be.present();
      expect($error).to.have.text('The field is required');
      expect($error).to.have.id('user-error');
      expect($input).to.have.attr('aria-invalid', 'true');
      expect($input).to.have.attr('aria-describedby', 'user-error');
    });

    it('by default is hidden', () => {
      const
        wrapper = shallow(<Field id="user" label="User" name="user" />),
        $error = wrapper.find('.field-error'),
        $input = wrapper.find('input');

      expect($error).to.not.be.present();
      expect(wrapper).to.not.have.className('invalid');
      expect($input).to.not.have.attr('aria-invalid');
      expect($input).to.not.have.attr('aria-describedby');
    });
  });

  it('can wrap a select field', () => {
    const wrapper = shallow(
      <Field
        component="select"
        id="user"
        label="Choose a color"
        name="user"
        options={ [ 'red', 'green', 'blue' ] }
        placeholder="Choose a color"
      />
    );
    expect(wrapper).to.have.exactly(1).descendants(Select);
  });

  describe('events', () => {

    it('onChange handler on simple input', () => {
      const
        handler = spy(),
        wrapper = shallow(
          <Field id="user" name="user" onChange={ handler } />
        );
      wrapper.find('input')
        .simulate('change', { target: { value: 'Fernando' } });
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('Fernando');
    });

    it('onChange handler on select input', () => {
      const
        handler = spy(),
        wrapper = shallow(
          <Field
            component="select"
            id="user"
            label="Choose a color"
            name="user"
            onChange={ handler }
            options={ [ 'red', 'green', 'blue' ] }
            placeholder="Choose a color"
          />
        );
      wrapper.find(Select).dive().find('select')
        .simulate('change', { target: { value: 'green' } });
      expect(handler).to.have.been.called();
      expect(handler).to.have.been.calledWith('green');
    });
  });
});
