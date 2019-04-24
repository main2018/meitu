<template lang="pug">
  .pc-inscribe-fluid
    .pc-inscribe
      .wrapper(:class="thinLine")
        .contact
          .line
          .title 联系我们
          .text TEL: {{tel}}
          .text E-MAIL: {{email}}
        // .qrcode
          span.ch-zn 微信公众号:
          span &nbsp;
          img(src="qrcode")
        .wechat-content
          .wechat
            img(src="~/assets/images/icon-wechat.gif")
            .wechat-text @foto2.cn
            .wechat-note on wechat
          .tips
            img(src="~/assets/images/qrcode.png")
    .copyright
      span.text Copyright© Hainan Meitu Culture Communication Co,.Ltd. All RightSReserved
</template>

<script>
// import { js } from './inscribe-vue.js'
// export default js.call(this)
export { default } from './inscribe-vue.js'

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './inscribe.styl'
.pc-inscribe-fluid
  width 100vw
  background #333
.pc-inscribe
  margin 0 auto
  color #fff
@media only screen and (min-width:1600px)
  .pc-inscribe
    width 1200px
@media only screen and (min-width:1024px) and (max-width: 1599px)
  .pc-inscribe
    width 1000px
</style>
