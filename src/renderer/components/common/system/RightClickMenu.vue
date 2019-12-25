/**
 * @filename: RightClickMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/13 11:37:10 星期五
 */

<template>

  <hsc-menu-style-white>

    <hsc-menu-context-menu style="display: block;">
      <!-- 背景图 -->
      <slot></slot>
      <!-- 桌面右键菜单 -->
      <template slot="contextmenu">
        <!-- 窗口操作 -->
        <hsc-menu-item label="window">

          <hsc-menu-item 
            v-for="(item, index) of menu.window"
            :label="item.name"
            :key="index"
            @click="handleBrowserWindowClick(item.method)"/>
        
        </hsc-menu-item>
        <!-- 文档帮助 -->
        <hsc-menu-item label="docs">

          <hsc-menu-item 
            v-for="(item, index) of menu.docs"
            :label="item.name"
            :key="index"
            @click="handleOpenDocsLink(item.link)"/>

        </hsc-menu-item>

        <hsc-menu-item label="MenuItem 2">
          
          <hsc-menu-item label="MenuItem 4" />
          <hsc-menu-item label="MenuItem 5" />

        </hsc-menu-item>

      </template>
      
    </hsc-menu-context-menu>

  </hsc-menu-style-white>

</template>

<script>
// message
import app from '@/message/application'

const { browserWindow } = app

export default {
  name: 'ns-right-click-menu',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 窗口功能列表
      menu: {
        window: [
          { name: 'max', method: 'maximize' },
          { name: 'min', method: 'minimize' },
          { name: 'reload', method: 'reload' },
          { name: 'close', method: 'close' }
        ],
        docs: [
          { name: 'Vue', link: 'https://cn.vuejs.org/' },
          { name: 'Npm', link: 'http://npm.taobao.org/' },
          { name: 'Node', link: 'http://nodejs.cn/api/' },
          { name: 'Github', link: 'https://github.com/' },
          { name: 'Electron', link: 'https://electronjs.org/docs' },
          { name: 'Element', link: 'https://element.eleme.cn/#/zh-CN' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    // 窗口相关事件
    handleBrowserWindowClick (methodName) {
      browserWindow[methodName] && browserWindow[methodName]()
    },
    // 外部打开网址
    handleOpenDocsLink (docsAddress) {
      this.$electron.shell.openExternal(docsAddress)
    }
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
