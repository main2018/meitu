<template lang='pug'>
  section.about-us
    .about-us-header.follow-nav
      .about-us-title 关于我们
      .about-us-header-content
        pre {{about.introduce}}
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
        img(:src="qiniuDomain + about.map + postfix")

</template>

<script type='text/ecmascript-6'>
import carousel from '~/components/carousel'

import { getAbout } from '~/api/site'
import { routers } from '~/config/router'
import { qiniuDomain, postfix } from '~/config/qiniu'

export default {
  components: {
    carousel,
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
      pre
        width 40%
        white-space pre-wrap
        text-indent 2em
        line-height 2
      img
        margin-left 100px
        max-width 200px
  &-content
    position relative
    padding-bottom 50px
    .background
      height 30vw
      margin-left 10%
      width 80%
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
      font-size $font-size-small-s
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-weight 600
      letter-spacing .2em
      &:first-line
        font-size $font-size-medium-x
        line-height 2.5
      
  &-footer
    padding 20px 0 50px
    &-content
      margin-left $border-width
      display flex
      align-items flex-start
      img
        margin-left 20px
        max-width 250px
      .address
        margin-top 30px
</style>
