<template lang='pug'>
  .nav-search
    input(list="results" @input="input"  @change="change")
    .focus-border
    .nav-search-bar
      template(v-if='!query')
        span.mdi.mdi-magnify.mdi-16px
        span 搜索
    datalist#results
      option(v-for="item in datalist") {{item}}
</template>

<script type='text/ecmascript-6'>
  import debounce from '~/utils/throttle-debounce/debounce'

  export default {
    props: {
      datalist: {
        type: Array,
        default: () => [1,2,3],
      },
    },
    data() {
      return {
        query: '',
      }
    },
    methods: {
      input: debounce(300, function (e) {
        const query = e.target.value
        this.$emit('input', query)
        this.query = query
      }),
      change(e) {
        const query = e.target.value
        const datalist = this.datalist || []
        if (!datalist.includes(query)) return
        this.$emit('change', query)
      },
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.nav-search
  position relative
  display flex
  align-items flex-end
  width 9.4rem
  align-self flex-end
  $color = #7e8c8d
  input
    padding .2rem
    width 8rem
    margin-right 1rem
    background none
    border-bottom 1px solid $color
    color #fff
    outline none
    &:focus ~ .focus-border
      width: calc(100% - 1rem)
      transition: 0.4s
      left: 0
    &:focus ~ .nav-search-bar
      color #fff
  input::-webkit-calendar-picker-indicator
    display: none
  .focus-border
    position: absolute
    // bottom: calc((48px - .2rem * 2 - 18px - 4px) / 2)
    bottom: 0
    left: 50%
    width: 0
    height: 2px
    background-color: $color-secondary
    transition: 0.4s
    will-change width
  &-bar
    position absolute
    right 1.2rem
    bottom 0
    color $color
 
</style>
