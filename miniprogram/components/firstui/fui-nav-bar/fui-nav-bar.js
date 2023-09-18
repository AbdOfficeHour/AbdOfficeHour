// 本文件由FirstUI授权予杨方安（手机号： 1  89 38631 5    9 3，身份证尾号：18   4 93 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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
    }
  },
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight
  },
  lifetimes: {
    attached: function () {
      let sys = wx.getSystemInfoSync()
      let obj = {};
      obj = wx.getMenuButtonBoundingClientRect();
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