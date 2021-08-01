<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-04-12 15:55:33
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-28 17:55:16
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-container>
    <v-row>
      <!-- 输入文本域，在此输入sql -->
      <v-col cols="12">
        <v-textarea solo
                    label="在此输入SQL"
                    v-model="txt_area"></v-textarea>
      </v-col>
      <!-- 生成按钮 -->
      <v-col align-self="center"
             cols="2">
        <v-btn color="primary"
               @click="btn_create()"
               :disabled="txt_area.length === 0">
          生成
        </v-btn>
      </v-col>
      <v-col>
        <v-switch v-model="yapi_type"
                  :label="yapi_type ? '当前生成为：列表' : '当前生成为：表单'"></v-switch>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels multiple
                            v-model="panelStatus">
          <!-- 展示生成之后的yapi数据 -->
          <v-expansion-panel>
            <v-expansion-panel-header>生成的yapi Json：</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card>
                <v-card-text>{{ txt_card }}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- 错误数据 -->
          <v-expansion-panel>
            <!-- 标题 -->
            <v-expansion-panel-header disable-icon-rotate>
              错误数据：
              <template v-slot:actions>
                <!-- 当有错误数据时，标红 -->
                <v-icon :color="sql_errorItems.length ? 'error' : 'info'">
                  mdi-alert-circle
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <!-- 详细错误内容 -->
            <v-expansion-panel-content>
              <v-card>
                <v-card-text>
                  <h2 v-for="(errInfo,i) in sql_errorItems"
                      :key="i">
                    {{ 'Sql第' + errInfo.rowIndex + '个字段，错误：' + errInfo.desc }}
                  </h2>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import listTemplate from './template/list'
import formTemplate from './template/form'
export default {
  data () {
    return {
      // 文本域输入的,在卡片上展示的生成的数据
      txt_area: '',
      txt_card: '',

      // 生成那种yapi？true列表 - 表单；yapi账号；生成的yapi表单；生成的yapi列表
      yapi_type: false,
      yapi_Account: {
        email: process.env.YAPI_USER,
        password: process.env.YAPI_PWD
      },
      yapi_formData: {},
      yapi_listData: {},

      // sql字段描述行,错误的sql,sql字段英文名，sql字段中文名/备注/描述
      sql_items: [],
      sql_errorItems: [],
      sql_keyArr: [],
      sql_comment: [],

      panelStatus: []
    }
  },
  mounted () {
    this.yapi_formData = formTemplate
    this.yapi_listData = listTemplate
  },
  methods: {
    // 调取yapi登录接口
    yapi_login () {
      this.$axios['yapi_login'](this.yapi_Account).then(data => {
        console.log(data)
      })
    },
    // 创建yapi
    createProperties () {
      let yapiData = {}
      let requiredArr = []
      // 生成表单项，键值-类型-备注
      this.sql_keyArr.forEach((key, i) => {
        // 创建表单项
        yapiData[key] = {
          type: 'string',
          description: this.sql_comment[i]
        }
        // 创建必定返回的表单项
        requiredArr.push(key)
      })
      // true 是列表，false是表单
      if (this.yapi_type) {
        this.yapi_listData.properties.data.properties.rows.items.properties = yapiData
        this.yapi_listData.properties.data.properties.rows.items.required = requiredArr
        this.txt_card = this.yapi_listData
      } else {
        this.yapi_formData.properties.data.properties.formObject.properties = yapiData
        this.yapi_formData.properties.data.properties.formObject.required = requiredArr
        this.txt_card = this.yapi_formData
      }
      this.panelStatus = [0, 1]
    },
    // 生成按钮点击事件
    btn_create () {
      /* 获取导出的sql语句中,通过观察SQL语句，我们可以发现：
        表的开头为create XXXX表 接一个“(”
        表的结束为申明主键：“primary key (XXX值)”
        表的每个字段为一行，每行结束以“,”结尾。
        每行的结构为：字段名、字段类型、字段描述/备注
        字段名在前，类型在中，描述以 “comment”开始，以单引号包裹，那么就只需要去除comment'XXX'，再去除类型(类型固定)，就能拿到字段英文名
      */
      this.sql_errorItems = []
      // sql数据开始、结束的index值，sql内容字段行
      let start = this.txt_area.indexOf('(') + 1
      let end = this.txt_area.indexOf('primary key')
      this.sql_items = this.txt_area.slice(start, end).trim().split(',')

      let tempNames = []
      let tempComments = []
      this.sql_items.forEach((row, i) => {
        if (row !== '') {
          tempNames.push(this.itemName(row.trim(), i))
          tempComments.push(this.itemComment(row.trim(), i))
        }
      })

      this.sql_keyArr = tempNames
      this.sql_comment = tempComments

      this.createProperties()
    },

    // 判断字段名，通过传入SQL描述字段的行，
    // 返回字段名
    itemName (itemRow, i) {
      try {
        // 经过观察，发现字段名后面会有空格，前面传入的时候已经做了trim，所以在第一个空格前就是字段名
        const end = itemRow.indexOf(' ')
        let name = itemRow.slice(0, end).replaceAll('"', '')

        // 存在下划线，去除下划线，后第一个字母转转驼峰
        if (name.indexOf('_') !== -1) {
          let upperIndex = name.indexOf('_')
          name = name.replace('_', '')
          name = name.split('')
          name[upperIndex] = name[upperIndex].toUpperCase()
          name = name.join().replaceAll(',', '')
        }
        return name
      } catch (error) {
        //! 补空
        this.itemError(i, '字段英文名写错了')
        return '字段英文名写错了'
      }
    },
    // 判断字段类型，通过传入 SQL描述字段的行，
    // 返回字段类型
    itemType (itemRow, i) {

    },
    // 判断字段类型，通过传入 SQL描述字段的行，
    // 返回字段描述/备注
    itemComment (itemRow, i) {
      try {
        // 经过观察，发现备注前面会有comment，且备注在行末，且以单引号扩起
        const start = itemRow.indexOf('comment') + 7
        let comment = itemRow.slice(start, itemRow.length).trim().replaceAll("'", '')
        return comment
      } catch (error) {
        //! 补空
        this.itemError(i, '字段缺少描述/备注')
        return ' '
      }
    },
    // 记录错误
    itemError (rowIndex, desc) {
      this.sql_errorItems.push(
        {
          rowIndex: rowIndex,
          desc: desc
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
