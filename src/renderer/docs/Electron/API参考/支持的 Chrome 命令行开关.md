# 支持的 Chrome 命令行开关

> Electron支持的命令行开关.

```js
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // 你的代码
})
```

## --ignore-connections-limit=domains

忽略由,分割的domains列表的连接限制.

## --disable-http-cache

禁用HTTP请求的磁盘缓存.

## --disable-http2

禁用HTTP/2和SPDY/3.1协议.

## --lang

设置系统语言环境

## --inspect=port and --inspect-brk=port

调试相关的标识, 更多详细信息请查看 [Debugging the Main Process](https://electronjs.org/docs/tutorial/debugging-main-process)指南.

## --remote-debugging-port=port

在指定端口开启HTTP远程调试.

## --disk-cache-size=size

强制磁盘缓存使用的最大磁盘空间（以字节为单位）。

## --js-flags=flags
  
指定传递给Node JS引擎的标志. 如果你想在主进程中启用flags, 则必须在启动Electron时传递.
  

```
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

访问Node documentation文档或者在终端中运行node --help命令查看可用的标志列表. 此外，还可以运行node --v8-options来查看与Node的V8 JavaScript引擎特定相关的flags列表。

## --proxy-server=address:port

使用指定的覆盖系统设置的代理服务器. 这个开关只影响HTTP协议请求, 包括HTTPS和WebSocket请求. 值得注意的是并不是所有的代理服务器都支持HTTPS和WebSocket请求. 代理 URL 不支持用户名和密码认证方式 Chromium 的问题。

## --proxy-bypass-list=hosts

指示 Electron绕过给定的分号分隔的代理服务器主机列表. 这个标志只有在与--proxy-server配合使用时才会生效。

例如：

```js
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

上面的代码, 除了本地地址(localhost,127.0.0.1等等.), google.com子域名, 包含foo.com后缀的主机地址, 以及任何在1.2.3.4:5678上的地址以外的所有主机都将使用代理服务器.

## --proxy-pac-url=url

在指定url中使用PAC脚本.

一个PAC文件其实就是一个文本文件，最简单的格式就是包含一个叫FindProxyForURL的JScript函数，IE通过传入两个变量来调用这个函数，一个是用户浏览的地址URL全路经，一个是这个URL中的主机名部分(host)。

这个FindProxyForURL函数有三种可能的字符串返回值，一是"DIRECT"，就是直接连接，不通过代理；二是"PROXY proxyaddr:port"，其中proxyaddr和port分别是代理的地址和代理的端口；三是"SOCKS socksaddr:port"，其中socksaddr和port分别是socks代理的地址和端口，一个自动代理文件可以是多个选择的组合，其中用分号(;)隔开

## --no-proxy-server

不要使用代理服务器，并始终直接连接. 覆盖传递的任何其他代理服务器标志。

## --host-rules=rules

以逗号分隔的rules列表，用于控制主机名的映射方式

* MAP * 127.0.0.1 强制将所有主机名映射到127.0.0.1
* MAP *.google.com proxy 强制所有google.com子域名解析到"proxy".
* MAP test.com \[::1\]:77 强制"test.com"解析为IPv6环回地址. 也将强制生成的套接字地址端口为77.
* MAP * baz, EXCLUDE www.google.com 把所有地址重新映射到“baz”, 除了"www.google.com".

这些映射适用于网络请求中的端点主机. 网络请求包括TCP连接和直连的主机解析器, 以及HTTP代理连接中的CONNECT方式, 以及在SOCKS代理连接中的端点主机.

## --host-resolver-rules=rules

与--host-rules类似, 但是这些rules仅适用于主机解析器.

## --auth-server-whitelist=url

启用了集成身份验证的以逗号分隔的服务器列表。

```
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

则任何以example.com, foobar.com, baz结尾的url, 都需要考虑集成验证. 没有*前缀，则url必须完全匹配.

## --auth-negotiate-delegate-whitelist=url

需要身份验证的服务器的逗号分隔列表. 没有*前缀则url必须完全匹配.

## --ignore-certificate-errors

忽略证书相关的错误.

## --ppapi-flash-path=path

设置pepper flash插件(Chromium flash支持)的path属性.

## --ppapi-flash-version=version

设置pepper flash插件的version属性.

## --log-net-log=path

启用需要保存的网络日志事件并将其写入path路径下.

## --disable-renderer-backgrounding

防止Chromium降低不可见的页面渲染进程的优先级.

这个标识是全局的, 影响所有渲染进程. 如果你只想禁用一个窗口的节流保护，你可以采取playing silent audio.

## --enable-logging

在控制台打印Chromium日志.

这个开关不能用于app.commandLine.appendSwitch, 因为它在用户应用程序加载之前就被解析了, 但是你可以设置ELECTRON_ENABLE_LOGGING环境变量来达到同样的效果.

## --v=log_level

给定默认的最大的有效V-logging等级; 0是默认值。 通常V-logging等级为正值.

这个开关只有在--enable-logging也被传递时才起效.

## --vmodule=pattern

给定每个模块最大的V-logging等级, 覆盖--v设定的值. 例如, my_module=2,foo*=3将改变所有my_module.\*和foo\*.\*源文件的代码的日志等级.

任何包含正斜杠或反斜杠的模式都将针对 整个路径名进行测试，而不仅仅是模块。 例如, \*/foo/bar/\*=2会改变foo/bar目录下源文件的所有代码的日志等级.

这个开关只有在--enable-logging也被传递时才起效.

::: tip chrome命令行相关

对chorme一些关于网络服务, 插件支持, 日志登记等提供了对应的配置方式

:::