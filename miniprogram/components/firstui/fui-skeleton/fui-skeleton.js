// 本文件由FirstUI授权予杨方安（手机号：  189 38 6 31 5 9   3，身份证尾号：1  8 49 3 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    //外层元素class值
			outerClass: {
				type: String,
				value: "fui-skeleton"
			},
			//需要在骨架元素添加以下class值，也可传入自定义class值
			//需要做骨架的元素class值，包含round表示处理成圆形，其他为矩形
			selector: {
				type: Array,
				value:['fui-round', 'fui-rect']
			},
			//骨架屏背景色
			background: {
				type: String,
				value: "transparent"
			},
			//骨架屏预载数据，如果传入数据则不动态获取节点信息
			preloadList: {
				type: Array,
				value:[]
			},
			//是否展示动画效果
			active: {
				type: Boolean,
				value: true
			},
			//light、dark
			theme: {
				type: String,
				value: 'light'
			}
  },
  data: {
    //round、rect
    elList: [],
    height: 0
  },
  lifetimes:{
    attached:function(){
      const res = wx.getSystemInfoSync();
      this.setData({
        height:res.windowHeight
      })
			if (this.data.preloadList && this.data.preloadList.length > 0) {
        this.setData({
          elList:this.data.preloadList
        })
			}
    },
    ready:function(){
			 setTimeout(() => {
        this.nodesRef(this.data.outerClass).then((res) => {
					if (res && res[0]) {
            this.setData({
              height:res[0].height
            })
					}
				});
				if (!this.data.preloadList || this.data.preloadList.length === 0) {
					this.selectorQuery()
				}
       }, 50);
    }
  },
  methods: {
    async selectorQuery() {
      let selector = this.data.selector || []
      let nodes = []
      for (let item of selector) {
        await this.nodesRef(item).then((res) => {
          res.map(d => {
            d.type = item.indexOf('round') === -1 ? 'rect' : 'round';
          })
          nodes = nodes.concat(res)
        })
      }
      this.setData({
        elList:nodes
      },()=>{
        this.triggerEvent('change', {
          nodes: nodes
        })
      })
    },
    async nodesRef(name) {
      return await new Promise((resolve, reject) => {
        wx.createSelectorQuery()
          .selectAll(`.${name}`)
          .boundingClientRect((res) => {
            if (res) {
              resolve(res);
            } else {
              reject(res)
            }
          }).exec();
      })
    }
  }
})