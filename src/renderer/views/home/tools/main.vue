/**
 * @filename: index.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/04 16:23:09 星期三
 */

<template>
  <!-- 主页面 -->
  <div class="tool-page" @contextmenu="handleContextmenu">

    <header class="header">

      <span>工具</span>

      <el-button @click="handlerReturnHomePage">返回</el-button>

    </header>

    <div class="form">

      <Annie></Annie>
    
    </div>

  </div>

</template>

<script>
// components
import Annie from './package/annie-go/main'

export default {
  name: 'ns-tool-page',
  components: {
    Annie
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    handlerReturnHomePage () {
      this.$router.push('/home')
    },
    handleContextmenu () {
      console.log('handleContextmenu')
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// 相关工具选择
.tool-page {
  .header {
    display: flex;
    justify-content: space-between;
  }
  .form {
    margin: 0 auto;
    padding: 2rem;
    width: 540px;
    background: #fff;
  }
}
</style>
