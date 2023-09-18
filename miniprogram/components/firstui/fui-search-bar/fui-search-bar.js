// 本文件由FirstUI授权予杨方安（手机号：189 3 8631 5 9      3，身份证尾号：   1  84931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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
        this.setData({
          val: val
        })
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
    }
  },
  data: {
    isSearch: false,
    isFocus: false,
    val: ''
  },
  lifetimes: {
    attached: function () {
      this.setData({
        val: this.data.value
      })
      if (this.data.focus || this.data.val.length > 0) {
        this.setData({
          isSearch: true
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
      }
      this.triggerEvent('blur', e.detail);
    },
    onShowInput() {
      if (!this.data.disabled && this.data.showInput) {
        this.isSearch = true;
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
    }
  }
})