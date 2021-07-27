<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-04-12 15:55:33
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-27 14:58:38
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
      formObject: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          code: {
            type: 'number',
            mock: {
              mock: '200'
            }
          },
          message: {
            type: 'string'
          },
          data: {
            type: 'object',
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
        let tempObj = {}
        // 生成表单项，键值-类型-备注
        this.keyArr.forEach((key, i) => {
          tempObj[key] = {
            type: 'string',
            description: this.descriptionArr[i]
          }
        })
        // 将生成的表单项数据，插入到yapi表单模板中
        this.formObject.properties.data.properties = tempObj
        console.log(this.formObject)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
