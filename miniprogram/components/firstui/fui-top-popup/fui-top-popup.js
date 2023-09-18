// 本文件由FirstUI授权予闫弘宇（手机号： 1   35100    015 5 3，身份证尾号：  0 3 36 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    //背景颜色
    background: {
      type: String,
      value: '#fff'
    },
    //圆角
    radius: {
      type: Number,
      optionalTypes:[String],
      value: 24
    },
    zIndex: {
      type: Number,
      optionalTypes:[String],
      value: 1001
    },
    //点击遮罩 是否可关闭
    maskClosable: {
      type: Boolean,
      value: true
    },
    maskBackground: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    }
  },
  methods: {
    handleClose(e) {
      if (!this.data.maskClosable) return;
      this.triggerEvent('close', {});
    },
    stop() {}
  }
})