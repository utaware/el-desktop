/**
 * @filename: TopDragMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/13 11:57:15 星期五
 */

<template>
  <!-- https://github.com/ElemeFE/element/blob/dev/packages/scrollbar/src/main.js -->
  <div class="wrapper-top-drag-menu drag-app"></div>

</template>

<script>

export default {
  name: 'ns-top-drag-menu',
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
.wrapper-top-drag-menu {
  height: 1.5rem;
}

// 隐藏任务栏和外框 -- 拖拽支持
.drag-app {
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  cursor: pointer;
  background: transparent;
  z-index: 999;
  -webkit-app-region: drag;
}
</style>
