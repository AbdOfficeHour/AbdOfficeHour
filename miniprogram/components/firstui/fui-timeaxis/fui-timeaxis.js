// 本文件由FirstUI授权予闫弘宇（手机号：1  3 5 1  0 00 1  553，身份证尾号： 0   3 3612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    padding: {
      type: String,
      value: "0"
    },
    background: {
      type: String,
      value: 'transparent'
    },
    leftWidth: {
      type: Number,
      optionalTypes: [String],
      value: 0,
      observer(val) {
        this.data.children.forEach(item => {
          item.setData({
            leftWidth: val
          })
        })
      }
    },
    width: {
      type: Number,
      optionalTypes: [String],
      value: 48,
      observer(val) {
        this.data.children.forEach(item => {
          item.setData({
            width: val
          })
        })
      }
    },
    lineWidth: {
      type: Number,
      optionalTypes: [String],
      value: 1,
      observer(val) {
        this.data.children.forEach(item => {
          item.setData({
            lineWidth: val
          })
        })
      }
    }
  },
  relations: {
    '../fui-timeaxis-node/fui-timeaxis-node': {
      type: 'descendant',
      linked: function (target) {
        this.data.children.push(target)
      }
    }
  },
  data: {
    children: []
  }
})