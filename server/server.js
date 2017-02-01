const express = require('express')
const useFrontendMiddleware = require('./middleware/frontendMiddleware')
const resolve = require('path').resolve
const argv = require('minimist')(process.argv.slice(2))

const app = express()

useFrontendMiddleware(app, {
  outputPath: resolve(process.cwd(), 'public/'),
  publicPath: '/'
})

console.log(argv)
const port = argv.port || process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`==> 🚦 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
