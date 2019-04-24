<template lang="pug">
  .base-detail(
    v-if="album"
    @click="hideBar"
    :class="$isPc ? 'pc-detail' : 'mob-detail'"
    )
    .aw-article
      h1.aw-title {{album.title}}
      time.aw-category(v-show="!isSubpage") {{time}}
        span(v-if="album.subcategory")  &nbsp;| {{album.subcategory.subcategory}}
      p.aw-desc {{album.desc}}
    gallery(v-if="$isPc" :imgs="album.images")

    .aw-video(v-if="hasVideo" v-for="video in album.videos")
      video(
        v-if="video.uri"
        controls
        preload="auto"
        :poster="getPoster(video.uri)"
        )
        source(:src="$qiniuUrl(video.uri)")
      video(
        v-if="!video.uri && video.url && /^http/gi.test(video.url)"
        controls
        preload="auto"
        :poster="getPoster(video.uri)"
        )
        source(:src="video.url")
      .video(
        v-if="!video.uri && /^<iframe/gi.test(video.url)"
        v-html="video.url"
        )

    .aw-image(v-if="hasImage && !$isPc" v-for="image in album.images")
      img(:src="$qiniuUrl(image.uri)")
    .aw-link(v-if="hasLink && album.links && album.links.length > 0")
      link-card(:content="album.links")
    .aw-content(v-html="album.article" v-if="hasArticle")
</template>

<script type="text/ecmascript-6">
  import { js } from './base-detail-vue.js'
  export default js.call(this)
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import './base-detail.styl'
</style>
