// 本文件由FirstUI授权予闫弘宇（手机号：1    3510 001  5  5 3，身份证尾号：  0336 1  2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '温馨提示'
    },
    color: {
      type: String,
      value: '#333'
    },
    content: {
      type: String,
      value: ''
    },
    contentColor: {
      type: String,
      value: '#7F7F7F'
    },
    buttons: {
      type: Array,
      value: [{
        text: '取消'
      }, {
        text: '确定',
        color: '#465CFF'
      }]
    },
    background: {
      type: String,
      value: '#fff'
    },
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    maskBackground: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    maskClosable: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    handleClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index,
        ...this.data.buttons[index]
      });
    },
    maskClose() {
      if (!this.data.maskClosable) return;
      this.triggerEvent('close', {});
    },
    stop() {}
  }
})