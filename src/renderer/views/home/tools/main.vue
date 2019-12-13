/**
 * @filename: index.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/04 16:23:09 星期三
 */

<template>
  <!-- 主页面 -->
  <div class="tool-page">

    <header class="header">

      <span>工具</span>

      <el-button @click="handlerReturnHomePage">返回</el-button>

    </header>

  </div>

</template>

<script>
export default {
  name: 'ns-tool-page',
  components: {},
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
}
</style>
