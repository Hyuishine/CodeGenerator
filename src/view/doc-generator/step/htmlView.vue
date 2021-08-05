<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-04 16:10:38
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-05 14:37:04
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-window-item :value="2">
      <v-card-text v-html="htmlData"
                   id="htmlViewContainer">
      </v-card-text>
  </v-window-item>
</template>
<script>
export default {
  name: 'htmlView',
  cname: '开发文档，转换预览',
  computed: {
    htmlData () {
      return this.$store.state.module.htmlDom
    }
  }
}
</script>
