define(['angular', './module'], function(angular, controllers) {
  'use strict';

  controllers.controller('CubeTabsCtrl', [
    '$scope', 'cube',
    CubeTabsCtrl
  ]);

  return;

  function CubeTabsCtrl($scope, cube) {
    // This keeps track of current page state
    $scope.current = {
      color: null,
      sort: null
    };

    // Keep track of last state that generated a cardlist
    var _previous, _cached_cards;

    $scope.GetCards = function() {
      // Do a deep check to see if the current state is same as previous
      if (_previous && angular.equals(_previous, $scope.current)) {
        return _cached_cards;
      }

      var my_cards = cube.GetCards($scope.current);

      // Cache cards
      _previous = angular.extend({}, $scope.current);
      _cached_cards = my_cards;

      return my_cards;
    };
  }
});
