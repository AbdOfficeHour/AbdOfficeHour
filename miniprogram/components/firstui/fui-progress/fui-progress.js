// 本文件由FirstUI授权予闫弘宇（手机号： 13 51   00 0  155  3，身份证尾号：  0 3  3612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    percent: {
      type: String,
      optionalTypes: [Number],
      value: 0,
      observer(val) {
        this.darwProgress();
      }
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 8
    },
    radius: {
      type: String,
      optionalTypes: [Number],
      value: 8
    },
    showInfo: {
      type: Boolean,
      value: false
    },
    //右侧百分比字体大小 rpx
    size: {
      type: String,
      optionalTypes: [Number],
      value: 28
    },
    //右侧百分比颜色
    color: {
      type: String,
      value: '#333'
    },
    //右侧百分比宽度
    percentWidth: {
      type: String,
      optionalTypes: [Number],
      value: 96
    },
    //未选择的进度条的颜色
    background: {
      type: String,
      value: '#CCCCCC'
    },
    //已选进度条颜色,可渐变
    activeColor: {
      type: String,
      value: ''
    },
    //进度增加1%所需毫秒数
    duration: {
      type: String,
      optionalTypes: [Number],
      value: 15
    }
  },
  data: {
    percentage: 0,
    translateX: '-100%',
    time: 0
  },
  lifetimes: {
    ready: function () {
      this.darwProgress();
    }
  },
  methods: {
    darwProgress() {
      let percent = Number(this.data.percent);
      percent = percent > 100 ? 100 : percent;
      let time = Number(this.data.duration) * Math.abs(percent - this.data.percentage) / 1000;
      if (percent < this.data.percentage && (this.data.percentage - percent) > 30) {
        //后百分比数大于30时 时间缩短
        time = time / 2
      }
      this.setData({
        time: time,
        percentage: percent,
        translateX: (100 - percent) + '%'
      })
      setTimeout(() => {
        this.triggerEvent('activeend', {});
      }, time)
    }
  }
})