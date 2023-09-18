// 本文件由FirstUI授权予闫弘宇（手机号：  13  5100 01   5 5 3，身份证尾号：03 3 61   2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    padding: {
      type: String,
      value: '32rpx'
    },
    background: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    width: {
      type: Number,
      optionalTypes: [String],
      value: 64
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 30
    },
    color: {
      type: String,
      value: '#fff'
    },
    zIndex: {
      type: Number,
      value: 1001
    }
  },
  data: {
    timer: null,
    src: '',
    text: '',
    visible: false
  },
  lifetimes: {
    detached: function () {
      clearTimeout(this.data.timer);
      this.data.timer = null;
    }
  },
  methods: {
    show(options) {
      clearTimeout(this.data.timer);
      let {
        duration = 2000,
          src = '',
          text = ''
      } = options;
      this.setData({
        text: text,
        src: src
      }, () => {
        setTimeout(() => {
          this.visible = true;
          this.setData({
            visible: true
          })
          this.data.timer = setTimeout(() => {
            this.setData({
              visible: false
            })
            clearTimeout(this.data.timer);
            this.data.timer = null;
          }, duration);
        }, 50);
      })
    }
  }
})