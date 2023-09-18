// 本文件由FirstUI授权予杨方安（手机号：  1  89 3 8 6   31593，身份证尾号：1  8   4931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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