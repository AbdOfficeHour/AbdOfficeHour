// 本文件由FirstUI授权予闫弘宇（手机号：1 3    51   00 01 553，身份证尾号： 0 33   612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options: {
    multipleSlots: true,
    virtualHost: true
  },
  properties: {
    lined: {
      type: Boolean,
      value: true
    },
    lineColor: {
      type: String,
      value: '#ccc'
    }
  },
  relations: {
    '../fui-timeaxis/fui-timeaxis': {
      type: 'ancestor',
      linked: function (target) {
        this.data.timeaxis = target
        this.init()
      }
    }
  },
  data: {
    timeaxis: null,
    lineWidth: 1,
    width: 48,
    leftWidth: 0
  },
  methods: {
    init() {
      const parent = this.data.timeaxis;
      if (parent) {
        this.setData({
          width: parent.data.width,
          lineWidth: parent.data.lineWidth,
          leftWidth: parent.data.leftWidth
        })
      }
    }
  }
})