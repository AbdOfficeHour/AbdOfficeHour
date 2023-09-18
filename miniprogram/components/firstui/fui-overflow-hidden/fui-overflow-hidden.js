// 本文件由FirstUI授权予杨方安（手机号： 1 893  8 63  1   593，身份证尾号：184   93  1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      optionalTypes:[Number],
      value: 1
    },
    rows: {
      type: String,
      optionalTypes:[Number],
      value: 1
    },
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: 'auto'
    },
    padding: {
      type: String,
      value:'0'
    },
    align: {
      type: String,
      value: 'left'
    },
    background: {
      type: String,
      value: 'transparent'
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 32
    },
    color: {
      type: String,
      value: '#333333'
    },
    fontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 'normal'
    },
    overflow: {
      type: String,
      value: 'ellipsis'
    },
    gradientColor: {
      type: String,
      value: '#FFFFFF'
    },
    visible: {
      type: Boolean,
      value: false
    },
    param: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  methods: {
    handleTap(e) {
      this.triggerEvent('click', {
        param: this.data.param
      })
    }
  }
})