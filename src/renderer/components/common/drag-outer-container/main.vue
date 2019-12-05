/**
 * @filename: main.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/04 16:50:25 星期三
 */

<template>
  <!-- 外框 -->
  <div class="drag-outer-container" :style="defaultStyles">
    <!-- 工具栏 -->
    <div class="tool-menu">

    </div>
    <!-- 内框 -->
    <div class="inner-content">
      <!-- 插槽内容 -->
      <slot></slot>

    </div>

  </div>

</template>

<script>
export default {
  name: 'ns-drag-outer-container',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 默认样式
      defaultStyles: {
        minWidth: '50vw',
        minHeight: '50vh'
      },
      // 自定义主题
      themeClass: 'default'
    }
  },
  computed: {},
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
// 外框容器
.drag-outer-container {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 1rem;
  left: 50%;
  top: 50%;
  border-radius: 0.4rem;
  box-shadow: 0 0 10px 1px rgba(0,0,0,.6);
  // 工具栏
  .tool-menu {
    height: 2rem;
  }
}
</style>
