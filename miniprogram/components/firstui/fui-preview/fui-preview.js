// 本文件由FirstUI授权予闫弘宇（手机号：1   3510  00  1 55  3，身份证尾号： 0   3 3612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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
    //V1.9.9+
    labelRight: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    hdLabelSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    //V1.9.9+
    hdLabelWidth: {
      type: Number,
      optionalTypes: [String],
      value: 0
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
    //V1.9.9+ 内容对齐方式：left、right
    bdAlign: {
      type: String,
      default: 'right'
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
    },
    itemClick(e) {
      let idx = Number(e.currentTarget.dataset.index)
      this.triggerEvent('valueClick', {
        index:idx,
        item: this.data.pvd[this.data.list][idx]
      })
    },
    setValue(index, value) {
      const idx = Number(index)
      if (idx || idx === 0) {
        const data = JSON.parse(JSON.stringify(this.data.pvd))
        const item = data[this.data.list][idx]
        item[this.data.value] = value;
        this.setData({
          pvd: data
        })
      }
    }
  }
})