// 事件统一处理
const dialog = require('../lib/dialog')
const files = require('../lib/files')
const command = require('../lib/command')

module.exports = {
  ...dialog,
  ...files,
  ...command
}
