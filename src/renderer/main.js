import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
// extend
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// 附加的css
import './assets/css/index.css'
// 指令注册
import directives from '@/directives/install'
// 组件注册
import globalComponents from '@/components/install'

Vue.use(directives)
// 注册global下的全局组件
Vue.use(globalComponents)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$error = function (options = {}) {
  const { message = '出错了x_x', type = 'error', showClose = true } = options
  this.$message({ message, type, showClose })
}

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
