// 本文件由FirstUI授权予闫弘宇（手机号：1 35  10 00  1 5  5 3，身份证尾号： 033 61   2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    src: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 576
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 318
    },
    title: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 32
    },
    descr: {
      type: String,
      value: ''
    },
    descrColor: {
      type: String,
      value: ''
    },
    descrSize: {
      type: String,
      optionalTypes:[Number],
      value: 24
    },
    isFixed: {
      type: Boolean,
      value: false
    },
    marginTop: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  }
})