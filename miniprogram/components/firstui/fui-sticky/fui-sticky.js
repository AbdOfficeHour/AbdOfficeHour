// 本文件由FirstUI授权予闫弘宇（手机号：13   5  10 00 1  55 3，身份证尾号：   0  33612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const elId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  options: {
    virtualHost: true,
    multipleSlots: true
  },
  properties: {
    top: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    range: {
      type: Boolean,
      value: false
    },
    scrollTop: {
      type: Number,
      value: 0,
      observer(val) {
        this.updateStickyChange();
      }
    },
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 999
    },
    param: {
      type: Number,
      optionalTypes: [String],
      value: 0
    }
  },
  data: {
    elId: elId,
    timer: null,
    elTop: 0,
    height: 0,
    isFixed: false
  },
  lifetimes: {
    ready: function () {
      setTimeout(() => {
        this.init(() => {
          this.updateStickyChange();
        });
      }, 50)
    }
  },
  methods: {
    updateStickyChange() {
      const et = this.data.elTop;
      const h = this.data.height;
      const st = this.data.scrollTop
      const t = this.data.top
      if (this.data.range) {
        this.data.isFixed = (st + t >= et && st + t < et + h) ? true : false
      } else {
        this.data.isFixed = st + t >= et ? true : false
      }
      //是否吸顶
      this.triggerEvent("sticky", {
        isFixed: this.data.isFixed,
        param: this.data.param
      })
    },
    init(callback) {
      const elId = `#${this.data.elId}`;
      wx.createSelectorQuery()
        .in(this)
        .select(elId)
        .fields({
          size: true,
          rect: true
        }, res => {
          if (res) {
            this.data.elTop = res.top + (this.data.scrollTop || 0);
            this.data.height = res.height;
            callback && callback()
          }
        }).exec()
    }
  }
})