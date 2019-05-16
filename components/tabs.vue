<template lang="pug">

  ul.tabs
    li(
      v-for="tab, index in normalizeTabs"
      :style="[liStyle, currentIndex === index ? activeStyle: {}, {marginRight: index === tabs.length - 1 ? 0 : `${gap}px`}]"
      @click="currentIndex = index; $emit('input', index); $emit('change', index)"
      ): span(v-html="tab")

    li(:data-prev="prevData")
      span(v-html="prevData")
      .tab-line(:style="lineStyle" v-html="normalizeTabs[currentIndex]")
</template>

<script>

export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    tabs: Array,
    color: {
      type: String,
      default: '#7e8c8d'
    },
    activeColor: {
      type: String,
      default: '#fff'
    },
    borderColor: {
      type: String,
      default: 'red'
    },
    gap: {
      type: Number,
      default: 50,
    },
  },
  watch: {
    value(index) {
      this.currentIndex = index
    },
  },
  data() {
    return {
      currentIndex: this.value,
    }
  },
  computed: {
    normalizeTabs() {
      const reg = /^[\u4e00-\u9fa5]*$/
      const max = Math.max(...this.tabs.filter(tab => reg.test(tab)).map(tab => tab.length))
      const res = this.tabs.map(tab => {
        if (!reg.test(tab)) return tab
        if (tab.length < max) {
          const mark = tab.length <= max / 2 ? '&emsp;' : '&nbsp;'
          return tab.split('').join(mark)
        }
        else return tab
      })
      return res
    },
    liStyle() {
      return {
        color: this.color,
      }
    },
    lineStyle() {
      const len = this.tabs.length
      return {
        // marginLeft: this.currentIndex * this.gap + 'px',
        transform: `translateX(${this.currentIndex * this.gap}px)`,
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
      if (this.currentIndex < 0) return ''

      return this.normalizeTabs.slice(0, this.currentIndex).join("")
    },
  },
  created() {
    console.log('normalizeTabs', this.normalizeTabs)
  },
}
</script>
<style lang="stylus" scoped>
ul {
  // overflow: hidden;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  min-width: 200px;
  // max-width: 1600px;
  font-size: 0;
}
li {
  display: inline-flex;
  align-items flex-end
  position: relative;
  height: 100%;
  font: 14px trebuchet ms;
  // font-family PingFangSC-Regular
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  font-weight 100
  // font-size 14px
  text-align:justify;
  line-height 1
}

// li:nth-child(9):hover ~ li:last-child {
//   transform: translate(800%);
//   transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);

//   transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
// }
li:last-child
  position: absolute
  margin 0
  left: 0
  // background: rgba(255, 255, 255, 0);
  // transition: background .35s ease-out, transform 0s .35s;
  transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: transparent
  pointer-events none
  height calc(100% + 5px)
  // &::before
  //   content: attr(data-prev)
  //   display inline-block
  //   background-color color
  .tab-line
    display inline-block
    height 100%
    border-bottom 2px solid
    transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    // transform: translate3d(0,0,0);
    will-change: transform


</style>
