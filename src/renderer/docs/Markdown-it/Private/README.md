# Markdown-it

## Parsing

Parsing 的过程是，首先创建一个 Core Parser，这个 Core Parser 包含一系列的缺省 Rules。这些 Rules 将顺序执行，每个 Rule 都在前面的 Tokens 的基础上，要么修改原来的 Token，要么添加新的 Token。这个 Rules 的链条被称为 Core Chain。缺省 Core Rules 如下:

* normalize: MD 文档的换行符统一化；将空字符 \u0000 转换为 \uFFFD
* block: 识别出哪些是 Block Token(Table, blockquote, Code, Fence 等)，哪些是 Inline Token。如果是 Block Token，则启动 Block Chain 来处理。
* inline: 针对 Block Rule 识别出来的 'inline' 类型的 token 进行处理
* linkify: 检测 text 类型的 token 中是否有可是别的 URL(http 或者 mailto)，如果有，则将原本完整的 text token 分为 text, link, text 三部分(实际不只三个 tokens, 因为 link_open, link_close 这些 tokens 都会被产生)
* replacements: 完成诸如 (c) (C) → © ，+- → ±的替换，同时躲开 link 中的包含的对象文字
* smartquotes: 完成引号的排印化处理

Block rule 的执行过程，会启动 Block Chain，这又是一堆 Rules 的执行，缺省包含:

```js
var _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'table',      require('./rules_block/table'),      [ 'paragraph', 'reference' ] ],
  [ 'code',       require('./rules_block/code') ],
  [ 'fence',      require('./rules_block/fence'),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', require('./rules_block/blockquote'), [ 'paragraph', 'reference', 'list' ] ],
  [ 'hr',         require('./rules_block/hr'),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       require('./rules_block/list'),       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  require('./rules_block/reference') ],
  [ 'heading',    require('./rules_block/heading'),    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   require('./rules_block/lheading') ],
  [ 'html_block', require('./rules_block/html_block'), [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'paragraph',  require('./rules_block/paragraph') ]
];
```

在 Block Chain 执行完了，就是 Inline Rule 执行，也就启动了 Inline Chain，包含:

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

所以这个 Parsing 的过程是一个简单的树形过程，Core Rules 执行到 Block 和 Inline Rule 的时候，会分别再执行 Block Chain 和 Inline Chain。整个 Parsing 过程是同步的。

Markdown-It 的 API 允许 Plugin 作者选择在这些缺省的 Rules 的前后添加新的 Rule 函数，从而实现对特定的 Token 的再处理（增删改 Token 都可以）。可以说， Plugin 作者的灵活性是足够大的。

## Rendering

在所有 Tokens 都获得之后，就可以渲染了。渲染就是把特定 Token 转变为特定的 HTML 的过程。

Markdown-It 允许你为特定的 Token Type 挂载自己的渲染函数，这个函数称为 Renderer Rule。Markdown-It 已经定义了几个 缺省的 Renderer Rules:

```text
code_inline
code_block
fence
image
hardbreak
text
html_block
html_inline
```

上面这些名字，其实是对应的 token.type 的值。渲染时，如果遇到匹配的 token.type，那么就会用对应的 Renderer Rule 来渲染。

如果没有找到对应的 Renderer Rule，那么一个缺省的 render 函数会被调用.

Renderer Rules 和 Parsing Rules 是两个概念，不要混淆。由于 Markdown-It 灵活的扩展机制（你可以创建任何类型的 Token），因此到底会出现多少种 token types 其实是依赖于你装了多少 Plugins。
