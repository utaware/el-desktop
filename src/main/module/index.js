const register = {
  markdownIt: require('./mark'),
  shelljs: require('./shelljs')
}

module.exports = (app) => {

  Object.keys(register).forEach(v => {
    app[v] = register[v]
  })

}
