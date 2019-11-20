# Ruler

可以认为它是职责链函数的管理器。因为它内部存储了很多 rule 函数，rule 的职能分为两种，一种是 parse rule，用来解析用户传入的字符串，生成 token，另一种是 render rule，在产出 token 之后，再根据 token 的类型调用不同的 render rule，最终吐出 HTML 字符串。

## constructor 

```js
function Ruler() {
  this.__rules__ = [];

  this.__cache__ = null;
}

```

### __rules__

用来放所有的 rule 对象，它的结构如下：

```js
{
  name: XXX,
  enabled: Boolean, // 是否开启
  fn: Function(), // 处理函数
  alt: [ name2, name3 ] // 所属的职责链名称
}
```

### __cache__

用来存放 rule chain 的信息，它的结构如下：

```js
{
  职责链名称: [rule1.fn, rule2.fn, ...]
}
```

> 注意: 默认有个名称为空字符串('')的 rule chain，它的 value 是一个囊括所有 rule.fn 的数组。

## prototype

### __find__

```js
Ruler.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};
```
根据 rule name 查找它在 `__rules__` 的索引

### __compile__

```js
Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [ '' ];

  // 遍历__rules__ 在启用的rule.alt中遍历同步描述
  // 同步启用的rules的描述
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return; }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};
  // cache同步启用的rule函数
  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      if (chain && rule.alt.indexOf(chain) < 0) { return; }

      self.__cache__[chain].push(rule.fn);
    });
  });
};
```
生成职责链信息。

1. 先通过 `__rules__` 的 rule 查找所有的 rule chain 对应的 key 名称。这个时候 rule 的 alt 属性就显得尤为重要，因为它表示除了属于默认的职责链之外，还属于 alt 所对应的职责链。默认存在一个 key 为空字符串('') 的职责链，任何 rule.fn 都属于这个职责链。

2. 再将 rule.fn 映射到对应的 key 属性上，缓存在 `__cache__` 属性上。

举个栗子：

```js
let ruler = new Ruler()
ruler.push('rule1', rule1Fn, {
  alt: 'chainA'
})
ruler.push('rule2', rule2Fn, {
  alt: 'chainB'
})
ruler.push('rule3', rule3Fn, {
  alt: 'chainB'
})
ruler.__compile__()

// 我们能得到如下的结构
ruler.__cache__ = {
  '': [rule1Fn, rule2Fn, rule3Fn],
  'chainA': [rule1Fn],
  'chainB': [rule2Fn, rule3Fn],
}
// 得到了三个 rule chain,分别为 '', 'chainA', 'chainB'.
```

## at

```js
Ruler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};
```
用来替换某一个 rule 的 fn 或者更改它所属的 chain name。

### before

```js
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};
```

在某个 rule 之前插入一个新 rule。

### after

```js
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};
```

在某个 rule 之后插入一个新 rule。

### push

```js
Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};
```

增加 rule。

### enable

```js
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};
```

开启 list 列出的 rule，不影响其他 rule。

### enableOnly

```js
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};
```

先将其他 rule 都禁用，仅仅只开启 list 对应的 rule。

### getRules

```js
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }
  return this.__cache__[chainName] || [];
};
```

根据 rule chain 的 key，获取对应的 fn 函数队列。


