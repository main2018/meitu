<template lang="pug">
  .container
    .nav-container
      nav.nav
        img.nav-logo(src="http://meitu.awoo.co/Corjqd5PHX.png")
        tabs(:tabs="['摄影', '设计', '文创', '全案服务', '关于我们']")
        .nav-search
          input(type="text" v-model="keyword")
          .nav-search-bar
            span.mdi.mdi-magnify.mdi-16px
            span(v-show = '!keyword') 搜索
    <el-carousel trigger="click" height="40vw">
      <el-carousel-item v-for="item, index in images" :key="index">
        .background.background-ratio(:style="{backgroundImage: `url(${item.src})`}")
      </el-carousel-item>
    </el-carousel>

</template>

<script>
import Logo from '~/components/Logo.vue'
import tabs from '~/components/tabs'

export default {
  components: {
    Logo,
    tabs
  },
  data() {
    return {
      keyword: '',
      images: [
        {src: 'http://meitu.awoo.co/3g95SjHWb1.jpg', id: '1'},
        {src: 'http://meitu.awoo.co/F4w2hXraSd.jpg', id: '2'},
        {src: 'http://meitu.awoo.co/F4w2hXraSd.jpg', id: '2'},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.nav
  padding-top 12px
  display flex
  height 48px
  line-height 48px
  color #ffffff
  margin: 0 auto
  &-container
    background-color $color-bg
  &-logo
    margin-right 1.5rem
    // height inherit
    padding: 5px;
    height: calc(100% - 10px);
    cursor: pointer;
  .tabs
    margin 0 50px 10px 20px
    flex 1

  &-search
    position relative
    width 9.4rem
    cursor pointer
    align-self flex-end
    input
      padding .2rem
      width 8rem
      margin-right 1rem
      background none
      border-bottom 1px solid #eee
      color #fff
    &-bar
      position absolute
      right 1.2rem
      bottom 0
      color #eee
    .mdi
      color #aaa


@media only screen and (max-width: 1599px) and (min-width: 1024px)
  .nav
    width: 1000px;

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
