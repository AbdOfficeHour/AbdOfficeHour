// 本文件由FirstUI授权予杨方安（手机号：18 9   3 863 1 5 9  3，身份证尾号： 184   93 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    items: {
      type: Array,
      value: []
    },
    type: {
      type: String,
      optionalTypes: [Number],
      value: 1
    },
    current: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    styles: {
      type: Object,
      value: {},
      observer(val) {
        this.setData({
          dots: Object.assign(this.data.dots, this.data.styles)
        })
        this.initStyles()
      }
    },
    field: {
      type: String,
      value: ''
    }
  },
  data: {
    dots: {
      left: 0,
      right: 0,
      bottom: 32,
      width: 16,
      activeWidth: 16,
      height: 16,
      radius: true,
      background: 'rgba(0,0,0,.6)',
      activeBackground: '',
      color: '#fff',
      activeColor: '#fff',
      size: 28,
      margin: 8,
      padding: 32
    },
    width: 0,
    activeWidth: 0,
    height: 0,
    radius: 0
  },
  lifetimes: {
    attached: function () {
      this.setData({
        dots: Object.assign(this.data.dots, this.data.styles)
      })
      this.initStyles()
    }
  },
  methods: {
    getPx(val, radius) {
      let res = 0;
      if (val && radius) {
        let sys = wx.getSystemInfoSync()
        res = Math.floor(sys.windowWidth / 750 * val)
        res = res % 2 === 0 ? res : res + 1
      }
      return res + 'px'
    },
    initStyles() {
      //处理圆角变形
      this.setData({
        width: this.getPx(this.data.dots.width, true),
        activeWidth: this.getPx(this.data.dots.activeWidth, true),
        height: this.getPx(this.data.dots.height, true),
        radius: this.getPx(this.data.dots.width, this.data.dots.radius)
      })
    },
    itemClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index: index
      })
    }
  }
})