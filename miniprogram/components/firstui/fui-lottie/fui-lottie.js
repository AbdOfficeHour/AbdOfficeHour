// 本文件由FirstUI授权予闫弘宇（手机号：   1   35   1000155 3，身份证尾号：0 336    12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import lottieMp from './fui-lottie-mp.js'
const canvasId = `fui_lt_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
    width: {
      type: String,
      optionalTypes:[Number],
      value: 600,
      observer(){
        this.changeSize()
      }
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 400,
      observer(){
        this.changeSize()
      }
    },
    options: {
      type: Object,
      value:{
        path: '',
        animationData: '',
        autoplay: true,
        loop: true
      },
      observer(){
        if (!this.data.mpInitFlag) return;
				this.initMp();
      }
    },
    //动画操作，可取值 play、pause、stop、destroy
    action: {
      type: String,
      value: 'play',
      observer(val){
        this.data.actionVal = this.getAction(val)
        this.changeMpAction()
      }
    }
  },
  data: {
    canvasId,
    lottieW: 300,
    lottieH: 200,
    //可取值 play、pause、stop、destroy
    actionVal: '',
    aniMp:null,
    mpInitFlag:false
  },
  lifetimes:{
    attached:function(){
      this.changeSize()
    },
    ready:function(){
      this.data.actionVal = this.getAction(this.data.action)
			this.initMp()
    },
    detached:function(){
      this.data.aniMp = null;
    }
  },
  methods: {
    changeSize(){
      const sys=wx.getSystemInfoSync()
      const value = sys.windowWidth / 750
      this.setData({
        lottieW:value * Number(this.data.width),
        lottieH:value * Number(this.data.height)
      })
    },
    changeMpAction() {
      try {
        this.data.aniMp && this.data.aniMp[this.data.actionVal]()
      } catch (e) {
        //TODO handle the exception
      }
    },
    initMp() {
      const options = {
        ...this.data.options
      }
      if (!options.path && !options.animationData) return;
      this.data.aniMp && this.data.aniMp.destroy();
      setTimeout(() => {
        const query = wx.createSelectorQuery().in(this)
        query.selectAll(`.${this.data.canvasId}`).node(res => {
          const canvas = res[0].node;
          const context = canvas.getContext('2d');
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = this.data.lottieW * dpr;
          canvas.height = this.data.lottieH * dpr;
          context.scale(dpr, dpr);
          lottieMp.setup(canvas)

          this.data.aniMp = lottieMp.loadAnimation({
            loop: options.loop === undefined ? true : options.loop,
            autoplay: options.autoplay === undefined ? true : options.autoplay,
            //只支持网络地址
            path: options.path,
            animationData: options.animationData,
            rendererSettings: {
              context,
            },
          })
          this.data.mpInitFlag = true
          if(this.data.actionVal!=='play'){
            this.changeMpAction()
          }
        }).exec()
      },50);
    },
    getAction(action) {
      const actions = ['play', 'pause', 'stop', 'destroy']
      let val = 'play'
      if (~actions.indexOf(action)) {
        val = action
      }
      return val
    }
  }
})