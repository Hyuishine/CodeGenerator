/*
 * @Author: 黄宇/hyuishine
 * @Date: 2021-02-07 15:37:50
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-02-24 16:06:07
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
import axios from 'axios'
import router from '@/router'

// 跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true

const apiInstance = axios.create({
  // 默认链接头部
  baseURL: process.env.BASE_API,
  timeout: 10000
})

// 请求开始
apiInstance.interceptors.request.use(
  (config) => {
    // todo 1、开始时需要打开顶部进度条
    // todo 2、判断是否是登录的用户，如果是已登录的用户，需要向请求头插入用户id和token
    return config
  },
  (error) => {
    // todo 失败时记录日志
    // todo 失败时关闭进度条
    Promise.reject(error)
  }
)

// 请求结束 收到请求值
apiInstance.interceptors.response.use(
  (response) => {
    // todo 1、请求结束 关闭顶部进度条

    const resData = response.data
    // const resHearder = response.headers

    // // 如果是导出 直接
    // if (resHearder['content-type'] === 'application/octet-stream;charset=UTF-8') {
    //     return resData
    // }
    if (resData.status === 'error' || resData === undefined || resData === '') {
      // todo 反回失败 记录错误
    } else if (resData.code === '404') {

    }
    // todo 多种状态码处理
    return resData
  },
  (error) => {
    // todo 失败时记录日志
    // todo 失败时关闭进度条
    switch (error.response.status) {
      case 404: {
        router.push({
          path: '/404'
        })
        break
      }
      // todo 多种状态码处理

      default: {
        // todo 记录错误，可能是url链接错误
      }
    }
    return Promise.reject(error.response)
  }
)

export default apiInstance
