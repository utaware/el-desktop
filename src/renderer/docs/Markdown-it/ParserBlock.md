# ParserBlock

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js#L6)

**说明** 块级别的 tokenizer

## ParserBlock.new

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js#L32)

```js
new ParserBlock()
```

## ParserBlock.parse

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js#L108)

```js
ParserBlock.parse(str, md, env, outTokens)
```

处理输入字符串和推入块级别的 `token` 到 `outTokens`

## ParserBlock#ruler

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js#L38)

```js
ParserBlock#ruler -> Ruler
```

Ruler 实例。维持块规则的配置。