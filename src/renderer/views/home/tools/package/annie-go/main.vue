/**
 * @filename: main.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/04 16:35:52 星期三
 */

<template>

  <div class="annie-go">

    <ul class="form-list">

      <li class="item-contain">

        <el-checkbox class="left-label" v-model="checked" label="媒体地址"></el-checkbox>

        <el-input class="right-input" placeholder="请输入内容" v-model="mediaAddress">

          <el-button slot="append" icon="el-icon-search" @click="handlerSearchMediaInfo"></el-button>

        </el-input>

      </li>

    </ul>

  </div>

</template>

<script>
// utils
import { ipcEventsHandlerProcessive } from '@/message/ipcRendererHandle'

export default {
  name: 'ns-annie-go',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 媒体地址
      mediaAddress: 'av79103230',
      // 多选框
      checked: true,
      checkOptions: {
        i: false,
        p: false,
        o: false,
        f: false
      }
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
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
// annie
.annie-go {
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
