// 注册通信事件
// 事件统一处理
// handle
// const { successHandler, errorHandler } = require('./handler')

const files = require.context('./event', false, /\.js$/)

const messageHandlers = require('./handler')

const eventHandlers = files.keys().reduce((prev, next) => {

  const fileModule = files(next)

  return Object.assign(prev, fileModule)

}, {})

module.exports = (ipcMain) => {

  const events = Object.assign({}, messageHandlers, eventHandlers)
  
  Object.entries(events).forEach(([name, method]) => {

    ipcMain.on(name, method)

  })

}
