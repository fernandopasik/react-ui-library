import './field.scss';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Select from './select.js';

/**
 * Field
 * Wraps the label and error of any form field
 * @param {Object} props    - React props
 * @returns  {JSX} template - Component template
 */
export default class Field extends Component {

  /**
   * constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * When Change response with just value
   * @param {object} event - DOM event object
   */
  handleChange(event) {
    // istanbul ignore else
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    const {
      className, component, disabled, error, id, inline, label,
      readOnly, required, ...other
    } = this.props;

    const
      invalid = Boolean(error),
      Element = inline ? 'span' : 'div',
      FormElement = component === 'select' ? Select : component,
      fieldCSS = classnames('field'
        , { disabled, inline, invalid, readonly: readOnly }, className),
      ariaAttrs = !invalid ? {}
        : { 'aria-invalid': invalid, 'aria-describedby': `${id}-error` };

    return (
      <Element className={ fieldCSS }>
        { label
          && <label className="field-label" htmlFor={ id }>
            { label }
            { required
              && <span
                aria-label="Required"
                className="icon icon-required"
                title="Required"
              />
            }
          </label>
        }
        <FormElement
          { ...other }
          { ...ariaAttrs }
          className="field-element"
          disabled={ disabled }
          id={ id }
          onChange={ this.handleChange }
          readOnly={ readOnly }
          ref={ ref => { this._formElem = ref; } }
          required={ required }
        />
        { error
          && <Element className="field-error" id={ `${id}-error` }>
            { error }
          </Element>
        }
      </Element>
    );
  }
}

Field.propTypes = {
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  form: PropTypes.string,
  formaction: PropTypes.string,
  formenctype: PropTypes.string,
  formmethod: PropTypes.oneOf([ 'get', 'post' ]),
  formnovalidate: PropTypes.bool,
  formtarget: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  maxLength: PropTypes.number,
  min: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  minLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.number,
  spellCheck: PropTypes.bool,
  step: PropTypes.number,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf([
    'text', 'email', 'number', 'password', 'hidden',
    'tel', 'url', 'color', 'search', 'range',
    'date', 'datetime-local', 'week', 'month'
  ])
};

Field.defaultProps = { component: 'input', type: 'text' };
