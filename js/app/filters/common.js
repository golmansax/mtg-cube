define(['./module'], function(filters) {
  'use strict';

  filters.filter('regex_replace', RegexReplaceFilter);

  return;

  function RegexReplaceFilter() {
    return function(string, regex_str, regex_flags, new_val) {
      var regex = new RegExp(regex_str, regex_flags);
      return string.replace(regex, new_val);
    };
  }
});
