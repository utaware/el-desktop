# State

state作为一个函数供parse: (src, md, env, outTokens) => {}调用

* src
* md
* env
* outTokens

```typescript
interface token {

  // Type of the token (string, e.g. "paragraph_open")
  type: string 
  // html tag name, e.g. "p"
  tag: string
  // Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
  attrs: array
  // Source map info. Format: `[ line_begin, line_end ]`
  map: array
  // Level change (number in {-1, 0, 1} set), where:
  //  * -  `1` means the tag is opening
  //  * -  `0` means the tag is self-closing
  //  * - `-1` means the tag is closing
  nesting: number
  // An array of child nodes (inline and img tokens)
  children: array
  // In a case of self-closing tag (code, html, fence, etc.),
  content: string
  // '*' or '_' for emphasis, fence string for fence, etc.
  markup: string
  // fence infostring (代码块)信息字符串
  info: string
  // A place for plugins to store an arbitrary data
  // 一个给插件用于存储任意数据的地方
  meta: object
  // True for block-level tokens, false for inline tokens.
  // Used in renderer to calculate line breaks
  // 对于块级 token 来说为 true，对于 inline 令牌来说为 false。在渲染器中用于计算换行。
  block: boolean
  // If it's true, ignore this element when rendering. Used for tight lists
  // to hide paragraphs.
  // 如果设为 true，渲染时会忽略这个元素。用于在紧凑的列表隐藏段落。
  hidden: boolean

  // 按名称搜索属性索引。
  attrIndex (name: string): number

  // 将 [ name, value ] 的属性添加到列表中。必要时初始化。
  attrPush (attrData: array): void

  // 将 name 属性设置为 value。如果(旧值)存在，则重写旧值。
  attrSet (name: string, value: array): void

  // 获取属性 name 的值，如果不存在，则为 null。
  attrGet (name: string): array

  // 通过间隔将值添加到现有属性中。如果(这个值)不存在，用来创建新属性，token 类的操作很有用。
  attrJoin (name: string, value: string): void

  /*
  * type 类型
  * tag  标签
  * nesting 开闭
  */ 
  constructor (type, tag, nesting) {}
}

```

```typescript
interface StateBlock {
  // 源代码字符串
  src: string
  // link to parser instance markdown-it实例
  md: object
  // 环境
  env: object
  // 语法片段
  tokens: token[]
  // 记录每段开始位置的数组
  bMarks: array
  // 记录每段结束位置的数组
  eMarks: array
  // 第一个非空格字符的偏移量（制表符未展开）
  tShift: array
  // 每行缩进（展开制表符）
  sCount: array
  // 初始制表符长度 每行（b标记）和该行的实际开始。
  bsCount: array
  // required block content indent (for example, if we are
  // inside a list, it would be positioned after list marker)
  blkIndent: number
  // line index in src
  line: number
  // lines count
  lineMax: number
  // loose/tight mode for lists 列表的松紧模式
  tight: boolean
  // indent of the current dd block (-1 if there isn't any)
  // 无需列表缩进
  ddIndent: number 
  // indent of the current list block (-1 if there isn't any)
  // 有序列表缩进
  listIndent: number
  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  parentType: string
  // level
  level: string

  // Push new token to "stream".
  // nesting => opening or closeing tag
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

  /*
  * src 源字符串
  * md md实例
  * env 环境
  * outTokens 挂载的tokens
  */ 
  constructor (src, md, env, outTokens) {}
}
```