import Vue from 'vue'
import Video from 'video.js'

const VueVideoPlayer = require('vue-video-player/dist/ssr')
import video_zhCN from 'video.js/dist/lang/zh-CN.json'

// Video.addLanguage('zh-CN', video_zhCN)
Vue.use(VueVideoPlayer)

