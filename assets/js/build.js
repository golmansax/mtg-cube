({
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

  paths: {
    requireLib: '../../bower_components/requirejs/require',
    domReady: '../../bower_components/requirejs-domready/domReady',
    angular: '../../bower_components/angular/angular'
  },

  shim: {
    angular: {
      exports: 'angular'
    }
  },

  name: 'app',
  include: ['requireLib'],
  out: '../../static/assets/app.js',

  deps: ['bootstrap']
})
