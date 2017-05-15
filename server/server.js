const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const useFrontendMiddleware = require('./middleware/frontendMiddleware')
const useClientApi = require('./api/clientApi')
const useAudioApi = require('./audio/api')
const resolve = require('path').resolve
const argv = require('minimist')(process.argv.slice(2))

require('./database/db')

const State = require('./State')
const Processor = require('./core/Processor')
State.init({}, {}, {})
new Processor().run()

const port = argv.port || process.env.PORT || 3000

const app = express()
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

useClientApi(app)
useAudioApi(app)

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
