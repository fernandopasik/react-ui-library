import ButtonComponent from '../src/button/button.md';
import FieldComponent from '../src/form/field/field.md';
import HelloWorldComponent from '../src/hello-world/hello-world.md';
import LayoutComponent from '../src/base/layout.md';
import LinkComponent from '../src/base/link.md';
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
      <LinkComponent />
      <LayoutComponent />
      <HelloWorldComponent />
      <ButtonComponent />
      <PanelComponent />
      <FieldComponent />
    </div>
  );
}
