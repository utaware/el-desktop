/**
 * @filename: MarkdownLoader.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/09/02 15:00:13 星期一
 */

<template>

  <div class="wrapper-markdown-loader">

    <!-- 容器 -->
    <div class="markdown-content custom" ref="mark"></div>

    <el-backtop target=".el-scrollbar__wrap">

      <div class="backtop"> UP </div>

    </el-backtop>

  </div>

</template>

<script>
// utils
import { markdownRender } from '@/utils/ipcRendererHandle'
// Vue
import Vue from 'vue'

export default {
  name: 'ns-markdown-loader',
  components: {},
  mixins: [],
  inject: ['successCode'],
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
      markdownRender({
        path,
        callback: (event, res) => {
          const { code, data } = res
          if (code === this.successCode) {
            this.createContentNodes(data)
          }
        }
      })
    },
    // 生成并插入html结构
    createContentNodes (content) {
      // 如果已经存在节点先移除
      if (this.component) {
        this.removeContentNodes()
      }
      // 再生成节点
      const htmlContent = `<main>\n${content}\n</main>`
      const Component = Vue.extend({ template: htmlContent })
      this.component = new Component().$mount()
      this.$refs.mark.appendChild(this.component.$el)
    },
    // 移除html结构
    removeContentNodes () {
      if (!this.component) {
        return false
      }
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
  // 解析器
.wrapper-markdown-loader {
  padding: 0 4rem;
  // markdown解析内容
  .markdown-content {
    // position: relative;
  }
  // 返回顶部
  .backtop {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
}
</style>
