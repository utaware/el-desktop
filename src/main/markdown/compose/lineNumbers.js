/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-18 16:57:22
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-18 16:59:11
 */

// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

const lineNumbersMethod = (md) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>')
    )

    const lines = code.split('\n')
    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((line, index) => `<span class="line-number">${index + 1}</span><br>`).join('')

    const lineNumbersWrapperCode =
      `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace('<!--beforeend-->', `${lineNumbersWrapperCode}<!--beforeend-->`)
      .replace('extra-class', 'line-numbers-mode')

    return finalCode
  }
}

const { PLUGINS: { LINE_NUMBERS } } = require('../lib/constant')

module.exports = (config) => {
  return config
    .plugin(LINE_NUMBERS)
    .use(lineNumbersMethod)
    .end()
}
