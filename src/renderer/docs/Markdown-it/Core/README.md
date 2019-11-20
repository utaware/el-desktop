# entry

[docs](https://markdown-it.docschina.org/api/MarkdownIt.html)

```json
{
  "main": "index.js",
  "bin": {
    "markdown-it": "bin/markdown-it.js"
  }
}
```

## modules

```js
// 模块
var utils        = require('./common/utils');
var helpers      = require('./helpers');
var Renderer     = require('./renderer');
var ParserCore   = require('./parser_core');
var ParserBlock  = require('./parser_block');
var ParserInline = require('./parser_inline');
var LinkifyIt    = require('linkify-it');
var mdurl        = require('mdurl');
var punycode     = require('punycode');
```

## config

```js
// 相关设置 
var config = {
  'default': require('./presets/default'),
  zero: require('./presets/zero'),
  commonmark: require('./presets/commonmark')
};
```

## methods

### validateLink

> 用以validateLink对url校验是否合法, 预防xss

```js
//  用以validateLink对url校验是否合法, 预防xss
var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}
```

### normalizeLink & normalizeLinkText

> 调用mdurl模块序列化转码url
> 两个方法不同之处只是在调用punycode使用的编码转化不同
> normalizeLink(toASCII) normalizeLinkText(toUnicode)
> Punycode => 编码转换 mdurl => url解析

```js
function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}
```

## MarkdownIt

> Main parser/renderer class 最后被模块化导出的实例

```js
class MarkdownIt {

  // 当编写插件时，你可能用它来添加新规则。
  this.inline = new ParserInline();
  this.block = new ParserBlock();
  // 顶层规则执行器。粘合块/内联的解析器，并进行中间(过程)的转换。
  this.core = new ParserCore();
  // 将 markdown 字符串转换为 HTML。它对你来说肯定是最有魔力的：
  this.renderer = new Renderer();
  // linkify-it 的实例，用于 linkify 规则。
  this.linkify = new LinkifyIt();
  // 链接校验函数。CommonMark 模式允许链接过多。默认情况下，我们禁用 javascript:，vbscript:，file: schemas，以及几乎所有的 data:...schemas，除了一些嵌入式图像类型。
  this.validateLink = validateLink;
  // 用于将链接 URL 编码为机器可读(machine-readable)格式的函数，包括 url 编码、punycode 等。 unicode
  this.normalizeLink = normalizeLink;
  // 用于将链接 URL 解码为人类可读格式(human-readable)的函数。 ASCII
  this.normalizeLinkText = normalizeLinkText;
  // 各种实用的函数，用于编写插件。
  this.utils = utils;
  // 链接组件解析函数，对编写插件大有裨益。
  this.helpers = utils.assign({}, helpers);
  this.options = {};
  // 所有选项和编译设置的批量加载。这是个内部方法，你可能并不需要它
  this.configure(presetName);
  if (options) { this.set(options); }

}
```

- render
  - inline
  - block
  - core
  - renderer
- url
  - validateLink
  - normalizeLink
  - normalizeLinkText
- util
  - utils
  - helpers

**prototype**

```js
MarkdownIt.prototype = {
  // 合并 options
  set: '设置解析器选项',
  // 禁用 ParserInline、ParserBlock、ParserCore 的某些规则并且获取特定的 options
  configure: '所有选项和编译设置的批量加载',
  // 启用和禁用 ParserInline、ParserBlock、ParserCore 的某些规则
  enable: '启用 list 或 rules',
  disable: '用于禁用指定的规则',
  // 注入插件: 这只是一个语法糖，和调用 plugin(md, params) 等效
  use: '将指定的插件加载到当前的解析器实例中',
  // 编译的入口: 如果你没有编写自定义渲染器（例如，生成 AST）的打算，不建议直接调用此方法
  parse: '解析输入字符串并返回块(类型)的 token 列表',
  // MarkdownIt 编译的出口，吐出 HTML 字符串
  render: '将 markdown 字符串转换为 HTML',
  // 仅仅编译类型为 inline 的 token 会忽略所有块规则 
  parseInline: '类似于 MarkdownIt.parse',
  // 接收 parseInline 输出的 tokens，最终生成 HTML 字符串，不会被 p 标签包裹
  renderInline: '类似于 MarkdownIt.render'
}
```
