<template lang='pug'>
  section
    |aboutus{{about}}
</template>

<script type='text/ecmascript-6'>
import { getAbout } from '~/api/site'

export default {
  components: {

  },
  async asyncData() {
    const about = await getAbout()

    return { about: about || {} }
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
