# Ruler

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L18)

辅助类，被 MarkdownIt#core，MarkdownIt#block 和 MarkdownIt#inline 用来管理一系列的函数（规则）：

* 按定好的顺序维持规则
* 将名称分配给每个规则
* 启用/禁用规则
* 添加/替换规则
* 允许将规则分配给附加的命名链（同等情况下）
* 激活规则的缓存列表

在编写插件之前，你没有必要直接使用这个类。对于简单的规则控制，使用 MarkdownIt.disable，MarkdownIt.enable 和 MarkdownIt.use。

## Ruler.new

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L24)

```js
new Ruler()
```

## Ruler.after

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L194)

```js
Ruler.after(afterName, ruleName, fn[, options])
```

* afterName (String) -- 在此之后新增新规则。
* ruleName (String) -- 新增规则的名称。
* fn (Function) -- 规则的函数。
* options (Object) -- 规则的选项（不是强制的）。

将新规则添加到具有给定名称的链中。也可以参考Ruler.before，Ruler.push。

**options**

* alt - 间隔排列的链的名称数组。

```js
var md = require('markdown-it')();

md.inline.ruler.after('text', 'my_rule', function replace(state) {
  //...
});
```

## Ruler.at

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L117)

```js
Ruler.at(name, fn[, options])
```

* name (String) -- 要替换的规则名。
* fn (Function) -- 新的规则函数。
* options (Object) -- 新的规则选项（不是强制性的）。

用新的函数和选项替换名称的规则。如果未找到名称，则引发错误。

**options**

* alt - 间隔排列的链的名称数组。

用新的规则取代现有的排版替换规则：

```js
var md = require('markdown-it')();

md.core.ruler.at('replacements', function replace(state) {
  //...
});
```

## Ruler.before

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L153)

```js
Ruler.before(beforeName, ruleName, fn[, options])
```

* beforeName (String) -- 在此之前新增新规则。
* ruleName (String) -- 新增规则的名称。
* fn (Function) -- 规则函数。
* options (Object) -- 规则选项（不是强制的）。

将新规则添加到具有给定名称的链中。也可以参考 Ruler.after，Ruler.push。

**options**

* alt - 间隔排列的链的名称数组。

```js
var md = require('markdown-it')();

md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
  //...
});

```

## Ruler.disable

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L312)

```js
Ruler.disable(list[, ignoreInvalid]) -> Array
```

* list (String | Array) -- 禁用的规则名称列表。
* ignoreInvalid (Boolean) -- 设为 true 来在未找到规则时忽略错误。

禁用给定名称的规则。如果没有找到任何规则名称，抛出错误。可以通过第二个参数禁用错误。

返回已找到规则名称的列表（如果没有异常发生）。

也可以参考 Ruler.enable，Ruler.enableOnly。

## Ruler.enable

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L259) 

```js
Ruler.enable(list[, ignoreInvalid]) -> Array
```

* list (String | Array) -- 禁用的规则名称列表。
* ignoreInvalid (Boolean) -- 设为 true 来在未找到规则时忽略错误。

启用给定名称的规则。如果没有找到任何规则名称，抛出错误。可以通过第二个参数禁用错误。

返回已找到规则名称的列表（如果没有异常发生）。

也可以参考 Ruler.disable，Ruler.enableOnly。

## Ruler.enableOnly

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L291)

* list (String | Array) -- 禁用的规则名称列表。
* ignoreInvalid (Boolean) -- 设为 true 来在未找到规则时忽略错误。

启用给定名称的规则，并禁用所有其他的规则。如果没有找到任何规则名称，抛出错误。可以通过第二个参数禁用错误。

## Ruler.getRules

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L343)

```js
Ruler.getRules(chainName) -> Array
```

返回给定链名的激活函数（规则）数组。它分析规则的配置，编译得缓存，如果(配置和缓存中)不存在就返回结果。

默认链名是 '' （空字符串）。不能跳过。这样做是有意为之的，目的在于保持(调用的)鲜明的特征高效地保持单一形态

## Ruler.push

[View source](https://github.com/markdown-it/markdown-it/blob/master/lib/ruler.js#L233)

```js
Ruler.push(ruleName, fn[, options])
```

* ruleName (String) -- 新增规则的名称。
* fn (Function) -- 规则函数。
* options (Object) -- 规则选项（不是强制的）。

将新规则推到链的末尾。也可以参考 Ruler.before，Ruler.after。

**options**

* alt - 间隔排列的链的名称数组。

```js
var md = require('markdown-it')();

md.core.ruler.push('my_rule', function replace(state) {
  //...
});
```
