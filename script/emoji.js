const linkify = require('linkify-it')()

console.log(linkify.test('Site github.com!'))
console.log(linkify.test('www.baodu.com'))
console.log(linkify.test('http://www.baodu.com'))
console.log(linkify.test('./test.md'))