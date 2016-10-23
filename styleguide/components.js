import ButtonComponent from '../src/button/button.md';
import DropdownComponent from '../src/dropdown/dropdown.md';
import FieldComponent from '../src/form/field.md';
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
      <DropdownComponent />
      <PanelComponent />
      <FieldComponent />
    </div>
  );
}
