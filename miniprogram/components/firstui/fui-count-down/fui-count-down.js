// 本文件由FirstUI授权予杨方安（手机号：18 9 3  8631    5 9 3，身份证尾号：18   4  931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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
    borderColor: {
      type: String,
      value: '#333'
    },
    background: {
      type: String,
      value: '#fff'
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 28
    },
    color: {
      type: String,
      value: '#333'
    },
    colonSize: {
      type: String,
      optionalTypes: [Number],
      value: 28
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
        this.data.time = Number(val) || 0;
        this.countDown(this.data.time);
        setTimeout(() => {
          if (this.data.autoStart) {
            this.startCountdown();
          }
        }, 0);
      }
    },
    //是否包含天
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
    unitEn: {
      type: Boolean,
      value: false
    },
    isMs: {
      type: Boolean,
      value: false
    },
    msWidth: {
      type: String,
      optionalTypes: [Number],
      value: 36
    },
    msSize: {
      type: String,
      optionalTypes: [Number],
      value: 24
    },
    msColor: {
      type: String,
      value: ''
    },
    isColon: {
      type: Boolean,
      value: true
    },
    returnTime: {
      type: Boolean,
      value: false
    },
    autoStart: {
      type: Boolean,
      value: true
    }
  },
  data: {
    countdown: null,
    d: '0',
    h: '00',
    i: '00',
    s: '00',
    ms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ani: false,
    percent: 0,
    time: 0
  },
  lifetimes: {
    ready: function () {
      this.clearTimer();
      this.data.time = Number(this.data.value) || 0;
      this.countDown(this.data.time);
      if (this.data.autoStart && this.data.time > 0) {
        this.startCountdown();
      }
    },
    detached: function () {
      this.clearTimer();
    }
  },
  methods: {
    clearTimer() {
      this.setData({
        ani: false
      })
      clearInterval(this.data.countdown);
      this.data.countdown = null;
    },
    endCountdown(isSuspend = false) {
      this.clearTimer();
      if (!isSuspend) {
        this.triggerEvent('end', {});
      }
    },
    startCountdown: function () {
      this.clearTimer();
      if (this.data.time <= 0) {
        this.endCountdown();
        return;
      }
      this.setData({
        ani: true
      })
      this.data.countdown = setInterval(() => {
        this.data.time--;
        if (this.data.time < 0) {
          this.endCountdown();
          return;
        }
        this.countDown(this.data.time);
        if (this.data.returnTime) {
          this.triggerEvent('time', {
            seconds: this.data.time
          });
        }
      }, 1000);
    },
    resetCountdown(seconds = 0) {
      this.data.time = seconds || Number(this.data.value);
      this.clearTimer();
      this.countDown(this.data.time);
      if (this.data.autoStart) {
        this.startCountdown();
      }
    },
    countDown(seconds) {
      let [day, hour, minute, second] = [0, 0, 0, 0];
      if (seconds > 0) {
        day = this.data.isDays ? Math.floor(seconds / (60 * 60 * 24)) : 0;
        hour = this.data.isHours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
        minute = this.data.isMinutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
        second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
      }
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      this.setData({
        d: day,
        h: hour,
        i: minute,
        s: second
      })
    }
  }
})