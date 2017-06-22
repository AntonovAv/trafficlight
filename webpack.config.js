const webpack = require('webpack')
const path = require('path')

module.exports = function() {
  const nodeEnv = process.env.NODE_ENV || 'development'
  const isProd = nodeEnv === 'production'

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
    })
  ]

  if (isProd) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    )
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }

  const app = ['./app.js']
  if (!isProd) {
    app.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')
  }

  return {
    devtool: isProd ? 'source-map' : '#cheap-module-source-map',
    context: path.join(__dirname, './client'),
    entry: {
      app
    },
    output: {
      path: path.join(__dirname, './public'),
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1',
            'postcss-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'react-hot-loader',
            'babel-loader'
          ]
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url?prefix=images/&name=[path][name].[hash:base64:5].[ext]&limit=8192'
        }
      ]
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.join(__dirname, './client')
      ],
      extensions: ['.js', '.jsx'],
      alias: {
        'containers': path.join(__dirname, 'client/containers'),
        'components': path.join(__dirname, 'client/components'),
        'actions': path.join(__dirname, 'client/actions'),
        'constants': path.join(__dirname, 'client/actions'),
        'reducers': path.join(__dirname, 'client/actions')
      }
    },
    plugins
  }
}
