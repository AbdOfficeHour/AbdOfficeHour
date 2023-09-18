// 本文件由FirstUI授权予闫弘宇（手机号：1351 0   00   1 5 5 3，身份证尾号：0  33   612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    //发送前显示文本
    text: {
      type: String,
      value: '发送验证码'
    },
    //发送中显示文本
    sending: {
      type: String,
      value: '正在发送...'
    },
    //发送后倒计时显示文本(前面会自动拼接时间)
    sent: {
      type: String,
      value: 's后重新获取'
    },
    //倒计时秒数
    seconds: {
      type: String,
      optionalTypes: [Number],
      value: 60
    },
    //宽度
    width: {
      type: String,
      optionalTypes: [Number],
      value: 192
    },
    //高度
    height: {
      type: String,
      optionalTypes: [Number],
      value: 60
    },
    marginLeft: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    marginRight: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    //圆角
    radius: {
      type: String,
      optionalTypes: [Number],
      value: 8
    },
    //字体大小 rpx
    size: {
      type: String,
      optionalTypes: [Number],
      value: 24
    },
    //字体颜色
    color: {
      type: String,
      value: ''
    },
    //背景色
    background: {
      type: String,
      value: 'transparent'
    },
    //边框颜色
    borderColor: {
      type: String,
      value: ''
    },
    //自定义参数
    param: {
      type: String,
      optionalTypes: [Number],
      value: 0
    }
  },
  data: {
    showText: '',
    //1-发送前，2-发送中 3-发送成功，倒计时
    status: 1,
    timer: null
  },
  lifetimes: {
    attached: function () {
      if (this.data.start) {
        this.doLoop();
      } else {
        this.setData({
          showText: this.data.text
        })
        this.clearTimer();
      }
    },
    detached: function () {
      this.clearTimer();
    }
  },
  methods: {
    sendCode(e) {
      if (this.data.status > 1) return;
      this.clearTimer();
      this.setData({
        status: 2,
        showText: this.data.sending
      })
      this.triggerEvent('send', {
        param: this.data.param
      });
    },
    doLoop() {
      this.clearTimer();
      this.setData({
        status: 3
      })
      let seconds = Number(this.data.seconds || 60);
      this.setData({
        showText: seconds + this.data.sent
      })
      this.data.timer = setInterval(() => {
        if (seconds > 1) {
          --seconds;
          this.setData({
            showText: seconds + this.data.sent
          })
          this.triggerEvent('countdown', {
            seconds: seconds,
            param: this.data.param
          });
        } else {
          this.reset();
          this.triggerEvent('end', {
            param: this.data.param
          });
        }
      }, 1000);
    },
    success() {
      this.doLoop();
    },
    reset() {
      this.clearTimer();
      this.setData({
        showText:this.data.text,
        status:1
      })
    },
    clearTimer() {
      clearInterval(this.data.timer);
      this.data.timer = null;
    }
  }
})