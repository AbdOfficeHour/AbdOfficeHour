// 本文件由FirstUI授权予闫弘宇（手机号：1351 0 0       01 553，身份证尾号：   03 361 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    //left值,设置大于-1的值则right失效
			left: {
        type: String,
        optionalTypes:[Number],
				value: -1
			},
			right: {
				type: String,
        optionalTypes:[Number],
				value: 80
			},
			//top值,设置大于-1的值则bottom失效
			top: {
				type: String,
        optionalTypes:[Number],
				value: -1
			},
			bottom: {
				type: String,
        optionalTypes:[Number],
				value: 120
			},
			zIndex: {
				type: String,
        optionalTypes:[Number],
				value: 10
			},
			//移动方向，属性值有all、vertical、horizontal、none
			direction: {
				type: String,
				value: 'all'
			}
  },
  data: {
    maxWidth: 0,
    maxHeight: 0,
    eLeft: 0,
    eTop: 0,
  },
  lifetimes:{
    ready:function(){
      setTimeout(() => {
        this._getSize()
      }, 60);
    }
  },
  observers:{
     'left,right,top,bottom':function(){
        setTimeout(() => {
          this._getSize()
        }, 60);
     }
  },
  methods: {
    _getSize() {
      const sys = wx.getSystemInfoSync()
      wx.createSelectorQuery()
        .in(this)
        .select('.fui-movable__view')
        .boundingClientRect()
        .exec(ret => {
          if (ret) {
            const maxWidth = sys.windowWidth - ret[0].width - ret[0].left;
            const maxHeight = sys.windowHeight - ret[0].height - ret[0].top;
            const eLeft = ret[0].left || 0;
            const eTop = ret[0].top || 0;

            this.setData({
              maxWidth,
              maxHeight,
              eLeft,
              eTop
            })


            this.change({
              left: 0,
              top: 0
            })
          }
        })
    },
    reset() {
      setTimeout(() => {
        this._getSize()
      }, 50);
    },
    change(e) {
      this.triggerEvent('change', {
        x: e.left + this.data.eLeft,
        y: e.top + this.data.eTop
      })
    }

  }
})