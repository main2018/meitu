<template lang='pug'>
  .articles.page
    article-list(:articles="articles")
</template>

<script type='text/ecmascript-6'>
import articleList from '~/components/article-list'

import { getArticles } from '~/api/article'

export default {
  components: {
    articleList
  },
  async asyncData() {
    const articles = await getArticles()
    // console.log('articles', articles)

    return { articles: articles || [] }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
