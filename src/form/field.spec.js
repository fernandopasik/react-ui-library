import React from 'react';
import { mount, shallow } from 'enzyme';
import Field from './field';
import Select from './select';

describe('Field', () => {
  describe('form element', () => {
    it('spans an input element', () => {
      expect(shallow(<Field />).find('input')).toHaveLength(1);
    });

    it('add field-element class', () => {
      expect(shallow(<Field />).find('.field-element')).toExist();
    });

    it('add id', () => {
      expect(shallow(<Field id="user" />).find('#user')).toExist();
    });

    it('add name', () => {
      expect(shallow(<Field name="user" />).find('input')).toHaveProp('name', 'user');
    });

    it('if no type then default to text', () => {
      expect(shallow(<Field />).find('input')).toHaveProp('type', 'text');
    });

    it('valid types', () => {
      expect(shallow(<Field type="text" />).find(('input[type="text"]'))).toExist();
      expect(shallow(<Field type="email" />).find(('input[type="email"]'))).toExist();
      expect(shallow(<Field type="number" />).find(('input[type="number"]'))).toExist();
      expect(shallow(<Field type="password" />).find(('input[type="password"]'))).toExist();
      expect(shallow(<Field type="search" />).find(('input[type="search"]'))).toExist();
      expect(shallow(<Field type="tel" />).find(('input[type="tel"]'))).toExist();
      expect(shallow(<Field type="url" />).find(('input[type="url"]'))).toExist();
      expect(shallow(<Field type="color" />).find(('input[type="color"]'))).toExist();
      expect(shallow(<Field type="range" />).find(('input[type="range"]'))).toExist();
      expect(shallow(<Field type="date" />).find(('input[type="date"]'))).toExist();
      expect(shallow(<Field type="datetime-local" />).find(('input[type="datetime-local"]'))).toExist();
      expect(shallow(<Field type="week" />).find(('input[type="week"]'))).toExist();
      expect(shallow(<Field type="month" />).find(('input[type="month"]'))).toExist();
    });

    it('set a default value', () => {
      expect(shallow(<Field defaultValue="Username" />).find('input')).toHaveProp('defaultValue', 'Username');
    });

    it('can be disabled', () => {
      const wrapper = shallow(<Field disabled name="user" />);
      expect(wrapper).toHaveClassName('disabled');
      expect(wrapper.find('input')).toHaveProp('disabled');
    });

    it('can be readonly', () => {
      const wrapper = shallow(<Field name="user" readOnly />);
      expect(wrapper).toHaveClassName('readonly');
      expect(wrapper.find('input')).toHaveProp('readOnly');
    });

    it('can be a required field', () => {
      expect(shallow(<Field required />).find('input')).toHaveProp('required');
    });

    it('a placeholder text can be set', () => {
      expect(shallow(<Field placeholder="User Name" />).find('input'))
        .toHaveProp('placeholder', 'User Name');
    });

    it('a pattern validation can be set', () => {
      expect(shallow(<Field pattern="[a-zA-Z0-9]+" />).find('input'))
        .toHaveProp('pattern', '[a-zA-Z0-9]+');
    });

    it('number validation attributes can be set', () => {
      const $input = shallow(<Field max={3} min={1} step={1} type="number" />).find('input');
      expect($input).toHaveProp('max', 3);
      expect($input).toHaveProp('min', 1);
      expect($input).toHaveProp('step', 1);
    });

    it('text length validation attributes can be set', () => {
      const $input = shallow(<Field maxLength={3} minLength={1} />).find('input');
      expect($input).toHaveProp('maxLength', 3);
      expect($input).toHaveProp('minLength', 1);
    });

    it('other input attributes can be set', () => {
      const $input = shallow(<Field autoComplete autoFocus size={20} spellCheck tabIndex={-1} />).find('input');
      expect($input).toHaveProp('autoComplete');
      expect($input).toHaveProp('autoFocus');
      expect($input).toHaveProp('spellCheck');
      expect($input).toHaveProp('size', 20);
      expect($input).toHaveProp('tabIndex', -1);
    });
  });

  describe('label', () => {
    it('render', () => {
      const $label = shallow(<Field id="user" label="User Name" name="user" />).find('label');
      expect($label).toExist();
      expect($label).toHaveText('User Name');
      expect($label).toHaveProp('htmlFor', 'user');
    });

    it('not rendered by default', () => {
      expect(shallow(<Field />).find('label')).not.toExist();
    });

    it('when field is required has an icon', () => {
      const wrapper = shallow(<Field label="User" name="user" required />);
      const $icon = wrapper.find('.icon-required');
      expect($icon).toExist();
      expect($icon).toHaveProp('aria-label');
      expect($icon).toHaveProp('title');
      expect(wrapper.find('input')).toHaveProp('required');
    });
  });

  describe('display inline', () => {
    it('no divs present', () => {
      const wrapper = shallow(<Field id="user" inline name="user" />);
      expect(wrapper).toHaveClassName('inline');
      expect(wrapper).not.toHaveDisplayName('div');
      expect(wrapper).toHaveDisplayName('span');
    });

    it('by default is full block', () => {
      expect(shallow(<Field />)).not.toHaveClassName('inline');
    });

    it('when block no spans', () => {
      const wrapper = shallow(<Field id="user" label="Username" name="user" />);
      expect(wrapper).not.toHaveClassName('inline');
      expect(wrapper).toHaveDisplayName('div');
      expect(wrapper).not.toHaveDisplayName('span');
    });
  });

  describe('error message', () => {
    it('render', () => {
      const wrapper = mount(<Field id="user" label="User" name="user" required />);
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      wrapper.update();
      const $input = wrapper.find('input');
      const $error = wrapper.find('.field-error');
      expect(wrapper.find('.field')).toHaveClassName('invalid');
      expect($error).toExist();
      expect($error).toHaveText('This is a required field.');
      expect($error).toHaveProp('id', 'user-error');
      expect($input).toHaveProp('aria-invalid', true);
      expect($input).toHaveProp('aria-describedby', 'user-error');
    });

    it('by default is hidden', () => {
      const wrapper = mount(<Field id="user" label="User" name="user" required />);
      const $input = wrapper.find('input');
      expect(wrapper.find('.field-error')).not.toExist();
      expect(wrapper.find('.field')).not.toHaveClassName('invalid');
      expect($input).not.toHaveProp('aria-invalid');
      expect($input).not.toHaveProp('aria-describedby');
    });

    it('can be forced on mount', () => {
      const wrapper = mount(<Field id="user" label="User" name="user" required validate />);
      const $input = wrapper.find('input');
      expect(wrapper.find('.field-error')).toExist();
      expect(wrapper.find('.field')).toHaveClassName('invalid');
      expect($input).toHaveProp('aria-invalid');
      expect($input).toHaveProp('aria-describedby');
    });
  });

  describe('events', () => {
    it('onChange handler on simple input', () => {
      const handler = jest.fn();
      const wrapper = mount(<Field id="user" name="user" onChange={handler} />);
      wrapper.find('input').first().simulate('change', { target: { value: 'Fernando' } });
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('Fernando');
    });

    it('onChange handler on select input', () => {
      const handler = jest.fn();
      const wrapper = mount(
        <Field
          component="select"
          id="color"
          label="Choose a color"
          name="color"
          onChange={handler}
          options={['red', 'green', 'blue']}
          placeholder="Choose a color"
        />,
      );
      wrapper.find(Select).find('select').first().simulate('change', { target: { value: 'green' } });
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith('green');
    });
  });

  describe('validation', () => {
    it('if no invalid event then error hidden', () => {
      const wrapper = mount(<Field id="email" name="email" type="email" />);
      const $input = wrapper.find('input');
      $input.instance().value = 'notanemail';
      $input.first().simulate('change', { target: { value: 'notanemail' } });
      expect(wrapper).toHaveState('invalid', false);
      expect(wrapper).toHaveState('errorMessage', '');
      expect(wrapper.find('.field-error')).not.toExist();
    });

    it('if onchange before invalid then error hidden', () => {
      const wrapper = mount(<Field id="email" name="email" type="email" />);
      const $input = wrapper.find('input');
      $input.instance().value = 'notanemail';
      $input.first().simulate('change', { target: { value: 'notanemail' } });
      expect(wrapper).toHaveState('invalid', false);
      expect(wrapper).toHaveState('errorMessage', '');
      // Activate validation and show message
      $input.instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This value is not an email.');
    });

    it('onchange after invalid can make the error go away', () => {
      const wrapper = mount(<Field id="email" name="email" type="email" />);
      const $input = wrapper.find('input');
      // Input invalid data
      $input.instance().value = 'notanemail';
      $input.first().simulate('change', { target: { value: 'notanemail' } });
      // Activate validation
      $input.instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This value is not an email.');
      // Input correct data
      $input.instance().value = 'email@domain.com';
      $input.first().simulate('change', { target: { value: 'email@domain.com' } });
      expect(wrapper).toHaveState('invalid', false);
      expect(wrapper).toHaveState('errorMessage', '');
    });

    it.skip('if validate prop then do validation from mount', () => {
      const wrapper = mount(
        <Field defaultValue="notanemail" id="email" name="email" type="email" validate />,
      );
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This value is not an email.');
    });

    it('required', () => {
      const wrapper = mount(<Field id="user" name="user" required />);
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This is a required field.');
    });

    it('type', () => {
      const wrapper = mount(
        <Field defaultValue="notanemail" id="email" name="email" type="email" />,
      );
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This value is not an email.');
    });

    it('pattern', () => {
      const wrapper = mount(
        <Field defaultValue="(11)123456789" id="tel" name="tel" pattern="^[\d]*$" type="tel" />,
      );
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This value is invalid.');
    });

    it('required comes before type', () => {
      const wrapper = mount(<Field id="email" name="email" required type="email" />);
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This is a required field.');
    });

    it('type comes before pattern', () => {
      const wrapper = mount(
        <Field defaultValue="notanemail" id="email" name="email" pattern="^[\d]*$" type="email" />,
      );
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'This value is not an email.');
    });

    it('required custom error message', () => {
      const wrapper = mount(
        <Field
          errorMessages={{ valueMissing: 'You must input this field.' }}
          id="user"
          name="user"
          required
        />,
      );
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'You must input this field.');
    });

    it('type custom error message', () => {
      const wrapper = mount(
        <Field
          defaultValue="notanemail"
          errorMessages={{ typeMismatch: 'You did not input an email value.' }}
          id="email"
          name="email"
          type="email"
        />,
      );
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'You did not input an email value.');
    });

    it('pattern custom error message', () => {
      const wrapper = mount(
        <Field
          defaultValue="(11)123456789"
          errorMessages={{ patternMismatch: 'You input an invalid value.' }}
          id="tel"
          name="tel"
          pattern="^[\d]*$"
          type="tel"
        />,
      );
      wrapper.find('input').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
      expect(wrapper).toHaveState('invalid', true);
      expect(wrapper).toHaveState('errorMessage', 'You input an invalid value.');
    });

    describe('Multiline or textarea', () => {
      it('wrap a textarea element', () => {
        expect(shallow(<Field id="comments" multiLine name="comments" />)
          .find('textarea')).toHaveLength(1);
        expect(shallow(<Field component="textarea" id="comments" name="comments" />)
          .find('textarea')).toHaveLength(1);
      });

      it('resize', () => {
        expect(shallow(<Field id="comments" multiLine name="comments" />).find('textarea'))
          .toHaveStyle('resize', 'none');
        expect(shallow(<Field id="comments" multiLine name="comments" resize />).find('textarea'))
          .toHaveStyle('resize', 'both');
        expect(shallow(<Field id="comments" multiLine name="comments" resize="vertical" />).find('textarea'))
          .toHaveStyle('resize', 'vertical');
      });
    });

    describe('Select Field', () => {
      it('wrap a select component', () => {
        expect(shallow(
          <Field
            component="select"
            id="color"
            label="Choose a color"
            name="color"
            options={['red', 'green', 'blue']}
            placeholder="Choose a color"
          />,
        ).find(Select)).toExist();
      });

      it('if no invalid event then error hidden', () => {
        const wrapper = mount(
          <Field
            component="select"
            id="color"
            name="color"
            options={['red', 'green', 'blue']}
            placeholder="Choose a color"
            required
          />,
        );
        const $select = wrapper.find('select');
        $select.instance().value = 'red';
        $select.first().simulate('change', { target: { value: 'red' } });
        expect(wrapper).toHaveState('invalid', false);
        expect(wrapper).toHaveState('errorMessage', '');
        expect(wrapper.find('.field-error')).not.toExist();
      });

      it('if onchange before invalid then error hidden', () => {
        const wrapper = mount(
          <Field
            component="select"
            id="color"
            name="color"
            options={['red', 'green', 'blue']}
            placeholder="Choose a color"
            required
          />,
        );
        const $select = wrapper.find('select');
        expect(wrapper).toHaveState('invalid', false);
        expect(wrapper).toHaveState('errorMessage', '');
        // Activate validation and show message
        $select.instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
        expect(wrapper).toHaveState('invalid', true);
        expect(wrapper).toHaveState('errorMessage', 'This is a required field.');
      });

      it('onchange after invalid can make the error go away', () => {
        const wrapper = mount(
          <Field
            component="select"
            id="color"
            name="color"
            options={['red', 'green', 'blue']}
            placeholder="Choose a color"
            required
          />,
        );
        const $select = wrapper.find('select');
        // Activate validation
        $select.instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
        expect(wrapper).toHaveState('invalid', true);
        expect(wrapper).toHaveState('errorMessage', 'This is a required field.');
        // Input correct data
        $select.instance().value = 'red';
        $select.first().simulate('change', { target: { value: 'red' } });
        expect(wrapper).toHaveState('invalid', false);
        expect(wrapper).toHaveState('errorMessage', '');
      });

      it.skip('if validate prop then do validation from mount', () => {
        const wrapper = mount(
          <Field
            component="select"
            id="color"
            name="color"
            options={['red', 'green', 'blue']}
            placeholder="Choose a color"
            required
            validate
          />,
        );
        expect(wrapper).toHaveState('invalid', true);
        expect(wrapper).toHaveState('errorMessage', 'This is a required field.');
      });

      it.skip('required', () => {
        const wrapper = mount(
          <Field
            component="select"
            id="color"
            name="color"
            options={['red', 'green', 'blue']}
            placeholder="Choose a color"
            required
            validate
          />,
        );
        wrapper.find('select').instance().dispatchEvent(new window.Event('invalid', { bubbles: true }));
        expect(wrapper).toHaveState('invalid', true);
        expect(wrapper).toHaveState('errorMessage', 'This is a required field.');
      });
    });
  });
});
