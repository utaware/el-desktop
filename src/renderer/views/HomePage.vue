<!--
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 18:46:22
 * @LastEditors: utaware
 * @LastEditTime: 2019-08-28 18:32:42
 -->

<template>

  <div class="home-page-components">

    {{ path }}

    <md></md>

  </div>

</template>

<script>
// open
import { openDirectoryDialog } from '@/utils/postMessage.js'
// md
import md from '../mark/1.md'

export default {
  name: 'HomePage',
  components: {
    md
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      path: ''
    }
  },
  computed: {},
  methods: {
    // 图标点击
    handlerClick () {
      openDirectoryDialog({
        type: 'openFile',
        call: this.handleCallback
      })
    },
    // 回调处理
    handleCallback (args, p) {
      this.path = p
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '../assets/css/vuepress.css';
.el-icon-picture {
  font-size: 48px
}
</style>
