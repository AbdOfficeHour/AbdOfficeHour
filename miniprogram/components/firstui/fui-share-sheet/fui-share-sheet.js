// 本文件由FirstUI授权予杨方安（手机号：  1 8  93863   1 5 93，身份证尾号：184   9 3 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    itemList: {
      type: Array,
      value: [],
      observer(val) {
        this.initData(val)
      }
    },
    width: {
      type: String,
      optionalTypes: [Number],
      value: 108
    },
    itemBackground: {
      type: String,
      value: 'transparent'
    },
    radius: {
      type: Boolean,
      value: true
    },
    background: {
      type: String,
      value: '#EAEAEA'
    },
    titleSlot: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '分享到'
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 24
    },
    color: {
      type: String,
      value: '#7f7f7f'
    },
    btnText: {
      type: String,
      value: '取消'
    },
    btnSize: {
      type: String,
      optionalTypes: [Number],
      value: 32
    },
    btnColor: {
      type: String,
      value: '#181818'
    },
    btnBackground: {
      type: String,
      value: 'transparent'
    },
    lineColor: {
      type: String,
      value: '#ddd'
    },
    maskBackground: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    maskClosable: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: String,
      optionalTypes: [Number],
      value: 1001
    },
    isFull: {
      type: Boolean,
      value: false
    },
    padding: {
      type: String,
      optionalTypes: [Number],
      value: 20
    }
  },
  data: {
    items: []
  },
  lifetimes: {
    attached: function () {
      this.initData(this.data.itemList)
    }
  },
  methods: {
    initData(vals) {
      if (vals && vals.length > 0) {
        if (Array.isArray(vals[0])) {
          vals = vals.map((item, index) => {
            return {
              id: 'fui_s0' + index,
              data: item
            }
          })
          this.setData({
            items: vals
          })
        } else {
          let items = [{
            id: 'fui_s01',
            data: vals
          }]
          this.setData({
            items: items
          })
        }
      }
    },
    maskClick(e) {
      if (!this.data.maskClosable) return;
      this.cancel(e)
    },
    cancel(e) {
      this.triggerEvent('cancel', {})
    },
    handleClick(e) {
      let dataset = e.currentTarget.dataset;
      let index = Number(dataset.index);
      let idx = Number(dataset.idx)
      if (Array.isArray(this.data.itemList[0])) {
        this.triggerEvent('click', {
          index: index,
          subIndex: idx,
          item: this.data.itemList[index][idx]
        })

      } else {
        this.triggerEvent('click', {
          index: idx,
          item: this.data.itemList[idx]
        })
      }
    },
    stop(e) {}
  }
})