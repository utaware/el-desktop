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

      <el-input class="select-dir-name" :value="originDocsPath" :readonly="true" @focus="selectDirPath($event)">

        <template slot="prepend">目录:</template>

        <template slot="append">

          <i class="refresh el-icon-refresh-left" @click.stop="getMarkTreeData()"></i>

        </template>

      </el-input>

    </div>
    <!-- 中间树和内容 -->
    <div class="docs-body">

      <!-- docs结构树 -->
      <el-tree
        class="dirs-tree"
        lazy
        :data="originData"
        :load="loadFileFolderNode"
        @node-click="nodeClickHanle">
      </el-tree>

      <!-- 选择的文本内容 -->
      <div class="mark-content">

        {{ content }}

      </div>

    </div>


  </div>

</template>

<script>
// node
import path from 'path'
// utils
import {
  showOpenDialog,
  readFileFolderPath
} from '../utils/ipcRendererHandle'

export default {
  name: 'ns-docs-tree-page',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 文件夹路径源
      dirOrigin: '',
      // 原始数据
      originData: [],
      // 右侧展示的文本内容
      content: '',
      // 获取到的相关文件信息
      fileFloder: [],
      // 树结构回调函数
      treeLoadResolve: null
    }
  },
  computed: {
    // docs目录开始原始路径
    originDocsPath () {
      return this.dirOrigin || path.resolve(__dirname, '../docs')
    }
  },
  methods: {
    // 点击树节点回调
    nodeClickHanle (data, node) {
      const { path } = data
      this.readFileContent(path)
    },
    // 加载节点
    loadFileFolderNode (node, resolve) {
      let { data: { path, isFile } } = node
      if (isFile) {
        resolve([])
      } else {
        if (!path) {
          path = this.originDocsPath
        }
        this.treeLoadResolve = resolve
        readFileFolderPath({ path, callback: this.readFileFolderPathCallback })
      }
    },
    // 回调获取文件夹节点数据
    readFileFolderPathCallback (event, files) {
      const { treeLoadResolve } = this
      if (!treeLoadResolve) {
        return false
      }
      treeLoadResolve(files)
      this.treeLoadResolve = null
    },
    // 读取md文件路径解析
    readFileContent (targetPath) {
      // .split(path.sep).join('/');
      const base = process.cwd()
      const filename = path.join(base, __dirname)
      const md = path.relative(filename, targetPath).split(path.sep).join('/')
      console.log(md)
    },
    // 选择目录路径
    selectDirPath ($event) {
      // 打开选择目录弹窗
      $event.target.blur()
      const { callbackDirPath } = this
      showOpenDialog({
        properties: ['openDirectory'],
        callback: callbackDirPath
      })
    },
    // 通信回调
    callbackDirPath (event, path) {
      // 并没有勾选目录
      if (!path) {
        return false
      }
      // 替换勾选的目录
      this.dirOrigin = path
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
    .select-dir-name {
      /deep/ .el-input-group__append {
        padding: 0;
        .refresh {
          padding: 12px 20px;
        }
      }
    }
  }
  // 中间部分 树 + 内容
  .docs-body {
    display: flex;
    height: 50rem;
    justify-content: stretch;
    border-radius: 0.5rem;
    // 文件目录树
    .dirs-tree {
      min-width: 20rem;
      flex-basis: 20vw;
    }
    // markdown 内容
    .mark-content {
      flex: 1;
    }
  }
}
</style>
