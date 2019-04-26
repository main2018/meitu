<template lang="pug">
  .container
    .nav-container
      nav.nav
        img.nav-logo(:src="logo" @click="logoClick")
        tabs(:tabs="navs" @change="tabsChange" :value="currentIndex")
        .nav-search
          input(type="text" v-model="keyword")
          .focus-border
          .nav-search-bar
            span.mdi.mdi-magnify.mdi-16px
            span(v-show = '!keyword') 搜索
    <nuxt-child v-bind="{categorys, routers}"/>
    inscribe(v-bind="site")

</template>

<script>
import Logo from '~/components/Logo.vue'
import tabs from '~/components/tabs'
import inscribe from '~/components/inscribe'
import { qiniuDomain } from '~/config/qiniu'

import { getSite } from '~/api/site'
import { routers } from '~/config/router'

export default {
  components: {
    Logo,
    tabs,
    inscribe,
  },
  data() {
    return {
      keyword: '',
    }
  },
  async fetch({ store }) {
    const site = await getSite()
    // console.log('site', site)

    store.commit('SET_SITE', site)
  },
  created() {
  },
  computed: {
    categorys() { return this.$store.state.categorys },
    navs() {
      const tabs = this.categorys.map(item => item.name).filter(item => !!item)
      const routersVals = routers.map(router => Object.values(router)[0])
      return tabs.concat(routersVals)
    },
    routers() {
      const arr = this.categorys.filter(item => !!item.name).map(item => item.route)
      const routersKeys = routers.map(router => Object.keys(router)[0])
      return arr.concat(routersKeys)
    },
    site() { return this.$store.state.site },
    logo() { return qiniuDomain + (this.site.logo || 'Corjqd5PHX.png') },
    currentIndex() { return this.$store.state.currentIndex },
  },
  methods: {
    logoClick() {
      this.$router.push('/')
      this.$store.commit('SET_CURRENT_INDEX', -1)
    },
    tabsChange(index) {
      // const arr = ['', '', '', '', '/aboutUs']

      this.$router.push('/' + this.routers[index])
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  padding-top 12px
  display flex
  height 48px
  line-height 48px
  color #ffffff
  margin: 0 auto
  &-container
    background-color $color-bg
  &-logo
    margin-right 1.5rem
    // height inherit
    // padding: 5px 0;
    height: calc(100% - 10px);
    cursor: pointer;
  .tabs
    margin 0 50px 10px 20px
    flex 1

  &-search
    position relative
    width 9.4rem
    align-self flex-end
    input
      padding .2rem
      width 8rem
      margin-right 1rem
      background none
      border-bottom 1px solid #eee
      color #fff
      outline none
      &:focus ~ .focus-border
        width: calc(100% - 1rem)
        transition: 0.4s
        left: 0
    .focus-border
      position: absolute
      bottom: calc((48px - .2rem * 2 - 18px - 4px) / 2)
      left: 50%
      width: 0
      height: 2px
      background-color: $color-secondary
      transition: 0.4s
    &-bar
      position absolute
      right 1.2rem
      bottom 0
      color #eee
    .mdi
      color #aaa


// @media only screen and (max-width: 1599px) and (min-width: 1024px)
@media only screen and (min-width: 1024px)
  .nav
    width $screen-width-max

</style>
