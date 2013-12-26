define(['./module'], function(controllers) {
  'use strict';

  controllers.controller('CubeTabsCtrl', [
    '$scope', 'from_server',
    CubeTabsCtrl
  ]);

  return;

  function CubeTabsCtrl($scope, from_server) {
    var _cube_map;
    _InitCubeMap();

    // This keeps track of current page state
    $scope.current = {
      tab: null,
      sort: null
    }

    $scope.SetTab = function(tab) {
      $scope.current.tab = _FormatTabKey(tab);
    };

    $scope.GetCards = function() {
      return _cube_map[$scope.current.tab];
    };

    return;

    // We use this function to sync how the tab is stored in the map
    // Right now all of the tabs are stored in lower case only, to support
    // routing directly to the page.
    function _FormatTabKey(tab) {
      return tab.toLowerCase();
    }

    function _InitCubeMap() {
      _cube_map = {};
      var temp_cube_map = from_server.Get('cube_map');

      for (var tab in temp_cube_map) {
        _cube_map[_FormatTabKey(tab)] = temp_cube_map[tab];
      }
    }
  }
});
