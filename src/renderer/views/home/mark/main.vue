/**
 * @filename: MarkdownView.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/07 11:19:56 星期六
 */

<template>

  <div class="wrapper-view-mark">

    <SlideMenu @leftMenuClick="leftMenuClick"></SlideMenu>

    <main class="right-contain">
      <!-- 选择的文本内容 -->
      <el-scrollbar 
        style="height: calc(100%);"
        :native="false"
        :noresize="false"
        :wrapClass="wrapClass"
        :wrapStyle="wrapStyles">

        <MarkdownLoader ref="loader"></MarkdownLoader>

      </el-scrollbar>
      <!-- 文档树 -->
      <el-drawer
        class="right-drawer"
        title="相关列表"
        :visible.sync="drawer.show"
        :modal="false"
        size="25rem"
        :direction="drawer.direction"
        @closed="handlerDrawerClosed">
    
        <el-tabs class="drawer-tabs" v-model="drawer.activeName" type="card" :stretch="true">
          <!-- 当前文档标题 -->
          <el-tab-pane name="title">

            <span slot="label">锚点列表</span>

            <AnchorList></AnchorList>

          </el-tab-pane>
          <!-- 当前目录的结构 -->
          <el-tab-pane name="dir">

            <span slot="label">目录树</span>

            <DocsTree></DocsTree>

          </el-tab-pane>
        
        </el-tabs>
      
      </el-drawer>

    </main>

  </div>

</template>

<script>
// components
import MarkdownLoader from './package/MarkdownLoader.vue'
import DocsTree from './package/DocsTree.vue'
import SelectFolder from './package/SelectFolder.vue'
import AnchorList from './package/AnchorList.vue'
import SlideMenu from './package/SlideMenu.vue'
// ipc
import { ipcEventsHandlerOnce } from '@/message/ipcRendererHandle'
// vuex
import { mapMutations } from 'vuex'

export default {
  name: 'ns-view-mark',
  components: {
    MarkdownLoader,
    DocsTree,
    SelectFolder,
    AnchorList,
    SlideMenu
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
        activeName: 'title'
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
    // 返回主页
    handleReturnHomePage () {
      this.$router.push('/home')
    },
    // 让获得焦点的按钮失去焦点否则会出现短暂的点击失效
    handlerDrawerClosed () {
      if (document.activeElement) {
        document.activeElement.blur()
      }
    },
    // 选择文件目录
    hanldeSelectFolderPath () {
      // 打开选择目录弹窗
      const { successCode } = this
      ipcEventsHandlerOnce({
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
            this.$error({ message })
          }
        }
      })
    },
    // 左侧菜单被点击事件
    leftMenuClick (name) {
      switch (name) {
        case 'desktop': this.handleReturnHomePage()
          break
        case 'reload': this.handleReloadMarkContent()
          break
        case 'drawer': this.handleOpenDrawerShow()
          break
        case 'folder': this.hanldeSelectFolderPath()
          break
        default: console.error(`Unknow menu name with ... ${name}`)
          break
      }
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
  display: flex;
  height: 100vh;
  background: #f9f9f9;
  .right-contain {
    flex: 1;
  }
}
</style>
