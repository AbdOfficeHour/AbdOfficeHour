// 本文件由FirstUI授权予杨方安（手机号： 1893 86 3 1   5   93，身份证尾号： 18  4  931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    max: {
      type: Number,
      optionalTypes: [String],
      value: 5,
      observer(val){
        this.initData(val)
      }
    },
    score: {
      type: Number,
      optionalTypes: [String],
      value: 0,
      observer(val){
        this.initRateScore(val)
      }
    },
    color: {
      type: String,
      value: "#CCCCCC"
    },
    activeColor: {
      type: String,
      value: "#FFB703"
    },
    disabled: {
      type: Boolean,
      value: false
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 56
    },
    spacing: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    allowHalf: {
      type: Boolean,
      value: false
    },
    halfRate: {
      type: Number,
      optionalTypes: [String],
      value: 0.2
    },
    touchable: {
      type: Boolean,
      value: true
    },
    param: {
      type: Number,
      optionalTypes: [String],
      value: 0
    }
  },
  data: {
    stars: [],
    pageX: 0,
    intScore: 0,
    decimalScore: 0,
    isPC: false,
    rated: false
  },
  lifetimes: {
    attached:function(){
      this.initData(this.data.max)
			this.initRateScore(this.data.score)
    },
    ready: function () {
      setTimeout(() => {
        this._getSize()
      }, 100)
    }
  },
  methods: {
    initData(vals) {
      vals = Number(vals)
      if (vals === NaN) {
        vals = 5
      }
      vals = Math.ceil(vals)
      this.setData({
        stars: Array.from(new Array(vals + 1).keys()).slice(1)
      })
    },
    initRateScore(val) {
      val = Number(val);
      let intVal = parseInt(val);
      let decimalVal = val % 1;
      if (!this.data.allowHalf) {
        intVal = decimalVal > 0 ? intVal + 1 : intVal;
        decimalVal = 0;
      }
      this.setData({
        intScore: intVal,
        decimalScore: decimalVal
      })
    },
    _getSize() {
      wx.createSelectorQuery()
        .in(this)
        .select('.fui-rate__wrap')
        .boundingClientRect()
        .exec(ret => {
          if (ret) {
            this.setData({
              pageX: ret[0].left || 0
            })
          }
        })
    },
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    _getRateScore(clientX) {
      const distance = clientX - this.data.pageX;
      let score = 0;
      if (distance > 0) {
        let width = this.rpx2px((Number(this.data.size) + Number(this.data.spacing)));
        score = distance / width;
        let decimalScore = score % 1;
        if (!this.data.allowHalf) {
          decimalScore = decimalScore > 0 ? 1 : 0;
        } else {
          if (decimalScore > Number(this.data.halfRate)) {
            decimalScore = decimalScore <= 0.5 ? 0.5 : 1;
          } else {
            decimalScore = 0;
          }
        }
        score = parseInt(score) + decimalScore;
        let max = Number(this.data.max)
        score = score > max ? max : score;
      }
      this.initRateScore(score)
      this.triggerEvent('change', {
        score: score,
        param: this.data.param
      });
    },
    touchstart(e) {
      if (this.data.disabled) return
      const {
        clientX
      } = e.changedTouches[0]
      this._getRateScore(clientX)
    },
    touchmove(e) {
      if (this.data.disabled || !this.data.touchable) return
      const {
        clientX,
        screenX
      } = e.changedTouches[0]
      this._getRateScore(clientX || screenX)
    }
  }
})