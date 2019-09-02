import { ipcRenderer } from 'electron'

export function ipcEventsHandler (options) {
  const { send, args, on, callback } = options
  ipcRenderer.send(send, {...args, on})
  ipcRenderer.on(on, callback)
}

/**
 * @description 选择单个文件夹
 * @author utaware
 * @date 2019-08-27
 * @export
 * @param {*} call 回调函数
 */

export function openSingleDirectoryDialog (callback) {
  ipcEventsHandler({
    send: 'openDirectoryDialog',
    args: { properties: ['openDirectory'] },
    on: 'selectedDirectory',
    callback
  })
}

/**
 * @description 选择单个文件
 * @author utaware
 * @date 2019-09-02
 * @export
 * @param {*} call 回调函数
 */

export function openSingleFileDialog (callback) {
  ipcEventsHandler({
    send: 'openFileDialog',
    args: { properties: ['openFile'] },
    on: 'selectedFile',
    callback
  })
}
