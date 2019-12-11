/**
 * @filename: MarkdownLoader.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/09/02 15:00:13 星期一
 */

<template>

  <div class="wrapper-markdown-loader">
    <!-- 容器 -->
    <div class="markdown-content custom" ref="mark" v-loading="loading"></div>

    <el-backtop target=".el-scrollbar__wrap" :bottom="80">

      <div class="backtop"> UP </div>

    </el-backtop>

  </div>

</template>

<script>
// utils
import { ipcEventsHandler } from '@/message/ipcRendererHandle'
// Vue
import Vue from 'vue'
// vuex
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ns-markdown-loader',
  components: {},
  mixins: [],
  inject: ['successCode'],
  watch: {
    // 当路径变化的时候重载文档
    markdownFilePath: {
      handler (newPath) {
        if (!newPath) {
          return false
        }
        this.parseMarkdownFile(newPath)
      },
      immediate: true,
      deep: true
    }
  },
  props: {},
  data () {
    return {
      // 当前引入的append vue实例
      component: null,
      // 加载
      loading: false
    }
  },
  computed: {
    // vuex
    ...mapState('Markview', ['markdownFilePath'])
  },
  methods: {
    // vuex
    ...mapMutations('Markview', ['commitMarkdownFilePath']),
    // 解析动态的md文件路径转化为页面
    parseMarkdownFile (filePath) {
      this.loading = true
      ipcEventsHandler({
        send: 'markdownRenderWithMd',
        filePath,
        callback: (res) => {
          const { code, data, message } = res
          this.loading = false
          if (code === this.successCode) {
            this.createContentNodes(data)
          } else {
            this.$error({ message })
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
      const Component = Vue.extend({
        template: htmlContent,
        methods: {
          getRootComponentsValue: (name) => {
            return this[name]
          },
          handlerLinkClick: ($event) => {
            $event.preventDefault()
            const { href } = $event.target
            const { isexternal, linkfile } = $event.target.dataset
            if (isexternal === 'true') {
              this.$electron.shell.openExternal(href)
            } else {
              this.commitMarkdownFilePath(linkfile)
            }
          }
        }
      })
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
    },
    // 重载文档
    reloadMarkdown () {
      this.parseMarkdownFile(this.markdownFilePath)
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
@import '../styles/index.styl';
  // 解析器
.wrapper-markdown-loader {
  padding: 2rem;
  background: #f9f9f9;
  // markdown解析内容
  .markdown-content {
    padding: 2rem;
    padding-right: 4rem;
    background: #fff;
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
