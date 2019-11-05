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
// config
const slugify = require('./slugify')
const parseHeaders = require('./parseHeaders')
const pluginOptions = require('./options')
const { anchor, toc } = pluginOptions
// 常量字符串
const { PLUGINS } = require('./constant')
const { EMOJI, ANCHOR, TOC, COMPONENT, PRE_WRAPPER } = PLUGINS

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
  // 代码块高亮--额外添加包装标签
  .plugin(PRE_WRAPPER)
  .use(preWrapperPlugin)
  .end()
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

const md = config.toMd()

module.exports = {

  parseMarkdownFile (content) {

    return md.render(content)

  }

}
