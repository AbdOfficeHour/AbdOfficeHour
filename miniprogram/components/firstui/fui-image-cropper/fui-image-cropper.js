// 本文件由FirstUI授权予闫弘宇（手机号： 1      351 00015 5 3，身份证尾号：  0  3361 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    src: {
      type: String,
      value: '',
      observer(val){
        this.data.initVal && this.handleImage(val)
      }
    },
    //裁剪框高度 px
    height: {
      type: String,
      optionalTypes:[Number],
      value: 280,
      observer(val){
        this.setData({
          nHeight: Number(val) || 280
        })
      }
    },
    //裁剪框宽度 px
    width: {
      type: String,
      optionalTypes:[Number],
      value: 280,
      observer(val){
        this.setData({
          nWidth: Number(val) || 280
        })
      }
    },
    //是否为圆形裁剪框
    round: {
      type: Boolean,
      value: false
    },
    borderColor: {
      type: String,
      value: '#B2B2B2'
    },
    scaleRatio: {
      type: String,
      optionalTypes:[Number],
      value: 2,
      observer(val){
        this.setData({
          nScaleRatio: Number(val) || 2
        })
      }
    },
    //图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
    quality: {
      type: Number,
      value: 0.8
    },
    fileType: {
      type: String,
      value: 'png'
    },
    //是否为网络图片
    network: {
      type: Boolean,
      value: false
    }

  },
  observers:{
    'ani': function (val) {
      clearTimeout(this.data.aniTimer);
      if (val) {
        this.data.aniTimer = setTimeout(() => {
          this.setData({
            ani:false
          })
        }, 220);
      }
    }
  },
  data: {
    windowHeight: 600,
    windowWidth: 400,
    cutX: 0,
    cutY: 0,
    imgWidth: 0,
    imgHeight: 0,
    scale: 1,
    angle: 0,
    ani: false,
    imgTop: 0,
    imgLeft: 0,
    changeval: '',
    initVal: false,
    picturePath: '',
    rotateAngle: 0,
    cutTimer:null,
    aniTimer:null,
    ctx:null,
    nScaleRatio: 2,
    nWidth: 280,
    nHeight: 280
  },
  lifetimes:{
    attached:function(){
        this.setData({
          nScaleRatio: Number(this.data.scaleRatio) || 2,
          nWidth: Number(this.data.width) || 280,
          nHeight: Number(this.data.height) || 280
        })
    },
     ready:function(){
        let sys = wx.getSystemInfoSync();
        this.data.ctx = wx.createCanvasContext('fui_image_cropper', this);
        this.setData({
          windowHeight:sys.windowHeight,
          windowWidth:sys.windowWidth,
          imgTop:sys.windowHeight / 2,
          imgLeft:sys.windowWidth / 2
        },()=>{
          setTimeout(() => {
            this.setData({
              changeval:`1_${this.getRandom()}`,
              initVal:true
            },()=>{
               setTimeout(() => {
                this.data.src && this.handleImage(this.data.src)
               }, 20);
            })
          }, 220);
        })
     }
  },
  methods: {
    stop() {},
			getRandom() {
				return Math.ceil(Math.random() * 10e5).toString(36)
			},
			loading() {
				wx.showLoading({
					mask: true,
					title: '请稍候...'
				});
			},
			reset() {
        let sys = wx.getSystemInfoSync();
        this.setData({
          scale:1,
          angle:0,
          imgTop:sys.windowHeight / 2,
          imgLeft:sys.windowWidth / 2,
          changeval:`4_${this.getRandom()}`
        })
			},
			calcSize(width, height) {
				let imgWidth = width,
					imgHeight = height;
				if (imgWidth > 0 && imgHeight > 0) {
					if (imgWidth / imgHeight > this.data.nWidth / this.data.nHeight) {
						imgHeight = this.data.nHeight;
						imgWidth = (width / height) * imgHeight;
					} else {
						imgWidth = this.data.nWidth;
						imgHeight = (height / width) * imgWidth;
					}
				} else {
					imgWidth = wx.getSystemInfoSync().windowWidth;
					imgHeight = 0;
        }
        this.setData({
          imgWidth:imgWidth,
          imgHeight:imgHeight,
          changeval:`2_${this.getRandom()}`
        })
				wx.hideLoading()
			},
			handleImage(src) {
				this.reset();
				this.loading();
				wx.getImageInfo({
					src: src,
					success: res => {
						let width = res.width;
            let height = res.height;
						let orientation = res.orientation;
						if (orientation && orientation != 'up') {
							//宽高传值颠倒
							width = orientation == 'down' ? res.width : res.height;
							height = orientation == 'down' ? res.height : res.width;
						}
						this.calcSize(width, height);
            this.setData({
              changeval:`3_${this.getRandom()}`
            })
					},
					fail: err => {
            this.calcSize(0, 0);
            this.setData({
              changeval:`3_${this.getRandom()}`
            })
					}
				});
			},
			change(e) {
        this.setData({
          cutX:e.cutX || 0,
          cutY:e.cutY || 0,
          imgWidth:e.imgWidth || this.data.imgWidth,
          imgHeight:e.imgHeight || this.data.imgHeight,
          scale:e.scale || 1,
          angle:e.angle || 0,
          imgTop:e.imgTop || 0,
          imgLeft:e.imgLeft || 0
        })
			},
			async getLocalImage(src) {
				return await new Promise((resolve, reject) => {
					wx.downloadFile({
						url: src,
						success: res => {
							resolve(res.tempFilePath);
						},
						fail: res => {
							reject(false);
						}
					});
				});
			},
			moveStop() {
				clearTimeout(this.data.cutTimer);
				this.data.cutTimer = setTimeout(() => {
          this.setData({
            changeval:`5_${this.getRandom()}`
          })
				}, 600);
			},
			moveDuring() {
				clearTimeout(this.data.cutTimer);
			},
			rotate() {
				if (!this.data.src) {
					this.toast('请选择要裁剪的图片！')
					return;
        }
        this.setData({
          ani:true
        })
				let angle = this.data.angle + 90;
				if (angle % 90) {
					angle = Math.round(angle / 90) * 90;
				}
        this.setData({
          angle:angle,
          changeval:`3_${this.getRandom()}`
        },()=>{
          this.moveStop();
        })
			},
			toast(text) {
				wx.showToast({
					title: text,
					icon: 'none'
				});
			},
			//裁剪
			cutting(callback) {
				if (!this.data.src) {
					this.toast('请选择要裁剪的图片！')
					return;
				}
				this.loading();
				let draw = async () => {
					let imgWidth = this.data.imgWidth * this.data.scale * this.data.nScaleRatio;
					let imgHeight = this.data.imgHeight * this.data.scale * this.data.nScaleRatio;
					let xpos = this.data.imgLeft - this.data.cutX;
					let ypos = this.data.imgTop - this.data.cutY;
					this.data.ctx.translate(xpos * this.data.nScaleRatio, ypos * this.data.nScaleRatio);
					this.data.ctx.rotate((this.data.angle * Math.PI) / 180);
					let src = this.data.src;
					if (this.network) {
						src = await this.getLocalImage(src);
					}
					this.data.ctx.drawImage(src, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
					this.data.ctx.draw(false, () => {
						let params = {
							width: this.data.nWidth * this.data.nScaleRatio,
							height: Math.round(this.data.nHeight * this.data.nScaleRatio),
							destWidth: this.data.nWidth * this.data.nScaleRatio,
							destHeight: Math.round(this.data.nHeight) * this.data.nScaleRatio,
							fileType: this.data.fileType,
							quality: this.data.quality
						};
						setTimeout(() => {
							wx.canvasToTempFilePath({
									...params,
									canvasId: 'fui_image_cropper',
									success: res => {
										wx.hideLoading();
										callback && callback(res.tempFilePath)
									},
									fail(err) {
										console.log(err);
									}
								}, this);
						}, 80)
					});
				};
				draw();
			}
  }
})