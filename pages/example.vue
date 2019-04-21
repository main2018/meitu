<template lang="pug">
  .container
    div(
      class="video-player-box"
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
      v-video-player:myVideoPlayer="playerOptions"
    )
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      // component options
      playsinline: true,

      // videojs options
      playerOptions: {
        width: 300,
        height: 200,
        autoplay: false,
        liveui: false,
        // muted: true,
        // language: 'zh-CN',
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          currentTimeDisplay: true,
          fullscreenToggle: true,
          playbackRateMenuButton: false,
          volumeControl: false,
          children: [
            {
                name: 'playToggle'
            },
            {
                name: 'progressControl'
            },
            {
                name: 'currentTimeDisplay'
            },
            {
                name: 'timeDivider',
            },
            {
                name: 'durationDisplay'
            },
            // {
            //     name: 'volumePanel',
            //     inline: false,
            // },
            {
                name: 'fullscreenToggle'
            },
          ]

        },
        // poster: "/static/images/author.jpg",
      }
    }
  },
  mounted() {
    console.log('this is current player instance object', this.myVideoPlayer)
    this.myVideoPlayer.on('mouseenter', function() {
      // this.pause()
      this.play()
      // const paused = this.paused()
      // if (paused) {
      //   console.log(this.play())
      //   this.play()
      // }
    })
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log('player', player)
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

<style>

</style>
