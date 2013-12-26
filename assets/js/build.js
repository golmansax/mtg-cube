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

  // Wrap all of our modules in a closure
  wrap: true,

  paths: {
    requireLib: '../../bower_components/requirejs/require',
    domReady: '../../bower_components/requirejs-domready/domReady',
    angular: '../../bower_components/angular/angular',
    bindonce: '../../bower_components/angular-bindonce/bindonce'
  },

  shim: {
    angular: {
      exports: 'angular',
    },
    bindonce: {
      deps: ['angular']
    }
  },

  name: 'app',
  include: ['requireLib'],
  out: '../../static/assets/app.js',

  deps: ['ng_bootstrap']
})
