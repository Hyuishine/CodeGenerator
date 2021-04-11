/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 20:35:58
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-18 14:00:12
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: add you want
 */
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#90c5e5',
        error: '#ffb0a2',
        info: '#a2a994',
        success: '#90e594',
        warning: '#fef3ab',
        thin: '#a2a994',
        bgColorDefault: '#8b8b8b',
        bgColorLight: '#f0f0f0',
        bgColorBlack: '#3f3f3f'
      },
      dark: {
        primary: '#90c5e5',
        error: '#ffb0a2',
        info: '#a2a994',
        success: '#90e594',
        warning: '#fef3ab',
        thin: '#020202',
        bgColorDefault: '#8b8b8b',
        bgColorLight: '#3f3f3f',
        bgColorBlack: '#1E1E1E'
      }
    },
    icons: {
      iconfont: 'mdi' // default - only for display purposes
    }
  }
})
export default vuetify
