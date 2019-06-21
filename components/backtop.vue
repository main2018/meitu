<template lang='pug'>
  transition(name="el-fade-in")
    div(
      v-if="visible"
      @click.stop="handleClick"
      :style="style"
      class="backtop")
      .backtop-bg
</template>

<script type='text/ecmascript-6'>
import throttle from '~/utils/throttle-debounce/throttle'

export default {
  name: 'ElBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      el: null,
      container: null,
      visible: false
    };
  },
  computed: {
    style() {
      return {
        'right': this.styleRight,
        'bottom': this.styleBottom
      }
    },
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    }
  },
  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop() {
      let el = this.el;
      let step = 0;
      let interval = setInterval(() => {
        if (el.scrollTop <= 0) {
          clearInterval(interval);
          return;
        }
        step += 10;
        el.scrollTop -= step;
      }, 20);
    }
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler);
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.backtop
  position: fixed
  width w=20px
  height @width
  border-color #fff
  opacity 0.7
  cursor pointer
  
  &::before
    content ''
    position absolute
    top 2px
    width: w*0.8;
    height: w*0.8;
    border-top: 2px solid;
    border-right: 2px solid;
    font-style: normal;
    transform: translateX(-50%) rotate(-45deg);
    overflow: hidden;
  &::after
    content ''
    top 0
    position absolute
    height: 100%;
    border-left 2px solid
    transform translateX(-50%)
  &:before
  &:after
    left 50%
    border-color: inherit;
  &:hover
    opacity 1
    transform scale(1.2)
    transition .3s
  &-bg
    margin -10px
    height calc(100% + 20px)
    background rgba(0,0,0,.5)
    border-radius 50%

</style>
