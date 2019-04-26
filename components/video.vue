<template lang="pug">
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
