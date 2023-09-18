// 本文件由FirstUI授权予杨方安（手机号：18 9  3 86    31 5 93，身份证尾号：18 49  3  1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    padding: {
      type: String,
      value: '24rpx 32rpx'
    },
    background: {
      type: String,
      value: 'rgba(0, 0, 0, 0.6)',
      observer(val) {
        this.setData({
          opts_bg: val
        })
      }
    },
    color: {
      type: String,
      value: '#fff',
      observer(val) {
        this.setData({
          opts_color: val
        })
      }
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 30,
      observer(val) {
        this.setData({
          opts_size: val
        })
      }
    },
    //left/center/right
    textAlign: {
      type: String,
      value: 'center',
      observer(val) {
        this.setData({
          opts_align: val
        })
      }
    },
    //提示框top值 px
    top: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    left: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    right: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    ridus: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    zIndex: {
      type: Number,
      value: 1001
    }
  },
  data: {
    text: '',
    timer: null,
    isShow: false,
    opts_bg: 'rgba(0, 0, 0, 0.6)',
    opts_color: '#fff',
    opts_size: 30,
    opts_align: 'center'
  },
  lifetimes: {
    attached: function () {
      this.setOptions()
    },
    detached: function () {
      this.clearTimer()
    }
  },
  methods: {
    setOptions(options = {}) {
      this.setData({
        opts_color: options.color || this.data.color,
        opts_bg: options.background || this.data.background,
        opts_size: options.size || this.data.background,
        opts_align: options.textAlign || this.data.textAlign
      })
    },
    show(options) {
      this.clearTimer()
      this.setOptions(options)
      this.setData({
        text: options.text || ''
      }, () => {
        let duration = options.duration || 2000
        this.setData({
          isShow: true
        })
        this.data.timer = setTimeout(() => {
          this.setData({
            isShow: false
          })
        }, duration)
      })
    },
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    }
  }
})