<template lang='pug'>
  #map
</template>

<script type='text/ecmascript-6'>
import { Promise, resolve, reject } from 'q';
  const key = 'a78fd75766bdec87627a2a9170a90c26'
  const key_web = '8b2cd8ed6dae8e08db000196d75f2d4e'

  export default {
    props: {
      location: {
        type: String,
        default: '116.470098,39.992838',
      },
      zoom: Number,
    },
    data() {
      return {

      }
    },
    computed: {
      src() {
        return `//uri.amap.com/marker?position=${this.location}&src=mypage&coordinate=gaode&callnative=0`
        // return `https://m.amap.com/navi/?dest=${this.location}&destName=阜通西&hideRouteIcon=1&key=a78fd75766bdec87627a2a9170a90c26`
      },
    },
    async mounted() {
      await this.initScript()
      
      const center = this.location.split(',')
      this.initMap(center)
      const address = await this.getAddress(center)
      this.addMarker(center, address)
    },
    methods: {
      initScript() {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = `https://webapi.amap.com/maps?v=1.4.14&key=${key_web}`
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      },
      initMap(center) {
        var map = new AMap.Map('map', {
          center,
          zoom: this.zoom || 15,
        })
        this.map = map
      },
      addMarker(center, address) {
        var icon = new AMap.Icon({
          size: new AMap.Size(30, 30),    // 图标尺寸
          image: 'http://img.tukeshare.com/NaNmarker.png',  // Icon的图像
          imageOffset: new AMap.Pixel(0, 0),  // 图像相对展示区域的偏移量，适于雪碧图等
          imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
        })
        var marker = new AMap.Marker({
            position: new AMap.LngLat(...center),
            title: address,
            offset: new AMap.Pixel(-15, -30),
            icon,
            zoom: 13
        })
        this.map.add(marker)
      },
      getAddress(center) {
        return new Promise((resolve, reject) => {
          AMap.plugin('AMap.Geocoder',function() {
            var geocoder = new AMap.Geocoder()
            geocoder.getAddress(center, (status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                resolve(result.regeocode.formattedAddress)
              }else{
                console.error('根据地址查询位置失败')
                reject('中心点')
              }
            })
          })
        })
      },
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
#map
  width 445px
  height 250px
</style>
