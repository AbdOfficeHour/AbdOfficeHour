// 本文件由FirstUI授权予杨方安（手机号：189    38 6  3 1  593，身份证尾号： 18   49 31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    fabs: {
      type: Array,
      value: []
    },
    position: {
      type: String,
      value: 'right'
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
    }
  },
  data: {
    isShow: false,
    isHidden: true,
    timer: null
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
    }
  },
  methods: {
    stop() {},
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