<template lang="pug">
  .container
    .nav-container
      nav.nav
        img.nav-logo(:src="logo" @click="$router.push('/')")
        tabs(:tabs="navs" @change="tabsChange" v-model="currentIndex")
        .nav-search
          input(type="text" v-model="keyword")
          .nav-search-bar
            span.mdi.mdi-magnify.mdi-16px
            span(v-show = '!keyword') 搜索
    <nuxt-child v-bind="{categorys, routers}"/>

</template>

<script>
import Logo from '~/components/Logo.vue'
import tabs from '~/components/tabs'
import { qiniuDomain } from '~/config/qiniu'

import { getSite } from '~/api/site'

export default {
  components: {
    Logo,
    tabs
  },
  data() {
    return {
      keyword: '',
      currentIndex: this.$store.state.currentIndex || -1,
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
      tabs.push('关于我们')
      return tabs
    },
    routers() {
      const routers = this.categorys.filter(item => !!item.name).map(item => item.route)
      routers.push('about-us')
      return routers
    },
    site() { return this.$store.state.site },
    logo() { return qiniuDomain + (this.site.logo || 'Corjqd5PHX.png') },
  },
  methods: {
    tabsChange(index) {
      // const arr = ['', '', '', '', '/aboutUs']

      this.$router.push(this.routers[index])
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
    padding: 5px;
    height: calc(100% - 10px);
    cursor: pointer;
  .tabs
    margin 0 50px 10px 20px
    flex 1

  &-search
    position relative
    width 9.4rem
    cursor pointer
    align-self flex-end
    input
      padding .2rem
      width 8rem
      margin-right 1rem
      background none
      border-bottom 1px solid #eee
      color #fff
    &-bar
      position absolute
      right 1.2rem
      bottom 0
      color #eee
    .mdi
      color #aaa


@media only screen and (max-width: 1599px) and (min-width: 1024px)
  .nav
    width: 1000px;

</style>
