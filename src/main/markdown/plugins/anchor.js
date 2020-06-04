/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-17 16:11:24
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-18 17:31:16
 */

// anchor锚点 http://npm.taobao.org/package/markdown-it-anchor

// const options = {
//   level: 1, // Minimum level to apply anchors on or array of selected levels.
//   slugify: () => {}, // A custom slugification function.
//   permalink: false, // Whether to add permalinks next to titles.
//   renderPermalink: () => {}, // A custom permalink rendering function.
//   permalinkClass: 'header-anchor', // The class of the permalink anchor.
//   permalinkSpace: true, // Place space between the header text and the permalink anchor.
//   permalinkSymbol: '#', // The symbol in the permalink anchor.
//   permalinkBefore: false, // Place the permalink before the title.
//   permalinkHref: () => {}, // A custom permalink href rendering function.
//   callback: undefined // Called with token and info after rendering.
// }

const slugify = require('../utils/slugify')

const anchorPlugin = require('markdown-it-anchor')

const { PLUGINS: { ANCHOR } } = require('../lib/constant')

module.exports = (config) => {
  return config
    .plugin(ANCHOR)
    .use(anchorPlugin, [
      Object.assign({
        slugify,
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#'
      })
    ])
    .end()
}
