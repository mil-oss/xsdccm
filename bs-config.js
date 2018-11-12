module.exports = {
  server: {
      baseDir: './public/xsdccm/',
      middleware: {
          1: require('connect-history-api-fallback')({index: '/index.html', verbose: true})
      }
  }
};