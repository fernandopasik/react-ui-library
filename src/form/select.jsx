/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './select.scss';
import Dropdown from '../dropdown/dropdown';

/**
 * Select
 * Form controller with custom styles
 */
export default class Select extends Component {
  /**
   * Constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * Forward checkValidity to the select element
   */
  checkValidity() {
    this.select.checkValidity();
  }

  /**
   * When blurred remove class for focus styles
   */
  handleBlur() {
    this.setState({ focus: false });
  }

  /**
   * When focused set class for focus styles
   */
  handleFocus() {
    this.setState({ focus: true });
  }

  /**
   * When dropdown change update select value
   * @param {string} value - Selected dropdown value
   */
  handleDropdown(value) {
    const { onChange } = this.props;
    // istanbul ignore else
    if (value !== this.select.value) {
      this.setState({ value });
      this.select.value = value;
      const event = new window.Event('change', { bubbles: true });
      this.select.dispatchEvent(event);
      if (onChange) {
        onChange(event);
      }
    }
  }

  /**
   * When dropdown change update select value
   * @param {object} event - DOM event object
   */
  handleSelect(event) {
    const { onChange } = this.props;
    this.setState({ value: event.target.value });
    if (onChange) {
      onChange(event);
    }
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    let dropdownOptions = [];
    const { className, onInvalid, options, placeholder, ...other } = this.props;
    const { focus, value } = this.state;
    const selectCSS = classnames('selected-option', className, { focus });

    if (placeholder) {
      dropdownOptions = dropdownOptions.concat(
        options && options[0] && options[0].value ? { value: '', label: placeholder } : placeholder,
      );
    }

    if (options) {
      dropdownOptions = dropdownOptions.concat(options);
    }

    return (
      <div className="select">
        <Dropdown aria-hidden="true" onSelect={this.handleDropdown} options={dropdownOptions}>
          <div className={selectCSS}>{value || placeholder || '\u00a0'}</div>
        </Dropdown>
        <select
          {...other}
          onBlur={this.handleBlur}
          onChange={this.handleSelect}
          onFocus={this.handleFocus}
          onInvalid={onInvalid}
          ref={(ref) => {
            this.select = ref;
          }}
          tabIndex="-1"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options &&
            options.map((option, id) => (
              <option key={id} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onInvalid: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]),
  ),
  placeholder: PropTypes.string,
};
