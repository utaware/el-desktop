/**
 * @filename: LayoutDialog.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/26 11:24:24 星期二
 */

<template>

  <el-dialog
    class="layout-dialog"
    title="设置"
    @close="handleClose"
    :visible="dialogVisible">
    
    <!-- 展示目录 -->
    <div class="current-dir between-item">
      
      <span>{{ folderPath }}</span>

      <el-button size="small" icon="el-icon-folder-opened" @click="selectDocsPath"></el-button>
      
    </div>

    <!-- 文档树展示是否展示 -->
    <div class="select-folder between-item">

      <span>目录树展示</span>

      <el-switch class="switch" :value="docsTreeShow" @change="handleDocsTree"></el-switch>

    </div>

  </el-dialog>

</template>

<script>
// ipc
import { showOpenDialog } from '@/utils/ipcRendererHandle'
// vuex
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ns-layout-dialog',
  components: {},
  mixins: [],
  inject: ['successCode'],
  watch: {},
  props: {
    // 模态框展示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 文档树展示
    docsTreeShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 选择的目录
      selectFolderPath: '',
      // 布局设置
      layoutConfig: {
        docsTree: true
      }
    }
  },
  computed: {
    // vuex
    ...mapState('DocsTree', ['folderPath'])
  },
  methods: {
    // vuex
    ...mapMutations('DocsTree', ['commitFolderPath']),
    // 切换模态框展示或者隐藏
    // 选择目录路径
    selectDocsPath () {
      // 打开选择目录弹窗
      showOpenDialog({
        options: {
          properties: ['openDirectory']
        },
        callback: (event, res) => {
          const { data, code } = res
          if (code === this.successCode && data) {
            this.commitFolderPath(data)
          }
        }
      })
    },
    // 通过X或者取消关闭模态框
    handleClose () {
      this.$emit('changeLayoutDialogShow', false)
    },
    // 修改文档树是否展示
    handleDocsTree (show) {
      this.$emit('changeDocsTreeShow', show)
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
// 布局设置模态框
.layout-dialog {
  // 两侧布局
  .between-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    line-height: 3rem;
  }
  // 原样式修改
  /deep/ .el-dialog__body {
    padding: 1.5rem;
  }
}
</style>
