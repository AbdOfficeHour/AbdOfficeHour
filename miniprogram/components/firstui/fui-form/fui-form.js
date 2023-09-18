// 本文件由FirstUI授权予杨方安（手机号： 1 8 9 3 86 3 15  9 3，身份证尾号：  1 8493  1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import form from './fui-validator.js'
Component({
  properties: {
    //表单padding值
    padding: {
      type: String,
      value: "0"
    },
    //是否显示校验错误信息
    show: {
      type: Boolean,
      value: true
    },
    //是否禁用该表单内的所有组件,透明遮罩层
    disabled: {
      type: Boolean,
      value: false
    },
    //提示框top值 px
    top: {
      type: Number,
      optionalTypes: [String],
      value: 0
    },
    left: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    right: {
      type: Number,
      optionalTypes: [String],
      value: 24
    },
    //错误提示框背景色
    background: {
      type: String,
      value: ''
    },
    //错误提示字体大小
    size: {
      type: Number,
      optionalTypes: [String],
      value: 28
    },
    //错误提示字体颜色
    color: {
      type: String,
      value: '#fff'
    },
    //错误提示框圆角值
    radius: {
      type: String,
      optionalTypes: [Number],
      value: 16
    },
    //错误消息显示时间 ms
    duration: {
      type: Number,
      value: 2000
    },
    //form-item标题字体大小 默认使用全局设置值
    labelSize: {
      type: String,
      optionalTypes:[Number],
      value: 32
    },
    labelColor: {
      type: String,
      value: '#333'
    },
    //form-item label宽度,单位rpx 默认使用全局设置值
    labelWidth: {
      type: String,
      optionalTypes:[Number],
      value: 140
    },
    // form-item 必填项星号颜色
    asteriskColor: {
      type: String,
      value: '#FF2B2B'
    }
  },
  relations: {
    '../fui-form-item/fui-form-item': {
      type: 'descendant'
    }
  },
  data: {
    errorMsg: '',
    timer: null
  },
  lifetimes: {
    detached: function () {
      this.clearTimer()
    }
  },
  methods: {
    clearTimer() {
      clearTimeout(this.data.timer)
      this.data.timer = null;
    },
   /*
			 @param model 表单数据对象
			 @param rules 表单验证规则
			 @param checkAll 校验所有元素
			*/
    validator(model, rules, checkAll = false) {
      return new Promise((resolve, reject) => {
        try {
          let res = form.validator(model, rules, checkAll);
          if (!res.isPassed && this.data.show) {
            this.clearTimer()
            let errors = res.errorMsg;
            if (checkAll) {
              errors = errors[0].msg
            }
            this.setData({
              errorMsg: errors
            }, () => {
              this.data.timer = setTimeout(() => {
                this.setData({
                  errorMsg: ''
                })
              }, this.data.duration)
            })
          }
          resolve(res)
        } catch (e) {
          reject({
            isPassed: false,
            errorMsg: '校验出错，请检查传入的数据格式是否有误！'
          })
        }
      })
    }
  }
})