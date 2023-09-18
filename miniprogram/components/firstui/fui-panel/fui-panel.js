// 本文件由FirstUI授权予闫弘宇（手机号：1 351 00  0      1553，身份证尾号：0 3   36 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    //面板数据
    panelData: {
      type: Object,
      value: {},
      observer(val){
        this.initData(val)
      }
    },
    fields: {
      type: Object,
      value: {},
      observer(val){
        this.handleFileds()
      }
    },
    background: {
      type: String,
      value: ''
    },
    //是否有点击效果
    highlight: {
      type: Boolean,
      value: true
    },
    flexStart: {
      type: Boolean,
      value: false
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
    hdBorder: {
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
    hdBackground: {
      type: String,
      value: '#fff'
    },
    headSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    headColor: {
      type: String,
      value: ''
    },
    bdBorder: {
      type: Boolean,
      value: true
    },
    bdLeft: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    bdRight: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    //图片宽度
    width: {
      type: Number,
      optionalTypes: [String],
      value: 120
    },
    //图片高度
    height: {
      type: Number,
      optionalTypes: [String],
      value: 120
    },
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    color: {
      type: String,
      value: ''
    },
    fontWeight: {
      type: String,
      optionalTypes: [Number],
      value: 'normal'
    },
    descSize: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    descColor: {
      type: String,
      value: ''
    },
    infoSize: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    infoColor: {
      type: String,
      value: ''
    },
    //是否需要panel外层上下线条
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
    listData: [],
    head: 'head',
    list: 'list',
    src: 'src',
    title: 'title',
    desc: 'desc',
    source: 'source',
    time: 'time',
    extra: 'extra'
  },
  lifetimes: {
    attached: function () {
      this.initData(this.data.panelData)
    }
  },
  methods: {
    handleFileds(callback) {
      const fields=this.data.fields
      if (fields && typeof fields === 'object') {
        this.setData({
          head:fields.head || 'head',
          list:fields.list || 'list',
          src:fields.src || 'src',
          title:fields.title || 'title',
          desc:fields.desc || 'desc',
          source:fields.source || 'source',
          time:fields.time || 'time',
          extra:fields.extra || 'extra'
        },()=>{
          callback && callback()
        })
      }
    },
    initData(val) {
      this.handleFileds(()=>{
        val = val || {};
        let list = val[this.data.list] && [...val[this.data.list]]
        if (val[this.data.list] && Array.isArray(list)) {
          this.setData({
            listData: list
          })
        } else {
          this.setData({
            listData: [val]
          })
        }
      })
    },
    handleClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      this.triggerEvent('click', {
        index: index,
        ...this.data.listData[index]
      })
    }
  }
})