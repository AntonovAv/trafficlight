module.exports = (app) => {

  app.all('/api/', function(request, response, next) {
    response.contentType('json')
    next()
  })

  app.get('/api/builds', function(request, response) {
    response.send(['ODIN', 'DVA', 'THREE_BUILD_ID'])
  })

  return app
}
