<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-04-12 15:55:33
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-12 16:38:56
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <h1>123</h1>
</template>
<script>
export default {
  data () {
    return {
      yapiAccount: {
        email: process.env.YAPI_USER,
        password: process.env.YAPI_PWD
      }
    }
  },
  mounted () {
    this.$axios['yapi_login'](this.yapiAccount).then(data => {
      console.log(data)
    })
    this.$axios['get_api_list']({ catid: 17469 })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="scss" scoped>
</style>
