(function() {
  require(['domReady!', 'angular', './my_namespace', './app'], NgBootstrap);

  return;

  function NgBootstrap(document, angular, my_namespace) {
    'use strict';

    angular.bootstrap(document, [my_namespace + '.app']);
  }
})();
