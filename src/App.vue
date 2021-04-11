<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 15:17:17
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-11-11 21:05:21
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: add you want
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 定义的全局css 例如背景色、字体色 方便以后快速更改和 切换主题 */
html {
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
  outline: none;
  transition: 0.2s;
}
a {
  text-decoration: none;
  font-size: 10px;
}
a:hover {
  color: var(--color-error);
}
body {
  background-color: var(--bgColor-black);
  overflow: hidden;
}
</style>
