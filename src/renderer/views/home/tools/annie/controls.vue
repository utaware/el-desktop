/**
 * @filename: controls.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/26 17:04:52 星期四
 */

<template>

  <div class="wrapper-annie-controls">
    <!-- 查询媒体信息 -->
    <div class="media-address">

      <el-input placeholder="请输入媒体地址" v-model="mediaAddress">
        
        <el-button slot="append" icon="el-icon-search" @click="handleGetMediaInfo"></el-button>
      
      </el-input>

    </div>
    <!-- 可下载列表 -->
    <div class="media-list">

      <MediaList :mediaList="mediaList"></MediaList>

    </div>

  </div>

</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// message
import { ipcEventsHandlerOnce } from '@/message/ipcRendererHandle'
// components
import MediaList from './list.vue'

export default {
  name: 'ns-annie-controls',
  components: {
    MediaList
  },
  inject: ['successCode'],
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 媒体地址
      mediaAddress: 'ep307056',
      // 媒体列表
      mediaList: []
    }
  },
  computed: {
    // vuex
    ...mapGetters('Annie', ['getAnnieCommand']),
    // 命令名称
    baseCommand () {
      return 'annie'
    },
    // annie 参数拼接
    commandCompose () {
      const { mediaAddress, baseCommand, getAnnieCommand } = this
      const commandList = [
        baseCommand,
        '-j',
        getAnnieCommand,
        mediaAddress
      ]
      return commandList.join(' ')
    }
  },
  methods: {
    // 查询媒体信息
    handleGetMediaInfo () {
      const { commandCompose, successCode } = this
      ipcEventsHandlerOnce({
        send: 'executeCommand',
        command: commandCompose,
        callback: (res) => {
          const { code, data, message } = res
          if (code === successCode) {
            const list = this.parseJsonString(data)
            const isArray = Array.isArray(list)
            this.mediaList = isArray ? list : [ list ]
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 转换json信息
    parseJsonString (content) {
      return JSON.parse(content)
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-annie-controls {
}
</style>
