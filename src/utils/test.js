/**
 * Set a div with id "root" for mounting
 * React components in tests
 * @returns {node} Existing or new "root" node
 */
export function setReactRoot() {

  let root = document.getElementById('root');

  if (root) {
    // Blank the React root element
    root.innerHTML = '';
  } else {
    // Create a new React root
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  return root;
}

/**
 * Get the value of a certain CSS property
 * @param  {element} element - DOM Element to get the css value from
 * @param  {string} property - Property from which the css value is needed
 * @returns {string} CSS value corresponding to the property
 */
export function getCSSValue(element, property) {

  let value;

  /* istanbul ignore if  */
  if (element.currentStyle) {
    value = element.currentStyle[property];
  } else {
    value = window
      .getComputedStyle(element)
      .getPropertyValue(property);
  }

  return value;
}
