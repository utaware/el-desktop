// http://electronjs.org/docs/api/dialog

const { dialog } = require('electron')

const { successHandler, errorHandler } = require('../utils/handler')

module.exports = {
  // 显示用于打开和保存文件、警报等的本机系统对话框。
  showOpenDialog (event, args) {

    const { options, on } = args
    // 打开弹框
    dialog.showOpenDialog(options).then(result => {

      const { canceled, filePaths } = result

      const copyPaths = [].concat(filePaths)

      const { properties: { multiSelections = false } } = options

      const selected = canceled ? null : multiSelections ? copyPaths : copyPaths.shift()

      successHandler(event, on, { data: selected })

    }).catch(error => {

      errorHandler(event, on, { error })

    })

  }

}
