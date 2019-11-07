// 引入markdown-it插件
const Config = require('markdown-it-chain')
const config = new Config()
// markdown-it plugin
const emojiPlugin = require('markdown-it-emoji')
const anchorPlugin = require('markdown-it-anchor')
const tocPlugin = require('markdown-it-table-of-contents')
// other plugin
const highlightCode = require('./highlight')
const componentPlugin = require('./component')
const preWrapperPlugin = require('./preWrapper')
const highlightLinesPlugin = require('./highlightLines')
const lineNumbersPlugin = require('./lineNumbers')
const snippetPlugin = require('./snippet')
const convertRouterLinkPlugin = require('./link')
// const hoistScriptStylePlugin = require('./hoist')
// config
const slugify = require('./slugify')
const parseHeaders = require('./parseHeaders')
const pluginOptions = require('./options')
const { anchor, toc } = pluginOptions
// 常量字符串
const { PLUGINS } = require('./constant')
const {
  EMOJI,
  ANCHOR,
  TOC,
  COMPONENT,
  PRE_WRAPPER,
  HIGHLIGHT_LINES,
  LINE_NUMBERS,
  SNIPPET,
  CONVERT_ROUTER_LINK
  // HOIST_SCRIPT_STYLE,
} = PLUGINS

config
  .options
  // 基本设置
  .html(true)
  .breaks(true)
  .linkify(true)
  .highlight(highlightCode)
  .end()
  // vue组件--保护标签不被筛选过滤
  .plugin(COMPONENT)
  .use(componentPlugin)
  .end()
  // 代码块高亮行
  .plugin(HIGHLIGHT_LINES)
  .use(highlightLinesPlugin)
  .end()
  // 代码块高亮--额外添加包装标签
  .plugin(PRE_WRAPPER)
  .use(preWrapperPlugin)
  .end()
  // 代码段
  .plugin(SNIPPET)
  .use(snippetPlugin)
  .end()
  // 链接样式修改
  .plugin(CONVERT_ROUTER_LINK)
  .use(convertRouterLinkPlugin, [Object.assign({
    target: '_blank',
    rel: 'noopener noreferrer'
  })])
  .end()
  // style,script标签分裂
  // .plugin(HOIST_SCRIPT_STYLE)
  // .use(hoistScriptStylePlugin)
  // .end()
  // emoji表情 http://npm.taobao.org/package/markdown-it-emoji
  .plugin(EMOJI)
  .use(emojiPlugin)
  .end()
  // anchor锚点 http://npm.taobao.org/package/markdown-it-anchor
  .plugin(ANCHOR)
  .use(anchorPlugin, [Object.assign({
    slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  }, anchor)])
  .end()
  // toc锚点目录列表 http://npm.taobao.org/package/markdown-it-table-of-contents
  .plugin(TOC)
  .use(tocPlugin, [Object.assign({
    slugify,
    includeLevel: [2, 3],
    format: parseHeaders
  }, toc)])
  .end()
  // lineNumbersPlugin
  .plugin(LINE_NUMBERS)
  .use(lineNumbersPlugin)
  .end()

const md = config.toMd()

module.exports = {

  parseMarkdownFile (content) {

    return md.render(content)

  }

}
