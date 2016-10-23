/* eslint-disable react/no-set-state */
import './dropdown.scss';
import React, { cloneElement, Component, PropTypes } from 'react';
import Button from '../button/button.js';
import classnames from 'classnames';

const optionHeight = 48;

/**
 * Dropdown
 * @param   {Object} props     - React props
 * @returns    {JSX} template  - Component template
 */
export default class Dropdown extends Component {

  /**
   * constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);

    this.state = { isOpen: Boolean(props.isOpen) };
    this.close = this.close.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleOptionClicked = this.handleOptionClicked.bind(this);
  }

  /**
   * Closes the dropdown element
   */
  close() {
    this.setState({ isOpen: false });
    document.removeEventListener('click', this.close);
  }

  /**
   * Opens or closes the dropdown element
   */
  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
    if (!this.state.isOpen) {
      document.addEventListener('click', this.close);
    }
  }

  /**
   * Callback when an option is clicked
   * @param {string} value - Clicked option value
   * @returns {function}   - Event handler function
   */
  handleOptionClicked(value) {
    return () => {
      if (this.props.onSelect) {
        this.props.onSelect(value);
      }
      this.close();
    };
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    const
      { isOpen } = this.state,
      { caption, children, options, size } = this.props,
      cssClass = classnames('dropdown', { 'is-open': isOpen }),
      attributes = {};
    const child = cloneElement(children
      || <Button
        arrow={ this.state.isOpen ? 'up' : 'down' }
        caption={ caption }
      />, {
        ...(children ? children.props : {}),
        className: classnames('trigger',
          children ? children.props.className : ''),
        onClick: this.toggleOpen
      });

    if (size && options && size < options.length) {
      attributes.style = {
        maxHeight: `${optionHeight * (size + 0.5)}px`,
        overflow: 'scroll'
      };
    }


    return (
      <div className={ cssClass }>
        { child }
        { this.state.isOpen
          && <ul className="options" { ...attributes }>
            { options && options.map((option, index) =>
              <li
                className="option"
                key={ index }
                onClick={ this.handleOptionClicked(option.value || option) }
              >
                { option.label || option }
              </li>
            ) }
          </ul>
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ])),
  size: PropTypes.number
};
