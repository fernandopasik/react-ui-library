import sass from 'node-sass';

// Loads scss files and returns as string the compiled css
require.extensions['.scss'] = function (module, file) {
  // eslint-disable-next-line no-sync
  module.exports = sass.renderSync({ file }).css.toString();
};
