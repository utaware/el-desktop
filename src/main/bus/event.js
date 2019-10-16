// 事件统一处理
const openDialog = require('../lib/dialog')
const handleFiles = require('../lib/files')

module.exports = {
  ...openDialog,
  ...handleFiles
}
