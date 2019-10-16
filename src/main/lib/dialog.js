// http://electronjs.org/docs/api/dialog

const { dialog } = require('electron')

module.exports = {
  // 打开选择文件夹或者文件弹框
  showOpenDialog (event, args) {

    const { properties, on } = args
    // 打开弹框
    dialog.showOpenDialog({ properties }, function (files) {

      if (files) {

        event.sender.send(on, files[0])

      }

    })

  }

}
