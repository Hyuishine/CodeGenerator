<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-07-27 16:39:35
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-27 16:40:59
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->

# 参考数据 #

```json

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "required": [
    "code",
    "message",
    "data"
  ],
  // 该层级下必反的数据
  "properties": { // 子项数据
    "code": { // 状态码
      "type": "number", // 类型
      "description": "状态码", // 描述、备注
      "mock": {
        "mock": "200" // 写死值
      }
    },
    "message": { // 提示信息
      "type": "string",
      "mock": {
        "mock": "success"
      }
    },
    "data": { // 数据
      "type": "object",
      "required": [
        "formObject"
      ],
      "properties": {
        "formObject": {
          "type": "object",
          "required": [],
          "properties": {
            // keyArr: { // key值
            //   "type": "string",
            //   description: "descriptionArr" 描述
            // }
          }
        }
      }
    }
  }
}
```
