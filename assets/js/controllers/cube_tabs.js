define(['./module'], function(controllers) {
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
    }

    // Keep track of last state that generated a cardlist
    var _previous, _cached_cards;

    $scope.GetCards = function() {
      if (_previous) {
        // Do a deep check to see if the states are equal
        var equal = true;
        for (var key in _previous) {
          if (_previous[key] !== $scope.current[key]) {
            equal = false;
            break;
          }
        }

        if (equal) return _cached_cards;
      }

      var my_cards = cube.GetCards($scope.current);

      // Cache cards
      _previous = angular.extend({}, $scope.current);
      _cached_cards = my_cards;

      return my_cards;
    };
  }
});
