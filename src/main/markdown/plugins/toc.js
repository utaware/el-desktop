/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-17 16:27:55
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-18 17:19:45
 */

// toc锚点目录列表 http://npm.taobao.org/package/markdown-it-table-of-contents

// const options = {
//   // Headings levels to use (2 for h2:s etc)
//   includeLevel: [1, 2],
//   // The class for the container DIV
//   containerClass: 'table-of-contents',
//   // A custom slugification function
//   slugify: encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
//   // Regex pattern of the marker to be replaced with TOC
//   markerPattern: /^\[\[toc\]\]/im,
//   // Type of list (ul for unordered, ol for ordered)
//   listType: 'ul',
//   // A function for formatting headings (see below)
//   format: '',
//   // If true, renders all the headers in TOC, even if the headers are in incorrect order
//   forceFullToc: false,
//   // Optional HTML string for container header
//   containerHeaderHtml: '<div class="toc-container-header">Contents</div>',
//   // Optional HTML string for container footer
//   containerFooterHtml: '<div class="toc-container-footer">Footer</div>',
//   // A function for transforming the TOC links
//   transformLink: undefined
// }

const tocPlugin = require('markdown-it-table-of-contents')

const { PLUGINS: { TOC } } = require('../lib/constant')

const slugify = require('../utils/slugify')
const parseHeaders = require('../utils/parseHeaders')

module.exports = (config) => {
  return config
    .plugin(TOC)
    .use(tocPlugin, [
      Object.assign({
        slugify,
        includeLevel: [2, 3],
        format: parseHeaders
      })
    ])
    .end()
}
