// 本文件由FirstUI授权予杨方安（手机号：1  89 38631 5      93，身份证尾号：1 84    931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import fuiQr from './fui-qr/index.js'
const canvasId = `fui_qr_${Math.ceil(Math.random() * 10e5).toString(36)}`
/**
 * 字符串转换成 UTF-8
 * @param {String} str 文本内容
 */
const utf16to8 = (str) => {
  const len = str.length
  let out = ''

  for (let i = 0; i < len; i++) {
    const c = str.charCodeAt(i)

    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }

  return out
}
Component({
  properties: {
    width: {
      type: String,
      optionalTypes: [Number],
      value: 400
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 400
    },
    value: {
      type: String,
      value: ''
    },
    foreground: {
      type: String,
      value: '#181818'
    },
    background: {
      type: String,
      value: '#ffffff'
    }
  },
  data: {
    canvasId,
    //误差校正等级
    errorCorrectLevel: 2,
    //类型
    typeNumber: -1,
    w: 200,
    h: 200,
    ctx: null
  },
  observers: {
    'width,height,foreground,background,value': function (width, height, foreground, background, value) {
      this.setData({
        w: this.rpx2px(this.data.width || 400),
        h: this.rpx2px(this.data.height || 400)
      }, () => {
        setTimeout(() => {
          this.draw()
        }, 50);
      })
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({
        w: this.rpx2px(this.data.width || 400),
        h: this.rpx2px(this.data.height || 400)
      })
    },
    ready: function () {
      setTimeout(() => {
        this.draw()
        this.triggerEvent('ready', {
          canvasId: this.data.canvasId
        })
      }, 50)
    }
  },
  methods: {
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    draw() {
      const qrcode = fuiQr(utf16to8(this.data.value), {
        typeNumber: this.data.typeNumber,
        errorCorrectLevel: this.data.errorCorrectLevel,
      })
      const cells = qrcode.modules
      const tileW = this.data.w / cells.length
      const tileH = this.data.h / cells.length

      if (!this.data.ctx) {
        this.data.ctx = wx.createCanvasContext(this.data.canvasId, this)
      }
      this.data.ctx.scale(1, 1)

      cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
          this.data.ctx.setFillStyle(cell ? this.data.foreground : this.data.background)
          const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
          const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
          this.data.ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
        })
      })
      this.data.ctx.draw()
    },
    longtap() {
      this.triggerEvent('longclick', {})
    },
    touchstart() {
      this.triggerEvent('touchStart', {})
    },
    touchend() {
      this.triggerEvent('touchEnd', {})
    }
  }
})