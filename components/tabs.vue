<template lang="pug">

  ul.tabs
    li(v-for="tab, index in tabs" :style="[liStyle, currentIndex === index ? activeStyle: {}]" @click="currentIndex = index") {{tab}}

    li(:style="[liStyle, lineStyle]")
</template>

<script>

export default {
  props: {
    tabs: Array,
    color: {
      type: String,
      default: 'red'
    },
    activeColor: {
      type: String,
      default: 'blue'
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    liStyle() {
      const len = this.tabs.length
      return {
        width: len > 1 ? 100 / len + '%' : '200px',
        color: this.color,
      }
    },
    lineStyle() {
      const len = this.tabs.length
      return {
        borderColor: this.activeColor,
        left: len > 1 ? this.currentIndex * 100 / len + '%' : this.currentIndex * 200 + 'px'
      }
    },
    activeStyle() {
      return {
        color: this.activeColor
      }
    },
  },
}
</script>
<style lang="stylus">
ul {
  overflow: hidden;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  min-width: 200px;
  // max-width: 1600px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 0;
}
li {
  display: inline-block;
  position: relative;
  width: 12.5%;
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
li:last-child {
  position: absolute;
  z-index: -1;
  left: 0%;
  // background: rgba(255, 255, 255, 0);
  transition: background .35s ease-out, transform 0s .35s;
  border-bottom 2px solid
  transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
