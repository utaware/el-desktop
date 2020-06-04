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
        <!-- 返回桌面 -->
        <hsc-menu-item label="desktop" @click="handleReturnHomePage"></hsc-menu-item>
        <!-- shell命令 -->
        <hsc-menu-item label="command">

          <hsc-menu-item 
            v-for="(item, index) of menu.command"
            :label="item.name"
            :key="index"
            @click="handleExcuteCommand(item.name)"/>

        </hsc-menu-item>

      </template>
      
    </hsc-menu-context-menu>

  </hsc-menu-style-white>

</template>

<script>
// message
import app from '@/message/application'

import { exec } from 'child_process'

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
        ],
        command: [
          { name: 'calc', describe: '计算器' },
          { name: 'cmd', describe: '命令提示符' },
          { name: 'mspaint', describe: '画图' },
          { name: 'notepad', describe: '记事本' },
          { name: 'explorer', describe: '资源管理器' },
          { name: 'taskmgr', describe: '任务管理器' }
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
    },
    // 回到桌面
    handleReturnHomePage () {
      this.$router.push('/home')
    },
    // 执行命令
    handleExcuteCommand (command) {
      exec(`start ${command}`, (err, stdout, stderr) => {
        if (err) {
          return this.$message.error(err)
        }
      })
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
