// 本文件由FirstUI授权予闫弘宇（手机号：1  3510   0 0 1   553，身份证尾号：03   36 1 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    options: {
      type: Array,
      value:[],
      observer(vals){
        this.initData(vals)
      }
    },
    value: {
      type: Array,
      optionalTypes:[String,Number],
      value:[],
      observer(vals){
        this.modelChange(vals)
      }
    },
    multiple: {
      type: Boolean,
      value: false
    },
    min: {
      type: String,
      optionalTypes:[Number],
      value: 1
    },
    //最小选择数，仅多选有效
    multipleMin: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //最大选择数
    max: {
      type: String,
      optionalTypes:[Number],
      value: -1
    },
    width: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    padding: {
      type: String,
      value:'16rpx 32rpx'
    },
    gap: {
      type: String,
      optionalTypes:[Number],
      value: 20
    },
    radius: {
      type: String,
      optionalTypes:[Number],
      value: 6
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 24
    },
    color: {
      type: String,
      value: '#333'
    },
    activeColor: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: '#fff'
    },
    activeBgColor: {
      type: String,
      value: '#fff'
    },
    //默认边框颜色
    defaultBorderColor:{
      type: String,
      value: ''
    },
    borderColor: {
      type: String,
      value: ''
    },
    //设为true时，圆角值不建议设过大
    mark: {
      type: Boolean,
      value: false
    },
    markSize: {
      type: String,
      optionalTypes:[Number],
      value: 52
    },
    markColor: {
      type: String,
      value: ''
    }
  },
  lifetimes:{
    attached:function(){
      this.initData(this.data.options)
    }
  },
  data: {
    icon: '\ue600',
    dataList: [],
    val: '',
    vals: [],
    primaryColor: (wx.$fui && wx.$fui.color.primary) || '#465CFF'
  },
  methods: {
    initData(vals) {
      vals = JSON.parse(JSON.stringify(vals))
      if (vals && vals.length > 0) {
        if (typeof vals[0] !== 'object') {
          vals = vals.map((item, index) => {
            return {
              text: item,
              value: item,
              selected: false
            }
          })
        } else {
          vals.map((item, index) => {
            item.selected = false
            if (item.value === undefined) {
              item.value = item.text
            }
          })
        }
        this.setData({
          dataList:vals
        })
        this.modelChange(this.data.value)
      }
    },
    emitsChange(e) {
      this.triggerEvent('change', e)
      let val = Array.isArray(e.value) ? JSON.stringify(e.value) : e.value
      this.setData({
        value: val
      })
    },
    radioChange(index, model) {
      let min = Number(this.data.min)
      if (this.data.val === model.value && min > 0) return;
      let val = '';
      let i = index
      let entity = {}
      this.data.dataList.forEach((item, idx) => {
        if (idx === index) {
          const bool = this.data.val === item.value && min <= 0
          val = bool ? '' : item.value
          i = bool ? -1 : index
          entity = bool ? {} : item
          item.selected = bool ? false : true
        } else {
          item.selected = false
        }
      })
      this.setData({
        val:val,
        dataList: this.data.dataList
      })
      let e = {
        index: i,
        value: val,
        item: entity
      }
      this.emitsChange(e)
    },
    checkboxChange(index, model) {
      const min = Number(this.data.multipleMin)
      const max = Number(this.data.max)
      let vals = this.data.vals
      let i = vals.indexOf(model.value)
      if (vals.length <= min && i !== -1) {
        wx.showToast({
          title: `至少选择${min}个选项`,
          icon: 'none'
        })
        return
      }
      const isAllIndex = this.data.dataList.findIndex(item => item.isAll)
      let item = this.data.dataList[index]

      if (isAllIndex !== -1) {
        if (model.isAll) {
          item.selected = i !== -1 ? false : true
          if (item.selected) {
            vals = [model.value]
          } else {
            vals.splice(i, 1)
          }
          this.data.dataList.forEach((item, idx) => {
            if (index !== idx) {
              item.selected = false
            }
          })
        } else {
          if (vals.length >= max && max !== -1 && i === -1) {
            wx.showToast({
              title: `最多只能选择${max}个选项`,
              icon: 'none'
            })
            return
          }
          let entity = this.data.dataList[isAllIndex]
          const allI = vals.indexOf(entity.value)
          if (allI !== -1) {
            entity.selected = false;
            vals.splice(allI, 1)
          }
          this.data.dataList.forEach((item, idx) => {
            if (index === idx) {
              item.selected = i !== -1 ? false : true
              if (item.selected) {
                vals.push(item.value)
              } else {
                vals.splice(i, 1)
              }
            }
          })
        }
      } else {
        if (vals.length >= max && max !== -1 && i === -1) {
          wx.showToast({
            title: `最多只能选择${max}个选项`,
            icon: 'none'
          })
          return
        }
        item.selected = i !== -1 ? false : true
        if (item.selected) {
          vals.push(item.value)
        } else {
          vals.splice(i, 1)
        }
      }
      this.setData({
        vals:vals,
        dataList: this.data.dataList
      })
      const entity = this.data.dataList.filter(item => vals.indexOf(item.value) != -1)
      let e = {
        value: vals,
        item: entity
      }
      this.emitsChange(e)
    },
    modelChange(vals) {
      if (this.data.multiple) {
        vals = typeof vals === 'string' ? JSON.parse(vals) : vals;
        this.data.dataList.forEach(item => {
          if (vals.includes(item.value)) {
            item.selected = true;
          } else {
            item.selected = false
          }
        })
        this.setData({
          vals:vals,
          dataList:this.data.dataList
        })

      } else {
        this.data.dataList.forEach(item => {
          if (vals == item.value) {
            item.selected = true;
          } else {
            item.selected = false
          }
        })
        this.setData({
          val:vals,
          dataList:this.data.dataList
        })
      }
    },
    handleClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      let item = this.data.dataList[index]
      if (item.disable) return;
      if (this.data.multiple) {
        this.checkboxChange(index, item)
      } else {
        this.radioChange(index, item)
      }
    }
  }
})