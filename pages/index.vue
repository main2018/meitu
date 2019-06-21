<template lang="pug">
  .container
    .nav-container
      nav.nav
        img.nav-logo(:src="logo" @click="logoClick")
        tabs(:tabs="navs" @change="tabsChange" :value="currentIndex")
        search(:datalist="searchRes" @input="search" @change="toArticleDetail")
    <nuxt-child v-bind="{categorys, routers}"/>
    inscribe(v-bind="site")
    backtop

</template>

<script>
import Logo from '~/components/Logo.vue'
import tabs from '~/components/tabs'
import search from '~/components/search'
import inscribe from '~/components/inscribe'
import backtop from '~/components/backtop'
import { qiniuDomain } from '~/config/qiniu'
import { Searcher } from '~/utils'

import { getSite } from '~/api/site'
import { getArticles } from '~/api/article'
import { routers } from '~/config/router'

export default {
  components: {
    Logo,
    tabs,
    search,
    inscribe,
    backtop,
  },
  data() {
    return {
      searchRes: null,
    }
  },
  async asyncData() {
    const articles = await getArticles()

    return { articles: articles || [] }
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
    async search(query) {
      const articles = this.articles || []
      const titles = articles.map(article => article.title)
      const res = Searcher.search(titles, query)
      // const res = articles.filter(article => article.title.includes(query))
      this.searchRes = res.slice(0, 10)
    },
    toArticleDetail(query) {
      const article = this.articles.find(article => article.title === query) || {}
      this.$router.push(`/article-detail/${article && article.id}`)
    },
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
  padding 15px 0
  display flex
  height 48px
  color #ffffff
  margin: 0 auto
  font-size $font-size-small
  &-container
    background-color $color-bg
  &-logo
    margin-right 1.5rem
    // height inherit
    // padding: 5px 0;
    height: 100%
    cursor: pointer;
  .tabs
    margin 0 50px 0 20px
    flex 1

// @media only screen and (max-width: 1599px) and (min-width: 1024px)
@media only screen and (min-width: 1024px)
  .nav
    width $screen-width-max

</style>
