/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-17 14:13:32
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-17 16:26:13
 */

// emoji表情 http://npm.taobao.org/package/markdown-it-emoji

// const options = {
//   defs: { name1: "smile", name2: "laughing" }, // rewrite available emoji definitions
//   enabled: [], // disable all emojis except whitelisted
//   shortcuts: { "smile": [ ":)", ":-)" ], "laughing": ":D" } // rewrite default shortcuts
// }

const emojiPlugin = require('markdown-it-emoji')

const { PLUGINS: { EMOJI } } = require('../lib/constant')

module.exports = (config) => {
  return config
    .plugin(EMOJI)
    .use(emojiPlugin)
    .end()
}
