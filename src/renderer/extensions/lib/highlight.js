// prismjs 是一种轻量级的、可扩展的语法高亮器，它是用现代Web标准构建的。
// 它在成千上万的网站中使用，包括你每天访问的一些网站。
// 相比于highlightjs，prismjs高亮的代码更准确、更加的细粒度。
// 所以，更推荐使用prismjs做代码高亮。
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')

const { logger, chalk, escapeHtml } = require('./shared-utils')

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

// 包裹由prism处理(语言匹配高亮)后的字符串
function wrap (code, lang) {
  if (lang === 'text') {
    // Escape string for use in HTML
    code = escapeHtml(code)
  }
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}

module.exports = (str, lang) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'rb') {
    lang = 'ruby'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (lang === 'sh') {
    lang = 'bash'
  }
  if (lang === 'yml') {
    lang = 'yaml'
  }
  if (lang === 'styl') {
    lang = 'stylus'
  }

  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      logger.warn(chalk.yellow(`[vuepress] Syntax highlight for language "${lang}" is not supported.`))
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
