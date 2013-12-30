define([
  '../../app/my_namespace', '../services/cube_mock.js', 'mocks'
], function(my_namespace, cube_mock) {
  'use strict';

  var ctrl_name = 'CubeTabsCtrl';
  describe(ctrl_name, function() {
    var $scope;

    beforeEach(module(my_namespace + '.controllers'));

    beforeEach(inject(function($controller, $rootScope) {
      $scope = $rootScope.$new();

      // Use a mocked version of the cube service
      $controller(ctrl_name, { $scope: $scope, cube: cube_mock });
    }));

    it('should call GetCards once on first try', function() {
      spyOn(cube_mock, 'GetCards');

      $scope.GetCards();
      expect(cube_mock.GetCards).toHaveBeenCalled();
    });

    it('should not call GetCards again if opts don\'t change', function() {
      spyOn(cube_mock, 'GetCards');

      $scope.current = { color: 'White', sort: 'Type' };
      $scope.GetCards();
      $scope.GetCards();

      expect(cube_mock.GetCards.callCount).toBe(1);
    });
  });
});
