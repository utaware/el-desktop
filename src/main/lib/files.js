// 文件操作相关
const { readFolderDirectory } = require('../utils/fs')

const { successHandler, errorHandler } = require('../utils/handler')

module.exports = {
  // 文件夹路径结构读取
  readFileFolderPath (event, args) {

    const { dirPath, on } = args

    readFolderDirectory(dirPath, { withFileTypes: true }).then(files => {

      const data = files.map(v => {
        const { name } = v
        return {
          name,
          isDirectory: v.isDirectory(),
          isFile: v.isFile(),
          path: `${dirPath}\\${name}`,
          children: []
        }
      })

      successHandler(event, on, { data })

    }).catch(error => {

      errorHandler(event, on, { error })

    })

  }

}
