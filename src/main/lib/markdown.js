// node
const path = require('path')
// markdown-it 加载配置后的实例
const markdownIt = require('../markdown')
// fs
const { readFileContent } = require('../utils/fs')
// handle
const { successHandler, errorHandler } = require('../utils/handler')

module.exports = {

  // 解析md文件
  markdownRenderWithMd (event, args) {

    const { filePath, on } = args

    console.log('filePath', filePath)

    readFileContent(filePath).then(buffer => {

      const mdContent = buffer.toString()

      const htmlContent = markdownIt.render(mdContent)

      successHandler(event, on, { data: htmlContent })

    }).catch(error => {

      errorHandler(event, on, error)

    })

  },
  // 解析代码
  markdownRenderWithCode (event, args) {

    const { currentFilePath, codeRelativePath, params, on } = args

    const [ language = 'js' ] = params

    const { sep } = path

    const folderPath = currentFilePath.split(sep)

    const dirPath = folderPath.slice(0, -1).join(sep)

    const filePath = path.resolve(dirPath, codeRelativePath).trim()

    readFileContent(filePath).then(buffer => {

      const fileContent = buffer.toString()

      const markup = '```'

      const mdContent = `${markup} ${language} ${params}\n${fileContent}\n${markup}`
      
      const htmlContent = markdownIt.render(mdContent)

      successHandler(event, on, {
        data: {
          text: fileContent,
          html: htmlContent
        }
      })

    }).catch(error => {

      errorHandler(event, on, error)

    })

  }

}
