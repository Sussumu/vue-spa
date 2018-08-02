const webpack = require('webpack')
const clientConfig = require('./webpack.base.config')
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require('path')

module.exports = function setupDevServer (app, onUpdate) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  const clientCompiler = webpack(clientConfig)

  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      }
    })
  )

  app.use(require('webpack-hot-middleware')(clientCompiler))

  // creates server-side files in memory
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, () => {
    ontimeupdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
