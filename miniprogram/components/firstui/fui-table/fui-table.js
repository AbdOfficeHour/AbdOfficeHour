// 本文件由FirstUI授权予杨方安（手机号：  18938  6  315   9 3，身份证尾号：1 8 49 3  1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    header: {
      type: Array,
      value:[],
      observer(val){
        this.handleHeader(val)
      }
    },
    show: {
      type: Boolean,
      value: true
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    color: {
      type: String,
      value: '#7F7F7F'
    },
    fontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 600
    },
    headerBgColor: {
      type: String,
      value: '#fff'
    },
    fixed: {
      type: Boolean,
      value: false
    },
    //数据集合
    itemList: {
      type: Array,
      value:[]
    },
    //总宽度 < 屏幕宽度- gap*2时，是否铺满
    full: {
      type: Boolean,
      value: false
    },
    //Table 的高度，默认为自动高度，单位rpx。
    height: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //组件外层设置的左右padding值（距离屏幕左右侧距离），rpx
    gap: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //是否带有纵向边框
    border: {
      type: Boolean,
      value: true
    },
    //是否带有横向边框
    horBorder: {
      type: Boolean,
      value: true
    },
    //边框颜色
    borderColor: {
      type: String,
      value: '#eee'
    },
    //如果有固定项，不可设置透明
    background: {
      type: String,
      value: '#fff'
    },
    // 是否为斑马纹table
    stripe: {
      type: Boolean,
      value: false
    },
    //斑马纹颜色
    stripeColor: {
      type: String,
      value: '#F8F8F8'
    },
    textSize: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    textColor: {
      type: String,
      value: '#333'
    },
    //单元格对齐方式:left/center/right
    align: {
      type: String,
      value: 'center'
    },
    //文字超出是否省略，默认换行
    ellipsis: {
      type: Boolean,
      value: false
    },
    //单元格上下padding值，单位rpx
    padding: {
      type: String,
      optionalTypes:[Number],
      value: 20
    }
  },
  data: {
    width: 0,
    //列宽度需要加上此值
    divideW: 0,
    hData: [],
    tableData: [],
    totalW: 0,
    scrollH: 0
  },
  lifetimes:{
    attached:function(){
      this.handleHeader(this.data.header)
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
    getId(index) {
      return `${index}_tr_${Math.ceil(Math.random() * 10e5).toString(36)}`
    },
    handleHeader(vals) {
      if (!vals || vals.length === 0) return;
      vals = JSON.parse(JSON.stringify(vals))
      let winWidth = wx.getSystemInfoSync().windowWidth
      let width = 0,
        left = 0,
        right = 0;
      let len = vals.length
      vals.map((item, index) => {
        item.tdId = this.getId(index)
        item.width = this.getPx(item.width || 200)
        width += item.width
        if (item.fixed) {
          item.left = item.fixed !== 'right' ? left : 0;
          left += item.width
        }
        if (item.type === 3 && item.buttons) {
          item.buttons.map((btn, idx) => {
            btn.bId = this.getId(index)
          })
        }
      })
      for (let i = 0; i < len; i++) {
        let item = vals[len - i - 1]
        if (item && item.fixed) {
          item.right = item.fixed === 'right' ? right : 0;
          right += item.width
        }
      }
      let gap = this.data.gap == 0 ? 0 : this.getPx(Number(this.data.gap) * 2)
      let totalW = width
      let totalWidth = winWidth - gap
      let maxWidth = width > totalWidth ? totalWidth : width
      let divideW = 0;
      if (this.data.full && totalWidth > maxWidth) {
       divideW = Math.floor((totalWidth - maxWidth) / len)
        let lastW = (totalWidth - maxWidth) % len
        let item = vals[len - 1]
        item.width += lastW
        let dw = divideW * len + lastW
        maxWidth += dw
        totalW += dw
      }
      this.setData({
        totalW:totalW,
        width:maxWidth,
        divideW:divideW,
        hData:vals
      })
    },
    handleTap(e) {
      let dataset=e.currentTarget.dataset;
      let index=Number(dataset.index)
      let idx=Number(dataset.idx)
      let item = this.data.itemList[index]
      this.triggerEvent('click', {
        item: item,
        index: index,
        buttonIndex: idx
      })
    },
    trClick(e) {
      let dataset=e.currentTarget.dataset;
      let index=Number(dataset.index)
      let item = this.data.itemList[index]
      this.triggerEvent('rowClick', {
        item: item,
        index: index
      })
    }
  }
})