// 本文件由FirstUI授权予杨方安（手机号：18      93 8 6315 9 3，身份证尾号：1  8   4931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    vtabs: {
      type: Array,
      value:[],
      observer(vals){
        this.initData(vals)
      }
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: '0',
      observer(val){
        this.setWidth(val)
      }
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: '0',
      observer(val){
        this.setHeight(val)
      }
    },
    tabWidth: {
      type: String,
      optionalTypes:[Number],
      value: 220
    },
    tabHeight: {
      type: String,
      optionalTypes:[Number],
      value: 110
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 26
    },
    activeSize: {
      type: String,
      optionalTypes:[Number],
      value: 26
    },
    color: {
      type: String,
      value: '#333333'
    },
    activeColor: {
      type: String,
      value: ''
    },
    fontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 'normal'
    },
    activeFontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 'normal'
    },
    background: {
      type: String,
      value: '#eeeeee'
    },
    activeBgColor: {
      type: String,
      value: '#ffffff'
    },
    isBorder: {
      type: Boolean,
      value: true
    },
    borderColor: {
      type: String,
      value: ''
    },
    activeTab: {
      type: String,
      optionalTypes:[Number],
      value: 0,
      observer(val){
        if (this.data.linkage) {
					this.setDefaultTab(val)
				} else {
					this.switchTab(val, true);
				}
      }
    },
    animation: {
      type: Boolean,
      value: true
    },
    badgeColor: {
      type: String,
      value: '#fff'
    },
    badgeBackground: {
      type: String,
      value: ''
    },
    isDot: {
      type: Boolean,
      value: false
    },
    //是否联动，为false时content只需展示对应索引数据
    linkage: {
      type: Boolean,
      value: true
    }
  },
  relations: {
    '../fui-vtabs-content/fui-vtabs-content': {
      type: 'descendant',
      linked: function (target) {
          this.data.children.push(target)
      }
    }
  },
  data: {
    children:[],
    calcHeightTimer:null,
    scrollTimer:null,
    vals: [],
    scrollInto: '',
    current: 0,
    contentScrollTop: 0,
    heightRecords: [],
    contentHeight: {},
    vtabsW: '320px',
    vtabsH: '600px',
    isTap: false
  },
  observers:{
     'current':function(val){
        this.scrollTabBar(val)
     }
  },
  lifetimes:{
     attached:function(){
			this.setWidth(this.data.width)
			this.setHeight(this.data.height)
			this.initData(this.data.vtabs)
     }
  },
  methods: {
    setWidth(width) {
      let res = wx.getSystemInfoSync()
      if (width == 0 || width == '0px' || width == '0rpx') {
        this.setData({
          vtabsW: res.windowWidth + 'px'
        })
      } else {
        this.setData({
          vtabsW: width
        })
      }
    },
    setHeight(height) {
      let res = wx.getSystemInfoSync()
      if (height == 0 || height == '0px' || height == '0rpx') {
        this.setData({
          vtabsH:res.windowHeight + 'px'
        })
      } else {
        this.setData({
          vtabsH:height
        })
      }
    },
    setDefaultTab(index, idx = 0) {
      let len = this.data.vtabs.length
      if (this.data.heightRecords.length === len && len > 0) {
        this.switchTab(index, true);
      } else {
        if (idx >= 100) return
        idx++
        setTimeout(() => {
          this.setDefaultTab(index, idx)
        }, 250)
      }
    },
    initData(vals) {
      if (vals && vals.length > 0) {
        if (typeof vals[0] !== 'object') {
          //字符串
          vals = vals.map(item => {
            return {
              name: item
            }
          })
        }
        this.setData({
          vals:vals
        },()=>{
          if (this.data.linkage) {
            setTimeout(() => {
              this.setDefaultTab(this.data.activeTab, true);
            }, 50)
          } else {
            this.switchTab(this.data.activeTab, true);
          }
        })
      }
    },
    scrollTabBar(index) {
      let len = this.data.vtabs.length;
      if (len === 0) return;
      index = index < 6 ? 0 : index - 5;
      if (index >= len) index = len - 1;
      this.setData({
        scrollInto:`fui_vtabs_bar_${index}`
      })
    },
    handleSwitchTab(e){
        let index = Number(e.currentTarget.dataset.index)
        this.switchTab(index)
    },
    switchTab(index, init) {
      index = Number(index)
      const item = {
        ...this.data.vals[index]
      }
      if (item.disable) return;
      if (this.data.linkage) {
        this.setData({
          contentScrollTop:this.data.heightRecords[this.data.current - 1] || 0
        },()=>{
          setTimeout(() => {
            this.setData({
              current:index,
              contentScrollTop: this.data.heightRecords[index - 1] || 0
            })
          }, 50)
        })
      } else {
        this.setData({
          current: index
        })
      }
      if (!init) {
        this.setData({
          isTap:true
        })
        this.triggerEvent('click', {
          index: index,
          ...item
        })
      }
    },
    calcHeight() {
      let len = this.data.vtabs.length;
      let _heightRecords = [];
      let temp = 0;
      for (let i = 0; i < len; i++) {
        _heightRecords[i] = temp + (this.data.contentHeight[i] || 0);
        temp = _heightRecords[i];
      }
      this.data.heightRecords = _heightRecords;
    },
    contentScroll(e) {
      if (!this.data.linkage) return;
      if (this.data.isTap) {
        if (this.data.scrollTimer) {
          clearTimeout(this.data.scrollTimer)
        }
        this.data.scrollTimer = setTimeout(() => {
          this.setData({
            isTap:false
          })
        }, 50)
        return;
      }
      let _heightRecords = this.data.heightRecords;
      if (_heightRecords.length === 0) return;
      let len = this.data.vtabs.length;
      let scrollTop = e.detail.scrollTop + (len - 1) * 0.19;
      let index = 0;
      if (scrollTop >= _heightRecords[0]) {
        for (let i = 1; i < len; i++) {
          if (scrollTop >= _heightRecords[i - 1] && scrollTop < _heightRecords[i]) {
            index = i;
            break;
          }
        }
      }
      if (index != this.data.current) {
        const item = {
          ...this.data.vals[index]
        }
        this.triggerEvent('change', {
          index: index,
          ...item
        })
        this.setData({
          current: index
        })
      }
    },
    getCalcHeight(height, index) {
      this.data.contentHeight[index] = height;
      if (this.data.calcHeightTimer) {
        clearTimeout(this.data.calcHeightTimer);
      }
      this.data.calcHeightTimer = setTimeout(() => {
        this.calcHeight();
      }, 150);
    },
    uninstall(tabIndex, target) {
      this.data.children.forEach((item, index) => {
        if (item === target) {
          this.data.children.splice(index, 1)
        }
      })
      delete this.data.contentHeight[tabIndex]
      this.calcHeight()
    },
    //重置列表高度信息
    reset() {
      if (this.data.linkage) {
        this.data.children.forEach((item, index) => {
          item.calcHeight((height) => {
            this.getCalcHeight(height, Number(item.data.tabIndex))
          })
        })
      }
    }
  }
})