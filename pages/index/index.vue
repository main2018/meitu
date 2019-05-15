<template lang="pug">
  .home
    el-carousel(
      ref="carousel"
      :autoplay="false"
      arrow="never"
      :indicator-position="commends > 1 ? '' : 'none'"
      :interval="3000"
      trigger="click"
      height="40vw"
      class="carousel-box"
      )
      // indicator-position="none"
      el-carousel-item(v-for="item, index in commends" :key="item.id")
        .carousel-item-container(@click="$router.push(`/article-detail/${item.id}`)")
          .background(:style="{backgroundImage: `url(${qiniuDomain + item.img + postfix})`}")
          .carousel-item-info
            .carousel-item-info-content
              .carousel-item-info-title {{item.title}}
              .carousel-item-info-subtitle(:title="item.desc") {{item.desc}}
      i.carousel-arrow-left.el-icon-arrow-left(@click="changeCarousel(-1)" v-show="commends.length > 1")
      i.carousel-arrow-right.el-icon-arrow-right(@click="changeCarousel(1)" v-show="commends.length > 1")
    .home-main
      .home-main-header
        .button.round.is-secondary 提供一站式影像视觉解决方案
        |IMAGE VISION & BRAND SERVICE
      .home-main-content
        .home-main-content-header
          el-carousel.home-main-content-header-carousel(
            :autoplay="true"
            arrow="never"
            indicator-position="none"
            trigger='click'
            :height='`${CONTENT_HEAD_HEIGHT * 0.6}px`'
            )
            el-carousel-item(v-for='item, index in imagesSliders[0].images', :key='index')
              .background
                articleCard(
                  v-bind="{url: qiniuDomain + item.uri, title: imagesSliders[0].title, time: imagesSliders[0].time, category: imagesSliders[0].category, id: String(imagesSliders[0].id)}"
                  )
          .background.home-main-content-header-item(
            v-for='item, index in imagesTops'
            :key='index'
            )
            articleCard(v-bind="{url: qiniuDomain + item.img + postfix, title: item.title, time: item.time, category: item.category, id: item.id}")
          el-carousel.home-main-content-header-item(
            :autoplay="true"
            arrow="never"
            indicator-position="none"
            trigger='click'
            :height="`${300 * 0.6}px`"
            )
            el-carousel-item(v-for='item, index in imagesSliders[1].images', :key='index')
              articleCard(v-bind="{url: qiniuDomain + item.uri + postfix, title: imagesSliders[1].title, time: imagesSliders[1].time, category: imagesSliders[1].category, id: String(imagesSliders[1].id)}")
          .button.is-link.is-secondary.is-plain.round(@click="$router.push('/articles')") more...
        .home-main-content-video
          .content-title
            |视频作品
            br
            |美图文化拥有专业的航摄能力，全方位视频拍摄及影视制作，为我们的客户提供优质的视频作品

          .content-box
            .content-box-item(v-for="video in videoTops")
              .content-box-item-video
                .content-box-item-video-bg
                video-player(:src="video && video.video" :hoverPlay="true")
              .content-box-item-info
                .content-title
                  .content-title-title {{video.title}}
                  br
                  |{{video.desc}}
                  br
                  .button.is-link.is-secondary.is-plain.round(@click="moreVideoClick(video)") more...
        .home-main-content-footer
          .content-title
            |内容策划与生产
            br
            |CONTENT PLANNING & PRODUCTION
          .content-main
            .content-main-header
              .content-main-header-item(
                v-for=" item, index in footers"
                )
                img(:src="require(`~/assets/images/bottom${index + 1}.png`)")
                .title {{item.title}}
                pre
                  span(v-for="text in item.desc") {{text}}
                    br
            .content-main-content
              .content-main-content-item(
                v-for="item in contentTops"
                @click="$router.push(`/article-detail/${item.id}`)"
                )
                .cover: .background(:style='{backgroundImage: `url(${qiniuDomain + item.img + postfix})`}')
                .title {{item.title}}
                pre
                  |{{item.desc}}用专业的态度和技术用专业的态度和技术用专业的态度和技术



</template>

<script>
import videoPlayer from '~/components/video'
import articleCard from '~/components/article-card'
import { qiniuDomain, postfix } from '~/config/qiniu'

import { getArticles } from '~/api/article'

const RADIO = 1.6 / 1
const CONTENT_HEAD_WIDTH = 980
const CONTENT_HEAD_HEIGHT = CONTENT_HEAD_WIDTH / RADIO

export default {
  components: {
    videoPlayer,
    articleCard,
  },
  async asyncData() {
    const articles = await getArticles()
    // console.log('articles', articles)

    return { articles: articles || [] }
  },
  data() {
    return {
      CONTENT_HEAD_HEIGHT,
      postfix,
      qiniuDomain,
      videos: [
        '1555895161705wewillrockyou%E6%B3%95%E5%9B%BD%E4%BE%9D%E4%BA%91%E7%9F%BF%E6%B3%89%E6%B0%B4%E5%B9%BF%E5%91%8A_%E6%A0%87%E6%B8%85.mp4',
        '1556163043403test.mp4',
        // 'http://img.tukeshare.com/%E7%8B%AE%E8%B7%AF%E6%88%88%E9%80%94__%E4%B8%BA%E7%88%B1%E5%89%8D%E8%A1%8C2.mp4',
        // 'http://img.tukeshare.com/%E7%8B%AE%E8%B7%AF%E6%88%88%E9%80%94%E8%A5%BF%E8%A1%8C%E7%AC%AC%E5%9B%9B%E7%8B%AE.mp4',
      ],
      images: [
        {img: '3g95SjHWb1.jpg', title: '标题', desc: '描述描述描述', category: 'test', time: '2019-04-15', id: '1'},
        {img: 'F4w2hXraSd.jpg', title: '标题', desc: '描述描述描述', category: 'test', time: '2019-04-15', id: '2'},
        {img: '3g95SjHWb1.jpg', title: '标题', desc: '描述描述描述', category: 'test', time: '2019-04-15', id: '3'}
      ],
      footers: [
        {
          title: '专业&高品质',
          desc: [
            '用专业的态度和技术，',
            '通过高品质、专业化的全媒体解决方案',
            '为客户提升品牌价值',
          ]
        },
        {
          title: '落地&执行',
          desc: [
            '为企业提供包括',
            '创意，设计，活动策划',
            '新闻内容策划、图文稿件撰写、发布，',
            '多媒体新闻视频拍摄、制作，',
            '活动方案的落地与执行',
          ]
        },
        {
          title: '整合&创新',
          desc: [
            '为企业做到',
            '全媒体融合、立体化展示、服务创新的',
            '内容策划与生产',
          ]
        },
      ],
    }
  },
  computed: {
    commends() {
      const commends = this._normalizeArticles('isCommend')
      // console.log('commends', commends)
      // return commends.length > 1 ? commends : this.images
      return commends.length ? commends : this.images
    },
    imagesTops() {
      const imagesTops = this._normalizeArticles('isImageTop')
      return imagesTops.length >= 3 ? imagesTops : imagesTops.concat(this.images).splice(0, 3)
    },
    imagesSliders() {
      const imagesSliders = this._normalizeArticles('isSliderTop')
      const resultArr = [...imagesSliders]
      resultArr.length = 2
      const obj = Object.assign({}, this.images[0], {
        images: this.images.map((image, index) => ({
          order: index,
          text: '图片配图',
          uri: image.img,
          url: '',
        }))
      })
      return resultArr.fill(obj, imagesSliders.length, 2)
    },
    videoTops() {
      const videoTops = this._normalizeArticles('isVideoTop')
      const resultArr = [...videoTops]
      resultArr.length = 2
      const obj = Object.assign({}, this.images[0], {
        video: this.videos[0]
      })
      return resultArr.fill(obj, videoTops.length, 2)
    },
    contentTops() {
      const contentTops = this._normalizeArticles('isContentTop')
      return contentTops.concat(this.images).splice(0, 3)
    },
    categorys() { return this.$store.state.categorys },
  },

  methods: {
    moreVideoClick(obj) {
      const category = obj && obj.category
      const currentCategory = this.categorys.find(item => item.category === category) || {}
      const route = currentCategory.route || 'Movies'

      this.$router.push(`/${route}`)
    },
    changeCarousel(num) {
      const api = num === -1 ? 'prev' : 'next'
      this.$refs.carousel[api]()
    },
    _normalizeArticles(type) {
      if (!this.articles) return []
      return this.articles.filter(article => article[type])
    },
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
      transform translateY(-50%)
      color rgba(255,255,255,.8)
      text-shadow 0 0 6px rgba(0,0,0,.8)
      font-size 40px
      z-index 2
      opacity 0
      transition opacity .3s, transform .3s
      cursor pointer
      &:hover
        transform translateY(-50%) scale(1.3)!important
        color rgba(255,255,255,1)
    &-left
      left $gap
      transform translateY(-50%) translateX(-100%)
    &-right
      right $gap
      transform translateY(-50%) translateX(100%)
.carousel-item-container
  position relative
  cursor pointer
  .background
    height 40vw
  .carousel-item-info
    padding 10px 20px
    position absolute
    z-index 2
    left 0
    bottom 20%
    width 50%
    // background-stripe(rgba(0,0,0,.5), rgba(128, 132, 130, .5))
    // background-stripe(rgba(0,0,0,.5), rgba(132,132,132,1))
    color #fff
    text-align right
    &::before
      content ''
      all inherit
      background-image url('~assets/images/oblique_line.png')
      background-size auto 100%
      width 100%
      height 100%
      box-sizing border-box
      bottom 0
      z-index -1
      opacity 0.67

    &-content
      display inline-block
      text-align left
      width ($screen-width-max / 2)
      font-size $font-size-medium
    &-title
      padding-bottom 3px
      display inline-block
      border-bottom 2px solid
      border-color inherit
    &-subtitle
      line-height 2
      font-size $font-size-small
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

.home
  background #f6f7ff
  color $font-color-l
  &-main
    &-header
      padding 80px 0
      display flex
      flex-direction column
      align-items center
      font-size $font-size-small-s
      font-family sans-serif
      color $font-color-l
      background-color #fff
      font-weight 600
      .button
        padding 0 50px
        margin-bottom 10px
        letter-spacing 5px
        font-size $font-size
        font-weight 200
    &-content
      $content-padding = 20px
      padding 20px $content-padding 100px
      &-header
        $ratio = 1.6 / 1

        margin 0 auto
        display flex
        flex-wrap wrap
        width 980px
        height (@width/$ratio)
        $gap = 1%
        $height = 300px
        &-carousel
          flex 0 0 70%
          width 70%
          .background
            height (@width/$ratio)
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
          margin 30px 50% 0
          transform translateX(-50%)
          font-size: $font-size-small-s
      .content-title
        margin 80px 0 80px
        text-align center
        // font-size $font-size-small
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        &:first-line
          font-size $font-size-large-xx
          line-height 2.5
          letter-spacing 5px
      &-footer
        margin 0 auto
        min-width 700px
        width 60vw
        .content-main
          &-header
            display flex
            justify-content center
            &-item
              flex 1
              text-align center
              img
                width 150px
                // max-width 400px
                border-radius 50%
              .title
                margin-bottom 20px
                position relative
                line-height 3
                font-size $font-size-medium-x
                color #378280
                font-weight 600
                &::after
                  content ''
                  position absolute
                  left 50%
                  bottom 0
                  transform translateX(-50%)
                  width 30px
                  border-bottom 3px solid
              pre
                font-size $font-size-small-s
          &-content
            margin-top 50px
            display flex
            &-item
              padding 10px 10px 50px
              flex 1
              overflow hidden
              border 1px solid #ccc
              border-radius 5px
              background-color #fff
              font-size $font-size-small-s
              &:not(:last-child)
                margin-right 2%
              .cover
                position relative
                overflow hidden
                padding-top 60%
                margin-bottom 30px
                background-color #ccc
              .background
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                transition transform .3s
                &:hover
                  transform scale(1.2)
              .title
                line-height 2
                font-size $font-size-medium
                font-weight 600
              pre
                padding-top 10px
                margin-right calc(1 / 3 * 100%)
                overflow hidden
                text-overflow ellipsis
                white-space pre-wrap
                border-top 1px solid #ccc
      .content-box
        padding 0 20px
        // width calc(100vw - 20px * 2)
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
          &:nth-child(even)
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
            font-size $font-size
            text-align left
            .content-title
              display inline-block
              line-height 2
              text-align left
              width (100% - $gap - 20%)
              &-title
                padding-right 20px
                display inline-block
                font-size $font-size-medium-x
                font-weight bold
                border-bottom 1px solid
                line-height 2.5
              .button
                font-size $font-size-small-s
                margin-top 30px

// @media only screen and (min-width: 1024px)
//   .home-main-content-header
//     width $screen-width-max
</style>
