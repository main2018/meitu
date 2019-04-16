<template lang="pug">
  .container
    el-carousel(height='150px')
      el-carousel-item(v-for='item in 4', :key='item')
        h3 {{ item }}

    video(
      id="my-player"
      class="video-js"
      controls
      preload="auto"
      poster="//vjs.zencdn.net/v/oceans.png"
      data-setup='{}')
    
      source(src='//vjs.zencdn.net/v/oceans.mp4', type='video/mp4')
      source(src='//vjs.zencdn.net/v/oceans.webm', type='video/webm')
      source(src='//vjs.zencdn.net/v/oceans.ogv', type='video/ogg')
    
      p.vjs-no-js
        a(href='https://videojs.com/html5-video-support/', target='_blank')
</template>

<script>
export default {
  components: {
  },
  mounted() {
    var player = window.videojs('my-player');
  },
}
</script>

<style>

</style>
