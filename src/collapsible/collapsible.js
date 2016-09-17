/* eslint-disable react/no-set-state, react/no-did-mount-set-state */
import './collapsible.scss';
import React, { cloneElement, Component, PropTypes } from 'react';
import classnames from 'classnames';

/**
 * Collapsible
 */
export default class Collapsible extends Component {

  /**
   * constructor
   * @param {Object} props - React props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Right when mounted measure the header's height
   */
  componentDidMount() {
    this.setState({ height: this._content.clientHeight });
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {

    const
      { children, collapsed } = this.props,
      height = collapsed ? 0 : this.state.height,
      child = cloneElement(children, {
        ...children.props,
        className: classnames(children.props
          && children.props.className, 'collapsible-content'),
        ref: content => { this._content = content; }
      });

    return <div className="collapsible" style={{ height }}>{ child }</div>;
  }
}

Collapsible.propTypes = {
  children: PropTypes.element,
  collapsed: PropTypes.bool
};
