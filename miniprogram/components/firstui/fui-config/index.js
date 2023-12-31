// 本文件由FirstUI授权予闫弘宇（手机号：135 10 0    0  15  53，身份证尾号：0 3   361 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
/*
  组件属性全局配置文件。优先级：全局配置文件props < 直接设置组件props
  目前支持配置的组件：fui-button、fui-icon、fui-text、fui-input、fui-list-cell
*/

// 主色，仅适用无法使用css变量控制颜色的组件使用【保持与fui-theme中一致】
const color = {
	primary: '#465CFF',
	success: '#09BE4F',
	warning: '#FFB703',
	danger: '#FF2B2B',
	purple: '#6831FF',
	link: '#465CFF'
}

//全局方法（V1.9.8+）
const app = {
  // 设计稿 375 的宽度
	rpx2px(value){
		let sys = wx.getSystemInfoSync()
		return sys.windowWidth / 750 * value
	},
	toast: function(text, icon = 'none') {
		text && wx.showToast({
			title: text,
			icon: icon,
			duration: 2000
		})
	},
	modal: function(title, content, callback, showCancel, confirmColor, confirmText) {
		wx.showModal({
			title: title,
			content: content,
			showCancel: showCancel || false,
			cancelColor: "#7F7F7F",
			confirmColor: confirmColor || color.primary,
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	href(url, isMain) {
		if (isMain) {
			wx.switchTab({
				url: url
			})
		} else {
			wx.navigateTo({
				url: url
			});
		}
	}
}

const fuiConfig = {
	//组件名称，小驼峰命名
	//如fui-button写成fuiButton
	fuiButton: {
		//组件属性值
		height: '96rpx',
		size: 32,
		radius: '16rpx'
	},
	fuiIcon: {
		size: 64,
		unit: 'rpx'
	},
	fuiText: {
		size: 32,
		unit: 'rpx'
	},
	fuiInput: {
    labelSize: 32,
    labelColor:'#333',
    size: 32,
    color: '#333'
	},
	fuiListCell: {
		padding: '32rpx',
		arrowColor: '#B2B2B2',
		bottomLeft: 32
	},
	// V1.9.9+
	fuiSection: {
		size: 32,
		color: '#181818',
		fontWeight: 600,
		descrSize: 28,
		descrColor: '#B2B2B2',
		descrTop: 12
	},
	color,
	...app
}

export default fuiConfig