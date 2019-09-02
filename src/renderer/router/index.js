/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 17:52:38
 * @LastEditors: utaware
 * @LastEditTime: 2019-09-02 16:46:32
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/desktop',
      name: 'desktop-page',
      component: require('@/views/DesktopPage.vue').default
    },
    {
      path: '/docs',
      name: 'docs-page',
      component: require('@/views/DocsTreePage.vue').default
    },
    {
      path: '*',
      redirect: '/docs'
    }
  ]
})
