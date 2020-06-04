/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 17:52:38
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-19 10:33:28
 */
'use strict'

const { app, BrowserWindow, ipcMain } = require('electron')

// remote模块相关的信息交互
require('./module')(app)
// gui相关的原生ipc信息交互
require('./message')(ipcMain)
// store相关内容存储
require('./store')(app)
// 服务脚本
require('./server/app')

// 忽略安全警告
if (process.env.NODE_ENV === 'development') {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
}

// console.log(process.versions)

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options https://electronjs.org/docs/tutorial/security
   */
  // https://electronjs.org/docs/api/frameless-window
  const { screen } = require('electron')
  
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width,
    height,
    useContentSize: true,
    // 无边框
    // titleBarStyle: 'customButtonsOnHover',
    // transparent: true,
    // 创建无边框窗口
    frame: false,
    // 隐藏顶部菜单栏
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// const menuOptions = require('./menuOptions')

// app.on('ready', () => {
//   const appMenu = Menu.buildFromTemplate(menuOptions)
//   Menu.setApplicationMenu(appMenu)
// })

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
const { autoUpdater } = require('electron-updater')

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
