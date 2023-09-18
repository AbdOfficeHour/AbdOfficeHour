// 本文件由FirstUI授权予杨方安（手机号：189 3 8 631    5   93，身份证尾号：1    84 931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const canvasId = `fui_ag_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
    width: {
      type: String,
      optionalTypes: [Number],
      value: 0,
      observer(val) {
        if (val) {
          this.setData({
            w: this.rpx2px(Number(val))
          })
        }
      }
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 400,
      observer(val) {
        this.setData({
          h: this.rpx2px(Number(val))
        })
      }
    },
    background: {
      type: String,
      value: '#ffffff'
    },
    //px
    lineWidth: {
      type: String,
      optionalTypes: [Number],
      value: 5
    },
    color: {
      type: String,
      value: '#181818'
    },
    tips: {
      type: String,
      value: '请签名！'
    }
  },
  data: {
    canvasId: canvasId,
    w: 300,
    h: 200,
    completed: false,
    autograph: false,
    ctx: null,
    touchs: null
  },
  lifetimes: {
    attached: function () {
      let sys = wx.getSystemInfoSync()
      this.setData({
        w: this.data.width == 0 ? sys.windowWidth : this.rpx2px(Number(this.data.width)),
        h: this.rpx2px(Number(this.data.height) || 400)
      })
    },
    ready: function () {
      setTimeout(() => {
        this.data.ctx = wx.createCanvasContext(this.data.canvasId, this)
        this.triggerEvent('ready', {
          canvasId: this.data.canvasId
        })
      }, 50)
    }
  },
  methods: {
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    onTouchstart(e) {
      if (this.data.completed) return;
      let point = {
        x: e.touches[0].x,
        y: e.touches[0].y
      };
      this.data.ctx.setStrokeStyle(this.data.color);
      this.data.ctx.setLineWidth(this.data.lineWidth);
      this.data.ctx.setLineCap('round');
      this.data.touchs = [point];
    },
    onTouchmove(e) {
      if (this.data.completed) return;
      let point = {
        x: e.touches[0].x,
        y: e.touches[0].y
      };
      point && this.data.touchs.push(point)
      if (this.data.touchs.length >= 2) {
        this.startDraw();
      }
    },
    onTouchend(e) {
      if (this.data.completed) return;
      this.data.touchs = null
    },
    onTouchCancel(e) {
      if (this.data.completed) return;
      // console.log('touchCancel：', e)
    },
    startDraw() {
      this.data.autograph = true;
      const point1 = this.data.touchs[0];
      const point2 = this.data.touchs[1];
      this.data.touchs.shift();
      this.data.ctx.moveTo(point1.x, point1.y);
      this.data.ctx.lineTo(point2.x, point2.y);
      this.data.ctx.stroke();
      this.data.ctx.draw(true);
    },
    //重新绘制
    redraw() {
      this.data.completed = false;
      this.data.touchs = null;
      this.data.autograph = false;
      this.data.ctx.clearRect(0, 0, this.data.w, this.data.h);
      this.data.ctx.beginPath()
      this.data.ctx.draw();
    },
    drawComplete(callback) {
      if (!this.data.autograph && this.data.tips && this.data.tips !== true && this.data.tips !== 'true') {
        wx.showToast({
          title: this.data.tips,
          icon: 'none'
        });
        return;
      }
      this.data.completed = true;
      const platform = wx.getSystemInfoSync().platform;
      let time = 50;
      if (platform === 'android') {
        time = 200;
      }
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: this.data.canvasId,
          fileType: 'png',
          quality: 1,
          success: function (res) {
            callback && callback(res.tempFilePath)
          },
          fail() {
            callback && callback(false)
          }
        }, this)
      }, time)
    }
  }
})