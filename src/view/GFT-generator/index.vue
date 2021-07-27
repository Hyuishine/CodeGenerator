<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 23:33:07
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-27 17:23:54
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-stepper alt-labels
             v-model="currentStep">
    <!-- 步骤条标题 -->
    <v-stepper-header>
      <v-stepper-step v-for="(title,index) in stepData.title"
                      :key="index"
                      editable
                      :complete="currentStep > (index + 1)"
                      :step="(index + 1)">
        {{ title }}
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <template v-for="(path,index) in stepData.path">
        <v-stepper-content :step="index + 1"
                           :key="index">
          <v-card hover
                  style="margin:10px;">
            <components :is="path"
                        @importComplete="currentStep = 2"
                        v-if="(index + 1) === currentStep"></components>
          </v-card>
        </v-stepper-content>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
const moduleObj = {} // 储存引入的组件对象 用于 注册组件
const path = require('path') // 地址类型
const files = require.context('./components', true, /\.vue$/) // 正则遍历找出"./components"中的“ .vue ” 结尾的文件
files.keys().forEach(key => { // 将path 对象变为能用的对象
  const name = path.basename(key, '.vue') // 将获取到的文件名 去除后缀，得到该模块的名字
  moduleObj[name] = files(key).default || files(key) // 将文件对象 以上面得到的该模块的名字 为key值 存为组件对象，用于注册组件
})
export default {
  data () {
    return {
      currentStep: 1,
      stepData: { // 左侧tab页的数据
        title: [], // 标题数据
        path: [] // 动态组件可以：is使用的 路径
      }
    }
  },
  created () {
    Object.keys(moduleObj).forEach((item, i) => {
      // 获取组件对象中的cname值（name值用中文似乎会报错） 作为pane的标题值
      this.stepData.title.push(moduleObj[Object.keys(moduleObj)[i]].cname)
      this.stepData.path.push(moduleObj[Object.keys(moduleObj)[i]])
    })
  }
}
</script>
