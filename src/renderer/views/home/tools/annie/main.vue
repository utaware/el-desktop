/**
 * @filename: main.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/04 16:35:52 星期三
 */

<template>
  <!-- annie -->
  <div class="annie-container">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      
      <el-tab-pane label="controls" name="controls">

        <AnnieControls></AnnieControls>

      </el-tab-pane>
      
      <el-tab-pane label="options" name="options">

        <AnnieOptions></AnnieOptions>

      </el-tab-pane>
      
      <el-tab-pane label="params" name="params">

        <AnnieParams></AnnieParams>

      </el-tab-pane>
      
    </el-tabs>

  </div>

</template>

<script>
// utils
import { ipcEventsHandlerProcessive } from '@/message/ipcRendererHandle'
// components
import AnnieControls from './controls'
import AnnieOptions from './options'
import AnnieParams from './params'

export default {
  name: 'ns-annie-go',
  components: {
    AnnieControls,
    AnnieOptions,
    AnnieParams
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 多选框
      checked: true,
      checkOptions: {
        i: false,
        p: false,
        o: false,
        f: false
      },
      activeName: 'controls'
    }
  },
  computed: {
    composeCommand () {
      const { checkOptions, mediaAddress } = this
      const { i } = checkOptions
      const command = [
        i ? '-i' : '',
        mediaAddress
      ].filter(v => v)
      return command
    }
  },
  methods: {
    // 执行Annie下载
    handlerAnnieExecute () {
      
    },
    // 查询媒体信息
    handlerSearchMediaInfo () {
      const { mediaAddress } = this
      if (!mediaAddress) {
        return this.$message.error('媒体地址不存在')
      }
      console.log('executeCommand:', this.composeCommand)
      ipcEventsHandlerProcessive({
        send: 'spawnCommand',
        command: 'annie',
        args: this.composeCommand,
        options: { encoding: 'utf8', windowsHide: true },
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
    // 页签点击切换
    handleClick () {}
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// annie
.annie-container {
  margin: 2rem auto;
  width: 50vw;
  padding: 2rem;
  min-width: 35rem;
  background: #fff;
  .form-list {
    list-style: none;
    .item-contain {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;      
      .left-label {
        margin-right: 1rem;
        width: 8rem;
      }
    }
  }
}
</style>
