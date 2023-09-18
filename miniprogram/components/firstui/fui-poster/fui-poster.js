// 本文件由FirstUI授权予杨方安（手机号：  1 89 3863 1    59 3，身份证尾号：  1  849 31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import poster from './index.js';
const canvasId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
    //画布宽度，单位rpx
    width: {
      type: Number,
      optionalTypes: [String],
      value: 750,
      observer(val) {
        this.setData({
          w: this._toPx(val)
        })
      }
    },
    //画布高度，单位rpx
    height: {
      type: Number,
      optionalTypes: [String],
      value: 1024,
      observer(val) {
        this.setData({
          h: this._toPx(val)
        })
      }
    },
    //像素比率，缩放比
    pixelRatio: {
      type: Number,
      optionalTypes: [String],
      value: 2
    }
  },
  data: {
    canvasId: canvasId,
    w: 375,
    h: 512
  },
  lifetimes: {
    attached: function () {
      this.setData({
        w: this._toPx(this.data.width),
        h: this._toPx(this.data.height)
      })
    },
    ready: function () {
      poster.create(Number(this.data.pixelRatio), this.data.canvasId, this)
      setTimeout(() => {
        this.triggerEvent('ready')
      }, 50)
    }
  },
  methods: {
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    _toPx(rpx) {
      return this.rpx2px(Number(rpx) * Number(this.data.pixelRatio))
    },
    _getPosterData(texts, blocks, lines, imgs) {
      let queue = [].concat(texts.map((item) => {
        item.type = 'text';
        item.zIndex = item.zIndex || 0;
        return item;
      })).concat(blocks.map((item) => {
        item.type = 'block';
        item.zIndex = item.zIndex || 0;
        return item;
      })).concat(lines.map((item) => {
        item.type = 'line';
        item.zIndex = item.zIndex || 0;
        return item;
      })).concat(imgs.map((item) => {
        item.type = 'image';
        item.zIndex = item.zIndex || 0;
        return item;
      }));
      // 按照顺序排序
      queue.sort((a, b) => a.zIndex - b.zIndex);
      return queue;
    },
    //生成海报
    generatePoster(params, callback) {
      let {
        texts = [], imgs = [], blocks = [], lines = []
      } = params;
      //需要看平台支持情况，如果平台不支持将会绘制失败
      //图片处理 type：1-无需处理（base64、本地路径、网络路径等，需在平台支持下），2-网络图片，下载 3-base64转本地图片
      if (imgs.length > 0) {
        let funcArr = []
        let idxArr = []
        imgs.forEach((item, index) => {
          if (item.type == 2) {
            funcArr.push(poster.getImage(item.imgResource))
            idxArr.push(index)
          }else if (item.type == 3) {
            funcArr.push(poster.getImagebyBase64(item.imgResource))
            idxArr.push(index)
          }
        })
        if (funcArr.length > 0) {
          Promise.all(funcArr).then(res => {
            res.forEach((imgRes, idx) => {
              let item = imgs[idxArr[idx]]
              item.imgResource = imgRes
              // console.log(imgRes)
            })
            const queue = this._getPosterData(texts, blocks, lines, imgs);
            poster.generatePoster(this.data.width, this.data.height, queue, callback)

          }).catch(err => {
            console.log(err)
            wx.showToast({
              title: '图片资源处理失败',
              icon: 'none'
            })
          })
        } else {
          const queue = this._getPosterData(texts, blocks, lines, imgs);
          poster.generatePoster(this.data.width, this.data.height, queue, callback)
        }
      } else {
        const queue = this._getPosterData(texts, blocks, lines, imgs);
        poster.generatePoster(this.data.width, this.data.height, queue, callback)
      }
    },
    saveImage(filePath) {
      poster.saveImage(filePath)
    }
  }
})