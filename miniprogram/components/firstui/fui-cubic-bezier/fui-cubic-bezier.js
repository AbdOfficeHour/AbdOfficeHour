// 本文件由FirstUI授权予杨方安（手机号：   189  38 63  1 59 3，身份证尾号： 18    4931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    direction: {
      type: String,
      value: 'lb'
    },
    top: {
      type: String,
      optionalTypes:[Number],
      value: 100
    },
    bottom: {
      type: String,
      optionalTypes:[Number],
      value: 100
    },
    left: {
      type: String,
      optionalTypes:[Number],
      value: 60
    },
    right: {
      type: String,
      optionalTypes:[Number],
      value: 60
    },
    param: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  data: {
    time: 0,
    animate: false,
    width: 375,
    height: 1334,
    style_x: '',
    style_y: ''
  },
  lifetimes:{
    attached:function(){
      let sys = wx.getSystemInfoSync()
      this.setData({
        width:sys.windowWidth,
        height:sys.windowHeight
      })
    }
  },
  methods: {
    handleClick(e) {
      if (new Date().getTime() - this.data.time <= 550) return;
      this.data.time = new Date().getTime();
      setTimeout(() => {
        this.data.time = 0;
      }, 540);
      this.cbAni(e);
      this.triggerEvent('click', {
        param: this.data.param
      });
    },
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    cbAni(e) {
      let touch = e.touches[0];
      let diff = {
        x: 0,
        y: 0
      };
      //rt 右上、rb 右下、lb 左下、lt 左上
      switch (this.data.direction) {
        case 'rt':
          diff.x = this.data.width - touch.clientX - this.rpx2px(Number(this.data.right));
          diff.y = this.rpx2px(Number(this.data.top)) - touch.clientY;
          break;
        case 'rb':
          diff.x = this.data.width - touch.clientX - this.rpx2px(Number(this.data.right));
          diff.y = this.data.height - touch.clientY - this.rpx2px(Number(this.data.bottom));
          break;
        case 'lb':
          diff.x = this.rpx2px(Number(this.data.left)) - touch.clientX;
          diff.y = this.data.height - touch.clientY - this.rpx2px(Number(this.data.bottom));
          break;
        case 'lt':
          diff.x = this.rpx2px(Number(this.data.left)) - touch.clientX;
          diff.y = this.rpx2px(Number(this.data.top)) - touch.clientY;
          break;
        default:
          break;
      }

      //移动距离
      this.setData({
        animate:true
      },()=>{
        setTimeout(() => {
          this.setData({
            style_x:`transform:translate3d(${diff.x}px,0,0)`,
            style_y:`transform:translate3d(0,${diff.y}px,0)`
          })
          setTimeout(() => {
            this.setData({
              animate:false,
              style_x:'',
              style_y:''
            })
          }, 540);
        }, 50)
      })
    }
  }
})