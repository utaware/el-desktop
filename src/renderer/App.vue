<template>
  <!-- 入口 -->
  <div id="app">
    <!-- 顶部拖动栏 -->
    <TopDragMenu></TopDragMenu>
    <!-- 右键菜单 -->
    <RightClickMenu></RightClickMenu>
    <!-- 壁纸 -->
    <WallPaper>
    <!-- 视图 -->
      <router-view class="application-view"></router-view>

    </WallPaper>

  </div>

</template>

<script>
// components
import TopDragMenu from '@common/system/TopDragMenu.vue'
import RightClickMenu from '@common/system/RightClickMenu.vue'
import WallPaper from '@common/system/WallPaper.vue'

export default {
  name: 'el-desktop',
  components: {
    WallPaper,
    TopDragMenu,
    RightClickMenu
  },
  provide: {
    successCode: 1,
    errorCode: 0
  },
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>

<style lang="stylus" scoped>

</style>
