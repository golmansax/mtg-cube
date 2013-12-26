var _local_js_vars_from_server = window.JS_VARS_FROM_SERVER || {};
window.JS_VARS_FROM_JSON = 'Surprise, use the Angular service instead!';

define(['./module'], function(services) {
  'use strict';

  services.factory('from_server', function() {
    var from_server = {};

    // We keep track of used vars, because vars from server should not be used
    // more than once
    var _used_vars = {};

    from_server.Get = function(key) {
      if (_used_vars.hasOwnProperty(key)) {
        console.error('Using from_server var more than once (' + key + ')');
        return;
      }

      // Grab the val and delete it from the map
      var val = _local_js_vars_from_server[key];
      delete _local_js_vars_from_server[key];
      _used_vars[key] = true;

      return val;
    };

    return from_server;
  });
});
