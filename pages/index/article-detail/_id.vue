<template lang='pug'>
  section.article-detail.page
    .aw-article
      h1.aw-title {{article.title}}
      time.aw-category(v-show="!isSubpage") {{time}}
        span(v-if="article.subcategory")  &nbsp;| {{article.subcategory.subcategory}}
      p.aw-desc {{article.desc}}
    gallery(:imgHeight="site.imgHeight" :imgs="getList('images')" v-show="article.hasImage")
    .article-detail-videos(v-show="article.hasVideo")
      .article-detail-videos-item(v-for="video in getList('videos')")
        videoPlayer(:src="video.url || (qiniuDomain + video.uri)")
    .article-detail-article(v-html="article.article" v-show="article.hasArticle")
</template>

<script type='text/ecmascript-6'>
import gallery from '~/components/gallery'
import videoPlayer from '~/components/video'
import { qiniuDomain, postfix } from '~/config/qiniu'

import { getArticle } from '~/api/article'
import { dateDay } from '~/utils'

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
  computed: {
    time () {
      if (this.article && this.article.meta) {
        return dateDay(this.article.meta.updatedAt)
      }
      return ''
    },
    categorys() { return this.$store.state.categorys },
    isSubpage () {
      const category = this.article.category.category
      let isSubpage = false
      this.categorys.forEach(item => {
        if (item.category !== category) { return }
        isSubpage = item.isSubpage
      })
      return isSubpage
    },
    site() { return this.$store.state.site },
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
  width 980px
  margin 0 auto
  .aw-article
    padding 45px 0 15px
    .aw-category
      font-size .5rem
      color #888
    .aw-desc
      text-indent 2em
      font-size $font-size-small
      color #888
      line-height 2rem
    .aw-title
      font-size $font-size-large-x
      font-weight 700
  &-videos
    &-item
      margin-bottom: 20px;
  &-article
    padding 2px
    text-align center
    img
      max-width 100%
</style>
