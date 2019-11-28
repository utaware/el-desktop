// 事件统一处理
let messageHandlers = {}

const files = require.context('../lib', false, /\.js$/)

files.keys().reduce((prev, next) => {

  const fileModule = files(next)

  return Object.assign(prev, fileModule)

}, messageHandlers)

module.exports = messageHandlers
