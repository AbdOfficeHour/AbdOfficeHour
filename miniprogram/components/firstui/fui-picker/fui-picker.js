// 本文件由FirstUI授权予闫弘宇（手机号：13 5 1 000 1   5 5  3，身份证尾号：0 3   36 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    options: {
      type: Array,
      value: [],
      observer(val) {
        this.reset();
        setTimeout(() => {
          this.initialize()
        }, 50)
      }
    },
    layer: {
      type: Number,
      optionalTypes: [String],
      value: 1
    },
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        this.setData({
          isShow: val
        })
      }
    },
    value: {
      type: Array,
      optionalTypes: [String,Number],
      value: [],
      observer(vals) {
        if (vals) {
          this.setDefaultOptions()
        }
      }
    },
    linkage: {
      type: Boolean,
      value: false
    },
    fields: {
      type: Array,
      value: ['text', 'value', 'children'],
      observer(val) {
        this.reset();
        setTimeout(() => {
          this.initialize()
        }, 50)
      }
    },
    radius: {
      type: Boolean,
      value: false
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 520
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 16
    },
    color: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    titleSize: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    titleColor: {
      type: String,
      value: ''
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    confirmColor: {
      type: String,
      value: ''
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    cancelColor: {
      type: String,
      value: ''
    },
    btnSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    background: {
      type: String,
      value: ''
    },
    theme: {
      type: String,
      value: 'light'
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    maskBackground: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    zIndex: {
      type: Number,
      optionalTypes: [String],
      value: 1001
    },
    isClose: {
      type: Boolean,
      value: true
    },
    //自定义参数
    param: {
      type: Number,
      optionalTypes: [String],
      value: 0
    }
  },
  data: {
    firstArr: [],
    secondArr: [],
    thirdArr: [],
    fourthArr: [],
    vals: [0],
    darkStyle: 'background-image: -webkit-linear-gradient(top, rgba(35, 35, 35, .95), rgba(35, 35, 35, .6)), -webkit-linear-gradient(bottom, rgba(35, 35, 35, .95), rgba(35, 35, 35, .6));',
    indicatorStyl: 'border-color: #333;height: 44px;',
    tKey: 'text',
    vKey: 'value',
    cKey: 'children',
    isEnd: true,
    isShow: false
  },
  lifetimes: {
    attached: function () {
      this.initialize()
      this.setData({
        isShow: this.data.show
      })
    }
  },
  methods: {
    initialize() {
      if (this.data.linkage) {
        this.getFields(this.data.fields)
        this.setLayerData(-1, 0, 0, 0);
      } else {
        this.initData()
      }
      if (wx.canIUse("nextTick")) {
        wx.nextTick(() => {
          setTimeout(() => {
            this.setDefaultOptions()
          }, 50)
        })
      } else {
        setTimeout(() => {
          this.setDefaultOptions()
        }, 100)
      }
    },
    getFields(vals) {
      if (!vals || vals.length === 0) return;
      this.setData({
        tKey: vals[0] || 'text',
        vKey: vals[1] || 'value',
        cKey: vals[2] || 'children'
      })
    },
    btnCancel(e) {
      this.setData({
        isShow: false
      })
      this.triggerEvent('cancel', {
        param: this.data.param
      })
    },
    maskClick(e) {
      if (!this.data.maskClosable) return;
      this.btnCancel(e)
    },
    getValue(layer = 1) {
      let vals = this.data.vals;
      let result = {}
      if (this.data.linkage) {
        let data = this.data.options;
        const cKey = this.data.cKey;
        if (layer == 1) {
          result = data[vals[0]]
        } else if (layer == 2) {
          if (data[vals[0]][cKey])
            result = data[vals[0]][cKey][vals[1]]

        } else if (layer == 3) {
          if (data[vals[0]][cKey] && data[vals[0]][cKey][vals[1]][cKey])
            result = data[vals[0]][cKey][vals[1]][cKey][vals[2]]

        } else {
          if (data[vals[0]][cKey] && data[vals[0]][cKey][vals[1]][cKey] && data[vals[0]][cKey][vals[1]][cKey]
            [vals[2]][cKey])
            result = data[vals[0]][cKey][vals[1]][cKey][vals[2]][cKey][vals[3]]
        }
      } else {
        if (layer == 1) {
          result = this.data.firstArr[vals[0]] || ''
        } else if (layer == 2) {
          result = this.data.secondArr[vals[1]] || ''
        } else if (layer == 3) {
          result = this.data.thirdArr[vals[2]] || ''
        } else {
          result = this.data.fourthArr[vals[3]] || ''
        }
      }

      return result;
    },
    checkChildrenData(data, layer, first, second, third) {
      let arr = [];
      const children = this.data.cKey;
      if (layer == 1) {
        if (data[first])
          arr = data[first][children] || [];
      } else if (layer == 2) {
        if (data[first] && data[first][children] && data[first][children][second])
          arr = data[first][children][second][children] || [];
      } else {
        if (data[first] && data[first][children] && data[first][children][second] && data[first][children][
            second
          ][children] && data[first][children][second][children][third])
          arr = data[first][children][second][children][third][children] || [];
      }
      return arr;
    },
    handleData(data, tKey) {
      tKey = tKey || this.data.tKey;
      let arr = [];
      if (data && data.length > 0) {
        for (let item of data) {
          arr.push(item[tKey]);
        }
      }
      return arr;
    },
    initData() {
      let data = this.data.options;
      if (!data || data.length === 0){
        this.setData({
          firstArr: [],
          secondArr: [],
          thirdArr: [],
          fourthArr: []
        })
        return;
      }
      if (this.data.layer == 1 && !Array.isArray(data[0])) {
        this.setData({
          firstArr: data
        })
      } else {
        this.setData({
          firstArr: data[0]
        })
      }
      if (this.data.layer == 2) {
        this.setData({
          secondArr: data[1]
        })
      } else if (this.data.layer == 3) {
        this.setData({
          secondArr: data[1],
          thirdArr: data[2]
        })
      } else if (this.data.layer == 4) {
        this.setData({
          secondArr: data[1],
          thirdArr: data[2],
          fourthArr: data[3]
        })
      }
    },
    setLayerData(reset, first, second, third) {
      let data = this.data.options;
      if (!data || data.length === 0) return;
      if (this.data.layer == 1) {
        this.setData({
          firstArr: this.handleData(data)
        })
      } else if (this.data.layer == 2) {
        if (reset == -1) {
          this.setData({
            firstArr: this.handleData(data),
            secondArr: this.handleData(this.checkChildrenData(data, 1, first))
          })
        } else {
          this.setData({
            secondArr: this.handleData(this.checkChildrenData(data, 1, first))
          })
        }
      } else if (this.data.layer == 3) {
        if (reset == -1) {
          this.setData({
            firstArr: this.handleData(data)
          })
        }
        if (reset == 1 || reset == -1) {
          this.setData({
            secondArr: this.handleData(this.checkChildrenData(data, 1, first))
          })
        }
        this.setData({
          thirdArr: this.handleData(this.checkChildrenData(data, 2, first, second))
        })
      } else {
        if (reset == -1) {
          this.setData({
            firstArr: this.handleData(data)
          })
        }

        if (reset == 1 || reset == -1) {
          this.setData({
            secondArr: this.handleData(this.checkChildrenData(data, 1, first))
          })
        }

        if (reset == 1 || reset == -1 || reset == 2) {
          this.setData({
            thirdArr: this.handleData(this.checkChildrenData(data, 2, first, second))
          })
        }
        this.setData({
          fourthArr: this.handleData(this.checkChildrenData(data, 3, first, second, third))
        })
      }
    },
    reset() {
      let vals = [
        [0],
        [0, 0],
        [0, 0, 0],
        [0, 0, 0, 0]
      ][Number(this.data.layer) - 1]
      this.setData({
        vals: vals
      })
    },
    open() {
      this.setData({
        isShow: true
      })
    },
    close() {
      this.setData({
        isShow: false
      })
    },
    setDefaultOptions() {
      let values = this.data.value;
      if (this.data.layer == 1 && !Array.isArray(values)) {
        values = [values]
      }
      let vals = [];
      let txtArr = this.data.firstArr;
      const len = values.length;
      const index = txtArr.indexOf(values[0])
      if (len > 0 && index !== -1) {
        vals.push(index)
        for (let i = 1; i < len; i++) {
          if (i === 1) {
            if (this.data.linkage) {
              this.setData({
                secondArr: this.handleData(this.checkChildrenData(this.data.options, 1, vals[0]))
              })
            }
            vals.push(this.data.secondArr.indexOf(values[i]))
          } else if (i === 2) {
            if (this.data.linkage) {
              this.setData({
                thirdArr: this.handleData(this.checkChildrenData(this.data.options, 2, vals[0], vals[1]))
              })
            }
            vals.push(this.data.thirdArr.indexOf(values[i]))
          } else {
            if (this.data.linkage) {
              this.setData({
                fourthArr: this.handleData(this.checkChildrenData(this.data.options, 3, vals[0], vals[1], vals[2]))
              })
            }
            vals.push(this.data.fourthArr.indexOf(values[i]))
          }
        }
        setTimeout(()=>{
          this.setData({
            vals: vals
          })
        }, 50)
      } else {
        this.reset()
      }
    },
    setOneLayers(value) {
      if (this.data.vals[0] != value[0]) {
        this.setData({
          vals: value
        })
      }
    },
    setTwoLayers(value) {
      if (this.data.vals[0] != value[0]) {
        this.setLayerData(0, value[0])
        this.setData({
          vals: [value[0], 0]
        })
      } else {
        this.setData({
          vals: value
        })
      }
    },
    setThreeLayers(value) {
      if (this.data.vals[0] != value[0]) {
        this.setLayerData(1, value[0], 0)
        this.setData({
          vals: [value[0], 0, 0]
        })
      } else if (this.data.vals[1] != value[1]) {
        this.setLayerData(0, value[0], value[1])
        this.setData({
          vals: [value[0], value[1], 0]
        })
      } else {
        this.setData({
          vals: value
        })
      }
    },
    setFourLayers(value) {
      if (this.data.vals[0] != value[0]) {
        this.setLayerData(1, value[0], 0, 0)
        this.setData({
          vals: [value[0], 0, 0, 0]
        })
      } else if (this.data.vals[1] != value[1]) {
        this.setLayerData(2, value[0], value[1], 0)
        this.setData({
          vals: [value[0], value[1], 0, 0]
        })
      } else if (this.data.vals[2] != value[2]) {
        this.setLayerData(0, value[0], value[1], value[2])
        this.setData({
          vals: [value[0], value[1], value[2], 0]
        })
      } else {
        this.setData({
          vals: value
        })
      }
    },
    emitChange() {
      let text = [];
      let value = [];
      let result = '';
      if (this.data.options.length > 0) {
        if (this.data.layer == 1) {
          const vals = this.getValue()
          if (this.data.linkage) {
            text = vals[this.data.tKey];
            value = vals[this.data.vKey];
          } else {
            text = vals;
            value = vals;
          }
          result = text;
        } else if (this.data.layer == 2) {
          const vals = this.getValue();
          const vals2 = this.getValue(2);
          if (this.data.linkage) {
            text = [vals[this.data.tKey], vals2[this.data.tKey] || ''];
            value = [vals[this.data.vKey], vals2[this.data.vKey] || ''];
          } else {
            text = [vals, vals2 || ''];
            value = [vals, vals2 || ''];
          }
          result = text.join('');
        } else if (this.data.layer == 3) {
          const vals = this.getValue();
          const vals2 = this.getValue(2);
          const vals3 = this.getValue(3);
          if (this.data.linkage) {
            text = [vals[this.data.tKey], vals2[this.data.tKey] || '', vals3[this.data.tKey] || ''];
            value = [vals[this.data.vKey], vals2[this.data.vKey] || '', vals3[this.data.vKey] || ''];
          } else {
            text = [vals, vals2 || '', vals3 || ''];
            value = [vals, vals2 || '', vals3 || ''];
          }
          result = text.join('');
        } else {
          const vals = this.getValue();
          const vals2 = this.getValue(2);
          const vals3 = this.getValue(3);
          const vals4 = this.getValue(4);
          if (this.data.linkage) {
            text = [vals[this.data.tKey], vals2[this.data.tKey] || '', vals3[this.data.tKey] || '', vals4[this.data.tKey] ||
              ''
            ];
            value = [vals[this.data.vKey], vals2[this.data.vKey] || '', vals3[this.data.vKey] || '', vals4[this.data.vKey] ||
              ''
            ];
          } else {
            text = [vals, vals2 || '', vals3 || '', vals4 || ''];
            value = [vals, vals2 || '', vals3 || '', vals4 || ''];
          }
          result = text.join('');
        }
      }

      this.triggerEvent('change', {
        text: text,
        value: value,
        index: this.data.vals,
        result: result,
        param: this.data.param
      })
    },
    waitForTrigger() {
      if (this.data.isEnd) {
        this.emitChange()
      } else {
        setTimeout(() => {
          this.waitForTrigger()
        }, 50)
      }
    },
    btnConfirm(e) {
      setTimeout(() => {
        if(this.data.isClose){
          this.setData({
            isShow: false
          })
        }
        this.waitForTrigger()
      }, 50)
    },
    pickerChange(e) {
      let value = e.detail.value;
      if (this.data.linkage) {
        if (this.data.layer == 1) {
          this.setOneLayers(value)
        } else if (this.data.layer == 2) {
          this.setTwoLayers(value)
        } else if (this.data.layer == 3) {
          this.setThreeLayers(value)
        } else {
          this.setFourLayers(value)
        }
      } else {
        this.setData({
          vals: value
        })
      }
      this.setData({
        isEnd: true
      })
    },
    pickerstart() {
      this.setData({
        isEnd: false
      })
    },
    stop(e) {}
  }
})