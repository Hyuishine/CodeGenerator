/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 15:17:17
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-08-01 14:34:36
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
    redirect: '/doc',
    // meta: {
    //   requireAuth: true
    // },
    component: resolve => require(['@/view/layout'], resolve),
    children: [
      {
        // 赣服通导表生成
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
        component: resolve => require(['@/view/yapi-generator/index'], resolve)
      },
      {
        // 开发文档生成
        path: '/doc',
        name: 'doc',
        meta: {
          zhName: '开发文档',
          keyWords: '文档、word',
          description: '通过开发文档快速生成前端代码'
        },
        component: resolve => require(['@/view/doc-generator/index'], resolve)
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
