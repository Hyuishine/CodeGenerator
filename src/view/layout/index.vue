<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-12 17:38:51
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-11 15:21:42
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: 顶栏（各页面控制选项） / 路由内容
 顶栏的进度条： 通过路由页面中store传递loading值控制状态
 顶栏中各页面的控制选项：通过路由中当前页面的名字 显示动态组件
 -->
<template>
  <div>
    <!-- 侧栏菜单 一个背景一个bar -->
    <transition enter-active-class="fadeInLeft animated"
                leave-active-class="fadeOutLeft animated">
      <!--//! 侧栏菜单 -->
      <div id="drawerMenu"
           v-if="menuStatus">
        <!-- 侧栏菜单 -->
        <div class="drawerMenu_bar"> </div>
        <!-- 侧栏菜单背景遮罩层,点击关闭遮罩层 -->
        <div class="v-overlay__scrim drawerMenu_overlay"
             @click="menuStatus = !menuStatus"></div>
      </div>
    </transition>
    <!-- //! 主内容 打开菜单时 缩小 通过绑定侧栏菜单状态 拼接字符串匹配样式-->
    <v-app id="inspire"
           :class="menuStatus ? 'ScaleContainer':''">
      <v-container fluid>
        <!-- 顶部菜单 -->
        <top-bar @toogleMenu="toogleMenu"
                 :menuStatus="menuStatus"></top-bar>
        <v-main>
          <v-flex id="viewBox">
            <v-layout flex
                      justify-space-between
                      row
                      wrap
                      class="contentContainer">
              <v-row align="center"
                     justify="center"
                     style="max-width:100%;">
                <!-- 真的内容，敢于嵌套多层娃 -->
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </v-row>
            </v-layout>
          </v-flex>
        </v-main>
      </v-container>
    </v-app>
  </div>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      // 展开菜单按钮的状态 false为闭合的=，true为X
      menuStatus: false
    }
  },
  methods: {
    // 顶栏菜单切换 上发值
    toogleMenu (menuStatus) {
      this.menuStatus = menuStatus
    }
  }
}
</script>
<style scoped>
/* 引用布局样式文件 */
@import "../../assets/style/layout.css";
</style>
