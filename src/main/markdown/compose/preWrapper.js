/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-18 16:50:20
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-18 17:33:31
 */

// markdown-it plugin for wrapping <pre> ... </pre>.
//
// If your plugin was chained before preWrapper, you can add additional eleemnt directly.
// If your plugin was chained after preWrapper, you can use these slots:
//   1. <!--beforebegin-->
//   2. <!--afterbegin-->
//   3. <!--beforeend-->
//   4. <!--afterend-->

const { PLUGINS: { PRE_WRAPPER } } = require('../lib/constant')

const preWrapperMethod = (md) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const rawCode = fence(...args)
    return `<!--beforebegin--><div class="language-${token.info.trim()} extra-class">` +
    `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
  }
}

module.exports = (config) => {
  return config
    .plugin(PRE_WRAPPER)
    .use(preWrapperMethod)
    .end()
}
