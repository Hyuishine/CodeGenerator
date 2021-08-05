<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-04 14:59:01
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-05 14:02:09
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: 开发文档生成步骤，第一步，上传开发文档。
-->
<template>
  <v-window-item :value="1">
    <v-card-text>
      <!-- 文件上传 -->
      <v-file-input show-size
                    label="点击此处上传开发文档"
                    @change="fileUpload"></v-file-input>
      <!-- 提示 -->
      <span class="grey--text text--darken-1">
        上传开发文档，在需要生成的模块标题前，手动添加特殊符号：“$”，完成后不要更新目录
      </span>
    </v-card-text>
  </v-window-item>
</template>
<script>

import '../files/mammoth.browser.js'

export default {
  name: 'stepOne',
  cname: '上传开发文档',
  methods: {
    //   上传文件事件，先转buffer，然后再转html
    fileUpload (file) {
      if (file != null) {
        let that = this
        // 将上传的文件，转换为buffer然后再转给html，然后再整理出表单、列表、列表的搜索字段
        this.toBuffer(file, function (arrayBuffer) {
          // eslint-disable-next-line no-undef
          mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
            .then(res => {
              that.$store.state.module.htmlDom = res.value
            })
            .done()
        })
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
    }
  }
}
</script>
