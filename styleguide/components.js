import ButtonComponent from '../src/button/button.md';
import FieldComponent from '../src/form/field/field.md';
import HelloWorldComponent from '../src/hello-world/hello-world.md';
import PanelComponent from '../src/panel/panel.md';
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
      <PanelComponent />
      <FieldComponent />
    </div>
  );
}
