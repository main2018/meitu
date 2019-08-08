<template lang="pug">
// 自动播放，轮播全视频
.video
  video(
    ref="video" 
    preload="true"
    autoplay
    loop
    muted
    :src="formatSrc" 
    :style='loadedmetadata ? {} : {backgroundImage: `url(${formatPoster})`}'
    @click="video.pause()"
    @mouseenter="mouseEnter"
    )
    //- source src="grass-in-the-wind-sma.mp4" type="video/mp4"
  .video-loading(v-if="!loadedmetadata"): loading
  .video-play(v-else @click="play" v-show="!playing")
  .video-control
    .video-control-toggle(
      :class="playing ? 'video-control-pause' : 'video-control-play'"
      @click="toggle"
      )
    .video-control-time-current {{_normalizeTime(currentTime)}}
    .video-control-duration(@click="durationClick")
      .video-control-duration-current(:style="{width: currentTime / duration * 100 + '%'}")
      .video-control-duration-handle(
        :style="{left: currentTime / duration * 100 + '%'}"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
        )
    .video-control-time {{_normalizeTime(duration)}}
    img.video-control-fullscreen(src="~/assets/images/fullscreen.png" @click="videoFullscreen")
</template>

<script>
import loading from './loading'

import { qiniuDomain, postfix, videoCover } from '~/config/qiniu'
import { leftZero } from '~/utils'

export default {
  components: {
    loading,
  },
  props: {
    src: {
      type: String,
      default: '1555895161705wewillrockyou%E6%B3%95%E5%9B%BD%E4%BE%9D%E4%BA%91%E7%9F%BF%E6%B3%89%E6%B0%B4%E5%B9%BF%E5%91%8A_%E6%A0%87%E6%B8%85.mp4'
    },
    poster: String,
    width: {
      type: [String, Number],
      default: 300,
    },
    height: {
      type: [String, Number],
      default: 200,
    },
    hoverPlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      qiniuDomain,

      playing: false,
      loadedmetadata: false,
      duration: 0,
      currentTime: 0,
      timer: null,
    }
  },
  watch: {
  },
  created() {},
  computed: {
    formatSrc() {
      const reg = /^http/
      const isFull = reg.test(this.src)
      return isFull ? this.src : qiniuDomain + this.src
    },
    formatPoster() {
      if (!this.poster) return this.formatSrc + videoCover

      const reg = /^http/
      const isFull = reg.test(this.poster)
      return isFull ? this.poster : qiniuDomain + this.poster
    },
  },
  mounted() {
    this.video = this.$refs.video
    this.watchVideo()
    this.mouse = {}
  },
  methods: {
    mouseEnter() {
      if (!this.hoverPlay) return

      if (!this.playing) {
        this.video.play()
        this.timer = setTimeout(() => {
          this.video.pause()
        }, 5000)
      }
    },
    videoFullscreen() {
      this.fullscreen(this.video)
    },
    fullscreen(element) {
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
      }
    },
    mouseDown() {
      this.mouse.active = true

      this.mouse.startX = event.offsetX

    },
    mouseMove() {
      if (!this.mouse.active) return
      
      this.mouse.endX = event.offsetX

      event.stopPropagation()
      event.preventDefault()

    },
    mouseUp() {
      const w = event.currentTarget.clientWidth
      const time = this.duration * (this.mouse.endX / w)

      this._setTime(currentTime)
    },
    durationClick() {
      const w = event.currentTarget.clientWidth
      const x = event.offsetX

      const currentTime = this.duration * (x / w)
      this._setTime(currentTime)
    },
    play() {
      this.video.play()
      this.playing = true
      clearTimeout(this.timer)
    },
    watchVideo() {
      this.video.addEventListener('loadedmetadata', () => {
        this.loadedmetadata = true
        const duration = this.$refs.video.duration
        this.duration = duration
      })
      this.video.addEventListener('ended', () => {
        this.playing = false
      })
      this.video.addEventListener('play', () => {
        this.playing = true
      })
      this.video.addEventListener('canplay', () => {
        // console.log('oncanplay')
      })
      this.video.addEventListener('pause', () => {
        this.playing = false
      })
      this.video.addEventListener('playing', () => {
        this.loadedmetadata = true
      })
      this.video.addEventListener('timeupdate', () => {
        const currentTime = this.video.currentTime
        this.currentTime = currentTime
      })

      this.video.addEventListener('waiting', () => {
        this.loadedmetadata = false
      })
    },
    toggle() {
      this.playing = !this.playing
      const api = this.playing ? 'play' : 'pause'
      this.video[api]()
      clearTimeout(this.timer)
    },

    _setTime(time) {
      this.video.currentTime = time

      if (!this.playing) this.video.play()
    },
    _normalizeTime(seconds) {

      seconds = Math.round(seconds)

      const minutes = Math.floor(seconds / 60)
      const second = leftZero(seconds % 60)

      return `${minutes}:${second}`
    },
  },
  beforeDestroy() {
    var old_element = this.video
    var new_element = old_element.cloneNode(true)
    old_element.parentNode.replaceChild(new_element, old_element)
  },
}
</script>

<style lang="stylus" scoped>
$ratio = 16 / 9

player(w=50px)
  position relative
  width w
  height w
  color #fff
  border 2px solid
  border-radius 50%
  cursor pointer
  &::before
    content ''
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    border-left: (w / 5) solid;
    border-top: (w / 5 - 2px) solid transparent;
    border-bottom: (w / 5 - 2px) solid transparent;
pause(w=50px, border-w=2px)
  position relative
  width w
  height w
  color #fff
  border border-w solid
  border-radius 50%
  overflow hidden
  cursor pointer
  &::before
  &::after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    display block
    background-color #fff
    width (w / 10)
    height 50%
  &::before
    left 28%
  &::after
    right 28%

.video
  position relative
  width 100%
  // height 100%
  overflow hidden
  &::before
    content ''
    display block
    padding-top (100% / $ratio)
  video
    position: absolute;
    top 0
    left 0
    width 100%
    height 100%
    object-fit: contain;
    background-position center
    background-size cover
    background-color #000
    // mix-blend-mode: screen;
    &:fullscreen
      transform translate(0, 0)
    &::backdrop 
      background-color: #fff;
      background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee);
      background-size: 16px 16px;
      background-position: 0 0, 8px 8px;
  &-loading
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  &-play
    player()
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  &:hover
    .video-control
      transform translateY(0)
    

  &-control
    padding 10px 20px
    position absolute
    left 0
    bottom 0
    width 100%
    display flex
    align-items center
    background-color rgba(0,0,0,.3)
    box-sizing border-box
    color: rgba(255,255,255,.8)
    transform translateY(100%)
    transition transform .3s
    &>*
      box-sizing border-box
    &-play
      player(30px)
    &-pause
      pause(30px)
    &-time
      margin-right 20px
    &-time-current
      margin-left 20px
    &-duration
      margin 0 10px
      position relative
      flex 1
      height h=3px
      background-color rgb(0,31,43)
      cursor pointer
      &-current
        position absolute
        left 0
        top 0
        height 100%
        background-color #fff
        width 50%
      &-handle
        position absolute
        top 50%
        left 0
        transform translate(-50%, -50%)
        width h * 2
        height h * 2
        background-color #fff
        border-radius 50%
        &:hover
          transform translateY(-50%) scale(1.5)
    &-fullscreen
      width w=30px

    
</style>
