define([
  'angular', '../../app/my_namespace', '../data/cube_map',
  '../data/js_vars_from_server', 'mocks'
], function(angular, my_namespace, cube_map, js_vars_from_server) {
  'use strict';

  describe('cube service', function() {
    var cube;

    beforeEach(module(my_namespace + '.services'));

    // We need the filters module because we use the format_color filter
    //   in the cube service
    beforeEach(module(my_namespace + '.filters'));

    beforeEach(function() {
      // We need to specify cube_map in JS_VARS_FROM_SERVER
      js_vars_from_server.Set({ cube_map: cube_map });

      inject(function(_cube_) {
        cube = _cube_;
      });
    });

    it('should get no cards for an invalid color', function() {
      expect(cube.GetCards({ color: 'bogus' })).toEqual([]);
    });

    it('should get cards of a single color when specified', function() {
      angular.forEach(cube_map, function(cards, color) {
        expect(cube.GetCards({ color: color })).toEqual(cards);
      });
    });

    // TODO make sure sorting works
  });
});
