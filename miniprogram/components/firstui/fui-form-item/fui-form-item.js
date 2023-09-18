// 本文件由FirstUI授权予杨方安（手机号： 189  3 8  63 1  5 93，身份证尾号： 1 8 4 93 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  options:{
    multipleSlots:true
  },
  properties: {
    //padding值
			padding: {
				type: String,
				value:'28rpx 32rpx'
			},
			//margin-top 单位rpx
			marginTop: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			//margin-bottom 单位rpx
			marginBottom: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			//标签文本
			label: {
				type: String,
				value: ''
			},
			//标题字体大小 默认使用全局设置值
			labelSize: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			labelColor: {
				type: String,
				value: ''
			},
			//label宽度 rpx 默认使用全局设置值
			labelWidth: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			//默认使用全局设置值
			labelRight: {
        type: String,
        optionalTypes:[Number],
				value: 16
			},
			//是否显示必填的红色星号
			asterisk: {
				type: Boolean,
				value: false
			},
			asteriskColor: {
				type: String,
				value: ''
			},
			background: {
				type: String,
				value: '#fff'
			},
			highlight: {
				type: Boolean,
				value: false
			},
			arrow: {
				type: Boolean,
				value: false
			},
			arrowColor: {
				type: String,
				value: '#B2B2B2'
			},
			bottomBorder: {
				type: Boolean,
				value: true
			},
			borderColor: {
				type: String,
				value: '#EEEEEE'
			},
			//下边框left值，单位rpx
			left: {
        type: String,
        optionalTypes:[Number],
				value: 32
			},
			//下边框right值，单位rpx
			right: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			radius: {
				type: String,
				value: '0'
			},
			param: {
        type: String,
        optionalTypes:[Number],
				value: 0
			}

  },
  relations: {
    '../fui-form/fui-form': {
      type: 'ancestor',
      linked: function (target) {
        this.data.form = target
        this.init()
      }
    }
  },
  data:{
    form:null,
    lSize: 32,
    lColor: '#333',
    lWidth: 140,
    akColor: '#FF2B2B'
  },
  methods: {
    init(){
      const form = this.data.form;
      this.setData({
        lSize: this.data.labelSize || form.data.labelSize || 32,
        lColor: this.data.labelColor || form.data.labelColor || '#333',
        lWidth: this.data.labelWidth || form.data.labelWidth || 140,
        akColor: this.data.asteriskColor || form.data.asteriskColor || '#FF2B2B'
      })
    },
    handleClick() {
      this.triggerEvent('click', {
        param: this.data.param
      });
    }
  }
})