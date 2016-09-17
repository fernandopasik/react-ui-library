import './panel.scss';
import React, { PropTypes } from 'react';
import Children from '../utils/children.js';
import Collapsible from '../collapsible/collapsible.js';

/**
 * Panel
 * @param   {Object} props     - React props
 * @returns    {JSX} template  - Component template
 */
export default function Panel(props) {

  const
    { children, collapsed, id, title } = props,
    grouped = Children.groupByType(children, [ 'header', 'footer' ], 'body');

  if (!title && !grouped.header && !grouped.footer) {
    return <div className="panel panel-body">{ children }</div>;
  }

  return (
    <div className="panel">
      { (title || grouped.header)
        && <div
          aria-controls={ id && `${id}-body` }
          aria-expanded={ !collapsed }
          className="panel-header"
          id={ id && `${id}-title` }
        >
          { title || grouped.header }
        </div>
      }
      <Collapsible collapsed={ collapsed }>
        <div className="panel-content">
          <div
            aria-labelledby={ id && `${id}-title` }
            className="panel-body"
            id={ id && `${id}-body` }
          >
            { grouped.body }
          </div>
          { grouped.footer
            && <div className="panel-footer">{ grouped.footer }</div>
          }
        </div>
      </Collapsible>
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string
};
