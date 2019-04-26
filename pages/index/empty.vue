<template lang='pug'>
  section.empty.page
    |{{$route.query.msg || '暂无数据'}}😢 
    
</template>

<script type='text/ecmascript-6'>
  export default {
    components: {

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
.empty
  text-align center
  line-height 5
  font-size $font-size-medium
  color $font-color-l
  text-shadow 0 0 2px
</style>
