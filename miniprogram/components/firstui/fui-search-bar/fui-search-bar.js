// 本文件由FirstUI授权予闫弘宇（手机号：1  3  5100  01 55   3，身份证尾号： 0 33 61  2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    background: {
      type: String,
      value: ''
    },
    paddingTb: {
      type: Number,
      optionalTypes: [String],
      value: 16
    },
    paddingLr: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 72
    },
    radius: {
      type: Number,
      optionalTypes: [String],
      value: 8
    },
    color: {
      type: String,
      value: ''
    },
    inputBackground: {
      type: String,
      value: '#fff'
    },
    focus: {
      type: Boolean,
      value: false,
      observer(val) {
        setTimeout(() => {
          this.setData({
            isFocus: val
          })
        }, 50)
      }
    },
    placeholder: {
      type: String,
      value: '请输入搜索关键词'
    },
    isLeft: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: '',
      observer(val) {
        this.initValue(val)
      }
    },
    disabled: {
      type: Boolean,
      value: false
    },
    cancel: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    cancelColor: {
      type: String,
      value: '#7F7F7F'
    },
    searchText: {
      type: String,
      value: '搜索'
    },
    searchColor: {
      type: String,
      value: ''
    },
    showInput: {
      type: Boolean,
      value: true
    },
    showLabel: {
      type: Boolean,
      value: true
    },
    //v2.1.0
    fixed: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isSearch: false,
    isFocus: false,
    val: '',
    plholder: ''
  },
  lifetimes: {
    attached: function () {
      this.initValue(this.data.value)
      if(!this.data.showLabel || !this.data.fixed || this.data.focus || this.data.val){
        this.setData({
          plholder:this.data.placeholder
        })
			}
    },
    ready: function () {
      setTimeout(() => {
        this.setData({
          isFocus: this.data.focus
        })
      }, 120)
    }
  },
  methods: {
    initValue(value){
      this.setData({
        val: value
      })
      if (this.data.focus || this.data.val.length > 0) {
        this.setData({
          isSearch: true
        })
      }
    },
    clearInput() {
      this.setData({
        val: '',
        isFocus: false
      })
      wx.hideKeyboard()
      this.triggerEvent('clear');
    },
    inputFocus(e) {
      if (!this.data.showLabel) {
        this.setData({
          isSearch: true
        })
      }
      this.triggerEvent('focus', e.detail);
    },
    inputBlur(e) {
      this.setData({
        isFocus: false
      })
      if (!this.data.cancel && !this.data.val) {
        this.setData({
          isSearch: false
        })
        if(this.data.fixed && this.data.showLabel){
          this.setData({
            plholder:''
          })
        }
      }
      this.triggerEvent('blur', e.detail);
    },
    onShowInput() {
      if (!this.data.disabled && this.data.showInput) {
        if(this.data.fixed && this.data.showLabel){
          this.setData({
            plholder:this.data.placeholder
          })
        }
        this.setData({
          isSearch: true
        }, () => {
          this.setData({
            isFocus: true
          })
        })
      }
      this.triggerEvent('click', {});
    },

    hideInput() {
      if(this.data.fixed && this.data.showLabel){
        this.setData({
          plholder:''
        })
      }
      this.setData({
        isSearch: false,
        isFocus: false
      })
      wx.hideKeyboard()
      this.triggerEvent('cancel', {});
    },
    inputChange(e) {
      this.setData({
        val: e.detail.value
      })
      this.triggerEvent('input', e.detail);
    },
    search() {
      this.triggerEvent('search', {
        value: this.data.val
      });
    },
    reset() {
      this.setData({
        isSearch:false,
        isFocus:false,
        val:''
      })
      wx.hideKeyboard()
    }
  }
})