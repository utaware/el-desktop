# Renderer

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L8)

## Renderer.new

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L130)

```js
new Renderer()
```

创建新的 Renderer 实例并且填充默认的 Renderer#rules。

## Renderer.render

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L315)

```js
Renderer.render(tokens, options, env)String
```

* tokens (Array) -- 用来渲染的块 tokens 的列表
* options (Object) -- 解析器实例的参数
* env (Object) -- 来自解析后的输入的附加数据（例如引用）

获取 token 流并生成 HTML。可能你永远都不需要去直接调用这个方法。

## Renderer.renderAttrs

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L169)

```js
Renderer.renderAttrs(token) -> String
```

渲染 token 属性成字符串。

## Renderer.renderInline

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L262)

* tokens (Array) -- 用来渲染的块 tokens 的列表
* options (Object) -- 解析器实例的参数
* env (Object) -- 来自解析后的输入的附加数据（例如引用）

类似 Renderer.render，但用于 inline 类型的单个 token。

## Renderer.renderInlineAsText

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L291)

`内部的`

* tokens (Array) -- 用来渲染的块 tokens 的列表
* options (Object) -- 解析器实例的参数
* env (Object) -- 来自解析后的输入的附加数据（例如引用）

让图片 `alt` 属性符合 CommonMark 规格的特殊的不成熟产品。不要试图使用它！特殊在于要求要和裸的标记(stripped markup)展示 `alt` 内容，而不是简单的转义。

## Renderer.renderToken

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L193)

* tokens (Array) -- token 们的列表
* idx (Number) -- 用来渲染的 token 的索引
* options (Object) -- 解析器实例的参数

默认的 token 渲染器。可以被 Renderer#rules 里的自定义函数覆盖。

## Renderer#rules

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js#L160)

```js
Renderer#rules -> Object
```

包含对于 token 们的渲染规则，可以被更新和扩展。

**示例**

```js
var md = require('markdown-it')();

md.renderer.rules.strong_open  = function () { return '<b>'; };
md.renderer.rules.strong_close = function () { return '</b>'; };

var result = md.renderInline(...);
```

每个规则都被作为独立的静态函数，有着鲜明的调用特征：

```js
function my_token_render(tokens, idx, options, env, renderer) {
  // ...
  return renderedHTML;
}
```

参考[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)以获取更多细节和例子。