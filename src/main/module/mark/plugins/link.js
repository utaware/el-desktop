// markdown-it plugin for:
// -- vuepress
// 1. adding target="_blank" to external links
// 2. converting internal links to <router-link>
// 1. 外部链接添加 target noreffer 标识
// 2. 讲相对的地址转化成router-link 路由的形式
// -- my
// 1. 不需要target noreffer相关标识
// 2. 不需要router-link (切换页面非路由方式)
// 3. 区分内外链接(linkify-it), 外部调用electron, 内部提交到store
// 4、内部路径解析和自定义属性传递参数 => env 传递文档路径, href => 相对路径

const path = require('path')

const linkifyIt = require('linkify-it')()

const methodName = '@click'
const methodHanlder = 'handlerLinkClick'

module.exports = (md, externalAttrs) => {

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    
    const { filePath } = env
    
    const token = tokens[idx]
    
    const { sep } = path

    const folderPath = filePath.slice(0, filePath.lastIndexOf(sep))
    
    const href = token.attrGet('href')

    const linkFile = path.resolve(folderPath, href)
    // 外部链接类似于网页域名和email邮箱会被认为true, 相对链接必然是false
    const isExternal = linkifyIt.test(href)
    
    const dataSet = { filePath, linkFile, isExternal }
    
    token.attrPush([methodName, methodHanlder])

    for (const key in dataSet) {

      token.attrPush([`data-${key}`, dataSet[key]])
    
    }

    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    // add OutBoundLink to the beforeend of this link if it opens in _blank.
    return '<OutboundLink/>' + self.renderToken(tokens, idx, options)
  }
}
