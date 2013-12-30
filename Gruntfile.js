module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: ['static/assets/**/*.js'],
      options: {
        // Use this for debugging
        keepRunner: true,

        specs: 'js/spec/**/*_spec.js',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: 'js/spec/test_main.js'
        }
      }
    },

    jshint: {
      // build.js is not technically a js file
      src: ['Gruntfile.js', 'js/**/*.js', '!js/app/build.js'],

      jshintrc: '.jshintrc'
    }
  });

  // Load up your plugins
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // register one or more task lists (you should ALWAYS have a "default" task list)
  grunt.registerTask('default', ['lint', 'test']);
  grunt.registerTask('test', ['lint', 'jasmine']);
  grunt.registerTask('lint', ['jshint']);
};
