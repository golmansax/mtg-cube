module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: [
        'static/assets/**/*.js',
      ],
      options: {
        // Use this for debugging
        keepRunner: true,

        specs: 'js/spec/**/*_spec.js',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: 'js/spec/test_main.js'
        }
      }
    }
  });

  // Load up your plugins
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // register one or more task lists (you should ALWAYS have a "default" task list)
  grunt.registerTask('default', ['jasmine']);
  grunt.registerTask('test', ['jasmine']);
};
