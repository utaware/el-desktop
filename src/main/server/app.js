/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2020-03-19 10:15:49
 * @LastEditors: utaware
 * @LastEditTime: 2020-03-20 18:16:13
 */

const Koa = require('koa')

const app = new Koa()

const { serverOptions } = require('./options/global')

const { listenPort } = serverOptions

const { promisify } = require('util')

const fs = require('fs')

const path = require('path')

const readdir = promisify(fs.readdir)

const loadModules = async () => {
  const controllerPath = path.resolve(__dirname, './controller')
  console.log(controllerPath)
  const controllerDir = await readdir(controllerPath)
  console.log(controllerDir)
}

loadModules()

const router = require('./router')

router(app)

app.on('error', err => {
  console.error('server error', err)
})

app.listen(listenPort, () => {
  console.log(`server is running at prot ${listenPort}`)
})
