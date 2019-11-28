# Main

> 对应lib/index.js的核心文件

## MarkdownIt

> Main parser/renderer class 最后被模块化导出的实例

```js
// 工具
var utils        = require('./common/utils');
var helpers      = require('./helpers');
// 渲染
var Renderer     = require('./renderer');
// 解析
var ParserCore   = require('./parser_core');
var ParserBlock  = require('./parser_block');
var ParserInline = require('./parser_inline');
// 具有完整unicode支持的链接识别库
var LinkifyIt    = require('linkify-it');
// mdurl => url解析
var mdurl        = require('mdurl');
// Punycode => 编码转换
var punycode     = require('punycode');
```

```js
function MarkdownIt (presetName, options) {
  // 对调用方是否用了 new 操作符来调用 MarkdownIt 做了兼容
  // require('markdown-it')() => this => window => global
  // return MarkdownIt() => instanceof MarkdownIt => true
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }
  // options和presetName缺省调用处理
  if (!options) {
    // isString 是否是字符串
    // 如果直接传递了一个对象, 会以options为此对象, presetName为default使用
    if (!utils.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }
  // 实例化各个内部构成
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
  // 调用configure设置模式
  this.configure(presetName);
  if (options) { this.set(options); }

}
```

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

### configure

```js
// 三种配置模式都包含两部分
// options => 相关解析设置
// components => 相关解析规则
var config = {
  'default': require('./presets/default'),
  // 最宽松
  zero: require('./presets/zero'),
  // 严格
  commonmark: require('./presets/commonmark')
};

MarkdownIt.prototype.configure = function (presets) {
  var self = this, presetName;

  if (utils.isString(presets)) {
    presetName = presets;
    presets = config[presetName];
    // 默认default, 可选zero || commonmark
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }
  // 加载对应模式的默认配置
  if (presets.options) { self.set(presets.options); }
  // 启用对应模式的默认规则
  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};
```

## set

```javascript
var md = require('markdown-it')()
            .set({ html: true, breaks: true })
            .set({ typographer, true });
```

```js
MarkdownIt.prototype.set = function (options) {
  // 合并配置项
  utils.assign(this.options, options);
  return this;
};
```

## enable

```javascript
var md = require('markdown-it')()
            .enable(['sub', 'sup'])
            .disable('smartquotes');
```

```js
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};
```

## disable

```js
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }
  return this;
};
```

## use

```javascript
var iterator = require('markdown-it-for-inline');
var md = require('markdown-it')()
            .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
              tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
            });
```

```js
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  // 实际上就是plugin(...args)
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};
```

## parse

> 解析转化md字符串

```js
MarkdownIt.prototype.parse = function (src, env) {
  // 传入的输入应该是md语法的字符串
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }
  // core核心转化state
  var state = new this.core.State(src, this, env);
  
  this.core.process(state);

  return state.tokens;
};
```

## render

> render方法调用, 先parse解析, 得到解析后的内容再通过render

```js
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};
```

## parseInline

> parseInline 的时候会设置state(core)为true

```js
MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens;
};
```

## renderInline

> 以inline模式解析md文本

```js
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env);
};
```

## validateLink

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

## normalizeLink & normalizeLinkText

> 调用mdurl模块序列化转码url
> normalizeLink(toASCII) normalizeLinkText(toUnicode)

```js
var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

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

function normalizeLinkText(url) {
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
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.decode(mdurl.format(parsed));
}
```

