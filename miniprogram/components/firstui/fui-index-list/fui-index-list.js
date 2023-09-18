// 本文件由FirstUI授权予闫弘宇（手机号：1 3 5  1  00 0 1  553，身份证尾号：03    3 612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    listData: {
      type: Array,
      value: [],
      observer(val) {
        this.initData()
      }
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 64
    },
    color: {
      type: String,
      value: '#181818'
    },
    background: {
      type: String,
      value: ''
    },
    keyColor: {
      type: String,
      value: '#7F7F7F'
    },
    activeColor: {
      type: String,
      value: '#FFFFFF'
    },
    activeBackground: {
      type: String,
      value: ''
    },
    isSelect: {
      type: Boolean,
      value: false
    },
    borderColor: {
      type: String,
      value: '#ccc'
    },
    selectedColor: {
      type: String,
      value: ''
    },
    isSrc: {
      type: Boolean,
      value: false
    },
    subRight: {
      type: Boolean,
      value: true
    }
  },
  data: {
    lists: [],
    idtHeight: 0,
    winOffsetY: 0,
    winHeight: 0,
    styles: '',
    indicators: [],
    top: -1,
    start: 0,
    touching: false,
    touchmoveIndex: -1,
    scrollViewId: '',
    touchmovable: true,
    loaded: false,
    observer: false
  },
  lifetimes: {
    ready: function () {
      setTimeout(() => {
        if (this.data.observer) return;
        this.initData()
      }, 50)
    }
  },
  methods: {
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getIndex(y) {
      let index = -1;
      index = Math.floor((y - this.data.start) / this.rpx2px(40))
      return index
    },
    initData() {
      this.data.observer = true;
      let height = 0;
      let lists = [];
      let tempArr = [...(this.data.listData || [])]
      for (let i = 0, len = tempArr.length; i < len; i++) {
        let model = tempArr[i]
        if (!model.data || model.data.length === 0) {
          continue;
        }
        height += 40;
        model.originalIndex = i;
       // model.key = `fui_key_${Math.ceil(Math.random() * 10e5).toString(36)}`
        lists.push(model)
      }
      this.setData({
        idtHeight: height,
        styles:`height:${height}rpx;`,
        lists: lists
      }, () => {
        wx.createSelectorQuery()
          .in(this)
          .select('#fui_index_list')
          .boundingClientRect()
          .exec(ret => {
            this.setData({
              winOffsetY: ret[0].top,
              winHeight: ret[0].height
            })
            this.setStyles()
          })
        setTimeout(() => {
          this.triggerEvent('init')
        }, 50);
      })
    },
    setStyles() {
      let indicators = []
      let styles =
        `height:${this.data.idtHeight}rpx;top:${this.data.winHeight / 2}px;-webkit-transform: translateY(-${this.data.idtHeight/2}rpx);transform: translateY(-${this.data.idtHeight/2}rpx)`
      let start = this.data.winHeight / 2 - this.rpx2px(this.data.idtHeight) / 2;
      this.data.lists.forEach((item, index) => {
        //20为40的一半，50为100的一半
        const top = start + this.rpx2px(index * 40 + 20 - 50)
        indicators.push(top)
      })
      this.setData({
        indicators: indicators,
        styles: styles,
        start: start
      })
    },
    startEmits(idx, index) {
      let item = this.data.lists[idx]
      let data = item.data[index] || {}
      this.triggerEvent('click', {
        index: item.originalIndex,
        letter: item.letter,
        subIndex: index,
        ...data
      })
    },
    onTap(e) {
      let dataset = e.currentTarget.dataset
      this.startEmits(Number(dataset.idx), Number(dataset.index))
    },
    touchStart(e) {
      this.setData({
        touching: true
      })
      let pageY = e.touches[0].pageY
      let index = this.getIndex(pageY - this.data.winOffsetY)
      let item = this.data.lists[index]
      if (item) {
        this.setData({
          scrollViewId: `fui_il_letter_${index}`,
          touchmoveIndex: index
        })
      }
    },
    touchMove(e) {
      let pageY = e.touches[0].pageY
      let index = this.getIndex(pageY - this.data.winOffsetY)
      if (this.data.touchmoveIndex === index) return false;
      let item = this.data.lists[index]
      if (item) {
        this.setData({
          scrollViewId: `fui_il_letter_${index}`,
          touchmoveIndex: index
        })
      }
    },
    touchEnd() {
      this.setData({
        touching: false,
        touchmoveIndex: -1
      })
    }
  }
})