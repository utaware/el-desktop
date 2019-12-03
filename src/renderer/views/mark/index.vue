/**
 * @filename: DocsTreePage.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/08/30 15:15:12 星期五
 */

<template>

  <div class="wrapper-docs-tree-page">
    <!-- 头部菜单栏 -->
    <MenuHead></MenuHead>

    <!-- 中间树和内容 -->
    <div class="docs-body">

      <!-- 文档树 -->
      <DocsTree v-show="layoutShow.tree"></DocsTree>

      <!-- 选择的文本内容 -->
      <MarkdownLoader class="mark-content" v-show="layoutShow.mark"></MarkdownLoader>

    </div>

  </div>

</template>

<script>
// components
import MarkdownLoader from './package/MarkdownLoader.vue'
import DocsTree from './package/DocsTree.vue'
import MenuHead from './package/MenuHead.vue'
// vuex
import { mapState } from 'vuex'

export default {
  name: 'ns-docs-tree-page',
  components: {
    MarkdownLoader,
    DocsTree,
    MenuHead
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    // vuex
    ...mapState('Markview', ['layoutShow'])
  },
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.wrapper-docs-tree-page {
  // 中间部分 树 + 内容
  min-width: 800px;
  padding: 1rem;
  .docs-body {
    display: flex;
    border-radius: 0.5rem;
    // markdown 内容
    .mark-content {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
