require(['domReady!', 'angular', './app', './controllers/index',
], function(document, angular) {
  'use strict';

  angular.bootstrap(document, ['cube.app']);
});
