define([
  'angular', '../../app/my_namespace', 'mocks'
], function(angular, my_namespace) {
  'use strict';

  describe('common filters', function() {
    beforeEach(module(my_namespace + '.filters'));

    describe('regex_replace', RegexReplaceSpec);

    return;

    function RegexReplaceSpec() {
      var regex_replaceFilter;

      beforeEach(inject(function(_regex_replaceFilter_) {
        regex_replaceFilter = _regex_replaceFilter_;
      }));

      var opts = {
        string: 'ba ba ba, ba ba-rbra ann',
        regex_str: 'ba',
        regex_flags: '',
        new_val: 'foo',
        answer: 'foo ba ba, ba ba-rbra ann'
      };

      it('should work for single replace', function() {
        _RegexReplaceFilterCheck(opts);
      });

      it('should work for global replace', function() {
        // If we make the regex global, all instances should be replaced
        angular.extend(opts, {
          regex_flags: 'g',
          answer: 'foo foo foo, foo foo-rbra ann'
        });
        _RegexReplaceFilterCheck(opts);
      });

      return;

      function _RegexReplaceFilterCheck(opts) {
        expect(regex_replaceFilter(
          opts.string, opts.regex_str, opts.regex_flags, opts.new_val
        )).toBe(opts.answer);
      }
    }
  });
});
