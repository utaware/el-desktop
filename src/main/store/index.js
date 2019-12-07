// 创建相关的store存储对象
const path = require('path')

const Store = require('electron-store')

const files = require.context('./options', false, /\.js$/)

const modules = files.keys().reduce((prev, next) => {

  const fileModule = files(next)

  const name = next.replace(/(\.\/|\.js)/g, '')

  return Object.assign(prev, { [name]: fileModule })

}, {})

const cwd = path.resolve(process.cwd(), `./store`)

module.exports = (app) => {

  app.store = Object.keys(modules).reduce((total, current) => {

    const options = Object.assign({}, modules[current], { name: current, cwd })

    total[current] = new Store(options)

    return total

  }, {})

}
