<template lang="pug">
  section
    .img-item(v-for="(img, index) in images" :style="genStyleOfItem(img)")
      i(:style="genStyleOfDomI(img)")
      img(
        :alt="index"
        :src="qiniuDomain + (img.url || img.uri)"
        @click="preview(index)"
        )
    .viewer(v-show="isViewrShow")
      .mask(@click="close")
      // .mdi.mdi-36px.mdi-close(@click="close")
      .mdi.mdi-36px.mdi-chevron-left(@click="next(true)")
      .mdi.mdi-36px.mdi-chevron-right(@click="next(false)")
      img.img(:src="currImg.url" :style="getViewrStyle(currImg.radio)")
      .text(v-show="currImg.text") {{currImg.text}}
</template>

<script>
import { qiniuDomain, postfix } from '~/config/qiniu'

async function getRemoteImgsSize (imgs) {
  let images = await Promise.all(
    imgs.map(img => _getSize(img))
  )
  return Promise.resolve(images)
}
function _getSize (img) {
  return new Promise(resolve => {
    let dom = document.createElement('img')
    dom.src = getQiniuUrl(img.url || img.uri)
    dom.onload = () => {
      let { width, height } = dom
      resolve({ ...img, width, height })
    }
    dom.onerror = () => {
      console.log('on error')
    }
  })
}
function getQiniuUrl (fname, isMob) {
  if (!fname) { return '' }
  console.log('qiniuDomain', qiniuDomain)
  const url = `${qiniuDomain}${fname}`
  return url
}


export default {
  props: {
    imgs: { type: Array, default: () => [] }
  },
  data () {
    return {
      qiniuDomain,
      images: [],
      isViewrShow: false,
      currIndex: 0,
      currImg: {
        url: '',
        text: '',
        ratio: 0
      }
    }
  },
  watch: {
    imgs: {
      handler() {
        getRemoteImgsSize(this.imgs)
        .then(images => { this.images = images })
      },
      immediate: true,
    },
    // imgs () {
    //   getRemoteImgsSize(this.imgs)
    //   .then(images => { this.images = images })
    // }
  },
  methods: {
    genStyleOfItem ({width, height}) {
      const flexGrow = width * 250 / height
      width = flexGrow + 'px'
      return [{ width, flexGrow }]
    },
    genStyleOfDomI ({width, height}) {
      const paddingBottom = height / width * 100 + '%'
      return { paddingBottom }
    },
    getViewrStyle (radio) {
      let style = {}
      if (radio <= 1) {
        style.marginTop = '2rem'
        style.height = '75vh'
      } else if (radio < 2.5 && radio > 1) {
        style.height = '45vw'
      } else if (radio >= 2.5) {
        style.marginTop = '20vh'
        style.width = '98vw'
      }
      return style
    },
    preview (index) {
      this.currIndex = index
      this.isViewrShow = true
      const image = this.images[index]
      const { text, width, height, uri, url: path } = image
      const url = qiniuDomain + (path || uri)
      const radio = width / height
      this.currImg = { url, radio, text }
    },
    close () { this.isViewrShow = false },
    next (isLeft) {
      const max = this.images.length - 1
      if (isLeft && this.currIndex === 0) {
        this.currIndex = max + 1
      }
      if (!isLeft && this.currIndex === max) {
        this.currIndex = 0
      } else {
        isLeft ? this.currIndex-- : this.currIndex++
      }
      this.preview(this.currIndex)
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
$mask-bg = rgba(128, 128, 128, 0.9)
section
  padding 2px
  display: flex
  flex-wrap: wrap
  &::after
    content: ''
    flex-grow: 999999999
  .img-item
    position: relative
    flex-grow: 1
    margin: 2px
    background-color: #eee
    i
      display: block
    img
      position: absolute
      top: 0
      width: 100%
      border: 0
      vertical-align: bottom
.viewer
  position fixed
  z-index: 10000;
  width 100vw
  height calc(100vh - 3rem)
  overflow hidden
  top 3.7rem
  left 0
  text-align: center;
  .mask
    position: fixed
    z-index: -1;
    top: 0;
    left 0
    width: 100vw;
    height: 100vh;
    background $mask-bg
    &:before
      content ''
      position fixed
      left 0
      top 0
      width 100vw
      filter bulur(10px)
  .mdi
    position: absolute
    padding .5rem
    width 2rem
    height 2rem
    line-height: 2rem;
    // background-color: rgba(0, 0, 0, 0.5);
    text-align center
    border-radius 50%
    color #fff
    cursor pointer
    transition .4s
    color #fff
    filter opacity(.5)
    &:hover
      transform scale(2)
      filter opacity(1)
  .mdi-close
    top: 0;
    right: 1rem;
  .mdi-chevron-left
    top 35vh
    left 1vw
  .mdi-chevron-right
    top 35vh
    right 1vw
  .img
    border solid 5px #fff;
    background-color: #FFF;
  .text
    position: absolute
    padding .5rem 2vw
    bottom .5rem
    width: 96vw;
    text-align: left;
    font-size .8rem
    color #eee
    background-color: $mask-bg
</style>
