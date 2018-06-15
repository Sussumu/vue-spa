const webpack = require('webpack')
const clientConfig = require('./webpack.base.config')

module.exports = function setupDevServer (app) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  const clientCompiler = webpack(clientConfig)

  app.use(require('webpack-dev-middleware')(clientCompiler, {
    stats: {
      colors: true
      // publicPath: clientConfig.output.publicPath
    }
  })
  )

  app.use(require('webpack-hot-middleware')(clientCompiler))
}
