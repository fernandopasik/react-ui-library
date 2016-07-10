import chai from 'chai';
import { jsdom } from 'jsdom';

// Sass imports must not be in server-side rendering
require.extensions['.scss'] = function () {
  return;
};

const exposedProperties = [ 'window', 'navigator', 'document' ];

global.expect = chai.expect;
chai.should();

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = { userAgent: 'node.js' };
