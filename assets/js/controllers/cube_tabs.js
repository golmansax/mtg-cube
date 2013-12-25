define(['./module'], function(controllers) {
  'use strict';

  controllers.controller('CubeTabsCtrl', ['$scope', function($scope) {
    $scope.current_tab = 'Default';

    $scope.SetTab = function(tab) {
      $scope.current_tab = tab;
    }
  }]);
});
