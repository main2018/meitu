<template lang="pug">
  .container
    //- video-player
    .bgc
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
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
