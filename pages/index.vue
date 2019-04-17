<template lang="pug">
  .container
    nav.nav
      img.nav-logo(src="http://www.divcss5.com/images2014/divcss5-logo-2014.gif")
      tabs(:tabs="[1,2,3]")
</template>

<script>
import Logo from '~/components/Logo.vue'
import tabs from '~/components/tabs'

export default {
  components: {
    Logo,
    tabs
  }
}
</script>

<style lang="stylus" scoped>
nav
  padding 10px 0
  display flex
  align-items flex-end
  &-logo
    max-height 150px
  .tabs
    margin 0 50px 0 20px
</style>
