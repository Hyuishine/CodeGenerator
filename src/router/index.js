/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 15:17:17
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-27 14:23:57
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: 路由
 */
import Vue from 'vue'
import Router from 'vue-router'
// import MetaInfo from 'vue-meta-info'
// import store from '@/store/index' // 跳转时切换store中的topBar状态
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/yapi',
    // meta: {
    //   requireAuth: true
    // },
    component: resolve => require(['@/view/layout'], resolve),
    children: [
      {
        // 导表申城
        path: '/index',
        name: 'index',
        meta: {
          zhName: '导表生成',
          keyWords: 'excel导表生成',
          description: 'excel导表生成'
        },
        component: resolve => require(['@/view/GFT-generator/index'], resolve)
      },
      {
        // yapi生成
        path: '/yapi',
        name: 'yapi',
        meta: {
          zhName: 'yapi生成',
          keyWords: 'yapi生成',
          description: 'yapi生成'
        },
        component: resolve => require(['@/view/yapiGenerator/index'], resolve)
      }
    ]
  }

]
const router = new Router({ routes })
router.beforeEach((to, from, next) => {
  // 为每个模块修改特定的网站标题
  document.title = '代码生成 | ' + to.meta.description
  next()
})
export default router
