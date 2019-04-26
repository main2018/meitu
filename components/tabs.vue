<template lang="pug">

  ul.tabs
    li(
      v-for="tab, index in tabs"
      :style="[liStyle, currentIndex === index ? activeStyle: {}, {marginRight: index === tabs.length - 1 ? 0 : `${gap}px`}]"
      @click="currentIndex = index; $emit('input', index); $emit('change', index)"
      ) {{tab}}

    li(:data-prev="prevData")
      .tab-line(:style="lineStyle") {{tabs[currentIndex]}}
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
      default: 30,
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
  display: inline-block;
  position: relative;
  height: 100%;
  font: 1rem/3 trebuchet ms, verdana, century gothic, arial, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
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
  transition: background .35s ease-out, transform 0s .35s;
  transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: transparent
  pointer-events none
  &::before
    content: attr(data-prev)
    display inline-block
  .tab-line
    display inline-block
    height calc(100% + 3px)
    box-sizing border-box
    border-bottom 2px solid
    transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);


</style>
