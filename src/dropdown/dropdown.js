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

    this._options = [];

    this.state = { isOpen: Boolean(props.isOpen) };
    this.close = this.close.bind(this);
    this.select = this.select.bind(this);
    this.setFocusedOption = this.setFocusedOption.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleSelectBlur = this.handleSelectBlur.bind(this);
    this.handleSelectMouseDown = this.handleSelectMouseDown.bind(this);
    this.handleSelectKeyDown = this.handleSelectKeyDown.bind(this);
    this.handleSelectKeyUp = this.handleSelectKeyUp.bind(this);
    this.handleTriggerKeyUp = this.handleTriggerKeyUp.bind(this);
    this.handleOptionFocused = this.handleOptionFocused.bind(this);
    this.handleOptionSelected = this.handleOptionSelected.bind(this);
  }

  /**
   * When component unmounts remove click outside listener
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.close);
  }

  /**
   * Closes the dropdown element
   */
  close() {
    this.setState({ isOpen: false, optionFocused: null });
    document.removeEventListener('click', this.close);
  }

  /**
   * Selects an option and closes
   * @param {string} value - Selected value
   */
  select(value) {
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
    this.close();
  }

  /**
   * Sets focus and scrolls container to an option element
   * @param {number} index - Index of the element to set focused
   */
  setFocusedOption(index) {
    const
      { size, options } = this.props,
      elem = this._options[index];

    // istanbul ignore next
    // When limited size and capped scroll to visible is needed
    if (size && options && size < options.length) {
      if (elem.offsetTop + elem.offsetHeight > this._list.offsetHeight) {
        this._list.scrollTop = elem.offsetTop + elem.offsetHeight - this._list.offsetHeight;
      } else if (elem.offsetTop < this._list.scrollTop) {
        this._list.scrollTop = elem.offsetTop;
      }
    }

    this.setState({ optionFocused: index });
  }

  /**
   * Opens or closes the dropdown element
   */
  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen, optionFocused: null });
    if (!this.state.isOpen) {
      document.addEventListener('click', this.close);
    }
  }

  /**
   * When trigger has enter or space pressed open dropdown
   * @param {object} event - DOM event object
   */
  handleTriggerKeyUp(event) {
    const code = event.keyCode || event.which;
    if (code === 13 || code === 32) {
      event.preventDefault();
      this.toggleOpen();
    }
  }

  /**
   * Close dropdown on blur
   */
  handleSelectBlur() {
    this.close();
  }

  /**
   * Avoid blur to be fired before click
   * @param {object} event - DOM event object
   */
  handleSelectMouseDown(event) {
    event.preventDefault();
  }

  /**
   * Disable scroll on page
   * @param {object} event - DOM event object
   */
  handleSelectKeyDown(event) {
    // istanbul ignore next
    const code = event.keyCode || event.which;
    if (code === 38 || code === 40 || code === 13 || code === 32) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Handle keys for
   *  - cycling through options and select one
   *  - close when escape
   *  - select on enter
   * @param {object} event - DOM event object
   */
  handleSelectKeyUp(event) {
    const
      { options } = this.props,
      { isOpen, optionFocused } = this.state;
    // istanbul ignore next
    const code = event.keyCode || event.which;
    switch (code) {
        case 38: // up arrow
          event.preventDefault();
          if (optionFocused > 0) {
            this.setFocusedOption(optionFocused - 1);
          }
          break;
        case 40: // down arrow
          event.preventDefault();
          if (optionFocused === null) {
            this.setFocusedOption(optionFocused - 0);
          } else if (optionFocused < options.length - 1) {
            this.setFocusedOption(optionFocused + 1);
          }
          break;
        case 13: // enter
        case 32: // space
          event.preventDefault();
          if (optionFocused !== null && isOpen) {
            this.select(options[optionFocused]);
          }
          break;
        case 27: // esc
          event.preventDefault();
          this.close();
          break;
        default:
          break;
    }
  }

  /**
   * Handler when an option is focused by:
   *  - hover
   *  - focus
   * @param {string} index - Focused option index
   * @returns {function}   - Event handler function
   */
  handleOptionFocused(index) {
    return () => {
      this.setFocusedOption(index);
    };
  }

  /**
   * Handler when an option is selected by:
   *  - click
   *  - press enter or space
   * @param {string} value - Selected option value
   * @returns {function}   - Event handler function
   */
  handleOptionSelected(value) {
    return event => {
      const code = event.keyCode || event.which;
      if (code === 13 || code === 32 || !code) {
        this.select(value);
      }
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
        onClick: this.toggleOpen,
        onKeyUp: this.handleTriggerKeyUp,
        tabIndex: '0'
      });

    if (size && options && size < options.length) {
      attributes.style = {
        maxHeight: `${optionHeight * (size + 0.5)}px`,
        overflowY: 'scroll'
      };
    }

    return (
      <div
        className={ cssClass }
        onBlur={ this.handleSelectBlur }
        onKeyDown={ this.handleSelectKeyDown }
        onKeyUp={ this.handleSelectKeyUp }
        onMouseDown={ this.handleSelectMouseDown }
        tabIndex="-1"
      >
        { child }
        { this.state.isOpen
          && <ul className="options" ref={ ref => { this._list = ref; } } role="listbox" { ...attributes }>
            { options && options.map((option, index) =>
              <li
                className={ classnames('option', { focus: this.state.optionFocused === index }) }
                key={ index }
                onClick={ this.handleOptionSelected(option.value || option) }
                onFocus={ this.handleOptionFocused(index) }
                onKeyUp={ this.handleOptionSelected(option.value || option) }
                onMouseOver={ this.handleOptionFocused(index) }
                ref={ ref => { this._options[index] = ref; } }
                role="option"
                tabIndex="-1"
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
