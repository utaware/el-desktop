// markdown-it 加载配置后的实例
const markdownIt = require('../markdown')
// fs
const { readFileContent } = require('../utils/fs')
// handle
const { successHandler, errorHandler } = require('../utils/handler')

module.exports = {

  // 解析markdown语法的文本
  markdownRender (event, args) {

    const { filePath, on } = args

    readFileContent(filePath).then(buffer => {

      const mdContent = buffer.toString()

      const htmlContent = markdownIt.render(mdContent)

      successHandler(event, on, { data: htmlContent })

    }).catch(error => {

      errorHandler(event, on, error)

    })

  }

}
