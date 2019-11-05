/**
 * @filename: MarkdownLoader.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/09/02 15:00:13 星期一
 */

<template>

  <div class="wrapper-markdown-loader" ref="mark">

    <div v-html="content"></div>

  </div>

</template>

<script>
// utils
import { readFileContent } from '@/utils/ipcRendererHandle'

export default {
  name: 'ns-markdown-loader',
  components: {},
  mixins: [],
  watch: {
    // 当路径变化的时候重载文档
    path (nv) {
      this.parseMarkdownFile(nv)
    }
  },
  props: {
    // 路径
    path: {
      type: String,
      default: 'README.md',
      validate: (fileName) => {
        return fileName.endsWith('.md')
      }
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {},
  methods: {
    // 解析动态的md文件路径转化为页面
    parseMarkdownFile (path) {
      readFileContent({
        path,
        callback: (event, content) => {
          this.content = content
        }
      })
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import "../assets/css/vuepress.css";
.wrapper-markdown-loader {
  padding: 1rem;
}
</style>
