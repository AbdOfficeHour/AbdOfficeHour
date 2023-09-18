// 本文件由FirstUI授权予闫弘宇（手机号： 1  35   100 01 5  53，身份证尾号：033     612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    width: {
      type: Number,
      optionalTypes: [String],
      value: 240
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 2
    },
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 2
    },
    min: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    max: {
      type: Number,
      optionalTypes: [String],
      value: 100
    },
    step: {
      type: Number,
      optionalTypes: [String],
      value: 1
    },
    value: {
      type: Number,
      optionalTypes: [String],
      value: 0,
      observer(val) {
        let start = this.getStartVal(val)
        this.setData({
          initValue: start,
          start: start
        })
      }
    },
    section: {
      type: Boolean,
      value: false
    },
    endValue: {
      type: Number,
      optionalTypes: [String],
      value: 100,
      observer(val) {
        let end = this.getEndVal(val)
        this.setData({
          initEndValue: end,
          end: end
        })
      }
    },
    background: {
      type: String,
      value: '#e1e1e1'
    },
    activeColor: {
      type: String,
      value: ''
    },
    blockWidth: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    blockHeight: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    blockColor: {
      type: String,
      value: '#fff'
    },
    blockRadius: {
      type: Number,
      optionalTypes: [String],
      value: 12
    },
    disabled: {
      type: Boolean,
      value: false
    },
    showValue: {
      type: Boolean,
      value: false
    },
    valueWidth: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    valueSize: {
      type: Number,
      optionalTypes: [String],
      value: 14
    },
    //value字体颜色
    valueColor: {
      type: String,
      value: '#333'
    }
  },
  data: {
    start: 0,
    end: 0,
    initValue: 0,
    initEndValue: 0
  },
  lifetimes: {
    attached: function () {
      this.setData({
        start: this.getStartVal(this.data.value),
        end: this.getEndVal(this.data.endValue)
      }, () => {
        this.setData({
          initValue: this.data.start,
          initEndValue: this.data.end
        })
      })
    }
  },
  methods: {
    getStartVal(val) {
      val = Number(val)
      let min = Number(this.data.min)
      val = val < min ? min : val
      return val
    },
    getEndVal(val) {
      val = Number(val)
      let min = Number(this.data.min)
      let max = Number(this.data.max)
      val = val < min ? min : val
      val = val > max ? max : val
      return val
    },
    getParams(e) {
      let val = e.value;
      if (this.data.section && !e.isStart) {
        this.setData({
          end: val
        })
      } else {
        this.setData({
          start: val
        })
      }
      let params = {
        value: this.data.start
      }
      if (this.data.section) {
        params.endValue = this.data.end
      }
      return params
    },
    change(e) {
      let params = this.getParams(e)
      this.triggerEvent('change', params);
    },
    changing(e) {
      let params = this.getParams(e)
      this.triggerEvent('changing', params);
    }
  }
})