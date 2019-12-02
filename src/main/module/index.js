const register = {
  markdownIt: require('./mark')
}

module.exports = (app) => {

  Object.keys(register).forEach(v => {
    app[v] = register[v]
  })

}
