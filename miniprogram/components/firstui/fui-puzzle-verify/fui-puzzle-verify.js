// 本文件由FirstUI授权予闫弘宇（手机号：1 3 5 1000   1  5 5 3，身份证尾号：0 336   1 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    src: {
      type: String,
      value: '',
      observer(val){
        this.reset()
      }
    },
    cutSrc: {
      type: String,
      value: '',
      observer(val){
        this.reset()
      }
    },
    x: {
      type: String,
      optionalTypes:[Number],
      value: 10
    },
    y: {
      type: String,
      optionalTypes:[Number],
      value: 10
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 300
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 150
    },
    background: {
      type: String,
      value: '#FFFFFF'
    },
    title: {
      type: String,
      value: '安全验证'
    },
    color: {
      type: String,
      value: '#B2B2B2'
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    descrColor: {
      type: String,
      value: '#333333'
    },
    descrSize: {
      type: String,
      optionalTypes:[Number],
      value: 36
    },
    closeColor: {
      type: String,
      value: '#B2B2B2'
    },
    sliderBgColor: {
      type: String,
      value: ''
    },
    slideColor: {
      type: String,
      value: '#FFFFFF'
    },
    zIndex: {
      type: String,
      optionalTypes:[Number],
      value: 996
    },
    maskBgColor: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    maskClosable: {
      type: Boolean,
      value: false
    }
  },
  data: {
      isShow: false,
      w: 300,
      h: 150,
      sliderH: 0,
      resetNum: 0,
      isPass: false,
      disabled: false
  },
  lifetimes:{
    attached:function(){
      this.setData({
        sliderH:this.getPx(64)
      })
			this.triggerEvent('init', {
				//切割图片的宽高，固定为44px
				cutGraphWidth: 44
			})
    }
  },
  methods: {
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getPx(value) {
      let val = parseInt(this.rpx2px(Number(value)))
      return val % 2 === 0 ? val : val + 1
    },
    verify(e) {
      //验证中禁止操作
      this.setData({
        disabled:true
      })
      this.triggerEvent('verify', {
        slipDistance: e.slip
      })
    },
    success() {
      this.setData({
        isPass:true
      })
    },
    reset() {
      this.setData({
        resetNum:this.data.resetNum+1,
        isPass:false,
        disabled:false
      })
    },
    maskClose() {
      if (!this.data.maskClosable) return;
      this.closeVerify()
    },
    closeVerify() {
      this.reset();
      this.setData({
        isShow:false
      })
    },
    show() {
      this.setData({
        isShow:true
      })
    },
    stop() {}
  }
})