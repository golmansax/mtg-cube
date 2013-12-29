define([
  '../../app/my_namespace', 'mocks'
], function(my_namespace) {
  'use strict';

  describe('Cube filters', function() {
    beforeEach(module(my_namespace + '.filters'));

    describe('format_color', FormatColorSpec);

    return;

    function FormatColorSpec() {
      var format_colorFilter;

      beforeEach(inject(function(_format_colorFilter_) {
        format_colorFilter = _format_colorFilter_;
      }));

      it('should turn color into lower case', function() {
        expect(format_colorFilter('Blue')).toBe('blue');
        expect(format_colorFilter('BLACK')).toBe('black');
      });
    }
  });
});
