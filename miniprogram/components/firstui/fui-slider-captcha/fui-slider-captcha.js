// 本文件由FirstUI授权予闫弘宇（手机号：1  3 5 1 0  001 5 5 3，身份证尾号：  0   33612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const canvasId = `fui_sc_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
    type: {
      type: String,
      optionalTypes: [Number],
      value: 1
    },
    range: {
      type: String,
      optionalTypes:[Number],
      value: 3
    },
    location: {
      type: Object,
      value:{},
      observer(obj){
        if (this.data.type == 2 && obj) {
          this.setData({
            x:obj.x || 10,
            y:obj.y || 10,
            x1:obj.x1 || 160
          })
					if ((this.data.x + this.data.y + this.data.x1) % 2 === 0) {
            this.setData({
              circle:true
            })
					} else {
            this.setData({
              circle:false
            })
					}
					this.data.src && this.handleImage()
				}
      }
    },
    src: {
      type: String,
      value: '',
      observer(val){
        if (this.data.type == 1) {
					val && this.handleImage()
				} else {
					if (this.data.location.x !== undefined && val) {
						this.handleImage()
					}
				}
      }
    },
    imageType: {
      type: String,
      optionalTypes:[Number],
      value: 1
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 640
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 320
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
    canvasId:canvasId,
    isShow: false,
    w: 320,
    h: 160,
    sliderH: 0,
    imgSrc: '',
    slotSrc: '',
    x: 0,
    y: 0,
    x1: 0,
    circle: false,
    resetNum: 0,
    isPass: false,
    disabled: false,
    times: 0
  },
  lifetimes:{
    attached:function(){
      this.setData({
        w:this.getPx(this.data.width),
        h:this.getPx(this.data.height),
        sliderH:this.getPx(64)
      },()=>{
        //后端验证时使用
        this.triggerEvent('init', {
          width: this.data.w,
          height: this.data.h,
          //切割图片的宽高，固定为44px
          cutGraphWidth: 44
        })
      })
    },
    ready:function(){
      if (this.data.type == 1) {
				this.data.src && this.handleImage()
			} else {
				if (this.data.location.x !== undefined && this.data.src) {
					this.handleImage()
				}
			}
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
    //网络图片转成本地文件（必须确保图片可以下载）
    getImage(url, callback) {
      wx.downloadFile({
        url: url,
        success: res => {
          callback && callback(res.tempFilePath)
        },
        fail: res => {
          callback && callback(false)
        }
      })
    },
    //当服务器端返回图片base64时,转成本地文件
    //微信小程序不支持直接绘制base64，其他平台可根据支持情况进行处理
    getImagebyBase64(base64, callback) {
      //使用前先查看支持平台
      const uniqueId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
      let arrayBuffer = wx.base64ToArrayBuffer(bodyData)
      //uniqueId：注意这里名称需要动态生成（名称相同部分机型会出现写入失败，显示的是上次生成的图片）
      const filePath = `${wx.env.USER_DATA_PATH}/${uniqueId}.${format}`;
      //此处可能会出现存储空间不足的情况，可清理缓存解决
      //fail the maximum size of the file storage limit is exceeded
      wx.getFileSystemManager().writeFile({
        filePath,
        data: arrayBuffer,
        encoding: 'binary',
        success() {
          callback && callback(filePath)
        },
        fail() {
          callback && callback(false)
        }
      })
    },
    toast(text) {
      wx.showToast({
        title: text,
        icon: 'none'
      })
    },
    getRandom(min, max) {
      let range = Array.from(new Array(max + 1).keys()).slice(min);
      let index = Math.floor((Math.random() * range.length));
      return range[index]
    },
    getXY() {
      this.setData({
        x:this.getRandom(20, this.data.w / 2 - 44),
        y:this.getRandom(20, this.data.h - 60),
        x1:this.getRandom(this.data.w / 2 + 44, this.data.w - 60)
      })
      if ((this.data.x + this.data.y + this.data.x1) % 2 === 0) {
        this.setData({
          circle:true
        })
      } else {
        this.setData({
          circle:false
        })
      }
    },
    darwImage(src) {
      let context = wx.createCanvasContext(this.data.canvasId, this)
      context.drawImage(src, 0, 0, this.data.w, this.data.h)
      context.draw(false, (() => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: this.data.canvasId,
            x: this.data.x1,
            y: this.data.y,
            width: 44,
            height: 44,
            success: (res) => {
              this.setData({
                slotSrc:res.tempFilePath
              })
            },
            fail: (err) => {
              this.toast('图片资源处理失败~')
            }
          }, this);
        }, 200)
      }))
    },
    handleImage() {
      this.setData({
        slotSrc:'',
        times:0
      })
      if (this.data.type == 1) {
        this.getXY()
      }
      this.reset()
      if (this.data.imageType == 1) {
        this.getImage(this.data.src, (res) => {
          if (!res) {
            this.toast('图片资源处理失败~')
          } else {
            this.setData({
              imgSrc:res
            })
            this.darwImage(res)
          }
        })
      } else if (this.data.imageType == 2) {
        this.getImagebyBase64(this.data.src, (res) => {
          if (!res) {
            this.toast('图片资源处理失败~')
          } else {
            this.setData({
              imgSrc:res
            })
            this.darwImage(res)
          }
        })

      } else {
        this.setData({
          imgSrc:this.data.src
        })
        this.darwImage(this.data.src)
      }
    },
    reset() {
      this.setData({
        resetNum:this.data.resetNum+1,
        isPass:false,
        disabled: false
      })
    },
    verify(e) {
      //验证中禁止操作
      this.setData({
        disabled:true
      })
      this.triggerEvent('verify', {
        x: this.data.x,
        x1: this.data.x1,
        slipDistance: e.slip
      })
    },
    success() {
      this.setData({
        isPass:true
      })
      if (this.data.type == 1) {
        this.triggerEvent('success', {})
      }
    },
    fail() {
      if (this.data.type == 1) {
        this.data.times += 1;
        this.triggerEvent('fail', {
          times: this.data.times
        })
      }
      this.reset()
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
    show(refresh) {
      if (refresh) {
        if (this.data.type == 1) {
          this.data.src && this.handleImage()
        } else {
          if (this.data.location.x !== undefined && this.data.src) {
            this.handleImage()
          }
        }
      }
      this.setData({
        isShow:true
      })
    },
    stop() {}
  }
})