<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-02-25 10:28:33
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-02-25 16:01:48
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
## extractApi 从各文件取出 用于构成接口调用的 接口参数

简写：  apiName：url

详细：apiName：{
        method：'POST',
        url:google/test,
        responseType:'blob',
        beforeRequest (dat) {

        },
        afterResponse (data) {
            
        }
    }

## request axios 调接口实例 可以在此处拦截

## 最后 将接口方法封装好 然后再到 main 中引用

#### 未封装前 接口需要写四层

axios实例、request 方法、接口回调、页面内调用

request 方法：
    ```javascript
 test() {
    return request({
      url: '/test/test',
      method: 'post'
    })
}
    ```

接口回调：
```javascript
test({ commit }, object) {
      return new Promise((resolve, reject) => {
        test(object).then(response => {
          var data = response.data
          var code = data.code
          if (code === '200') {
          } else {
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
```

页面内调用：
```javascript
this.$store.dispatch('test',sendData)
.then(()=>{

})
.catch(()=>{

})
```

#### 封装好后：

url填写：
  简写：
  接口名：接口地址
  test:'/test/test'

  详细：
  接口名：{
    地址：'/test/test',
    调用方法：'POST',
    数据类型:'BLOB',
    接口前回调：,
    接口后回调：,
  }

  调用：
  ```javascript
  
  this.$axios['接口名']({sendData})
    .then((data)=>{
      
    })
    .catch((err)=>{
      
    })

  ```
