import './button.scss';
import React, { PropTypes } from 'react';
import classnames from 'classnames';

/**
 * Button
 * @param   {Object} props     - React props
 * @returns    {JSX} template  - Component template
 */
export default function Button(props) {

  const
    cssClasses = classnames(
      'button',
      props.display,
      props.size,
      props.className,
      { block: props.block },
      { active: props.active }
    ),
    attributes = {
      disabled: props.disabled,
      id: props.id,
      onClick: !props.disabled && props.onClick,
      type: props.type
    };

  return (
    <button className={ cssClasses } { ...attributes }>
      { props.caption || props.children }
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
  display: PropTypes.oneOf([ 'primary', 'link' ]),
  id: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([ 'large', 'small' ]),
  type: PropTypes.oneOf([ 'button', 'submit', 'reset' ])
};
