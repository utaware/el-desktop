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
export function showOpenDialog ({ callback, options }) {
  ipcEventsHandler({
    send: 'showOpenDialog',
    options,
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

// 读取md文件渲染成html字符串
export function markdownRenderWithMd ({ path, callback }) {
  ipcEventsHandler({
    send: 'markdownRenderWithMd',
    filePath: path,
    callback
  })
}

// 读取code文件渲染成fence代码块
export function markdownRenderWithCode (options) {
  const {
    currentFilePath, // 当前md文档路径
    codeRelativePath, // 引用的代码相对路径
    params = [], // 其他参数
    callback
  } = options
  ipcEventsHandler({
    send: 'markdownRenderWithCode',
    currentFilePath,
    codeRelativePath,
    params,
    callback
  })
}

// 执行命令
export function executeCommand ({ command, options, callback }) {
  ipcEventsHandler({
    send: 'executeCommand',
    command,
    options,
    callback
  })
}
