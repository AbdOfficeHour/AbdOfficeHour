// 本文件由FirstUI授权予闫弘宇（手机号： 13510  0 0   1  55 3，身份证尾号：033  6 1  2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    width: {
      type: String,
      optionalTypes: [Number],
      value: 40
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 40
    },
    borderWidth: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    borderColor: {
      type: String,
      value: 'transparent'
    },
    background: {
      type: String,
      value: 'transparent'
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 32
    },
    color: {
      type: String,
      value: '#333'
    },
    colonSize: {
      type: String,
      optionalTypes: [Number],
      value: 32
    },
    colonColor: {
      type: String,
      value: '#333'
    },
    value: {
      type: String,
      optionalTypes: [Number],
      value: 0,
      observer(val) {
        this.clearTimer();
        this.setData({
          seconds: Number(val)
        })
        this.data.timer(Number(val));
        setTimeout(() => {
          if (this.data.autoStart) {
            this.startTiming();
          }
        }, 0);
      }
    },
    maxTime: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    isDays: {
      type: Boolean,
      value: false
    },
    isHours: {
      type: Boolean,
      value: true
    },
    isMinutes: {
      type: Boolean,
      value: true
    },
    isSeconds: {
      type: Boolean,
      value: true
    },
    isMs: {
      type: Boolean,
      value: false
    },
    msWidth: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    msSize: {
      type: String,
      optionalTypes: [Number],
      value: 28
    },
    msColor: {
      type: String,
      value: ''
    },
    isColon: {
      type: Boolean,
      value: true
    },
    autoStart: {
      type: Boolean,
      value: true
    }
  },
  data: {
    d: '0',
    h: '00',
    m: '00',
    s: '00',
    ms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    seconds: 0,
    loop: null,
    ani: false,
    percent: 0
  },
  lifetimes: {
    ready: function () {
      this.setData({
        seconds: Number(this.data.value)
      })
      this.timer(this.data.seconds);
      if (this.data.autoStart) {
        this.startTiming();
      }
    }
  },
  methods: {
    clearTimer() {
      this.setData({
        ani: false
      })
      clearInterval(this.data.loop);
      this.data.loop = null;
    },
    //开始
    startTiming() {
      let max = Number(this.data.maxTime)
      if (this.data.seconds >= max && max != 0) {
        this.endTimer();
        return
      }
      this.clearTimer();
      this.setData({
        ani: true
      })
      this.data.loop = setInterval(() => {
        this.data.seconds++;
        this.timer(this.data.seconds);
        if (this.data.seconds >= max && max != 0) {
          this.endTimer();
        }
      }, 1000);
    },
    //重置
    resetTimer() {
      this.setData({
        d: '0',
        h: '00',
        m: '00',
        s: '00'
      })
      this.data.seconds = 0;
      this.clearTimer();
    },
    //结束 | 暂停
    endTimer() {
      this.clearTimer();
      this.triggerEvent('end', {
        day: this.data.d,
        hour: this.data.h,
        minute: this.data.m,
        second: this.data.s,
        totalSeconds: this.data.seconds
      });
    },
    timer(seconds) {
      let [day, hour, minute, second] = [0, 0, 0, 0];
      if (seconds > 0) {
        day = this.data.isDays ? Math.floor(seconds / (60 * 60 * 24)) : 0;
        hour = this.data.isHours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
        minute = this.data.isMinutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
        second = this.data.isSeconds ? Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60 : 0;
      }
      hour = hour < 10 ? `0${hour}` : hour;
      minute = minute < 10 ? `0${minute}` : minute;
      second = second < 10 ? `0${second}` : second;
      this.setData({
        d: day,
        h: hour,
        m: minute,
        s: second
      })
    }
  }
})