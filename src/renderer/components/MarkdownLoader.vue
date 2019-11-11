/**
 * @filename: MarkdownLoader.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/09/02 15:00:13 星期一
 */

<template>

  <div class="wrapper-markdown-loader" ref="mark">

    <!-- 容器 -->

  </div>

</template>

<script>
// utils
import { readFileContent } from '@/utils/ipcRendererHandle'
// Vue
import Vue from 'vue'

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
      component: null
    }
  },
  computed: {},
  methods: {
    // 解析动态的md文件路径转化为页面
    parseMarkdownFile (path) {
      readFileContent({
        path,
        callback: (event, fileContent) => {
          this.createContentNodes(fileContent)
        }
      })
    },
    // 生成并插入html结构
    createContentNodes (content) {
      const htmlContent = `<main>\n${content}\n</main>`
      const Component = Vue.extend({ template: htmlContent })
      this.component = new Component().$mount()
      this.$refs.mark.appendChild(this.component.$el)
    },
    // 移除html结构
    removeContentNodes () {
      this.$refs.mark.removeChild(this.component.$el)
      this.component.$destroy()
      this.component = null
    }
  },
  filters: {},
  created () {},
  mounted () {},
  beforeDestroy () {
    this.removeContentNodes()
  }
}
</script>

<style lang="stylus">
@import './styles/index.styl';
.wrapper-markdown-loader {
  padding: 1rem 2rem;
}
</style>
