// 本文件由FirstUI授权予杨方安（手机号： 1  8  93 86  3 1 593，身份证尾号：1 8 4 9  31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options: {
    virtualHost: true
  },
  properties: {
    src: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 320
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 320
    },
    radius: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    placeholder: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: '#EEEEEE'
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    webp: {
      type: Boolean,
      value: false
    },
    marginTop: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    marginRight: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    marginBottom: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    marginLeft: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    param: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  data: {
    show: false,
    visible: false,
    elId: `fui_lazy_${Math.ceil(Math.random() * 10e5).toString(36)}`,
    observer:null
  },
  lifetimes:{
    attached:function(){
      this.setData({
        visible:this.data.placeholder ? true : false
      })
    },
    ready:function(){
      setTimeout(() => {
				this.startObserver()
			}, 50)
    },
    detached:function(){
      this.endObserver()
    }
  },
  methods: {
    handleFade() {
      setTimeout(() => {
        this.setData({
          show:true
        })
      }, 200)
      this.setData({
        visible:false
      })
      setTimeout(() => {
        this.setData({
          visible:true
        })
      }, 500)
    },
    endObserver() {
      if (this.data.observer) {
        this.data.observer.disconnect()
        this.data.observer = null;
      }
    },
    startObserver() {
      if (this.data.observer || this.data.show) return;
      try {
        const observer = wx.createIntersectionObserver(this)
        observer.relativeToViewport({
          bottom: 50
        }).observe(`#${this.data.elId}`, (res) => {
          if (res.intersectionRatio > 0 && !this.data.show) {
            this.handleFade()
            this.endObserver()
          }
        })
        this.data.observer = observer
      } catch (e) {
        this.handleFade()
        this.endObserver()
      }
    },
    handleAppear(e) {
      if (this.data.observer || this.data.show) return;
      this.handleFade()
    },
    handleError(e) {
      if (!this.data.show) return;
      this.triggerEvent('error', {
        detail: e.detail,
        param: this.data.param
      })
    },
    handleLoad(e) {
      if (!this.data.show) return;
      this.triggerEvent('load', {
        detail: e.detail,
        param: this.data.param
      })
    },
    handleTap() {
      this.triggerEvent('click', {
        param: this.data.param
      })
    }
  }
})