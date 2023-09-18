// 本文件由FirstUI授权予杨方安（手机号：18 938 63     1 5  93，身份证尾号： 1 84 9 3 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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