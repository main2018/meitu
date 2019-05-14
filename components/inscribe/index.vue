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
            .wechat-box
              img.wechat-box-wechat(src="~/assets/images/icon-wechat.gif")
              img.wechat-box-qrcode(src="~/assets/images/qrcode.jpeg")
            .wechat-text @foto2.cn
            .wechat-note on wechat

    .copyright
      span.text Copyright © Hainan Meitu Culture Communication Co,.Ltd. All RightSReserved
      a(href="http://www.beian.miit.gov.cn" style="color: #666;" target="_blank") &emsp;琼ICP备10200620号-1
</template>

<script>
// import { js } from './inscribe-vue.js'
// export default js.call(this)
export { default } from './inscribe-vue.js'

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './inscribe.styl'
.pc-inscribe-fluid
  // width 100vw
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
