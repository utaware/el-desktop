/**
 * @filename: LayoutDialog.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/26 11:24:24 星期二
 */

<template>
  <!-- 菜单按钮栏 -->
  <div class="ns-menu-head">

    <!-- 返回按钮 -->
    <PageReturn></PageReturn>
    <!-- 展示目录 -->
    <span v-show="layoutShow.folder">当前目录 : {{ folderPath }}</span>
    <!-- 按钮组 -->
    <el-button-group>
      <!-- 选择目录 -->
      <el-button icon="el-icon-folder-opened" @click="selectDocsPath"></el-button>
     
      <el-button 
        class="layout-btn"
        v-for="(item, index) of layoutShow"
        @click="changeLayout(index, $event)"
        :type="getLayoutButtonType(index)"
        :key="index">
        
        {{ splitFirstLetter(index) }}

      </el-button>

    </el-button-group>

  </div>

</template>

<script>
// ipc
import { showOpenDialog } from '@/utils/ipcRendererHandle'
// vuex
import { mapState, mapMutations } from 'vuex'
// components
import PageReturn from '@/components/common/PageReturn.vue'

export default {
  name: 'ns-menu-head',
  components: {
    PageReturn
  },
  mixins: [],
  inject: ['successCode'],
  watch: {},
  props: {},
  data () {
    return {
      // 选择的目录
      selectFolderPath: ''
    }
  },
  computed: {
    // vuex
    ...mapState('Markview', ['folderPath', 'layoutShow'])
  },
  methods: {
    // vuex
    ...mapMutations('Markview', ['commitFolderPath', 'commitLayoutShow']),
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
    // 提交修改的store内容
    changeLayout (name, $event) {
      $event.target.blur()
      this.commitLayoutShow(name)
    },
    // 按钮类型提示
    getLayoutButtonType (name) {
      return this.layoutShow[name] ? 'default' : 'info'
    },
    // 裁剪第一个文本内容作为按钮展示
    splitFirstLetter (text) {
      return text.split('').shift()
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
// 菜单头部
.ns-menu-head {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .layout-btn {
    text-transform: uppercase;
  }
}
</style>
