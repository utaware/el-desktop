# Core

[源代码](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js#L7)

* Description
  * 顶层规则执行器。粘合块/内联的解析器，并进行中间(过程)的转换。
* Constructor
  * new Core
* Class methods
  * process
* Instance properties
  * ruler
## Core.new

[源代码](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js#L26)

```js
new Core()
```


## Core.process

[源代码](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js#L45)

```js
Core.process(state)
```
执行核心的链式规则。

# Core.ruler

[源代码](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js#L32)

```text
Core#ruler -> Ruler
```

Ruler 实例。维持核心规则的配置。



