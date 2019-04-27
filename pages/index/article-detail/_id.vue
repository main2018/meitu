<template lang='pug'>
  section.article-detail.page
    gallery(:imgs="getList('images')")
    .article-detail-videos
      .article-detail-videos-item(v-for="video in getList('videos')")
        videoPlayer(:src="video.uri")
    .article-detail-article(v-html="article.article")
</template>

<script type='text/ecmascript-6'>
import gallery from '~/components/gallery'
import videoPlayer from '~/components/video'
import { qiniuDomain, postfix } from '~/config/qiniu'

import { getArticle } from '~/api/article'

export default {
  components: {
    gallery,
    videoPlayer,
  },
  asyncData({ route, redirect }) {
    const id = route.params.id

    let article = null
    return getArticle(id)
      .then(resp => {
        return { article: resp || {} }
      })
      .catch(() => {
        redirect({
          path: '/empty',
          query: { msg: '该文章走丢了' }
        })
      })
    // try {
    //   // article = await getArticle(id)
    //   article = await getArticles()
    //   // console.log('article', article)
    //   return { article: article && article[0] }
    // } catch {
    //   console.log('article error')
    //   redirect({
    //     path: '/empty',
    //     query: { msg: '该文章走丢了' }
    //   })
    // }
  },
  data() {
    return {
      qiniuDomain,
    }
  },
  mounted() {
    if (!this.article) this.$message.error('文章不存在')
    // console.log(this.getList('images'))
  },
  methods: {
    getList(val) {
      if (!val || !this.article) return []
      return this.article[val]
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.article-detail
  &-videos
    display flex
    flex-wrap wrap
    justify-content center
    $gap = 0
    &-item
      padding 2px
      box-sizing border-box
      flex 0 0 ((100% - $gap) / 2)
      &:nth-child(even)
        margin-left $gap
  &-article
    padding 2px
    text-align center
    img
      max-width 100%
</style>
