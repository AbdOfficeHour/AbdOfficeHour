// 本文件由FirstUI授权予闫弘宇（手机号： 1   351 0   001 55 3，身份证尾号：033 61    2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    href: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value: ''
    },
    underline: {
      type: String,
      optionalTypes:[Boolean],
      value: false
    },
    copyTips: {
      type: String,
      value: '链接已复制'
    },
    color: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    fontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 400
    },
    highlight: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    openURL() {
      wx.setClipboardData({
        data: this.data.href,
        success: () => {
          wx.showToast({
            title: this.data.copyTips,
            icon: 'none'
          });
        }
      });
    }
  }
})