/**
 * @filename: WallPaper.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/12 17:47:44 星期四
 */

<template>

  <hsc-menu-style-white>
  <!-- v-contextmenu:contextmenu -->
    <hsc-menu-context-menu>

      <div class="wrapper-wall-paper">

        <slot></slot>

      </div>
      <!-- <RightClickMenu ref="contextmenu" class="context-menu"></RightClickMenu> -->
      <template slot="contextmenu">
        <hsc-menu-item label="MenuItem 1" />
        <hsc-menu-item label="MenuItem 2" />
        <hsc-menu-item label="MenuItem 2">
          <hsc-menu-item label="MenuItem 4" />
          <hsc-menu-item label="MenuItem 5" />
        </hsc-menu-item>
      </template>
      
    </hsc-menu-context-menu>

  </hsc-menu-style-white>

</template>

<script>
// components
import RightClickMenu from './RightClickMenu.vue'

export default {
  name: 'ns-wall-paper',
  components: {
    RightClickMenu
  },
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
