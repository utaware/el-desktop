/**
 * @filename: MarkdownLoader.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/09/02 15:00:13 星期一
 */

<template>

  <div class="wrapper-markdown-loader" ref="mark">

  </div>

</template>

<script>
export default {
  name: 'ns-markdown-loader',
  components: {},
  mixins: [],
  watch: {},
  props: {
    // 路径
    path: {
      type: String,
      default: './README.md',
      validate: (val) => {
        return val.endsWith('.md')
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 解析动态的md文件路径转化为页面
    parseMarkdownFile (path) {
      import(path).then(module => {
        console.log(module)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.wrapper-markdown-loader {
}
</style>
