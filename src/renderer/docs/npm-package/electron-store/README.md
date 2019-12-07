# electron-store

[docs](https://github.com/sindresorhus/electron-store)

## constructor(options?)

```ts
interface Options {
  // 默认对象
  defaults: object, // 初始化的默认对象
  // 验证在写入时候是否符合所需规则
  schema: object, // 验证
  // 每当升级版本时，您都可以使用迁移（migrations）对存储执行操作。
  migrations: object, // 迁移
  // 存储文件的名称（不带扩展名）
  name: string, // Default: config
  // 存储文件位置。
  cwd: string, // Default: app.getPath('userData')
  // 如果加密密钥以安全方式（不是纯文本）存储在Node.js应用程序中，则可用于保护敏感数据
  encryptionKey: string | Buffer | TypedArray | DataView, // Default: undefined
  // 配置文件的扩展名
  fileExtension: string, // Default: json
  // 如果读取配置文件导致SyntaxError（语法错误），则清除该配置
  clearInvalidConfig: boolean, // Default: true
  // 写入配置文件时将配置对象序列化为UTF-8字符串的函数
  serialize: function, // Default: value => JSON.stringify(value, null, '\t')
  // 读取配置文件时从UTF-8字符串反序列化配置对象的功能
  deserialize: function// Default: JSON.parse
  // 通过点表示法访问嵌套属性
  accessPropertiesByDotNotation: boolean, // Default: true
  // 监视配置文件中的所有更改，如果已设置，则调用onDidChange的回调。
  // 当前，此选项在macOS上的Node.js 8上不起作用。
  watch: boolean, // Default: false
}
```

## Instance

### .set(key, value)

> 设置一个项目。该值必须是JSON可序列化的。 
> 尝试将类型设置为undefined，function或symbol会导致TypeError。

### .set(object)

> 一次设置多个项目。

### .get(key, [defaultValue])

> 获取一个项目或defaultValue（如果该项目不存在）。

### .reset(…keys)

> 将项目重置为其默认值（由defaults或schema选项定义）。

### .has(key)

> 检查项目是否存在。

### .delete(key)

> 删除项目。

### .clear()

> 删除所有项目。

### .onDidChange(key, callback)

> callback: (newValue, oldValue) => {}
> 监视给定的键，对任何更改调用回调。 
> 第一次设置键时，oldValue将是不确定的，而删除键时，newValue将是不确定的。
> 事件仅在同一过程中触发。 因此，如果在渲染器进程中触发事件，则不会在主进程中获得事件。

### .onDidAnyChange(callback)

> callback: (newValue, oldValue) => {}
> 监视整个配置对象，对任何更改调用回调。
> oldValue和newValue将分别是更改前后的配置对象。

### .size

> 获取项目总个数

### .store

> 获取所有数据作为对象或将当前数据替换为对象：

### .path

> 获取存储文件的路径。

### .openInEditor()

> 在用户的编辑器中打开存储文件。

## last

```js
const Conf = require('conf');

class ElectronStore extends Conf {}
```

> 这个库所作的事情基本就是把`conf`库拿过来, 添加了electron的electron.shell.openItem()
> 以此实现了openInEditor方法, 将原本的configName在这里替换成了name选项
> path默认成了electron remote app 模块中的getPath('userData')