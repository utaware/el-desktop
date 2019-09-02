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
        :load="loadNode"
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
import fs from 'fs-extra'
import path from 'path'
import { promisify } from 'util'
// utils
import { openSingleDirectoryDialog } from '../utils/ipcRendererHandle'

export default {
  name: 'ns-docs-tree-page',
  components: {},
  mixins: [],
  watch: {
    // 当源目录发生变动对应去读取目录结构
    async dirOrigin (nv) {
      console.log(nv)
      this.originData = await this.getMarkTreeData(nv)
    }
  },
  props: {},
  data () {
    return {
      // 文件夹路径源
      dirOrigin: '',
      // 原始数据
      originData: [],
      // 右侧展示的文本内容
      content: ''
    }
  },
  computed: {
    // docs目录开始原始路径
    originDocsPath () {
      return this.dirOrigin || path.resolve(__dirname, '../docs')
    },
    // promise化fs.readdir
    readdirAsync () {
      return promisify(fs.readdir)
    }
  },
  methods: {
    // 点击树节点回调
    nodeClickHanle (data, node) {
      const { path } = data
      this.readFileContent(path)
    },
    // 加载节点
    async loadNode (node, resolve) {
      const { data: { path, isFile } } = node
      if (isFile) {
        return resolve([])
      }
      const result = await this.getMarkTreeData(path)
      resolve(result)
    },
    // 树结构查询
    async getMarkTreeData (path = this.originDocsPath) {
      const originList = await this.readdirAsync(path, {
        withFileTypes: true
      })
      return originList.map(v => {
        const { name } = v
        return {
          label: name,
          isDirectory: v.isDirectory(),
          isFile: v.isFile(),
          isLeaf: v.isDirectory(),
          path: `${path}\\${name}`,
          children: []
        }
      })
    },
    // 读取md文件路径解析
    readFileContent (targetPath) {
      // .split(path.sep).join('/');
      const base = process.cwd()
      const filename = path.join(base, __dirname)
      const md = path.relative(filename, targetPath).split(path.sep).join('/')
      console.log(md)
      // ../../docs/Electron/Guides/使用Pepper Flash插件.md
      // if (md) {
      //   return
      // }
      // import(md).then(module => {
      //   console.log(module)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 选择目录路径
    selectDirPath ($event) {
      // 打开选择目录弹窗
      $event.target.blur()
      openSingleDirectoryDialog(this.callbackDirPath)
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
