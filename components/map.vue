<template lang='pug'>
  iframe(:src="src")
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      location: {
        type: String,
        default: '116.470098,39.992838',
      },
    },
    data() {
      return {

      }
    },
    computed: {
      src() {
        return `//uri.amap.com/marker?position=${this.location}&name=park&src=mypage&coordinate=gaode&callnative=0`
        // return `https://m.amap.com/navi/?dest=${this.location}&destName=阜通西&hideRouteIcon=1&key=a78fd75766bdec87627a2a9170a90c26`
      },
    },
    mounted() {
    },
    methods: {
      initIframe() {
        const iframeDocument = document.querySelector('iframe').contentWindow.document
        iframeDocument.querySelector('#map-header').style.display = 'none'
      },
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
iframe
  width 445px
  height 250px
  border none
</style>
