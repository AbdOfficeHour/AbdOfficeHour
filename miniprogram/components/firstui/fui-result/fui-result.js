// 本文件由FirstUI授权予杨方安（手机号： 18938    6 31    593，身份证尾号：184   9  31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    paddingTop: {
      type: String,
      optionalTypes:[Number],
      value: 96
    },
    //success，warning，fail, waiting
    type: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    //缩放比例
    scaleRatio: {
      type: Number,
      value: 1
    },
    title: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 44
    },
    color: {
      type: String,
      value: ''
    },
    descr: {
      type: String,
      value: ''
    },
    descrSize: {
      type: String,
      optionalTypes:[Number],
      value: 32
    },
    descrColor: {
      type: String,
      value: ''
    }
  }
})