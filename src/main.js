/* eslint-disable no-unused-vars */
/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 15:17:17
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-11 15:34:06
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
import axiosMethod from '@/api/extractApi'
import './assets/style/initConflict.css' // 初始化样式冲突
import JSZip from 'jszip'
import XLSX from 'xlsx'

Vue.use(XLSX)
Vue.use(JSZip)

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
