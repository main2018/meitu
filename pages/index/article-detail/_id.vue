<template lang='pug'>
  section
    gallery(:imgs="article.images || []")
    .article-detail-videos
      .article-detail-videos-item(v-for="video in article.videos")
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

    console.log('id', id)
    const article = await getArticle(id)
    console.log(article)
    return { article: article || {} }
  },
  data() {
    return {
      qiniuDomain,
    }
  },
  methods: {

  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
