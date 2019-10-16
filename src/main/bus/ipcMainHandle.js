// 主线程 - 渲染进程 事件通信

const { ipcMain } = require('electron')

const eventLoop = require('./event.js')

module.exports = () => {

  for (const name in eventLoop) {

    ipcMain.on(name, eventLoop[name])

  }

}
