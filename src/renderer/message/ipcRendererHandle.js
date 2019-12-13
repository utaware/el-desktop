// https://www.w3cschool.cn/electronmanual/electronmanual-ipc-renderer.html
import { ipcRenderer } from 'electron'

// 主要的进程通信函数
export function ipcEventsHandlerOnce (options) {

  const { send, callback, ...args } = options

  const on = send + 'Callback'

  ipcRenderer.send(send, {...args, on})

  ipcRenderer.once(on, (event, data) => {
    callback(data)
  })

}

export function ipcEventsHandlerProcessive (options) {

  const { send, callback, events, ...args } = options

  ipcRenderer.send(send, { ...args, on: send })

  for (const methodName in events) {

    ipcRenderer.on(send + methodName, (event, data) => {

      events[methodName](event, data, ipcRenderer)

    })
    
  }

}
