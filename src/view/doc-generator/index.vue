
<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-08-01 14:24:38
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-01 17:54:23
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <div>
    <v-file-input show-size
                  label="上传开发文档"
                  @change="fileUpload"></v-file-input>
    <div v-html="htmlData"></div>
  </div>
</template>
<script>
import $ from 'jquery'
import './files/mammoth.browser.js'
export default {
  data () {
    return {
      htmlData: ''
    }
  },
  methods: {
    //   上传文件事件，先转buffer，然后再转html
    fileUpload (file) {
      if (file != null) {
        let that = this
        // 将上传的文件，转换为buffer然后再转给html，然后再整理出表单、列表、列表的搜索字段
        this.toBuffer(file, function (arrayBuffer) {
          mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
            .then(res => {
              // 渲染转化成html的开发文档
              that.htmlData = res.value
              // 整理转化后的开发文档
              setTimeout(() => {
                that.sortHtml(res)
              }, 1000)
            })
            .done()
        })
      } else {
        this.htmlData = '暂无数据'
      }
    },
    // 将文件格式转换为 arrayBuffer
    toBuffer (file, callback) {
      var reader = new FileReader()

      reader.onload = (loadEvent) => {
        var arrayBuffer = loadEvent.target.result
        callback(arrayBuffer)
      }

      reader.readAsArrayBuffer(file)
    },
    // html 特殊符号兼容性替换
    escapeHtml (value) {
      return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    },
    // 整理转换后的html
    sortHtml (html) {
      let formData = {
        modelName: '', // 模块名
        permission: '', // 权限
        items: [
          {
            zhName: '', // 字段中文名
            type: '', // 字段类型
            other: ''
          }
        ]
      }
      $('p').map((i, ele) => {
        if (ele.innerHTML.indexOf('$') !== -1) {
          console.log(ele)
          // if (ele.innerHTML.indexOf('【表单信息】') !== -1) {
          //   // 表单模块名
          //   console.log($(ele).next().find('strong')[0].innerText)
          // }
        }
      })
    }
  }
}
</script>
