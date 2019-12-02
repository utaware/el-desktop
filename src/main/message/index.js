// 注册通信事件
// 事件统一处理
let messageHandlers = {}

const files = require.context('./event', false, /\.js$/)

files.keys().reduce((prev, next) => {

  const fileModule = files(next)

  return Object.assign(prev, fileModule)

}, messageHandlers)

module.exports = (ipcMain) => {

  Object.entries(messageHandlers).forEach(v => {
    const [ name, hanlder ] = v
    ipcMain.on(name, hanlder)
  })

}
