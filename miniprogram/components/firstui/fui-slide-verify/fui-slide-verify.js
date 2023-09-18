// 本文件由FirstUI授权予闫弘宇（手机号：  13510  001  5    53，身份证尾号： 03 36  1 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    range: {
      type: String,
      optionalTypes:[Number],
      value: 3
    },
    error: {
      type: String,
      optionalTypes:[Number],
      value: 3
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 640,
      observer(val){
        this.setData({
          totalWidth:this.getPx(val)
        })
      }
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 80
    },
    background: {
      type: String,
      value: "#EEEEEE"
    },
    activeBgColor: {
      type: String,
      value: ""
    },
    sliderWidth: {
      type: String,
      optionalTypes:[Number],
      value: 80,
      observer(val){
        this.setData({
          sliderW:this.getPx(val)
        })
      }
    },
    sliderBgColor: {
      type: String,
      value: "#FFFFFF"
    },
    borderColor: {
      type: String,
      value: '#EEEEEE'
    },
    passColor: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    color: {
      type: String,
      value: "#333333"
    },
    activeColor: {
      type: String,
      value: "#FFFFFF"
    },
    iconSize: {
      type: String,
      optionalTypes:[Number],
      value: 48
    },
    arrowColor: {
      type: String,
      value: "#B2B2B2"
    },
    lineColor: {
      type: String,
      value: "#B2B2B2"
    }
  },
  data: {
    totalWidth: 0,
    targetWidth: 0,
    sliderW: 0,
    isPass: false,
    resetNum: 0,
    times: 0
  },
  lifetimes:{
    attached:function(){
      this.setData({
        totalWidth:this.getPx(this.data.width),
        sliderW:this.getPx(this.data.sliderWidth),
      },()=>{
        this.changeTargetPosi()
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
    changeTargetPosi() {
      let range = Array.from(new Array(100 + 1).keys()).slice(50);
      let index = Math.floor((Math.random() * range.length));
      let width = this.rpx2px(parseInt((this.data.width * (range[index] || 100)) / 100))
      width = width <= this.data.sliderW ? this.data.sliderW + 20 : width
      this.setData({
        targetWidth:parseInt(width)
      })
    },
    reset() {
      this.setData({
        resetNum:this.data.resetNum+1,
        isPass:false,
        times: 0
      },()=>{
        this.changeTargetPosi()
      })
    },
    success() {
      this.setData({
        isPass:true
      })
      this.triggerEvent('success', {})
    },
    fail() {
      this.data.times++;
      if (this.data.times >= Number(this.data.error)) {
        this.changeTargetPosi()
        this.data.times = 0
      }
      this.triggerEvent('fail', {})
    }
  }
})