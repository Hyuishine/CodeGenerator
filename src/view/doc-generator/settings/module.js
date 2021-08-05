/*
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-04 16:20:22
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-05 14:02:15
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
export default {
  state: {
    htmlDom: '暂无数据',
    moduleName: [], // 存储开发文档中，手动标记的模块名
    moduleDom: [] // 存储开发文档经过转化成html后，找到的模块名的dom，用于查找相邻两个之间的表单、列表、搜索条件等
  }
}
