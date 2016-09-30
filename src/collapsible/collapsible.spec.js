import { mount, shallow } from 'enzyme';
import Collapsible from './collapsible.js';
import React from 'react';
import { setReactRoot } from '../utils/test.js';
import sinon from 'sinon';


describe('Collapsible', () => {

  it('it\'s a box that wraps content', () => {
    const wrapper = shallow(<Collapsible><div>Example</div></Collapsible>);
    expect(wrapper.find('.collapsible')).to.have.length(1);
    expect(wrapper.find('.collapsible-content')).to.have.length(1);
    expect(wrapper.find('.collapsible-content')).to.have.text('Example');
  });

  it('when collapsed collapsible height is 0', () => {
    const wrapper = shallow(
      <Collapsible collapsed><div>Example</div></Collapsible>
    );
    expect(wrapper.find('.collapsible')).to.have.attr('style', 'height:0;');
  });

  it('when not collapsed collapsible height is the same as content', () => {
    const
      stub = sinon.stub(Collapsible.prototype, 'getHeight').returns('100px'),
      wrapper = mount(<Collapsible><div>100px</div></Collapsible>,
        { attachTo: setReactRoot() });

    expect(wrapper).to.have.style('height', '100px');
    stub.restore();
  });

  it('when not collapsed and content changes re calculate height', done => {
    const
      stub = sinon.stub(Collapsible.prototype, 'getHeight').returns('100px'),
      wrapper = mount(<Collapsible><div>100px</div></Collapsible>,
        { attachTo: setReactRoot() });
    expect(wrapper).to.have.style('height', '100px');

    // Change content
    stub.returns('200px');
    wrapper.setProps({ children: <div>200px</div> });
    setTimeout(() => {
      expect(wrapper).to.have.style('height', '200px');
      stub.restore();
      done();
    }, 100);
  });
});
