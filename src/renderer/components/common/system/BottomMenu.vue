/**
 * @filename: BottomMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/23 22:50:13 星期一
 */

<template>

  <div class="wrapper-bottom-menu">

    <hsc-menu-style-white>

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

export default {
  name: 'ns-bottom-menu',
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
.wrapper-bottom-menu {
}
</style>
