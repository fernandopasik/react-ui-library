import './field.scss';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Select from './select.js';

/**
 * Field
 * Wraps the label and error of any form field
 * @param {Object} props    - React props
 * @returns  {JSX} template - Component template
 */
export default function Field(props) {
  const {
    className, component, disabled, error, id, inline, onChange, label,
    readOnly, required, ...other
  } = props;

  const
    invalid = Boolean(error),
    Element = inline ? 'span' : 'div',
    FormElement = component === 'select' ? Select : component,
    fieldCSS = classnames('field'
      , { disabled, inline, invalid, readonly: readOnly }, className),
    ariaAttrs = !invalid ? {}
      : { 'aria-invalid': invalid, 'aria-describedby': `${id}-error` };

  const handleChange = function (event) {
    if (event.target && event.target.value) {
      onChange(event.target.value);
    } else {
      onChange(event);
    }
  };

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
        className="field-element"
        disabled={ disabled }
        id={ id }
        onChange={ handleChange }
        readOnly={ readOnly }
        required={ required }
        { ...other }
        { ...ariaAttrs }
      />
      { error
        && <Element className="field-error" id={ `${id}-error` }>
          { error }
        </Element>
      }
    </Element>
  );
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
