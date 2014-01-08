define([
  'angular', '../../app/my_namespace', '../data/js_vars_from_server', 'mocks'
], function(angular, my_namespace, js_vars_from_server) {
  'use strict';

  describe('from_server service', function() {
    var from_server;

    var JS_VARS_FROM_SERVER_MOCK = {
      name: 'Holman',
      foods_enjoyed: ['Chinese', 'almond butter'],
      traits: {
        awesome: true,
        favorite_language: 'OCaml'
      }
    };

    beforeEach(module(my_namespace + '.services'));
    beforeEach(function() {
      // This sets the data that is grabbed by the from_server service
      js_vars_from_server.Set(JS_VARS_FROM_SERVER_MOCK);

      inject(function(_from_server_) {
        from_server = _from_server_;
      });

      // This module throws errors in console so let's spy on it
      spyOn(console, 'error');
    });

    it('should get variables correctly', function() {
      for (var key in JS_VARS_FROM_SERVER_MOCK) {
        expect(from_server.Get(key)).toEqual(JS_VARS_FROM_SERVER_MOCK[key]);
      }

      expect(console.error).not.toHaveBeenCalled();
    });

    it('should throw an error if key invalid', function() {
      from_server.Get('bogus');
      expect(console.error).toHaveBeenCalled();
    });

    it('should throw an error if fetching the same key twice', function() {
      var key = 'name';
      from_server.Get(key);
      from_server.Get(key);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
