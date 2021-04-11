/*
 * @Author: 黄宇/hyuishine
 * @Date: 2021-02-07 16:58:04
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-03-03 10:32:29
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 从view目录下自动加载api.js(建议在各自模块下配置api，可以避免代码冲突)
 */

import Request from '@/api/request'
import Qs from 'qs'

// 从各文件读取到的接口配置参数，存放接口方法的集合，构成临时接口方法
let apis = {}
let methodGroup = {}
let axiosMethod = {}

const files = require.context('@/', true, /api.js$/)

files.keys().forEach(key => {
  apis = { ...apis, ...(files(key).default || files(key)) }
})

// ! 封装处理原为 request 的方法
for (let name in apis) {
  // 将JavaScript写的各种参数 转为json
  var sendOptions = JSON.parse(JSON.stringify(apis[name]))

  // sendData 为调用时传给后台的参数
  axiosMethod[name] = (sendData) => {
    // 如果没有传给后台的参数 则置为空对象
    sendData = sendData !== undefined ? sendData : {}
    // 处理接口前 回调，如果有如果有接口前数据处理 则调用，无则统一转换数据
    sendData = (
      apis[name]['beforeRequest'] || (sendData => {
        // ! 此处可统一转换接口前 数据格式处理
        return Qs.stringify(sendData)
      })
    )(sendData)

    // 判断传入的接口调取方法 匹配对应的参数 然后执行axios request实例方法
    var urlMethod = apis[name]['method'] ? apis[name]['method'] : 'POST'

    switch (urlMethod) {
      case 'PUT':
      case 'DELETE':
      case 'GET':
        return Request({
          url: sendOptions.url,
          method: apis[name]['method'],
          responseType: apis[name]['responseType'] || '',
          params: sendData
        })
      case 'POST':
      default:
        return Request({
          url: sendOptions.url ? sendOptions.url : sendOptions,
          method: apis[name]['method'] || 'POST',
          responseType: apis[name]['responseType'] || '',
          data: sendData
        })
    }
  }
}

// 处理接口后回调
for (let name in axiosMethod) {
  methodGroup[name] = (sendData) => {
    return new Promise((resolve, reject) => {
      axiosMethod[name](sendData)
        .then(Response => {
          // 如果有接口结束回调方法 则调用，否则直接反回接口数据
          var afterFunc = (
            apis[name]['afterResponse'] || (Response => {
              // ! 此处可统一转换接口后 数据格式处理
              return Response
            })
          )(Response)

          resolve(afterFunc)
        })
        .catch(Error => {
          reject(Error)
        })
    })
  }
}
export default {
  ...methodGroup
}
