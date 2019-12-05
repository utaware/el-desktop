/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 17:52:38
 * @LastEditors: utaware
 * @LastEditTime: 2019-12-05 16:41:25
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
      path: '/docs',
      name: 'docs-page',
      component: require('@/views/home/mark/main.vue').default,
      children: [
        {
          path: 'tag',
          name: 'manage-tags',
          component: require('@/views/home/mark/package/ManageTags.vue').default
        }
      ]
    },
    {
      path: '/',
      redirect: '/docs'
    }
  ]
})
