// https://www.w3cschool.cn/electronmanual/electronmanual-ipc-renderer.html
import { ipcRenderer } from 'electron'

// 主要的进程通信函数
export function ipcEventsHandler (options) {
  const { send, callback, method = 'once', ...args } = options
  const on = send + 'Callback'
  ipcRenderer.send(send, {...args, on})
  ipcRenderer[method](on, (event, data) => {
    callback(data)
  })
}
