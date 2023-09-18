// 本文件由FirstUI授权予闫弘宇（手机号：1 35 1 0 001  55    3，身份证尾号： 03  36 1 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const elId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
const elId_box = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    height: {
      type: Number,
      optionalTypes: [String],
      value: 72
    },
    content: {
      type: String,
      value: '',
      observer(val) {
        if (!this.data.is_ready) return;
        setTimeout(() => {
          this.initAnimation()
        }, 50);
      }
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    color: {
      type: String,
      value: ''
    },
    bold: {
      type: Boolean,
      value: false
    },
    background: {
      type: String,
      value: 'rgba(255, 43, 43, .05)'
    },
    padding: {
      type: String,
      value: '0'
    },
    single: {
      type: Boolean,
      value: false
    },
    scrollable: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val && this.data.is_ready) {
          setTimeout(() => {
            this.initAnimation()
          }, 50);
        }
      }
    },
    speed: {
      type: Number,
      optionalTypes: [String],
      value: 100
    },
    activeMode: {
      type: String,
      value: 'backwards'
    },
    param: {
      type: Number,
      optionalTypes: [String],
      value: 0
    }
  },
  data: {
    elId: elId,
    elId_box: elId_box,
    noticeWidth: 0,
    boxWidth: 0,
    wrapWidth: '',
    webviewHide: false,
    animationDuration: 'none',
    animationPlayState: 'paused',
    animationDelay: '0s',
    is_ready: false
  },
  lifetimes: {
    ready: function () {
      setTimeout(() => {
        this.data.is_ready = true
        this.initAnimation()
      }, 50);
    }
  },
  methods: {
    initAnimation() {
      if (!this.data.content || this.data.content == '' || this.data.content === true) return;
      if (this.data.scrollable) {
        let query = [],
          boxWidth = 0,
          noticeWidth = 0;
        let noticeQuery = new Promise((resolve, reject) => {
          wx.createSelectorQuery()
            .in(this)
            .select(`#${this.data.elId}`)
            .boundingClientRect()
            .exec(ret => {
              this.setData({
                noticeWidth: ret[0].width
              })
              resolve()
            })
        })
        if (this.data.activeMode === 'forwards') {
          let boxQuery = new Promise((resolve, reject) => {
            wx.createSelectorQuery()
              .in(this)
              .select(`#${this.data.elId_box}`)
              .boundingClientRect()
              .exec(ret => {
                this.setData({
                  boxWidth: ret[0].width
                })
                resolve()
              })
          })
          query.push(boxQuery)
        }
        query.push(noticeQuery)
        Promise.all(query).then(() => {
          this.setData({
            animationDuration: `${this.data.noticeWidth / Number(this.data.speed)}s`
          })
          if (this.data.activeMode === 'forwards') {
            this.setData({
              animationDelay: `-${this.data.boxWidth / Number(this.data.speed)}s`
            })
          }
          setTimeout(() => {
            this.setData({
              animationPlayState: 'running'
            })
          }, 1000)
        })
      }
    },
    onClick() {
      this.triggerEvent('click', {
        param: this.data.param
      })
    },
    leftClick() {
      this.triggerEvent('leftClick', {
        param: this.data.param
      })
    },
    rightClick() {
      this.triggerEvent('rightClick', {
        param: this.data.param
      })
    }
  }
})