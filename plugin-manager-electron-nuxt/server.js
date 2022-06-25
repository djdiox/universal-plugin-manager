const { Nuxt, Builder } = require('nuxt ')
const app = require('express ')()
const http = require('http ')
const https = require('https ')
const fs = require('fs ')

let server

const isProd = process.env.NODE_ENV === 'production '
const port = process.env.PORT || 3000

// Prepare for HTTP or HTTPS
if (process.env.NODE_ENV !== 'production ') {
  const pkey = fs.readFileSync('./key.pem ')
  const pcert = fs.readFileSync('./cert.pem ')
  const httpsOptions = {
    key: pkey,
    cert: pcert
  }
  server = https.createServer(httpsOptions, app)
} else {
  server = http.createServer(app)
}

// We instantiate nuxt.js with the options
const config = require('./nuxt.config.js ')

config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js
app.use(nuxt.render)

function listen () {
  // Listen the server
  // app.listen(port, '0.0.0.0');
  server.listen(port, 'localhost ')
}

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt)
    .build()
    .then(listen)
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
} else {
  listen()
}
