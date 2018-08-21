module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js',
  ],
  swFilePath: './build/service-worker.js',
  templateFilePath: './sw-precache/service-worker.tmpl',
  stripPrefix: 'build/',
  handleFetch: false,
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst',
  }],
  importScripts: [
    './push-listener.js',
  ],
};
