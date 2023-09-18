// 本文件由FirstUI授权予闫弘宇（手机号：13 51  000       1553，身份证尾号：  0 3 36 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
const circleId = `fui_cc_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
      percent: {
        type: String,
        optionalTypes:[Number],
        value: 0,
        observer(val) {
          this.data.isReady && this.initDraw()
        }
      },
      width: {
        type: Number,
        optionalTypes:[Number],
        value: 120,
        observer(val){
          this.initWidth(val)
        }
      },
      strokeWidth: {
        type: String,
        optionalTypes:[Number],
        value: 4,
        observer(val){
          this.data.isReady && this.initDraw()
        }
      },
      lineCap: {
        type: String,
        value: 'round'
      },
      size: {
        type: String,
        optionalTypes:[Number],
        value: 12
      },
      color: {
        type: String,
        value: ''
      },
      show: {
        type: Boolean,
        value: true
      },
      background: {
        type: String,
        value: '#CCCCCC'
      },
      defaultShow: {
        type: Boolean,
        value: true
      },
      foreground: {
        type: String,
        value: ''
      },
			//进度条渐变颜色，结合foreground使用
			gradient: {
				type: String,
				value: ''
			},
      sAngle: {
        type: Number,
        value: 0
      },
      counterclockwise: {
        type: Boolean,
        value: false
      },
      speed: {
        type: String,
        optionalTypes:[Number],
        value: 1
      },
      activeMode: {
        type: String,
        value: 'forwards'
      }
  },
  observers:{
    'w':function(val){
       this.data.isReady && this.initDraw()
    }
  },
  data: {
    circleId:circleId,
    w: 30,
    context: null,
    canvas: null,
    start: 0,
    isReady: false,
    primaryColor:(wx.$fui && wx.$fui.color.primary) || '#465CFF'
  },
  lifetimes:{
    attached:function(){
      this.initWidth(this.data.width)
    },
    ready: function () {
      this.init()
    }
  },
  methods: {
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    initWidth(val) {
      val = this.rpx2px(Number(val) || 120)
      this.setData({
        w: val % 2 === 0 ? val : val + 1
      })
    },
    init() {
      wx.createSelectorQuery().in(this)
        .select(`#${this.data.circleId}`)
        .fields({
          node: true,
          size: true,
        })
        .exec(this.initDraw.bind(this))
    },
    initDraw(res) {
      this.data.isReady = true;
      let start = this.data.activeMode === 'backwards' ? 0 : this.data.start;
      start = start > this.data.percent ? 0 : start;
      if (res) {
        const width = res[0].width
        const height = res[0].height
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        this.data.context=ctx;
        this.data.canvas = canvas
        this.drawCircle(start, ctx, canvas);
      } else {
        this.drawCircle(start, this.data.context, this.data.canvas);
      }
    },
    drawDefaultCircle(ctx, canvas){
        //终止弧度
      let eAngle = Math.PI * 2 + Number(this.data.sAngle) * Math.PI;
      this.drawArc(ctx, eAngle, this.data.background);
    },
    drawpercent(ctx, percent){
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = this.data.color || this.data.primaryColor;
      ctx.font = this.data.size + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let radius = this.data.w / 2;
      percent = this.data.counterclockwise ? 100 - percent : percent;
      percent = percent.toFixed(0) + "%"
      ctx.fillText(percent, radius, radius);
      ctx.stroke();
      ctx.restore();
    },
    drawCircle(start, ctx, canvas){
      if (!ctx || !canvas) return;
      let that = this
      let percent = that.data.percent;
      let requestId = null
      let renderLoop = () => {
        drawFrame((res) => {
          if (res) {
            requestId = canvas.requestAnimationFrame(renderLoop)
          } else {
            canvas.cancelAnimationFrame(requestId)
            requestId = null;
            renderLoop = null;
          }
        })
      }
      requestId = canvas.requestAnimationFrame(renderLoop)

      function drawFrame(callback) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (that.data.defaultShow) {
          that.drawDefaultCircle(ctx, canvas)
        }
        if (that.data.show) {
          that.drawpercent(ctx, start);
        }
        let isEnd = (percent == 0 || (that.data.counterclockwise && start == 100));
        if(!isEnd){
          let eAngle = ((2 * Math.PI) / 100) * start + Number(that.data.sAngle) * Math.PI;
          let gradient = that.data.foreground || that.data.primaryColor;
          if (that.data.gradient) {
            gradient = ctx.createLinearGradient(0, 0, Number(that.data.w), 0);
            gradient.addColorStop(0, that.data.gradient);
            gradient.addColorStop(1, (that.data.foreground || that.data.primaryColor));
          }
          that.drawArc(ctx, eAngle, gradient);
        }
        that.triggerEvent('change', {
          percent: start
        });
        if (start >= percent) {
          that.setData({
            start: start
          })
          that.triggerEvent('end', {
            canvasId: that.data.circleId,
            percent: percent
          });
          canvas.cancelAnimationFrame(requestId)
          callback && callback(false)
          return;
        }
        let num = start + that.data.speed
        start = num > percent ? percent : num;
        callback && callback(true)
      }

    },
    drawArc(ctx, eAngle, strokeStyle) {
      ctx.save();
      ctx.beginPath();
      let sw = Number(this.data.strokeWidth);
      ctx.lineCap = this.data.lineCap;
      ctx.lineWidth = sw;
      ctx.strokeStyle = strokeStyle;
      let radius = this.data.w / 2;
      ctx.arc(radius, radius, radius - sw, Number(this.data.sAngle) * Math.PI, eAngle, this.data.counterclockwise);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }
})