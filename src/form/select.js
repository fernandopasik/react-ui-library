/* eslint-disable react/no-set-state */
import './select.scss';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Dropdown from '../dropdown/dropdown.js';

/**
 * Select
 * Form controller with custom styles
 */
export default class Select extends Component {

  /**
   * constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * When dropdown change update select value
   * @param {string} value - Selected dropdown value
   */
  handleDropdown(value) {
    this.setState({ value });
    this.props.onSelect(value);
  }

  /**
   * When dropdown change update select value
   * @param {object} event - DOM event object
   */
  handleSelect(event) {
    this.setState({ value: event.target.value });
    this.props.onSelect(event.target.value);
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    let dropdownOptions = [];
    const { className, options, placeholder, ...other } = this.props;
    const selectCSS = classnames('selected-option', className);

    if (placeholder) {
      dropdownOptions = dropdownOptions.concat(
        options && options[0] && options[0].value
          ? { value: '', label: placeholder } : placeholder
      );
    }

    if (options) {
      dropdownOptions = dropdownOptions.concat(options);
    }

    return (
      <div className="select">
        <Dropdown
          aria-hidden="true"
          onSelect={ this.handleDropdown }
          options={ dropdownOptions }
        >
          <div className={ selectCSS }>
            { this.state.value || placeholder || '\u00a0' }
          </div>
        </Dropdown>
        <select
          onChange={ this.handleSelect }
          ref={ ref => { this._select = ref; } }
          value={ this.state.value }
          { ...other }
        >
          { placeholder && <option value="">{ placeholder }</option> }
          { options && options.map((option, id) =>
            <option key={ id } value={ option.value || option }>
              { option.label || option }
            </option>
          ) }
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ])),
  placeholder: PropTypes.string
};