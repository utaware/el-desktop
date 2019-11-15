# package.json

```json
{
  "main": "index.js",
  "bin": {
    "markdown-it": "bin/markdown-it.js"
  }
}
```

# lib

```js
// 模块
var utils        = require('./common/utils');
var helpers      = require('./helpers');
var Renderer     = require('./renderer');
var ParserCore   = require('./parser_core');
var ParserBlock  = require('./parser_block');
var ParserInline = require('./parser_inline');
var LinkifyIt    = require('linkify-it');
var mdurl        = require('mdurl');
var punycode     = require('punycode');
```

```js
// 相关设置 
var config = {
  'default': require('./presets/default'),
  zero: require('./presets/zero'),
  commonmark: require('./presets/commonmark')
};
```

```js
//  用以validateLink对url校验是否合法, 预防xss
var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}
```

```css
body {
  color: red;
}
```