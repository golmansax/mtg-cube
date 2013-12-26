(function() {
  define([
    'angular', './my_namespace', 'bindonce', './controllers/index',
    './directives/index', './filters/index', './services/index'
  ], App);

  return;

  function App(angular, my_namespace) {
    'use strict';

    return angular.module(my_namespace + '.app', [
      my_namespace + '.directives', my_namespace + '.controllers',
      my_namespace + '.filters', my_namespace + '.services',
      'pasvaz.bindonce'
    ]).config(['$interpolateProvider', function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }]);
  }
})();
