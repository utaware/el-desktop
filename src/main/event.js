// 事件统一处理

import { dialog } from 'electron'

export function openDirectoryDialog (event, args) {
  // 选择文件夹或者文件
  const { properties, on } = args
  // 打开弹框
  dialog.showOpenDialog({ properties }, function (files) {
    // 如果有选中
    if (files) {
      // 发送选择的对象给子进程
      event.sender.send(on, files[0])
    }
  })
  // end
}
