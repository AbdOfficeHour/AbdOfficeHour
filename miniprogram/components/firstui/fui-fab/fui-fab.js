// 本文件由FirstUI授权予闫弘宇（手机号：1  3    5  1000155  3，身份证尾号：0  3 361  2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    fabs: {
      type: Array,
      value: []
    },
    position: {
      type: String,
      value: 'right',
      observer(val){
        this.setData({
          resetNum: this.data.resetNum + 1
        })
        setTimeout(() => {
          this._getSize()
        }, 100);
      }
    },
    distance: {
      type: Number,
      optionalTypes: [String],
      value: 80
    },
    bottom: {
      type: Number,
      optionalTypes: [String],
      value: 120
    },
    width: {
      type: Number,
      optionalTypes: [String],
      value: 108
    },
    background: {
      type: String,
      value: ""
    },
    color: {
      type: String,
      value: "#fff"
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskBackground: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    maskClosable: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 99
    },
    custom: {
      type: Boolean,
      value: false
    },
    //V1.9.8+
    isDrag: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isShow: false,
    isHidden: true,
    timer: null,
    maxWidth: 0,
    maxHeight: 0,
    eLeft: 0,
    eTop: 0,
    resetNum: 0
  },
  observers: {
    'isShow': function (val) {
      this.triggerEvent("change", {
        isShow: val
      })
    }
  },
  lifetimes: {
    detached: function () {
      clearTimeout(this.data.timer)
      this.data.timer = null
    },
    ready:function(){
      setTimeout(() => {
        this._getSize()
      }, 100);
    }
  },
  methods: {
    stop() {},
    _getSize() {
      if (!this.data.isDrag) return;
      const sys = wx.getSystemInfoSync()
      wx.createSelectorQuery()
        .in(this)
        .select('.fui-fab__btn-wrap')
        .boundingClientRect()
        .exec(ret => {
          if (ret) {
            const maxWidth = sys.windowWidth - ret[0].width - ret[0].left;
            const maxHeight = sys.windowHeight - ret[0].height - ret[0].top;
            const eLeft = ret[0].left || 0;
            const eTop = ret[0].top || 0;
            this.setData({
              maxWidth,
              maxHeight,
              eLeft,
              eTop
            })
          }
        })
    },
    handleClick: function (e) {
      let index = Number(e.currentTarget.dataset.index)
      this.setData({
        isHidden: false
      }, () => {
        clearTimeout(this.data.timer)
        if (index === -1 && this.data.fabs.length > 0) {
          this.setData({
            isShow: !this.data.isShow
          })
        } else {
          this.triggerEvent("click", {
            index: index
          })
          this.setData({
            isShow: false
          })
        }
        if (!this.data.isShow) {
          this.data.timer = setTimeout(() => {
            this.setData({
              isHidden: true
            })
          }, 250)
        }
      })
    },
    maskClick(e) {
      if (!this.data.maskClosable) return;
      this.setData({
        isShow: false
      })
      this.data.timer = setTimeout(() => {
        this.setData({
          isHidden: true
        })
      }, 250)
    }
  }
})