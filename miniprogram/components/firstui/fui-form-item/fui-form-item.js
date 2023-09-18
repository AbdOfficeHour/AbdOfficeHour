// 本文件由FirstUI授权予闫弘宇（手机号：  135    100 0  1 553，身份证尾号：   03 3 612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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
			//标题字体大小
			labelSize: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			labelColor: {
				type: String,
				value: ''
			},
			//label宽度 rpx
			labelWidth: {
        type: String,
        optionalTypes:[Number],
				value: 0
			},
			labelRight: {
        type: String,
        optionalTypes:[Number],
				value: 30
			},
			//label 对齐方式：left，right
			labelAlign: {
				type: String,
				value: ''
      },
      //V1.9.8+
			labelWeight: {
				type: String,
        optionalTypes:[Number],
				value: 0
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
			//left,right
			asteriskPosition: {
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
    lWidth: 160,
    lAlign: '',
    lWeight: 400,
    akColor: '#FF2B2B',
    akPosi: '',
    akPosiLeft:'12rpx'
  },
  methods: {
    getAkPosi() {
      const akPosi = this.data.akPosi;
      const lWidth = this.data.lWidth
      const lRight = this.data.labelRight
      const pr = this.data.padding
      let pdr = 0;
      if(pr){
        const pLeft=pr.split(' ')[0]
        pdr = pLeft.replace('rpx', '').replace('px', '')
      }
      const akPosiLeft= akPosi === 'right' ? `${Number(lWidth) + Number(pdr || 0) - Number(lRight || 0)}rpx` : '12rpx'
      this.setData({
        akPosiLeft
      })
    },
    init(){
      const form = this.data.form;
      const dangerColor = (wx.$fui && wx.$fui.color.danger) || '#FF2B2B'
      this.setData({
        lSize: this.data.labelSize || (form && form.data.labelSize) || 32,
        lColor: this.data.labelColor || (form && form.data.labelColor) || '#333',
        lWidth: this.data.labelWidth || (form && form.data.labelWidth) || 160,
        akColor: this.data.asteriskColor || (form && form.data.asteriskColor) || dangerColor,
        lAlign:this.data.labelAlign || (form && form.data.labelAlign) || 'left',
        lWeight: this.data.labelWeight || (form && form.data.labelWeight) || 400,
        akPosi:this.data.asteriskPosition || (form && form.data.asteriskPosition) || 'left'
      },()=>{
        this.getAkPosi()
      })
    },
    handleClick() {
      this.triggerEvent('click', {
        param: this.data.param
      });
    }
  }
})