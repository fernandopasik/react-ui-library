/* eslint-disable react/no-set-state, react/no-did-mount-set-state */
import React, { cloneElement, Component, PropTypes } from 'react';

const transitionTime = 400;

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
    this.state = { style: {} };
  }

  /**
   * Right when mounted measure the content's height
   */
  componentDidMount() {
    this.height = this.getHeight();
    this.setState({
      style: {
        height: this.props.collapsed ? 0 : this.height,
        overflow: this.props.collapsed ? 'hidden' : 'visible'
      }
    });
  }

  /**
   * When collapsing changes reset the content's height
   * @param {object} nextProps - Next props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed !== this.props.collapsed && !this.updating) {
      this.toggleCollapse(nextProps.collapsed);
    }
  }

  /**
   * If content changes reset the content's height
   */
  componentDidUpdate() {
    if (this.height !== this.getHeight() && !this.updating) {
      this.height = this.getHeight();
      this.toggleCollapse(this.props.collapsed);
    }
  }

  /**
   * Collapse or uncollapse
   * changing height and overflow
   * @param {boolean} collapsed - True if it's collapsed
   */
  toggleCollapse(collapsed) {
    this.updating = true;
    this.setState({
      style: {
        height: collapsed ? 0 : this.height,
        transition: `height ${transitionTime / 1000}s ease-out`,
        overflow: 'hidden'
      }
    });

    setTimeout(() => {
      this.setState({
        style: {
          height: collapsed ? 0 : this.getHeight(),
          overflow: collapsed ? 'hidden' : 'visible'
        }
      });
      this.updating = false;
    }, transitionTime);
  }

  // istanbul ignore next
  /**
   * Measure content's height
   * @returns {string} - Height in pixels
   */
  getHeight() {
    return this._content.getBoundingClientRect().height;
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {

    const
      { children } = this.props,
      { style } = this.state,
      child = cloneElement(children, {
        ...children.props,
        ref: content => { this._content = content; }
      });

    return <div className="collapsible" style={ style }>{ child }</div>;
  }
}

Collapsible.propTypes = {
  children: PropTypes.element,
  collapsed: PropTypes.bool
};
