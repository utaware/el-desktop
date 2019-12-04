/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 17:52:38
 * @LastEditors: utaware
 * @LastEditTime: 2019-12-04 16:55:20
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home-page',
      component: require('@/views/home/index.vue').default
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
