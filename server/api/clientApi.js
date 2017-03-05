const temcityResource = require('../teamcity/resource')
const R = require('ramda')

module.exports = (app) => {
  app.all('/api/', function(request, response, next) {
    response.contentType('json')
    next()
  })

  app.get('/api/buildTypes', function(request, response) {
    temcityResource.getBuildTypes('http://localhost:3001')
      .then((data) => {
        const ids = R.map(({id}) => id, data)
        response.send(ids)
      })
      .catch(console.error)
  })

  return app
}
