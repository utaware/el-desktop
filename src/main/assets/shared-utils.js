/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-19 10:54:55
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-20 11:03:04
 */

// node modules
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
// local modules
const base64 = require('./base64')

module.exports = {
  fs,
  chalk,
  path,
  base64
}
