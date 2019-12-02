/**
 * @filename: Code.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/30 13:59:40 星期六
 */

<template>

  <div class="wrapper-code">

    <div class="markdown-content custom" ref="markCode"></div>

  </div>

</template>

<script>
// utils
import { ipcEventsHandler } from '@/message/ipcRendererHandle'
// vuex
import Vue from 'vue'

export default {
  name: 'ns-code',
  components: {},
  mixins: [],
  watch: {},
  props: {
    // 接受的文本内容
    content: {
      type: String,
      defalt: ''
    },
    // 参数列表
    params: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {
    // 当前组件文档引用的路径
    currentFilePath () {
      return this.$root.getRootComponentsValue('path')
    }
  },
  methods: {
    // 解析动态的md文件路径转化为页面
    parseMarkdownCode () {
      const { currentFilePath, content, params } = this
      ipcEventsHandler({
        send: 'markdownRenderWithCode',
        currentFilePath,
        codeRelativePath: content,
        params,
        callback: (event, res) => {
          const { code, message, data } = res
          if (code) {
            const { text, html } = data
            // 创建渲染节点
            this.createContentNodes(html)
            // 执行js
            this.handlerExec(text)
          } else {
            console.log(message)
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
      const htmlContent = content
      const Component = Vue.extend({ template: htmlContent })
      this.component = new Component().$mount()
      this.$refs.markCode.appendChild(this.component.$el)
    },
    // 移除html结构
    removeContentNodes () {
      if (!this.component) {
        return false
      }
      this.$refs.markCode.removeChild(this.component.$el)
      this.component.$destroy()
      this.component = null
    },
    // 执行
    handlerExec (text) {
      const el = document.createElement('script')
      el.innerHTML = text
      document.body.appendChild(el)
    }
  },
  filters: {},
  created () {},
  mounted () {
    this.parseMarkdownCode()
  },
  beforeDestroy () {
    this.removeContentNodes()
  }
}
</script>

<style lang="scss" scoped>
.wrapper-code {
}
</style>
