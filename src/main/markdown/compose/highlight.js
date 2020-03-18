/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-18 14:38:06
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-18 17:28:48
 */

// prismjs 是一种轻量级的、可扩展的语法高亮器，它是用现代Web标准构建的。
// 它在成千上万的网站中使用，包括你每天访问的一些网站。
// 相比于highlightjs，prismjs高亮的代码更准确、更加的细粒度。
// 所以，更推荐使用prismjs做代码高亮。
const prism = require('prismjs')
// const loadLanguages = require('prismjs/components/index')
const prismjsComponentsLanguages = require('prismjs/components').languages

const escapeHtml = require('escape-html')
const chalk = require('chalk')

// 包裹由prism处理(语言匹配高亮)后的字符串
function wrap (code, lang) {
  if (lang === 'text') {
    // Escape string for use in HTML
    code = escapeHtml(code)
  }
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}
// 语言缩略映射
const abbreviateMap = {
  vue: 'markup',
  html: 'markup',
  md: 'markdown',
  rb: 'ruby',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  yml: 'yaml',
  styl: 'stylus'
}

const highlightMethod = (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (abbreviateMap[lang]) {
    lang = abbreviateMap[lang]
  }
  // 递归加载依赖语言
  const loadLanguages = (loadLang) => {
    const preLang = prismjsComponentsLanguages[loadLang].require
    if (preLang) {
      loadLanguages(preLang)
    }
    require('prismjs/components/prism-' + loadLang)
  }

  if (!prism.languages[lang]) {
    try {
      loadLanguages(lang)
    } catch (e) {
      chalk.yellow(`[vuepress] Syntax highlight for language "${lang}" is not supported.`)
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}

module.exports = (config) => {
  return config
    .options
    .highlight(highlightMethod)
    .end()
}
