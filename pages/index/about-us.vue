<template lang='pug'>
  section.about-us
    .about-us-header.follow-nav
      .about-us-title 关于我们
      .about-us-header-content
        //- pre {{about.introduce}}
        .introduce(v-html="about.introduce")
        img(:src="qiniuDomain + about.illustrate + postfix")
    .about-us-content.follow-nav
      .about-us-content-title
        |我们的客户
        br
        |OUR CUSTOMERS
      carousel(height="30vw" arrowGap="0" :arrowAutoshow="true")
        el-carousel-item(v-for="item, index in about.images" :key="index")
          .background(:style='{backgroundImage: `url(${qiniuDomain + item + postfix})`}')
    .about-us-footer.follow-nav
      .about-us-title 联系我们
      .about-us-footer-content
        .about-us-footer-content-left
          |{{about.tel}}
          br
          |{{about.email}}

          .address {{about.address}}
        //- img(:src="qiniuDomain + about.map + postfix")
        amap(:location="about.map")
        //- img(:src="generateMapUrl(about.map)")

</template>

<script type='text/ecmascript-6'>
import carousel from '~/components/carousel'
import amap from '~/components/map'

import { getAbout } from '~/api/site'
import { routers } from '~/config/router'
import { qiniuDomain, postfix } from '~/config/qiniu'
import { generateMapUrl } from '~/assets/js/map'

export default {
  components: {
    carousel,
    amap,
  },
  async asyncData({ store, route }) {
    const categorys = store.state.categorys
    const path = route.path.substr(1)
    // const
    const currentIndex = routers.findIndex(router => path === Object.keys(router)[0]) + categorys.length

    store.commit('SET_CURRENT_INDEX', currentIndex)

    const about = await getAbout()

    return { about: about || {} }
  },
  computed: {
  },
  data() {
    return {
      generateMapUrl,
      qiniuDomain,
      postfix,
    }
  },
  methods: {
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.about-us
  $padding-y = 50px
  color $font-color-l
  $border-width = 5px
  font-size $font-size-small
  .follow-nav
    margin 0 auto
    max-width $screen-width-max
  &-title
    margin-bottom 20px
    padding-left 10px
    border-left $border-width solid $color-secondary
    font-size $font-size-large
    line-height 1
  &-header
    padding $padding-y 0
    &-content
      padding 0 0 30px
      display flex
      align-items flex-start
      .introduce
        width 50%
        // white-space pre-wrap
        // text-indent 2em
        line-height 2
      img
        margin-left 100px
        width 300px
  &-content
    position relative
    padding 10px 0 50px
    .background
      height 30vw
      // margin-left 5%
      // width 95%
      background-size: contain;
    &::before
      content ''
      position absolute
      left 50%
      top 0
      transform translateX(-50%)
      z-index 0
      width 100vw
      height 100%
      background-color #f3f3f9
    &-title
      position relative
      z-index 1
      margin 50px 0
      text-align center
      // font-size $font-size-small-s
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      // font-weight 600
      letter-spacing .2em
      &:first-line
        font-size $font-size-large-xx
        line-height 2.5

  &-footer
    padding 20px 0 50px
    &-content
      margin-left $border-width
      display flex
      align-items flex-start
      justify-content space-between;
      img
        margin-top -42px
        margin-left 20px
        float right
      .address
        margin-top 30px

</style>
