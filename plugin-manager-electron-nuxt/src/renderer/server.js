
const https = require('https')
const fs = require('fs-extra')
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()

// const isProd = process.env.NODE_ENV === 'production '
const port = process.env.PORT || 443
const pkey = fs.readFileSync('./server.key', 'utf8')
const pcert = fs.readFileSync('./server.crt', 'utf8')
const httpsOptions = {
  key: pkey,
  cert: pcert
}
const server = https.createServer(httpsOptions, app)

// We instantiate nuxt.js with the options
const config = require('./nuxt.config')

config.dev = false
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js
app.use(nuxt.render)
// app.get('/', function (req, res) {
//   res.send('Hello world!')
// })
function listen () {
  // Listen the server
  // app.listen(port, '0.0.0.0');
  console.log('listening on port ' + port)
  console.log('https://localhost:' + port)
  server.listen(port)
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
