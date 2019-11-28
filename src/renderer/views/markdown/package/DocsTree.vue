/**
 * @filename: docsTree.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/25 16:04:39 星期一
 */

<template>

  <div class="wrapperdocs-tree">
    <!-- 搜索筛选框 -->
    <el-input
      class="search-filter"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <!-- docs结构树 -->
    <el-tree
      class="dirs-tree"
      :data="treeData"
      :props="treeProps"
      empty-text="暂未选择文件目录"
      lazy
      :accordion="accordion"
      :load="loadTreeNodes"
      :filter-node-method="filterNode"
      @node-click="treeNodesClick"
      ref="tree">
      <!-- 自定义渲染节点 -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- 节点图标 -->
        <i :class="getIconClassName(node, data)"></i>
        <!-- 节点名称 -->
        <span>{{ node.label }}</span>

      </span>

    </el-tree>

  </div>

</template>

<script>
// ipc
import { readFileFolderPath } from '@/utils/ipcRendererHandle'
// vuex
import { mapState } from 'vuex'

export default {
  name: 'nsdocs-tree',
  components: {},
  mixins: [],
  inject: ['successCode'],
  watch: {
    // 当选择文件的路径发生变化 -> 重载数据
    folderPath (path) {
      const { successCode, filterMarkFile } = this
      readFileFolderPath({
        path,
        callback: (event, res) => {
          const { data, code } = res
          const folderInfo = code === successCode ? data : []
          const markOrDirList = filterMarkFile(folderInfo)
          this.treeData = markOrDirList
        }
      })
    },
    // 搜索文字改变自动筛选
    filterText (text) {
      this.$refs.tree.filter(text)
    }
  },
  props: {},
  data () {
    return {
      // 文件树数据结构
      treeData: [],
      // 选择的md文件路径
      markFilePath: '',
      // 筛选文字
      filterText: '',
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
    ...mapState('Markview', ['folderPath'])
  },
  methods: {
    // 加载子节点树
    loadTreeNodes (node, resolve) {
      const { successCode, folderPath, filterMarkFile } = this
      const { data: { path = folderPath } } = node
      if (!path) {
        resolve([])
      } else {
        readFileFolderPath({
          path,
          callback: (event, res) => {
            const { data, code } = res
            const folderInfo = code === successCode ? data : []
            const markOrDirList = filterMarkFile(folderInfo)
            resolve(markOrDirList)
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
      this.$emit('selectFileChange', path)
    },
    // 节点筛选
    filterMarkFile (list) {
      return list.filter(file => {
        const { path, isDirectory } = file
        return path.endsWith('.md') || isDirectory
      })
    },
    // 获取节点图标名称
    getIconClassName (node, data) {
      const { expanded } = node
      const { isDirectory } = data
      const dirOpenIcon = 'el-icon-folder-opened'
      const dirCloseIcon = 'el-icon-folder'
      const fileIocn = 'el-icon-document'
      return isDirectory ? expanded ? dirOpenIcon : dirCloseIcon : fileIocn
    },
    // 搜索框节点筛选
    filterNode (text, data) {
      return text ? data.name.includes(text) : true
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.wrapperdocs-tree {
  // 搜索筛选框
  .search-filter {
    margin-bottom: 0.5rem;
  }
  // 目录树
  .dirs-tree {
    min-width: 20rem;
    flex-basis: 20vw;
  }
  // deep
  .dirs-tree /deep/ {
    .el-tree-node__expand-icon {
      display: none;
    }
  }
}
</style>
