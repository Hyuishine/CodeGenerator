<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:44:42
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-27 17:00:16
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <!-- 主内容 打开菜单时 缩小 通过绑定侧栏菜单状态 拼接字符串匹配样式-->
  <v-app id="inspire">
    <v-container fluid>
      <v-main>
        <v-flex id="viewBox">
          <v-layout flex
                    justify-space-between
                    wrap>
            <v-row align="center"
                   justify="center">
              <v-col :lg="8"
                     :md="10"
                     :sm="12"
                     :xs="12">
                <!-- 真的内容，敢于嵌套多层娃 -->
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </v-col>
            </v-row>
          </v-layout>
        </v-flex>
      </v-main>
    </v-container>
  </v-app>
</template>
