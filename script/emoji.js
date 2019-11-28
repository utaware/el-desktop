const md = require('markdown-it')()

const content = '# hello world'

const result = md.parse(content)

console.log(result)