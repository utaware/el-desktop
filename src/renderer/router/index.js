/*
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 17:52:38
 * @LastEditors: utaware
 * @LastEditTime: 2019-12-12 17:40:26
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
          component: require('@/views/home/mark/tag/manage.vue').default
        },
        {
          path: 'view',
          name: 'mark-view',
          component: require('@/views/home/mark/view/index.vue').default
        }
      ]
    },
    // 工具
    {
      path: '/tools',
      name: 'tools-page',
      component: require('@/views/home/tools/main.vue').default
    },
    // 404页面
    {
      path: '/404',
      name: 'notfound-page',
      component: require('@/views/not-found/404.vue').default
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
