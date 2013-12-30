define([
  '../../app/my_namespace', '../data/cube_map', 'mocks'
], function(my_namespace, cube_map) {
  'use strict';

  describe('cube service', function() {
    var cube;

    beforeEach(module(my_namespace + '.services'));

    // We need the filters module because we use the format_color filter
    //   in the cube service
    beforeEach(module(my_namespace + '.filters'));

    beforeEach(function() {
      // We need to specify cube_map in JS_VARS_FROM_SERVER
      window.JS_VARS_FROM_SERVER = {
        cube_map: cube_map
      }

      inject(function(_cube_) {
        cube = _cube_;
      });
    });

    it('should get no cards for an invalid color', function() {
      expect(cube.GetCards({ color: 'bogus' })).toEqual([]);
    });

    it('should get cards of a single color when specified', function() {
      for (var color in cube_map) {
        expect(cube.GetCards({ color: color })).toEqual(cube_map[color]);
      }
    });

    // TODO make sure sorting works
  });
});
