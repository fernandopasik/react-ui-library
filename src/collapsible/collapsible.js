/* eslint-disable react/no-did-mount-set-state */
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';

const transitionTime = 400;

/**
 * Collapsible
 */
export default class Collapsible extends Component {
  /**
   * Constructor
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
    const { collapsed } = this.props;
    this.height = this.getHeight();
    this.setState({
      style: {
        height: collapsed ? 0 : this.height,
        overflow: collapsed ? 'hidden' : 'visible',
      },
    });
  }

  /**
   * When collapsing changes reset the content's height
   * @param {object} nextProps - Next props
   */
  componentWillReceiveProps(nextProps) {
    const { collapsed } = this.props;
    if (nextProps.collapsed !== collapsed && !this.updating) {
      this.toggleCollapse(nextProps.collapsed);
    }
  }

  /**
   * If content changes reset the content's height
   */
  componentDidUpdate() {
    const { collapsed } = this.props;
    if (this.height !== this.getHeight() && !this.updating) {
      this.height = this.getHeight();
      this.toggleCollapse(collapsed);
    }
  }

  // istanbul ignore next
  /**
   * Measure content's height
   * @returns {string} - Height in pixels
   */
  getHeight() {
    return this.content.getBoundingClientRect().height;
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
        overflow: 'hidden',
      },
    });

    setTimeout(() => {
      this.setState({
        style: {
          height: collapsed ? 0 : this.getHeight(),
          overflow: collapsed ? 'hidden' : 'visible',
        },
      });
      this.updating = false;
    }, transitionTime);
  }

  /**
   * Render method
   * @returns {JSX} - Component template
   */
  render() {
    const { children } = this.props;
    const { style } = this.state;
    const child = cloneElement(children, {
      ...children.props,
      ref: (content) => { this.content = content; },
    });

    return <div className="collapsible" style={style}>{ child }</div>;
  }
}

Collapsible.propTypes = {
  children: PropTypes.element,
  collapsed: PropTypes.bool,
};
