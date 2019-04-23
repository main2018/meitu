<template lang='pug'>
  <div>
    <button id="btn" @click="loadResouce" v-show=false>Open PhotoSwipe</button>
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe. It's a separate element, as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
        <div class="pswp__container">
          <!-- don't modify these 3 pswp__item elements, data is added later on -->
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
  
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <button class="pswp__button pswp__button--download " title="download "></button>
            <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div> 
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>

        </div>

      </div>
    
    </div>
  </div>
  
</template>

<script>
  export default {
    name: '',
    head() {
      return {
        // link: [
        //   { rel: 'stylesheet', type: 'text/css', href: '/photoswipe/default-skin.css' },
        //   { rel: 'stylesheet', type: 'text/css', href: '/photoswipe/photoswipe.css' }
        // ]
      }
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      items: {
        trpe: Array,
        required: true
      }
    },
    data () {
      return {
        gallery: null,
        currentIndex: -1
      }
    },
    mounted() {
      // this.init()
      this.$nextTick(this.loadResouce)
    },
    watch: {
      items(list) {
        if (!this.gallery) return
        // this.gallery.destroy()
        if (list) this.init()
      }
    },
    methods: {
      checkSize(w, h) {
        if (!w || !h) return [0, 0]
        const [maxW, maxH] = [2000, 1500]
        let [width, height] = [w, h]
        if (width > maxW || height > maxH) {
          if (width / height > maxW / maxH) {
            width = maxW
            height = Math.round(maxW * (h / w))
          } else {
            height = maxH
            width = Math.round(maxH * (w / h))
          }
        }
        return [width, height]
      },
      loadResouce() {
        /*eslint-disable */
        require([
          './photoswipe.js',
          './photoswipe-ui-default.js'
        ], (PhotoSwipe, PhotoSwipeUI_Default) => {
          window.PhotoSwipe = PhotoSwipe.PhotoSwipe
          window.PhotoSwipeUI_Default = PhotoSwipeUI_Default.PhotoSwipeUI_Default
          this.init()
        })
        /*eslint-endable */
      },
      init() {
        var pswpElement = document.querySelector('.pswp')
        // build items array
        var items = this.items.map(url => {
          return {
            src: url,
            w: 0,
            h: 0,
            downloadURL: (url || '').split('?')[0]
          }
        })

        var options = {
          index: this.index,
          escKey: false, // ESC键盘键关闭光影
          loop: true, // 设置为true您，则可以从最后一张图片滑动到第一张图片
          tapToClose: false, // tap区域点击关闭画廊
          tapToToggleControls: true, // 允许切换controls的状态，显示隐藏
          history: false,
          focus: false,
          captionEl: false,
          shareEl: false,
          showAnimationDuration: 0,
          hideAnimationDuration: 0,
          showHideOpacity: true,
          bgOpacity: 0
        }

        // eslint-disable-next-line
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
        gallery.listen('imageLoadComplete', (index, item) => {
          if (!item.w && !item.h) {
            if (!item.container) return
            let img = item.container.children[1]
            const {naturalWidth, naturalHeight} = img || {}
            const [w, h] = this.checkSize(naturalWidth, naturalHeight)
            // item.w = img.naturalWidth
            // item.h = img.naturalHeight
            // console.log(naturalWidth, naturalHeight)
            item.w = w
            item.h = h
            gallery.invalidateCurrItems()
            gallery.updateSize(true)
          }
        })
        gallery.listen('close', () => {
          this.$emit('close')
        })

        gallery.listen('afterChange', () => {
          // gallery.ui.hideControls()
          let index = gallery.getCurrentIndex()
          if (this.currentIndex !== index) {
            this.$emit('change', index)
            this.currentIndex = index
          }
        })
        gallery.onTapStart = () => {
          if (gallery.ui) {
            let t = setTimeout(() => {
              const isShow = !gallery.ui.isShow
              this.$emit('toggle', isShow)
              clearTimeout(t)
            }, 500);
          }
        }

        gallery.init()
        this.gallery = gallery
        // pswp.items.push({
        //   src: "path/to/image.jpg", 
        //   w:1200,
        //   h:500 
        // });
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "./default-skin.css"
  @import "./photoswipe.css"


</style>
