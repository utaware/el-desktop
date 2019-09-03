// Replacing the default htmlBlock rule to allow using custom components at
// root level

// 块元素html标签
const blockNames = require('markdown-it/lib/common/html_blocks')
// 闭合html标签
const HTML_OPEN_CLOSE_TAG_RE = require('markdown-it/lib/common/html_re').HTML_OPEN_CLOSE_TAG_RE

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
// html闭合标签的数组, 最后的参数定义是否能够作为段落终止
const HTML_SEQUENCES = [
  // script pre style标签
  [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
  // 注释标签
  [/^<!--/, /-->/, true],
  // <? ?> 标签
  [/^<\?/, /\?>/, true],
  // <! > 声明式标签
  [/^<![A-Z]/, />/, true],
  // <![CDATA[   ]]> 数据库xml忽略转义标签
  [/^<!\[CDATA\[/, /\]\]>/, true],
  // PascalCase Components <MyComponents>首字母大写的组件
  [/^<[A-Z]/, />/, true],
  // custom elements with hyphens 带-自定义元素 <my-components>
  // [/^<\w+\-/, />/, true],
  [/^<\w+-/, />/, true],
  // 块元素
  [new RegExp('^</?(' + blockNames.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true],
  // 闭合标签
  [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'), /^$/, false]
]

module.exports = md => {
  // 为多行标签的解析提供规则
  md.block.ruler.at('html_block', htmlBlock)
}

// 处理多行html标签
function htmlBlock (state, startLine, endLine, silent) {
  let i, nextLine, lineText
  let pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (!state.md.options.html) { return false }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false }

  lineText = state.src.slice(pos, max)

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break }
  }

  if (i === HTML_SEQUENCES.length) {
    return false
  }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2]
  }

  nextLine = startLine + 1

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break }

      pos = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]
      lineText = state.src.slice(pos, max)

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++ }
        break
      }
    }
  }

  state.line = nextLine

  const token = state.push('html_block', '', 0)
  token.map = [startLine, nextLine]
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true)

  return true
}
