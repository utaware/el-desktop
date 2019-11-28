// node
const { promisify } = require('util')
// modules
const fs = require('fs-extra')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

module.exports = {

  // 读取文件夹目录
  readFolderDirectory: readdirPromise,
  // 读取文件内容
  readFileContent: readFilePromise

}
