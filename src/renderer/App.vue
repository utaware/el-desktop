<template>
  <!-- 入口 -->
  <div id="app">
    <!-- https://github.com/ElemeFE/element/blob/dev/packages/scrollbar/src/main.js -->
    <div class="drag-app"></div>
    <!-- 视图 -->
    <router-view class="application-view"></router-view>

  </div>

</template>

<script>
export default {
  name: 'el-desktop',
  provide: {
    successCode: 1,
    errorCode: 0
  },
  data () {
    return {}
  },
  methods: {},
  created () {
    const log = window.console.log
    window.console.$log = function (params) {
      for (const key in params) {
        log(`${key}:`, params[key])
      }
    }
    window._vue = this
  }
}
</script>

<style lang="scss" scoped>
#app {
  // 隐藏任务栏和外框 -- 拖拽支持
  .drag-app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 1rem;
    cursor: pointer;
    background: transparent;
    z-index: 999;
    -webkit-app-region: drag;
  }
}
</style>
