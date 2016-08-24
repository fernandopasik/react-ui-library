import '../src/base/base.scss';
import './styleguide.scss';
import classNames from 'classnames';
import Components from './components.js';
import MobileDetect from 'mobile-detect';
import React from 'react';
import { render } from 'react-dom';

const md = new MobileDetect(window.navigator.userAgent);

/**
 * Style Guide
 * @returns {JSX} template
 */
function StyleGuide() {
  const cssClasses = classNames(
    'styleguide',
    'container',
    { mobile: md.mobile(), desktop: !md.mobile() }
  );
  return (
    <div className={ cssClasses }>
      <h1>Style Guide</h1>
      <Components />
    </div>
  );
}

render(
  <StyleGuide />,
  document.getElementById('root')
);
