// 本文件由FirstUI授权予闫弘宇（手机号：1 35  1  00 0    1553，身份证尾号： 03  3 6 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const sys = wx.getSystemInfoSync()
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    padding: {
      type: Number,
      optionalTypes: [String],
      value: 8
    },
    title: {
      type: String,
      value: ''
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 17
    },
    //标题颜色
    color: {
      type: String,
      value: ''
    },
    fontWeight: {
      type: Number,
      optionalTypes: [String],
      value: 500
    },
    background: {
      type: String,
      value: ''
    },
    splitLine: {
      type: Boolean,
      value: false
    },
    statusBar: {
      type: Boolean,
      value: true
    },
    isFixed: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 996
    },
    custom: {
      type: Boolean,
      value: false
    },
    //v1.9.9+
    isOccupy: {
      type: Boolean,
      value: false,
      observer(val){
        this.getStyle()
      }
    }
  },
  data: {
    statusBarHeight: sys.statusBarHeight,
    style:''
  },
  lifetimes: {
    attached: function () {
      let obj = wx.getMenuButtonBoundingClientRect();
      this.getStyle()
      this.triggerEvent('init', {
        windowWidth: sys.windowWidth,
        //不包含状态栏高度固定为：44px
        height: 44,
        statusBarHeight: sys.statusBarHeight,
        //小程序右上角悬浮按钮左边界坐标，单位：px
        left: obj.left || -1,
        //小程序右上角悬浮按钮宽度，单位：px
        btnWidth: obj.width || 0,
        //小程序右上角悬浮按钮高度，单位：px
        btnHeight: obj.height || 0
      })
    }
  },
  methods: {
    getStyle() {
      let style = ''
      if (this.data.isOccupy) {
        let height = this.data.statusBar ? (this.data.statusBarHeight + 44) : 44
        style += `height:${height}px;`
      }
      this.setData({
        style
      })
    },
    leftClick() {
      this.triggerEvent("leftClick");
    },
    rightClick() {
      this.triggerEvent("rightClick");
    },
    titleClick() {
      this.triggerEvent("titleClick");
    }
  }
})