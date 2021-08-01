<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-08-01 17:00:39
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-08-01 18:05:43
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->

# 如何取得表？

p标签下面的innerText 有以下这些文字，则他的下一个元素一定是表格(table标签)，
"【表单信息】，【查询字段】，【列表信息】"

# 如何取得表的信息?

根据上面的table标签，然后发现：第一行为表格的标题信息。

# 如何取得模块信息？

目前方案：通过在标题中添加特殊符号，然后遍历查找到该元素，存入数组，
然后通过 jquery的 nextUntil等api方法查找到中间的表单、列表、等数据字段。

方案2：直接通过 上面 如何取得表中的方法中查找到各部分数据，不管模块