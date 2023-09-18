// 本文件由FirstUI授权予杨方安（手机号：   18   9 386315   93，身份证尾号：  1 849 3 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
/*!
 * 生成海报
 * poster - v1.0.0 (2021/7/19, 16:52:14 PM)
 *
 * 官网地址：https://firstui.cn/
 * 文档地址：https://doc.firstui.cn/
 */
const poster = {
	_pixelRatio: 2,
	_ctx: null,
	_canvasId: null,
	_this: null,
	create(pixelRatio, canvasId, _this) {
		poster._pixelRatio = pixelRatio;
		poster._canvasId = canvasId;
		poster._this = _this;
		poster._ctx = wx.createCanvasContext(canvasId, _this)
	},
	_rpx2px(value) {
		let sys = wx.getSystemInfoSync()
		return sys.windowWidth / 750 * value
	},
	_toPx(rpx) {
		return this._rpx2px(rpx * poster._pixelRatio)
	},
	_getTextWidth(context, text, fontSize) {
		return context.measureText(text).width;
	},
	//canvas文字换行，rows=-1则不限制行数
	_wrapText(text, fontSize, textWidth, width, context, rows = 2) {
		let textArr = [];
		if (textWidth > width) {
			let fillText = '';
			let lines = 1;
			let arr = text.split('')
			for (let i = 0, len = arr.length; i < len; i++) {
				fillText = fillText + arr[i];
				if (poster._getTextWidth(context, fillText, fontSize) >= width) {
					if (lines === rows && rows !== -1) {
						if (i !== arr.length - 1) {
							fillText = fillText.substring(0, fillText.length - 1) + '...';
						}
						textArr.push(fillText);
						break;
					}
					textArr.push(fillText);
					fillText = '';
					lines++;
				} else if (i === arr.length - 1) {
					textArr.push(fillText);
				}
			}
		} else {
			textArr.push(text)
		}
		return textArr;
	},
	_drawText(context, params) {
		let {
			x,
			y,
			fontSize,
			color,
			baseLine = 'normal',
			textAlign = 'left',
			frontText,
			frontSize,
			spacing, //单位rpx
			text,
			opacity = 1,
			lineThrough = false,
			width = 500, //单位rpx
			rows = 1,
			lineHeight = 0,
			fontWeight = 'normal',
			fontStyle = 'normal',
			fontFamily = "sans-serif"
		} = params;
		context.save();
		context.beginPath();
		context.font = fontStyle + " " + fontWeight + " " + poster._toPx(fontSize).toFixed(0) + "px " + fontFamily
		context.setGlobalAlpha(opacity);
		context.setFillStyle(color);
		context.setTextBaseline(baseLine);
		context.setTextAlign(textAlign);
		let textWidth = poster._getTextWidth(context, text, fontSize);
		width = poster._toPx(width);
		let textArr = poster._wrapText(text, fontSize, textWidth, width, context, rows)
		//如果文本前面有其他文本内容
		if (frontText) {
			context.setFontSize(poster._toPx(frontSize));
			x = poster._getTextWidth(context, frontText, frontSize) + poster._toPx(x + spacing);
			context.setFontSize(poster._toPx(fontSize));
		} else {
			x = poster._toPx(x)
		}
		textArr.forEach((item, index) => {
			context.fillText(item, x, poster._toPx(y + (lineHeight || fontSize) * index))
		})
		context.restore();
		if (lineThrough) {
			let lineY = y;
			// 根据baseLine的不同对贯穿线的Y坐标做相应调整
			switch (baseLine) {
				case 'top':
					lineY += fontSize / 2 + 4;
					break;
				case 'middle':
					break;
				case 'bottom':
					lineY -= fontSize / 2 + 4;
					break;
				default:
					lineY -= fontSize / 2 - 3;
					break;
			}
			context.save();
			context.moveTo(x, poster._toPx(lineY));
			context.lineTo(x + textWidth + 2, poster._toPx(lineY));
			context.setStrokeStyle(color);
			context.stroke();
			context.restore();
		}
	},
	_drawRadiusRect(context, params) {
		let {
			x,
			y,
			width,
			height,
			borderRadius
		} = params;
		let r = poster._toPx(borderRadius / 2);

		x = poster._toPx(x)
		y = poster._toPx(y)
		width = poster._toPx(width)
		height = poster._toPx(height)

		context.beginPath();
		context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
		context.moveTo(x + r, y);
		context.lineTo(x + width - r, y);
		context.lineTo(x + width, y + r);

		context.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
		context.lineTo(x + width, y + height - r);
		context.lineTo(x + width - r, y + height);

		context.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
		context.lineTo(x + r, y + height);
		context.lineTo(x, y + height - r);

		context.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
		context.lineTo(x, y + r);
		context.lineTo(x + r, y);
	},
	_drawImage(context, params) {
		let {
			imgResource,
			x,
			y,
			width,
			height,
			sx,
			sy,
			sw,
			sh,
			borderRadius = 0,
			borderWidth = 0,
			borderColor
		} = params;
		context.save();
		if (borderRadius > 0) {
			this._drawRadiusRect(context, params);
			context.strokeStyle = 'rgba(255,255,255,0)'
			context.stroke();
			context.clip();
		}
		if (sw && sh) {
			//根据画布的宽高计算出图片绘制的大小，可保证图片绘制不变形
			//暂时未使用此api，后期如果有需要再进行优化
			context.drawImage(imgResource, poster._toPx(sx), poster._toPx(sy), poster._toPx(sw), poster._toPx(sh),
				poster
				._toPx(x), poster._toPx(y), poster._toPx(width), poster._toPx(height));
		} else {
			context.drawImage(imgResource, poster._toPx(x), poster._toPx(y), poster._toPx(width), poster._toPx(
				height))
		}
		if (borderWidth && borderWidth > 0) {
			context.setStrokeStyle(borderColor);
			context.setLineWidth(poster._toPx(borderWidth));
			context.stroke();
		}
		context.restore();
	},
	_drawBlock(context, params) {
		let {
			width,
			height,
			x,
			y,
			borderWidth,
			backgroundColor,
			gradientColor,
			gradientType = 1,
			borderColor,
			borderRadius = 0,
			opacity = 1,
			shadow
		} = params;
		if (backgroundColor) {
			context.save();
			context.setGlobalAlpha(opacity);
			if (gradientColor) {
				let grd = null;
				if (gradientType == 1) {
					//从上到下
					grd = context.createLinearGradient(0, 0, poster._toPx(width), poster._toPx(height))
				} else {
					//从左到右
					grd = context.createLinearGradient(0, poster._toPx(width), poster._toPx(height), 0)
				}
				grd.addColorStop(0, backgroundColor)
				grd.addColorStop(1, gradientColor)
				// Fill with gradient
				context.setFillStyle(grd);
			} else {
				context.setFillStyle(backgroundColor);
			}

			if (shadow) {
				const {
					offsetX,
					offsetY,
					blur,
					color
				} = shadow;
				context.shadowOffsetX = poster._toPx(offsetX)
				context.shadowOffsetY = poster._toPx(offsetY)
				context.shadowBlur = blur
				context.shadowColor = color
				// context.setShadow(poster._toPx(offsetX), poster._toPx(offsetY), blur, color);
			}

			if (borderRadius > 0) {
				// 画圆角矩形
				poster._drawRadiusRect(context, params);
				context.fill();
			} else {
				context.fillRect(poster._toPx(x), poster._toPx(y), poster._toPx(width), poster._toPx(height));
			}
			context.restore();
		}
		if (borderWidth) {
			// 画线
			context.save();
			context.setGlobalAlpha(opacity);
			context.setStrokeStyle(borderColor);
			context.setLineWidth(poster._toPx(borderWidth));
			if (borderRadius > 0) {
				// 画圆角矩形边框
				poster._drawRadiusRect(context, params);
				context.stroke();
			} else {
				context.strokeRect(poster._toPx(x), poster._toPx(y), poster._toPx(width), poster._toPx(height));
			}
			context.restore();
		}

	},
	_drawLine(context, params) {
		let {
			x,
			y,
			endX,
			endY,
			color,
			width = 1
		} = params;
		context.save();
		context.beginPath();
		context.setStrokeStyle(color);
		context.setLineWidth(poster._toPx(width));
		context.moveTo(poster._toPx(x), poster._toPx(y));
		context.lineTo(poster._toPx(endX), poster._toPx(endY));
		context.stroke();
		context.closePath();
		context.restore();
	},
	_modal: function (callback, confirmColor, confirmText) {
		wx.showModal({
			title: '提示',
			content: '您还没有开启相册权限，是否立即设置？',
			showCancel: true,
			cancelColor: '#B2B2B2',
			confirmColor: confirmColor || "#181818",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	//相册权限查询，如果没有权限则提示打开设置页面
	_judgePermissionPhotoLibrary: async function (callback) {
		wx.authorize({
			scope: 'scope.writePhotosAlbum',
			success() {
				callback && callback(true)
			},
			fail() {
				poster._modal((res) => {
					if (res) {
						wx.openSetting({
							success(res) {
								console.log(res.authSetting)
							}
						});
					}
				})
			}
		})
	},
	//图片转成本地文件
	getImage(url) {
		return new Promise((resolve, reject) => {
			wx.downloadFile({
				url: url,
				success: res => {
					resolve(res.tempFilePath);
				},
				fail: res => {
					reject(false)
				}
			})
		})
	},
	//当服务器端返回图片base64时,转成本地文件
	//微信小程序不支持直接绘制base64，其他平台可根据支持情况进行处理
	getImagebyBase64(base64) {
		//使用前先查看支持平台
		const uniqueId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
		return new Promise((resolve, reject) => {
			// #ifdef MP-WEIXIN
			const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
			let arrayBuffer = wx.base64ToArrayBuffer(bodyData)
			//uniqueId：注意这里名称需要动态生成（名称相同部分机型会出现写入失败，显示的是上次生成的图片）
			const filePath = `${wx.env.USER_DATA_PATH}/${uniqueId}.${format}`;
			//此处可能会出现存储空间不足的情况，可清理缓存解决
			//fail the maximum size of the file storage limit is exceeded
			wx.getFileSystemManager().writeFile({
				filePath,
				data: arrayBuffer,
				encoding: 'binary',
				success() {
					resolve(filePath);
				},
				fail() {
					reject(false)
				}
			})
		})
	},
	generatePoster(cw, ch, queue, callback) {
		const context = poster._ctx;
		if (context) {
			context.clearRect(0, 0, poster._toPx(cw), poster._toPx(ch))
			queue.forEach((params) => {
				if (params.type === 'image') {
					poster._drawImage(context, params)
				} else if (params.type === 'text') {
					poster._drawText(context, params)
				} else if (params.type === 'block') {
					poster._drawBlock(context, params)
				} else if (params.type === 'line') {
					poster._drawLine(context, params)
				}
			});
			const platform = wx.getSystemInfoSync().platform;
			let time = 50;
			if (platform === 'android') {
				time = 300;
			}
			setTimeout(() => {
				context.draw(false, () => {
					setTimeout(() => {
						wx.canvasToTempFilePath({
							x: 0,
							y: 0,
							canvasId: poster._canvasId,
							fileType: 'png',
							quality: 1,
							success: function (res) {
								callback && callback(res.tempFilePath)
							},
							fail() {
								callback && callback(false)
							}
						}, poster._this)
					}, time)
				})
			}, 50)
		} else {
			callback && callback(false)
		}
	},
	// 将海报图片保存到本地，H5只可预览然后长按保存
	saveImage(file) {
		//检查是否授权相册权限
		poster._judgePermissionPhotoLibrary((res) => {
			//保存图片
			if (res) {
				wx.saveImageToPhotosAlbum({
					filePath: file,
					success(res) {
						wx.showToast({
							title: '图片保存成功',
							icon: 'none'
						})
					},
					fail(res) {
						wx.showToast({
							title: '图片保存失败',
							icon: 'none'
						})
					}
				})
			}
		})
	}
}

export default {
	create: poster.create,
	generatePoster: poster.generatePoster,
	getImage: poster.getImage,
	getImagebyBase64: poster.getImagebyBase64,
	saveImage: poster.saveImage
};