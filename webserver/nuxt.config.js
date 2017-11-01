// const vuxLoader = require('vux-loader')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'http://lib.baomitu.com/material-design-icons/3.0.1/iconfont/material-icons.css' }
    ]
  },

  loading: { color: '#3B8070' },
  // build: {
  //   /*
  //    ** Run ESLINT on save  关掉了eslint
  //    */
  //   extend (config, ctx) {
  //     if (ctx.dev && ctx.isClient) {
  //       // config.module.rules.push({
  //       //   enforce: 'pre',
  //       //   test: /\.(js|vue)$/,
  //       //   loader: 'eslint-loader',
  //       //   exclude: /(node_modules)/
  //       // })
  //     }
  //     vuxLoader.merge(config, {
  //       // options: {
  //       //   isWebpack2: true
  //       // },

  //       plugins: ['vux-ui']
  //     })
  //   }
  // },
  plugins: ['~plugins/vuetify'],

    /*
    ** Global CSS
    */
  css: [ '~/static/style/app.styl' ],
    /*
    ** Customize the progress-bar color
    */
  build: {
    vendor: ['vuetify'],
    extractCSS: true
  }
}
