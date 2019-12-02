import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState } from 'vuex-electron'
import createPersistedState from 'vuex-persistedstate'

import modules from './modules'

// console.log(electron.remote.app.getPath('userData'))

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
