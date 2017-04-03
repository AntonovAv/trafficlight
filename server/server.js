const express = require('express')
const bodyParser = require('body-parser')
const useFrontendMiddleware = require('./middleware/frontendMiddleware')
const useClientApi = require('./api/clientApi')
const resolve = require('path').resolve
const argv = require('minimist')(process.argv.slice(2))
const State = require('./state')
const Processor = require('./core/processor')

State.init({}, {}, {})
new Processor().run()

const port = argv.port || process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

useClientApi(app)

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
