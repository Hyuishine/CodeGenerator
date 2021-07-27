<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-17 09:52:49
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-04-11 15:59:35
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-card>
    <!-- 错误提示 -->
    <v-alert v-model="alertStatus"
             dismissible
             color="error"
             border="left"
             elevation="2"
             colored-border>
      {{ alertText }}
    </v-alert>
    <!-- tab 表 -->
    <v-tabs center-active
            color="primary"
            light
            v-if="sheetData.length > 0">
      <!-- tab栏 有多少个sheet 创多少个 -->
      <v-tab v-for="(name,i) in sheetName"
             :key="i"
             dense>{{ name }}</v-tab>
      <v-tab-item v-for="(sheet,i) in sheetData"
                  :key="i">
        <v-card flat>
          <!-- 表数据 -->
          <v-data-table :headers="sheet.headers"
                        :items="sheet.data"
                        @dblclick:row="copyName"
                        @contextmenu:row="copySort">
            <!-- 顶部 -->
            <template v-slot:top>
              <v-toolbar flat>
                <template>
                  <v-text-field dense
                                v-model.trim="sheet.url"
                                label="请输入该区域链接"></v-text-field>
                  <v-text-field dense
                                style="width:100px;"
                                v-model.trim="sheet.sort"
                                label="请输入该区域缩写"></v-text-field>
                </template>
                <!-- 分割线 -->
                <v-divider class="mx-4"
                           inset
                           vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="success"
                       dark
                       @click="getSortName(i)"
                       class="mb-2">
                  生成缩写
                </v-btn>
                <v-btn color="primary"
                       dark
                       @click="dataToCreate(i)"
                       class="mb-2">
                  生成文件
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-card-title v-else>暂无数据</v-card-title>
  </v-card>
</template>
<script>
// require('script-loader!file-saver')
import JSZip from 'jszip'
import widthoutLicense from '../template/widthoutLicense'
import { makePy } from '../utils/nameSort.js'
export default {
  name: 'stepTwo',
  cname: '生成',
  mounted () {
    try {
      // tab名
      this.sheetName = this.$store.state.module.sheetName

      var sheets = this.$store.state.module.sheetData

      // 每个表的信息
      for (var i = 0; i < sheets.length; i++) {
        var headers = []
        var sheetData = []
        var sheetName = []
        // 表数据
        sheetData = sheets[i]
        // 列名
        sheetName = Object.keys(sheetData[i])
        // console.log(sheetName)
        // 列名转换为表格组件可以用的格式
        sheetName.forEach((item) => {
          headers.push(
            {
              text: item,
              value: item
            }
          )
        })
        //! 存入数据
        this.sheetData.push(
          {
            sort: '',
            url: '',
            headers: headers,
            data: sheetData
          }
        )
      }
    } catch (error) {
      console.log('获取excel数据失败，请重新导入试试。')
      console.log('列名：Name，Code，nameSort')
      console.log(error)
    }
  },
  data () {
    return {
      // 当前下载的行 节流阀 防止过快 卡死
      curDownload: 0,
      alertStatus: false,
      alertText: '',
      // 表格数据
      sheetData: [
        // {
        //   sort:'',
        //   url: '',
        //   headers: [],
        //   data: []
        // }
      ],
      // 表格名
      sheetName: [],
      timer_download: null

    }
  },
  methods: {

    copyName (e, row) {
      var tag = document.createElement('input')
      tag.setAttribute('id', 'copyName_dom')
      tag.value = row.item.Name.trim()
      document.getElementsByTagName('body')[0].appendChild(tag)
      document.getElementById('copyName_dom').select()
      document.execCommand('copy')
      document.getElementById('copyName_dom').remove()
    },
    copySort (e, row) {
      var tag = document.createElement('input')
      tag.setAttribute('id', 'copyName_dom')
      tag.value = row.item.nameSort.trim()
      document.getElementsByTagName('body')[0].appendChild(tag)
      document.getElementById('copyName_dom').select()
      document.execCommand('copy')
      document.getElementById('copyName_dom').remove()
    },

    getSortName (i) {
      var rowLength = this.sheetData[i].data.length

      for (let index = 0; index < rowLength; index++) {
        // console.log(this.sheetData[i].data[index].nameSort)
        var waitFilter = makePy(
          this.sheetData[i].data[index].Name
        )
        // 正则过滤 只保留字母
        var filter = /[a-zA-Z]+/g
        var waitSub = waitFilter.match(filter)
        // 截取最多16位
        waitSub = waitSub.join('')
        waitSub = waitSub.slice(0, 15)
        // 赋值
        this.sheetData[i].data[index].nameSort = this.sheetData[i].sort + waitSub
      }
    },

    downloadBlobFile (content, fileName, type) {
      const blob = new Blob([content], {
        type: type
      })
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    },

    dataToCreate (i) {
      // 有没有填该地区URL链接
      if (this.sheetData[i].url === '') {
        this.alertText = '未填写该地区URL链接'
        this.alertStatus = true
      } else if (this.curDownload === this.sheetData[i].data.length) {
        clearTimeout(this.timer_download)
        this.alertText = '该地区已填写完成'
        this.alertStatus = true
        this.curDownload = 0
      } else {
        this.timer_download = setTimeout(() => {
          // 当前表.下载到的行
          let code = this.sheetData[i].data[this.curDownload].Code.trim()
          let nameSort = this.sheetData[i].data[this.curDownload].nameSort.trim()
          let name = this.sheetData[i].data[this.curDownload].Name.trim()
          this.creatFile(i, code, name, nameSort)

          this.curDownload++
          this.dataToCreate(i)
        }, 3000)
      }
    },
    creatFile (i, code, name, nameSort) {
      // 获取生成的代码
      var zipFile = widthoutLicense(this.sheetData[i].url, code)

      const zip = new JSZip()
      // 生成代码
      zip.file(
        // 文件路径:缩写/index.html
        // `${this.sheetName[i]}/${nameSort}/index.html`,
        `${nameSort}/index.html`,
        zipFile
      )
      // zip.file(
      //   `${name}.txt`,
      //   zipFile
      // );
      zip.generateAsync({ type: 'blob' }).then(
        (blob) => {
          // 文件名：缩写 .zip
          // this.downloadBlobFile(blob, `${name}--${nameSort}.zip`);
          this.downloadBlobFile(blob, `${nameSort}.zip`)
        },
        (err) => {
          console.log('生成文件失败，错误信息如下')
          console.log('第' + i + '张表的' +
            (this.curDownload + 1) +
            '行数据，名称为：' + name + '的事项')
          console.log(err)
        }
      )
    }
  }
}
</script>
