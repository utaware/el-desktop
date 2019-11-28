/**
 * @filename: PageReturn.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/27 17:29:48 星期三
 */

<template>

  <div class="wrapper-page-return">

    <el-button icon="el-icon-arrow-left" @click="handlerClick"></el-button>

  </div>

</template>

<script>
export default {
  name: 'ns-page-return',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 返回上一页面
    handlerClick () {
      this.$router.go(-1)
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.wrapper-page-return {
}
</style>
