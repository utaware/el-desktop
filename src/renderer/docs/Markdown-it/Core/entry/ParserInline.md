# ParserInline

经过 ParserCore 处理之后，生成了 type 为 inline 的 token。下一步就是交给 ParserInline 处理。而这个 rule 函数的代码如下：

```js
module.exports = function inline(state) {
  var tokens = state.tokens, tok, i, l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};
```

也就是拿到 type 为 inline 的 token，调用 ParserInline 的 parse 方法。ParserInline 位于 `lib/parser_inline.js`。

```js
var _rules = [
  [ 'text',            require('./rules_inline/text') ],
  [ 'newline',         require('./rules_inline/newline') ],
  [ 'escape',          require('./rules_inline/escape') ],
  [ 'backticks',       require('./rules_inline/backticks') ],
  [ 'strikethrough',   require('./rules_inline/strikethrough').tokenize ],
  [ 'emphasis',        require('./rules_inline/emphasis').tokenize ],
  [ 'link',            require('./rules_inline/link') ],
  [ 'image',           require('./rules_inline/image') ],
  [ 'autolink',        require('./rules_inline/autolink') ],
  [ 'html_inline',     require('./rules_inline/html_inline') ],
  [ 'entity',          require('./rules_inline/entity') ]
];

var _rules2 = [
  [ 'balance_pairs',   require('./rules_inline/balance_pairs') ],
  [ 'strikethrough',   require('./rules_inline/strikethrough').postProcess ],
  [ 'emphasis',        require('./rules_inline/emphasis').postProcess ],
  [ 'text_collapse',   require('./rules_inline/text_collapse') ]
];

function ParserInline() {
  var i;

  this.ruler = new Ruler();

  for (i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  this.ruler2 = new Ruler();

  for (i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}
```

从构造函数看出，ParserInline 不同于 ParserBlock，它是有两个 Ruler 实例的。 ruler 是在 tokenize 调用的，ruler2 是在 tokenize 之后再使用的。

```js
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};

ParserInline.prototype.parse = function (str, md, env, outTokens) {
  var i, rules, len;
  var state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  rules = this.ruler2.getRules('');
  len = rules.length;

  for (i = 0; i < len; i++) {
    rules[i](state);
  }
};
```

文章的开头说到将 type 为 inline 的 token 传给 md.inline.parse 方法，这样就走进了 parse 的函数内部，首先生成属于 ParserInline 的 state，还记得 ParserCore 与 ParserBlock 的 state 么？它们的作用都是存放不同 parser 在 parse 过程中的状态信息。

我们先来看下 State 类，它位于 `lib/rules_inline/state_inline.js`

```js
function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  this.cache = {};

  this.delimiters = [];
}
```

列举一些比较有用的字段信息：

1. pos

2. posMax

3. pending
存放一段完整的字符串，比如
```js
let src = "**emphasis**"
let state = new StateInline(src)

// state.pending 就是 'emphasis'
```

4. delimiters
存放一些特殊标记的分隔符，比如 *、~ 等。元素格式如下:
```js
{
  close:false
  end:-1
  jump:0
  length:2
  level:0
  marker:42
  open:true
  token:0
}
// marker 表示字符串对应的 ascii 码
```

生成 state 之后，然后调用 tokenize 方法。

```js
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};
```

首先获取默认的 rule chain，然后扫描 token 的 content 字段，从第一个字符扫描至尾部，每一个字符依次调用 ruler 的 rule 函数。它们位于 `lib/rules_inline/` 文件夹下面。调用顺序依次如下：

* text

```js
module.exports = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false; }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true;
};
```

作用是提取连续的非 isTerminatorChar 字符。isTerminatorChar 字符的规定如下：

```js
function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}
```

假如输入是 `"__ad__"`，那么这个 rule 就能提取 "ad" 字符串出来。

* newline

处理换行符（`\n`）。

* escape

处理转义字符（`\`）。

* backtick

处理反引号字符（`）。

* strikethrough
  
作用是处理删除字符（~）

* emphasis

处理加粗文字的字符（* 或者 _）

* link

作用是解析超链接。

* image

解析图片

* autolink

解析 `<` 与 `>` 之间的 url

* html_inline

解析 HTML 行内标签

* entity

解析 HTML 实体标签，比如 `&nbsp;`、`&quot;`、`&apos;` 等等。

这就是 `ParserInline.prototype.tokenize` 的全流程，也就是 type 为 inline 的 token 经过 ruler 的所有 rule 处理之后，生成了不同的 token 存储到 token 的 children 属性上了。但是 `ParserInline.prototype.parse` 并没有完成，它还要经过 ruler2 的所有 rule 处理。它们分别是 `balance_pairs`、`strikethrough.postProcess`、`emphasis.postProcess`、`text_collapse`。

* balance_pairs

处理 state.delimiters 数组，主要是给诸如 `*`、`~` 等找到配对的开闭标签。

* strikethrough.postProcess

处理 `~` 字符，生成 `<s>` 标签的 token。

* emphasis.postProcess

处理 * 或者 _ 字符，生成 `<strong>` 或者 `<em>` 标签的 token。

* text_collapse

用来合并相邻的文本节点。举个栗子

```js
const src = '12_'

md.parse(src)
// state.tokens 如下

[
  {
    content:"12",
    tag:"",
    type:"text"
  },
  {
    content:"_",
    tag:"",
    type:"text",
    ...
  }
]

// 经过 text_collapse 函数之后，

[
  {
    content:"12_",
    tag:"",
    type:"text"
  }
]
```

至此，ParserInline 就已经走完了。如果你打 debugger 调试会发现，在 `ParserInline.prototype.parse` 之后，type 为 inline 的 token 上的 children 属性已经存在了一些子 token。这些子 token 的产生就是 ParserInline 的功劳。而 ParserInline 之后，就是 `linkify`、`replacements`、`smartquotes` 这些 rule 函数。细节可以在 ParserCore 里面找到。最后再回到 markdownIt 的 parse 部分

```js
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};
```

那么 `this.parse` 函数执行完成表示所有的 token 都 ready 了，是时候启动渲染器了！