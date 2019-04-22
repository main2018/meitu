<template lang="pug">
  .home
    <el-carousel :autoplay="true" :interval="3000" trigger="click" height="40vw">
      <el-carousel-item v-for="item, index in images" :key="index">
        .carousel-item-container
          .background(:style="{backgroundImage: `url(${item.src})`}")
          .carousel-item-info
            .carousel-item-info-content
              .carousel-item-info-title 海南国际旅游岛
              .carousel-item-info-subtitle 2019年4月27日在博鳌亚洲论坛隆重举行
      </el-carousel-item>
    </el-carousel>
    .home-main
      .home-main-header
        .button.round.is-secondary 提供一站式影像视觉解决方案
        |IMAGE VISION & BRAND SERVICE
      .home-main-content
        .home-main-content-header
          el-carousel.home-main-content-header-carousel(
            arrow="never"
            indicator-position="none"
            trigger='click'
            height='300px'
            )
            el-carousel-item(v-for='item, index in images', :key='index')
              .background(:style="{backgroundImage: `url(${item.src})`}")
          .background.home-main-content-header-item(
            v-for='item, index in images'
            :key='index'
            :style='{backgroundImage: `url(${item.src})`}'
            )
          .button.is-secondary.is-plain.round more...
        .home-main-content-video
          .content-title
            |视频作品
            br
            |美图文化拥有专业的航摄能力，全方位视频拍摄及影视制作，为我们的客户提供优质的视频作品

          .content-box
            .content-box-item(v-for="item in 3")
              .content-box-item-video
                .content-box-item-video-bg
                video-player
              .content-box-item-info
                .content-title
                  |视频作品
                  br
                  |美图文化拥有专业的航摄能力，全方位视频拍摄及影视制作，为我们的客户提供优质的视频作品
                  br
                  .button.is-secondary.is-plain.round more...



</template>

<script>
import videoPlayer from '~/components/video'

export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      images: [
        {src: 'http://meitu.awoo.co/3g95SjHWb1.jpg', id: '1'},
        {src: 'http://meitu.awoo.co/F4w2hXraSd.jpg', id: '2'},
        {src: 'http://meitu.awoo.co/3g95SjHWb1.jpg', id: '3'},
        {src: 'http://meitu.awoo.co/F4w2hXraSd.jpg', id: '4'}
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

.home
  &-main
    &-header
      padding 80px 0
      display flex
      flex-direction column
      align-items center
      font-size $font-size-small-s
      font-family sans-serif
      color $font-color-l
      .button
        margin-bottom 10px
        letter-spacing 1em
        font-size $font-size-small
    &-content
      padding 0 20px 100px
      &-header
        margin 0 auto
        display flex
        flex-wrap wrap
        min-width 700px
        width 60vw
        $gap = 1%
        $height = 300px
        &-carousel
          flex 0 0 70%
          width 70%
          .background
            height $height
        &-item
          flex 0 0 ((100% - $gap * 2) / 3)
          height ($height * 0.6)
          margin-top $gap
          &:not(:nth-child(3))
            margin-left $gap
          &:nth-child(2)
            margin-top 0
            width w=(30% - $gap)
            height $height
            flex 0 0 w
        .button
          margin 30px 50%
          transform translateX(-50%)
      .content-title
        margin 50px 0
        text-align center
        font-size $font-size-small-s
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        &:first-line
          font-size $font-size-medium-x
          line-height 2.5
      .content-box
        padding 0 20px
        &-item
          display flex
          align-items center
          $gap = 2%
          &:not(:last-child)
            margin-bottom 50px
          &>*
            flex  0 0 w=((100% - $gap) / 2)
            width w
          &-video
            position relative
            &-bg
              background-stripe()
              position absolute
              left $gap
              top $gap
              width 100%
              height 100%
          &:nth-child(odd)
            // flex-wrap wrap-reverse
            flex-direction row-reverse
            .content-box-item-video-bg
              left auto
              right $gap
              top $gap
            .content-box-item-info
              margin-left 0
              margin-right $gap
              padding-left 0
              padding-right $gap
              text-align right

          &-info
            margin-left $gap
            box-sizing border-box
            padding-left $gap
            font-size $font-size-small-s
            text-align left
            .content-title
              display inline-block
              text-align left
              width (100% - $gap - 20%)
              &:first-line
                font-size $font-size-medium
              .button
                margin-top 30px
</style>
