// 本文件由FirstUI授权予闫弘宇（手机号：13  51   00 0 15  5 3，身份证尾号：03   36  12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options: {
    virtualHost: true,
    multipleSlots: true
  },
  properties: {
    background: {
      type: String,
      value: '#FFFFFF'
    },
    radius: {
      type: String,
      optionalTypes:[Number],
      value: 16
    },
    src: {
      type: String,
      value: ''
    },
    imgWidth: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //V1.9.8+ 设置图片高度，则不再等图片加载完成后再去渲染
    imgHeight: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    webp: {
      type: Boolean,
      value: false
    },
    draggable: {
      type: Boolean,
      value: true
    },
    param: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  relations: {
    '../fui-waterfall/fui-waterfall': {
      type: 'ancestor',
      linked: function (target) {
        this.data.waterfall = target
        this.init()
      }
    }
  },
  lifetimes:{
    attached:function(){
        if(this.data.src){
          this.setData({
            isSrc: true
          })
        }
    },
    ready:function(){
      if (!this.data.src || this.data.imgHeight != 0) {
        setTimeout(()=>{
          this.getWaterfallItemInfo()
        }, 50)
			}
    }
  },
  data: {
    elId: `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`,
    width: 0,
    height: 0,
    transform: '',
    isShow: false,
    isLoaded: true,
    isSrc: false,
    waterfall:null
  },
  methods: {
    init(){
      let waterfall = this.data.waterfall
      if (waterfall) {
				waterfall.data.childrenArr.push(this)
				if (waterfall.data.itemWidth) {
          this.setData({
            width:waterfall.data.itemWidth
          })
				} else {
					waterfall.initParam((width) => {
            this.setData({
              width:width
            })
					})
				}
      }
    },
    getWaterfallItemInfo() {
      this.getItemHeight((res) => {
        let waterfall=this.data.waterfall
        if (waterfall) {
          waterfall.data.loadedArr.push('ok')
          if(waterfall.data.childrenArr.length===waterfall.data.loadedArr.length){
            waterfall.startSorting()
          }
        }
      })
    },
    getItemHeight(callback, index = 0) {
      wx.createSelectorQuery()
        .in(this)
        .select(`#${this.data.elId}`)
        .fields({
          size: true
        }, data => {
          if (index >= 20) return
          if (data && data.height) {
            this.setData({
              height:data.height
            })
            callback && callback(data.height)
          } else {
            index++
            setTimeout(() => {
              this.getItemHeight(index)
            }, 50)
            return
          }
        })
        .exec()
    },
    handleLoad(e) {
      if (this.data.imgHeight != 0) return;
      setTimeout(() => {
        this.getWaterfallItemInfo()
      }, 50)
    },
    handleError(e) {
      this.setData({
        isLoaded:false
      },()=>{
        if (this.data.imgHeight != 0) return;
        this.getWaterfallItemInfo()
      })
    },
    handleTap() {
      this.triggerEvent('click', {
        param: this.data.param
      })
    }
  }
})