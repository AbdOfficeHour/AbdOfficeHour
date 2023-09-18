// 本文件由FirstUI授权予闫弘宇（手机号： 1    35100 01    553，身份证尾号：0    33 612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 28
    },
    fontWeight: {
      type: String,
      optionalTypes: [Number],
      value: 400
    },
    color: {
      type: String,
      value: '#181818'
    },
    background: {
      type: String,
      value: 'transparent'
    },
    showBtn: {
      type: Boolean,
      value: true
    },
    direction: {
      type: String,
      value: 'top'
    },
    zIndex: {
      type: String,
      optionalTypes: [Number],
      value: 1001
    },
    removeCopy: {
      type: Boolean,
      value: false
    },
    //扩展按钮
    buttons: {
      type: Array,
      value: []
    }
  },
  data: {
    showTooltip: false
  },
  methods: {
    handleCopy(e) {
      if (this.data.showBtn || this.data.buttons.length > 0) {
        this.setData({
          showTooltip: true
        })
      } else {
        this.copyVal(e);
      }
    },
    copyVal(e) {
      wx.setClipboardData({
        data: this.data.value || this.data.text,
        success: (res) => {
          this.triggerEvent('copy', {
            text: this.data.text,
            value: this.data.value
          });
        },
        fail(res) {}
      })
      this.hiddenTooltip();
    },
    hiddenTooltip() {
      this.setData({
        showTooltip: false
      })
    },
    buttonTap(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index: index,
        text: this.data.buttons[index]
      });
      this.hiddenTooltip();
    }
  }
})