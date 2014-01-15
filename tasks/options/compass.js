(function() {
  'use strict';

  module.exports = {
    dev: {
    },

    prod: {
      options: {
        environment: 'production'
      }
    },

    // Shared options among subtasks
    options: {
      config: 'css/compass.rb'
    }
  };

})();
