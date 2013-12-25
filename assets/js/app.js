define(['angular'], function(angular) {
  'use strict';

  return angular.module('cube.app', [
    'cube.controllers',
  ]).config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  }]);
});
