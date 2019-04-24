exports.js = () => {
  const LinkCard = require('base/card/link-card/link-card')
  const { getQiniuPosterUrl } = require('common/js/qiniu-api')
  const { getRemoteImgSize } = require('common/js')
  const { timeFormat } = require('common/js')
  const Gallery = require('base/gallery')
  return {
    name: 'base-detail',
    inject: ['hideMenu'],
    components: {
      LinkCard,
      Gallery
    },

    created () {
    },

    props: {
    },

    data () {
      return {
        hasArticle: true,
        hasImage: true,
        hasVideo: true,
        hasLink: true
      }
    },

    computed: {
      categories () { return this.$store.getters.categories },
      album () {
        let album = this.$store.getters.currAlbum
        let category = album && album.category && album.category.category
        this.categories.forEach((item) => {
          if (item.category === category) {
            this.hasLink = item.hasLink
            this.hasArticle = item.hasArticle
            this.hasImage = item.hasImage
            this.hasVideo = item.hasVideo
          }
        })
        return album
      },
      time () {
        if (this.album && this.album.meta) {
          return timeFormat(this.album.meta.updatedAt)
        }
        return ''
      },
      isSubpage () {
        const category = this.album.category.category
        let isSubpage = false
        this.categories.forEach(item => {
          if (item.category !== category) { return }
          isSubpage = item.isSubpage
        })
        return isSubpage
      }
    },

    watch: {
    },

    methods: {
      hideBar () { this.hideMenu() },
      getImgSize (filename) {
        let width = 0
        let height = 0
        let img = new Image()
        img.src = `${this.$http}${filename}`
        let interVal = setInterval(() => {
          if (img.width > 0 || img.height > 0) {
            width = width || img.width
            height = width || img.height
            clearInterval(interVal)
            return { width, height }
          }
        }, 40)
        getRemoteImgSize(img).then(size => size)
      },
      getPoster (video) {
        return getQiniuPosterUrl(video)
      },
      playVid () { this.video.play() },
      enableMute () { this.video.muted = false },
      toTop () { scrollTo({top: 0, behavior: 'smooth'}) }
    },

    mounted () {
      this.toTop()
    }
  }
}

