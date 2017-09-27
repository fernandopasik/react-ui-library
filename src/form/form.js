import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import Children from 'react-children-utilities';
import './form.scss';
import Field from './field';

/**
 * Form
 * Wraps fields in order to make a form with a submit
 */
export default class Form extends Component {
  /**
   * Constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);
    this.state = { values: {} };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /**
   * Update state from onChange fields event
   * @param     {string} fieldName - Name from a Field included in Form
   * @returns {function}           - Change event handler
   */
  handleFieldChange(fieldName) {
    return (event) => {
      const values = this.state.values;
      values[fieldName] = event.target && event.target.value
        ? event.target.value : event;
      this.setState({ values });
    };
  }

  /**
   * Handle Form submit
   * @param {object} event - DOM event object
   */
  handleReset(event) {
    this.setState({ values: {} });
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  }

  /**
   * Handle Form submit
   * @param {object} event - DOM event object
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values);
    }
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    const { children } = this.props;
    const formChildren = Children.deepMap(children, (child) => {
      if (child.type === Field) {
        return cloneElement(child, {
          ...child.props,
          onChange: this.handleFieldChange(child.props.name),
        });
      }
      return child;
    });
    const grouped = Children.groupByType(formChildren, ['footer'], 'body');

    return (
      <form onReset={this.handleReset} onSubmit={this.handleSubmit}>
        { grouped.body }
        { grouped.footer
          && <div className="form-footer">{ grouped.footer }</div>
        }
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
};
