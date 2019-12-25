<template>
  <!-- 入口 -->
  <div id="app">
    <!-- 顶部拖动栏 -->
    <!-- <TopDragMenu v-if="topDragBarShow"></TopDragMenu> -->
    <!-- 右键菜单 -->
    <RightClickMenu>
    <!-- 视图 -->
      <router-view class="application-view"></router-view>

    </RightClickMenu>
    <!-- 壁纸 -->
    <WallPaper></WallPaper>

  </div>

</template>

<script>
// vuex
import { mapState } from 'vuex'
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
  computed: {
    // vuex
    ...mapState('System', ['topDragBarShow', 'bottomMenuShow'])
  },
  mounted () {
    // const $el = document.querySelector('.application-view')
    // $el.addEventListener('contextmenu', (e) => {
    //   const { target } = e
    //   const isLastWrapper = target === $el
    //   console.log(target, $el, target === $el)
    //   if (!isLastWrapper) {
    //     e.stopPropagation()
    //   }
    // }, true)
  },
  created () {}
}
</script>

<style lang="stylus" scoped>
// body背景色
.application-view {
  width: 100vw;
  height: 100vh;
  background: transparent;
}
</style>
