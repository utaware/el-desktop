/**
 * @filename: DocsTreePage.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/08/30 15:15:12 星期五
 */

<template>

  <div class="wrapper-docs-tree-page">

    <!-- 头部选择目录 -->
    <div class="docs-header">
      <!-- 展示框 -->
      <el-input
        class="select-docs-input"
        :value="fileFolderPath || storeFolderPath"
        :readonly="true"
        :disabled="true">

         <template slot="prepend">当前目录 : </template>

      </el-input>
      <!-- 选择按钮 -->
      <el-button class="select-docs-button" @click="selectDocsPath">选择文件夹</el-button>

    </div>
    <!-- 中间树和内容 -->
    <div class="docs-body">

      <!-- docs结构树 -->
      <el-tree
        class="dirs-tree"
        :data="treeData"
        :props="treeProps"
        empty-text="暂未选择文件目录"
        lazy
        :accordion="accordion"
        :load="loadTreeNodes"
        @node-click="treeNodesClick">
      </el-tree>

      <!-- 选择的文本内容 -->
      <div class="mark-content">

        <MarkdownLoader :path="markFilePath"></MarkdownLoader>

      </div>

    </div>

  </div>

</template>

<script>
// ipc
import {
  showOpenDialog,
  readFileFolderPath
} from '@/utils/ipcRendererHandle'
// vuex
import { mapMutations, mapState } from 'vuex'
// components
import MarkdownLoader from '@/components/MarkdownLoader.vue'

export default {
  name: 'ns-docs-tree-page',
  components: {
    MarkdownLoader
  },
  mixins: [],
  watch: {
    // 当选择文件的路径发生变化 -> 重载数据
    fileFolderPath (nv) {
      readFileFolderPath({
        path: nv,
        callback: (event, files) => {
          this.treeData = files
        }
      })
    }
  },
  props: {},
  data () {
    return {
      // 选择的文件夹路径
      fileFolderPath: '',
      // 文件树数据结构
      treeData: [],
      // 选择的md文件路径
      markFilePath: '',
      // 配置选项
      treeProps: {
        label: 'name',
        isLeaf: 'isFile'
      },
      // 是否开启手风琴效果
      accordion: false
    }
  },
  computed: {
    // vuex
    ...mapState('DocsTree', {
      storeFolderPath: 'folderPath'
    })
  },
  methods: {
    // vuex
    ...mapMutations('DocsTree', ['commitFolderPath']),
    // 加载子节点树
    loadTreeNodes (node, resolve) {
      const { data: { path = this.storeFolderPath } } = node
      if (!path) {
        resolve([])
      } else {
        readFileFolderPath({
          path,
          callback: (event, files) => {
            resolve(files)
          }
        })
      }
    },
    // 节点被单击触发的事件
    treeNodesClick (data, node) {
      const { path, isDirectory } = data
      if (isDirectory) {
        return false
      }
      this.markFilePath = path
    },
    // 选择目录路径
    selectDocsPath () {
      // 打开选择目录弹窗
      showOpenDialog({
        properties: ['openDirectory'],
        callback: (event, path) => {
          this.fileFolderPath = path
          this.commitFolderPath(path)
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
.wrapper-docs-tree-page {
  // 头部 目录展示 + 按钮
  .docs-header {
    margin-bottom: 1rem;
    display: flex;
    .select-docs-input {
      margin: 0 1rem;
    }
  }
  // 中间部分 树 + 内容
  .docs-body {
    display: flex;
    border-radius: 0.5rem;
    // 文件目录树
    .dirs-tree {
      min-width: 20rem;
      flex-basis: 20vw;
    }
    // markdown 内容
    .mark-content {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
