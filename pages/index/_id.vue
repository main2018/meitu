<template lang="pug">
  .about-us
    |about
</template>

<script>

export default {
  validate ({ params, store }) {
    // 必须是number类型
    // return /^\d+$/.test(params.id)
    const categorys = store.state.categorys
    const routers = categorys.filter(item => !!item.name).map(item => item.route)
    // console.log('routers', routers)
    const id = params.id
    const currentIndex = routers.findIndex(router => router === id)

    store.commit('SET_CURRENT_INDEX', currentIndex)

    return routers.includes(id)
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    liStyle() {
      return {
        color: this.color,
      }
    },
    lineStyle() {
      const len = this.tabs.length
      return {
        marginLeft: this.currentIndex * this.gap + 'px',
        borderColor: this.borderColor,
        // left: len > 1 ? this.currentIndex * 100 / len + '%' : this.currentIndex * 200 + 'px'
      }
    },
    activeStyle() {
      return {
        color: this.activeColor
      }
    },
    prevData() {
      return this.tabs.slice(0, this.currentIndex).join("")
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
