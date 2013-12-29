// All paths are relative to js/app/build.js
({
  name: 'app',
  out: '../../static/assets/app.js',

  mainConfigFile: 'main.js',

  // Remove unused files
  removeCombined: true,

  // Keep the out dir (CSS files also live there)
  keepBuildDir: true,

  // Let Compass handle CSS optimizations
  optimizeCss: false,

  // Exclude this build file from out dir
  fileExclusionRegExp: /^\.|build.js/,

  // Allow 'use strict';
  useStrict: true,

  // Wrap all of our modules in a closure
  //wrap: true,

  paths: {
    requireLib: '../../bower_components/requirejs/require'
  },

  // Include RequireJS as part of this build
  include: ['requireLib']
})
