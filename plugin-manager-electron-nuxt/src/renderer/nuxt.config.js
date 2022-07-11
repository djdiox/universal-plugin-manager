const path = require('path')
const fs = require('fs')
/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
require('dotenv').config()
module.exports = {
  ssr: false,
  dev: process.env.NODE_ENV !== 'production',
  target: 'static',
  head: {
    title: 'plugin-manager-electron-nuxt',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: [{ ssr: true, src: '@/plugins/icons.js' }],
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/vuetify', '@nuxtjs/auth-next', '@nuxtjs/axios'],
  router: {
    middleware: ['auth'] // @nuxt/auth module
  },
  https: process.NODE_ENV === 'production',
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'https://localhost:3000',
    '/backend': {
      target: 'https://djdiox.de/',
      pathRewrite: { '^/backend': '/' }
    }
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'private.key'), 'utf-8'),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'certificate.crt'), 'utf-8')
  //   }
  // },
  auth: {
    redirect: {
      callback: '/callback',
      home: '/',
      login: '/login',
      logout: '/'
    },
    localStorage: false,
    strategies: {
      local: false,
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        scope: ['openid', 'profile', 'offline_access'],
        accessType: 'offline',
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: 'S256'
      }
    }
  },
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  }
}
