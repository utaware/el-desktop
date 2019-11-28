// 引入markdown-it插件
const Config = require('markdown-it-chain')
const config = new Config()
// markdown-it plugin
const emojiPlugin = require('markdown-it-emoji')
const anchorPlugin = require('markdown-it-anchor')
const tocPlugin = require('markdown-it-table-of-contents')
const containerPlugin = require('markdown-it-container')
// other plugin
const highlightCode = require('./plugins/highlight')
const componentPlugin = require('./plugins/component')
const preWrapperPlugin = require('./plugins/preWrapper')
const highlightLinesPlugin = require('./plugins/highlightLines')
const lineNumbersPlugin = require('./plugins/lineNumbers')
const snippetPlugin = require('./plugins/snippet')
const convertRouterLinkPlugin = require('./plugins/link')
// const hoistScriptStylePlugin = require('./plugins/hoist')
// config
const slugify = require('./utils/slugify')
const parseHeaders = require('./utils/parseHeaders')
const pluginOptions = require('./lib/options')
const { anchor, toc } = pluginOptions
// 常量字符串
const { PLUGINS } = require('./lib/constant')
const {
  EMOJI,
  ANCHOR,
  TOC,
  COMPONENT,
  PRE_WRAPPER,
  HIGHLIGHT_LINES,
  LINE_NUMBERS,
  SNIPPET,
  CONVERT_ROUTER_LINK,
  CONTAINER
  // HOIST_SCRIPT_STYLE,
} = PLUGINS
// https://www.xiaoyulive.top/favorite/docs/Plugins_Markdown_It.html#%E6%A0%87%E7%AD%BE%E5%9E%8B%E6%8F%92%E4%BB%B6
// https://www.jianshu.com/p/a95c04a68d14
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
  // containerPlugin
  .plugin(CONTAINER)
  .use(containerPlugin, ['CARD', {
    validate: function (params) {
      return params.trim().match(/^CARD\s+(.*)$/)
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^CARD\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        const contentProps = m[1]
        return `<MarkdownCard contentProps="${contentProps}">\n`
      } else {
        return '</MarkdownCard>\n'
      }
    }
  }])
  .end()
  // 代码段
  .plugin(SNIPPET)
  .use(snippetPlugin)
  .end()
  // 链接样式修改
  .plugin(CONVERT_ROUTER_LINK)
  .use(convertRouterLinkPlugin, [{
    target: '_blank',
    rel: 'noopener noreferrer'
  }])
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
// parseMarkdownFile
module.exports = md
