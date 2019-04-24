<template lang='pug'>
  section
    |detail
</template>

<script type='text/ecmascript-6'>
export default {
  components: {

  },
  async asyncData({ route }) {
    const id = route.params.id

    console.log('id', id)
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
