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
      const route = this.$route
      const currentPath = route.path
      const { matched } = route
      const len = matched.length
      const previousPath = matched[len - 1].path
      const isSamePath = currentPath === previousPath
      if (isSamePath) {
        this.$router.push('/home')
      } else {
        this.$router.go(-1)
      }
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
