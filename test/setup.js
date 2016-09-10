import chai from 'chai';
import chaiColors from 'chai-colors';
import chaiEnzyme from 'chai-enzyme';
import chaiSinon from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import { jsdom } from 'jsdom';
import sass from 'node-sass';

// Loads scss files and returns as string the compiled css
require.extensions['.scss'] = function (module, file) {
  // eslint-disable-next-line no-sync
  module.exports = sass.renderSync({ file }).css.toString();
};

const exposedProperties = [ 'window', 'navigator', 'document' ];

global.expect = chai.expect;
chai.should();
chai.use(chaiColors);
chai.use(dirtyChai);
chai.use(chaiSinon);
chai.use(chaiEnzyme());

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = { userAgent: 'node.js' };
