<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-04-12 15:55:33
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-27 15:15:39
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
      },
      // key值，该值描述
      keyArr: ['id', 'remarks', 'name'],
      descriptionArr: ['主键', '备注', '名称'],
      // yapi 标准表单模板
      formTemplate: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        required: ['code', 'message', 'data'], // 该层级下必反的数据
        properties: { // 子项数据
          code: { // 状态码
            type: 'number', // 类型
            description: '状态码', // 描述、备注
            mock: {
              mock: '200' // 写死值
            }
          },
          message: { // 提示信息
            type: 'string',
            mock: {
              mock: 'success'
            }
          },
          data: { // 数据
            type: 'object',
            required: ['formObject'],
            properties: {
              formObject: {
                type: 'object',
                required: [],
                properties: {
                  // keyArr: { // key值
                  //   type: 'string',
                  //   description: 'descriptionArr' 描述
                  // }
                }
              }
            }
          }
        }
      }
    }
  },
  mounted () {
    this.createProperties()
  },
  methods: {
    // 调取yapi登录接口
    yapi_login () {
      this.$axios['yapi_login'](this.yapiAccount).then(data => {
        console.log(data)
      })
    },
    // 创建yapi
    createProperties () {
      if (this.keyArr.length === this.descriptionArr.length) {
        // 临时存放生成的数据
        let formItem = {}
        let requiredArr = []
        // 生成表单项，键值-类型-备注
        this.keyArr.forEach((key, i) => {
          // 创建表单项
          formItem[key] = {
            type: 'string',
            description: this.descriptionArr[i]
          }
          // 创建必定返回的表单项
          requiredArr.push(key)
        })
        // 将生成的 表单项数据 和 必定要反的表单项数据 插入到yapi表单模板中,
        this.formTemplate.properties.data.properties.formObject.properties = formItem
        this.formTemplate.properties.data.properties.formObject.required = requiredArr
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
