/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-07-11 17:29:40
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-11 16:28:38
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 
 * @usage:process.env.BASE_API
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/codeGenerator"',
  YAPI_USER: '"huangyu@3xdata.cn"',
  YAPI_PWD: '"123"'
})
