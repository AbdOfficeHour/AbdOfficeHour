// 本文件由FirstUI授权予杨方安（手机号：18938      63   15 93，身份证尾号：18 4  93  1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    tabBar: {
      type: Array,
      value: [],
      observer(vals) {
        this.initData(vals)
      }
    },
    //当前索引
    current: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    fontWeight: {
      type: Number,
      optionalTypes: [String],
      value: 400
    },
    //字体颜色
    color: {
      type: String,
      value: '#333333'
    },
    //字体选中颜色
    selectedColor: {
      type: String,
      value: ''
    },
    //背景颜色
    background: {
      type: String,
      value: '#FFFFFF'
    },
    isBorder: {
      type: Boolean,
      value: true
    },
    //固定在底部
    isFixed: {
      type: Boolean,
      value: true
    },
    //角标字体颜色
    badgeColor: {
      type: String,
      value: '#FFFFFF'
    },
    //角标背景颜色
    badgeBackground: {
      type: String,
      value: ''
    },
    //z-index
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 980
    }
  },
  data: {
    tabs: []
  },
  lifetimes: {
    attached: function () {
      let sys = wx.getSystemInfoSync()
      this.triggerEvent('init', {
        height: sys.windowWidth / 750 * 100
      })
      this.initData(this.data.tabBar)
    }
  },
  methods: {
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
    itemClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index: index,
        ...this.data.tabs[index]
      })
    }
  }
})