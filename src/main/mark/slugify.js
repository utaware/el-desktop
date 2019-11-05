// string.js slugify drops non ascii chars so we have to
// use a custom implementation here
// @ts-ignore

// 格式化音调符号
const removeDiacritics = require('diacritics').remove

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

module.exports = function (str) {
  return removeDiacritics(str)
  // Remove control characters
    .replace(rControl, '')
    // Replace special characters
    .replace(rSpecial, '-')
    // Remove continous separators
    // .replace(/\-{2,}/g, '-')
    .replace(/-{2,}/g, '-')
    // Remove prefixing and trailing separtors
    // .replace(/^\-+|\-+$/g, '')
    .replace(/^-+|-+$/g, '')
    // ensure it doesn't start with a number (#121)
    .replace(/^(\d)/, '_$1')
    // lowercase
    .toLowerCase()
}
