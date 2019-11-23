# state

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

> 原型上挂载Token类

- src 传入的字符串
- env 沙箱环境参数
- tokens 被加工传递的语法信息
- inlineMode 判定是否为inline的标识 `inlineMode ? block : inline`
- md Markdown实例