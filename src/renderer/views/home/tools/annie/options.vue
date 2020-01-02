/**
 * @filename: options.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/26 14:37:41 星期四
 */

<template>

  <div class="wrapper-annie-options">

    <el-input placeholder="请选择cookie文件路径" v-model="cookieFilePath" readonly>
      
      <el-button slot="append" icon="el-icon-document" @click="handleSelectCookieFilePath"></el-button>
    
    </el-input>

  </div>

</template>

<script>
// message
import { ipcEventsHandlerOnce } from '@/message/ipcRendererHandle'
// vuex
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ns-annie-options',
  components: {},
  inject: ['successCode'],
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    // vuex
    ...mapGetters('Annie', ['getAnnieOptions']),
    // cookie file path
    cookieFilePath: {
      get () {
        return this.getAnnieOptions.c
      },
      set (path) {
        this.commitAnnieOptions({ c: path })
      }
    }
  },
  methods: {
    // vuex
    ...mapMutations('Annie', ['commitAnnieOptions']),
    // 选择cookie文件路径
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
            this.cookieFilePath = data
          } else {
            this.$message.error(message)
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

<style lang="stylus" scoped>
.wrapper-annie-options {
}
</style>
