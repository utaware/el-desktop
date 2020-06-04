/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-20 14:24:57
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-20 15:48:54
 */

const { fs } = require('@main/assets/share-utils')

const { promisify } = require('util')

const readFile = promisify(fs.readFile)

module.exports = {
  // 确认文件是否存在
  async ensureFileIsExists (filePath) {
    return await fs.existsSync(filePath)
  },
  // 流式读取文件内容
  async readFileContentWithStream (filePath, options) {
    return await fs.createReadStream(filePath, options)
  },
  // 读取文件内容
  async readFileContent (filePath, options) {
    return await readFile(filePath, options)
  }
}
