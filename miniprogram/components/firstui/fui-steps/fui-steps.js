// 本文件由FirstUI授权予闫弘宇（手机号：135   100 0     1 553，身份证尾号：03 36    12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    items: {
      type: Array,
      value: []
    },
    current: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    //row/column
    direction: {
      type: String,
      value: 'row'
    },
    padding: {
      type: String,
      value: '0'
    },
    background: {
      type: String,
      value: 'transparent'
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 50
    },
    nodeColor: {
      type: String,
      value: '#ccc'
    },
    color: {
      type: String,
      value: '#181818'
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    fontWeight: {
      type: Number,
      optionalTypes: [String],
      value: 400
    },
    descrColor: {
      type: String,
      value: '#B2B2B2'
    },
    descrSize: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    activeColor: {
      type: String,
      value: ''
    },
    //V1.9.8+ 设置当前步骤的状态 wait /  error / success
    processStatus: {
      type: String,
      value: ''
    },
    //V1.9.8+ 设置当前步骤的状态 颜色
    processColor: {
      type: String,
      value: ''
    },
    radius: {
      type: String,
      value: '0rpx'
    },
    //完成到当前步骤时是否需要对号标识
    isMark: {
      type: Boolean,
      value: true
    },
    isWait: {
      type: Boolean,
      value: false
    },
    //步骤线条是否加粗 V1.9.8+
    lineBold: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index: index,
        ...this.data.items[index]
      })
    }
  }
})