define(['./module'], function(filters) {
  'use strict';

  // We use this filter to sync how the color is stored in the map
  // Right now all of the colors are stored in lower case only, to support
  //   routing directly to the page.

  filters.filter('format_color', FormatColorFilter);

  return;

  function FormatColorFilter() {
    return function(color) {
      return color.toLowerCase();
    }
  }
});
