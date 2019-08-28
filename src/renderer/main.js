import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
// extend
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

import ContentSlotsDistributor from '@/components/functional/ContentSlotsDistributor.js'

console.log(ContentSlotsDistributor)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('Markdowner', {
  template: '<p>demo-block</p>'
})

Vue.component('ContentSlotsDistributor', ContentSlotsDistributor)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
