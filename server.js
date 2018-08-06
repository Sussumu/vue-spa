const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const serialize = require('serialize-javascript')
const { createBundleRenderer } = require('vue-server-renderer')

let renderer

const indexHtml = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use('/dist', express.static(path.resolve(__dirname, './dist')))

require('./build/dev-server')(app, bundle => {
  renderer = createBundleRenderer(bundle)
})

app.get('*', (req, res) => {
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err)
      return res.status(500).send('Server Error')
  })
  html = indexHtml.replace('{{ APP }}', html)
  html = html.replace('{{ STATE }}', `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
  res.write(indexHtml)
  res.end()
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
