// 主线程 - 渲染进程 事件通信

import { ipcMain } from 'electron'

import * as event from './event.js'

export function bindEvent () {
  // 循环
  for (const name in event) {
  // 绑定一系列事件
    ipcMain.on(name, event[name])
  }
  // console.log('bindEvent')
}
