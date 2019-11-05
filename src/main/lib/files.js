// 文件操作相关

const { promisify } = require('util')

const fs = require('fs-extra')

const { parseMarkdownFile } = require('../mark/markdown2vue')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

module.exports = {
  // 文件夹路径结构读取
  readFileFolderPath (event, args) {

    const { dirPath, on } = args

    readdirPromise(dirPath, { withFileTypes: true }).then(files => {

      const result = files.map(v => {
        const { name } = v
        return {
          name,
          isDirectory: v.isDirectory(),
          isFile: v.isFile(),
          path: `${dirPath}\\${name}`,
          children: []
        }
      })

      event.sender.send(on, result)

    }).catch(err => {

      console.log(err)

      event.sender.send(on, [])

    })

  },
  // 读取文件内容
  readFileContent (event, args) {

    const { filePath, on } = args

    readFilePromise(filePath).then(data => {

      const content = data.toString()

      const result = parseMarkdownFile(content)

      event.sender.send(on, result)

    }).catch(error => {

      event.sender.send(on, error)

    })

  }

}
