/**
 * @filename: WallPaper.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/12 17:47:44 星期四
 */

<template>

  <div class="wrapper-wall-paper" @click.alt.exact="handlerAltClick">

    <slot></slot>

  </div>

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
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('/static/images/default-bg.jpg') no-repeat center center;
}
</style>
