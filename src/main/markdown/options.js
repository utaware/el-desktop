// https://www.vuepress.cn/guide/markdown.html - MD扩展

module.exports = {

  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    // 给每个代码块启用行号
    lineNumbers: true
  }

}
