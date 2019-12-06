/* eslint-disable react/jsx-props-no-spreading */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './button.scss';

/**
 * Button
 * @param   {Object} props     - React props
 * @returns    {JSX} template  - Component template
 */
export default function Button({
  active,
  block,
  caption,
  children,
  className,
  disabled,
  display,
  id,
  onBlur,
  onClick,
  onFocus,
  onKeyUp,
  size,
  tabIndex,
  type,
}) {
  const cssClasses = classnames('button', display, size, className, { block, active });
  const attributes = { disabled, id, onBlur, onClick, onFocus, onKeyUp, tabIndex, type };

  return (
    <button className={cssClasses} type="button" {...attributes}>
      {caption || children}
    </button>
  );
}

Button.propTypes = {
  active: PropTypes.bool,
  block: PropTypes.bool,
  caption: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['primary', 'link']),
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  size: PropTypes.oneOf(['large', 'small']),
  tabIndex: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
