# ParserCore

编译的核心管理者，掌握着不同类型的 token 生成的流程。它内部管理了 ParserBlock、ParserInline、linkify、replacements 等 rule 函数。也就是说，用户传入一个字符串，经历了这些 rule 函数处理之后，得到了一个由许多 token 组成的 tokens 数组，最后再交由 renderer 处理之后，吐出 HTML 字符串。

```js
// index
md.render('# markdown-it rulezz!')
// render
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};
// parse
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }

  var state = new this.core.State(src, this, env);

  this.core.process(state);
  // state.tokens => []
  return state.tokens;
};
// core
var ParserCore   = require('./parser_core');
this.core = new ParserCore();
```

1. render 接收一个字符串。内部调用 parse 方法得到 tokens。
2. parse 内部先实例化一个属于 core 的 state，并且调用 parserCore.process 方法。state 是一个拥有当前 parserCore 的编译状态的实例。
3. this.renderer.render 接收 tokens，最后输出 HTML 字符串。

## ./parser_core

```js
var _rules = [
  [ 'normalize',      require('./rules_core/normalize')      ],
  [ 'block',          require('./rules_core/block')          ],
  [ 'inline',         require('./rules_core/inline')         ],
  [ 'linkify',        require('./rules_core/linkify')        ],
  [ 'replacements',   require('./rules_core/replacements')   ],
  [ 'smartquotes',    require('./rules_core/smartquotes')    ]
];

function Core() {
  this.ruler = new Ruler();
  // 初始化一遍规则
  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}

Core.prototype.process = function (state) {
  var i, l, rules;
  // 获取所有规则并传入state类调用
  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = require('./rules_core/state_core');
```

parserCore 实例上仅有一个 ruler 属性，这个是用来管理内部所有的 rule 函数，并且原型上。只有一个 process 方法。

当调用 process 的时候，首先会拿到职责链名为空字符串('')的 rule 组成的数组，将 state 作为入参传入至每一个 rule 函数，得到 tokens 之后挂载到 state 上去。类似的伪代码如下：

```js
const rules = [function normalize, function block, function inline, function ...]

for (const rule of rules) {
  rule(state) // rule 内部生成一个个 token，并且存放在 state.tokens 数组里。
}
// 最后在 md.parse 函数体内部返回 state.tokens
```
## ./rules_core

### state_core

```js
var Token = require('../token');

function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = Token;

module.exports = StateCore;
```

继承token类 并把当前的一些状态存储下来

`src` 用来放用户输入的字符串，tokens 存放编译出来的 token。`inlineMode` 表示 parse 的时候是否编译成 type 为 inline 的 token。`md` 就是当前 MarkdownIt 的实例。

### block

```js
module.exports = function block(state) {
  var token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [ 0, 1 ];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};
```

根据inlineMode解析token, inlineMode默认为false

### inline

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

对block生成的token内部做进一步的inline解析

这一步是在 ParserBlock 之后的，因为 ParserBlock 处理之后会生成 type 为 inline 的token。这种 token 属于未完全解析的 token，需要 ParserInline 进一步处理，生成新的token。这些新生成的 token 会存放在 children 属性上。举个栗子来说

```js
const src = '__ad__'
md.render(src)

// 1.经过 ParserBlock 处理之后是这样的 token：

{
  type: "inline",
  tag: "",
  attrs: null,
  block: true,
  children: []
  content: "__ad__",
  hidden: false,
  ...
  type:"inline"
}
// 从 content 可以看出 '__' 并未生成 token，这个符号代表强调的意思，应该替换成 strong 标签

// 2.再经过 ParserInline 处理之后，会发现 children 多了 5 个 token。代码如下
{
  ...,
  children: [
    {
      type: "text", tag: "", attrs: null, ...
    },
    {
      type: "strong_open", tag: "strong", attrs: null, …
    },
    {
      type: "text", tag: "", attrs: null, …
    },
    {
      type: "strong_close", tag: "strong", attrs: null, …
    },
    {
      type: "text", tag: "", attrs: null, …
    }
  ]
}

// 最后传给 md.renderer.render 之后，就能生成加粗的文字了。
```
