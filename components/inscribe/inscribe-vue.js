// exports.js = () => {
//   return {
//     data() {}
//   }
// }
export default {
  name: 'inscribe',
  props: {
    tel: {
      type: String,
      default: '0898-88888888'
    },
    email: {
      type: String,
      default: 'main@163.net'
    },
  },

  data () {
    return {
    }
  },

  computed: {
    url () {
      return this.$route.path
    },
    thinLine () {
      return this.url === '/' ? '' : 'bd-1px-t'
    }
  },

  watch: {
  },

  methods: {
  },

  mounted () {
  }

}