import { remote } from 'electron'

class BrowserWindow {
  // 获取当前网页所属的窗口
  getCurrentWindow () {
    return remote.getCurrentWindow()
  }
  // 窗口最大化
  maximize () {
    this.win.maximize()
  }
  // 窗口最小化
  minimize () {
    this.win.minimize()
  }
  // 刷新
  reload () {
    this.win.reload()
  }
  // 隐藏窗口
  hide () {
    this.win.hide()
  }
  // 显示窗口
  show () {
    this.win.show()
  }
  // 关闭窗口
  close () {
    this.win.close()
  }
  get win () {
    return this.getCurrentWindow()
  }
}

export default new BrowserWindow()
