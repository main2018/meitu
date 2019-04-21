import pkg from './package'
import { API_URL, isProduction } from './config'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//vjs.zencdn.net/7.3.0/video-js.min.css' },
    ],
    script: [
      // { src: '//vjs.zencdn.net/7.3.0/video.min.js' }
      <script src="//vjs.zencdn.net/7.3.0/lang/zh-CN.js"></script>
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/stylus/index.styl',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/vue-video-player.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: API_URL,
      pathRewrite: {
        '^/api' : '/'
      }
    },
  },
  styleResources: {
    // less: './assets/**/*.less',
    stylus: './assets/stylus/global/*.styl',
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
