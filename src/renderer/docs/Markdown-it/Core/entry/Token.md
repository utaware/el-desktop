# Token

> 俗称词法单元。
> md 接收一个字符串，经过一系列的 parser 的处理，变成了一个个 token，接着调用 render 对应的rule，将 token 作为输入，最后输出 HTML 字符串。
> 先来看下 Token 的定义，位于 `lib/token.js`。

```js
function Token(type, tag, nesting) {
  this.type     = type;
  this.tag      = tag;
  this.attrs    = null;
  this.map      = null;
  this.nesting  = nesting;
  this.level    = 0;
  this.children = null;
  this.content  = '';
  this.markup   = '';
  this.info     = '';
  this.meta     = null;
  this.block    = false;
  this.hidden   = false;
}
```

## Attribute

- type
token 的类型，比如 `paragraph_open` 、`paragraph_close`、`hr`，分别会渲染成 `<p>`、`</p>`、`<hr>`。
- tag
标签名称，比如 `p`、`strong`、`''`(空字符串。代表是文字)等等。
- attrs
HTML 标签元素的特性，如果存在，则是一个二维数组，比如 `[["href", "http://dev.nodeca.com"]]`
- map
token 的位置信息，数组只有两个元素，前者是起始行、后者是结束行。
- nesting
标签的类型，1 是开标签，0 是自闭合标签，-1 是关标签。例如 `<p>`、`<hr>`、`</p>`。
- level
缩进的层级。
- children
子token，只有 type 为 inline 或者 image 的 token 会有 children。因为 inline 类型的 token 还会经历一次 parser，提取出更详细的 token，比如以下的场景。
```js
const src = '__advertisement__'
const result = md.render(src)
// 首先得到如下的一个 token
{
  ...,
  content:"__Advertisement :)__",
  children: [Token, ...]
}
// 看出 content 是需要解析并提取出 "__"， "__" 需要被渲染成 <strong> 标签。因此 inline 类型的 children 是用来存放子 token的。
```
- content
放置标签之间的内容。
- markup
一些特定语法的标记。比如 "```" 表明是一个 code block。"**" 是强调的语法。"-" 或者 "+" 是一个列表。
- info
type 为 fence 的 token 会有 info 属性。什么是 fence 呢，如下：
```js
let md = new MarkdownIt()
```
上述的注释内部就是 fence token。它的 info 就是 js，markup 是 "```"。
- meta
一般插件用来放任意数据的。
- block
ParserCore 生成的 token 的 block 为 true，ParserInline 生成的 token 的 block 为 true。
- hidden
如果为 true，该 token 不会被 render。

## Method

- attrIndex
```js
Token.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};
```
根据 attribute name 返回索引。

- attrPush
```js
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};
```
添加一个 [name, value] 对。

- attrSet
```js
Token.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [ name, value ];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};
```
覆盖或添加一个 [name, value] 对。

- attrGet
```js
Token.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name), value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};
```
根据 name 返回属性值

- attrJoin
```js
Token.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([ name, value ]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};
```
根据 name 将当前的 value 拼接到以前的 value 上去。