import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const exposedProperties = [ 'window', 'navigator', 'document' ];

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = { userAgent: 'node.js' };

global.HTMLElement = global.window.HTMLElement;
