const compose = require('./compose')
const parseHeaders = require('./parseHeaders')
const removeNonCodeWrappedHTML = require('./removeNonCodeWrappedHTML')

// Also clean the html that isn't wrapped by code.
// Because we want to support using VUE components in headers.
// e.g. https://vuepress.vuejs.org/guide/using-vue.html#badge
module.exports = compose(
  removeNonCodeWrappedHTML,
  parseHeaders
)

