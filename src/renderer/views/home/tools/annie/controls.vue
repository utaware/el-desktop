/**
 * @filename: controls.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/26 17:04:52 星期四
 */

<template>

  <div class="wrapper-annie-controls">

    <div class="media-address">

      <el-input placeholder="请输入内容" v-model="mediaAddress" :disabled="disabled">
        
        <el-button slot="append" icon="el-icon-search" @click="handleGetMediaInfo"></el-button>
      
      </el-input>

    </div>

  </div>

</template>

<script>

const { remote } = require('electron')

const { shelljs } = remote.app

export default {
  name: 'ns-annie-controls',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 媒体地址
      mediaAddress: 'av79103230'
    }
  },
  computed: {
    // 命令名称
    baseCommand () {
      return 'annie'
    },
    // annie命令是否存在
    annieIsExist () {
      return shelljs.which(this.baseCommand)
    },
    // 是否禁用功能
    disabled () {
      return !this.annieIsExist
    },
    // annie 参数拼接
    commandCompose () {
      const { mediaAddress, baseCommand } = this
      const commandList = [
        baseCommand,
        '-i',
        mediaAddress
      ]
      return commandList.join(' ')
    }
  },
  methods: {
    // 查询媒体信息
    handleGetMediaInfo () {
      
      const { mediaAddress, commandCompose } = this
      
      if (!mediaAddress) {
        shelljs.echo('Media address not found')
        return false
      }

      console.log(commandCompose)

      const process = shelljs.exec(commandCompose)

      console.log(process)
      
      if (!process || process.code !== 0) {
        shelljs.echo('Annie command Execute failed')
        shelljs.exit(1)
        return false
      }
      
    }
  },
  filters: {},
  created () {
    console.log(remote)
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-annie-controls {
}
</style>
