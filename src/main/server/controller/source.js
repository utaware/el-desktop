/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-20 14:14:42
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-20 17:28:10
 */

const { base64, fs } = require('@main/assets/shared-utils')

const { promisify } = require('util')

const readFile = promisify(fs.readFile)

module.exports = async (ctx) => {
  const { query } = ctx
  const { target } = query
  const localPath = base64.atob(target)
  const contentBuffer = await readFile(localPath)
  const result = contentBuffer.toString()
  ctx.body = result
}
