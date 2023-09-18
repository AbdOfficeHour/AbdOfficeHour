// 本文件由FirstUI授权予杨方安（手机号：1   893 8631  5   9 3，身份证尾号：184   9  31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    urls: {
      type: Array,
      value: [],
      observer(val) {
        this.initData(val)
      }
    },
    show: {
      type: Boolean,
      value: false
    },
    current: {
      type: Number,
      optionalTypes: [String],
      value: 0,
      observer(val) {
        this.setData({
          defActive: this.data.active
        }, () => {
          let val = Number(val)
          this.setData({
            defActive: val,
            active: val
          })
        })
      }
    },
    //文字超出是否省略成一行
    ellipsis: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 1001
    }
  },
  data: {
    imgUrls: [],
    active: 0,
    defActive: 0,
    top: 20,
    descr: ''
  },
  lifetimes: {
    ready: function () {
      let sys = wx.getSystemInfoSync()
      this.setData({
        top:sys.statusBarHeight + 20,
        defActive:Number(this.data.current),
        active:Number(this.data.current)
      },()=>{
        this.initData(this.data.urls)
        this.getDescr(this.data.active)
      })
    }
  },
  methods: {
    initData(vals) {
      if (vals && vals.length > 0) {
        if (typeof vals[0] === 'string') {
          vals = vals.map(item => {
            return {
              src: item
            }
          })
        }
        this.setData({
          imgUrls: vals
        })
      }
    },
    change(e) {
      this.setData({
        active: e.detail.current
      })
      this.getDescr(this.data.active)
      this.triggerEvent('change', {
        index: this.data.active
      });
    },
    getDescr(index) {
      let item = this.data.imgUrls[index]
      if (item) {
        this.setData({
          descr: item.descr || ''
        })
      }
    },
    hideGallery() {
      this.triggerEvent('hide', {});
    }
  }
})