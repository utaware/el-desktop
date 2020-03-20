/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-19 17:55:34
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-20 10:50:22
 */

const BASE_64 = 'base64'
const UTF_8 = 'utf-8'

//  编码
exports.btoa = (str) => {
  return Buffer.from(str, UTF_8).toString(BASE_64)
}
// 解码
exports.atob = (str) => {
  return Buffer.from(str, BASE_64).toString(UTF_8)
}
