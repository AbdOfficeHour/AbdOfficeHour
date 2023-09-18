// 本文件由FirstUI授权予杨方安（手机号：1  8 93 8    63 159 3，身份证尾号：1  84 9  31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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