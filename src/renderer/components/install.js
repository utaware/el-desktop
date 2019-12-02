// 全局组件注册
const files = require.context('./global', false, /\.vue$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

export default (Vue) => {
  for (const name in modules) {
    Vue.component(name, modules[name])
  }
}
