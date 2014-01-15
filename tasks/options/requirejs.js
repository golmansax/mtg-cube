(function() {
  'use strict';

  module.exports = {
    dev: {
      options: {
        optimize: 'none'
      }
    },
    prod: {
      options: {
        // Wrap in a closure if we are in prod
        wrap: true
      }
    },

    // Share options among subtasks
    options: {
      // The following urls are relative to root directory
      mainConfigFile: 'js/app/main.js',
      out: 'static/assets/app.js',

      // Following are relative to the mainConfigFile
      name: 'app',
      paths: {
        requireLib: '../../bower_components/requirejs/require'
      },

      // Include RequireJS as part of this build
      include: ['requireLib'],

      // Remove unused files
      removeCombined: true,

      // Keep the out dir (CSS files also live there)
      keepBuildDir: true,

      // Let Compass handle CSS optimizations
      optimizeCss: false,

      // Allow 'use strict';
      useStrict: true
    }
  };

})();
