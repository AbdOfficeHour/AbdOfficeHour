// 本文件由FirstUI授权予闫弘宇（手机号：1 3 5 1 00     0 1553，身份证尾号：  0 33 6 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    //验证弹层外层盒子宽度 rpx
			width: {
        type: String,
        optionalTypes:[Number],
        value: 600,
        observer(val){
          this.setData({
            sliderWidth:this.getPx((Number(val) - 64))
          })
        }
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
				value: 32
			},
			//图片地址（旋转了初始角度后的图片），必传
			//旋转角度建议区间为 -330deg<angle <-30deg 或 30deg<angle<330deg
			src: {
				type: String,
				value: ''
			},
			//图片宽度，单位rpx。默认为正方形图片
			imgWidth: {
        type: String,
        optionalTypes:[Number],
        value: 240,
        observer(val){
          this.setData({
            imgW:this.getPx(val)
          })
        }
			},
			//滑动条和滑块边框颜色
			borderColor: {
				type: String,
				value: '#EEEEEE'
			},
			sliderBgColor: {
				type: String,
				value: '#FFFFFF'
			},
			closeColor: {
				type: String,
				value: '#B2B2B2'
			},
			slideColor: {
				type: String,
				value: '#333333'
			},
			passColor: {
				type: String,
				value: '#09BE4F'
			},
			failColor: {
				type: String,
				value: '#FF2B2B'
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
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				value: false
			}
  },
  data: {
    isShow: false,
    isPass: false,
    disabled: false,
    showRes: false,
    sliderHeight: 0,
    imgW: 0,
    sliderWidth: 0,
    resetNum: 0
  },
  lifetimes:{
    attached:function(){
      this.setData({
        sliderWidth:this.getPx((Number(this.data.width) - 64)),
        sliderHeight:this.getPx(92),
        imgW:this.getPx(this.data.imgWidth)
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
    success() {
      this.setData({
        isPass:true
      })
    },
    fail() {
      this.setData({
        showRes:true,
        isPass:false
      })
      setTimeout(() => {
        this.reset()
      }, 300)
    },
    verify(e) {
      //Math.abs(angle + initAngle - 360) <= range || Math.abs(angle + initAngle) <= range
      //验证中禁止操作
      this.setData({
        disabled:true
      })
      this.triggerEvent('verify', e)
    },
    /*
     验证结果，前端验证时使用
    @param {Number} angle 旋转角度
    @param {Number} initAngle 初始化时旋转角度
    @param {Number} range 可误差角度范围
    @param {function} callback 回调函数 返回参数=>是否通过验证(bool)
    */
    verifyRes(angle, initAngle, range, callback) {
      let res = false
      if (Math.abs(angle + initAngle - 360) <= range || Math.abs(angle + initAngle) <= range) {
        res = true
      }
      callback && callback(res)
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
    reset() {
      this.setData({
        resetNum:this.data.resetNum+1,
        isPass:false,
        disabled:false,
        showRes:false
      })
    },
    stop() {}
  }
})