<template lang='pug'>
  section.page.component-empty {{msg}}&nbsp;😢 
    
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      msg: {
        type: String,
        default: '暂无数据',
      },
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.component-empty
  text-align center
  line-height 5
  font-size $font-size-medium
  color $font-color-l
  text-shadow 0 0 2px
</style>
