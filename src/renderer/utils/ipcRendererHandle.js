// https://www.w3cschool.cn/electronmanual/electronmanual-ipc-renderer.html
import { ipcRenderer } from 'electron'

// 主要的进程通信函数
export function ipcEventsHandler (options) {
  const { send, callback, method = 'once', ...args } = options
  const on = send + 'Callback'
  ipcRenderer.send(send, {...args, on})
  ipcRenderer[method](on, callback)
}

// 打开对话框 显示用于选择多个文件和目录的对话框的示例:
export function showOpenDialog ({ callback, properties }) {
  ipcEventsHandler({
    send: 'showOpenDialog',
    properties,
    callback
  })
}

// 读取文件夹相关信息
export function readFileFolderPath ({ path, callback }) {
  ipcEventsHandler({
    send: 'readFileFolderPath',
    dirPath: path,
    callback
  })
}

// 读取文件夹信息
export function readFileContent ({ path, callback }) {
  ipcEventsHandler({
    send: 'readFileContent',
    filePath: path,
    callback
  })
}
