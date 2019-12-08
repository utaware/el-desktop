/**
 * @filename: AnchorList.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/07 17:48:50 星期六
 */

<template>
  <!-- 锚点列表 -->
  <div class="wrapper-anchor-list">

    <el-tree :data="titleList" :props="defaultProps">

      <!-- 自定义渲染节点 -->
      <span class="custom-tree-node" slot-scope="{ node }">
        <!-- 节点图标 -->
        <!-- <i :class="getIconClassName(node, data)"></i> -->
        <!-- 节点名称 -->
        <a :href="`#${node.label}`">{{ node.label }}</a>

      </span>

    </el-tree>

  </div>

</template>

<script>
// ipc
import { ipcEventsHandler } from '@/message/ipcRendererHandle'
// vuex
import { mapState } from 'vuex'

export default {
  name: 'ns-anchor-list',
  components: {},
  mixins: [],
  inject: ['successCode'],
  watch: {
    markdownFilePath (nv) {
      this.getAnchorTitleList()
    }
  },
  props: {},
  data () {
    return {
      titleList: [],
      defaultProps: {
        children: 'children',
        label: 'id'
      }
    }
  },
  computed: {
    // vuex
    ...mapState('Markview', ['markdownFilePath'])
  },
  methods: {
    // 读取文件内容
    getAnchorTitleList () {
      const { markdownFilePath, successCode } = this
      ipcEventsHandler({
        filePath: markdownFilePath,
        send: 'readFileContent',
        callback: (res) => {
          const { code, message, data } = res
          if (code === successCode) {
            this.parseMarkdownContentWithTitle(data)
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 解析md格式文本到tokens处理
    parseMarkdownContentWithTitle (content) {
      const { successCode } = this
      ipcEventsHandler({
        content,
        send: 'markdownParseWithTile',
        include: [ 'h1', 'h2', 'h3', 'h4' ],
        callback: (res) => {
          const { code, data, message } = res
          if (code === successCode) {
            // this.renderMarkdownAnchorList(data)
            this.titleList = data
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 渲染当前路径md文件对应的锚点标题结构
    renderMarkdownAnchorList (list) {
      const content = list.map(v => {
        const { tag, level, id } = v
        return `
        <li style="text-indent: ${level * 2}em;" data-tag="${tag}">
          <a href="#${id}">${id}</a>
        </li>`
      }).join('\n')
      const renderHtml = `<ul>\n${content}\n</ul>`
      console.log(renderHtml)
      this.renderHtml = renderHtml
    }
  },
  filters: {},
  created () {
    this.getAnchorTitleList()
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// 锚点列表
.wrapper-anchor-list {
}
</style>
