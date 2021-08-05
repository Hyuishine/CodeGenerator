<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-05 14:10:13
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-05 16:53:02
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-window-item :value="3">
    <v-card>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-window-item>
</template>
<script>

import $ from 'jquery'

export default {
  name: 'moduleView',
  cname: '需要生成的模块，一览',
  methods: {
    // 整理转换后的html
    sortHtml () {
      let moduleName = []
      let modelDom = []
      // 匹配出标题

      console.log($('#htmlViewContainer'))

      $('#htmlViewContainer').children('p').map((i, ele) => {
        //! 通过手动在需要编写的模块标题中添加 “$”特殊符号，然后查找出模块名
        if (ele.innerHTML.indexOf('$') !== -1) {
          // 查找出模块名，和模块名对象
          moduleName.push(ele.innerText.replace('$', ''))
          modelDom.push(ele)
        }
      })
      this.$store.state.module.moduleName = moduleName
      this.$store.state.module.modelDom = modelDom

      console.log(this.$store.state.module)
      console.log(moduleName)
      console.log(modelDom)
    }
  },
  mounted () {
    this.$bus.$on('stepsAdd', (curStep) => {
      if (curStep && curStep === 3) {
        this.sortHtml()
      }
    })
  }
}
</script>
