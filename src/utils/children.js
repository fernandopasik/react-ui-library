import { Children } from 'react';

export default {
  ...Children,
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
    const group = {};
    Children.forEach(children, child => {
      if (types.includes(child.type)) {
        group[child.type] = group[child.type] || [];
        group[child.type] = group[child.type].concat(child.props.children);
      } else {
        group[rest] = group[rest] || [];
        group[rest] = group[rest].concat(child);
      }
    });
    return group;
  }
};
