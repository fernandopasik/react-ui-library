import React, { cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import Children from 'react-children-utilities';
import './form.scss';
import Field from './field';

const Form = ({ children, onReset, onSubmit }) => {
  const [values, setValues] = useState({});

  const handleFieldChange = (fieldName) => (event) => {
    values[fieldName] = event.target && event.target.value ? event.target.value : event;
    setValues(values);
  };

  const handleReset = (event) => {
    setValues({});
    if (onReset) {
      onReset(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const formChildren = Children.deepMap(children, (child) => {
    if (child.type === Field) {
      return cloneElement(child, {
        ...child.props,
        onChange: handleFieldChange(child.props.name),
      });
    }
    return child;
  });
  const grouped = Children.groupByType(formChildren, ['footer'], 'body');

  return (
    <form onReset={handleReset} onSubmit={handleSubmit}>
      {grouped.body}
      {grouped.footer && <div className="form-footer">{grouped.footer}</div>}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form;
