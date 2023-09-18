// 本文件由FirstUI授权予闫弘宇（手机号：1351   0   00 1  5 53，身份证尾号：0  33 61  2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    marginTop: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    marginBottom: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    // 是否显示滚动条
    scroll: {
      type: Boolean,
      value: true
    },
    // 滚动条区域宽度/长度
    scrollWidth: {
      type: String,
      optionalTypes:[Number],
      value: 96,
      observer(val) {
        this.setData({
          bgWidth:this.getPx(val || 96)
        })
      }
    },
    // 滚动条的宽度
    scrollBarWidth: {
      type: String,
      optionalTypes:[Number],
      value: 32,
      observer(val){
        this.setData({
          blockWidth:this.getPx(val || 32)
        })
      }
    },
    // 滚动区域/滚动条高度
    scrollHeight: {
      type: String,
      optionalTypes:[Number],
      value: 8,
      observer(val){
        this.setData({
          blockHeight: this.getPx(val || 8)
        })
      }
    },
    //滚动条两端样式，可选值为 square、round
    scrollCap: {
      type: String,
      value: 'round'
    },
    scrollBarColor: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: '#EEEEEE'
    },
    //自定义滚动条距离上方内容间距
    scrollGap: {
      type: String,
      optionalTypes:[Number],
      value: 24
    }
  },
  data: {
    width: 0,
    //滚动条背景长度
    bgWidth: 0,
    //滚动条滑块长度
    blockWidth: 0,
    blockHeight: 0
  },
  lifetimes:{
    attached:function(){
      const bgWidth = this.getPx(this.data.scrollWidth || 96)
      const blockWidth = this.getPx(this.data.scrollBarWidth || 32)
      const blockHeight = this.getPx(this.data.scrollHeight || 8)
      this.setData({
        bgWidth,
        blockWidth,
        blockHeight
      })
    },
    ready:function(){
      this.init()
    }
  },
  methods: {
    //如果初始化有误，可调用此方法重新初始化
			init() {
				setTimeout(() => {
					this._getSize()
				}, 80);
      },
      rpx2px(value){
        let sys= wx.getSystemInfoSync()
        return sys.windowWidth / 750 * value
      },
			getPx(rpx) {
				let px = Math.floor(this.rpx2px(Number(rpx)));
				px = px % 2 === 0 ? px : px + 1
				return px;
			},
			scrollEvent(edge) {
				const event = edge === 'left' ? 'scrolltoupper' : 'scrolltolower'
				this.triggerEvent(event)
			},
			_getSize() {
				wx.createSelectorQuery()
					.in(this)
					.select('.fui-horizontal__scroll')
					.boundingClientRect()
					.exec(ret => {
						if (ret) {
              this.setData({
                width:ret[0].width || 0
              })
						}
					})
			}
  }
})