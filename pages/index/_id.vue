<template lang="pug">
  .page
    articleList(:articles="articles")
</template>

<script>
import articleList from '~/components/article-list'

import { getArticleByCategory } from '~/api/article'

export default {
  // 默认情况下，不会在查询字符串 query 更改时调用(asyncData, fetch, validate, layout, ...等方法),
  // watchQuery: true, // 监听所有query
  // watchQuery: ['query001'], // 监听所有query.query001
  validate ({ params, store }) {
    // 必须是number类型
    // return /^\d+$/.test(params.id)
    const categorys = store.state.categorys
    const routers = categorys.filter(item => !!item.name).map(item => item.route)
    // console.log('routers', routers)
    const id = params.id
    const currentIndex = routers.findIndex(router => router === id)

    store.commit('SET_CURRENT_INDEX', currentIndex)

    return routers.includes(id)
  },
  components: {
    articleList,
  },
  async asyncData({ params }) {
    const category = params.id

    const articles = await getArticleByCategory(category)

    return { articles: articles || [] }

    // try {
    //   // console.log('articles', articles)

    // } catch {
    //   console.log('error')
    //   return { articles: [] }
    // }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    liStyle() {
      return {
        color: this.color,
      }
    },
    lineStyle() {
      const len = this.tabs.length
      return {
        marginLeft: this.currentIndex * this.gap + 'px',
        borderColor: this.borderColor,
        // left: len > 1 ? this.currentIndex * 100 / len + '%' : this.currentIndex * 200 + 'px'
      }
    },
    activeStyle() {
      return {
        color: this.activeColor
      }
    },
    prevData() {
      return this.tabs.slice(0, this.currentIndex).join("")
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
