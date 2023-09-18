// 本文件由FirstUI授权予杨方安（手机号： 1  89  3  8 63 159 3，身份证尾号： 1 849  3 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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