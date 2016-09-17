import { Children } from 'react';

export default {

  ...Children,

  /**
   * Filter children by type
   * @param   {object} children - React component children
   * @param {function} filterFn - Array filter callback
   * @returns  {array}          - Filtered children
   */
  filter(children, filterFn) {
    return Children
      .toArray(children)
      .filter(filterFn);
  },

  /**
   * Group children by type and puts in a rest key
   * the types not indicated
   * @param   {object} children - React component children
   * @param {string[]} types    - Array of child types
   * @param   {string} rest     - Object key name where non types will be saved
   * @returns {object}          - Map of the types and rest
   */
  groupByType(children, types, rest) {
    return Children
      .toArray(children)
      .reduce((group, child) => {
        const
          isGrouped = types.includes(child.type),
          addChild = isGrouped ? child.props.children : child,
          key = isGrouped ? child.type : rest;
        return {
          ...group,
          [key]: [ ...(group[key] || []), addChild ]
        };
      }, {});
  }
};
