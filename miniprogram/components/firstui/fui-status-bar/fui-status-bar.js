// 本文件由FirstUI授权予闫弘宇（手机号：13510     00  1   553，身份证尾号：  0 3 36 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
var statusBarHeight = wx.getSystemInfoSync().statusBarHeight + 'px'
Component({
  properties: {
    //背景色
    background: {
      type: String,
      value: 'transparent'
    },
    //是否固定在顶部
    isFixed: {
      type: Boolean,
      value: false
    },
    //z-index值，isFixed为true时生效
    zIndex: {
      type: Number,
      value: 99
    }
  },
  data: {
    statusBarHeight
  },
  lifetimes: {
     attached:function(){
      this.triggerEvent('init', {
				statusBarHeight: statusBarHeight
			})
     }
  }
})