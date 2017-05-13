import Panel from './panel.js';
import React from 'react';
import { shallow } from 'enzyme';

describe('Panel', () => {

  it('it\'s a box that wraps content', () => {
    const wrapper = shallow(<Panel>This is content</Panel>);
    expect(wrapper.find('.panel')).toHaveText('This is content');
  });

  it('can have a title prop', () => {
    const wrapper = shallow(<Panel title="Example title">This is content</Panel>);
    expect(wrapper.find('.panel-header')).toBePresent();
    expect(wrapper.find('.panel-header')).toHaveText('Example title');
    expect(wrapper.find('.panel-body')).toBePresent();
    expect(wrapper.find('.panel.panel-body')).not.toBePresent();
  });

  it('can have html content in header', () => {
    const wrapper = shallow(<Panel><header><h2>Example title</h2></header>This is content</Panel>);
    expect(wrapper.find('.panel-header')).toBePresent();
    expect(wrapper.find('.panel-header h2')).toBePresent();
    expect(wrapper.find('.panel-header header')).not.toBePresent();
    expect(wrapper.find('.panel-body')).toBePresent();
    expect(wrapper.find('.panel-body')).toHaveText('This is content');
    expect(wrapper.find('.panel-footer')).not.toBePresent();
  });

  it('can have html content in footer', () => {
    const wrapper = shallow(<Panel>This is content<footer><button>OK</button></footer></Panel>);
    expect(wrapper.find('.panel-footer')).toBePresent();
    expect(wrapper.find('.panel-footer button')).toBePresent();
    expect(wrapper.find('.panel-footer footer')).not.toBePresent();
    expect(wrapper.find('.panel-body')).toBePresent();
    expect(wrapper.find('.panel-body')).toHaveText('This is content');
    expect(wrapper.find('.panel-header')).not.toBePresent();
  });

  it('when no footer and header present it\'s just content', () => {
    const wrapper = shallow(<Panel>This is content</Panel>);
    expect(wrapper.find('.panel-header')).not.toBePresent();
    expect(wrapper.find('.panel-footer')).not.toBePresent();
    expect(wrapper.find('.panel.panel-body')).toBePresent();
    expect(wrapper.find('.panel.panel-body')).toHaveText('This is content');
  });

  it('if collapsible, add accessibility tags', () => {
    const wrapper = shallow(
      <Panel collapsible id="example"><header><h2>Example title</h2></header>This is content</Panel>
    );
    expect(wrapper.find('.panel-header')).toMatchSelector('[aria-expanded=true]');
    expect(wrapper.find('.panel-header')).toMatchSelector('[aria-controls="example-body"]');
    expect(wrapper.find('.panel-body')).toMatchSelector('[aria-labelledby="example-title"]');
  });

  it('could be collapsed', () => {
    const wrapper = shallow(
      <Panel collapsed id="example"><header><h2>Example title</h2></header>This is content</Panel>
    );
    expect(wrapper.find('.panel-header')).toMatchSelector('[aria-expanded=false]');
    expect(wrapper.find('.panel-header')).toMatchSelector('[aria-controls="example-body"]');
    expect(wrapper.find('.panel-body')).toMatchSelector('[aria-labelledby="example-title"]');
  });
});
