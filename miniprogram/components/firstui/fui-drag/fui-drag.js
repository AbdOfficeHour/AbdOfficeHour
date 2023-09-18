// 本文件由FirstUI授权予闫弘宇（手机号：    135 1 00 0 1  553，身份证尾号：033 6 1   2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const elId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
    itemList: {
      type: Array,
      value:[],
      observer(val){
        this.reset()
      }
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 0,
      observer(val){
        this.reset()
      }
    },
    // 每行显示个数
    columns: {
      type: String,
      optionalTypes:[Number],
      value: 1,
      observer(val){
        this.reset()
      }
    },
    //必传（square为true时失效）
    itemHeight: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    // 是否正方形显示，为true时itemHeight失效
    square: {
      type: Boolean,
      value: false
    },
    // 页面滚动高度
    scrollTop: {
      type: Number,
      value: 0
    },
    //是否可拖拽
    isDrag: {
      type: Boolean,
      value: true
    },
    //是否可删除，显示删除图标
    isDel:{
      type: Boolean,
      value: false
    }
  },
  data: {
    elId:elId,
    param: {},
    windowHeight: 0,
    wrapWidth: 0,
    wrapHeight: 0,
    cellWidth: 0,
    cellHeight: 0,
    changeList: [],
    rows: 3,
    options: [],
    dragging: true,
    wrapTop: 0,
    wrapLeft: 0,
    list: [],
    wxDrag: true
  },
  lifetimes:{
    ready:function(){
      setTimeout(() => {
        this.reset();
      }, 50);
    }
  },
  methods: {
    getId() {
      return `${Math.ceil(Math.random() * 10e5).toString(36)}_${new Date().getTime()}`
    },
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getWidth(fn) {
      let width = Number(this.data.width)
      let sys = wx.getSystemInfoSync()
      if (width === 0) {
        width = sys.windowWidth
      } else {
        width = this.rpx2px(width)
      }
      //此处小数会导致出现误差
      let cellWidth = width / Number(this.data.columns)
      let cellHeight = this.rpx2px(this.data.itemHeight)
      if (this.data.square) {
        cellHeight = cellWidth
      }
      this.setData({
        windowHeight:sys.windowHeight,
        wrapWidth:width,
        cellWidth:cellWidth,
        cellHeight:cellHeight
      },()=>{
        fn && fn()
      })
    },
    reset() {
      this.setData({
        options:[],
        wxDrag:true,
        dragging:false
      })
      this.getWidth(() => {
        setTimeout(() => {
          this.init()
        }, 0);
      })
    },
    getDom(callback, index = 0) {
      wx.createSelectorQuery()
        .in(this)
        .select(`#${this.data.elId}`)
        .boundingClientRect()
        .exec(ret => {
          if (index >= 10) return
          if (!ret && !ret[0]) {
            index++
            this.getDom(callback, index)
            return
          }
          let wrapTop = ret[0].top + this.data.scrollTop;
          let wrapLeft = ret[0].left
          callback && callback(wrapTop, wrapLeft)
        })
    },
    init(index = 0) {
      let options = JSON.parse(JSON.stringify(this.data.itemList));
      let columns = Number(this.data.columns)
      let rows = Math.ceil(options.length / this.data.columns);
      if (options.length === 0) return;
      setTimeout(() => {
        this.getDom((wrapTop, wrapLeft) => {
          let list = options.map((item, index) => {
            return {
              id: this.getId(),
              realKey: index,
              sortKey: index,
              //若有误差，cellWidth、cellHeight取整
              transX: `${index%columns * this.data.cellWidth}px`,
              transY: `${Math.floor(index/columns) * this.data.cellHeight}px`,
              entity: item
            }
          });
          let param = {
            windowHeight: this.data.windowHeight,
            columns: Number(this.data.columns),
            rows: rows,
            cellWidth: this.data.cellWidth,
            cellHeight: this.data.cellHeight,
            wrapLeft: wrapLeft,
            wrapTop: wrapTop
          };
          this.setData({
            rows:rows,
            changeList:list,
            list:list,
            wrapTop:wrapTop,
            wrapLeft:wrapLeft,
            param:param,
            dragging:true
          })
        })
      }, 500)
    },
    drag(e) {
      this.setData({
        wxDrag: e.wxdrag
      })
    },
    sortend(e) {
      this.triggerEvent('end', {
        itemList: e.itemList
      });
    },
    change(e) {
      this.triggerEvent('change', {
        itemList: e.itemList
      });
    },
    itemClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      if (!this.data.changeList || this.data.changeList.length === 0) return;
      let item = this.data.changeList[index];
      this.triggerEvent('click', {
        index: item.realKey,
        item: item.entity
      });
    },
    deleteItem(e) {
      this.triggerEvent('delete', {
        index: e.detail.index
      });
    },
    listChange(e) {
      this.setData({
        changeList:e.itemList
      })
    },
    pageScroll(e) {
      wx.pageScrollTo({
        scrollTop: e.scrollTop,
        duration: 0
      });
    }
  }
})