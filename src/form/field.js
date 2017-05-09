/* eslint-disable react/no-set-state */
import './field.scss';
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
    this.state = { errorMessage: '', invalid: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleInvalid = this.handleInvalid.bind(this);
  }

  /**
   * Component mounted on DOM
   */
  componentDidMount() {
    const elem = this._formElem;
    if (this.props.validate && elem.checkValidity) {
      elem.checkValidity();
    }
  }

  /**
   * When Change response with just value
   * @param {object} event - DOM event object
   */
  handleChange(event) {
    if (this.state.invalid || this.props.validate) {
      this.validate(event.target);
    }
    // istanbul ignore else
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  /**
   * When Invalid value stop default browser validation popups
   * and do custom field validation
   * @param {object} event - DOM event object
   */
  handleInvalid(event) {
    event.preventDefault();
    this.setState({ invalid: true });
    this.validate(event.target);
  }

  /**
   * Analyze validity and set error message
   * @param {object} elem - Form element to be validated
   */
  validate(elem) {
    const { errorMessages, type } = this.props;
    if (elem.validity && !elem.validity.valid) {
      if (elem.validity.valueMissing) {
        this.setState({
          errorMessage: errorMessages.valueMissing || 'This is a required field.',
          invalid: true
        });
      } else if (elem.validity.typeMismatch) {
        this.setState({
          errorMessage: errorMessages.typeMismatch || `This value is not an ${type}.`,
          invalid: true
        });
      } else {
        this.setState({
          errorMessage: errorMessages.patternMismatch || 'This value is invalid.',
          invalid: true
        });
      }
    } else {
      this.setState({ errorMessage: '', invalid: false });
    }
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    const {
      className, component, disabled, id, inline, label, readOnly, required,
      errorMessages, multiLine, resize, validate, ...other // eslint-disable-line no-unused-vars
    } = this.props;

    const { errorMessage, invalid } = this.state;
    let FormElement;
    const
      Element = inline ? 'span' : 'div',
      fieldCSS = classnames('field'
        , { disabled, inline, invalid, readonly: readOnly }, className),
      ariaAttrs = !invalid ? {}
        : { 'aria-invalid': invalid, 'aria-describedby': `${id}-error` },
      // eslint-disable-next-line no-nested-ternary
      elementStyle = { resize: !resize ? 'none' : resize === true ? 'both' : resize };

    FormElement = component === 'select' ? Select : component;

    if (multiLine && component === 'input') {
      FormElement = 'textarea';
    }

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
          onInvalid={ this.handleInvalid }
          readOnly={ readOnly }
          ref={ ref => { this._formElem = ref; } }
          required={ required }
          style={ elementStyle }
        />
        { errorMessage
          && <Element className="field-error" id={ `${id}-error` }>
            { errorMessage }
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
  cols: PropTypes.number,
  component: PropTypes.oneOf([ 'input', 'select', 'textarea' ]),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessages: PropTypes.shape({
    patternMismatch: PropTypes.string,
    typeMismatch: PropTypes.string,
    valueMissing: PropTypes.string
  }),
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
  multiLine: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInvalid: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  resize: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([ 'none', 'both', 'horizontal', 'vertical', 'inherit' ])
  ]),
  rows: PropTypes.number,
  size: PropTypes.number,
  spellCheck: PropTypes.bool,
  step: PropTypes.number,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf([
    'text', 'email', 'number', 'password', 'hidden',
    'tel', 'url', 'color', 'search', 'range',
    'date', 'datetime-local', 'week', 'month'
  ]),
  validate: PropTypes.bool,
  wrap: PropTypes.oneOf([ 'hard', 'soft' ])
};

Field.defaultProps = { component: 'input', errorMessages: {}, type: 'text' };
