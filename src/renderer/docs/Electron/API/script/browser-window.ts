// 自动播放策略
enum AutoplayPolicyOptions {
  'no-user-gesture-required',
  'user-gesture-required',
  'document-user-activation-required'
}
// 窗口标题栏的样式
enum TitleBarStyleOptions {
  'default', // 标准灰色不透明的Mac标题栏
  'hidden', // 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
  'hiddenInset', // 隐藏标题栏, 显示小的控制按钮在窗口边缘
  'customButtonsOnHover' // 此选项目前是实验性的
}
// 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效
enum VibrancyOptions {
  'appearance-based',
  'light',
  'dark',
  'titlebar',
  'selection',
  'menu',
  'popover',
  'sidebar',
  'medium-light',
  'ultra-dark',
  'header',
  'sheet',
  'window',
  'hud',
  'fullscreen-ui',
  'tooltip',
  'content',
  'under-window',
  'under-page'
}
// 网页功能的设置
interface webPreferencesOptions {
  // 是否开启 DevTools.(如果设置为 false, 则无法使用 )
  devTools ?: boolean = true,
  // 是否集成Node
  nodeIntegration ?: boolean = false,
  // 是否在Web工作器中启用了Node集成.
  nodeIntegrationInWorker ?: boolean = false,
  // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
  // 预先加载的脚本会被注入到每一个iframe
  // 你可以用 process.isMainFrame 来判断当前是否处于主框架
  nodeIntegrationInSubFrames ?: boolean = false,
  // 在页面运行其他脚本之前预先加载指定的脚本
  // 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径
  // 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志
  preload ?: string,
  // 如果设置该参数, 沙箱的渲染器将与窗口关联
  // 使它与Chromium OS-level 的沙箱兼容, 并禁用 Node. js 引擎
  // 且预加载脚本的 API 也有限制.
  // 实验性质，可能会在 Electron 未来的版本中移除
  sandbox ?: boolean = false,
  // 是否启用 Remote 模块
  enableRemoteModule ?: boolean = true,
  // 设置页面的 session 而不是直接忽略 Session 对象
  // 也可用 partition 选项来代替，它接受一个 partition 字符串.
  // 同时设置了session 和 partition时, session 的优先级更高
  session ?: Session,
  // 通过 session 的 partition 字符串来设置界面session
  // 如果 partition 以 persist:开头, 该页面将使用持续的 session
  // 并在所有页面生效，且使用同一个partition
  // 果没有 persist: 前缀, 页面将使用 in-memory session.
  // 通过分配相同的 partition, 多个页可以共享同一会话
  partition ?: Session,
  // 当指定，具有相同affinity 的 web页面将在相同的渲染进程运行
  // 需要注意的是，由于渲染过程中会有代码重用，如 webPreferences的preload, sandbox 和 nodeIntegration
  // 等选项会在不同页面之间共用，即使你已经在不同页面中为同一选项设置过不同的值，它们仍会被共用。
  affinity ?: string,
  // 页面的默认缩放系数
  zoomFactor ?: number = 1.0,
  // 是否启用 JavaScript 支持
  javascript ?: boolean = true,
  // 当设置为 false, 它将禁用同源策略
  // 如果此选项不是由开发者设置的，还会把 allowRunningInsecureContent设置为 true
  webSecurity ?: boolean = true,
  // 允许一个 https 页面运行 http url 里的资源
  allowRunningInsecureContent ?: boolean = false,
  // 启动图像支持
  images ?: boolean = true,
  // 让 TextArea 元素可以调整大小
  textAreasAreResizable ?: boolean = true,
  // 启用 WebGL 支持
  webgl ?: boolean = true,
  // 是否支持插件
  plugins ?: boolean = false,
  // 启用 Chromium 的实验功能. 默认值为 false
  experimentalFeatures ?: boolean = false,
  // 在 macOS 启用弹力动画 (橡皮筋) 效果.
  scrollBounce ?: boolean = false,
  // 分隔的需要启用的特性列表，譬如CSSVariables,KeyboardEventKey
  // 在 RuntimeEnabledFeatures.json5文件中查看被支持的所有特性
  enableBlinkFeatures :? string,
  disableBlinkFeatures :? string,
  // 设置 font-family 的默认字体.
  defaultFontFamily :? object = {
    standard: 'Times New Roman',
    serif: 'Times New Roman',
    sansSerif: 'Arial',
    monospace: 'Courier New',
    cursive: 'Script',
    fantasy: 'Impact'
  },
  // 默认字体大小
  defaultFontSize :? number = 16,
  // 默认空白大小
  defaultMonospaceFontSize :? = 13,
  // 最小字号
  minimumFontSize :? number = 0,
  // 默认编码
  defaultEncoding :? string = 'ISO-8859-1',
  // 是否在页面成为背景时限制动画和计时器
  backgroundThrottling ?: boolean = true,
  // 是否绘制和渲染可视区域外的窗口 (参考离屏渲染)
  offscreen ?: boolean = false,
  // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本
  // 在加载可能不受信任的远程内容时, 应使用此选项
  // 以确保加载的内容不能篡改 preload 脚本和使用的 Electron APIs。
  contextIsolation ?: boolean = false,
  // 是否使用原生的window.open()
  nativeWindowOpen ?: boolean = false,
  // 是否启用 <webview> tag标签.
  // 应确保远程或不受信任的内容无法创建恶意的 preload 脚本
  webviewTag ?: boolean = false,
  // 一系列将会被附加至此app的渲染进程的process.argv的字符串
  // 对于将少量数据向下传至渲染进程的预加载脚本而言是十分实用的.
  additionalArguments ?: string,
  // 是否启用浏览器样式的持续对话框保护
  safeDialogs ?: boolean = false,
  // 当持续对话框保护被触发时显示的消息
  safeDialogsMessage ?: string,
  // 将文件或链接拖放到页面上时是否触发页面跳转
  navigateOnDragDrop ?: boolean = false,
  // 上下文窗口中的自动播放策略
  autoplayPolicy ?: AutoplayPolicyOptions = 'no-user-gesture-required',
  // 是否阻止在进入HTML全屏时调整窗口大小
  disableHtmlFullscreenWindowResize ?: boolean = false
}
// 创建和控制浏览器窗口
interface BrowserWindowOptions {
  // 窗口的宽高度
  width ?: number = 800,
  height ?: number = 600,
  // 窗口位置
  x ?: number,
  y ?: number,
  // width 和 height 将设置为 web 页面的尺寸
  useContentSize ?: boolean = false,
  // 窗口在屏幕居中
  center ?: boolean,
  // 窗口的最小宽高度
  minWidth ?: number = 0,
  minHeight ?: number = 0,
  // 窗口的最大宽高度
  maxWidth ?: number = Infinity,
  maxHeight ?: number = Infinity,
  // 窗口是否可以改变尺寸
  resizable ?: boolean = true,
  // 窗口是否可以移动. 在 Linux 中无效.
  movable ?: boolean = true,
  // 窗口是否可以最大、小化. 在 Linux 中无效. 
  minimizable ?: boolean = true,
  maximizable ?: boolean = true,
  // 窗口是否可以关闭. 在 Linux 中无效
  closable ?: boolean = true,
  // 窗口是否可以聚焦.
  // 在 Windows 中设置 focusable: false 也意味着设置了skipTaskbar: true
  // 在 Linux 中设置 focusable: false 时窗口停止与 wm 交互, 并且窗口将始终置顶
  focusable ?: boolean = true,
  // 窗口是否永远在别的窗口的上面. 
  alwaysOnTop ?: boolean = false,
  // 窗口是否全屏
  // 当明确设置为 false 时，在 macOS 上全屏的按钮将被隐藏或禁用
  fullscreen ?: boolean = false,
  // 窗口是否可以进入全屏状态
  // 在 macOS上, 最大化/缩放按钮是否可用
  fullscreenable ?: boolean = true,
  // 在 macOS 上使用 pre-Lion 全屏
  simpleFullscreen ?: boolean = false,
  // 是否在任务栏中显示窗口
  skipTaskbar ?: boolean = false,
  // kiosk 模式
  kiosk ?: boolean = false,
  // 默认窗口标题
  // 如果由loadURL()加载的HTML文件中含有标签<title>，此属性将被忽略。
  title ?: string = 'Electron',
  // 窗口的图标
  // 在 Windows 上推荐使用 ICO 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
  icon ?: string,
  // 窗口创建的时候是否显示
  show ?: boolean = true,
  // 初始化隐藏
  paintWhenInitiallyHidden ?: boolean = true,
  // 设置为 false 时可以创建一个Frameless Window(无边框窗口)
  frame ?: boolean = true,
  // 指定父窗口
  parent ?: object = null,
  // 是否为模态窗
  modal ?: boolean = false,
  // 是否允许单击页面来激活窗口.
  acceptFirstMouse ?: boolean = false,
  // 是否在输入时隐藏鼠标
  disableAutoHideCursor ?: boolean = false,
  // 自动隐藏菜单栏, 除非按了Alt键. 
  autoHideMenuBar ?: boolean = false,
  // 是否能超过屏幕尺寸
  enableLargerThanScreen ?: boolean = false,
  // 窗口的背景颜色为十六进制值
  // 设置transparent为true方可支持alpha属性
  // 格式为#AARRGGBB
  backgroundColor : string = '#FFF',
  // 窗口是否有阴影. (macOs)
  hasShadow ?: boolean = true,
  // 设置窗口初始的不透明度 (macOs, windows)
  // 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间
  opacity ?: number,
  // 强制窗口使用 dark 主题
  // 只在一些拥有 GTK+3 桌面环境上有效
  darkTheme ?: boolean = false,
  // 使窗口透明
  transparent ?: boolean = false,
  // 窗口的类型
  // 选项的可能值和行为与平台相关。可能的值为:
  // 在 Linux 上, 可能的类型有 desktop、dock、toolbar、splash、notification。
  // 在 macOS, 可能的类型是 desktop, textured.
  // 在 Windows 上, 可能的类型为 toolbar.
  type ?: string = 'default',
  // 窗口标题栏的样式
  titleBarStyle ?: TitleBarStyleOptions = 'default',
  // 在 macOS 全屏模式时，为所有带 titleBarStyle 选项的标题栏显示标题
  fullscreenWindowTitle ?: boolean = false,
  // 对 Windows 上的无框窗口使用WS_THICKFRAME 样式
  thickFrame ?: boolean = true,
  // 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效
  vibrancy ?: VibrancyOptions,
  // 单击工具栏上的绿色信号灯按钮或单击 窗口>缩放 菜单项时的行为, 仅macOS中有效.
  zoomToPageWidth ?: boolean = false,
  // 选项组卡的名称(macOS)
  tabbingIdentifier ?: string,
  // 网页功能的设置
  webPreferences ?: webPreferencesOptions
}
// 实例事件
enum BrowserWindowEvents {
  // 文档更改标题时触发
  'page-title-updated',
  // 在窗口要关闭的时候触发
  // 它在DOM 的beforeunload 和 unload 事件之前触发
  'close',
  // 窗口已经关闭时触发。
  'closed',
  // 因为强制关机或机器重启或会话注销而导致窗口会话结束时触发 windows
  'session-end-windows',
  // 网页变得未响应时触发
  'unresponsive'
  // 未响应的页面变成响应时触发
  'responsive'
  // 当窗口失去焦点时触发
  'blur'
  // 当窗口获得焦点时触发
  'show'
  // 当窗口隐藏时触发
  'hide'
  // 当页面已经渲染完成(但是还没有显示) 并且窗口可以被显示时触发
  'ready-to-show'
  // 窗口最大化时触发
  'maximize',
  // 当窗口从最大化状态退出时触发
  'unmaximize',
  // 窗口最小化时触发
  'minimize',
  // 当窗口从最小化状态恢复时触发
  'restore',
  // 在调整窗口大小之前发出
  'will-resize', // (Event, Rectangle)
  // 调整窗口大小后触发
  'resize',
  // 仅在手动调整窗口大小时才会发出此信息
  // 使用setBounds 或 setSize调整窗口大小时不会发出此事件。
  'will-move', // windows
  // 窗口移动到新位置时触发
  'move', // macOS
  // 当窗口移动到新位置时触发一次
  'moved',
  // 窗口进入全屏状态时触发
  'enter-full-screen',
  // 窗口离开全屏状态时触发
  'leave-full-screen',
  // 窗口进入由HTML API 触发的全屏状态时触发
  'enter-html-full-screen',
  // 窗口离开由HTML API触发的全屏状态时触发
  'leave-html-full-screen',
  // 设置或取消设置窗口总是在其他窗口的顶部显示时触发。
  'always-on-top-changed',
  // 请求一个应用程序命令时触发
  // 典型的是键盘上的媒体键或浏览器命令
  // 以及在Windows上的一些鼠标中内置的“后退”按钮。
  'app-command',
  // 滚轮事件阶段开始时触发
  'scroll-touch-begin', // macOS
  // 滚轮事件阶段结束时触发
  'scroll-touch-end', // macOS
  // 滚轮事件阶段到达元素边缘时触发
  'scroll-touch-edge', // macOS
  // 三指拖移时触发，可选的方向为 up, right, down, left.
  'swipe', // macOS
  // 旋转手势触发
  'rotate-gesture' // macOS
  // 窗口打开sheet(工作表) 时触发
  'sheet-begin', // macOS
  // 窗口关闭sheet(工作表) 时触发
  'sheet-end', // macOS
  // 当点击了系统的新标签按钮时触发
  'new-window-for-tab' // macOS
}
interface BrowserWindowIns {
  // 构造函数
  constructor (options: BrowserWindowOptions): window,
  
}
