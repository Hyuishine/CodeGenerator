
<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-08-01 14:24:38
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-11-18 00:52:52
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card style="margin-top:5vh;">

    <!-- 步骤标题 -->
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ stepData.title[currentStep - 1] }}</span>
    </v-card-title>

    <!-- 步骤 动态组件 -->
    <v-window v-model="currentStep"
              class="stepContainer">

      <component :is="path"
                 v-for="(path,i) in stepData.path"
                 :key="i"></component>
    </v-window>

    <!-- 分割线 -->
    <v-divider></v-divider>

    <!-- 操作栏，操作按钮 -->
    <v-card-actions>
      <v-btn :disabled="currentStep === 1"
             text
             @click="currentStep--">
        上一步
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn color="primary"
             depressed
             :loading="loading"
             @click="nextStep()">
        {{ currentStep === 3 ?  '生成' : '下一步' }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>

const moduleObj = {} // 储存引入的组件对象 用于 注册组件
const path = require('path') // 地址类型
const files = require.context('./step', true, /\.vue$/) // 正则遍历找出"./components"中的“ .vue ” 结尾的文件
files.keys().forEach(key => { // 将path 对象变为能用的对象
  const name = path.basename(key, '.vue') // 将获取到的文件名 去除后缀，得到该模块的名字
  moduleObj[name] = files(key).default || files(key) // 将文件对象 以上面得到的该模块的名字 为key值 存为组件对象，用于注册组件
})

export default {
  name: 'pageWord',
  data () {
    return {
      currentStep: 1,
      stepData: {
        title: [], // 标题数据
        path: [] // 动态组件可以：is使用的 路径
      },
      loading: false
    }
  },
  created () {
    let step = ['docUpload', 'htmlView', 'moduleView', 'codeGenerating']

    step.forEach(stepName => {
      // 当步骤库中存在定义的步骤，则按定义的步骤顺序存放步骤组件
      if (Object.keys(moduleObj).indexOf(stepName) !== -1) {
        // 获取组件对象中的cname值（name值用中文似乎会报错） 作为步骤的标题值
        this.stepData.title.push(moduleObj[stepName].cname)
        this.stepData.path.push(moduleObj[stepName])
      }
    })
  },
  methods: {
    nextStep () {
      if (this.currentStep < 3) {
        this.currentStep++
      } else {
        this.loading = true
        window.open('/static/index.zip')
      }
    }
  },
  watch: {
    // 当步骤改变时，下发事件总线，步骤更改事件，返回当前步骤
    currentStep: {
      handler (n) {
        this.$bus.$emit('stepsAdd', n)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.stepContainer {
  max-height: 70vh;
  max-width: calc(100vw - 24px);
  overflow: auto;
}
</style>
