<template lang='pug'>
  section.article-list
    .article-list-item(v-for="article, index in articles" :key="index")
      articleCard(
        v-bind="{url: qiniuDomain +  article.img + postfix, title: article.title, time: article.time, category: article.category, id: article.id}"
        )
</template>

<script type='text/ecmascript-6'>
import articleCard from '~/components/article-card'
import { qiniuDomain, postfix } from '~/config/qiniu'

export default {
  components: {
    articleCard
  },
  props: {
    articles: Array,
  },
  data() {
    return {
      qiniuDomain,
      postfix,
    }
  },
  methods: {

  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.article-list
  display flex
  // justify-content space-between
  flex-wrap wrap
  $gap = 10px
  $row-num = 4
  $w = "calc((100% - (%s - 1) * %s) / %s)" % ($row-num $gap $row-num)
  // left "calc(50% - %s - %s)" % （arrow-a arrow-b） // 多个变量
  $n = $row-num'n'
  $ratio = 2 / 3
  &-item
    position relative
    flex: 0 0 $w
    width $w
    // height "calc((100% - (%s - 1) * %s) / %s * %s)" % ($row-num $gap $row-num $ratio)
    margin-bottom $gap
    // &:not(:nth-child({$n}))
    &::before
      content ''
      padding-bottom "calc(100% * %s)" % $ratio
      float left
    &::after
      content ''
      display block
      clear both
    &:not(:nth-child(4n))
      margin-right $gap
    .article-card
      position absolute
      width 100%
</style>
