// All paths are relative to js/app/build.js
require.config({
  paths: {
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

  deps: ['ng_bootstrap']
});
