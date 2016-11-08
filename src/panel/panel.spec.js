import Panel from './panel.js';
import React from 'react';
import { shallow } from 'enzyme';

describe('Panel', () => {

  it('it\'s a box that wraps content', () => {
    const wrapper = shallow(<Panel>This is content</Panel>);
    expect(wrapper.find('.panel')).to.have.text('This is content');
  });

  it('can have a title prop', () => {
    const wrapper = shallow(<Panel title="Example title">This is content</Panel>);
    expect(wrapper.find('.panel-header')).to.have.length(1);
    expect(wrapper.find('.panel-header')).to.have.text('Example title');
    expect(wrapper.find('.panel-body')).to.have.length(1);
    expect(wrapper.find('.panel.panel-body')).to.have.length(0);
  });

  it('can have html content in header', () => {
    const wrapper = shallow(<Panel><header><h2>Example title</h2></header>This is content</Panel>);
    expect(wrapper.find('.panel-header')).to.have.length(1);
    expect(wrapper.find('.panel-header')).to.have.html().match(/<h2>Example title<\/h2>/);
    expect(wrapper.find('.panel-header')).to.not.have.html().match(/<header>/);
    expect(wrapper.find('.panel-body')).to.have.length(1);
    expect(wrapper.find('.panel-body')).to.have.text('This is content');
    expect(wrapper.find('.panel-footer')).to.have.length(0);
  });

  it('can have html content in footer', () => {
    const wrapper = shallow(<Panel>This is content<footer><button>OK</button></footer></Panel>);
    expect(wrapper.find('.panel-footer')).to.have.length(1);
    expect(wrapper.find('.panel-footer')).to.have.html().match(/<button>OK<\/button>/);
    expect(wrapper.find('.panel-footer')).to.not.have.html().match(/<footer>/);
    expect(wrapper.find('.panel-body')).to.have.length(1);
    expect(wrapper.find('.panel-body')).to.have.text('This is content');
    expect(wrapper.find('.panel-header')).to.have.length(0);
  });

  it('when no footer and header present it\'s just content', () => {
    const wrapper = shallow(<Panel>This is content</Panel>);
    expect(wrapper.find('.panel-header')).to.have.length(0);
    expect(wrapper.find('.panel-footer')).to.have.length(0);
    expect(wrapper.find('.panel.panel-body')).to.have.length(1);
    expect(wrapper.find('.panel.panel-body')).to.have.text('This is content');
  });

  it('if collapsible, add accessibility tags', () => {
    const wrapper = shallow(
      <Panel collapsible id="example"><header><h2>Example title</h2></header>This is content</Panel>
    );
    expect(wrapper.find('.panel-header')).to.have.attr('aria-expanded', 'true');
    expect(wrapper.find('.panel-header')).to.have.attr('aria-controls', 'example-body');
    expect(wrapper.find('.panel-body')).to.have.attr('aria-labelledby', 'example-title');
  });

  it('could be collapsed', () => {
    const wrapper = shallow(
      <Panel collapsed id="example"><header><h2>Example title</h2></header>This is content</Panel>
    );
    expect(wrapper.find('.panel-header')).to.have.attr('aria-expanded', 'false');
    expect(wrapper.find('.panel-header')).to.have.attr('aria-controls', 'example-body');
    expect(wrapper.find('.panel-body')).to.have.attr('aria-labelledby', 'example-title');
  });
});
