# entry

> 中文文档

[zhon](https://markdown-it.docschina.org/api/MarkdownIt.html)

> markdown-it如何被调用

```js
// 引入markdown-it模块
var md = require('markdown-it')();
// 输入md字符串, 输出html字符串
var result = md.render('# markdown-it rulezz!');
```

1. 加载markdown-it模块
2. 调用markdown-it的render方法

```json
{
  "main": "index.js",
  "bin": {
    "markdown-it": "bin/markdown-it.js"
  }
}
```

> 模块内容由package.json中main入口, 指向index.js

```js
// index.js
module.exports = require('./lib/');
```

> index.js又指向lib下的index.js

```ts
class MarkdownIt {}
class Token {}
class Rulers {}
class State {}
```

## Main

* render 渲染器函数
* parse 解析器函数
* core 调度器
  * core.State 初始化状态
  * core.process 规则调度加工

```js
// core-rules
var _rules = [
  // 处理换行和字符串结束标志符
  [ 'normalize',      require('./rules_core/normalize')      ],
  // 交给block规则处理
  [ 'block',          require('./rules_core/block')          ],
  // 交给inline规则处理
  [ 'inline',         require('./rules_core/inline')         ],
  // 将 URL-like 的字符串转化成超链接
  [ 'linkify',        require('./rules_core/linkify')        ],
  // 就是替换一些印刷字体
  [ 'replacements',   require('./rules_core/replacements')   ],
  // 处理一些不同国家语言的引号问题
  [ 'smartquotes',    require('./rules_core/smartquotes')    ]
];

for (i = 0, l = rules.length; i < l; i++) {
  // rule => state
  rules[i](state);
}
```

> core => block(多行解析) => inline(单行解析)

```js
// block规则被调用
state.md.block.parse(state.src, state.md, state.env, state.tokens);
// parse
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};
// State
ParserBlock.prototype.State = require('./rules_block/state_block');
// tokenize
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  for (i = 0; i < len; i++) {
    // rules => state, line, endLine, slient
    ok = rules[i](state, line, endLine, false);
    if (ok) { break; }
  }
}
// block 规则很定
```

```js
// First 2 params - rule name & source. Secondary array - list of rules,
// which can be terminated by this one.
var _rules = [
  [ 'table',      require('./rules_block/table'),      [ 'paragraph', 'reference' ] ],
  [ 'code',       require('./rules_block/code') ],
  [ 'fence',      require('./rules_block/fence'),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', require('./rules_block/blockquote'), [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'hr',         require('./rules_block/hr'),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       require('./rules_block/list'),       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  require('./rules_block/reference') ],
  [ 'heading',    require('./rules_block/heading'),    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   require('./rules_block/lheading') ],
  [ 'html_block', require('./rules_block/html_block'), [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'paragraph',  require('./rules_block/paragraph') ]
];

for (i = 0; i < len; i++) {
  ok = rules[i](state, line, endLine, false);
  if (ok) { break; }
}
```

> 块内规则, 解析到符合的规则便return true, 跳出block解析, 内部存在的

```js
// parserCore - inline
state.md.inline.parse(tok.content, state.md, state.env, tok.children);
// parserInline - parse
var state = new this.State(str, md, env, outTokens);
this.tokenize(state);
// rule1
for (i = 0; i < len; i++) {
  ok = rules[i](state, false);
  if (ok) { break; }
}
// rule2
rules = this.ruler2.getRules('');
len = rules.length;

for (i = 0; i < len; i++) {
  rules[i](state);
}
// 这部分和block略有不同，含有2个rulers
// tokenize执行第一个rulers
// tokenize执行完毕后再执行第二个rules
```

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
```

> block => inline => linkify => replacements => smartquotes
> core调度解析完毕, parse => render
> render调用对应规则解析替换生成html字符串