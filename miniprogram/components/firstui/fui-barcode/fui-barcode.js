// 本文件由FirstUI授权予闫弘宇（手机号：  135     10001  5 53，身份证尾号： 03 3 6 1 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import barcode from './barcode.js'
const canvasId = `fui_bc_${Math.ceil(Math.random() * 10e5).toString(36)}`
const defalutOptions = {
  number: true,
  prefix: true,
  color: '#181818',
  debug: false,
  onValid() {},
  onInvalid() {},
  onSuccess() {},
  onError() {}
}
Component({
  properties: {
    width: {
      type: String,
      optionalTypes: [Number],
      value: 480,
      observer(val) {
        this.setData({
          w: this.rpx2px(val || 480)
        })
      }
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 200,
      observer(val) {
        this.setData({
          h: this.rpx2px(val || 200)
        })
      }
    },
    value: {
      type: String,
      optionalTypes:[Number],
      value: ''
    }
  },
  data: {
    canvasId,
    defalutOptions,
    w: 240,
    h: 100,
    ctx: null
  },
  lifetimes: {
    attached: function () {
      this.setData({
        w: this.rpx2px(this.data.width || 480),
        h: this.rpx2px(this.data.height || 200)
      })
    },
    ready:function(){
      setTimeout(() => {
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
    draw(options = {}) {
      if (!this.data.ctx) {
        this.data.ctx = wx.createCanvasContext(this.data.canvasId, this)
      }
      const opts = Object.assign({}, this.data.defalutOptions, options)
      new barcode(String(this.data.value), Object.assign({
        width: this.data.w,
        height: this.data.h
      }, opts), this.data.ctx)
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