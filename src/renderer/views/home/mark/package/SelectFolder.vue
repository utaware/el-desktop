/**
 * @filename: SelectFolder.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/07 17:12:32 星期六
 */

<template>
  <!-- 选择文件夹目录 -->
  <div class="wrapper-select-folder">

    <el-input placeholder="请选择目录" v-model="folderPath" readonly>
      
      <template slot="prepend">

        <el-button icon="el-icon-folder-opened" @click="hanldeSelectFolderPath"></el-button>

      </template>

      <template slot="append">

        <el-button class="folder-path" icon="el-icon-document-copy" :data-clipboard-text="folderPath"></el-button>

      </template>
    
    </el-input>

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
    return {}
  },
  computed: {
    // vuex
    ...mapState('Markview', ['folderPath'])
  },
  methods: {
    // vuex
    ...mapMutations('Markview', ['commitFolderPath']),
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
// 选择目录
.wrapper-select-folder {
  margin-right: 2rem;
  width: 30rem;
}
</style>
