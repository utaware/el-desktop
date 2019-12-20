/**
 * @filename: WallPaper.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/12 17:47:44 星期四
 */

<template>

  <!-- 背景图 -->
  <div class="wrapper-wall-paper"></div>

</template>

<script>

export default {
  name: 'ns-wall-paper',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-wall-paper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: url('/static/images/default-bg.jpg') no-repeat center center;
}
</style>
