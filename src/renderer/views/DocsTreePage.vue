/**
 * @filename: DocsTreePage.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/08/30 15:15:12 星期五
 */

<template>

  <div class="wrapper-docs-tree-page">
    <!-- docs结构树 -->
    <el-tree
      lazy
      :data="originData"
      :load="loadNode">
    </el-tree>

  </div>

</template>

<script>
// node
import fs from 'fs-extra'
import path from 'path'
import { promisify } from 'util'

export default {
  name: 'ns-docs-tree-page',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      originData: []
    }
  },
  computed: {
    // docs目录开始原始路径
    originDocsPath () {
      return path.resolve(__dirname, '../docs')
    },
    // promise化fs.readdir
    readdirAsync () {
      return promisify(fs.readdir)
    }
  },
  methods: {
    // 节点被点击
    onNodeClick (data, node, vn) {
      console.log(data, node, vn)
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
          path: `${path}/${name}`,
          children: []
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
  background: black;
}
</style>
