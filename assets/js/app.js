define(['angular', './my_namespace', 'bindonce'], App);

function App(angular, my_namespace) {
  'use strict';

  return angular.module(my_namespace + '.app', [
    my_namespace + '.controllers',
    my_namespace + '.services',
    'pasvaz.bindonce'
  ]).config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  }]);
}
