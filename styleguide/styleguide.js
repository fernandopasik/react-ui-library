import '../src/index.js';
import './styleguide.scss';
import { hashHistory, Link, Route, Router } from 'react-router';
import React, { PropTypes } from 'react';
import ButtonComponent from '../src/button/button.md';
import classNames from 'classnames';
import DropdownComponent from '../src/dropdown/dropdown.md';
import FieldComponent from '../src/form/field.md';
import FormComponent from '../src/form/form.md';
import HelloWorldComponent from '../src/hello-world/hello-world.md';
import LayoutComponent from '../src/base/layout.md';
import LinkComponent from '../src/base/link.md';
import MobileDetect from 'mobile-detect';
import PanelComponent from '../src/panel/panel.md';
import { render } from 'react-dom';
import TypographyComponent from '../src/base/typography.md';

const md = new MobileDetect(window.navigator.userAgent);

/**
 * Style Guide
 * @param {Object} props    - React props
 * @returns  {JSX} template - Component template
 */
function StyleGuide(props) {
  const cssClasses = classNames(
    'styleguide',
    'container',
    { mobile: md.mobile(), desktop: !md.mobile() }
  );
  return (
    <div className={ cssClasses }>
      <h1>Style Guide</h1>
      <nav>
        <Link to="typography">Typography</Link>
        <Link to="link">Link</Link>
        <Link to="layout">Layout</Link>
        <Link to="hello-world">Hello World</Link>
        <Link to="button">Button</Link>
        <Link to="dropdown">dropdown</Link>
        <Link to="panel">Panel</Link>
        <Link to="field">Field</Link>
        <Link to="form">Form</Link>
      </nav>
      { props.children }
    </div>
  );
}

StyleGuide.propTypes = { children: PropTypes.node };

render((
  <Router history={ hashHistory }>
    <Route component={ StyleGuide } path="/">
      <Route component={ TypographyComponent } path="typography" />
      <Route component={ LinkComponent } path="link" />
      <Route component={ LayoutComponent } path="layout" />
      <Route component={ HelloWorldComponent } path="hello-world" />
      <Route component={ ButtonComponent } path="button" />
      <Route component={ DropdownComponent } path="dropdown" />
      <Route component={ PanelComponent } path="panel" />
      <Route component={ FieldComponent } path="field" />
      <Route component={ FormComponent } path="form" />
    </Route>
  </Router>
  ), document.getElementById('root')
);
