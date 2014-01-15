(function() {
  'use strict';

  module.exports = {
    // Options used by all tasks
    options: {
      jshintrc: true
    },

    src: ['js/app/**/*.js'],
    test: ['js/spec/**/*.js'],
    grunt: ['Gruntfile.js', 'tasks/**/*.js']
  };
})();
