const register = {
  markdownIt: require('../markdown')
}

module.exports = (app) => {

  Object.keys(register).forEach(v => {
    app[v] = register[v]
  })

}
