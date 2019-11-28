# presets 

```js
new MarkdownIt([presetName][, options])
```

* presetName (String) -- 可选的，`commonmark` / `zero`
* options (Object)

**presetName: 预设配置名**

> MarkdownIt 提供命名的预设（配置），以便快速启用/禁用常用语法规则和选项。

## commonmark

> 将解析器配置为严格的 CommonMark 模式。

## default

> 类似于 GFM，在没有给出预设名称时会启用，（包括）所有可用的规则，但仍然没有 html(支持 html), typographer(印刷意义上的美化) 和 autolinker(自动识别和转换像 url 的文本)。

## zero

> 所有的规则都被禁用。通过 `.enable()` 快速设置你的配置是比较好的。例如，当你只需要 `bold` 和 `italic` 标签时，什么(多余的功能)也不需要。

## options

* **html** - `false`。设成 `true` 来启用在源码中(支持) HTML 标签。注意！这是不安全的！你可能需要额外的消毒剂(sanitizer)来组织来自 XSS 的输出。最好是通过插件来扩展特性，而不是启用 HTML。
* **xhtmlOut** - `false`。设成 `true` 来给闭合的单个标签（`<br/`>）添加 '/'。只有完全兼容 CommonMark 模式时才需要这样做。实际上你只需要 HTML 输出。
* **breaks** - `false`。 设成 `true` 来转化段落里的 `\n` 成 `<br>`。
* **langPrefix** - `language-`。 给围栏代码块的 CSS 语言类前缀。对拓展的高亮器来说很有用。
* **linkify** - `false`。设成 `true` 来自动转化像 URL 的文本成链接。
* **typographer** - `false`。设成 `true` 来启用某些语言中性的替换以及引号的美化（智能引号）。
* **quotes** - `“”‘’`, String 或 Array 类型。在 typographer 启用和支持智能引号时，进行双引号 + 单引号对替换。 比方说，你可以支持 `'«»„“'` 给俄罗斯人使用， `'„“‚‘'` 给德国人使用。还有 `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` 给法国人使用（包括 nbsp）。
* **highlight** - `null`。高亮函数，给围栏代码块(使用)的。高亮器 `function (str, lang)` 会返回转义后的 HTML。如果源码不需要额外的改变和转义，它也会返回空的字符串。如果结果以 `<pre...` 开头，内部的包裹会被忽略。
* **maxNesting** - `100`。 递归保护， 内部限制

## components

- core
- block
- inline

> 定义了不同模式下加载的相关规则