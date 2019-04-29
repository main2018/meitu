<template lang="pug">
  .container
    //- video-player
    .bgc
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div id="box">
      <video id="trialvid" class="video-js vjs-default-skin vjs-16-9" controls preload="auto" width="auto" height="auto" poster="http://meitu.awoo.co/1555895161705wewillrockyou%E6%B3%95%E5%9B%BD%E4%BE%9D%E4%BA%91%E7%9F%BF%E6%B3%89%E6%B0%B4%E5%B9%BF%E5%91%8A_%E6%A0%87%E6%B8%85.mp4?vframe/jpg/offset/1" >
        <source src="http://meitu.awoo.co/1555895161705wewillrockyou%E6%B3%95%E5%9B%BD%E4%BE%9D%E4%BA%91%E7%9F%BF%E6%B3%89%E6%B0%B4%E5%B9%BF%E5%91%8A_%E6%A0%87%E6%B8%85.mp4" type='video/mp4' />
      </video>
    </div>
</template>

<script>
import videoPlayer from '~/components/video'

export default {
  components: {
    videoPlayer
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="stylus" socped>
.bgc
  width w = 200px
  height w
  background-stripe()
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
