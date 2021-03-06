const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')
const useFrontendMiddleware = require('./middleware/frontendMiddleware')
const clientApi = require('./api/clientApi')
const audioApi = require('./audio/api')
const settingsApi = require('./settings/api')
const resolve = require('path').resolve
const argv = require('minimist')(process.argv.slice(2))

require('./database/db')

const State = require('./State')
const Processor = require('./core/Processor')
const TrafficlightManager = require('./trafficlight/TrafficlightManager')
State.init({}, {}, {})
TrafficlightManager.init({r: 0, y: 0, g: 0}) // TODO load settings?
new Processor().run()

const port = argv.port || process.env.PORT || 3000

const app = express()
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

app.all('/api', function(request, response, next) {
  response.contentType('json')
  response.set('Cache-Control', 'no-cache')
  next()
})

app.use('/api', clientApi)
app.use('/api/audio', audioApi)
app.use('/api/settings', settingsApi)

useFrontendMiddleware(app, {
  outputPath: resolve(process.cwd(), 'public/'),
  publicPath: '/'
})

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`==> 🚦 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
