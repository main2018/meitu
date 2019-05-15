<template lang="pug">
  section
    //- .img-item(v-for="(img, index) in images" :style="genStyleOfItem(img)")
    //-   i(:style="genStyleOfDomI(img)")
    //-   img(
    //-     :alt="index"
    //-     :src="img.url || (qiniuDomain + img.uri)"
    //-     @click="preview(index)"
    //-     )
    img(v-for="(img, index) in images" :src="img.url || (qiniuDomain + img.uri)" @click="preview(index)")
    .viewer(v-show="isViewrShow" @click="close")
      .mask
      // .mdi.mdi-36px.mdi-close(@click="close")
      .mdi.mdi-36px.mdi-chevron-left(@click.stop="next(true)")
      .mdi.mdi-36px.mdi-chevron-right(@click.stop="next(false)")
      .viewer-content
        img.img(:src="currImg.url" :style="getViewrStyle(currImg.radio)")
        .text(v-show="currImg.text") {{currImg.text}}
</template>

<script>
import { qiniuDomain, postfix } from '~/config/qiniu'

const isServer = typeof window === 'undefined'

async function getRemoteImgsSize (imgs) {
  let images = await Promise.all(
    imgs.map(img => _getSize(img))
  )
  return Promise.resolve(images)
}
function _getSize (img) {
  return new Promise((resolve, reject) => {
    if (isServer) {
      // console.log('isServer')
      return reject('error')
    }
    let dom = document.createElement('img')
    const src = getQiniuUrl(img.uri)
    dom.src = src
    dom.onload = () => {
      let { width, height } = dom
      resolve({ ...img, width, height })
    }
    dom.onerror = () => {
      reject('error')
    }
  })
}
function getQiniuUrl (fname, isMob) {
  if (!fname) { return '' }
  const url = `${qiniuDomain}${fname}`
  return url
}


export default {
  props: {
    imgHeight: {
      type: Number,
      default: 250,
    },
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
        const loading = this.$loading({ fullscreen: true })
        this.$nextTick(() => {
          getRemoteImgsSize(this.imgs)
            .then(images => {
              this.images = images
            })
            .catch(err => {
              console.log('图片处理失败')
            })
            .finally(() => {
              if (loading) loading.close()
            })
        })
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
      const flexGrow = width * (this.imgHeight || 250) / height
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
        // style.marginTop = '2rem'
        style.height = '75vh'
      } else if (radio < 2.5 && radio > 1) {
        style.height = '45vw'
      } else if (radio >= 2.5) {
        // style.marginTop = '20vh'
        // style.width = '98vw'
        style.width = '85vw'
      }
      return style
    },
    preview (index) {
      this.currIndex = index
      this.isViewrShow = true
      const image = this.images[index]
      const { text, width, height, uri, url: path } = image
      const url = path || (qiniuDomain + uri)
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
  display: flex
  flex-wrap: wrap
  &::after
    content: ''
    flex-grow: 999999999
  &>img
    width 100%
    margin-bottom 20px
  .img-item
    position: relative
    flex-grow: 1
    padding: 2px
    background-color: #eee
    box-sizing border-box
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
  z-index: 10000
  width 100vw
  height 100vh
  overflow hidden
  top 0
  left 0
  text-align: center;
  .mask
    height: 100%
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
    top 50%
    transform translateY(-50%)
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
    z-index 1
    &:hover
      transform translateY(-50%) scale(2)
      filter opacity(1)
  .mdi-chevron-left
    left 1vw
  .mdi-chevron-right
    right 1vw
  &-content
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .img
      border solid 5px #fff
      background-color: #FFF
      &:hover ~ .text
        transform translateY(-100%)
        opacity 1
    .text
      position absolute
      width 100%
      box-sizing border-box
      transition all .3s
      opacity 0
      padding 1rem 2vw
      text-align: left
      font-size .8rem
      color #eee
      background-color rgba(0,0,0,.6)
</style>
