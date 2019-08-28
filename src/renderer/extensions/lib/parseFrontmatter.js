// support for YAML, JSON, TOML or Coffee Front-Matter
const matter = require('gray-matter')
// TOML 的目标是成为一个拥有明显语义且容易阅读的最小化的配置文件格式。
// TOML 被设计成可以无歧义地被映射为哈希表，从而可以很容易地被解析成各种语言中的数据结构。
const toml = require('toml')

module.exports = function parseFrontmatter (content) {
  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  })
}
