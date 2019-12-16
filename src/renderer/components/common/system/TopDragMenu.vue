/**
 * @filename: TopDragMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/13 11:57:15 星期五
 */

<template>
  <!-- https://github.com/ElemeFE/element/blob/dev/packages/scrollbar/src/main.js -->
  <div class="wrapper-top-drag-menu drag-app" v-show="topMenu.need">

    <hsc-menu-style-white v-show="topMenu.show">

      <hsc-menu-bar>
      
        <hsc-menu-bar-item label="File">
      
          <hsc-menu-item label="New" @click="window.alert('New')" />
          <hsc-menu-item label="Open" @click="window.alert('Open')" />
          <hsc-menu-separator />
          <hsc-menu-item label="Save" @click="window.alert('Save')" :disabled="true" />
          <hsc-menu-item label="Export to">
            <hsc-menu-item label="PDF" />
            <hsc-menu-item label="HTML" />
          </hsc-menu-item>
      
        </hsc-menu-bar-item>
      
        <hsc-menu-bar-item label="Edit">
          <hsc-menu-item label="Undo" keybind="meta+z" @click="window.alert('Undo')" />
          <hsc-menu-separator />
          <hsc-menu-item label="Cut" keybind="meta+x" @click="window.alert('Cut')" />
          <hsc-menu-item label="Copy" keybind="meta+c" @click="window.alert('Copy')" />
          <hsc-menu-item
            label="Paste"
            keybind="meta+v"
            @click="window.alert('Paste')"
            :disabled="true"
          />
        </hsc-menu-bar-item>
        <!-- 文档 -->
        <hsc-menu-bar-item label="Docs">

          <hsc-menu-item label="Vue" />
          <hsc-menu-item label="Electron" />
          <hsc-menu-item label="Element-UI" />
          <hsc-menu-item label="Npm" />
          <hsc-menu-item label="Nodejs" />
        
        </hsc-menu-bar-item>
      
      </hsc-menu-bar>
    
    </hsc-menu-style-white>

  </div>

</template>

<script>
// vuex
import { mapState } from 'vuex'

export default {
  name: 'ns-top-drag-menu',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    // vuex
    ...mapState('System', ['topMenu'])
    // 菜单栏显示隐藏
  },
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-top-drag-menu {
  min-height: 2rem;
  .menubar {
    display: flex;
    -webkit-app-region: no-drag;
    .menubaritem {
      width: 8rem;
    }
  }
}

// 隐藏任务栏和外框 -- 拖拽支持
.drag-app {
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  cursor: pointer;
  background: transparentify;
  z-index: 999;
  -webkit-app-region: drag;
}
</style>
