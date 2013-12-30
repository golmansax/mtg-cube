define(['./module'], function(services) {
  'use strict';

  services.factory('cube', ['$filter', 'from_server', Cube]);

  return;

  function Cube($filter, from_server) {
    // This service
    var cube = {};

    // Store a map of the cube, from color => array of cards
    // The original data is stored in this format
    var _cube_map;
    _InitCubeMap();

    // Comparision functions used in sorting
    var _CompareFns;
    _InitCompareFns();

    // Returns an array of cards based on the options provided
    // Supported opts:
    //   color
    //   sort - Can be empty
    cube.GetCards = _GetCards;

    return cube;

    function _InitCubeMap() {
      _cube_map = {};
      var temp_cube_map = from_server.Get('cube_map');

      for (var color in temp_cube_map) {
        _cube_map[_FormatColorForMap(color)] = temp_cube_map[color];
      }
    }

    function _InitCompareFns() {
      _CompareFns = {};

      _CompareFns.Default = function(a, b) {
        var cmp = a['generic_type'].localeCompare(b['generic_type']);
        if (cmp != 0) return cmp;
        else if (a['conv_cost'] !== b['conv_cost']) {
          return a['conv_cost'] - b['conv_cost'];
        }
        else if (a['generic_type'] !== 'Land') {
          cmp = a['mana_cost'].localeCompare(b['mana_cost']);
          if (cmp != 0) return cmp;
        }

        return a['name'].localeCompare(b['name']);
      };

      _CompareFns.ManaCost = function(a, b) {
        if (a['conv_cost'] !== b['conv_cost']) {
          return a['conv_cost'] - b['conv_cost'];
        }

        // Return 0 if both lands (we are never comparing lands and others)
        if (a['generic_type'] === 'Land') return 0;
        else return a['mana_cost'].localeCompare(b['mana_cost']);
      };

      _CompareFns.Type = function(a, b) {
        return a['generic_type'].localeCompare(b['generic_type']);
      };

      _CompareFns.Name = function(a, b) {
        return a['name'].localeCompare(b['name']);
      };
    }

    function _GetCards(opts) {
      var cards;

      // First filter by color
      // TODO: don't require this step!
      if (opts.color) {
        var formatted_color = _FormatColorForMap(opts.color);

        // If color does not exist, return an empty array
        if (!_cube_map.hasOwnProperty(formatted_color)) return [];

        cards = _cube_map[formatted_color];
      }

      // Now sort the remaining cards
      cards.sort(_CompareFns[opts.sort] || _CompareFns.Default);
      return cards;
    }

    // We use this function to sync how the color is stored in the map
    // Right now all of the colors are stored in lower case only, to be more
    //   flexible with access.
    function _FormatColorForMap(color) {
      return color.toLowerCase();
    }
  }
});
