/**
 * @filename: controls.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/26 17:04:52 星期四
 */

<template>

  <div class="wrapper-annie-controls">
    <!-- 查询媒体信息 -->
    <div class="query-list">
      <!-- url -->
      <div class="options">

        <label class="label">url</label>

        <el-input class="input" placeholder="请输入媒体地址" v-model="mediaAddress">
          
          <el-button slot="append" icon="el-icon-search" @click="handleGetMediaInfo"></el-button>
        
        </el-input>

      </div>
      <!-- cookie -->
      <el-input placeholder="请选择cookie文件路径" :value="getAnnieOptions.c" readonly>
        
        <el-button slot="append" icon="el-icon-document" @click="handleSelectCookieFilePath"></el-button>
      
      </el-input>
      <!-- playlist -->
      <el-switch :value="getAnnieOptions.p" @input="handleChangeOptions('p', $event)"></el-switch>

    </div>
    <!-- 可下载列表 -->
    <div class="media-list">

      <MediaList :mediaList="mediaList" @download="handleDownloadMedia"></MediaList>

    </div>

  </div>

</template>

<script>
// vuex
import { mapGetters, mapState, mapMutations } from 'vuex'
// message
import { ipcEventsHandlerOnce, ipcEventsHandlerProcessive } from '@/message/ipcRendererHandle'
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
      // 媒体列表
      mediaList: [],
      // 表单对齐方式
      labelPosition: 'left'
    }
  },
  computed: {
    // vuex
    ...mapState('Annie', ['mediaAddress', 'baseCommand']),
    ...mapGetters('Annie', ['getAnnieCommand', 'getAnnieOptions']),
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
    // vuex
    ...mapMutations('Annie', ['commitUpdate', 'commitAnnieOptions']),
    // 查询媒体信息
    handleGetMediaInfo () {
      const { commandCompose, successCode } = this
      ipcEventsHandlerOnce({
        send: 'executeCommand',
        command: commandCompose,
        callback: (res) => {
          const { code, data, message } = res
          if (code === successCode) {
            this.mediaList = this.parseJsonString(data)
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 选择cookie文件
    handleSelectCookieFilePath () {
      const { successCode } = this
      ipcEventsHandlerOnce({
        send: 'showOpenDialog',
        options: {
          title: '选择文件',
          properties: ['openFile']
        },
        callback: (res) => {
          const { code, data, message } = res
          if (code === successCode) {
            this.commitAnnieOptions({ c: data })
          } else {
            this.$message.error(message)
          }
        }
      })
    },
    // 下载媒体
    handleDownloadMedia (mediaItem) {
      const { value } = mediaItem
      const { mediaAddress, baseCommand, getAnnieCommand } = this
      const commandCompose = [
        '-f',
        value,
        getAnnieCommand,
        mediaAddress
      ].join(' ')
      // 流队列
      ipcEventsHandlerProcessive({
        send: 'spawnCommand',
        command: baseCommand,
        args: commandCompose,
        options: { encoding: 'utf8' },
        events: {
          success: (event, res) => {
            console.log('success:', res)
          },
          error: (event, res) => {
            console.log('error:', res)
          },
          close: (event, res) => {
            const { sender } = event
            sender.eventNames().forEach(v => {
              sender.removeAllListeners(v)
            })
          }
        }
      })
    },
    // 转换json信息
    parseJsonString (content) {
      let text = content.replace(/\s/g, '')
      let count = 0
      let result = []
      let pos = 0
      for (let i = 0; i < text.length; i++) {
        text[i] === '{' && count++
        text[i] === '}' && count--
        if (count === 0 && text[i]) {
          result.push(JSON.parse(text.slice(pos, i + 1)))
          pos = i + 1
        }
      }
      return result
    },
    // 修改配置项
    handleChangeOptions (name, value) {
      this.commitAnnieOptions({ [name]: value })
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-annie-controls {
  .query-list {
    .options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        flex: 0 80px;
      }
      .input {
        flex: 1;
      }
    }
  }
}
</style>
