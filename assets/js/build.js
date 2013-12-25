({
  // Has to go down directories because build.js lives in assets/js
  dir: '../../static/assets',

  // Let's only create the files needed by the app
  skipDirOptimize: true,

  // Keep the out dir (CSS files also live there)
  keepBuildDir: true,

  // Let Compass handle CSS optimizations
  optimizeCss: false,

  paths: {
    //jquery: "some/other/jquery"
  },

  modules: [
    { name: 'app',
    }
  ]
})
