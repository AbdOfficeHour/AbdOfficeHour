// 本文件由FirstUI授权予杨方安（手机号：1 8  9386   3  15  93，身份证尾号： 184   93 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import keys from './index.js'
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    toolbar: {
      type: Boolean,
      value: true
    },
    text: {
      type: String,
      value: '完成'
    },
    color: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 30
    },
    fontWeight: {
      type: String,
      optionalTypes: [Number],
      value: 500
    },
    name: {
      type: String,
      value: 'backspace-fill'
    },
    theme: {
      type: String,
      value: 'light'
    },
    zIndex: {
      type: String,
      optionalTypes: [Number],
      value: 1001
    }
  },
  data: {
    keyList: [],
    type: 1
  },
  lifetimes: {
    attached: function () {
      this.setData({
        keyList: keys
      })
    }
  },
  methods: {
    keyClick(e) {
      let dataset = e.currentTarget.dataset;
      let index = Number(dataset.index);
      let idx = Number(dataset.idx);
      let val = dataset.val
      let text = this.data.type === 1 ? val.cn : val.en
      if (!this.data.show || !text) return;
      if (index === 3 && idx === 0) {
        this.setData({
          type: this.data.type === 1 ? 2 : 1
        })
      } else {
        this.triggerEvent('click', {
          value: text
        })
      }
    },
    backspace() {
      if (!this.data.show) return;
      this.triggerEvent('backspace', {})
    },
    onComplete() {
      if (!this.data.toolbar || !this.data.show) return;
      this.triggerEvent('complete', {})
    },
    changeKeyboard(type = 'en') {
      this.setData({
        type: type === 'en' ? 2 : 1
      })
    }
  }
})