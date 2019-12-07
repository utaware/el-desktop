/**
 * @filename: SelectFolder.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/07 17:12:32 星期六
 */

<template>
  <!-- 选择文件夹目录 -->
  <div class="wrapper-select-folder">
    <!-- 当前目录 -->
    <div>
      
      <h3>当前目录 :</h3>

      {{ folderPath }}
    
    </div>
    <!-- 分割线 -->
    <hr>
    <!-- 选择目录 -->
    <div class="enter-container">

      <el-button-group>
      
        <el-button icon="el-icon-folder-opened" @click="hanldeSelectFolderPath">选择目录</el-button>

        <el-button class="folder-path" icon="el-icon-document-copy" @click="handleCopyCurrentPath" :data-clipboard-text="folderPath">复制路径</el-button>
      
      </el-button-group>

    </div>

  </div>

</template>

<script>
// ipc
import { ipcEventsHandler } from '@/message/ipcRendererHandle'
// vuex
import { mapState, mapMutations } from 'vuex'
// clipboard
import ClipboardJS from 'clipboard'

export default {
  name: 'ns-select-folder',
  components: {},
  mixins: [],
  inject: ['successCode'],
  watch: {},
  props: {},
  data () {
    return {
      currentFolder: ''
    }
  },
  computed: {
    // vuex
    ...mapState('Markview', ['folderPath'])
  },
  methods: {
    // vuex
    ...mapMutations('Markview', ['commitFolderPath']),
    // 复制路径
    handleCopyCurrentPath () {

    },
    // 选择目录
    hanldeSelectFolderPath () {
      // 打开选择目录弹窗
      const { successCode } = this
      ipcEventsHandler({
        send: 'showOpenDialog',
        options: {
          properties: ['openDirectory']
        },
        callback: (res) => {
          const { data, code, message } = res
          console.log('menuHead', res)
          if (code === successCode) {
            if (data) {
              this.commitFolderPath(data)
            }
          } else {
            this.$error({ message })
          }
        }
      })
    }
  },
  filters: {},
  created () {
    this.clipboard = new ClipboardJS('.folder-path')
  },
  mounted () {},
  beforeDestroy () {
    this.clipboard.destroy()
  }
}
</script>

<style lang="stylus" scoped>
.wrapper-select-folder {
  padding: 0 1rem;
  .enter-container {
    margin-top: 1rem;
    text-align: center;
  }
}
</style>
