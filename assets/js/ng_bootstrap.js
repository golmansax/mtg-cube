require(['domReady!', 'angular', './my_namespace', './app',
  './controllers/index', './services/index'
], NgBootstrap);

function NgBootstrap(document, angular, my_namespace) {
  'use strict';

  angular.bootstrap(document, [my_namespace + '.app']);
}
