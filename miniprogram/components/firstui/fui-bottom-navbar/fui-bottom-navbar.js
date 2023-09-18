// 本文件由FirstUI授权予杨方安（手机号：1  8 9 3 8 63   15 93，身份证尾号：1 8  4 9 31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer(vals) {
        this.initData(vals)
      }
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 100
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    fontWeight: {
      type: Number,
      optionalTypes: [String],
      value: 400
    },
    color: {
      type: String,
      value: '#333333'
    },
    left: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    background: {
      type: String,
      value: '#FFFFFF'
    },
    isBorder: {
      type: Boolean,
      value: true
    },
    isDivider: {
      type: Boolean,
      value: true
    },
    lineColor: {
      type: String,
      value: '#EEEEEE'
    },
    isFixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 900
    },
    //是否适配底部安全区
    safeArea: {
      type: Boolean,
      value: true
    }
  },
  data: {
    tabs: []
  },
  lifetimes: {
    attached: function () {
      this.emitInit()
      this.initData(this.data.items)
    }
  },
  methods: {
    emitInit() {
      const res = wx.getSystemInfoSync();
      let iphonex = this.isPhoneX(res);
      let safeAreaH = iphonex ? 34 : 0

      this.triggerEvent('init', {
        height: (res.windowWidth / 750 * this.data.height) + safeAreaH,
        windowWidth: res.windowWidth
      })
    },
    initData(vals) {
      if (vals && vals.length > 0) {
        if (typeof vals[0] === 'string') {
          vals = vals.map(item => {
            return {
              text: item
            }
          })
        }
        this.setData({
          tabs: vals
        })
      }
    },
    isPhoneX(res) {
      if (!this.data.safeArea) return false;
      let iphonex = false;
      const model = res.model.replace(/\s/g, "").toLowerCase()
      if (model.includes('iphone') && res.safeArea.top > 20) {
        iphonex = true;
      }
      return iphonex;
    },
    itemClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index: index,
        ...this.data.tabs[index]
      })
    }
  }
})