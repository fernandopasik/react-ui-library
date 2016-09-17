import React, { PropTypes } from 'react';
import Children from './children.js';
import { shallow } from 'enzyme';

const
  Filtered = props =>
    <div>
      { Children.filter(props.children, item => item.type === 'span') }
    </div>,
  Grouped = props =>
    <div>
      <div className="spans">
        { Children.groupByType(props.children, [ 'span' ], 'rest').span }
      </div>
      <div className="rest">
        { Children.groupByType(props.children, [ 'span' ], 'rest').rest }
      </div>
    </div>;

Filtered.propTypes = Grouped.propTypes = { children: PropTypes.node };

describe('Children', () => {

  it('filter', () => {
    const wrapper = shallow(
      <Filtered>
        <span>1</span>
        <span>2</span>
        <strong>3</strong>
      </Filtered>
    );
    expect(wrapper.find('span')).to.have.length(2);
    expect(wrapper.find('strong')).to.have.length(0);
  });

  it('group by type', () => {
    const wrapper = shallow(
      <Grouped>
        <span><b>1</b></span>
        <span><b>2</b></span>
        <strong>3</strong>
      </Grouped>
    );

    expect(wrapper.find('.spans').find('b')).to.have.length(2);
    expect(wrapper.find('.spans').find('strong')).to.have.length(0);
    expect(wrapper.find('.rest').find('span')).to.have.length(0);
    expect(wrapper.find('.rest').find('strong')).to.have.length(1);
  });
});
