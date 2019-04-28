<template lang='pug'>
  .article-card
    .background(:style='{backgroundImage: `url(${url + imageSmall})`}')
    .article-card-mask(@click="maskClick")
      .article-card-mask-title {{title}}
      .article-card-mask-info {{dateDay(time)}}&emsp;|&emsp;{{currentCategory(category)}}

</template>

<script>
import { dateDay } from '~/utils'
import { imageSmall } from '~/config/qiniu'

export default {
props: {
  url: String,
  title: String,
  time: [Number, String],
  id: String,
  category: String,
},
data() {
  return {
    imageSmall,
    dateDay
  };
},
computed: {
  categorys() { return this.$store.state.categorys },
},
methods: {
  currentCategory(category) {
    const currentCategory = this.categorys.find(item => item.category === category)
    return currentCategory && currentCategory.name || '未知专题'
  },
  maskClick() {
    if (!this.id) return
    this.$router.push(`/article-detail/${this.id}`)
  },
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='stylus' scoped>
.article-card
  position relative
  height 100%
  overflow hidden
  .background
    height 100%
  &-mask
    position absolute
    display flex
    flex-direction column
    align-items center
    justify-content center
    left 0
    top 100%
    width 100%
    height 100%
    background-color rgba(255,255,255,.7)
    transition top .5s
    cursor pointer
    &-title
      // line-height 4
      $max-line-clamp = 3
      $line-height = 1.5
      font-size $font-size-large-x
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: $max-line-clamp
      line-height: $line-height
      max-height: "calc(%s * %s * %s)" % ($font-size-large-x $line-height $max-line-clamp)
    &-info
      font-size $font-size-small-s
      color $font-color-l
  &:hover
    .article-card-mask
      top 0
</style>
