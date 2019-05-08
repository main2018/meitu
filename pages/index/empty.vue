<template lang='pug'>
  empty(:msg="$route.query.msg")
    
</template>

<script type='text/ecmascript-6'>
  import empty from '~/components/empty'

  export default {
    components: {
      empty
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

</style>
