// 本文件由FirstUI授权予杨方安（手机号：1 8 9 38  6  3 1  593，身份证尾号： 1 8  4 931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    previewData: {
      type: Object,
      value: {},
      observer(val) {
        this.initData(val)
      }
    },
    fields: {
      type: Object,
      value: {},
      observer(val) {
        this.handleFileds()
      }
    },
    background: {
      type: String,
      value: ''
    },
    marginTop: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    marginBottom: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    //左右间距
    padding: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    labelWidth: {
      type: Number,
      optionalTypes:[String],
      value: 0
    },
    //left / right / justify
    labelAlign: {
      type: String,
      value: 'left'
    },
    labelColor: {
      type: String,
      value: ''
    },
    hdLabelSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    hdValSize: {
      type: Number,
      optionalTypes: [String],
      value: 36
    },
    hdValColor: {
      type: String,
      value: ''
    },
    bdSize: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    bdColor: {
      type: String,
      value: ''
    },
    btnSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    //按钮是否有点击效果
    highlight: {
      type: Boolean,
      value: true
    },
    hdLeft: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    hdRight: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    //是否需要preview外层上下线条
    isBorder: {
      type: Boolean,
      value: true
    },
    borderColor: {
      type: String,
      value: ''
    }
  },
  data: {
    pvd: {},
    label:'label',
    value:'value',
    list:'list',
    lColor:'labelColor',
    valueColor:'valueColor',
    buttons:'buttons',
    text: 'text',
    color: 'color'
  },
  lifetimes: {
    attached: function () {
      this.initData(this.data.previewData)
    }
  },
  methods: {
    handleFileds(callback) {
      const fields = this.data.fields
      if (fields&& typeof fields === 'object') {
        this.setData({
          label:fields.label || 'label',
          value:fields.value || 'value',
          list:fields.list || 'list',
          lColor:fields.labelColor || 'labelColor',
          valueColor:fields.valueColor || 'valueColor',
          buttons:fields.buttons || 'buttons',
          text:fields.text || 'text',
          color:fields.color || 'color'
        },()=>{
          callback && callback()
        })
      }
    },
    initData(val) {
      this.handleFileds(()=>{
        val = val || {};
        val[this.data.list] = val[this.data.list] || [];
        val[this.data.buttons] = val[this.data.buttons] || [];
        this.setData({
          pvd: val
        })
      })
    },
    handleClick(e) {
      let idx = Number(e.currentTarget.dataset.index)
      let params = this.data.pvd[this.data.buttons][idx] || {}
      this.triggerEvent('click', {
        index: idx,
        ...params
      })
    }
  }
})