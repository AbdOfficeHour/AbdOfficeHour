// 本文件由FirstUI授权予闫弘宇（手机号：  1 3 5  10 0 0  1553，身份证尾号：0  33 6  12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
/*!
 * 剪贴板
 *
 * 官网地址：https://firstui.cn/
 * 文档地址：https://doc.firstui.cn/
 */
// #ifdef H5
// import ClipboardJS from "./clipboard.min.js"
// #endif

/**
 * data 需要复制的数据
 * callback 回调
 * **/
const getClipboardData = function (data, callback) {

	wx.setClipboardData({
		data: data,
		success(res) {
			("function" == typeof callback) && callback(true)
		},
		fail(res) {
			("function" == typeof callback) && callback(false)
		}
	})
}
export default {
	getClipboardData: getClipboardData
};