// 本文件由FirstUI授权予杨方安（手机号：1 8  93 8 6315 9    3，身份证尾号：1  84 9  31）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    scrollTop: {
      type: String,
      optionalTypes:[Number],
      value: 0,
      observer(val){
        this.scrollChange();
      }
    },
    threshold: {
      type: String,
      optionalTypes:[Number],
      value: 320
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 80
    },
    bottom: {
      type: String,
      optionalTypes:[Number],
      value: 160
    },
    right: {
      type: String,
      optionalTypes:[Number],
      value: 40
    },
    background: {
      type: String,
      value: '#FFFFFF'
    },
    name: {
      type: String,
      value: 'top'
    },
    color: {
      type: String,
      value: '#333333'
    },
    custom: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isShow: false,
		visible: true
  },
  methods: {
    goBacktop: function() {
      this.setData({
        visible:false
      })
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 120
      });
      setTimeout(() => {
        this.setData({
          visible:true
        })
      }, 220);
      this.triggerEvent('click', {})
    },
    scrollChange() {
      let show = this.data.scrollTop > this.data.threshold;
      if ((show && this.data.isShow) || (!show && !this.data.isShow)) return;
      this.setData({
        isShow:show
      })
    }
  }
})