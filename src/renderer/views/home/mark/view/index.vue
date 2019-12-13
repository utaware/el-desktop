/**
 * @filename: mark.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/07 11:19:56 星期六
 */

<template>

  <div class="wrapper-view-mark">
    <!-- 头部按钮 -->
    <header class="header">
      <!-- 左侧按钮组 -->
      <el-button-group class="left-button-group">
        
        <el-button icon="el-icon-arrow-left" @click="handleReturnHomePage">返回</el-button>
        <el-button icon="el-icon-refresh-right" @click="handleReloadMarkContent">重载</el-button>
        <el-button icon="el-icon-s-fold" @click="handleOpenDrawerShow">列表</el-button>

      </el-button-group>
      <!-- 右侧目录选择 -->
      <SelectFolder></SelectFolder>
          
    </header>
    <!-- 选择的文本内容 -->
    <el-scrollbar 
      style="height: calc(100% - 56px);"
      :native="false"
      :noresize="false"
      :wrapClass="wrapClass"
      :wrapStyle="wrapStyles">

      <MarkdownLoader ref="loader"></MarkdownLoader>

    </el-scrollbar>
    <!-- 文档树 -->
    <el-drawer
      title="相关列表"
      :visible.sync="drawer.show"
      :modal="false"
      size="25rem"
      :direction="drawer.direction">
  
      <el-tabs class="drawer-tabs" v-model="drawer.activeName" type="card" :stretch="true">
        <!-- 当前目录的结构 -->
        <el-tab-pane name="dir">

          <span slot="label">目录树</span>

          <DocsTree></DocsTree>

        </el-tab-pane>
        <!-- 当前文档标题 -->
        <el-tab-pane name="title">

          <span slot="label">锚点列表</span>

          <AnchorList></AnchorList>

        </el-tab-pane>
      
      </el-tabs>
    
    </el-drawer>

  </div>

</template>

<script>
// components
import MarkdownLoader from '../package/MarkdownLoader.vue'
import DocsTree from '../package/DocsTree.vue'
import SelectFolder from '../package/SelectFolder.vue'
import AnchorList from '../package/AnchorList.vue'
// ipc
import { ipcEventsHandler } from '@/message/ipcRendererHandle'
// vuex
import { mapMutations } from 'vuex'

export default {
  name: 'ns-view-mark',
  components: {
    MarkdownLoader,
    DocsTree,
    SelectFolder,
    AnchorList
  },
  mixins: [],
  inject: ['successCode'],
  watch: {
    $route: {
      handler (nv) {
        console.log('$route:', nv)
      },
      deep: true
    }
  },
  props: {},
  data () {
    return {
      // 抽屉容器控制
      drawer: {
        show: false,
        layout: 'tree',
        direction: 'rtl',
        activeName: 'dir'
      },
      // 包裹class
      wrapClass: {
        overLimit: true
      },
      // 默认为{}, 实际只有数组和字符串进行处理
      wrapStyles: [
        { overflowX: 'hidden' }
      ],
      viewClass: {},
      viewStyle: {},
      // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
      noresize: false
    }
  },
  computed: {},
  methods: {
    // vuex
    ...mapMutations('Markview', ['commitFolderPath']),
    // 重新加载文档
    handleReloadMarkContent () {
      this.$refs.loader.reloadMarkdown()
    },
    // 弹出抽屉目录
    handleOpenDrawerShow () {
      this.drawer.show = true
    },
    // 选择文件夹
    handleOpenSelectFolder () {
      // 打开选择目录弹窗
      const { successCode } = this
      ipcEventsHandler({
        send: 'showOpenDialog',
        options: {
          properties: ['openDirectory']
        },
        callback: (res) => {
          const { data, code, message } = res
          if (code === successCode) {
            if (data) {
              this.commitFolderPath(data)
            }
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 返回主页
    handleReturnHomePage () {
      this.$router.push('/home')
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// view视图容器
.wrapper-view-mark {
  background: #f9f9f9;
  // 头部设置
  .header {
    display: flex;
    padding: 0.5rem 1rem;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #f9f9f9;
    box-sizing: border-box;
    // 左侧按钮组
    .left-button-group {
      width: 270px;
    }
  }
}
</style>
