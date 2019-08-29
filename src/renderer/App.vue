<template>
  <!-- 入口 -->
  <div id="app">
    <!-- https://github.com/ElemeFE/element/blob/dev/packages/scrollbar/src/main.js -->
    <el-scrollbar 
      :style="styles"
      :native="false"
      :noresize="noresize"
      :wrapClass="wrapClass"
      :wrapStyle="wrapStyles">
      <!-- 视图 -->
      <div class="drag-app"></div>

      <router-view class="application-view"></router-view>

    </el-scrollbar>

  </div>

</template>

<script>
  export default {
    name: 'el-desktop',
    data () {
      return {
        // 绑定样式
        styles: {
          height: '100vh'
        },
        // 包裹class
        wrapClass: {
          overLimit: true
        },
        // 默认为{}, 实际只有数组和字符串进行处理
        wrapStyles: [
          { overflowX: 'hidden' }
        ],
        viewClass: {},
        viewStyle: {},
        // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        noresize: false,
        tag: 'div'
      }
    }
  }
</script>

<style lang="scss" scoped>
#app {
  background: url('/static/images/default-bg.jpg') no-repeat center center;
  // 隐藏任务栏和外框 -- 拖拽支持
  .drag-app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 2rem;
    cursor: pointer;
    background: transparent;
    z-index: 999;
    -webkit-app-region: drag;
  }
}
</style>
