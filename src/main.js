/* eslint-disable no-unused-vars */
/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 15:17:17
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-02-25 17:11:30
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: add you want
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import msd from 'ms-design'
import store from '@/store/index.js'
import VueQuillEditor from 'vue-quill-editor'
import axiosMethod from '@/api/extractApi'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/style/theme.css'
import 'ms-design/lib/ms-design.css'// 引入微软fluentDesign图标
import './assets/style/initConflict.css' // 初始化样式冲突
Vue.use(VueQuillEditor)

//! 新增总线全局事件/实例
Vue.prototype.$bus = new Vue()
Vue.prototype.$axios = axiosMethod
// 关闭控制台调试说明
Vue.config.productionTip = false

// Vue.prototype._ = _ // lodash
Vue.use(msd)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  vuetify
})
// 全局路由守卫 准备跳路由前把目标路由名字 赋值给store下的topBarControler 控制顶栏菜单的显示
// 本来这玩意是用来拦截跳登录的 因为博客页面需要做到不登陆也能看 故此不做拦截
router.beforeEach((to, from, next) => {
  store.state.topBarControler = to.name + 'Control' // 将即将跳转的路由名字 拼接起来 形成 topBarControl 调用的动态组件的名字
  // 详见 topBarControl 组件
  next()
})
