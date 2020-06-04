/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-20 11:19:10
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-20 17:31:31
 */

const router = require('koa-router')()

const sourceMethods = require('../controller/source')

router.get('/source', sourceMethods)

module.exports = (app) => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}
