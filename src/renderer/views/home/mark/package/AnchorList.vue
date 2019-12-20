/**
 * @filename: AnchorList.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/07 17:48:50 星期六
 */

<template>
  <!-- 锚点列表 -->
  <div class="wrapper-anchor-list">

    <el-tree :data="titleList"
    :props="defaultProps"
    :default-expand-all="true">

      <!-- 自定义渲染节点 -->
      <span class="custom-tree-node" slot-scope="{ node }">
        <!-- 节点图标 -->
        <!-- <i :class="getIconClassName(node, data)"></i> -->
        <!-- 节点名称 -->
        <a @click.prevent="handleAnchorClick(node.label)">{{ node.label }}</a>

      </span>

    </el-tree>

  </div>

</template>

<script>
// ipc
import { ipcEventsHandlerOnce } from '@/message/ipcRendererHandle'
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
      // tree data
      titleList: [],
      // tree options
      defaultProps: {
        children: 'children',
        label: 'id'
      },
      // 锚点标记
      anchorMark: ''
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
      if (!markdownFilePath) {
        return false
      }
      ipcEventsHandlerOnce({
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
      ipcEventsHandlerOnce({
        content,
        send: 'markdownParseWithTile',
        include: [ 'h1', 'h2', 'h3', 'h4' ],
        callback: (res) => {
          const { code, data, message } = res
          if (code === successCode) {
            this.titleList = data
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 锚点跳转
    handleAnchorClick (id) {
      this.anchorMark = '#' + id
      document.querySelector(this.anchorMark).scrollIntoView(true)
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
