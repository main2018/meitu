<template lang="pug">
.video
  video(
    ref="video" 
    preload="true"
    :src="formatSrc" 
    :poster="formatSrc + videoCover"
    @click="video.pause()"
    @mouseenter="mouseEnter"
    )
    //- source src="grass-in-the-wind-sma.mp4" type="video/mp4"
  .video-play(@click="play" v-show="!playing")
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
import { qiniuDomain, postfix, videoCover } from '~/config/qiniu'
import { leftZero } from '~/utils'

export default {
  props: {
    src: {
      type: String,
      default: '1555895161705wewillrockyou%E6%B3%95%E5%9B%BD%E4%BE%9D%E4%BA%91%E7%9F%BF%E6%B3%89%E6%B0%B4%E5%B9%BF%E5%91%8A_%E6%A0%87%E6%B8%85.mp4'
    },
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
      videoCover,

      playing: false,
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
      console.log('mouseDown')
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
      })
      this.video.addEventListener('timeupdate', () => {
        const currentTime = this.video.currentTime
        this.currentTime = currentTime
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

<style lang="stylus" socped>
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
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    // min-width: 100%; 
    width: 100%;
    min-height: 100%; 
    // width: auto;
    height: auto;
    // width: 100%;
    // height: 100%; 
    object-fit: cover;
    // background-color: #000;
    // mix-blend-mode: screen;
    &:fullscreen
      transform translate(0, 0)
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



<!--<template lang="pug">
  div(
    :playsinline="playsinline"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @ready="playerReadied"
    @statechanged="playerStateChanged($event)"
    v-video-player:player="playerOptions"
  )
</template>

<script>
import { qiniuDomain, postfix, videoCover } from '~/config/qiniu'

export default {
  props: {
    src: {
      type: String,
      default: '1555895161705wewillrockyou%E6%B3%95%E5%9B%BD%E4%BE%9D%E4%BA%91%E7%9F%BF%E6%B3%89%E6%B0%B4%E5%B9%BF%E5%91%8A_%E6%A0%87%E6%B8%85.mp4'
    },
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
      // component options
      playsinline: true,

      // videojs options
      playerOptions: {
        width: this.width,
        height: this.height,
        // autoplay: false,
        // preload: 'auto',
        preload: 'meta',
        muted: true, // 必须静音才能执行play，不然报错
        language: 'zh-CN',
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        // fill: true,
        fluid: true,
        sources: [{
          // type: "video/mp4",
          src: qiniuDomain + this.src,
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        controls: true,
        controlBar: {
          // timeDivider: true,
          // durationDisplay: true,
          // currentTimeDisplay: true,
          // fullscreenToggle: true,
          // playbackRateMenuButton: false,
          // volumeControl: false,
          children: [
            'playToggle',
            {name: 'currentTimeDisplay'}, // 当前已播放时间
            'progressControl',
            // {
            //     name: 'timeDivider',
            // },
            {name: 'durationDisplay'}, // 总时间
            {
                name: 'volumePanel',
                inline: false,
            },
            'fullscreenToggle',
          ],
        },
        poster: `${qiniuDomain + this.src + videoCover}`,
      }
    }
  },
  mounted() {
    let timer = null

    if (!this.hoverPlay) return
    this.player.on('mouseenter', function() {
      const paused = this.paused()
      if (paused) {
        this.play()
        timer = setTimeout(() => {
          this.pause()
        }, 5000)
      }
    })
    this.player.controlBar.playToggle.on("click", function () {
      clearTimeout(timer)
    })
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player', player)
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // player.play()
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // console.log('example 01: the player is readied', player)
    }
  }
}
</script>

<style lang="stylus" socped>
.video-js
  overflow-x hidden
  .vjs-big-play-button
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    height 2em
    width 2em
    line-height 2em
    border-radius 1em
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}
.video-js .vjs-time-control{display:block;}
.video-js .vjs-remaining-time{ display: none; }
</style>
