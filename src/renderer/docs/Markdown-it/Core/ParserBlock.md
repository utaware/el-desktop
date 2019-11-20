# ParserBlock

```js
const rules = [function normalize, function block, function inline, function ...]

for (const rule of rules) {
  rule(state) // rule 内部生成一个个 token，并且存放在 state.tokens 数组里。
}
// 最后在 md.parse 函数体内部返回 state.tokens
```

> normalize => block

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
// state.inlineMode = false
// state.md.block.parse(state.src, state.md, state.env, state.tokens);
```

parse 函数传入了四个参数：

1. state.src 代表用户传入的字符串
2. state.md 是指当前 md 实例，主要是为了方便拿到 md 上的属性与方法
3. state.env 是在调用 md.parse 注入的一些额外的数据，默认是 {}，一般不会需要它，除非你要做一些定制化的开发
4. tokens 引用。注意：不能在 rule 函数里面更改 tokens 引用，必须保证所有的 rule 函数都是在操纵同一份 tokens。

## lib/parser_block.js

```js
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

function ParserBlock() {

  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
  }
}

ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    if (state.sCount[line] < state.blkIndent) { break; }

    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }
    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }
    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};

ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};


ParserBlock.prototype.State = require('./rules_block/state_block');
```

从构造函数可以看出，ParserBlock 有 11 种 `rule`，分别为 `table`、`code`、`fence`、`blockquote`、`hr`、`list`、`reference`、`heading`、`lheading`、`html_block`、`paragraph`。经过由这些 rule 组成的 rules chain 之后，就能输出 type 为对应类型的 tokens，这也就是 ParserBlock 的作用所在。ruler 用来管理所有的 rule 以及 rule 所属的 chain。

```js
for (var i = 0; i < _rules.length; i++) {
  this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
}
```

rules 是一个二维数组，它的元素也是一个数组，先暂称之为 ruleConfig。ruleConfig 的第一个元素是 rule 的 name。第二个是 rule 的 fn，第三个是 rule 的 alt，也就是所属的职责链。假如 alt 为 `['paragraph', 'reference']`，那么如果调用 `ruler.getRules('paragraph')` 就能返回 `[fn]`，同时调用 `ruler.getRules('reference')` 也能返回 `[fn]`，因为 fn 的 alt 数组包含了这两种职责链。
再来看 parse 方法。

```js
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};
ParserBlock.prototype.State = require('./rules_block/state_block');
```

先了解 ParserBlock 的 State，记得之前 ParserCore 的 State 么？也就是在每一个 Parser 的过程中都有一个 State 实例，用来管理他们在 parse 的一些状态。ParserBlock 的 State 是位于 lib/rules_block/state_block.js。

```js
function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;
  this.src = src;
  this.md = md;

  this.env = env;

  this.tokens = tokens

  this.bMarks = []
  this.eMarks = []
  this.tShift = []
  this.sCount = []

  this.bsCount = []

  this.blkIndent  = 0

  this.line       = 0
  this.lineMax    = 0
  this.tight      = false
  this.ddIndent   = -1
  this.parentType = 'root'

  this.level = 0

  this.result = ''
  s = this.src
  indent_found = false

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1;
}
```

理解 State 上的属性的作用，是很关键的。因为这些属性都是接下来 tokenize 所依赖的信息。重点关注如下的属性：

* tokens
tokenize 之后的 token 组成的数组
* bMarks
存储每一行的起始位置，因为 parse 的过程是根据换行符逐行扫描
* eMarks
存储每一行的终止位置
* tShift
存储每一行第一个非空格的字符的位置（制表符长度只算做1）
* sCount
存储每一行第一个非空格的字符串的位置（制表符长度为4）
* bsCount
一般为 0  初始制表符长度 每行（b标记）和该行的实际开始
* blkIndent 
一般为 0 所需的块内容缩进
* line
当前所在行数。tokenize 的时候逐行扫描会用到
* lineMax
src 被分割成了多少行

```js
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    // 跳过空白行解析下一行
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    if (state.sCount[line] < state.blkIndent) { break; }
    // 达到最大嵌套等级
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }

    state.tight = !hasEmptyLines;
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
}

```

```js
StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    // 如果当前行： 起始 + 第一个字符串位置 < 终止位置 => 
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};
```

函数的执行流程如下: 

1. 获取 ParserBlock 构造函数声明的所有 rule 函数，因为在 Ruler 类里面规定，内部的 rule 函数一定属于名字为空字符串的 rule chain。当然构造函数还有很多其他的 rule chain。比如 paragraph、reference、blockquote、 list，暂时还未用到。同时，声明了很多初始变量。

2. 然后走到一个 while 循环，因为 state_block 存放的信息都是以 src 字符串每一行作为维度区分的，比如每一行的起始位置，每一行的终止位置，每一行第一个字符的位置。这些信息都是特定 rule 所需要的。while 语句的前面部分就是跳过空行、是否达到最大嵌套等级的判断，重点关注这行代码。

```js
for (i = 0; i < len; i++) {
  ok = rules[i](state, line, endLine, false); 
  if (ok) { break; }
}
```

这里的循环，也就是会对 src 的每一行都执行 rule chain，进而产出 token，如果其中一个 rule 返回 true，就跳出循环，准备 tokenize 下一行。

* table

table 这个 rule 就是用来生成 table HMTL 字符串的。
* code

code rule 的作用也是很简单，它认为只要你每行的起始位置多于 3 个空格，那就是一个 code_block。
* fence
```
echo 'done'
```
fence rule 类似于 code rule。它代表具有语言类型的 `code_block`。比如 `javascript`、`shell`、`css`、`stylus` 等等。

* blockquote
```markup
> i am a blockquote
```
blockquote 的作用就是生成 markup 为 > 的 token

* hr

生成 type 为 hr 的 token。它的 markup 是 `***`、`---`、`___`，也就是在 md 文件写这三种语法，都能解析出 `<hr>` 标签。

* list

list 作用是为了解析有序列表以及无序列表的

* reference

reference 作用是为了解析超链接， 类似于 `[reference](http://www.baidu.con)`

* heading

heading 作用是解析标题标签(h1 - h6)。它的语法主要是 #, ## 等等。

* lheading
```markup
这是一个标题
========

// 上面会渲染成

<h1>这是一个标题</h1>
```
lheading 是解析自带分隔符的标签

* html_block
  
html_block 是解析 HTML，如果你在 md 里面写 HTML 标签，那么最后还是会得到 HTML 字符串

* paragraph

paragraph 那就很简单也是经常用到的，就是生成 p 标签。

> 在 ParserBlock 处理之后，可能会生成一种 type 为 inline 的 token。这种 token 属于未完全解析的 token

经过ParserBlock解析此时的children还是为空, 因为部分例如`__ad__`这样的结构还需要继续inline的解析成为children的子token
