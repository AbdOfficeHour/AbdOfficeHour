// 本文件由FirstUI授权予闫弘宇（手机号：13 510  0 0  15    53，身份证尾号： 0 3 3 6 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    columnGap: {
      type: String,
      optionalTypes:[Number],
      value: 24
    },
    topGap: {
      type: String,
      optionalTypes:[Number],
      value: 24
    },
    leftGap: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    rightGap: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  relations: {
    '../fui-waterfall-item/fui-waterfall-item': {
      type: 'descendant'
    }
  },
  data: {
    height: 0,
    itemWidth: 0,
    leftHeight: 0,
    rightHeight: 0,
    tGap: 0,
    lGap: 0,
    x2: 0,
    childrenArr:[],
    loadedArr:[]
  },
  lifetimes:{
    attached:function(){
      this.initParam()
    },
    detached:function(){
      this.data.childrenArr = null
			this.data.loadedArr = null
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
    initParam(callback) {
      const lGap = this.getPx(this.data.leftGap)
      const colGap = this.getPx(this.data.columnGap)
      const rGap = this.getPx(this.data.rightGap)
      const gap = colGap + lGap + rGap;
      const sys = wx.getSystemInfoSync()
      const itemWidth=(sys.windowWidth - gap) / 2
      this.setData({
        tGap:this.getPx(this.data.topGap),
        lGap:lGap,
        itemWidth:itemWidth,
        x2: lGap + itemWidth + colGap
      },()=>{
        callback && callback(itemWidth)
        this.triggerEvent('init', {
          itemWidth: itemWidth
        })
      })
    },
    //重置加载
    resetLoadmore() {
      this.setData({
        leftHeight:0,
        rightHeight:0,
        height:0,
        childrenArr:[],
        loadedArr:[]
      })
    },
    getWaterfallInfo(itemHeight, callback) {
      if (!itemHeight) return;
      let x = this.data.lGap;
      let y = 0;
      let itemGap = 0;
      if (this.data.leftHeight <= this.data.rightHeight) {
        y = this.data.leftHeight;

        if (this.data.leftHeight === 0) {
          this.data.leftHeight += itemHeight;
        } else {
          itemGap = this.data.tGap;
          y += this.data.tGap;
          this.data.leftHeight += itemHeight + this.data.tGap;
        }
      } else {
        x = this.data.x2;
        y = this.data.rightHeight;

        if (this.data.rightHeight === 0) {
          this.data.rightHeight += itemHeight;
        } else {
          itemGap = this.data.tGap;
          y += this.data.tGap;
          this.data.rightHeight += itemHeight + this.data.tGap;
        }
      }
      callback && callback({
        x,
        y,
        itemGap
      })
    },
    setWaterfallHeight(itemGap) {
      this.setData({
        height:Math.ceil(Math.max(this.data.leftHeight, this.data.rightHeight) + itemGap)
      })
    },
    startSorting() {
      let clen = this.data.childrenArr.length
      let llen = this.data.loadedArr.length
      if (clen === llen && llen > 0) {
        let itemGap = 0
        this.data.childrenArr.forEach((item, index) => {
          this.getWaterfallInfo(item.data.height, (res) => {
            itemGap = res.itemGap
            item.setData({
              transform:`translate3d(${res.x}px,${res.y}px,0)`
            },()=>{
              setTimeout(() => {
                item.setData({
                  isShow:true
                })
              }, 20)
            })
          })
        })
        this.setWaterfallHeight(itemGap)
        this.data.childrenArr = []
        this.data.loadedArr = []
        this.triggerEvent('end', {})
      }
    }
  }
})