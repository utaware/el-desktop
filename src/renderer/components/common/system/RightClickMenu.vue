/**
 * @filename: RightClickMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/13 11:37:10 星期五
 */

<template>

  <v-contextmenu ref="target">

    <v-contextmenu-submenu title="window">

      <v-contextmenu-item @click="handlerWindow">max</v-contextmenu-item>
      <v-contextmenu-item>min</v-contextmenu-item>
      <v-contextmenu-item>close</v-contextmenu-item>

    </v-contextmenu-submenu>
    
    <v-contextmenu-submenu title="docs" icon="el-icon-delete">

      <v-contextmenu-item>Vue</v-contextmenu-item>
      <v-contextmenu-item>Electron</v-contextmenu-item>
      <v-contextmenu-item>Element-UI</v-contextmenu-item>

    </v-contextmenu-submenu>
    
    <v-contextmenu-item>test</v-contextmenu-item>
  
  </v-contextmenu>

</template>

<script>
// electron
import { remote } from 'electron'

export default {
  name: 'ns-right-click-menu',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    // 当前窗口对象
    currentWindow () {
      return remote.getCurrentWindow()
    }
  },
  methods: {
    // 指令绑定中会主动调用ref下的addRef方法, 否则会造成报错
    addRef (data) {
      this.$refs.target.addRef(data)
    },
    handlerWindow () {}
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-right-click-menu {
}
</style>
