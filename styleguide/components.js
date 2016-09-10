import ButtonComponent from '../src/button/button.md';
import HelloWorldComponent from '../src/hello-world/hello-world.md';
import React from 'react';
import TypographyComponent from '../src/base/typography.md';

/**
 * Style Guide Components
 * @returns {JSX} template
 */
export default function Components() {
  return (
    <div className="components">
      <TypographyComponent />
      <HelloWorldComponent />
      <ButtonComponent />
    </div>
  );
}
