// 本文件由FirstUI授权予杨方安（手机号： 1  8  93  8 6 31 593，身份证尾号： 1 84  93 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    options: {
      type: Array,
      value: [],
      observer(val) {
        this.initData(val)
      }
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 600
    },
    type: {
      type: String,
      value: 'select'
    },
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    //自定义头部
    customHeader: {
      type: Boolean,
      value: false
    },
    headerBackground: {
      type: String,
      value: '#fff'
    },
    title: {
      type: String,
      value: '请选择'
    },
    titleSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    titleColor: {
      type: String,
      value: '#181818'
    },
    fontWeight: {
      type: Number,
      optionalTypes: [String],
      value: 400
    },
    multiple: {
      type: Boolean,
      value: false
    },
    background: {
      type: String,
      value: '#fff'
    },
    padding: {
      type: String,
      value: '32rpx'
    },
    //选择框选中后颜色
    checkboxColor: {
      type: String,
      value: ''
    },
    borderColor: {
      type: String,
      value: '#ccc'
    },
    isCheckMark: {
      type: Boolean,
      value: false
    },
    checkmarkColor: {
      type: String,
      value: '#fff'
    },
    isReverse: {
      type: Boolean,
      value: false
    },
    splitLine: {
      type: Boolean,
      value: true
    },
    lineColor: {
      type: String,
      value: '#EEEEEE'
    },
    bottomLeft: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    arrowColor: {
      type: String,
      value: '#B2B2B2'
    },
    highlight: {
      type: Boolean,
      value: true
    },
    iconWidth: {
      type: Number,
      optionalTypes: [String],
      value: 48
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 30
    },
    color: {
      type: String,
      value: '#181818'
    },
    btnText: {
      type: String,
      value: '确定'
    },
    btnBackground: {
      type: String,
      value: ''
    },
    btnColor: {
      type: String,
      value: '#fff'
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
      type: Number,
      optionalTypes: [String],
      value: 1001
    }
  },
  data: {
    itemList: [],
    index: -1,
  },
  lifetimes: {
    attached: function () {
      this.initData(this.data.options)
    }
  },
  methods: {
    initData(vals) {
      vals = JSON.parse(JSON.stringify(vals))
      if (vals && vals.length > 0) {
        if (typeof vals[0] !== 'object') {
          vals = vals.map(item => {
            return {
              text: item,
              checked: false
            }
          })
        } else {
          vals.map((item,index) => {
            item.checked = item.checked || false
            if (this.data.type === 'select' && !this.data.multiple && item.checked) {
              this.setData({
                index: index
              })
            }
          })
        }
        this.setData({
          itemList: vals
        })
      }
    },
    itemClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      let vals = [...this.data.itemList]
      let item = vals[index]
      if (this.data.type === 'select') {
        if (this.data.multiple) {
          item.checked = !item.checked;
        } else {
          vals.forEach((item, idx) => {
            if (index === idx) {
              item.checked = true
            } else {
              item.checked = false
            }
          })
          this.setData({
            index: index
          })
        }
        this.setData({
          itemList: vals
        })
      } else {
        this.triggerEvent('click', {
          index: index,
          options: this.data.options[index]
        })
      }
    },
    handleClick() {
      if (this.data.type !== 'select') return;
      if (this.data.multiple) {
        let items = []
        this.data.itemList.forEach((item, idx) => {
          if (item.checked) {
            items.push(this.data.options[idx])
          }
        })
        this.triggerEvent('confirm', {
          options: items
        })
      } else {
        let index = this.data.index;
        this.triggerEvent('confirm', {
          index: index,
          options: index === -1 ? '' : this.data.options[this.data.index]
        })
      }

    },
    maskClose() {
      if (!this.data.maskClosable) return;
      this.handleClose()
    },
    handleClose() {
      this.triggerEvent('close', {})
    },
    stop() {}
  }
})