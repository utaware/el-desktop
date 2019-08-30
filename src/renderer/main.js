import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
// extend
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// 重置css样式
import './assets/css/reset.css'
// 附加的css
import './assets/css/index.css'

// 指令注册
import directives from '@/directives/install'

Vue.use(directives)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
