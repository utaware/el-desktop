// 限定类型
type nestingType = -1 | 0 | 1
type ParentType = 'blockquote' | 'list' | 'root' | 'paragraph' | 'reference'
// core_state
interface State {
  new (src: string, md: MarkdownIt, env: object): State;
  src: String;
  env: Object;
  tokens: Array<Token>;
  inlineMode: Boolean;
  md: MarkdownIt;
  Token: Token;
}
// rule_fn
interface RuleFunc {
  (state: State) : any
}
// rule
interface RuleItem {
  name: string;
  enabled: boolean;
  fn: RuleFunc;
  alt: string[]
}

interface Rule {
  // Find rule index by name
  // 从规则中查找对应name的序号 没有则为-1
  __find__ (name: string) : number | RuleItem;
  // Build rules lookup cache
  // 遍历rule将rule中的alt存放到新的chain数组中
  // 重置cache为空对象
  // 遍历chain, 将每个alt以键值为空数组存放到cache中
  // 遍历rule, 将规则中包含了alt的fn函数存入对应cache[alt]的数组
  // 把针对name关联的fn 转变为针对单个alt => fn 集合
  __compile__ () : void;
  // Replace rule by name with new function & options.
  // 从rule中调用find找寻名为name的规则
  // 使用传入的fn替换rule.fn, 使用opt.alt替换alt
  at (name: string, fn: RuleFunc, options: object): void
  // Add new rule to chain before one with given name
  // 在指定的规则前插入新的规则
  before (beforeName: string, ruleName: string, fn: RuleFunc, options: object): void;
  // Add new rule to chain after one with given name
  // 在指定的规则后插入新的规则
  after (afterName: string, ruleName: string, fn: RuleFunc, options: object): void;
  // Push new rule to the end of chain.
  // 在最后插入新的规则
  push (ruleName: string, fn: string, options: object): void;
  // Enable rules with given names.
  // 启用指定列表里的规则
  enable (list: string[], ignoreInvalid: boolean): string[];
  // Enable rules with given names.
  // 启用指定列表里的规则
  enableOnly (list: string[], ignoreInvalid: boolean): void;
  // Disable rules with given names.
  // 禁用指定列表里的规则
  disable (list: string[], ignoreInvalid: boolean): string[];
  // Return array of active functions (rules) for given chain name.
  // 获取缓存的规则名字
  getRules (chainName: string): RuleItem[];
  __rules__: RuleItem[];
  __cache__: null;
}

interface MarkdownIt {}

interface Token {
  // Type of the token (string, e.g. "paragraph_open")
  type: string ;
  // html tag name, e.g. "p"
  tag: string;
  // Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
  attrs: string[];
  // Source map info. Format: `[ line_begin, line_end ]`
  map: number[];
  // Level change (number in {-1, 0, 1} set), where:
  //  * -  `1` means the tag is opening
  //  * -  `0` means the tag is self-closing
  //  * - `-1` means the tag is closing
  nesting: nestingType;
  // An array of child nodes (inline and img tokens)
  children: Token[];
  // In a case of self-closing tag (code, html, fence, etc.),
  content: string;
  // '*' or '_' for emphasis, fence string for fence, etc.
  markup: string;
  // fence infostring (代码块)信息字符串
  info: string;
  // A place for plugins to store an arbitrary data
  // 一个给插件用于存储任意数据的地方
  meta: object;
  // True for block-level tokens, false for inline tokens.
  // Used in renderer to calculate line breaks
  // 对于块级 token 来说为 true，对于 inline 令牌来说为 false。在渲染器中用于计算换行。
  block: boolean;
  // If it's true, ignore this element when rendering. Used for tight lists
  // to hide paragraphs.
  // 如果设为 true，渲染时会忽略这个元素。用于在紧凑的列表隐藏段落。
  hidden: boolean;
  // 按名称搜索属性索引。
  attrIndex (name: string): number;
  // 将 [ name, value ] 的属性添加到列表中。必要时初始化。
  attrPush (attrData: string[]): void;
  // 将 name 属性设置为 value。如果(旧值)存在，则重写旧值。
  attrSet (name: string, value: string[]): void;
  // 获取属性 name 的值，如果不存在，则为 null。
  attrGet (name: string): string[];
  // 通过间隔将值添加到现有属性中。如果(这个值)不存在，用来创建新属性，token 类的操作很有用。
  attrJoin (name: string, value: string): void;
  /*
  * type 类型
  * tag  标签
  * nesting 开闭
  */ 
  constructor (type, tag, nesting);
}

interface StateBlock {
  new (src: String, md: MarkdownIt, env: object, tokens: Token[]): StateBlock;
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
  // 初始制表符长度 '\t' === '	' 为了把前面的字符补足到4位
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
  // 往tokens里添加一个新生成的Token并返回 (赋予level, block(true))
  push (type: string, tag: string, nesting: nestingType): Token;
  // 传入的行是否为空行
  isEmpty (line: number): boolean;
  // 从当前行往下跳过空行, 返回最后不为空行的行
  skipEmptyLines (from: number): number;
  // 跳过当前字符位置往后的空格, 返回不为空格的位置
  skipSpaces (pos: number): number;
  // 从pos位置开始到min反向找到离pos最近不为空格的位置
  skipSpacesBack (pos: number, min: number): number;
  // 从pos位置跳过某个字符
  skipChars (pos: number, code: string): number;
  // 从pos位置到min跳过某个字符
  skipCharsBack (pos: number, code: string, min: number): number;
  // 截取从begin到end行的字符串
  getLines (begin: number, end: number, indent: number, keepLastLF: boolean): string;
}

interface StateBlock {
  new (src: String, md: MarkdownIt, env: object, outTokens: Token[]): StateBlock;
  src: string;
  md: MarkdownIt;
  env: object;
  tokens: Token;
  tokens_meta: object[];
  // 当前 token 的 content 的第几个字符串索引
  pos: number;
  // 当前 token 的 content 的最大索引
  posMax: number;
  // 嵌套等级
  level: number;
  // 存放一段完整的字符串
  pending: string;
  pendingLevel: number;
  cache: object;
  // 存放一些特殊标记的分隔符，比如 *、~ 等。元素格式如下:
  delimiters: object[];
  _prev_delimiters: object[];
  // 整个作为文本生成token
  pushPending (): Token;
  // pusht oken
  push (type: string, tag: string, nesting: nestingType): Token;
  // 查找指定语法
  scanDelims (start: number, canSplitWord: boolean): object;
}

