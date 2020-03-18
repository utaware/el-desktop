/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-17 13:55:58
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-18 18:14:38
 */

//  markdown实例
const config = require('./base')
// markdown插件
const markdownItPlugins = [
  require('./plugins/emoji'),
  require('./plugins/anchor'),
  require('./plugins/toc')
]
// vue修改插件
const composePlugins = [
  require('./compose/highlight'),
  require('./compose/component'),
  require('./compose/preWrapper'),
  require('./compose/highlightLines'),
  require('./compose/lineNumbers'),
  require('./compose/snippet'),
  require('./compose/link')
]
// 自定义插件
const customizePlugins = [
  require('./customize/container')
]
// 插件
const pluginLoaders = [
  ...markdownItPlugins,
  ...composePlugins,
  ...customizePlugins
]

const chain = pluginLoaders.reduce((current, next) => {
  return next(current)
}, config)

module.exports = chain.toMd()
