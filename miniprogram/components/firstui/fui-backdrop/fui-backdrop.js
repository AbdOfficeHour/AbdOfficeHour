// 本文件由FirstUI授权予闫弘宇（手机号： 13 510 0 0    1  553，身份证尾号：03 3  6  12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    background: {
      type: String,
      value: ''
    },
    absolute: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      value: 999
    },
    closable: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleClick() {
      if (this.data.closable && this.data.show) {
        this.triggerEvent('click')
      }
    }
  }
})