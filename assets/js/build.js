({
  // Has to go down directories because build.js lives in assets/js
  dir: '../../static/assets',

  // Remove unused files
  removeCombined: true,

  // Keep the out dir (CSS files also live there)
  keepBuildDir: true,

  // Let Compass handle CSS optimizations
  optimizeCss: false,

  // Exclude this build file from out dir
  fileExclusionRegExp: /^\.|build.js/,

  paths: {
    requireLib: '../../bower_components/requirejs/require'
  },

  modules: [
    { name: 'app',
      include: 'requireLib'
    }
  ]
})
