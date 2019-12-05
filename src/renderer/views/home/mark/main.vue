/**
 * @filename: DocsTreePage.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/08/30 15:15:12 星期五
 */

<template>

  <div class="docs-page">
    <!-- 左侧菜单栏 -->
    <SlideMenu class="slide-menu"></SlideMenu>
    <!-- 右侧相关内容 -->
    <router-view class="menu-detail"></router-view>

  </div>

</template>

<script>
// components
import SlideMenu from './package/SlideMenu.vue'

export default {
  name: 'ns-docs-page',
  components: {
    SlideMenu
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 创建仓库文件
    initStoreIns () {
      
    }
  },
  filters: {},
  created () {
    // Gridea
    console.log(this.$route)
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.docs-page {
  // 文档页面
  display: flex;
}
</style>
