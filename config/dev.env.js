/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-07-11 17:29:40
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-02-24 14:57:20
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"/Kite"'
})
