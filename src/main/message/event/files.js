// 文件操作相关
// node
const { promisify } = require('util')
const path = require('path')
// modules
const fs = require('fs-extra')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

module.exports = {
  // 读取文件内容
  readFileContent (event, args) {

    const { filePath, on, options } = args

    readFilePromise(filePath, options).then(buffer => {

      const data = buffer.toString()

      this.emit('successHandler', event, on, { data })

    }).catch(error => {

      this.emit('errorHandler', event, on, { error })

    })

  },
  // 文件夹路径结构读取
  readFileFolderPath (event, args) {

    const { dirPath, on } = args

    readdirPromise(dirPath, { withFileTypes: true }).then(files => {

      const data = files.map(v => {
        const { name } = v
        return {
          name,
          isDirectory: v.isDirectory(),
          isFile: v.isFile(),
          path: `${dirPath}${path.sep}${name}`,
          dirPath,
          children: []
        }
      })

      this.emit('successHandler', event, on, { data })

    }).catch(error => {

      this.emit('errorHandler', event, on, { error })

    })

  }

}
