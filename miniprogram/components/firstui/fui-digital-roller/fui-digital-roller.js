// 本文件由FirstUI授权予杨方安（手机号： 1893 863   1 5  9  3，身份证尾号： 184   9 31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    value: {
      type: String,
      optionalTypes: [Number],
      value: '',
      observer(val) {
        this.initColumn(val)
      }
    },
    color: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 32
    },
    fontWeight: {
      type: String,
      optionalTypes: [Number],
      value: 400
    },
    width: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 32,
      observer(val) {
        this.initHeight(val)
      }
    },
    duration: {
      type: String,
      optionalTypes: [Number],
      value: 1.2
    }
  },
  data: {
    columns: [],
    keys: [],
    rollHeight: 0,
    rows: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  },
  lifetimes: {
    attached: function () {
      this.initHeight(this.data.height)
      this.initColumn(this.data.value)
    }
  },
  methods: {
    initHeight(val) {
      let sys = wx.getSystemInfoSync()
      let height = Math.floor(sys.windowWidth / 750 * (val || 0))
      height = height % 2 === 0 ? height : height + 1
      this.setData({
        rollHeight: height
      })
    },
    initColumn(val) {
      val = val + '';
      let vals = val.split('');
      let digit = vals.length,
        arr = [];
      for (let i = 0; i < digit; i++) {
        if (~this.data.rows.indexOf(vals[i])) {
          arr.push(this.data.rows)
        } else {
          arr.push([vals[i]])
        }
      }
      this.setData({
        columns: arr
      })
      this.startRoll(vals)
    },
    startRoll(vals) {
      let lengths = this.data.columns.length,
        indexs = [];

      while (vals.length) {
        let num = vals.pop();
        if (~this.data.rows.indexOf(num)) {
          indexs.unshift(Number(num))
        } else {
          indexs.unshift(0)
        }
      }
      while (indexs.length < lengths) {
        indexs.unshift(0)
      }
      this.setData({
        keys: indexs
      })
    }
  }
})