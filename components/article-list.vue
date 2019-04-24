<template lang='pug'>
  section.article-list
    .article-list-item(v-for="article, index in articles" :key="index")
      articleCard(v-bind="{url: qiniuDomain +  article.img + postfix, title: '标题呀', time: '2019-04-15'}")
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
  justify-content space-between
  flex-wrap wrap
  $gap = 20px
  $row-num = 4
  $w = "calc((100% - (%s - 1) * %s) / %s)" % ($row-num $gap $row-num)
  // left "calc(50% - %s - %s)" % （arrow-a arrow-b） // 多个变量
  $n = $row-num'n'
  &-item
    flex: 0 0 $w
    width $w
    height 200px
    margin-bottom $gap
    // &:not(:nth-child({$n}))
    //   margin-right $gap
</style>
