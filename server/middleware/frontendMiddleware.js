const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    lazy: false,
    silent: true,
    watchOptions: {
      aggregateTimeout: 1500,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  const hotMiddleware = webpackHotMiddleware(compiler, {
    noInfo: true,
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })

  app.use(devMiddleware)
  app.use(hotMiddleware)
  app.get('*', (req, res) => res.sendFile(path.resolve(compiler.outputPath, 'index.html')))
}

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/'
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build')

  // add favicon
  app.use(favicon(path.join(outputPath, 'favicon.png'), {maxAge: 100}))
  // static files
  app.use(publicPath, express.static(outputPath))

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')))
}

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production'

  if (isProd) {
    addProdMiddlewares(app, options)
  } else {
    const webpackConfig = require(path.resolve(process.cwd(), 'webpack.config.js'))
    addDevMiddlewares(app, webpackConfig(process.env))
  }

  return app
}
