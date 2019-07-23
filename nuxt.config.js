// import pkg from './package'
import { API_URL, isProduction } from './config'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '美图文化',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: pkg.description }
      { hid: 'description', name: 'description', content: '美图文化' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//vjs.zencdn.net/7.3.0/video-js.min.css' },
    ],
    script: [
      // { src: '//vjs.zencdn.net/7.3.0/video.min.js' }
      // <script src="//vjs.zencdn.net/7.3.0/lang/zh-CN.js"></script>
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#fff',
    continuous: true,
  },

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
    // { src: '@/plugins/vue-video-player.js', ssr: false },
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
  },
  server: {
    port: 8095, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  router: { // 配置所有页面渲染后滚动至顶部
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
