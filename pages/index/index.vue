<template lang="pug">
  .home
    <el-carousel :autoplay="false" trigger="click" height="40vw">
      <el-carousel-item v-for="item, index in images" :key="index">
        .carousel-item-container
          .background(:style="{backgroundImage: `url(${item.src})`}")
          .carousel-item-info
            .carousel-item-info-content
              .carousel-item-info-title 海南国际旅游岛
              .carousel-item-info-subtitle 2019年4月27日在博鳌亚洲论坛隆重举行
      </el-carousel-item>
    </el-carousel>
</template>

<script>

export default {
  data() {
    return {
      images: [
        {src: 'http://meitu.awoo.co/3g95SjHWb1.jpg', id: '1'},
        {src: 'http://meitu.awoo.co/F4w2hXraSd.jpg', id: '2'},
        {src: 'http://meitu.awoo.co/F4w2hXraSd.jpg', id: '2'},
      ],
    }
  },
  computed: {
  },

  methods: {

  }
}
</script>
<style lang="stylus" scoped>

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
.carousel-item-container
  position relative
  .background
    height 40vw
  .carousel-item-info
    padding 10px 20px
    position absolute
    left 0
    bottom 20%
    width 50%
    background-color rgba(0,0,0,.5)
    color #fff
    text-align right
    &-content
      display inline-block
      text-align left
    &-title
      padding-bottom 3px
      display inline-block
      border-bottom 2px solid
      border-color inherit
    &-subtitle
      line-height 2
      font-size $font-size-small
</style>
