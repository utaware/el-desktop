# ParserInline

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js#L6)

`内部的`

## ParserInline.new

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js#L40)

```js
new ParserInline()
```

## ParserInline.parse

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js#L159)

```js
ParserInline.parse(str, md, env, outTokens)
```

处理输入字符串和推入内联 token 到 outTokens

## ParserInline#ruler

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js#L48)

```js
ParserInline#ruler -> Ruler
```

Ruler 实例。维持内联规则的配置。

## ParserInline#ruler2

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js#L60)

```js
ParserInline#ruler2 -> Ruler
```

Ruler 实例。用于后处理的第二标尺(second ruler)（例如强调规则）。