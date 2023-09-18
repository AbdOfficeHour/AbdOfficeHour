// 本文件由FirstUI授权予闫弘宇（手机号：  13510     0  01 553，身份证尾号：  03 3 6 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: '确定'
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: '#fff'
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 32
    },
    fontWeight: {
      type: String,
      optionalTypes: [Number],
      value: 600
    },
    disabled: {
      type: Boolean,
      value: false
    },
    name: {
      type: String,
      value: 'backspace-fill'
    },
    decimal: {
      type: Boolean,
      value: false,
      observer(val) {
        this.initData()
      }
    },
    spareKey: {
      type: String,
      value: '',
      observer(val) {
        this.initData()
      }
    },
    spareSize: {
      type: String,
      optionalTypes: [Number],
      value: 32
    },
    theme: {
      type: String,
      value: 'light'
    },
    zIndex: {
      type: String,
      optionalTypes: [Number],
      value: 1001
    }
  },
  data: {
    items: [{
      id: 'dk_1',
      keys: ['1', '2', '3']
    }, {
      id: 'dk_2',
      keys: ['4', '5', '6']
    }, {
      id: 'dk_3',
      keys: ['7', '8', '9']
    }, {
      id: 'dk_4',
      keys: ['', '0', '']
    }]
  },
  lifetimes: {
    attached: function () {
      this.initData()
    }
  },
  methods: {
    initData() {
      let keyArr = [...this.data.items];
      let sk = this.data.spareKey.toString()
      keyArr[3].keys[0] = sk && sk !== 'true' && sk !== 'undefined' ? sk : ''
      keyArr[3].keys[2] = this.data.decimal ? '.' : ''
      this.setData({
        items: keyArr
      })
    },
    keyClick(e) {
      let dataset = e.currentTarget.dataset;
      let index = Number(dataset.index);
      let idx = Number(dataset.idx);
      let val = dataset.val
      if (!this.data.show || !val) return;
      if (index === 3 && idx === 0) {
        this.triggerEvent('spare', {
          value: val
        })
      } else {
        this.triggerEvent('click', {
          value: val
        })
      }
    },
    backspace() {
      if (!this.data.show) return;
      this.triggerEvent('backspace', {})
    },
    confirm() {
      if (this.data.disabled || !this.data.show) return;
      this.triggerEvent('confirm', {})
    }
  }
})