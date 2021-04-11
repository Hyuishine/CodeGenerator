/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-26 14:08:36
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-26 14:34:24
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
 */
export default (url, code) => {
  var template = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title></title>
</head>

<body>
	<script>
		var itemCode = "${code}"
		var url = "http://${url}";
		if (location.protocol === "https:") {
			url = "https://${url}";
		}
		if (location.search) {
			url = url + location.search + "&itemCode=" + itemCode;
		} else {
			url = url + "?itemCode=" + itemCode;
		}
		if (history.replaceState && location.href.indexOf("/ganfutong.jiangxi.gov.cn/jmopen/webapp/html5") > -1) {
			history.replaceState(null, document.title, url);
			window.location.reload();
		} else {
			location.replace(url)
		}
	</script>
</body>

</html>`
  return template
}
