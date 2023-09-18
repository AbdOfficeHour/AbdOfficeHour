// 本文件由FirstUI授权予闫弘宇（手机号：135 10    0 0 15  5 3，身份证尾号：  0 33 6 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        this.setData({
          isShow: val
        })
      }
    },
    //可选日期类型：1-年 2-年月 3-年月日 4-年月日 时 5-年月日 时分 6-时分 7-时分秒 8-分秒
    type: {
      type: Number,
      optionalTypes: [String],
      value: 1,
      observer(val) {
        this.initialize()
      }
    },
    value: {
      type: String,
      value: '',
      observer(val) {
        this.initialize()
      }
    },
    valueEnd: {
      type: String,
      value: ''
    },
    minDate: {
      type: String,
      value: '2010-01-01',
      observer(val) {
        this.initialize()
      }
    },
    maxDate: {
      type: String,
      value: '2030-12-31',
      observer(val) {
        this.initialize()
      }
    },
    hourRange: {
      type: Array,
      value: [0, 23],
      observer(val) {
        this.getHours()
      }
    },
    minuteRange: {
      type: Array,
      value: [0, 59],
      observer(val) {
        this.getMinutes()
      }
    },
    secondRange: {
      type: Array,
      value: [0, 59],
      observer(val) {
        this.getSeconds()
      }
    },
    unit: {
      type: Boolean,
      value: true
    },
    range: {
      type: Boolean,
      value: false
    },
    start: {
      type: String,
      value: '起始日期'
    },
    end: {
      type: String,
      value: '结束日期'
    },
    rangeBackground: {
      type: String,
      value: ''
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
      value: 999
    },
    //点击确认按钮后是否立即关闭弹框
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
    years: [],
    months: [],
    days: [],
    hours: [],
    minutes: [],
    seconds: [],
    vals: [],
    values: [],
    minArr: [],
    maxArr: [],
    darkStyle: 'background-image: -webkit-linear-gradient(top, rgba(35, 35, 35, .95), rgba(35, 35, 35, .6)), -webkit-linear-gradient(bottom, rgba(35, 35, 35, .95), rgba(35, 35, 35, .6));',
    indicatorStyl: 'border-color: #333;height: 44px;',
    isEnd: true,
    isShow: false,
    isActive: 1,
    startDate: {},
    endDate: {}
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
      this.reset();
      this.getDefaultOptions(this.data.value)
      this.handleDate()
      setTimeout(() => {
        this.initData()
      }, 50)
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
    reset() {
      let vals = [
        [0],
        [0, 0],
        [0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0],
        [0, 0, 0],
        [0, 0]
      ][Number(this.data.type) - 1]
      this.setData({
        vals: vals,
        isActive: 1,
        startDate: {},
        endDate: {}
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
    compareDate(start, end) {
      let type = Number(this.data.type)
      if (type == 8) {
        start = '00:' + start;
        end = '00:' + end;
      }

      start = start.replace(/\-/g, '/');
      end = end.replace(/\-/g, '/');

      if (start.indexOf('/') == -1) {
        start = `2001/01/01 ${start}`
        end = `2001/01/01 ${end}`
      }

      return new Date(start).getTime() <= new Date(end).getTime();
    },
    formatVal(num) {
      return num < 10 ? `0${num}` : num.toString();
    },
    toArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    getStrCount(str) {
      let regex = new RegExp('/', 'g');
      let result = str.match(regex);
      return !result ? 0 : result.length;
    },
    getValueToDate(val) {
      let values = [];
      let type = Number(this.data.type)
      if (type == 1 && this.getStrCount(val) === 0) {
        return [Number(val), -1, -1, -1, -1, -1]
      }
      if (type == 8)
        val = '00:' + val;
      let format = val.replace(/\-/g, '/');
      if (type == 2 && this.getStrCount(val) === 1) {
        format += '/01'
      }
      if (format.indexOf('/') == -1) {
        format = `2001/01/01 ${format}`
      }
      try {
        const time = new Date(format);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        values = [year, month, day, hour, minute, second]

      } catch (e) {
        //TODO handle the exception
        console.log('默认日期时间格式有误！')
      }
      return values;
    },
    getRangeInitRes(vals) {
      const type = Number(this.data.type);
      let d = {
        param: this.data.param
      }
      switch (type) {
        case 1:
          d.year = vals[0]
          d.result = d.year
          break;
        case 2:
          d.year = vals[0]
          d.month = this.formatVal(vals[1])
          d.result = `${d.year}-${d.month}`
          break;
        case 3:
          d.year = vals[0]
          d.month = this.formatVal(vals[1])
          d.day = this.formatVal(vals[2])
          d.result = `${d.year}-${d.month}-${d.day}`
          break;
        case 4:
          d.year = vals[0]
          d.month = this.formatVal(vals[1])
          d.day = this.formatVal(vals[2])
          d.hour = this.formatVal(vals[3])
          d.result = `${d.year}-${d.month}-${d.day} ${d.hour}:00`
          break;
        case 5:
          // 5-年月日 时分 6-时分 7-时分秒 8-分秒
          d.year = vals[0]
          d.month = this.formatVal(vals[1])
          d.day = this.formatVal(vals[2])
          d.hour = this.formatVal(vals[3])
          d.minute = this.formatVal(vals[4])
          d.result = `${d.year}-${d.month}-${d.day} ${d.hour}:${d.minute}`
          break;
        case 6:
          d.hour = this.formatVal(vals[3])
          d.minute = this.formatVal(vals[4])
          d.result = `${d.hour}:${d.minute}`
          break;
        case 7:
          d.hour = this.formatVal(vals[3])
          d.minute = this.formatVal(vals[4])
          d.second = this.formatVal(vals[5])
          d.result = `${d.hour}:${d.minute}:${d.second}`
          break;
        case 8:
          d.minute = this.formatVal(vals[4])
          d.second = this.formatVal(vals[5])
          d.result = `${d.minute}:${d.second}`
          break;
        default:
          break;
      }
      return d
    },
    getDefaultOptions(val) {
      //区间选择时默认值必须传值起始时间，否则无效
      if (!val || val === true || val === 'true') {
        this.setData({
          values: []
        })
        return;
      }
      if (this.data.range) {
        const startValues = this.getValueToDate(val);
        if (this.data.valueEnd) {
          const endValues = this.getValueToDate(this.data.valueEnd);
          this.setData({
            values: endValues,
            startDate: this.getRangeInitRes(startValues),
            endDate: this.getRangeInitRes(endValues),
            isActive: 2
          })
        } else {
          this.setData({
            values: startValues,
            startDate: this.getRangeInitRes(startValues)
          })
        }
      } else {
        this.setData({
          values: this.getValueToDate(val)
        });
      }
    },
    toDate(date, def, isMin) {
      if (date === true || date === 'true' || !date) {
        date = def
      } else {
        const d = date.replace(/\-/g, '/')
        const arr = d.split('/')
        if (arr.length === 1) {
          date = isMin ? `${d}/01/01` : `${d}/12/31`
        } else if (arr.length === 2) {
          if (isMin) {
            date = `${d}/01`
          } else {
            let max = new Date(arr[0], arr[1], 0).getDate();
            date = `${d}/${max}`
          }
        }
      }
      return new Date(date.replace(/\-/g, '/'))
    },
    handleDate() {
      const min = this.toDate(this.data.minDate, '2010-01-01',true);
      const max = this.toDate(this.data.maxDate, '2030-12-31', false);
      let minArr = [min.getFullYear(), min.getMonth() + 1, min.getDate(), min.getHours(), min.getMinutes(), min
        .getSeconds()
      ];
      let maxArr = [max.getFullYear(), max.getMonth() + 1, max.getDate(), max.getHours(), max.getMinutes(), max
        .getSeconds()
      ];
      this.setData({
        minArr: minArr,
        maxArr: maxArr
      })
    },
    getYears() {
      let min = this.data.minArr[0];
      let max = this.data.maxArr[0];
      max = max < min ? min : max
      this.setData({
        years: this.toArray(min, max)
      })
    },
    getMonths(index) {
      let year = this.data.years[index]
      let min = 1;
      let max = 12;
      if (year == this.data.minArr[0]) {
        min = this.data.minArr[1]
      }
      if (year == this.data.maxArr[0]) {
        max = this.data.maxArr[1]
      }
      max = max < min ? min : max
      this.setData({
        months: this.toArray(min, max)
      })
    },
    getDays(index, idx) {
      let min = 1;
      let year = this.data.years[index]
      let month = this.data.months[idx]
      let max = new Date(year, month, 0).getDate();
      if (year == this.data.minArr[0] && month == this.data.minArr[1]) {
        min = this.data.minArr[2]
      }
      if (year == this.data.maxArr[0] && month == this.data.maxArr[1]) {
        max = this.data.maxArr[2]
      }
      max = !max || max < min ? min : max
      this.setData({
        days: this.toArray(min, max)
      })
    },
    getHours() {
      let range = this.data.hourRange || [0, 23];
      let min = Number(range[0] || 0);
      let max = Number(range[1] || 23);
      min = Math.floor(min < 0 || min > 23 ? 0 : min);
      max = Math.floor(max < 0 || max > 23 ? 23 : max);
      max = max < min ? min : max
      this.setData({
        hours: this.toArray(min, max)
      })
    },
    getMinutes() {
      let range = this.data.minuteRange || [0, 59];
      let min = Number(range[0] || 0);
      let max = Number(range[1] || 59);
      min = Math.floor(min < 0 || min > 59 ? 0 : min);
      max = Math.floor(max < 0 || max > 59 ? 59 : max);
      max = max < min ? min : max
      this.setData({
        minutes: this.toArray(min, max)
      })
    },
    getSeconds() {
      let range = this.data.secondRange || [0, 59];
      let min = Number(range[0] || 0);
      let max = Number(range[1] || 59);
      min = Math.floor(min < 0 || min > 59 ? 0 : min);
      max = Math.floor(max < 0 || max > 59 ? 59 : max);
      max = max < min ? min : max
      this.setData({
        seconds: this.toArray(min, max)
      })
    },
    getIndex(arr, val) {
      if (!arr || arr.length === 0 || !val) return 0;
      let index = arr.indexOf(val);
      return index === -1 ? 0 : index;
    },
    initData() {
      let type = Number(this.data.type);
      let index = 0;
      let idx = 0;
      if (type < 6) {
        this.getYears()
        index = this.getIndex(this.data.years, this.data.values[0]);
        if (type > 1) {
          this.getMonths(index)
          idx = this.getIndex(this.data.months, this.data.values[1]);
          type > 2 && this.getDays(index, idx);
        }
      }
      type > 3 && type < 8 && this.getHours()
      type > 4 && this.getMinutes()
      type > 6 && this.getSeconds()
      setTimeout(() => {
        let di = this.getIndex(this.data.days, this.data.values[2]);
        let hi = this.getIndex(this.data.hours, this.data.values[3]);
        let mi = this.getIndex(this.data.minutes, this.data.values[4])
        let si = this.getIndex(this.data.seconds, this.data.values[5])
        let vals = [
          [index],
          [index, idx],
          [index, idx, di],
          [index, idx, di, hi],
          [index, idx, di, hi, mi],
          [hi, mi],
          [hi, mi, si],
          [mi, si]
        ][type - 1]
        this.setData({
          vals: vals
        })
      }, 100)
    },
    getResult() {
      const vals = this.data.vals;
      const type = Number(this.data.type);
      let d = {
        param: this.data.param
      }
      let index = 0;
      let idx = 0;
      let mc = 0;
      let dc = 0;
      switch (type) {
        case 1:
          d.year = this.data.years[vals[0]]
          d.result = d.year
          break;
        case 2:
          d.year = this.data.years[vals[0]]
          index = this.data.months.length - 1;
          mc = vals[1];
          d.month = this.formatVal(this.data.months[mc > index ? index : mc])
          d.result = `${d.year}-${d.month}`
          break;
        case 3:
          d.year = this.data.years[vals[0]]
          index = this.data.months.length - 1;
          idx = this.data.days.length - 1;
          mc = vals[1];
          dc = vals[2];
          d.month = this.formatVal(this.data.months[mc > index ? index : mc])
          d.day = this.formatVal(this.data.days[dc > idx ? idx : dc])
          d.result = `${d.year}-${d.month}-${d.day}`
          break;
        case 4:
          d.year = this.data.years[vals[0]]
          index = this.data.months.length - 1;
          idx = this.data.days.length - 1;
          mc = vals[1];
          dc = vals[2];
          d.month = this.formatVal(this.data.months[mc > index ? index : mc])
          d.day = this.formatVal(this.data.days[dc > idx ? idx : dc])
          d.hour = this.formatVal(this.data.hours[vals[3]])
          d.result = `${d.year}-${d.month}-${d.day} ${d.hour}:00`
          break;
        case 5:
          // 5-年月日 时分 6-时分 7-时分秒 8-分秒
          d.year = this.data.years[vals[0]]
          index = this.data.months.length - 1;
          idx = this.data.days.length - 1;
          mc = vals[1];
          dc = vals[2];
          d.month = this.formatVal(this.data.months[mc > index ? index : mc])
          d.day = this.formatVal(this.data.days[dc > idx ? idx : dc])
          d.hour = this.formatVal(this.data.hours[vals[3]])
          d.minute = this.formatVal(this.data.minutes[vals[4]])
          d.result = `${d.year}-${d.month}-${d.day} ${d.hour}:${d.minute}`
          break;
        case 6:
          d.hour = this.formatVal(this.data.hours[vals[0]])
          d.minute = this.formatVal(this.data.minutes[vals[1]])
          d.result = `${d.hour}:${d.minute}`
          break;
        case 7:
          d.hour = this.formatVal(this.data.hours[vals[0]])
          d.minute = this.formatVal(this.data.minutes[vals[1]])
          d.second = this.formatVal(this.data.seconds[vals[2]])
          d.result = `${d.hour}:${d.minute}:${d.second}`
          break;
        case 8:
          d.minute = this.formatVal(this.data.minutes[vals[0]])
          d.second = this.formatVal(this.data.seconds[vals[1]])
          // d.result = `00:${d.minute}:${d.second}`
          d.result = `${d.minute}:${d.second}`
          break;
        default:
          break;
      }
      return d
    },
    emitChange() {
      let data = {};
      if (this.data.range) {
        data = {
          startDate: this.data.startDate,
          endDate: this.data.endDate
        }
      } else {
        data = this.getResult()
      }
      setTimeout(() => {
        this.triggerEvent('change', data)
      }, 0)
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
      if (this.data.range) {
        //判断选择结果
					let start = this.data.startDate.result;
					let end = this.data.endDate.result;
					if (!start && !end) {
            this.setData({
              startDate:this.getResult(),
              isActive: 2
            })
						wx.showToast({
							title: `请选择${this.data.end}`,
							icon: 'none'
						})
						return
					} else if (start && !end) {
            this.setData({
              endDate:this.getResult()
            })
						end = this.data.endDate.result;
					}
					if (!this.compareDate(start, end)) {
						wx.showToast({
							title: `${this.data.end}不能小于${this.data.start}`,
							icon: 'none'
						})
						return;
					}
      }
      setTimeout(() => {
        if (this.data.isClose) {
          this.setData({
            isShow: false
          })
        }
        this.waitForTrigger()
      }, 80)
    },
    pickerChange(e) {
      let value = e.detail.value;
      let type = Number(this.data.type)
      if (type > 1 && type < 6) {
        if (value[0] != this.data.vals[0]) {
          this.getMonths(value[0])
          if (type > 2) {
            this.getDays(value[0], value[1])
          }
        } else if (value[1] != this.data.vals[1] && type > 2) {
          this.getDays(value[0], value[1])
        }
      }
      this.setData({
        vals: value
      })
      if (this.data.range) {
        if (this.data.isActive == 1) {
          this.setData({
            startDate: this.getResult()
          })
        } else {
          this.setData({
            endDate: this.getResult()
          })
        }
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
    rangeChange(e) {
      let type = Number(e.currentTarget.dataset.type)
      this.setData({
        isActive: type
      })
    },
    stop(e) {}
  }
})