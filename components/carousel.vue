<template lang='pug'>
  el-carousel(
    ref="carousel"
    :autoplay="autoplay"
    arrow="never"
    :indicator-position="indicatorShow"
    :interval="interval"
    trigger="click"
    :height="height"
    class="carousel-box"
    )
    // indicator-position="none"
    slot
    i.carousel-arrow-left.el-icon-arrow-left(:class="{arrowAutoshow: arrowAutoshow}" :style="{left: arrowGap}" @click="changeCarousel(-1)" v-show="arrowShow")
    i.carousel-arrow-right.el-icon-arrow-right(:class="{arrowAutoshow: arrowAutoshow}" :style="{right: arrowGap}" @click="changeCarousel(1)" v-show="arrowShow")
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      autoplay: {
        type: Boolean,
        default: false,
      },
      interval: {
        type: Number,
        default: 3000,
      },
      height: {
        type: String,
        default: '40vw'
      },
      indicatorShow: {
        type: String,
        default: 'none'
      },
      arrowShow: {
        type: Boolean,
        default: true,
      },
      arrowGap: {
        type: String,
        default: '15%',
      },
      arrowAutoshow: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {

      }
    },
    methods: {
      changeCarousel(num) {
        const api = num === -1 ? 'prev' : 'next'
        this.$refs.carousel[api]()
      },
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.carousel
  &-box
    &:hover
      .carousel-arrow-left
      .carousel-arrow-right
      // & i[class^='carousel-arrow']
        opacity 1
        transform translateY(-50%)
  &-arrow
    $gap = 15%
    &-left
    &-right
      position absolute
      top 50%
      color #fff
      text-shadow 0 0 6px rgba(0,0,0,.8)
      font-size 50px
      z-index 2
      cursor pointer
      &:not(.arrowAutoshow)
        opacity 0
        transform translateY(-50%)
        transition opacity .3s, transform .3s
    &-left
      transform translateY(-50%)
      &:not(.arrowAutoshow)
      // left $gap
        transform translateY(-50%) translateX(-100%)
    &-right
      transform translateY(-50%)
      &:not(.arrowAutoshow)
      // right $gap
        transform translateY(-50%) translateX(100%)
</style>
