// 本文件由FirstUI授权予杨方安（手机号：1 8938  6 3    15 9 3，身份证尾号：18   4 9 31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    closable: {
      type: Boolean,
      value: true
    },
    type: {
      type: String,
      value: 'cancel'
    },
    color: {
      type: String,
      value: '#fff'
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    position: {
      type: Number,
      optionalTypes: [String],
      value: 3
    },
    distance: {
      type: Number,
      optionalTypes: [String],
      value: 120
    },
    absolute: {
      type: Boolean,
      value: false
    },
    maskClosable: {
      type: Boolean,
      value: false
    },
    maskBackground: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    zIndex: {
      type: Number,
      value: 1001
    },
    param: {
      type: Number,
      optionalTypes: [String],
      value: 0
    }
  },
  data: {
    src: '',
    text: ''
  },
  methods: {
    closeWin(e) {
      if (!this.data.maskClosable) return;
      this.close(e)
    },
    close(e) {
      this.triggerEvent('close', {
        param: this.data.param
      });
    }
  }
})