# state

```js
var Token = require('../token');
var isSpace = require('../common/utils').isSpace;


function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables
  this.blkIndent  = 0; // required block content indent (for example, if we are
                       // inside a list, it would be positioned after list marker)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);
    // 每行缩进
    if (!indent_found) {
      // 如果当前是空白字符 0x09为tab 4格缩进, 0x20为space
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
    // 如果是换行符 || 结尾 0x0A 换行符
    // 换行情况收集每行开始, 结束, 缩进的位置
    if (ch === 0x0A || pos === len - 1) {
      // 不是换行的情况, 结尾
      if (ch !== 0x0A) { pos++; }
      // 开始位置
      this.bMarks.push(start);
      // 结束位置
      this.eMarks.push(pos);
      // 空格缩进
      this.tShift.push(indent);
      // 偏移量缩进
      this.sCount.push(offset);
      this.bsCount.push(0);
      // 换行重新开始计入换行
      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  var token = new Token(type, tag, nesting);
  token.block = true;

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) { break; }
  }
  return pos;
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, lineIndent, ch, first, last, queue, lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = Token;


module.exports = StateBlock;
```

```ts
type ParentType = 'blockquote' | 'list' | 'root' | 'paragraph' | 'reference'

interface StateBlock {
  src: string;
  md: MarkdownIt;
  env: object;
  tokens: Token;
  // 存储每一行的起始位置，因为 parse 的过程是根据换行符逐行扫描
  bMarks: number[];
  // 存储每一行的终止位置
  eMarks: number[];
  // 存储每一行第一个非空格的字符的位置（制表符长度只算做1）
  tShift: number[];
  // 存储每一行第一个非空格的字符串的位置（制表符长度为4）
  sCount: number[];
  // 初始制表符长度 '\t' === '	' (3) 这里都是0
  bsCount: number[];
  // 必需的块内容缩进
  blkIndent: number;
  // 当前所在行数
  line: number;
  // 总行数
  lineMax: number;
  // 列表的松散/紧密模式
  tight: boolean;
  // 无需列表和有序列表的缩进
  ddIndent: number;
  listIndent: number;
  // 用在列表中以确定它们是否中断了一个段落
  parentType: ParentType;
  // 标签嵌套等级
  level: number;
  // render
  result: string;
  // 想tokens添加token, 附加level和block(true)属性
  push (type: string, tag: string, nesting: number): token
  // 单行是否为空行 => 内容开始位置 + 偏移量 >= 结束位置
  // 如果有内容是必然小于结束位置的
  isEmpty (line: number|string) : boolean
  // 找到from后的非空白行 => 跳过空白行
  skipEmptyLines (from: number) : number
  // 找到pos后的第一个非空白字符串 => 跳过空白字符串
  skipSpaces (pos: number) : number
  // 从pos到min之间的非空白字符串 => 反向 如果没有直接返回pos
  skipSpacesBack (pos: number, min: number) : number
  // 从pos开始找第一个字符串序列不为code的位置 跳过某个字符串
  skipChars (pos: number, code: string) : number 
  // 从pos开始逆向查找第一个字符串不为code的位置 反向跳过某个字符串
  skipCharsBack (pos: number, code: string, min: number): number
  // 拿到开始行到结束行的字符串内容
  getLines (begin: string, end: string, indent: string, keepLastLF: boolean) : string
}
```