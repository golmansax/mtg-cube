require.config({
  paths: {
    mocks: 'bower_components/angular-mocks/angular-mocks',
  },

  shim: {
    mocks: {
      deps: ['angular']
    }
  }
});
