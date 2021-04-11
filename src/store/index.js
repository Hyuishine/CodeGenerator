/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-29 13:42:46
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-02-25 16:04:50
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: add you want
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 从各文件中取出store参数放入
const file = require.context('@/', true, /module.js$/)
let module = {
  state: {},
  actions: {},
  mutations: {},
  getters: {}
}

file.keys().forEach(key => {
  module.state = {
    ...module.state,
    ...(file(key).default || file(key)).state
  }
  module.actions = {
    ...module.actions,
    ...(file(key).default || file(key)).actions
  }
  module.getters = {
    ...module.getters,
    ...(file(key).default || file(key)).getters
  }
  module.mutations = {
    ...module.mutations,
    ...(file(key).default || file(key)).mutations
  }
})

const store = new Vuex.Store({

  modules: {
    module
  }

})

export default store
