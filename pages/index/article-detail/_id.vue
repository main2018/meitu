<template lang='pug'>
  section.page
    gallery(:imgs="getList('images')")
    .article-detail-videos
      .article-detail-videos-item(v-for="video in getList('videos')")
        videoPlayer(:src="video.url || (qiniuDomain + video.uri)")
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
  async asyncData({ route }) {
    const id = route.params.id

    let article = null
    try {
      article = await getArticle(id)
      // console.log('article', article)
    } catch {
      console.log('article error')
    }
    return { article }
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

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
