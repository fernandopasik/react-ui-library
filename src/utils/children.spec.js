import React, { cloneElement, PropTypes } from 'react';
import Children from './children.js';
import { shallow } from 'enzyme';

describe('Children', () => {

  it('filter', () => {
    const
      Filtered = props =>
        <div>
          { Children.filter(props.children, item => item.type === 'span') }
        </div>,
      wrapper = shallow(
        <Filtered>
          <span>1</span>
          <span>2</span>
          <strong>3</strong>
        </Filtered>
      );
    Filtered.propTypes = { children: PropTypes.node };

    expect(wrapper.find('span')).to.have.length(2);
    expect(wrapper.find('strong')).to.have.length(0);
  });

  it('group by type', () => {
    const
      Grouped = props =>
        <div>
          <div className="spans">
            { Children.groupByType(props.children, [ 'span' ], 'rest').span }
          </div>
          <div className="rest">
            { Children.groupByType(props.children, [ 'span' ], 'rest').rest }
          </div>
        </div>,
      wrapper = shallow(
        <Grouped>
          <span><b>1</b></span>
          <span><b>2</b></span>
          <strong>3</strong>
        </Grouped>
      );
    Grouped.propTypes = { children: PropTypes.node };

    expect(wrapper.find('.spans').find('b')).to.have.length(2);
    expect(wrapper.find('.spans').find('strong')).to.have.length(0);
    expect(wrapper.find('.rest').find('span')).to.have.length(0);
    expect(wrapper.find('.rest').find('strong')).to.have.length(1);
  });

  it('deep map', () => {
    const
      DeepMapped = props =>
        <div>
          { Children.deepMap(props.children,
            child => child.type === 'b'
              ? cloneElement(child, { ...child.props, className: 'mapped' })
              : child
          ) }
        </div>,
      wrapper = shallow(
        <DeepMapped>
          <b>1</b>
          <b>2</b>
          <span><b>3</b></span>
          <div><div><b>4</b></div></div>
        </DeepMapped>
      );
    DeepMapped.propTypes = { children: PropTypes.node };

    expect(wrapper.find('.mapped')).to.have.length(4);
  });

  it('deep each', () => {
    const
      texts = [],
      DeepForEached = props =>
        <div>
          { Children.deepForEach(props.children, child => {
            if (child.type === 'b') {
              texts.push(child.props.children);
            }
          }) }
        </div>;
    shallow(
      <DeepForEached>
        <b>1</b>
        <b>2</b>
        <span><b>3</b></span>
        <div><div><b>4</b></div></div>
      </DeepForEached>
    );
    DeepForEached.propTypes = { children: PropTypes.node };

    expect(texts).to.eql([ '1', '2', '3', '4' ]);
  });

  it('deep find', () => {
    const
      DeepFound = props =>
        <div>
          { Children.deepFind(props.children, child => child.type === 'i') }
        </div>,
      wrapper = shallow(
        <DeepFound>
          <b>1</b>
          <b>2</b>
          <span><b>3</b></span>
          <i>4</i>
        </DeepFound>
      );
    DeepFound.propTypes = { children: PropTypes.node };

    expect(wrapper.find('i')).to.have.length(1);
    expect(wrapper.find('i')).to.have.text('4');
  });
});
